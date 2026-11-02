"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./ui";
import { supabaseBrowser } from "../_lib/supabase/client";

// Who is signed in, their profile row and the platform settings, shared by every screen.

const AccountContext = createContext({ user: null, profile: null, settings: {}, supabase: null, enabled: false, isAdmin: false, isStaff: false, signOut: async () => {}, refreshProfile: async () => {} });

export const ROLE_LABELS = { student: "Student", teacher: "Teacher", admin: "Administrator" };

export function displayName(profile, user) {
  const name = String(profile?.full_name || user?.user_metadata?.full_name || "").trim();
  if (name) return name;
  const email = profile?.email || user?.email || "";
  return email.split("@")[0] || "Student";
}

export function initialsOf(name) {
  return String(name || "").split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("") || "?";
}

export function AccountProvider({ initialUser = null, initialProfile = null, initialSettings = {}, children }) {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);
  const [profile, setProfile] = useState(initialProfile);
  const [settings, setSettings] = useState(initialSettings || {});
  const enabled = Boolean(supabase && initialUser);

  const refreshProfile = useCallback(async () => {
    if (!enabled) return;
    const { data } = await supabase.from("profiles").select("*").eq("id", initialUser.id).maybeSingle();
    if (data) setProfile(data);
  }, [enabled, supabase, initialUser]);

  const signOut = useCallback(async () => {
    try { await supabase?.auth.signOut(); } catch { /* Already signed out. */ }
    router.replace("/login");
    router.refresh();
  }, [supabase, router]);

  useEffect(() => {
    if (!enabled) return undefined;
    const channel = supabase.channel(`account:${initialUser.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "app_settings" }, (payload) => { const row = payload.new; if (row?.key) setSettings((current) => ({ ...current, [row.key]: row.value })); })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "profiles", filter: `id=eq.${initialUser.id}` }, (payload) => setProfile((current) => ({ ...current, ...payload.new })))
      .subscribe();
    const ping = () => { supabase.rpc("ping_presence").then(() => {}, () => {}); };
    ping();
    const timer = window.setInterval(ping, 120000);
    const { data: listener } = supabase.auth.onAuthStateChange((event) => { if (event === "SIGNED_OUT") { router.replace("/login"); router.refresh(); } });
    return () => { supabase.removeChannel(channel); window.clearInterval(timer); listener.subscription.unsubscribe(); };
  }, [enabled, supabase, initialUser, router]);

  // A suspended account is signed out as soon as the status changes.
  useEffect(() => { if (enabled && profile?.status === "suspended") signOut(); }, [enabled, profile?.status, signOut]);

  const value = useMemo(() => ({
    user: initialUser, profile, settings, supabase, enabled, signOut, refreshProfile,
    isAdmin: profile?.role === "admin", isStaff: profile?.role === "admin" || profile?.role === "teacher",
  }), [initialUser, profile, settings, supabase, enabled, signOut, refreshProfile]);
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export const useAccount = () => useContext(AccountContext);

// Name, role and a menu with the admin console and sign out.
export function AccountChip({ cloudState = "" }) {
  const { user, profile, enabled, isAdmin, signOut } = useAccount();
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => { if (!box.current?.contains(event.target)) setOpen(false); };
    const key = (event) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("pointerdown", close); window.removeEventListener("keydown", key); };
  }, [open]);
  if (!enabled) return null;
  const name = displayName(profile, user);
  const role = ROLE_LABELS[profile?.role] || "Student";
  return <div className="account-chip-wrap" ref={box}>
    <button className={`account-chip role-${profile?.role || "student"}`} onClick={() => setOpen((value) => !value)} aria-haspopup="menu" aria-expanded={open} aria-label={`${name}, ${role}. Account menu`}>
      <span className="account-avatar">{initialsOf(name)}</span>
      <span className="account-text"><strong>{name}</strong><small>{role}{cloudState ? ` · ${cloudState}` : ""}</small></span>
    </button>
    {open && <div className="account-menu" role="menu">
      <div className="account-menu-head"><strong>{name}</strong><small>{user.email}</small><em>{role}</em></div>
      {isAdmin && <a href="/admin" role="menuitem"><Icon name="shield" size={17}/> Admin console</a>}
      <button role="menuitem" onClick={signOut}><Icon name="external" size={17}/> Sign out</button>
    </div>}
  </div>;
}

// Teacher announcement shown on every screen until it is cleared in the admin console.
export function AnnouncementBanner() {
  const { settings } = useAccount();
  const text = String(settings?.announcement || "").trim();
  const [hidden, setHidden] = useState("");
  if (!text || hidden === text) return null;
  return <div className="announcement" role="status"><Icon name="star" size={16}/><span>{text}</span><button className="tiny-icon" aria-label="Hide announcement" onClick={() => setHidden(text)}><Icon name="x" size={14}/></button></div>;
}
