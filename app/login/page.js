import { redirect } from "next/navigation";
import { currentAccount, loadSettings, supabaseConfigured } from "../_lib/supabase/server";
import { LoginForm } from "./login-form";

export const metadata = { title: "Sign in | IGCSE Accounting (0452)" };

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  if (!supabaseConfigured) return <LoginForm configured={false} registrationOpen={false} teacherName="Mr. Mohamed Basiouny" next="/"/>;
  const { supabase, user } = await currentAccount();
  if (user) redirect("/");
  const settings = await loadSettings(supabase);
  const next = typeof params?.next === "string" && params.next.startsWith("/") ? params.next : "/";
  return <LoginForm configured registrationOpen={settings.registration_open !== false} maintenance={settings.maintenance === true} teacherName={settings.teacher_name || "Mr. Mohamed Basiouny"} next={next} linkError={params?.error === "link"}/>;
}
