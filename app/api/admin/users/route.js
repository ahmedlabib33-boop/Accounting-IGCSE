import { NextResponse } from "next/server";
import { currentAccount, serviceKeyConfigured, supabaseAdmin, supabaseConfigured } from "../../../_lib/supabase/server";
import { summarizeStudy } from "../../../_lib/progress-summary.mjs";

// Administrator account management. Reads go through the admin's own session (row level security),
// privileged writes (creating accounts, setting passwords) use the service key when it is configured.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLES = new Set(["student", "teacher", "admin"]);

async function requireAdmin() {
  if (!supabaseConfigured) return { error: NextResponse.json({ error: "Accounts are not configured." }, { status: 503 }) };
  const { supabase, user, profile } = await currentAccount();
  if (!user) return { error: NextResponse.json({ error: "Sign in first." }, { status: 401 }) };
  if (profile?.role !== "admin" || profile.status !== "active") return { error: NextResponse.json({ error: "Administrators only." }, { status: 403 }) };
  return { supabase, user, profile };
}

function audit(supabase, actor, action, target, details = {}) {
  return supabase.from("audit_log").insert({ actor_id: actor.id, actor_email: actor.email, action, target, details }).then(() => {}, () => {});
}

export async function GET() {
  const gate = await requireAdmin();
  if (gate.error) return gate.error;
  const { supabase } = gate;
  const [{ data: profiles, error }, { data: records }] = await Promise.all([
    supabase.from("profiles").select("*").order("created_at", { ascending: false }),
    supabase.from("study_records").select("user_id, data, updated_at"),
  ]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const byUser = new Map((records || []).map((row) => [row.user_id, row]));
  const users = (profiles || []).map((profile) => {
    const record = byUser.get(profile.id);
    return { ...profile, progress: record ? summarizeStudy(record.data) : null, studied_at: record?.updated_at || null };
  });
  return NextResponse.json({ users, serviceKey: serviceKeyConfigured });
}

export async function POST(request) {
  const gate = await requireAdmin();
  if (gate.error) return gate.error;
  const { supabase, user } = gate;
  const body = await request.json().catch(() => ({}));
  const action = String(body.action || "create");
  const admin = supabaseAdmin();

  if (action === "create") {
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const fullName = String(body.fullName || "").trim().slice(0, 80);
    const role = ROLES.has(body.role) ? body.role : "student";
    if (!EMAIL.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ error: "Use a temporary password with at least 8 characters." }, { status: 400 });
    if (fullName.length < 2) return NextResponse.json({ error: "Enter the person's full name." }, { status: 400 });
    if (!admin) return NextResponse.json({ error: "Creating accounts from the console needs the SUPABASE_SERVICE_ROLE_KEY on the server. Until then, ask people to register themselves." }, { status: 501 });
    const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { full_name: fullName, role, created_by_admin: true } });
    if (error) return NextResponse.json({ error: error.message }, { status: error.status || 400 });
    // The trigger only trusts the role for accounts an admin created; make sure the profile matches.
    await admin.from("profiles").update({ role, full_name: fullName }).eq("id", data.user.id);
    await audit(supabase, user, "user.create", email, { role });
    return NextResponse.json({ ok: true, id: data.user.id });
  }

  const targetId = String(body.id || "");
  const { data: target } = await supabase.from("profiles").select("*").eq("id", targetId).maybeSingle();
  if (!target) return NextResponse.json({ error: "That account no longer exists." }, { status: 404 });

  if (action === "set_password") {
    const password = String(body.password || "");
    if (password.length < 8) return NextResponse.json({ error: "Use a password with at least 8 characters." }, { status: 400 });
    if (!admin) return NextResponse.json({ error: "Setting passwords needs the SUPABASE_SERVICE_ROLE_KEY on the server. Use “Send reset email” instead." }, { status: 501 });
    const { error } = await admin.auth.admin.updateUserById(targetId, { password });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    await audit(supabase, user, "user.password_set", target.email);
    return NextResponse.json({ ok: true });
  }

  if (action === "send_reset") {
    const origin = new URL(request.url).origin;
    const { error } = await supabase.auth.resetPasswordForEmail(target.email, { redirectTo: `${origin}/auth/callback?type=recovery` });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    await audit(supabase, user, "user.password_reset_sent", target.email);
    return NextResponse.json({ ok: true });
  }

  if (action === "confirm_email") {
    if (!admin) return NextResponse.json({ error: "Confirming emails needs the SUPABASE_SERVICE_ROLE_KEY on the server." }, { status: 501 });
    const { error } = await admin.auth.admin.updateUserById(targetId, { email_confirm: true });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    await audit(supabase, user, "user.email_confirmed", target.email);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}

export async function PATCH(request) {
  const gate = await requireAdmin();
  if (gate.error) return gate.error;
  const { supabase, user } = gate;
  const body = await request.json().catch(() => ({}));
  const id = String(body.id || "");
  const patch = {};
  if (body.role !== undefined) { if (!ROLES.has(body.role)) return NextResponse.json({ error: "Unknown role." }, { status: 400 }); patch.role = body.role; }
  if (body.status !== undefined) { if (!["active", "suspended"].includes(body.status)) return NextResponse.json({ error: "Unknown status." }, { status: 400 }); patch.status = body.status; }
  if (body.full_name !== undefined) patch.full_name = String(body.full_name).trim().slice(0, 80);
  if (!Object.keys(patch).length) return NextResponse.json({ error: "Nothing to change." }, { status: 400 });
  if (id === user.id && (patch.role && patch.role !== "admin" || patch.status === "suspended")) return NextResponse.json({ error: "You cannot remove your own administrator access." }, { status: 400 });
  const { data, error } = await supabase.from("profiles").update(patch).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  await audit(supabase, user, "user.update", data.email, patch);
  return NextResponse.json({ ok: true, user: data });
}

export async function DELETE(request) {
  const gate = await requireAdmin();
  if (gate.error) return gate.error;
  const { supabase, user } = gate;
  const body = await request.json().catch(() => ({}));
  const id = String(body.id || "");
  if (!id) return NextResponse.json({ error: "Missing account." }, { status: 400 });
  if (id === user.id) return NextResponse.json({ error: "You cannot delete your own account." }, { status: 400 });
  const admin = supabaseAdmin();
  if (admin) {
    const { data: target } = await supabase.from("profiles").select("email, role").eq("id", id).maybeSingle();
    const { error } = await admin.auth.admin.deleteUser(id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    await audit(supabase, user, "user.delete", target?.email || id, { role: target?.role });
    return NextResponse.json({ ok: true });
  }
  const { error } = await supabase.rpc("admin_delete_user", { target: id });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
