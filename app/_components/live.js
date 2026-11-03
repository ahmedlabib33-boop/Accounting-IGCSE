"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FeaturePage, Icon } from "./ui";
import { ROLE_LABELS, displayName, initialsOf, useAccount } from "./account";

// The live classroom: one call for everyone (Jitsi), a class channel that tells every student
// which screen the teacher is on, and presence so the teacher sees who is in the room.

// The public Jitsi service by default; administrators can point at another Jitsi server in Settings.
const DEFAULT_JITSI_DOMAIN = "meet.jit.si";
const jitsiDomainFrom = (settings) => String(settings?.jitsi_domain || "").trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "") || DEFAULT_JITSI_DOMAIN;

export const SECTION_LABELS = { home: "Home", today: "Today", learning: "Learning", revision: "Revision", lab: "Practice Lab", exam: "Exam Arena", coach: "AI Coach", vault: "Review Vault", progress: "Progress", rewards: "Rewards", pad: "Visual Pad", live: "Live Studio", music: "Focus Music", dad: "Dad's view", admin: "Admin" };

export function liveRoomSlug(name) {
  const cleaned = String(name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return cleaned || "accounting-0452-live";
}

const randomSuffix = () => Math.random().toString(36).slice(2, 8);

function sameTarget(a, b) { return JSON.stringify(a || null) === JSON.stringify(b || null); }

// Loads the Jitsi IFrame API once per server.
const jitsiLoaders = {};
function loadJitsi(domain) {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  jitsiLoaders[domain] ||= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://${domain}/external_api.js`;
    script.async = true;
    script.onload = () => resolve(window.JitsiMeetExternalAPI);
    script.onerror = () => { delete jitsiLoaders[domain]; reject(new Error("The call service could not be loaded. Check your connection and try again.")); };
    document.head.appendChild(script);
  });
  return jitsiLoaders[domain];
}

// ----- The hook the app shell uses -----
export function useLiveClass({ activeSection, target, go, notify }) {
  const { supabase, user, profile, isStaff, enabled } = useAccount();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);
  const [follow, setFollow] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [callCount, setCallCount] = useState(0);
  const [error, setError] = useState("");
  const channelRef = useRef(null);
  const lastNav = useRef(0);
  const goRef = useRef(go);
  const followRef = useRef(follow);
  const isHost = Boolean(session && user && session.host_id === user.id);
  const hostRef = useRef(isHost);
  useEffect(() => { goRef.current = go; followRef.current = follow; hostRef.current = isHost; }, [go, follow, isHost]);

  // Watch for a class starting or ending.
  useEffect(() => {
    if (!enabled) { setLoading(false); return undefined; }
    let active = true;
    supabase.from("live_sessions").select("*").eq("status", "live").order("started_at", { ascending: false }).limit(1).maybeSingle()
      .then(({ data }) => { if (active) { setSession(data || null); setLoading(false); } });
    const channel = supabase.channel("live-sessions-watch")
      .on("postgres_changes", { event: "*", schema: "public", table: "live_sessions" }, (payload) => {
        if (payload.eventType === "DELETE") { setSession((current) => current && current.id === payload.old?.id ? null : current); return; }
        const row = payload.new;
        if (!row) return;
        if (row.status === "live") {
          setSession((current) => {
            if (current && current.id === row.id) {
              // The teacher moved to another screen.
              if (!hostRef.current && followRef.current && row.updated_at !== current.updated_at && (row.section !== current.section || !sameTarget(row.target, current.target))) {
                const at = new Date(row.updated_at).getTime();
                if (at > lastNav.current) { lastNav.current = at; goRef.current(row.section, row.target || null); }
              }
              return row;
            }
            if (!current) notify?.({ text: `${row.title} is live now.`, section: "live" });
            return row;
          });
        } else {
          setSession((current) => {
            if (current && current.id === row.id) { if (!hostRef.current) notify?.({ text: "The live class has ended. Thank you for joining!" }); return null; }
            return current;
          });
        }
      })
      .subscribe();
    return () => { active = false; supabase.removeChannel(channel); };
  }, [enabled, supabase, notify]);

  // Leave automatically when the class ends.
  useEffect(() => { if (!session) { setJoined(false); setParticipants([]); setCallCount(0); } }, [session]);

  const presencePayload = useCallback(() => ({ name: displayName(profile, user), role: profile?.role || "student", section: activeSection, at: Date.now() }), [profile, user, activeSection]);

  // While in class: presence + instant "the teacher moved" messages.
  useEffect(() => {
    if (!enabled || !session || !joined) return undefined;
    const channel = supabase.channel(`class:${session.id}`, { config: { private: true, presence: { key: user.id } } });
    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setParticipants(Object.entries(state).map(([id, metas]) => ({ id, ...(metas[metas.length - 1] || {}) })).sort((a, b) => (a.role === "student") - (b.role === "student") || String(a.name).localeCompare(String(b.name))));
      })
      .on("broadcast", { event: "nav" }, ({ payload }) => {
        if (hostRef.current || !followRef.current || !payload) return;
        if (payload.at > lastNav.current) { lastNav.current = payload.at; goRef.current(payload.section, payload.target || null); }
      })
      .subscribe(async (status, subscribeError) => {
        if (status === "SUBSCRIBED") { setError(""); await channel.track(presencePayload()); }
        else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") setError(subscribeError?.message || "The class channel is reconnecting…");
      });
    channelRef.current = channel;
    return () => { supabase.removeChannel(channel); channelRef.current = null; };
    // presencePayload changes on every section change; the next effect re-tracks instead of re-joining.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, supabase, session?.id, joined, user?.id]);

  // Tell the room which screen I am on; the teacher's move also drives everyone who follows.
  useEffect(() => {
    const channel = channelRef.current;
    if (!channel || !joined || !session) return undefined;
    if (channel.state === "joined") channel.track(presencePayload()).catch(() => {});
    if (!isHost) return undefined;
    const at = Date.now();
    lastNav.current = at;
    channel.send({ type: "broadcast", event: "nav", payload: { section: activeSection, target: target || null, at } }).catch(() => {});
    const timer = window.setTimeout(() => {
      supabase.from("live_sessions").update({ section: activeSection, target: target || null }).eq("id", session.id).then(() => {}, () => {});
    }, 350);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, target, joined, isHost, session?.id]);

  const startClass = useCallback(async (title) => {
    if (!enabled || !isStaff) return;
    setError("");
    const { data: existing } = await supabase.from("live_sessions").select("*").eq("status", "live").order("started_at", { ascending: false }).limit(1).maybeSingle();
    if (existing) { setSession(existing); setJoined(true); return; }
    const cleanTitle = String(title || "").trim() || `Live class · ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`;
    const room = `${liveRoomSlug(`igcse-0452-${cleanTitle}`)}-${randomSuffix()}`;
    const { data, error: insertError } = await supabase.from("live_sessions").insert({ host_id: user.id, title: cleanTitle, room, section: activeSection, target: target || null }).select().single();
    if (insertError) { setError(insertError.message); return; }
    setSession(data);
    setJoined(true);
    supabase.from("audit_log").insert({ actor_id: user.id, actor_email: user.email, action: "class.start", target: cleanTitle, details: { room } }).then(() => {}, () => {});
  }, [enabled, isStaff, supabase, user, activeSection, target]);

  const endClass = useCallback(async () => {
    if (!enabled || !session || !isStaff) return;
    const { error: updateError } = await supabase.from("live_sessions").update({ status: "ended", ended_at: new Date().toISOString() }).eq("id", session.id);
    if (updateError) { setError(updateError.message); return; }
    supabase.from("audit_log").insert({ actor_id: user.id, actor_email: user.email, action: "class.end", target: session.title, details: { participants: participants.length } }).then(() => {}, () => {});
    setSession(null);
    setJoined(false);
  }, [enabled, session, isStaff, supabase, user, participants.length]);

  const join = useCallback(() => {
    if (!session) return;
    setJoined(true);
    setFollow(true);
    if (!isHost && session.section) { lastNav.current = Date.now(); go(session.section, session.target || null); }
  }, [session, isHost, go]);

  const leave = useCallback(() => { setJoined(false); setParticipants([]); setCallCount(0); }, []);

  return useMemo(() => ({ enabled, loading, session, joined, isHost, isStaff, follow, setFollow, participants, callCount, setCallCount, error, setError, startClass, endClass, join, leave }), [enabled, loading, session, joined, isHost, isStaff, follow, participants, callCount, error, startClass, endClass, join, leave]);
}

// ----- The call itself: one iframe that stays mounted while people move between screens -----
export function LiveCallDock({ live, theatre, onOpenStudio }) {
  const { user, profile, settings } = useAccount();
  const domain = jitsiDomainFrom(settings);
  const { session, joined, isHost, leave, endClass, follow, setFollow, participants, callCount, setCallCount, setError } = live;
  const frame = useRef(null);
  const api = useRef(null);
  const [state, setState] = useState("loading");
  const [mini, setMini] = useState(false);
  const leaveRef = useRef(leave);
  useEffect(() => { leaveRef.current = leave; }, [leave]);

  useEffect(() => {
    if (!session || !joined || !frame.current) return undefined;
    let disposed = false;
    setState("loading");
    loadJitsi(domain).then((JitsiMeetExternalAPI) => {
      if (disposed || !frame.current) return;
      frame.current.innerHTML = "";
      const instance = new JitsiMeetExternalAPI(domain, {
        roomName: session.room,
        parentNode: frame.current,
        width: "100%",
        height: "100%",
        userInfo: { displayName: displayName(profile, user), email: user?.email || "" },
        configOverwrite: {
          prejoinConfig: { enabled: false },
          startWithAudioMuted: !isHost,
          startWithVideoMuted: !isHost,
          disableDeepLinking: true,
          subject: session.title,
          defaultLanguage: "en",
          disableThirdPartyRequests: true,
          enableWelcomePage: false,
        },
        interfaceConfigOverwrite: { SHOW_JITSI_WATERMARK: false, SHOW_WATERMARK_FOR_GUESTS: false, MOBILE_APP_PROMO: false, DEFAULT_REMOTE_DISPLAY_NAME: "Student", TOOLBAR_ALWAYS_VISIBLE: false },
      });
      api.current = instance;
      const refreshCount = () => { try { setCallCount(instance.getNumberOfParticipants()); } catch { /* ignore */ } };
      instance.addListener("videoConferenceJoined", () => { setState("connected"); refreshCount(); });
      instance.addListener("participantJoined", refreshCount);
      instance.addListener("participantLeft", refreshCount);
      instance.addListener("videoConferenceLeft", () => { setState("left"); });
      instance.addListener("readyToClose", () => { leaveRef.current(); });
      setState("joining");
    }).catch((loadError) => { setState("error"); setError(loadError.message); });
    return () => {
      disposed = true;
      try { api.current?.dispose(); } catch { /* already gone */ }
      api.current = null;
    };
    // The call is created once per class; the teacher's name and role do not change during it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.id, session?.room, joined, domain]);

  if (!session || !joined) return null;
  const studentCount = participants.filter((item) => item.role === "student").length;
  const mode = theatre && !mini ? "theatre" : "pip";
  return <div className={`call-dock call-${mode} ${state}`} role="region" aria-label="Live class call">
    <div className="call-bar">
      <span className="call-live"><i/> LIVE</span>
      <strong className="call-title">{session.title}</strong>
      <span className="call-meta">{state === "connected" ? `${callCount || 1} in call` : state === "error" ? "Call unavailable" : "Connecting…"}{participants.length ? ` · ${studentCount} student${studentCount === 1 ? "" : "s"} in class` : ""}</span>
      <div className="call-actions">
        {!isHost && <button className={follow ? "call-follow on" : "call-follow"} onClick={() => setFollow((value) => !value)} aria-pressed={follow} title="When on, your screen follows the teacher"><Icon name="target" size={15}/> {follow ? "Following teacher" : "Follow teacher"}</button>}
        {mode === "theatre" ? <button className="tiny-icon" onClick={() => setMini(true)} aria-label="Shrink the call"><Icon name="layers" size={15}/></button>
          : <button className="tiny-icon" onClick={() => { setMini(false); onOpenStudio?.(); }} aria-label="Open the live studio"><Icon name="external" size={15}/></button>}
        {isHost ? <button className="call-end" onClick={() => { if (window.confirm("End the live class for everyone?")) endClass(); }}>End class</button>
          : <button className="call-end" onClick={leave}>Leave</button>}
      </div>
    </div>
    <div className="call-frame" ref={frame}/>
    {state === "error" && <div className="call-error"><p>The call could not start. Check your internet connection, allow the camera and microphone, then try again.</p><button className="outline-button compact-button" onClick={leave}>Close</button></div>}
    {mode === "theatre" && participants.length > 0 && <aside className="call-people" aria-label="People in class">
      <h4><Icon name="users" size={16}/> In class ({participants.length})</h4>
      <ul>{participants.map((person) => <li key={person.id}><span className="account-avatar">{initialsOf(person.name)}</span><div><strong>{person.name}</strong><small>{ROLE_LABELS[person.role] || "Student"}{person.section ? ` · ${SECTION_LABELS[person.section] || person.section}` : ""}</small></div></li>)}</ul>
    </aside>}
  </div>;
}

// Slim bar on every screen while a class is live and I have not joined yet.
export function LiveNudge({ live, onOpen }) {
  const { session, joined, loading } = live;
  if (loading || !session || joined) return null;
  return <div className="live-nudge" role="status"><span className="call-live"><i/> LIVE</span><strong>{session.title}</strong><span>is on now.</span><button className="primary-button compact-primary" onClick={onOpen}><Icon name="live" size={16}/> Join the class</button></div>;
}

// ----- The Live Studio screen -----
export function LivePage({ live, activeSection }) {
  const { user, profile, settings, enabled } = useAccount();
  const { session, joined, isHost, isStaff, participants, startClass, endClass, join, leave, error, loading, follow, setFollow } = live;
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { setNotes(window.localStorage.getItem("accounting-0452:live-notes:v1") || ""); }, []);
  const updateNotes = (value) => { setNotes(value); window.localStorage.setItem("accounting-0452:live-notes:v1", value); };
  const teacherName = settings?.teacher_name || "your teacher";

  if (!enabled) return <FeaturePage eyebrow="Live studio" title="Explain it in real time." description="Sign in to join the live class."><div className="empty-panel">Accounts are not configured on this server, so the live classroom is unavailable.</div></FeaturePage>;

  const start = async (event) => { event.preventDefault(); setBusy(true); await startClass(title); setBusy(false); };
  const started = session ? new Date(session.started_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "";
  const students = participants.filter((item) => item.role === "student");

  return <FeaturePage eyebrow="Live studio" title={session ? "Class is live." : "Explain it in real time."} description={session ? `${session.title} · started ${started}` : isStaff ? "Start a live class: the call opens for everyone and every student's screen follows yours." : `When ${teacherName} starts a class, a Join button appears here and on every screen.`}>
    {joined && <div className="live-stage-anchor" aria-hidden={activeSection !== "live"}><div className="live-stage-hint"><Icon name="live" size={20}/><span>The call is on this screen. Move to Learning or Exam Arena and it follows you in the corner.</span></div></div>}
    <div className="live-stage">
      <div className="live-lobby">
        {loading ? <div className="loading-panel">Checking for a live class…</div>
          : session ? <>
            <span className="call-live big"><i/> LIVE</span>
            <h2>{session.title}</h2>
            <p>Hosted by {isHost ? "you" : teacherName} · started {started}{participants.length ? ` · ${students.length} student${students.length === 1 ? "" : "s"} in class` : ""}</p>
            <div className="live-buttons">
              {!joined ? <button className="primary-button" onClick={join}><Icon name="live" size={18}/> {isHost ? "Rejoin your class" : "Join the live class"}</button>
                : <button className="outline-button" onClick={leave}><Icon name="x" size={16}/> Leave the call</button>}
              {isStaff && <button className="outline-button compact-button" onClick={() => { if (window.confirm("End the live class for everyone?")) endClass(); }}>End class for everyone</button>}
            </div>
            {!isHost && joined && <label className="follow-toggle"><input type="checkbox" checked={follow} onChange={(event) => setFollow(event.target.checked)}/> Follow the teacher&apos;s screen automatically</label>}
            {isHost && joined && <p className="muted-line">Everything you open (a lesson, a mock paper, the Visual Pad) opens on every student&apos;s screen who is following. Use the screen-share button in the call to show anything else.</p>}
          </> : isStaff ? <form onSubmit={start} className="live-start">
            <span className="hero-tag">Teacher</span>
            <h2>Start a live class</h2>
            <label>Class title<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Bank reconciliation walkthrough" maxLength={80}/></label>
            <button className="primary-button" type="submit" disabled={busy}><Icon name="live" size={18}/> {busy ? "Starting…" : "Start live class"}</button>
            <p className="muted-line">A private room is created for this class. Students see a Join button the moment it starts. If the call asks the host to log in, sign in there once with Google; students never need to.</p>
          </form> : <>
            <span className="hero-tag">Waiting</span>
            <h2>No live class right now.</h2>
            <p>You will see a Join button here and at the top of every screen when {teacherName} goes live. Until then, carry on with Today&apos;s session.</p>
          </>}
        {error && <p className="coach-error" role="alert">{error}</p>}
      </div>
      <div className="join-panel live-people-panel">
        <span>{session ? "In the room" : "How it works"}</span>
        {session ? (participants.length ? <ul className="people-list">{participants.map((person) => <li key={person.id}><span className="account-avatar">{initialsOf(person.name)}</span><div><strong>{person.name}{person.id === user?.id ? " (you)" : ""}</strong><small>{ROLE_LABELS[person.role] || "Student"} · {SECTION_LABELS[person.section] || person.section || "—"}</small></div></li>)}</ul> : <p>{joined ? "Nobody else has joined yet." : "Join the class to see who is in the room."}</p>)
          : <ol className="how-list"><li>{isStaff ? "Start the class; a private call opens." : `${teacherName} starts the class.`}</li><li>Everyone joins with one tap. Microphones start muted for students.</li><li>Whatever screen the teacher opens, every student&apos;s app opens too.</li></ol>}
        {profile?.role === "student" && !session && <p className="muted-line">Signed in as {displayName(profile, user)}.</p>}
      </div>
    </div>
    <section className="shared-notes"><div><span>Session notes</span><small>This browser only</small></div><textarea value={notes} onChange={(event) => updateNotes(event.target.value)} placeholder="Write the steps you need to keep…"/><p>Use Visual Pad for diagrams; its work is also saved in this browser.</p></section>
  </FeaturePage>;
}
