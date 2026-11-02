import { NextResponse } from "next/server";
import { supabaseAdmin, supabaseConfigured, supabaseServer } from "../../../_lib/supabase/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Creates a student account. With the service key the account is confirmed at once (no email round-trip);
// otherwise Supabase sends its confirmation email and the student signs in after opening it.
export async function POST(request) {
  if (!supabaseConfigured) return NextResponse.json({ error: "Accounts are not set up on this server yet." }, { status: 503 });
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const fullName = String(body.fullName || "").trim().slice(0, 80);
  if (!EMAIL.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "Use a password with at least 8 characters." }, { status: 400 });
  if (fullName.length < 2) return NextResponse.json({ error: "Enter your full name." }, { status: 400 });

  const supabase = await supabaseServer();
  const { data: setting } = await supabase.from("app_settings").select("value").eq("key", "registration_open").maybeSingle();
  if (setting && setting.value === false) return NextResponse.json({ error: "New registrations are closed. Ask your teacher to create your account." }, { status: 403 });

  const admin = supabaseAdmin();
  if (admin) {
    const { error } = await admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { full_name: fullName } });
    if (error) return NextResponse.json({ error: error.message }, { status: error.status || 400 });
    return NextResponse.json({ ok: true, confirmed: true });
  }

  const origin = new URL(request.url).origin;
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName }, emailRedirectTo: `${origin}/auth/callback` } });
  if (error) return NextResponse.json({ error: error.message }, { status: error.status || 400 });
  // Supabase returns a user with no identities when the email is already taken.
  if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) return NextResponse.json({ error: "An account with this email already exists. Sign in instead." }, { status: 409 });
  return NextResponse.json({ ok: true, confirmed: Boolean(data.session) });
}
