import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || "";

export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);
export const serviceKeyConfigured = Boolean(SERVICE_KEY);

// Request-scoped client that reads the signed-in user's cookies (Server Components, Route Handlers).
export async function supabaseServer() {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(cookiesToSet) {
        try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); }
        catch { /* Server Components cannot write cookies; the proxy refreshes sessions instead. */ }
      },
    },
  });
}

// Privileged client for administrator actions (creating accounts, resetting passwords). Never sent to the browser.
export function supabaseAdmin() {
  if (!SERVICE_KEY) return null;
  return createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
}

// The signed-in user and their profile row, or nulls when nobody is signed in.
export async function currentAccount() {
  if (!supabaseConfigured) return { supabase: null, user: null, profile: null };
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, profile: null };
  let { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  if (!profile) {
    // Accounts created before the profiles table existed get their row on first visit.
    const { data: created } = await supabase.rpc("ensure_profile");
    profile = created || null;
  }
  return { supabase, user, profile };
}

// Public settings as a plain object: { registration_open, maintenance, announcement, teacher_name, ... }
export async function loadSettings(supabase) {
  if (!supabase) return {};
  const { data } = await supabase.from("app_settings").select("key, value");
  return Object.fromEntries((data || []).map((row) => [row.key, row.value]));
}
