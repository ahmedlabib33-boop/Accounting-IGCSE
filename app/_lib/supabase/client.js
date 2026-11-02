"use client";

import { createBrowserClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";

// One browser client for the whole app. Sessions live in cookies so server routes see them too.
let client = null;

export const supabaseReady = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

// "Remember me": a plain cookie the browser client, the proxy and the server all read. When it is
// "0", session cookies get no expiry, so the sign-in ends when the browser is closed.
export const REMEMBER_COOKIE = "acct-remember";
export const REMEMBER_KEY = "accounting-0452:remember";
export const REMEMBER_EMAIL_KEY = "accounting-0452:remember-email";
export const rememberMe = () => typeof document === "undefined" || !new RegExp(`(^|; )${REMEMBER_COOKIE}=0(;|$)`).test(document.cookie);
export function setRememberMe(on) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${REMEMBER_COOKIE}=${on ? "1" : "0"}; Path=/; Max-Age=${400 * 24 * 60 * 60}; SameSite=Lax${secure}`;
}
// Strip the lifetime from a cookie unless it is being deleted (maxAge 0) or the person wants to be remembered.
export const sessionOnly = (options, remember) => (remember || options?.maxAge === 0) ? options : { ...options, maxAge: undefined, expires: undefined };

export function supabaseBrowser() {
  if (!supabaseReady) return null;
  client ||= createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() { return parseCookieHeader(document.cookie); },
      setAll(cookiesToSet) {
        const remember = rememberMe();
        cookiesToSet.forEach(({ name, value, options }) => { document.cookie = serializeCookieHeader(name, value, sessionOnly(options, remember)); });
      },
    },
  });
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
  if (text.includes("email rate limit") || text.includes("over_email_send_rate_limit")) return "The email service has reached its hourly limit, so the confirmation email cannot be sent right now. Try again in about an hour.";
  if (text.includes("rate limit") || text.includes("too many")) return "Too many attempts. Wait a minute and try again.";
  if (text.includes("network") || text.includes("fetch")) return "No connection. Check your internet and try again.";
  return error?.message || "Something went wrong. Please try again.";
}
