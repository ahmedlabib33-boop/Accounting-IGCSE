import { readFile } from "node:fs/promises";
import path from "node:path";
import { currentAccount, supabaseConfigured } from "../../_lib/supabase/server";

// The teacher playbook: the full lesson script for Accounting 0452, served to teachers and
// administrators only. The page lives in content/teacher-playbook.html so it stays easy to edit.

export const dynamic = "force-dynamic";

const PLAYBOOK = path.join(process.cwd(), "content", "teacher-playbook.html");

export async function GET(request) {
  if (supabaseConfigured) {
    const { user, profile } = await currentAccount();
    if (!user) return Response.redirect(new URL("/login?next=/admin/playbook", request.url), 302);
    const staff = profile?.status === "active" && (profile.role === "teacher" || profile.role === "admin");
    if (!staff) return new Response("The teaching guide is for teachers and administrators.", { status: 403, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
  const html = await readFile(PLAYBOOK, "utf8");
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "private, no-store", "X-Frame-Options": "SAMEORIGIN" } });
}
