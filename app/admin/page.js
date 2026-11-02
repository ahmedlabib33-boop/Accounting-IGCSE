import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountProvider } from "../_components/account";
import { currentAccount, loadSettings, serviceKeyConfigured, supabaseConfigured } from "../_lib/supabase/server";
import { AdminConsole } from "./admin-console";

export const metadata = { title: "Admin console | IGCSE Accounting (0452)" };

export default async function AdminPage() {
  if (!supabaseConfigured) redirect("/");
  const { supabase, user, profile } = await currentAccount();
  if (!user) redirect("/login?next=/admin");
  if (profile?.role !== "admin" || profile.status !== "active") {
    return <main className="auth-screen auth-screen-single"><section className="auth-card"><div className="auth-form"><span className="hero-tag">Restricted</span><h2>Administrators only.</h2><p className="muted-line">This console is for platform administrators. If you should have access, ask an administrator to change your role.</p><Link className="outline-button" href="/">Back to the app</Link></div></section></main>;
  }
  const settings = await loadSettings(supabase);
  const safeUser = { id: user.id, email: user.email, user_metadata: user.user_metadata || {} };
  return <AccountProvider initialUser={safeUser} initialProfile={profile} initialSettings={settings}><AdminConsole serviceKey={serviceKeyConfigured}/></AccountProvider>;
}
