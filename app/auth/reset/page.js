"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandMark } from "../../_components/brand-mark";
import { Icon } from "../../_components/ui";
import { friendlyAuthError, supabaseBrowser } from "../../_lib/supabase/client";

// Reached from a password-reset or invitation email once the link has become a session.
export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [again, setAgain] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(null);

  useEffect(() => {
    const supabase = supabaseBrowser();
    if (!supabase) { setReady(false); return; }
    supabase.auth.getUser().then(({ data }) => setReady(Boolean(data.user)));
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (password.length < 8) return setError("Use a password with at least 8 characters.");
    if (password !== again) return setError("The two passwords do not match.");
    setBusy(true);
    const { error: authError } = await supabaseBrowser().auth.updateUser({ password });
    setBusy(false);
    if (authError) return setError(friendlyAuthError(authError));
    router.replace("/");
    router.refresh();
  };

  return <main className="auth-screen auth-screen-single">
    <section className="auth-card">
      <div className="auth-brand-mark"><BrandMark/><span>IGCSE Accounting · Cambridge 0452</span></div>
      {ready === false ? <div className="auth-form"><h2>This link is no longer valid</h2><p className="muted-line">Request a new reset link from the sign-in page.</p><a className="outline-button" href="/login">Back to sign in</a></div>
        : <form onSubmit={submit} className="auth-form">
          <h2>Choose a new password</h2>
          <label className="auth-field"><span>New password</span><div><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" minLength={8} required/></div></label>
          <label className="auth-field"><span>Repeat it</span><div><input type="password" value={again} onChange={(event) => setAgain(event.target.value)} autoComplete="new-password" minLength={8} required/></div></label>
          <button type="submit" className="primary-button" disabled={busy || ready === null}>{busy ? "Saving…" : "Save and continue"} <Icon name="arrow" size={18}/></button>
          {error && <p className="coach-error auth-message" role="alert"><Icon name="x" size={16}/> {error}</p>}
        </form>}
    </section>
  </main>;
}
