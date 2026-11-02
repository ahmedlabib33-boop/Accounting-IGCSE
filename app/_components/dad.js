"use client";

import { useEffect, useRef, useState } from "react";
import { FeaturePage, Icon, fetchJson, formatDate, loadLearning } from "./ui";
import { deleteVoiceNote, saveVoiceNote } from "./effects";
import { assignmentDone } from "./today";
import { TOPICS, dayKey, levelFor, minutesStudied, predictGrade, streakFor, topGains, withExtras, xpFor } from "../_lib/study-engine.mjs";

const GOAL_KINDS = {
  level: { label: (target) => `Reach level ${target}`, targets: [2, 3, 4, 5, 6, 8, 10] },
  streak: { label: (target) => `Study ${target} days in a row`, targets: [3, 5, 7, 14, 21, 30] },
  mock: { label: (target) => `Score ${target}% or more in a mock`, targets: [50, 60, 70, 80, 90] },
  topic: { label: (target) => `Finish Topic ${target}: ${TOPICS.find((topic) => topic.id === String(target))?.name}`, targets: TOPICS.map((topic) => topic.id) },
};

function VoiceRecorder({ onRecorded }) {
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");
  const recorder = useRef(null);
  const chunks = useRef([]);
  const timer = useRef(null);
  useEffect(() => () => { window.clearTimeout(timer.current); recorder.current?.stream?.getTracks().forEach((track) => track.stop()); }, []);
  const start = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const media = new MediaRecorder(stream);
      chunks.current = [];
      media.ondataavailable = (event) => event.data.size && chunks.current.push(event.data);
      media.onstop = () => { stream.getTracks().forEach((track) => track.stop()); onRecorded(new Blob(chunks.current, { type: media.mimeType })); setState("done"); };
      recorder.current = media;
      media.start();
      setState("recording");
      timer.current = window.setTimeout(() => media.state === "recording" && media.stop(), 60000);
    } catch { setError("Microphone access was blocked. Allow it in the browser, or write a text message instead."); }
  };
  const stop = () => { window.clearTimeout(timer.current); recorder.current?.state === "recording" && recorder.current.stop(); };
  if (typeof window !== "undefined" && !window.MediaRecorder) return <p className="muted-line">Voice notes are not supported in this browser.</p>;
  return <div className="recorder">
    {state === "recording" ? <button type="button" className="primary-button compact-primary rec-on" onClick={stop}><Icon name="mic" size={18}/> Stop recording</button>
      : <button type="button" className="outline-button compact-button" onClick={start}><Icon name="mic" size={18}/> {state === "done" ? "Record again" : "Record a voice note (up to 60 s)"}</button>}
    {state === "done" && <span className="muted-line">Voice note ready.</span>}
    {error && <p className="coach-error" role="alert">{error}</p>}
  </div>;
}

export function DadPage({ study: rawStudy, setStudy }) {
  const study = withExtras(rawStudy);
  const [learning, setLearning] = useState(null);
  const [papers, setPapers] = useState({ p1: [], p2: [] });
  const [assign, setAssign] = useState({ kind: "lesson", target: "", due: "", note: "" });
  const [goal, setGoal] = useState({ kind: "level", target: "3", message: "" });
  const [voice, setVoice] = useState(null);
  const [saved, setSaved] = useState("");
  useEffect(() => {
    loadLearning().then(setLearning).catch(() => {});
    Promise.all([fetchJson("/api/content?type=exams&subject=Accounting"), fetchJson("/api/content?type=structured")])
      .then(([p1, p2]) => setPapers({ p1: p1.exams.map((exam) => exam.id), p2: p2.papers.map((paper) => paper.id) })).catch(() => {});
  }, []);
  const today = dayKey();
  const level = levelFor(xpFor(study));
  const streak = streakFor(study, today);
  const prediction = predictGrade(study);
  const weak = topGains(study, 5);
  const lastActive = [...new Set([...study.practiceLog, ...study.reviewLog, ...study.labLog, ...(study.attempts || [])].map((item) => item.date).filter(Boolean))].sort().at(-1);
  const titleFor = (kind, target) => kind === "lesson" ? learning?.lessons.find((lesson) => lesson.id === target)?.title || target : target;

  const addAssignment = (event) => {
    event.preventDefault();
    if (!assign.target) return;
    const item = { id: `a-${Date.now()}`, kind: assign.kind, target: assign.target, title: assign.kind === "lesson" ? `Lesson: ${titleFor("lesson", assign.target)}` : `Mock: ${assign.target}`, due: assign.due, note: assign.note.trim().slice(0, 140), created: new Date().toISOString() };
    setStudy((current) => ({ ...current, assignments: [item, ...withExtras(current).assignments].slice(0, 40) }));
    setAssign({ kind: assign.kind, target: "", due: "", note: "" });
    setSaved("Assignment added. Omar will see it on his Today page.");
  };
  const addGoal = async (event) => {
    event.preventDefault();
    if (!goal.message.trim() && !voice) return;
    const id = `g-${Date.now()}`;
    let hasVoice = false;
    if (voice) { try { await saveVoiceNote(id, voice); hasVoice = true; } catch { setSaved("The voice note could not be saved on this device; the text message was saved."); } }
    const item = { id, kind: goal.kind, target: goal.target, label: GOAL_KINDS[goal.kind].label(goal.target), message: goal.message.trim().slice(0, 600), hasVoice, created: new Date().toISOString() };
    setStudy((current) => ({ ...current, goals: [item, ...withExtras(current).goals].slice(0, 30) }));
    setGoal({ ...goal, message: "" });
    setVoice(null);
    if (!saved.startsWith("The voice")) setSaved("Goal saved. The message stays locked until Omar reaches it.");
  };
  const removeGoal = (item) => { if (item.hasVoice) deleteVoiceNote(item.id).catch(() => {}); setStudy((current) => ({ ...current, goals: withExtras(current).goals.filter((g) => g.id !== item.id) })); };

  return <FeaturePage eyebrow="Dad's view" title="See the progress. Guide the next step." description="A summary for Mr. Basiouny: study time, scores, weak topics and streaks, plus lessons to assign and goals that unlock your messages.">
    <p className="device-note"><Icon name="lock" size={16}/> This view shows the progress saved on this device. To follow Omar from your own phone, the app needs cloud sync, which is planned for the next phase.</p>
    <div className="dad-tiles">
      <div className="dad-tile"><span>Study time · 7 days</span><strong>{minutesStudied(study, 7, today)} min</strong><small>{minutesStudied(study, 1, today)} min today</small></div>
      <div className="dad-tile"><span>Streak</span><strong>{streak.current} days</strong><small>Best {streak.best} · {streak.freezes} protector{streak.freezes === 1 ? "" : "s"}</small></div>
      <div className="dad-tile"><span>Predicted grade</span><strong>{prediction ? prediction.grade : "—"}</strong><small>{prediction ? `${prediction.percent}% · ${prediction.confidence} confidence` : "Not enough answers yet"}</small></div>
      <div className="dad-tile"><span>Level</span><strong>{level.level}</strong><small>{level.rank} · {level.xp.toLocaleString()} XP</small></div>
      <div className="dad-tile"><span>Lessons done</span><strong>{(study.completedLessons || []).length} / 65</strong><small>Last active {lastActive ? formatDate(lastActive) : "—"}</small></div>
    </div>

    <div className="today-grid">
      <div className="today-block">
        <h2>Recent mock scores</h2>
        {(study.attempts || []).length ? <div className="score-list">{study.attempts.slice(0, 6).map((attempt) => <div key={attempt.id}><span>{formatDate(attempt.date)} · {attempt.examId}</span><strong>{attempt.percent}%</strong><small>{attempt.marking}</small></div>)}</div> : <p className="muted-line">No mocks taken yet.</p>}
      </div>
      <div className="today-block">
        <h2>Topics to focus on</h2>
        <ol className="gain-list">{weak.map((item) => <li key={item.section}><div><strong>{item.section} {item.title}</strong><span>{item.accuracy === null ? "Not tried yet" : `${Math.round(item.accuracy * 100)}% correct over ${item.answered} answers`}</span></div></li>)}</ol>
      </div>
    </div>

    <div className="today-grid">
      <form className="today-block dad-form" onSubmit={addAssignment}>
        <h2>Assign a lesson or mock</h2>
        <div className="segmented">{[["lesson", "Lesson"], ["mock", "Mock exam"]].map(([kind, label]) => <button type="button" key={kind} className={assign.kind === kind ? "selected" : ""} onClick={() => setAssign({ ...assign, kind, target: "" })}>{label}</button>)}</div>
        <label>{assign.kind === "lesson" ? "Lesson" : "Mock exam"}<select id="dad-assign-target" value={assign.target} onChange={(event) => setAssign({ ...assign, target: event.target.value })}>
          <option value="">Choose…</option>
          {assign.kind === "lesson" ? learning?.lessons.map((lesson) => <option key={lesson.id} value={lesson.id}>{lesson.section} · {lesson.title}</option>) : [...papers.p1, ...papers.p2].map((id) => <option key={id} value={id}>{id}</option>)}
        </select></label>
        <label>Due date (optional)<input id="dad-assign-due" type="date" value={assign.due} onChange={(event) => setAssign({ ...assign, due: event.target.value })}/></label>
        <label>Note (optional)<input id="dad-assign-note" value={assign.note} maxLength={140} onChange={(event) => setAssign({ ...assign, note: event.target.value })} placeholder="Focus on the workings"/></label>
        <button className="primary-button compact-primary" disabled={!assign.target}>Assign</button>
        {study.assignments.length > 0 && <div className="assigned-list">{study.assignments.map((item) => { const done = assignmentDone(item, study); return <div key={item.id} className={done ? "assigned done" : "assigned"}><Icon name={done ? "check" : "clock"} size={16}/><span>{item.title}{item.due ? ` · due ${item.due}` : ""}</span><button type="button" className="text-button" onClick={() => setStudy((current) => ({ ...current, assignments: withExtras(current).assignments.filter((a) => a.id !== item.id) }))}>Remove</button></div>; })}</div>}
      </form>

      <form className="today-block dad-form" onSubmit={addGoal}>
        <h2>Goals that unlock your message</h2>
        <label>Goal<select id="dad-goal-kind" value={goal.kind} onChange={(event) => setGoal({ ...goal, kind: event.target.value, target: String(GOAL_KINDS[event.target.value].targets[0]) })}>
          <option value="level">Reach a level</option><option value="streak">Study days in a row</option><option value="mock">Score in a mock</option><option value="topic">Finish a topic</option>
        </select></label>
        <label>Target<select id="dad-goal-target" value={goal.target} onChange={(event) => setGoal({ ...goal, target: event.target.value })}>{GOAL_KINDS[goal.kind].targets.map((target) => <option key={target} value={String(target)}>{GOAL_KINDS[goal.kind].label(target)}</option>)}</select></label>
        <label>Your message<textarea id="dad-goal-message" rows={3} maxLength={600} value={goal.message} onChange={(event) => setGoal({ ...goal, message: event.target.value })} placeholder="I knew you could do it, Omar…"/></label>
        <VoiceRecorder onRecorded={setVoice}/>
        <button className="primary-button compact-primary" disabled={!goal.message.trim() && !voice}>Save goal</button>
        {study.goals.length > 0 && <div className="assigned-list">{study.goals.map((item) => <div key={item.id} className={item.unlockedAt ? "assigned done" : "assigned"}><Icon name={item.unlockedAt ? "unlock" : "lock"} size={16}/><span>{item.label}{item.hasVoice ? " · voice note" : ""}{item.unlockedAt ? ` · unlocked ${formatDate(item.unlockedAt)}` : ""}</span><button type="button" className="text-button" onClick={() => removeGoal(item)}>Remove</button></div>)}</div>}
      </form>
    </div>
    {saved && <p className="save-note" role="status">{saved}</p>}
  </FeaturePage>;
}
