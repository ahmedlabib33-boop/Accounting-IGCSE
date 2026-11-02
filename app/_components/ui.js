"use client";

import { useState } from "react";

// Shared building blocks used by every screen.

export function Icon({ name, size = 22, stroke = 1.8 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const paths = {
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></>,
    book: <><path d="M4 5.7A2.7 2.7 0 0 1 6.7 3H11v17H6.7A2.7 2.7 0 0 0 4 22Z"/><path d="M20 5.7A2.7 2.7 0 0 0 17.3 3H13v17h4.3A2.7 2.7 0 0 1 20 22Z"/></>,
    brain: <><path d="M9.7 4A3.3 3.3 0 0 0 4 6.2 3.5 3.5 0 0 0 4.7 13a3.8 3.8 0 0 0 5 5.3c.8 1.1 1.9 1.7 3.1 1.7V4Z"/><path d="M14.3 4A3.3 3.3 0 0 1 20 6.2a3.5 3.5 0 0 1-.7 6.8 3.8 3.8 0 0 1-5 5.3c-.8 1.1-1.9 1.7-3.1 1.7V4Z"/><path d="M8 9c.7.4 1.4.5 2 .4M16 9c-.7.4-1.4.5-2 .4M9 14c.6.4 1.2.5 2 .4M15 14c-.6.4-1.2.5-2 .4"/></>,
    pen: <><path d="m14.7 4.3 5 5L8 21H3v-5Z"/><path d="m12.2 6.8 5 5"/><path d="M3 21h7"/></>,
    target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v2M22 12h-2M12 22v-2M2 12h2"/></>,
    live: <><path d="M7.5 7.5a6.4 6.4 0 0 0 0 9M4.4 4.4a10.8 10.8 0 0 0 0 15.2M16.5 7.5a6.4 6.4 0 0 1 0 9M19.6 4.4a10.8 10.8 0 0 1 0 15.2"/><circle cx="12" cy="12" r="1.5"/></>,
    headphones: <><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14a2 2 0 0 1 2-2h1v7H6a2 2 0 0 1-2-2ZM20 14a2 2 0 0 0-2-2h-1v7h1a2 2 0 0 0 2-2Z"/></>,
    vault: <><path d="M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M2 8h20M6 4h12l2 4H4Z"/><path d="M9 13h6"/></>,
    trend: <><path d="m3 17 6-6 4 4 8-9"/><path d="M16 6h5v5"/></>,
    flame: <path d="M12 22c4 0 7-2.7 7-6.5 0-2.8-1.7-5.6-4.2-7.7.2 2-1.2 3.8-2.4 4.3.4-3.5-1.8-6-4.6-8.1C8.1 8.7 5 10.7 5 15.4 5 19.3 8 22 12 22Z"/>,
    sliders: <><path d="M4 5h16M4 12h16M4 19h16"/><circle cx="9" cy="5" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="8" cy="19" r="2"/></>,
    send: <path d="m21 3-7.2 18-3.4-7.4L3 10.2Z"/>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    heart: <path d="M20.8 8.5c0 6-8.8 11-8.8 11s-8.8-5-8.8-11A4.7 4.7 0 0 1 12 5.8a4.7 4.7 0 0 1 8.8 2.7Z"/>,
    shuffle: <><path d="m18 4 3 3-3 3"/><path d="M3 7h4c4 0 5 10 10 10h4"/><path d="m18 14 3 3-3 3"/><path d="M3 17h4c1.8 0 2.8-2 4-4"/></>,
    previous: <><path d="m19 20-9-8 9-8v16Z"/><path d="M5 19V5"/></>,
    next: <><path d="m5 4 9 8-9 8V4Z"/><path d="M19 5v14"/></>,
    repeat: <><path d="M17 2l3 3-3 3"/><path d="M20 5H8a4 4 0 0 0-4 4v1"/><path d="m7 22-3-3 3-3"/><path d="M4 19h12a4 4 0 0 0 4-4v-1"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    external: <><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></>,
    play: <path d="m8 5 11 7-11 7Z"/>,
    pause: <><path d="M8 5v14M16 5v14"/></>,
    check: <path d="m5 12 4.2 4L19 6"/>,
    x: <><path d="m6 6 12 12M18 6 6 18"/></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    unlock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M16 10V7a4 4 0 0 0-7.6-2.4"/></>,
    today: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    lab: <><path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7.5 14h9"/></>,
    users: <><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/></>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></>,
    volume: <><path d="M4 9h4l5-4v14l-5-4H4Z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></>,
    trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0Z"/><path d="M8 6H4a3 3 0 0 0 4 4M16 6h4a3 3 0 0 1-4 4M12 13v4M8 21h8M9 17h6"/></>,
    shield: <path d="M12 3 4 6v6c0 4.6 3.4 8.3 8 9 4.6-.7 8-4.4 8-9V6Z"/>,
    gear: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"/></>,
    layers: <><path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 13 9 5 9-5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z"/>,
    camera: <><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13.5" r="3.5"/></>,
    copy: <><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
  };
  return <svg {...common}>{paths[name] || paths.home}</svg>;
}

export function Ring({ value = 68, label = "68%", blue = false, size = "md" }) {
  return <div className={`ring ring-${size}`} style={{ "--value": Math.max(0, Math.min(100, value)), "--accent": blue ? "#22d3ee" : "#8b5cf6" }}><div><strong>{label}</strong></div></div>;
}

export async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "The request could not be completed.");
  return data;
}

export function formatMinutes(seconds) {
  return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));
}

export function FeaturePage({ title, eyebrow, children, description }) {
  return <section className="section-screen"><div className="section-heading"><span>{eyebrow}</span><h1>{title}</h1>{description && <p>{description}</p>}</div>{children}</section>;
}

export function QuestionChoices({ question, answer, onAnswer, result }) {
  return <div className="answer-list">{question.choices.map((choice) => {
    const state = result ? (choice.id === result.answer ? "correct" : choice.id === result.selected ? "wrong" : "") : answer === choice.id ? "selected-answer" : "";
    return <button key={choice.id} className={state} onClick={() => !result && onAnswer(choice.id)} disabled={Boolean(result)}><span>{choice.id}</span>{choice.text}{result && choice.id === result.answer && <Icon name="check" size={18}/>} {result && choice.id === result.selected && choice.id !== result.answer && <Icon name="x" size={18}/>}</button>;
  })}</div>;
}

// One shared request for the lesson bank, reused by every screen.
let learningRequest;
export function loadLearning() {
  learningRequest ||= fetchJson("/api/content?type=learning&subject=Accounting").catch((error) => { learningRequest = null; throw error; });
  return learningRequest;
}

const STOP_WORDS = new Set("the a an and or of to in on for is are was be by with how what why when do does i my me it this that from as at your you can into than then".split(" "));
const words = (text) => String(text || "").toLowerCase().match(/[a-z]{3,}/g)?.filter((word) => !STOP_WORDS.has(word)) || [];

// Lessons whose title and rule best match a piece of text, for "open the matching lesson" links.
export function matchLessons(text, lessons, count = 2) {
  const wanted = new Set(words(text));
  if (!wanted.size) return [];
  return lessons.map((lesson) => {
    const title = words(lesson.title);
    const body = words(`${lesson.formula || ""} ${lesson.ruleTitle || ""}`);
    const score = title.filter((word) => wanted.has(word)).length * 3 + body.filter((word) => wanted.has(word)).length;
    return { lesson, score: score / Math.sqrt(title.length + body.length + 1) };
  }).filter((item) => item.score > 0.6).sort((a, b) => b.score - a.score).slice(0, count).map((item) => item.lesson);
}

export function ProgressBar({ value, label, tone = "violet" }) {
  const percent = Math.round(Math.max(0, Math.min(1, value)) * 100);
  return <div className={`bar bar-${tone}`} role="progressbar" aria-label={label} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${percent}%` }}/></div>;
}

// ----- Worked answers revealed one step at a time -----

export function splitSteps(text) {
  return String(text || "").split(/(?<=[.!?;])\s+(?=[A-Z$(0-9])/).map((step) => step.trim()).filter(Boolean);
}

export function StepReveal({ text, steps: given, label = "Worked answer" }) {
  const steps = given || splitSteps(text);
  const [shown, setShown] = useState(1);
  if (!steps.length) return null;
  return <div className="step-reveal">
    <div className="step-reveal-head"><span>{label}</span><small>{shown} / {steps.length} steps shown</small></div>
    <ol>{steps.slice(0, shown).map((step, index) => <li key={index}>{step}</li>)}</ol>
    {shown < steps.length
      ? <div className="step-reveal-actions"><button className="outline-button compact-button" onClick={() => setShown((value) => value + 1)}>Try the next step, then reveal it <Icon name="arrow" size={16}/></button><button className="text-button" onClick={() => setShown(steps.length)}>Show all</button></div>
      : <button className="text-button" onClick={() => setShown(1)}>Start again</button>}
  </div>;
}

