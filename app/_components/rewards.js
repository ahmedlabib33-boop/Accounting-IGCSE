"use client";

import { useEffect, useState } from "react";
import { FeaturePage, Icon, ProgressBar, formatDate, loadLearning } from "./ui";
import { loadVoiceNote } from "./effects";
import { SECTION_TITLES, TOPICS, badgesFor, goalReached, levelFor, sectionMastery, withExtras, xpFor } from "../_lib/study-engine.mjs";

const LEVEL_LABELS = { new: "Not started", learning: "Learning", good: "Good", mastered: "Mastered" };
const escape = (value) => String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);

// Opens a clean, print-ready page in a new tab. The browser's print dialog saves it as PDF.
function printPage(title, body) {
  const page = window.open("", "_blank");
  if (!page) return false;
  page.document.write(`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escape(title)}</title><style>
    @page{size:A4;margin:16mm}body{font:14px/1.5 Georgia,serif;color:#1d1a2e;margin:0}h1,h2,h3{font-family:Arial,sans-serif;margin:0 0 6px}
    .cert{border:6px double #6d4fd8;border-radius:12px;padding:48px 40px;text-align:center;min-height:220mm;display:flex;flex-direction:column;justify-content:center;gap:14px}
    .cert h1{font-size:40px;color:#4c33b8;letter-spacing:1px}.cert .name{font-size:34px;font-style:italic;border-bottom:1px solid #999;display:inline-block;padding:0 30px 6px}
    .cert small{color:#666}.sig{margin-top:40px;display:flex;justify-content:space-around}.sig div{border-top:1px solid #555;padding-top:6px;min-width:200px}
    .sum h1{font-size:22px;color:#4c33b8}.sum .meta{color:#666;margin-bottom:12px}.lesson{break-inside:avoid;border-left:4px solid #8b5cf6;padding:4px 10px;margin:0 0 10px}
    .lesson h3{font-size:14px}.formula{font-family:Consolas,monospace;background:#f1edff;padding:2px 6px;border-radius:4px}.lesson p{margin:3px 0}.ar{direction:rtl;color:#444}
  </style></head><body>${body}<script>window.onload=()=>setTimeout(()=>window.print(),250)</script></body></html>`);
  page.document.close();
  return true;
}

function printCertificate(topic, date) {
  printPage(`Certificate · ${topic.name}`, `<div class="cert"><small>IGCSE Accounting · Cambridge 0452 practice</small><h1>Certificate of Completion</h1><p>This certifies that</p><div><span class="name">Omar</span></div><p>has completed every lesson in</p><h2>Topic ${topic.id}: ${escape(topic.name)}</h2><p>Sections ${topic.sections.join(", ")}</p><small>Awarded ${escape(new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(date)))}</small><div class="sig"><div>Mr. Mohamed Basiouny<br><small>Teacher and father</small></div><div>Accounting 0452 study app</div></div></div>`);
}

function printSummary(topic, lessons) {
  const items = lessons.filter((lesson) => lesson.topicId === topic.id).map((lesson) => `<div class="lesson"><h3>${escape(lesson.section)} · ${escape(lesson.title)}</h3>${lesson.formula ? `<p class="formula">${escape(lesson.formula)}</p>` : ""}<p>${escape(lesson.explanation)}</p>${lesson.tip ? `<p><b>Tip:</b> ${escape(lesson.tip)}</p>` : ""}${lesson.arabic ? `<p class="ar" lang="ar">${escape(lesson.arabic)}</p>` : ""}</div>`).join("");
  printPage(`Topic ${topic.id} summary`, `<div class="sum"><h1>Topic ${topic.id}: ${escape(topic.name)}</h1><p class="meta">Cambridge IGCSE Accounting 0452 · one-page revision summary · sections ${topic.sections.join(", ")}</p>${items}</div>`);
}

function DadMessage({ goal }) {
  const [audio, setAudio] = useState("");
  useEffect(() => {
    if (!goal.hasVoice) return undefined;
    let url = "";
    loadVoiceNote(goal.id).then((blob) => { if (blob) { url = URL.createObjectURL(blob); setAudio(url); } }).catch(() => {});
    return () => { if (url) URL.revokeObjectURL(url); };
  }, [goal]);
  return <article className="dad-message"><div className="father-badge"><Icon name="heart" size={22}/></div><div><span>{goal.label}{goal.unlockedAt ? ` · unlocked ${formatDate(goal.unlockedAt)}` : ""}</span>{goal.message && <p>{goal.message}</p>}{audio && <audio controls src={audio}/>}{goal.hasVoice && !audio && <small>The voice note is saved on the device Dad recorded it on.</small>}<strong>— Dad</strong></div></article>;
}

function SettingsPanel({ study, setStudy }) {
  const settings = withExtras(study).settings;
  const set = (key, value) => setStudy((current) => ({ ...current, settings: { ...withExtras(current).settings, [key]: value } }));
  const toggles = [["sound", "Sound on correct answers"], ["confetti", "Confetti"], ["haptics", "Vibration (phones)"]];
  return <section className="panel settings-panel" id="settings"><div className="panel-title"><span><Icon name="gear"/> Settings</span><em>This device</em></div>
    <div className="settings-grid">
      {toggles.map(([key, label]) => <label className="switch-row" key={key}><span>{label}</span><input type="checkbox" role="switch" checked={settings[key] !== false} onChange={(event) => set(key, event.target.checked)}/></label>)}
      <label className="switch-row"><span>Light theme</span><input type="checkbox" role="switch" checked={settings.theme === "light"} onChange={(event) => set("theme", event.target.checked ? "light" : "dark")}/></label>
      <div className="size-row"><span>Text size</span><div className="segmented">{[[0.9, "A−"], [1, "A"], [1.12, "A+"], [1.25, "A++"]].map(([value, label]) => <button key={value} className={Number(settings.textSize || 1) === value ? "selected" : ""} onClick={() => set("textSize", value)} aria-label={`Text size ${label}`}>{label}</button>)}</div></div>
    </div>
  </section>;
}

export function RewardsPage({ study, setStudy, target }) {
  const full = withExtras(study);
  const level = levelFor(xpFor(full));
  const badges = badgesFor(full);
  const mastery = sectionMastery(full);
  const [lessons, setLessons] = useState([]);
  useEffect(() => { loadLearning().then((data) => setLessons(data.lessons)).catch(() => {}); }, []);
  useEffect(() => { if (target?.goal || target?.settings) document.getElementById(target.goal ? "dad-messages" : "settings")?.scrollIntoView({ behavior: "smooth" }); }, [target]);
  const unlocked = full.goals.filter((goal) => goal.unlockedAt || goalReached(goal, full));
  const earned = badges.filter((badge) => badge.earned).length;
  return <FeaturePage eyebrow="Rewards" title="Level up the ledger." description="Experience points for every lesson, answer and mock. Badges for real milestones, and a syllabus map that lights up as you master it.">
    <section className="panel level-card"><div className="level-badge"><span>Level</span><strong>{level.level}</strong></div><div className="level-copy"><h2>{level.rank}</h2><p>{level.xp.toLocaleString()} XP · {Math.max(0, level.ceiling - level.xp).toLocaleString()} XP to level {level.level + 1}</p><ProgressBar value={level.progress} label="Progress to the next level" tone="lime"/><small>Lesson 50 XP · right answer 10 · spaced review 15 · Practice Lab 20 · mock 100 + your score</small></div></section>

    {unlocked.length > 0 && <section className="rewards-block" id="dad-messages"><h2>Messages from Dad</h2><div className="dad-messages">{unlocked.map((goal) => <DadMessage key={goal.id} goal={goal}/>)}</div></section>}

    <section className="rewards-block"><h2>Syllabus map <small>{Object.values(mastery).filter((item) => item.level === "mastered").length} of 28 mastered</small></h2>
      <div className="map-legend">{Object.entries(LEVEL_LABELS).map(([key, label]) => <span key={key} className={`tile-${key}`}><i/>{label}</span>)}</div>
      <div className="syllabus-map">{TOPICS.map((topic) => <div className="map-topic" key={topic.id}><h3><span>{topic.id}</span>{topic.name}</h3><div className="map-tiles">{topic.sections.map((section) => { const item = mastery[section]; return <div key={section} className={`map-tile tile-${item.level}`} title={`${section} ${SECTION_TITLES[section]}: ${LEVEL_LABELS[item.level]}, ${item.score}/100`}><strong>{section}</strong><span>{SECTION_TITLES[section]}</span><small>{item.lessonsDone}/{item.lessons} lessons · {item.accuracy === null ? "no answers yet" : `${Math.round(item.accuracy * 100)}% right`}</small></div>; })}</div></div>)}</div>
    </section>

    <section className="rewards-block"><h2>Badges <small>{earned} of {badges.length} earned</small></h2><div className="badge-grid">{badges.map((badge) => <div key={badge.id} className={badge.earned ? "badge earned" : "badge"}><Icon name={badge.earned ? "trophy" : "lock"} size={24}/><strong>{badge.name}</strong><span>{badge.hint}</span></div>)}</div></section>

    <section className="rewards-block"><h2>Certificates and topic summaries</h2><p className="fine-print">A certificate unlocks when every lesson in a topic is complete. One-page summaries are ready any time. Both open a print view that you can save as PDF.</p>
      <div className="certificate-list">{TOPICS.map((topic) => { const done = goalReached({ kind: "topic", target: topic.id }, full); const dates = topic.sections.flatMap((section) => Object.entries(full.lessonDates).filter(([id]) => id.startsWith(`0452-${section}-`)).map(([, date]) => date)).sort(); return <div key={topic.id} className={done ? "certificate-row done" : "certificate-row"}><Icon name={done ? "star" : "book"} size={20}/><div><strong>Topic {topic.id}: {topic.name}</strong><small>{topic.sections.map((section) => `${mastery[section].lessonsDone}/${mastery[section].lessons}`).join(" · ")} lessons by section</small></div><button className="outline-button compact-button" disabled={!lessons.length} onClick={() => printSummary(topic, lessons)}>Summary</button><button className="primary-button compact-primary" disabled={!done} onClick={() => printCertificate(topic, dates.at(-1) || new Date().toISOString())}>{done ? "Certificate" : <><Icon name="lock" size={15}/> Certificate</>}</button></div>; })}</div>
    </section>

    <SettingsPanel study={study} setStudy={setStudy}/>
  </FeaturePage>;
}
