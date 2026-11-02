"use client";

import { createBrowserClient } from "@supabase/ssr";

// One browser client for the whole app. Sessions live in cookies so server routes see them too.
let client = null;

export const supabaseReady = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

export function supabaseBrowser() {
  if (!supabaseReady) return null;
  client ||= createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  return client;
}

// Turn Supabase/GoTrue error strings into sentences a student understands.
export function friendlyAuthError(error) {
  const text = String(error?.message || error || "").toLowerCase();
  if (!text) return "Something went wrong. Please try again.";
  if (text.includes("invalid login credentials")) return "Wrong email or password.";
  if (text.includes("email not confirmed")) return "Confirm your email first: open the link we sent you.";
  if (text.includes("already registered") || text.includes("already been registered") || text.includes("already exists")) return "An account with this email already exists. Sign in instead.";
  if (text.includes("password") && text.includes("at least")) return "Use a password with at least 8 characters.";
  if (text.includes("rate limit") || text.includes("too many")) return "Too many attempts. Wait a minute and try again.";
  if (text.includes("network") || text.includes("fetch")) return "No connection. Check your internet and try again.";
  return error?.message || "Something went wrong. Please try again.";
}
