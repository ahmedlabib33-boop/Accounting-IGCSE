"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BrandMark } from "../_components/brand-mark";
import { Icon, fetchJson, formatDate } from "../_components/ui";
import { AccountChip, ROLE_LABELS, displayName, initialsOf, useAccount } from "../_components/account";
import { SECTION_LABELS } from "../_components/live";
import { SECTION_TITLES, TOPICS, levelFor, minutesStudied, predictGrade, reviewSummary, sectionStats, streakFor, topGains, xpFor } from "../_lib/study-engine.mjs";

// The administrator console: people, roles, the live class, platform settings and the audit trail.

const TABS = [["overview", "Overview", "home"], ["users", "Users", "users"], ["live", "Live class", "live"], ["settings", "Settings", "gear"], ["guide", "Teaching guide", "book"], ["audit", "Audit log", "clock"]];
const DAY = 86400000;

function timeAgo(value) {
  if (!value) return "never";
  const diff = Date.now() - new Date(value).getTime();
  if (diff < 90000) return "just now";
  if (diff < 3600000) return `${Math.round(diff / 60000)} min ago`;
  if (diff < DAY) return `${Math.round(diff / 3600000)} h ago`;
  if (diff < 7 * DAY) return `${Math.round(diff / DAY)} d ago`;
  return formatDate(value);
}

function when(value) { return value ? new Date(value).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"; }

const randomPassword = () => { const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"; return Array.from(crypto.getRandomValues(new Uint32Array(10))).map((n) => chars[n % chars.length]).join(""); };

function Stat({ label, value, tone = "", hint = "" }) {
  return <div className={`admin-stat ${tone}`}><span>{label}</span><strong>{value}</strong>{hint && <small>{hint}</small>}</div>;
}

function Modal({ title, onClose, children }) {
  useEffect(() => { const key = (event) => { if (event.key === "Escape") onClose(); }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [onClose]);
  return <div className="sheet-backdrop admin-backdrop" onClick={onClose}><div className="admin-modal" role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()}><div className="admin-modal-head"><h2>{title}</h2><button className="tiny-icon" onClick={onClose} aria-label="Close"><Icon name="x" size={16}/></button></div>{children}</div></div>;
}

export function AdminConsole({ serviceKey }) {
  const { supabase, user, settings } = useAccount();
  const [tab, setTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [audit, setAudit] = useState([]);
  const [live, setLive] = useState(null);

  const reload = useCallback(async () => {
    try { const data = await fetchJson("/api/admin/users"); setUsers(data.users || []); setError(""); }
    catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  }, []);
  const loadAudit = useCallback(async () => { const { data } = await supabase.from("audit_log").select("*").order("created_at", { ascending: false }).limit(200); setAudit(data || []); }, [supabase]);
  const loadLive = useCallback(async () => { const { data } = await supabase.from("live_sessions").select("*").eq("status", "live").order("started_at", { ascending: false }).limit(1).maybeSingle(); setLive(data || null); }, [supabase]);

  useEffect(() => {
    reload(); loadAudit(); loadLive();
    const channel = supabase.channel("admin-watch")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => reload())
      .on("postgres_changes", { event: "*", schema: "public", table: "live_sessions" }, () => loadLive())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [supabase, reload, loadAudit, loadLive]);

  const flash = useCallback((text) => { setToast(text); window.setTimeout(() => setToast(""), 4500); loadAudit(); }, [loadAudit]);

  return <div className="admin-shell">
    <header className="admin-top">
      <Link className="admin-brand" href="/"><BrandMark/><span>Admin console</span><small>IGCSE Accounting · 0452</small></Link>
      <nav className="admin-tabs" aria-label="Console sections">{TABS.map(([id, label, icon]) => <button key={id} className={tab === id ? "active" : ""} onClick={() => setTab(id)} aria-current={tab === id ? "page" : undefined}><Icon name={icon} size={18}/><span>{label}</span></button>)}</nav>
      <div className="admin-top-right"><Link className="outline-button compact-button" href="/"><Icon name="arrow" size={16}/> Open the app</Link><AccountChip/></div>
    </header>
    <main className="admin-main">
      {error && <p className="coach-error admin-error" role="alert"><Icon name="x" size={16}/> {error} <button className="text-button" onClick={reload}>Retry</button></p>}
      {!serviceKey && tab === "users" && <p className="admin-hint"><Icon name="lock" size={15}/> Add <code>SUPABASE_SERVICE_ROLE_KEY</code> to the server to create accounts and set passwords from here. Everything else already works.</p>}
      {tab === "overview" && <Overview users={users} loading={loading} live={live} audit={audit} settings={settings} onTab={setTab}/>}
      {tab === "users" && <Users users={users} loading={loading} me={user} reload={reload} serviceKey={serviceKey} flash={flash} supabase={supabase}/>}
      {tab === "live" && <LiveAdmin supabase={supabase} users={users} user={user} live={live} flash={flash} reloadLive={loadLive}/>}
      {tab === "settings" && <Settings supabase={supabase} settings={settings} user={user} flash={flash}/>}
      {tab === "guide" && <Guide/>}
      {tab === "audit" && <Audit audit={audit} reload={loadAudit}/>}
    </main>
    {toast && <div className="toast" role="status"><Icon name="check" size={18}/><span>{toast}</span></div>}
  </div>;
}

// ----- Teaching guide -----
// The full lesson script (content/teacher-playbook.html), served staff-only from /admin/playbook.
function Guide() {
  return <section className="admin-section admin-guide">
    <div className="admin-heading row">
      <div><span>Teaching guide</span><h1>The teacher playbook</h1><p className="muted-line">The complete lesson script for Accounting 0452: what to say, the memory tricks, the traps, the exam hints, a 60-minute session routine, a 12-week plan and the flashcard bank. Teachers can open it too, from their account menu.</p></div>
      <div className="admin-guide-actions">
        <a className="outline-button compact-button" href="/admin/playbook" target="_blank" rel="noopener"><Icon name="external" size={16}/> Open full page</a>
        <a className="primary-button compact-button" href="/admin/playbook?print=1" target="_blank" rel="noopener"><Icon name="book" size={16}/> Print / save as PDF</a>
      </div>
    </div>
    <iframe className="admin-guide-frame" src="/admin/playbook" title="Teacher playbook"/>
  </section>;
}

// ----- Overview -----
function Overview({ users, loading, live, audit, settings, onTab }) {
  const [now] = useState(() => Date.now());
  const students = users.filter((item) => item.role === "student");
  const activeToday = users.filter((item) => item.last_seen_at && now - new Date(item.last_seen_at).getTime() < DAY).length;
  const newWeek = users.filter((item) => now - new Date(item.created_at).getTime() < 7 * DAY).length;
  const latest = students.map((item) => item.progress?.latest).filter((value) => typeof value === "number");
  const average = latest.length ? Math.round(latest.reduce((sum, value) => sum + value, 0) / latest.length) : null;
  const attention = students.map((item) => ({ item, idle: item.last_seen_at ? (now - new Date(item.last_seen_at).getTime()) / DAY : 99, low: item.progress?.latest ?? null }))
    .filter(({ idle, low }) => idle >= 5 || (low !== null && low < 50)).sort((a, b) => b.idle - a.idle).slice(0, 6);
  return <section className="admin-section">
    <div className="admin-heading"><span>Overview</span><h1>Platform at a glance</h1></div>
    <div className="admin-stats">
      <Stat label="Students" value={loading ? "…" : students.length} hint={`${newWeek} joined this week`}/>
      <Stat label="Teachers & admins" value={loading ? "…" : users.length - students.length}/>
      <Stat label="Active today" value={loading ? "…" : activeToday} tone="cyan"/>
      <Stat label="Average latest mock" value={average === null ? "—" : `${average}%`} tone={average !== null && average < 50 ? "rose" : "lime"} hint={`${latest.length} with a mock`}/>
      <Stat label="Live class" value={live ? "LIVE" : "Off"} tone={live ? "violet" : ""} hint={live ? live.title : "No class running"}/>
      <Stat label="Registration" value={settings.registration_open === false ? "Closed" : "Open"} hint={settings.maintenance === true ? "Maintenance mode on" : "Normal operation"}/>
    </div>
    <div className="admin-columns">
      <div className="admin-card">
        <div className="admin-card-head"><h3><Icon name="flame" size={18}/> Needs attention</h3><button className="text-button" onClick={() => onTab("users")}>All users</button></div>
        {attention.length ? <ul className="admin-list">{attention.map(({ item, idle, low }) => <li key={item.id}><span className="account-avatar">{initialsOf(displayName(item))}</span><div><strong>{displayName(item)}</strong><small>{idle >= 5 ? `Inactive ${idle >= 99 ? "since joining" : `${Math.round(idle)} days`}` : ""}{idle >= 5 && low !== null && low < 50 ? " · " : ""}{low !== null && low < 50 ? `Latest mock ${low}%` : ""}</small></div></li>)}</ul>
          : <p className="muted-line">{loading ? "Loading…" : "Every student has been active recently and is scoring above 50%."}</p>}
      </div>
      <div className="admin-card">
        <div className="admin-card-head"><h3><Icon name="clock" size={18}/> Recent activity</h3><button className="text-button" onClick={() => onTab("audit")}>Full log</button></div>
        {audit.length ? <ul className="admin-list compact">{audit.slice(0, 8).map((entry) => <li key={entry.id}><div><strong>{entry.action}</strong><small>{entry.actor_email || "system"}{entry.target ? ` → ${entry.target}` : ""} · {timeAgo(entry.created_at)}</small></div></li>)}</ul> : <p className="muted-line">No actions recorded yet.</p>}
      </div>
    </div>
  </section>;
}

// ----- Users -----
function Users({ users, loading, me, reload, serviceKey, flash, supabase }) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [showSuspended, setShowSuspended] = useState(true);
  const [adding, setAdding] = useState(false);
  const [detail, setDetail] = useState(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  const list = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return users.filter((item) => (role === "all" || item.role === role) && (showSuspended || item.status === "active") && (!needle || `${item.full_name} ${item.email}`.toLowerCase().includes(needle)));
  }, [users, query, role, showSuspended]);

  const act = async (label, request) => {
    setBusy(label); setError("");
    try { await request(); await reload(); flash(label); }
    catch (requestError) { setError(requestError.message); }
    finally { setBusy(""); }
  };
  const patch = (id, body, label) => act(label, () => fetchJson("/api/admin/users", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...body }) }));
  const post = (body, label) => act(label, () => fetchJson("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }));
  const remove = (item) => {
    const typed = window.prompt(`Delete ${displayName(item)} and all of their progress? This cannot be undone.\n\nType their email to confirm:`);
    if (typed === null) return;
    if (typed.trim().toLowerCase() !== item.email.toLowerCase()) { setError("The email did not match, so nothing was deleted."); return; }
    act(`Deleted ${item.email}`, () => fetchJson("/api/admin/users", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id }) }));
  };
  const setPassword = (item) => {
    const password = window.prompt(`New password for ${displayName(item)} (at least 8 characters):`, randomPassword());
    if (!password) return;
    post({ action: "set_password", id: item.id, password }, `Password changed for ${item.email}`);
  };

  return <section className="admin-section">
    <div className="admin-heading row"><div><span>Users</span><h1>People on the platform</h1></div><button className="primary-button compact-primary" onClick={() => setAdding(true)}><Icon name="plus" size={16}/> Add account</button></div>
    <div className="admin-toolbar">
      <label className="admin-search"><Icon name="target" size={16}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or email"/></label>
      <div className="segmented">{[["all", "All"], ["student", "Students"], ["teacher", "Teachers"], ["admin", "Admins"]].map(([id, label]) => <button key={id} className={role === id ? "selected" : ""} onClick={() => setRole(id)}>{label}</button>)}</div>
      <label className="admin-check"><input type="checkbox" checked={showSuspended} onChange={(event) => setShowSuspended(event.target.checked)}/> Show suspended</label>
      <span className="muted-line">{list.length} of {users.length}</span>
    </div>
    {error && <p className="coach-error" role="alert">{error}</p>}
    <div className="admin-table-wrap"><table className="admin-table">
      <thead><tr><th>Person</th><th>Role</th><th>Status</th><th>Progress</th><th>Last seen</th><th>Actions</th></tr></thead>
      <tbody>
        {loading && !users.length && <tr><td colSpan={6} className="muted-line">Loading people…</td></tr>}
        {!loading && !list.length && <tr><td colSpan={6} className="muted-line">Nobody matches this filter.</td></tr>}
        {list.map((item) => { const p = item.progress; const self = item.id === me.id; return <tr key={item.id} className={item.status === "suspended" ? "suspended" : ""}>
          <td><button className="admin-person" onClick={() => setDetail(item)}><span className={`account-avatar role-${item.role}`}>{initialsOf(displayName(item))}</span><div><strong>{displayName(item)}{self ? " (you)" : ""}</strong><small>{item.email}</small></div></button></td>
          <td><select value={item.role} disabled={self || busy !== ""} onChange={(event) => patch(item.id, { role: event.target.value }, `${displayName(item)} is now ${ROLE_LABELS[event.target.value]?.toLowerCase()}`)} aria-label={`Role of ${displayName(item)}`}>{Object.entries(ROLE_LABELS).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></td>
          <td><span className={`admin-badge ${item.status}`}>{item.status === "active" ? "Active" : "Suspended"}</span></td>
          <td>{p ? <div className="admin-progress"><strong>Lv {p.level}</strong><span>{p.lessons} lessons · {p.attempts} mock{p.attempts === 1 ? "" : "s"}{p.latest !== null ? ` · latest ${p.latest}%` : ""}{p.grade ? ` · predicted ${p.grade}` : ""}</span></div> : <span className="muted-line">No study record yet</span>}</td>
          <td><span title={when(item.last_seen_at)}>{timeAgo(item.last_seen_at)}</span></td>
          <td><div className="admin-actions">
            <button className="text-button" onClick={() => setDetail(item)}>Details</button>
            {!self && <button className="text-button" disabled={busy !== ""} onClick={() => patch(item.id, { status: item.status === "active" ? "suspended" : "active" }, `${displayName(item)} ${item.status === "active" ? "suspended" : "reactivated"}`)}>{item.status === "active" ? "Suspend" : "Reactivate"}</button>}
            <button className="text-button" disabled={busy !== ""} onClick={() => post({ action: "send_reset", id: item.id }, `Reset email sent to ${item.email}`)}>Reset email</button>
            {serviceKey && <button className="text-button" disabled={busy !== ""} onClick={() => setPassword(item)}>Set password</button>}
            {!self && <button className="text-button danger" disabled={busy !== ""} onClick={() => remove(item)}>Delete</button>}
          </div></td>
        </tr>; })}
      </tbody>
    </table></div>
    {adding && <AddAccount serviceKey={serviceKey} onClose={() => setAdding(false)} onCreated={(email) => { setAdding(false); reload(); flash(`Account created for ${email}`); }}/>}
    {detail && <UserDetail item={users.find((candidate) => candidate.id === detail.id) || detail} supabase={supabase} onClose={() => setDetail(null)} onRename={(name) => patch(detail.id, { full_name: name }, "Name updated")}/>}
  </section>;
}

function AddAccount({ serviceKey, onClose, onCreated }) {
  const [form, setForm] = useState({ fullName: "", email: "", role: "student", password: randomPassword() });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event) => {
    event.preventDefault(); setBusy(true); setError("");
    try { await fetchJson("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "create", ...form }) }); onCreated(form.email); }
    catch (requestError) { setError(requestError.message); }
    finally { setBusy(false); }
  };
  return <Modal title="Add an account" onClose={onClose}>
    {!serviceKey && <p className="admin-hint"><Icon name="lock" size={15}/> The server has no service key, so accounts cannot be created here yet. Share the sign-in page and let people register, or add the key.</p>}
    <form onSubmit={submit} className="auth-form admin-form">
      <label className="auth-field"><span>Full name</span><div><input value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} required/></div></label>
      <label className="auth-field"><span>Email</span><div><input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required/></div></label>
      <label className="auth-field"><span>Role</span><div><select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>{Object.entries(ROLE_LABELS).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></div></label>
      <label className="auth-field"><span>Temporary password</span><div><input value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} minLength={8} required/><button type="button" className="auth-eye" onClick={() => setForm({ ...form, password: randomPassword() })}>New</button></div></label>
      <small>Share the email and temporary password with the person. They can change it from “Forgot your password?”.</small>
      {error && <p className="coach-error" role="alert">{error}</p>}
      <button className="primary-button" type="submit" disabled={busy || !serviceKey}>{busy ? "Creating…" : "Create account"}</button>
    </form>
  </Modal>;
}

function UserDetail({ item, supabase, onClose, onRename }) {
  const [record, setRecord] = useState(undefined);
  const [name, setName] = useState(item.full_name || "");
  useEffect(() => { supabase.from("study_records").select("data, updated_at").eq("user_id", item.id).maybeSingle().then(({ data }) => setRecord(data || null)); }, [supabase, item.id]);
  const study = record?.data;
  const level = study ? levelFor(xpFor(study)) : null;
  const grade = study ? predictGrade(study) : null;
  const review = study ? reviewSummary(study) : null;
  const stats = study ? sectionStats(study) : null;
  const gains = study ? topGains(study, 3) : [];
  const attempts = (study?.attempts || []).slice(0, 8);
  return <Modal title={displayName(item)} onClose={onClose}>
    <div className="admin-detail">
      <div className="admin-detail-head"><span className={`account-avatar big role-${item.role}`}>{initialsOf(displayName(item))}</span><div><strong>{item.email}</strong><small>{ROLE_LABELS[item.role]} · {item.status} · joined {formatDate(item.created_at)} · last seen {timeAgo(item.last_seen_at)}</small></div></div>
      <form className="admin-inline" onSubmit={(event) => { event.preventDefault(); onRename(name.trim()); }}><label className="auth-field"><span>Display name</span><div><input value={name} onChange={(event) => setName(event.target.value)} maxLength={80}/></div></label><button className="outline-button compact-button" type="submit" disabled={name.trim() === (item.full_name || "")}>Save name</button></form>
      {record === undefined ? <p className="muted-line">Loading study record…</p> : !study ? <p className="muted-line">No study record yet: this person has not used the app since signing up.</p> : <>
        <div className="admin-stats small">
          <Stat label="Level" value={`Lv ${level.level}`} hint={`${level.rank} · ${level.xp} XP`}/>
          <Stat label="Streak" value={`${streakFor(study).current} d`} hint={`${minutesStudied(study, 7)} min this week`}/>
          <Stat label="Lessons" value={(study.completedLessons || []).length}/>
          <Stat label="Predicted" value={grade ? grade.grade : "—"} tone={grade ? "lime" : ""} hint={grade ? `${grade.percent}% · ${grade.confidence} confidence` : "Needs more work"}/>
          <Stat label="Review vault" value={`${review.mastered}/${review.total}`} hint={`${review.due} due today`}/>
          <Stat label="Mocks" value={(study.attempts || []).length} hint={attempts[0] ? `latest ${attempts[0].percent}%` : ""}/>
        </div>
        {gains.length > 0 && <div className="admin-card"><h4>Where to focus next</h4><ul className="admin-list compact">{gains.map((gain) => <li key={gain.section}><div><strong>{gain.section} {gain.title}</strong><small>{gain.accuracy === null ? "Not practised yet" : `${Math.round(gain.accuracy * 100)}% accurate over ${gain.answered} answers`}</small></div></li>)}</ul></div>}
        <div className="admin-card"><h4>Accuracy by topic</h4><div className="admin-bars">{TOPICS.map((topic) => { const rows = topic.sections.map((section) => stats[section]); const answered = rows.reduce((sum, row) => sum + row.answered, 0); const correct = rows.reduce((sum, row) => sum + row.correct, 0); const percent = answered ? Math.round((correct / answered) * 100) : null; return <div key={topic.id} className="admin-bar-row"><span>{topic.id} · {topic.name}</span><div className={`bar ${percent === null ? "" : percent >= 70 ? "bar-lime" : "bar-violet"}`}><span style={{ width: `${percent ?? 0}%` }}/></div><b>{percent === null ? "—" : `${percent}%`}</b></div>; })}</div></div>
        {attempts.length > 0 && <div className="admin-card"><h4>Recent mocks</h4><div className="attempt-table">{attempts.map((attempt) => <div key={attempt.id}><span>{formatDate(attempt.date)}</span><strong>{attempt.subject}</strong><span>{attempt.examId} · {attempt.marking || "Automatic"}</span><span>{attempt.score} / {attempt.total}</span><b>{attempt.percent}%</b></div>)}</div></div>}
        <p className="muted-line">Sections: {Object.keys(SECTION_TITLES).length} · last synced {timeAgo(record.updated_at)}</p>
      </>}
    </div>
  </Modal>;
}

// ----- Live class -----
function LiveAdmin({ supabase, users, user, live, flash, reloadLive }) {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const load = useCallback(async () => { const { data } = await supabase.from("live_sessions").select("*").order("started_at", { ascending: false }).limit(20); setHistory(data || []); }, [supabase]);
  useEffect(() => { load(); }, [load, live]);
  const nameOf = (id) => { const found = users.find((item) => item.id === id); return found ? displayName(found) : "Teacher"; };
  const end = async (session) => {
    if (!window.confirm(`End "${session.title}" for everyone?`)) return;
    const { error: updateError } = await supabase.from("live_sessions").update({ status: "ended", ended_at: new Date().toISOString() }).eq("id", session.id);
    if (updateError) { setError(updateError.message); return; }
    await supabase.from("audit_log").insert({ actor_id: user.id, actor_email: user.email, action: "class.end", target: session.title, details: { by: "admin console" } });
    reloadLive(); flash("The live class was ended.");
  };
  const duration = (session) => { const end = session.ended_at ? new Date(session.ended_at) : new Date(); const minutes = Math.max(1, Math.round((end - new Date(session.started_at)) / 60000)); return `${minutes} min`; };
  return <section className="admin-section">
    <div className="admin-heading"><span>Live class</span><h1>The classroom</h1></div>
    {error && <p className="coach-error" role="alert">{error}</p>}
    <div className="admin-card live-admin-card">
      {live ? <><span className="call-live big"><i/> LIVE</span><h3>{live.title}</h3><p>Hosted by {nameOf(live.host_id)} · started {when(live.started_at)} · {duration(live)} so far · teacher is on <strong>{SECTION_LABELS[live.section] || live.section}</strong></p><div className="live-buttons"><Link className="primary-button compact-primary" href="/"><Icon name="live" size={16}/> Join from the app</Link><button className="outline-button compact-button" onClick={() => end(live)}>End class for everyone</button></div></>
        : <><span className="hero-tag">Off air</span><h3>No live class right now.</h3><p className="muted-line">Teachers and admins start a class from Live Studio in the app. Every student then sees a Join button, and their screens follow the teacher.</p><Link className="outline-button compact-button" href="/">Open Live Studio</Link></>}
    </div>
    <div className="admin-card"><h4>Past classes</h4>{history.filter((item) => item.status === "ended").length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Class</th><th>Host</th><th>Started</th><th>Length</th></tr></thead><tbody>{history.filter((item) => item.status === "ended").map((session) => <tr key={session.id}><td>{session.title}</td><td>{nameOf(session.host_id)}</td><td>{when(session.started_at)}</td><td>{duration(session)}</td></tr>)}</tbody></table></div> : <p className="muted-line">No classes have been held yet.</p>}</div>
  </section>;
}

// ----- Settings -----
function Settings({ supabase, settings, user, flash }) {
  const [form, setForm] = useState({ registration_open: settings.registration_open !== false, maintenance: settings.maintenance === true, announcement: settings.announcement || "", teacher_name: settings.teacher_name || "", admin_emails: (settings.admin_emails || []).join("\n"), jitsi_domain: settings.jitsi_domain || "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { setForm({ registration_open: settings.registration_open !== false, maintenance: settings.maintenance === true, announcement: settings.announcement || "", teacher_name: settings.teacher_name || "", admin_emails: (settings.admin_emails || []).join("\n"), jitsi_domain: settings.jitsi_domain || "" }); }, [settings]);
  const save = async (event) => {
    event.preventDefault(); setBusy(true); setError("");
    const emails = form.admin_emails.split(/[\n,;]+/).map((item) => item.trim().toLowerCase()).filter((item) => item.includes("@"));
    const rows = [
      { key: "registration_open", value: form.registration_open },
      { key: "maintenance", value: form.maintenance },
      { key: "announcement", value: form.announcement.trim() },
      { key: "teacher_name", value: form.teacher_name.trim() || "Mr. Mohamed Basiouny" },
      { key: "admin_emails", value: emails },
      { key: "jitsi_domain", value: form.jitsi_domain.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "") },
    ].map((row) => ({ ...row, updated_by: user.id }));
    const { error: upsertError } = await supabase.from("app_settings").upsert(rows);
    setBusy(false);
    if (upsertError) { setError(upsertError.message); return; }
    await supabase.from("audit_log").insert({ actor_id: user.id, actor_email: user.email, action: "settings.update", target: "app_settings", details: Object.fromEntries(rows.map((row) => [row.key, row.value])) });
    flash("Settings saved. They apply to everyone immediately.");
  };
  return <section className="admin-section">
    <div className="admin-heading"><span>Settings</span><h1>Platform controls</h1></div>
    <form onSubmit={save} className="admin-settings">
      <div className="admin-card">
        <h4>Access</h4>
        <label className="admin-switch"><input type="checkbox" checked={form.registration_open} onChange={(event) => setForm({ ...form, registration_open: event.target.checked })}/><div><strong>Registration open</strong><small>When off, nobody can create an account from the sign-in page; you add people here instead.</small></div></label>
        <label className="admin-switch"><input type="checkbox" checked={form.maintenance} onChange={(event) => setForm({ ...form, maintenance: event.target.checked })}/><div><strong>Maintenance mode</strong><small>Students and teachers see a “back in a moment” screen. Administrators can still sign in.</small></div></label>
      </div>
      <div className="admin-card">
        <h4>Announcement</h4>
        <label className="auth-field"><span>Shown at the top of every screen (leave empty to hide)</span><div><textarea value={form.announcement} onChange={(event) => setForm({ ...form, announcement: event.target.value })} rows={3} maxLength={300} placeholder="e.g. Mock exam on Thursday at 5 pm. Bring a calculator."/></div></label>
      </div>
      <div className="admin-card">
        <h4>People</h4>
        <label className="auth-field"><span>Teacher display name</span><div><input value={form.teacher_name} onChange={(event) => setForm({ ...form, teacher_name: event.target.value })} maxLength={80}/></div></label>
        <label className="auth-field"><span>Call server (Jitsi domain). Leave empty for the public meet.jit.si service; a self-hosted or paid Jitsi server removes the one-time host login.</span><div><input value={form.jitsi_domain} onChange={(event) => setForm({ ...form, jitsi_domain: event.target.value })} placeholder="meet.jit.si"/></div></label>
        <label className="auth-field"><span>Administrator emails (one per line). Anyone who signs up with one of these becomes an administrator.</span><div><textarea value={form.admin_emails} onChange={(event) => setForm({ ...form, admin_emails: event.target.value })} rows={3}/></div></label>
      </div>
      {error && <p className="coach-error" role="alert">{error}</p>}
      <button className="primary-button compact-primary" type="submit" disabled={busy}>{busy ? "Saving…" : "Save settings"}</button>
    </form>
  </section>;
}

// ----- Audit log -----
function Audit({ audit, reload }) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const rows = audit.filter((entry) => !needle || `${entry.action} ${entry.actor_email} ${entry.target} ${JSON.stringify(entry.details || {})}`.toLowerCase().includes(needle));
  return <section className="admin-section">
    <div className="admin-heading row"><div><span>Audit log</span><h1>Who did what</h1></div><button className="outline-button compact-button" onClick={reload}><Icon name="repeat" size={16}/> Refresh</button></div>
    <div className="admin-toolbar"><label className="admin-search"><Icon name="target" size={16}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter by action, person or target"/></label><span className="muted-line">{rows.length} entries</span></div>
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>When</th><th>By</th><th>Action</th><th>Target</th><th>Details</th></tr></thead><tbody>
      {rows.length ? rows.map((entry) => <tr key={entry.id}><td title={when(entry.created_at)}>{timeAgo(entry.created_at)}</td><td>{entry.actor_email || "system"}</td><td><code>{entry.action}</code></td><td>{entry.target || "—"}</td><td><small>{entry.details ? JSON.stringify(entry.details) : ""}</small></td></tr>) : <tr><td colSpan={5} className="muted-line">Nothing recorded yet.</td></tr>}
    </tbody></table></div>
  </section>;
}
