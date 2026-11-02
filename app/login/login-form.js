"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandMark } from "../_components/brand-mark";
import { Icon, fetchJson } from "../_components/ui";
import { REMEMBER_EMAIL_KEY, REMEMBER_KEY, friendlyAuthError, setRememberMe, supabaseBrowser } from "../_lib/supabase/client";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({ label, type = "text", value, onChange, autoComplete, placeholder, children }) {
  return <label className="auth-field"><span>{label}</span><div>{children}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} placeholder={placeholder} required/></div></label>;
}

function PasswordField({ label, value, onChange, autoComplete }) {
  const [shown, setShown] = useState(false);
  return <label className="auth-field"><span>{label}</span><div><input type={shown ? "text" : "password"} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} minLength={8} required/><button type="button" className="auth-eye" onClick={() => setShown((v) => !v)} aria-label={shown ? "Hide password" : "Show password"}>{shown ? "Hide" : "Show"}</button></div></label>;
}

export function LoginForm({ configured, registrationOpen, maintenance = false, teacherName, next, linkError = false }) {
  const router = useRouter();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(linkError ? "That link has expired or was already used. Sign in, or request a new one." : "");
  const [notice, setNotice] = useState("");
  const [remember, setRemember] = useState(true);

  // Remembered choice and email from the last sign-in on this browser.
  useEffect(() => {
    try {
      if (window.localStorage.getItem(REMEMBER_KEY) === "0") setRemember(false);
      const saved = window.localStorage.getItem(REMEMBER_EMAIL_KEY);
      if (saved) setEmail((current) => current || saved);
    } catch { /* storage blocked */ }
  }, []);

  const applyRemember = () => {
    setRememberMe(remember);
    try {
      window.localStorage.setItem(REMEMBER_KEY, remember ? "1" : "0");
      if (remember) window.localStorage.setItem(REMEMBER_EMAIL_KEY, email.trim().toLowerCase()); else window.localStorage.removeItem(REMEMBER_EMAIL_KEY);
    } catch { /* storage blocked */ }
  };

  const finish = () => { router.replace(next || "/"); router.refresh(); };

  const signIn = async (event) => {
    event.preventDefault();
    setError(""); setNotice("");
    if (!EMAIL.test(email)) return setError("Enter a valid email address.");
    setBusy(true);
    applyRemember();
    const { error: authError } = await supabaseBrowser().auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
    setBusy(false);
    if (authError) return setError(friendlyAuthError(authError));
    finish();
  };

  const signUp = async (event) => {
    event.preventDefault();
    setError(""); setNotice("");
    if (name.trim().length < 2) return setError("Enter your full name.");
    if (!EMAIL.test(email)) return setError("Enter a valid email address.");
    if (password.length < 8) return setError("Use a password with at least 8 characters.");
    setBusy(true);
    try {
      const result = await fetchJson("/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim().toLowerCase(), password, fullName: name.trim() }) });
      if (result.confirmed) {
        applyRemember();
        const { error: authError } = await supabaseBrowser().auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
        if (authError) throw authError;
        return finish();
      }
      setMode("signin");
      setNotice("Your account was created. Open the confirmation email we sent you, then sign in.");
    } catch (requestError) { setError(friendlyAuthError(requestError)); }
    finally { setBusy(false); }
  };

  const forgot = async (event) => {
    event.preventDefault();
    setError(""); setNotice("");
    if (!EMAIL.test(email)) return setError("Enter the email you registered with.");
    setBusy(true);
    const { error: authError } = await supabaseBrowser().auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo: `${window.location.origin}/auth/callback?type=recovery` });
    setBusy(false);
    if (authError) return setError(friendlyAuthError(authError));
    setNotice("If that email has an account, a reset link is on its way. Open it on this device.");
  };

  return <main className="auth-screen">
    <section className="auth-brand">
      <div className="auth-brand-mark"><BrandMark/><span>IGCSE Accounting · Cambridge 0452</span></div>
      <h1>Build the <em>future.</em></h1>
      <p>Lessons, daily practice, mock exams and a live classroom with {teacherName}, all in one place.</p>
      <ul>
        <li><Icon name="live" size={18}/> Join the live class and follow the teacher&apos;s screen</li>
        <li><Icon name="today" size={18}/> Fifteen focused minutes every day, with spaced review</li>
        <li><Icon name="trend" size={18}/> Your progress and predicted grade, on every device</li>
      </ul>
      <footer>Designed &amp; developed by <strong>Eng. Ahmed Labib</strong></footer>
    </section>

    <section className="auth-card" aria-live="polite">
      {!configured ? <div className="auth-setup"><h2>Accounts are not configured</h2><p>Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> to the server, then reload.</p><Link className="outline-button" href="/">Open the app</Link></div> : <>
        {maintenance && <p className="auth-banner"><Icon name="gear" size={16}/> The platform is in maintenance mode. Only administrators can sign in right now.</p>}
        {mode !== "forgot" && <div className="segmented auth-tabs" role="tablist">
          <button role="tab" aria-selected={mode === "signin"} className={mode === "signin" ? "selected" : ""} onClick={() => { setMode("signin"); setError(""); }}>Sign in</button>
          <button role="tab" aria-selected={mode === "signup"} className={mode === "signup" ? "selected" : ""} onClick={() => { setMode("signup"); setError(""); }}>Create account</button>
        </div>}

        {mode === "signin" && <form onSubmit={signIn} className="auth-form">
          <h2>Welcome back</h2>
          <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" placeholder="you@example.com"/>
          <PasswordField label="Password" value={password} onChange={setPassword} autoComplete="current-password"/>
          <label className="auth-remember"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)}/><span>Remember me on this browser</span></label>
          <button type="submit" className="primary-button" disabled={busy}>{busy ? "Signing in…" : "Sign in"} <Icon name="arrow" size={18}/></button>
          <button type="button" className="text-button" onClick={() => { setMode("forgot"); setError(""); setNotice(""); }}>Forgot your password?</button>
        </form>}

        {mode === "signup" && (registrationOpen ? <form onSubmit={signUp} className="auth-form">
          <h2>Create your account</h2>
          <Field label="Full name" value={name} onChange={setName} autoComplete="name" placeholder="Omar Ahmed"/>
          <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" placeholder="you@example.com"/>
          <PasswordField label="Password (8+ characters)" value={password} onChange={setPassword} autoComplete="new-password"/>
          <button type="submit" className="primary-button" disabled={busy}>{busy ? "Creating…" : "Create account"} <Icon name="arrow" size={18}/></button>
          <small>By creating an account you agree that your study progress is stored so your teacher can support you.</small>
        </form> : <div className="auth-form"><h2>Registration is closed</h2><p className="muted-line">New accounts are created by the teacher. Ask {teacherName} for your login, then sign in.</p></div>)}

        {mode === "forgot" && <form onSubmit={forgot} className="auth-form">
          <h2>Reset your password</h2>
          <p className="muted-line">Enter your email and we will send a link to choose a new password.</p>
          <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" placeholder="you@example.com"/>
          <button type="submit" className="primary-button" disabled={busy}>{busy ? "Sending…" : "Send reset link"} <Icon name="send" size={18}/></button>
          <button type="button" className="text-button" onClick={() => { setMode("signin"); setError(""); setNotice(""); }}>Back to sign in</button>
        </form>}

        {error && <p className="coach-error auth-message" role="alert"><Icon name="x" size={16}/> {error}</p>}
        {notice && <p className="auth-notice auth-message" role="status"><Icon name="check" size={16}/> {notice}</p>}
      </>}
    </section>
  </main>;
}
