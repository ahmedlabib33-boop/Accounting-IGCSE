import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountProvider } from "./_components/account";
import { AppClient } from "./app-client";
import { currentAccount, loadSettings, supabaseConfigured } from "./_lib/supabase/server";

function Notice({ eyebrow, title, children }) {
  return <main className="auth-screen auth-screen-single"><section className="auth-card"><div className="auth-form"><span className="hero-tag">{eyebrow}</span><h2>{title}</h2>{children}</div></section></main>;
}

// The app itself. Every visitor signs in first; the proxy sends signed-out visitors to /login.
export default async function Page() {
  if (!supabaseConfigured) return <AccountProvider><AppClient/></AccountProvider>;
  const { supabase, user, profile } = await currentAccount();
  if (!user) redirect("/login");
  const settings = await loadSettings(supabase);
  if (profile?.status === "suspended") {
    return <Notice eyebrow="Account suspended" title="This account is paused."><p className="muted-line">Your teacher has suspended this account. Ask them to reactivate it, then sign in again.</p><a className="outline-button" href="/login">Back to sign in</a></Notice>;
  }
  if (settings.maintenance === true && profile?.role !== "admin") {
    return <Notice eyebrow="Maintenance" title="Back in a moment."><p className="muted-line">The platform is being updated. Please try again shortly.</p><Link className="outline-button" href="/">Try again</Link></Notice>;
  }
  const safeUser = { id: user.id, email: user.email, user_metadata: user.user_metadata || {} };
  return <AccountProvider initialUser={safeUser} initialProfile={profile} initialSettings={settings}><AppClient/></AccountProvider>;
}
