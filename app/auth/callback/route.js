import { NextResponse } from "next/server";
import { supabaseServer, supabaseConfigured } from "../../_lib/supabase/server";

// Email links (confirmation, password reset, invitations) land here, become a session, then go on.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  if (!supabaseConfigured) return NextResponse.redirect(`${origin}/login`);
  const supabase = await supabaseServer();
  const type = searchParams.get("type") || "";
  const next = searchParams.get("next") || "/";
  const after = type === "recovery" || type === "invite" ? "/auth/reset" : next.startsWith("/") ? next : "/";

  const code = searchParams.get("code");
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${after}`);
  }
  const tokenHash = searchParams.get("token_hash");
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) return NextResponse.redirect(`${origin}${after}`);
  }
  return NextResponse.redirect(`${origin}/login?error=link`);
}
