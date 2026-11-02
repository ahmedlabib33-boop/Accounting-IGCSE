"use client";



import StructuredExam from "./structured-exam";

import { BrandMark } from "./_components/brand-mark";

import { FeaturePage, Icon, QuestionChoices, Ring, fetchJson, formatDate, formatMinutes, loadLearning, matchLessons, StepReveal } from "./_components/ui";

import { TodayPage, PredictedGrade, recordAnswer } from "./_components/today";

import { RewardsPage } from "./_components/rewards";

import { LabPage } from "./_components/lab";

import { DadPage } from "./_components/dad";

import { celebrate } from "./_components/effects";

import { AccountChip, AnnouncementBanner, useAccount } from "./_components/account";

import { LiveCallDock, LiveNudge, LivePage, useLiveClass } from "./_components/live";

import { EMPTY_EXTRAS, SECTION_TITLES, TOPICS, addStudyTime, badgesFor, dayKey, goalReached, levelFor, predictGrade, recordMistake, recordReview, reviewState, reviewSummary, scheduleReview, sectionStats, streakFor, updateFreezes, withExtras, xpFor, MASTERED_STAGE } from "./_lib/study-engine.mjs";



import { useCallback, useEffect, useMemo, useRef, useState } from "react";



const NAV_ITEMS = [
  ["home", "Home", "home"],
  ["today", "Today", "today"],
  ["learning", "Learning", "book"],
  ["lab", "Practice Lab", "lab"],
  ["exam", "Exam Arena", "target"],
  ["coach", "AI Coach", "brain"],
  ["vault", "Review Vault", "vault"],
  ["progress", "Progress", "trend"],
  ["rewards", "Rewards", "trophy"],
  ["pad", "Visual Pad", "pen"],
  ["live", "Live Studio", "live"],
  ["music", "Focus Music", "headphones"],
  ["dad", "Dad's view", "users"],
];



// Live Studio sits in the middle: the teacher teaches through it.
const TAB_ITEMS = [["home", "Home", "home"], ["learning", "Learn", "book"], ["live", "Live", "live"], ["today", "Today", "today"]];

const STORAGE_KEY = "accounting-0452:study:v1";

const EMPTY_STUDY = { completedLessons: [], attempts: [], mistakes: [], reviewedIds: [], musicUrl: "", ...EMPTY_EXTRAS };



// Each account keeps its own study record in this browser and a cloud copy in Supabase,
// so progress follows the student between devices and the teacher can see it.
function useStoredStudy(account) {
  const { supabase, user, enabled } = account;
  const key = user ? `${STORAGE_KEY}:${user.id}` : STORAGE_KEY;
  const [study, setStudy] = useState(EMPTY_STUDY);
  const [hydrated, setHydrated] = useState(false);
  const [cloudState, setCloudState] = useState("");
  const hydratedWith = useRef(null);
  const pushNow = useRef(false);

  useEffect(() => {
    let active = true;
    let local = null;
    try {
      local = JSON.parse(window.localStorage.getItem(key) || "null");
      // The first signed-in account on this device inherits the record kept before accounts existed.
      if (!local && user) local = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    } catch { local = null; }
    if (local && typeof local !== "object") local = null;
    const localAt = Number(window.localStorage.getItem(`${key}:at`) || 0);
    const apply = (data) => {
      const next = data ? { ...EMPTY_STUDY, ...data } : EMPTY_STUDY;
      hydratedWith.current = next;
      setStudy(next);
      setHydrated(true);
    };
    if (!enabled) { apply(local); return undefined; }
    const fallback = window.setTimeout(() => { if (active && !hydratedWith.current) { apply(local); setCloudState("offline"); } }, 5000);
    supabase.from("study_records").select("data, updated_at").eq("user_id", user.id).maybeSingle().then(({ data: row, error }) => {
      if (!active || hydratedWith.current) return;
      window.clearTimeout(fallback);
      if (error) { apply(local); setCloudState("offline"); return; }
      const remoteAt = row ? new Date(row.updated_at).getTime() : 0;
      if (row && row.data && remoteAt >= localAt) { apply(row.data); setCloudState("synced"); }
      else { apply(local); pushNow.current = Boolean(local); setCloudState("synced"); }
    });
    return () => { active = false; window.clearTimeout(fallback); };
  }, [key, enabled, supabase, user]);

  useEffect(() => {
    if (!hydrated) return undefined;
    const changed = study !== hydratedWith.current;
    window.localStorage.setItem(key, JSON.stringify(study));
    if (changed) window.localStorage.setItem(`${key}:at`, String(Date.now()));
    if (!enabled || (!changed && !pushNow.current)) return undefined;
    pushNow.current = false;
    setCloudState("saving");
    const timer = window.setTimeout(() => {
      supabase.from("study_records").upsert({ user_id: user.id, data: study }).then(({ error }) => setCloudState(error ? "offline" : "synced"), () => setCloudState("offline"));
    }, changed ? 1500 : 0);
    return () => window.clearTimeout(timer);
  }, [study, hydrated, key, enabled, supabase, user]);

  return [study, setStudy, hydrated, cloudState];
}

function safeText(value) { return String(value || "").trim(); }



function Timer({ seconds, running, onToggle, compact = false }) {

  return <><div className="focus-ring"><div><strong>{formatMinutes(seconds)}</strong><span>Deep Focus</span></div></div><div className="playlist"><div><strong>Concrete Mindset</strong><span>Lo-Fi Blueprint</span></div><button className="icon-button" aria-label="Save track"><Icon name="heart" size={19}/></button></div><div className="player-controls"><button aria-label="Shuffle"><Icon name="shuffle" size={17}/></button><button aria-label="Previous"><Icon name="previous" size={17}/></button><button className="play-button" onClick={onToggle} aria-label={running ? "Pause focus timer" : "Start focus timer"}><Icon name={running ? "pause" : "play"} size={22} stroke={2.2}/></button><button aria-label="Next"><Icon name="next" size={17}/></button><button aria-label="Repeat"><Icon name="repeat" size={17}/></button></div>{!compact && <p className="timer-note">The timer continues while you study in this browser.</p>}</>;

}



function HlsVideo({ src }) {

  const ref = useRef(null);

  useEffect(() => {

    const video = ref.current;

    if (!video || !src) return undefined;

    let player;

    let active = true;

    const attach = async () => {

      if (video.canPlayType("application/vnd.apple.mpegurl")) { video.src = src; return; }

      const hlsModule = await import("hls.js");

      const Hls = hlsModule.default;

      if (!active || !Hls.isSupported()) return;

      player = new Hls();

      player.loadSource(src);

      player.attachMedia(video);

    };

    attach().catch(() => {});

    return () => { active = false; player?.destroy(); };

  }, [src]);

  return <video className="iptv-video" ref={ref} controls playsInline />;

}



function VisualPad() {

  const canvasRef = useRef(null);

  const drawing = useRef(false);

  const last = useRef(null);

  const [color, setColor] = useState("#f4f2ff");

  const [width, setWidth] = useState(3);

  const [grid, setGrid] = useState(true);

  const [hasDrawing, setHasDrawing] = useState(false);



  const paintSegment = useCallback((segment) => {

    const canvas = canvasRef.current;

    if (!canvas || !segment?.from || !segment?.to) return;

    const context = canvas.getContext("2d");

    context.strokeStyle = segment.color || "#f2eee6";

    context.lineWidth = Number(segment.width) || 3;

    context.lineCap = "round";

    context.lineJoin = "round";

    context.beginPath();

    context.moveTo(segment.from.x, segment.from.y);

    context.lineTo(segment.to.x, segment.to.y);

    context.stroke();

    setHasDrawing(true);

  }, []);



  useEffect(() => {

    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");

    const resize = () => {

      const rect = canvas.getBoundingClientRect();

      const previous = canvas.width && canvas.height ? canvas.toDataURL() : null;

      const ratio = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.floor(rect.width * ratio));

      canvas.height = Math.max(1, Math.floor(rect.height * ratio));

      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      context.fillStyle = "#101314";

      context.fillRect(0, 0, rect.width, rect.height);

      if (previous) {

        const image = new Image();

        image.onload = () => context.drawImage(image, 0, 0, rect.width, rect.height);

        image.src = previous;

      } else {

        const stored = window.localStorage.getItem("accounting-0452:pad:v1");

        if (stored) { const image = new Image(); image.onload = () => { context.drawImage(image, 0, 0, rect.width, rect.height); setHasDrawing(true); }; image.src = stored; }

      }

    };

    resize();

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);

  }, []);



  const point = (event) => {

    const rect = canvasRef.current.getBoundingClientRect();

    return { x: event.clientX - rect.left, y: event.clientY - rect.top };

  };

  const begin = (event) => { drawing.current = true; last.current = point(event); canvasRef.current.setPointerCapture?.(event.pointerId); };

  const draw = (event) => {

    if (!drawing.current || !last.current) return;

    const next = point(event);

    const segment = { from: last.current, to: next, color, width };

    paintSegment(segment);

    last.current = next;

  };

  const finish = () => {

    drawing.current = false;

    last.current = null;

    const canvas = canvasRef.current;

    if (canvas) window.localStorage.setItem("accounting-0452:pad:v1", canvas.toDataURL("image/png"));

  };

  const clear = () => {

    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();

    context.fillStyle = "#101314";

    context.fillRect(0, 0, rect.width, rect.height);

    window.localStorage.removeItem("accounting-0452:pad:v1");

    setHasDrawing(false);

  };

  const download = () => {

    const link = document.createElement("a");

    link.href = canvasRef.current.toDataURL("image/png");

    link.download = "accounting-0452-visual-pad.png";

    link.click();

  };

  return <section className="section-screen"><div className="section-heading"><span>Visual Pad</span><h1>Sketch the solution.</h1><p>Draw a diagram, map the forces, or make a fast note. Your work stays on this device.</p></div><div className="pad-toolbar"><div className="color-picks">{["#f4f2ff", "#f472b6", "#22d3ee", "#a3e635"].map((item) => <button onClick={() => setColor(item)} className={color === item ? "picked" : ""} key={item} style={{ background: item }} aria-label={`Use ${item} ink`}/>)}</div><label>Stroke <input type="range" min="1" max="12" value={width} onChange={(e) => setWidth(Number(e.target.value))}/></label><button className="outline-button compact-button" onClick={() => setGrid((value) => !value)}>{grid ? "Hide grid" : "Show grid"}</button><button className="outline-button compact-button" onClick={clear}>Clear pad</button><button className="outline-button compact-button" onClick={download}>Download</button></div><div className={`pad-wrap ${grid ? "with-grid" : ""}`}><canvas ref={canvasRef} onPointerDown={begin} onPointerMove={draw} onPointerUp={finish} onPointerLeave={finish}/><div className={`pad-hint ${hasDrawing ? "hidden" : ""}`}><Icon name="pen" size={28}/><span>Start drawing your accounting workings</span></div></div></section>;

}



function LearningPage({ study, setStudy, askCoach, target }) {

  const [subject, setSubject] = useState("Accounting");

  const [data, setData] = useState(null);

  const [error, setError] = useState("");

  const [topic, setTopic] = useState("");

  const [lessonId, setLessonId] = useState("");

  const [practiceIndex, setPracticeIndex] = useState(0);

  const [answer, setAnswer] = useState("");

  const [result, setResult] = useState(null);

  const [grading, setGrading] = useState(false);

  useEffect(() => {

    let active = true;

    setData(null); setError(""); setTopic(""); setLessonId(""); setPracticeIndex(0); setResult(null); setAnswer("");

    fetchJson(`/api/content?type=learning&subject=${subject}`).then((response) => { if (active) setData(response); }).catch((requestError) => { if (active) setError(requestError.message); });

    return () => { active = false; };

  }, [subject]);

  const visibleLessons = useMemo(() => {

    if (!data) return [];

    if (!topic) return data.lessons;

    return data.lessons.filter((lesson) => lesson.topicId === topic || lesson.domain === topic);

  }, [data, topic]);

  useEffect(() => { if (visibleLessons.length && !visibleLessons.some((lesson) => lesson.id === lessonId)) setLessonId(visibleLessons[0].id); }, [visibleLessons, lessonId]);

  const lesson = visibleLessons.find((item) => item.id === lessonId) || visibleLessons[0];

  const matchingPractice = useMemo(() => (data?.practice || []).filter((item) => item.lessonTitle === lesson?.title), [data, lesson]);

  const question = matchingPractice[practiceIndex] || null;

  useEffect(() => { setPracticeIndex(0); setAnswer(""); setResult(null); }, [lessonId, subject]);

  useEffect(() => { if (!target || !data) return; const match = data.lessons.find((item) => target.lessonId ? item.id === target.lessonId : item.section === target.section); if (match) { setTopic(""); setLessonId(match.id); } }, [target, data]);

  const markComplete = () => { if (!lesson) return; setStudy((current) => ({ ...current, completedLessons: [...new Set([...current.completedLessons, lesson.id])], lessonDates: { [lesson.id]: new Date().toISOString(), ...(current.lessonDates || {}) } })); };

  const grade = async () => {

    if (!question || !answer) return;

    setGrading(true);

    try {

      const response = await fetchJson("/api/grade", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: [{ id: question.id, answer }] }) });

      const item = response.results[0]; setResult(item); if (item.correct) { markComplete(); celebrate(withExtras(study).settings); }

      setStudy((current) => recordAnswer(current, { kind: "practice", questionId: item.id, section: item.section }, item.correct, item));


    } catch (requestError) { setError(requestError.message); } finally { setGrading(false); }

  };

  return <FeaturePage eyebrow="Learning map" title="Build the structure first." description="Use the current Accounting 0452 lesson bank, then pressure-test the idea with syllabus-aligned accounting practice."><div className="study-control-bar"><div className="segmented">{["Accounting"].map((item) => <button key={item} onClick={() => setSubject(item)} className={subject === item ? "selected" : ""}>{item}</button>)}</div>{data && <span>{data.lessons.length} lessons · {data.practice.length} practice questions</span>}</div>{error && <p className="coach-error">{error}</p>}{!data && !error && <div className="loading-panel">Loading Accounting 0452 lesson bank…</div>}{data && <details className="coverage-panel"><summary>2027–2029 syllabus coverage · 7 topics · 28 sections</summary><p>The lesson map follows the official 0452 syllabus. Teaching and practice are independently authored.</p>{data.topics.map(t=><div key={t.topic_id}><h3>{t.topic_name}</h3>{[...new Set(data.lessons.filter(l=>l.topicId===t.topic_id).map(l=>l.section))].map(section=><p key={section}><strong>{section}</strong> · {data.lessons.filter(l=>l.section===section).map(l=>l.title).join(" · ")}</p>)}</div>)}<a href="https://www.cambridgeinternational.org/Images/718141-2027-2029-syllabus.pdf" target="_blank" rel="noreferrer">Open official syllabus and check scope</a></details>}{data && lesson && <div className="learning-workspace"><aside className="lesson-selectors"><label>Domain / topic<select value={topic} onChange={(event) => setTopic(event.target.value)}><option value="">All topics</option>{data.topics.map((item) => <option value={item.topic_id || item.topic_name} key={item.topic_id}>{item.topic_name}</option>)}</select></label><label>Lesson<select value={lesson.id} onChange={(event) => setLessonId(event.target.value)}>{visibleLessons.map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}</select></label><div className="lesson-meter"><span>Progress</span><strong>{study.completedLessons.includes(lesson.id) ? "Complete" : "In progress"}</strong></div><button className="outline-button" onClick={() => askCoach(`Teach me ${lesson.title} for Cambridge IGCSE Accounting (0452), 2027–2029. Formula or rule: ${lesson.formula || lesson.ruleTitle || "not provided"}. Explain it with this example: ${lesson.example}`)}>Ask AI about this lesson <Icon name="arrow" size={17}/></button></aside><article className="lesson-card"><div className="lesson-card-header"><span>{subject} / {lesson.difficulty || "Core skill"}</span><button className="tiny-icon" onClick={markComplete} aria-label="Mark lesson complete"><Icon name="check" size={17}/></button></div><h2>{lesson.title}</h2>{lesson.ruleTitle && <h3>{lesson.ruleTitle}</h3>}{lesson.formula && <div className="formula-block">{lesson.formula}</div>}<p className="lesson-explanation">{lesson.explanation}</p><p className="lesson-source">Syllabus section {lesson.section} · <a href="https://www.cambridgeinternational.org/Images/718141-2027-2029-syllabus.pdf" target="_blank" rel="noreferrer">Official Cambridge syllabus</a></p><StepReveal key={lesson.id} label="Worked example" text={lesson.example}/>{lesson.arabic && <p className="arabic-helper" lang="ar">{lesson.arabic}</p>}{lesson.tip && <div className="lesson-tip">Tip: {lesson.tip}</div>}</article>{question && <aside className="practice-card"><span className="red-tag">PRACTICE</span><h3>{question.lessonTitle || lesson.title}</h3><p>{question.question}</p><QuestionChoices question={question} answer={answer} onAnswer={setAnswer} result={result}/>{!result && <button className="primary-button compact-primary" disabled={!answer || grading} onClick={grade}>{grading ? "Checking…" : "Check answer"}<Icon name="arrow" size={18}/></button>}{result && <div className={result.correct ? "feedback good" : "feedback"}>{result.correct ? "Correct. " : "Not yet. "}{result.explanation}</div>}{result && matchingPractice.length > practiceIndex + 1 && <button className="outline-button compact-button" onClick={() => { setPracticeIndex((value) => value + 1); setAnswer(""); setResult(null); }}>Next practice <Icon name="arrow" size={16}/></button>}</aside>}</div>}</FeaturePage>;

}



// Shrinks a photo to at most 1280 px on the long side and re-encodes it as JPEG, so it uploads quickly.
function shrinkPhoto(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, 1280 / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Unreadable image")); };
    image.src = url;
  });
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = /[؀-ۿ]/.test(text) ? "ar-EG" : "en-GB";
  utterance.rate = 0.98;
  window.speechSynthesis.speak(utterance);
}

function CoachPage({ coach, askCoach, setCoach, openLesson }) {
  const [prompt, setPrompt] = useState("");
  const [lessons, setLessons] = useState([]);
  const [asked, setAsked] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState("en-GB");
  const [canListen, setCanListen] = useState(false);
  const recognition = useRef(null);
  useEffect(() => { loadLearning().then((data) => setLessons(data.lessons)).catch(() => {}); setCanListen(Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)); return () => { recognition.current?.abort?.(); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }; }, []);
  const [photo, setPhoto] = useState("");
  const ask = async (question = prompt) => {
    if (!question.trim() && !photo) return;
    setAsked(question);
    setCoach({ ...coach, loading: true, error: "" });
    try { const reply = await askCoach(question, photo); setCoach({ loading: false, error: "", answer: reply }); setPrompt(""); setPhoto(""); }
    catch (requestError) { setCoach({ loading: false, error: requestError.message, answer: "" }); }
  };
  const choosePhoto = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try { setPhoto(await shrinkPhoto(file)); } catch { setCoach({ ...coach, error: "That photo could not be opened. Try another one." }); }
  };
  const listen = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return;
    if (listening) { recognition.current?.stop(); return; }
    const instance = new Recognition();
    instance.lang = voiceLang;
    instance.interimResults = true;
    instance.onresult = (event) => setPrompt(Array.from(event.results).map((result) => result[0].transcript).join(" "));
    instance.onend = () => setListening(false);
    instance.onerror = () => setListening(false);
    recognition.current = instance;
    setListening(true);
    instance.start();
  };
  const related = coach.answer ? matchLessons(`${asked} ${asked} ${coach.answer}`, lessons) : [];
  return <FeaturePage eyebrow="AI coach" title="Ask. Test. Understand." description="The coach gives a concise next step for Cambridge IGCSE Accounting (0452) work. Type, speak in English or Arabic, or snap a photo of a question."><div className="coach-stage"><div className="coach-orb"><Icon name="brain" size={52}/></div><h2>What are you building clarity on?</h2><p>The coach turns a stuck moment into the next useful step.</p><div className="coach-input"><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask about double entry, financial statements, ratios, or your exam plan…" aria-label="Question for the AI coach"/><div className="coach-buttons"><label className="mic-button photo-button" aria-label="Add a photo of a question"><Icon name="camera" size={20}/><input type="file" accept="image/*" capture="environment" onChange={choosePhoto} hidden/></label>{canListen && <button onClick={listen} className={listening ? "mic-button on" : "mic-button"} aria-label={listening ? "Stop listening" : "Ask by voice"} aria-pressed={listening}><Icon name="mic" size={20}/></button>}<button onClick={() => ask()} aria-label="Ask AI coach" disabled={coach.loading}>{coach.loading ? "…" : <Icon name="send" size={20}/>}</button></div></div>{photo && <div className="photo-preview"><img src={photo} alt="Your question photo"/><div><strong>Photo ready</strong><span>Add a note if you like, then send. The coach guides you step by step instead of just giving the answer.</span></div><button className="tiny-icon" aria-label="Remove photo" onClick={() => setPhoto("")}><Icon name="x" size={14}/></button></div>}{canListen && <div className="voice-lang segmented" aria-label="Voice language">{[["en-GB", "Speak English"], ["ar-EG", "اتكلم عربي"]].map(([lang, label]) => <button key={lang} className={voiceLang === lang ? "selected" : ""} onClick={() => setVoiceLang(lang)}>{label}</button>)}</div>}<div className="question-chips">{["Explain double entry", "How do I calculate gross profit margin?", "How do I prepare a partnership appropriation account?"].map((q) => <button key={q} onClick={() => ask(q)} disabled={coach.loading}>{q}</button>)}</div>{coach.answer && <div className="coach-answer"><Icon name="brain" size={20}/><div><p>{coach.answer}</p><button className="text-button read-aloud" onClick={() => speak(coach.answer)}><Icon name="volume" size={16}/> Read aloud</button></div></div>}{related.length > 0 && <div className="coach-links"><span>Go deeper in the app</span>{related.map((lesson) => <button key={lesson.id} className="outline-button compact-button" onClick={() => openLesson(lesson.id)}>{lesson.section} · {lesson.title} · lesson and practice <Icon name="arrow" size={16}/></button>)}</div>}{coach.error && <p className="coach-error">{coach.error}</p>}</div></FeaturePage>;
}

function ExamPage({study,setStudy}) {

  const [paper,setPaper]=useState(1);

  return <><div className="paper-switch segmented"><button className={paper===1?"selected":""} onClick={()=>setPaper(1)}>Paper 1 · Multiple choice</button><button className={paper===2?"selected":""} onClick={()=>setPaper(2)}>Paper 2 · Structured written</button></div>{paper===1?<MultipleChoiceExam study={study} setStudy={setStudy}/>:<StructuredExam study={study} setStudy={setStudy}/>}</>;

}



const PAPER1_SECONDS = 90 * 60;
const TARGET_PER_QUESTION = PAPER1_SECONDS / 40;

// Where the time went: totals per topic, pace against 2 minutes 15 seconds a question, and the slowest questions.
function TimeReview({ questions, spent, results, used }) {
  const byId = new Map(results.map((item) => [item.id, item]));
  const rows = questions.map((question, index) => ({ number: index + 1, id: question.id, section: question.section, seconds: spent[question.id] || 0, correct: byId.get(question.id)?.correct, answered: Boolean(byId.get(question.id)?.selected) }));
  const topics = TOPICS.map((topic) => {
    const items = rows.filter((row) => topic.sections.includes(row.section));
    return { ...topic, seconds: items.reduce((sum, row) => sum + row.seconds, 0), count: items.length, right: items.filter((row) => row.correct).length };
  }).filter((topic) => topic.count);
  const longest = Math.max(1, ...topics.map((topic) => topic.seconds));
  const slowest = [...rows].sort((a, b) => b.seconds - a.seconds).slice(0, 5);
  const rushed = rows.filter((row) => row.seconds < 30 && row.answered && !row.correct);
  const unanswered = rows.filter((row) => !row.answered).length;
  const average = rows.length ? used / rows.length : 0;
  return <section className="time-review"><h3>Where your time went</h3>
    <div className="session-stats"><div><strong>{formatMinutes(used)}</strong><span>time used of 90:00</span></div><div><strong>{formatMinutes(Math.round(average))}</strong><span>per question (target 02:15)</span></div><div><strong>{unanswered}</strong><span>left blank</span></div></div>
    <p className="fine-print">{average > TARGET_PER_QUESTION ? "You were behind the pace. Move on after about 2 minutes and come back to hard questions at the end." : "Good pace. Use any spare time to re-check calculation questions."}{unanswered ? " Never leave a Paper 1 answer blank: there is no penalty for a wrong answer." : ""}</p>
    <div className="time-bars">{topics.map((topic) => <div key={topic.id}><span>Topic {topic.id} · {topic.name}</span><div className="bar bar-violet"><span style={{ width: `${(topic.seconds / longest) * 100}%` }}/></div><b>{formatMinutes(topic.seconds)} · {topic.right}/{topic.count}</b></div>)}</div>
    <h4>Slowest questions</h4><ul className="slow-list">{slowest.map((row) => <li key={row.id}><span>Q{row.number} · {row.section}</span><b>{formatMinutes(row.seconds)}</b><em className={row.correct ? "lime-text" : "pink-text"}>{row.correct ? "right" : "wrong"}</em></li>)}</ul>
    {rushed.length > 0 && <p className="fine-print">Rushed and wrong (under 30 seconds): {rushed.map((row) => `Q${row.number}`).join(", ")}. Slow down on these types.</p>}
  </section>;
}

function MultipleChoiceExam({ study, setStudy }) {
  const [subject, setSubject] = useState("Accounting");
  const [exams, setExams] = useState([]);
  const [examId, setExamId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [spent, setSpent] = useState({});
  const [seconds, setSeconds] = useState(PAPER1_SECONDS);
  const [warning, setWarning] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submitGuard = useRef(false);
  const settings = withExtras(study).settings;
  const reset = () => { setAnswers({}); setSpent({}); setIndex(0); setResult(null); setSeconds(PAPER1_SECONDS); setWarning(""); submitGuard.current = false; };
  useEffect(() => { let active = true; setExams([]); setExamId(""); setQuestions([]); setResult(null); fetchJson(`/api/content?type=exams&subject=${subject}`).then((data) => { if (active) { setExams(data.exams); setExamId(data.exams[0]?.id || ""); } }).catch((requestError) => active && setError(requestError.message)); return () => { active = false; }; }, [subject]);
  useEffect(() => { if (!examId) return; let active = true; setQuestions([]); reset(); fetchJson(`/api/content?type=exam&subject=${subject}&examId=${encodeURIComponent(examId)}`).then((data) => active && setQuestions(data.questions)).catch((requestError) => active && setError(requestError.message)); return () => { active = false; }; }, [subject, examId]);
  const question = questions[index];
  const running = Boolean(questions.length) && !result && !loading;
  useEffect(() => {
    if (!running) return undefined;
    const id = question?.id;
    const timer = window.setInterval(() => {
      setSeconds((value) => Math.max(0, value - 1));
      if (id) setSpent((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, question?.id]);
  useEffect(() => {
    if (!running) return;
    const text = seconds === 15 * 60 ? "15 minutes left. Answer every remaining question, even with a best guess." : seconds === 5 * 60 ? "5 minutes left. Fill in any blanks now." : "";
    if (text) { setWarning(text); if (settings.haptics !== false) navigator.vibrate?.([80, 60, 80]); }
  }, [seconds, running, settings.haptics]);
  const submit = async () => {
    if (!questions.length || submitGuard.current) return;
    submitGuard.current = true;
    setLoading(true);
    try {
      const graded = await fetchJson("/api/grade", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: questions.map((item) => ({ id: item.id, answer: answers[item.id] || "" })) }) });
      setResult(graded);
      const date = new Date().toISOString();
      const results = graded.results.filter((item) => !item.error).map((item) => ({ id: item.id, section: item.section, correct: item.correct, seconds: spent[item.id] || 0 }));
      const attempt = { id: `${subject}:${examId}:${Date.now()}`, date, subject, examId, paper: 1, marking: "Automatic", score: graded.score, total: graded.total, percent: graded.percent, seconds: PAPER1_SECONDS - seconds, results };
      const wrong = graded.results.filter((item) => !item.correct && !item.error).map((item) => ({ ...item, examId }));
      setStudy((current) => wrong.reduce((next, item) => recordMistake(next, item, date), { ...current, attempts: [attempt, ...current.attempts].slice(0, 60) }));
      celebrate(settings, graded.percent >= 70);
    } catch (requestError) { submitGuard.current = false; setError(navigator.onLine === false ? "You're offline. Your answers are kept on this screen; submit again when you're back online." : requestError.message); } finally { setLoading(false); }
  };
  const submitRef = useRef(submit);
  useEffect(() => { submitRef.current = submit; });
  useEffect(() => { if (seconds === 0 && questions.length && !result && !loading && !error) submitRef.current(); }, [seconds, questions.length, result, loading, error]);
  const answered = Object.keys(answers).length;
  return <FeaturePage eyebrow="Exam arena · Paper 1 rehearsal" title="Pressure makes the plan real." description="40 questions · 90 minutes · 40 marks · 30% of the grade. Strict timing like the real exam: warnings at 15 and 5 minutes, and the paper is collected automatically when time runs out. Original practice, not an official Cambridge paper.">
    <div className="exam-controls"><div className="segmented">{["Accounting"].map((item) => <button key={item} onClick={() => setSubject(item)} className={subject === item ? "selected" : ""}>{item}</button>)}</div><label>Mock exam<select value={examId} disabled={running && answered > 0} onChange={(event) => setExamId(event.target.value)}>{exams.map((exam) => <option key={exam.id} value={exam.id}>{exam.id} · {exam.questions} questions</option>)}</select></label><strong className={seconds <= 15 * 60 && !result ? "exam-timer warn" : "exam-timer"} aria-live="off">{formatMinutes(seconds)}</strong></div>
    {warning && !result && <div className="exam-warning" role="alert"><Icon name="clock" size={18}/>{warning}<button className="tiny-icon" aria-label="Dismiss warning" onClick={() => setWarning("")}><Icon name="x" size={14}/></button></div>}
    {error && <p className="coach-error">{error}</p>}
    {!question && !error && <div className="loading-panel">Preparing the exam arena…</div>}
    {question && !result && <div className="exam-stage"><div><span className="red-tag">{subject.toUpperCase()} / {question.section || "0452 PRACTICE"}</span><h2>Question {index + 1} of {questions.length}</h2>{question.passage && <blockquote className="exam-passage">{question.passage}</blockquote>}<p>{question.question}</p><QuestionChoices question={question} answer={answers[question.id]} onAnswer={(value) => setAnswers((current) => ({ ...current, [question.id]: value }))}/><div className="exam-navigation"><button className="outline-button compact-button" disabled={index === 0} onClick={() => setIndex((value) => value - 1)}>Previous</button><span>{answered} / {questions.length} answered · {formatMinutes(spent[question.id] || 0)} on this one</span>{index < questions.length - 1 ? <button className="outline-button compact-button" onClick={() => setIndex((value) => value + 1)}>Next</button> : <button className="primary-button compact-primary" onClick={submit} disabled={loading}>{loading ? "Grading…" : "Submit exam"}</button>}</div><div className="question-dots" aria-label="Jump to a question">{questions.map((item, dot) => <button key={item.id} className={`${answers[item.id] ? "done" : ""}${dot === index ? " current" : ""}`} onClick={() => setIndex(dot)} aria-label={`Question ${dot + 1}${answers[item.id] ? ", answered" : ""}`}>{dot + 1}</button>)}</div></div><aside className="exam-score"><Ring value={Math.round((answered / questions.length) * 100)} label={`${answered}/${questions.length}`}/><strong>{formatMinutes(seconds)}</strong><span>Time remaining</span><button className="primary-button compact-primary" onClick={() => { if (answered < questions.length && !window.confirm(`${questions.length - answered} questions are blank. Submit anyway?`)) return; submit(); }} disabled={loading}>{loading ? "Grading…" : "Finish attempt"}</button></aside></div>}
    {result && <><div className="exam-result"><Ring value={result.percent} label={`${result.percent}%`} blue/><div><span>Exam submitted</span><h2>{result.score} / {result.total} correct</h2><p>{result.results.filter((item) => !item.correct).length} questions are now in your Review Vault, and they will come back in your daily sessions.</p><button className="outline-button compact-button" onClick={reset}>Try this exam again</button></div></div><TimeReview questions={questions} spent={spent} results={result.results} used={PAPER1_SECONDS - seconds}/></>}
  </FeaturePage>;
}

function IPTVPanel() {

  const [mode, setMode] = useState("direct");

  const [directUrl, setDirectUrl] = useState("");

  const [server, setServer] = useState("");

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [contentType, setContentType] = useState("live");

  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState("");

  const [items, setItems] = useState([]);

  const [stream, setStream] = useState("");

  const [error, setError] = useState("");

  const base = server.replace(/\/+$/, "");

  const api = (action, extra = "") => `${base}/player_api.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&action=${action}${extra}`;

  const loadCatalog = async () => {

    setError(""); setCategories([]); setItems([]);

    try { const action = contentType === "live" ? "get_live_categories" : "get_vod_categories"; const response = await fetch(api(action)); if (!response.ok) throw new Error("Provider did not accept the connection."); const data = await response.json(); setCategories(Array.isArray(data) ? data : []); } catch { setError("The provider could not be reached from this browser. Use an HTTPS provider that allows browser playback."); }

  };

  const loadItems = async (categoryId) => {

    setCategory(categoryId); setItems([]); setStream("");

    try { const action = contentType === "live" ? "get_live_streams" : "get_vod_streams"; const response = await fetch(api(action, `&category_id=${encodeURIComponent(categoryId)}`)); const data = await response.json(); setItems(Array.isArray(data) ? data : []); } catch { setError("Could not load this provider category."); }

  };

  const selectedUrl = mode === "direct" ? directUrl : stream;

  return <details className="iptv-panel"><summary>Authorized IPTV player <span>Personal provider only</span></summary><p>Use only a subscription and streams you are authorized to watch. Credentials are never sent to Accounting 0452 or saved by the app.</p><div className="segmented">{[["direct", "Direct HLS / M3U"], ["xtream", "Xtream Codes"]].map(([value, label]) => <button key={value} className={mode === value ? "selected" : ""} onClick={(event) => { event.preventDefault(); setMode(value); }}>{label}</button>)}</div>{mode === "direct" ? <label>HTTPS HLS or M3U URL<input value={directUrl} onChange={(event) => setDirectUrl(event.target.value)} placeholder="https://provider.example/channel.m3u8"/></label> : <div className="iptv-form"><label>Provider server<input value={server} onChange={(event) => setServer(event.target.value)} placeholder="https://provider.example"/></label><label>Username<input value={username} onChange={(event) => setUsername(event.target.value)}/></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)}/></label><label>Content<select value={contentType} onChange={(event) => setContentType(event.target.value)}><option value="live">Live TV</option><option value="movie">Movies</option></select></label><button className="outline-button compact-button" onClick={loadCatalog} disabled={!base || !username || !password}>Load provider catalog</button>{categories.length > 0 && <label>Category<select value={category} onChange={(event) => loadItems(event.target.value)}><option value="">Choose category</option>{categories.map((item) => <option key={item.category_id} value={item.category_id}>{item.category_name}</option>)}</select></label>}{items.length > 0 && <label>Channel / movie<select value={stream} onChange={(event) => setStream(event.target.value)}><option value="">Choose a stream</option>{items.map((item) => { const id = item.stream_id; const path = contentType === "live" ? `live/${encodeURIComponent(username)}/${encodeURIComponent(password)}/${id}.m3u8` : `movie/${encodeURIComponent(username)}/${encodeURIComponent(password)}/${id}.${item.container_extension || "mp4"}`; return <option key={id} value={`${base}/${path}`}>{item.name}</option>; })}</select></label>}</div>}{error && <p className="coach-error">{error}</p>}{selectedUrl && <HlsVideo src={selectedUrl}/>}</details>;

}



function MusicPage({ seconds, running, onToggle, study, setStudy }) {

  const [url, setUrl] = useState(study.musicUrl || "");

  const embed = musicEmbedUrl(url);

  const play = () => setStudy((current) => ({ ...current, musicUrl: url }));

  return <FeaturePage eyebrow="Focus music" title="A room for deep work." description="Keep a focus timer going, then add a permitted music link or your own authorized media source."><div className="music-screen"><div><Timer seconds={seconds} running={running} onToggle={onToggle}/><div className="music-url"><label>Focus music link<input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="YouTube, Spotify, or SoundCloud URL"/></label><button className="outline-button compact-button" onClick={play}>Load player</button></div></div><div className="track-list">{["Concrete Mindset", "Steel & Silence", "Midnight Drafting"].map((track, index) => <button key={track} className={index === 0 ? "active-track" : ""}><span>0{index + 1}</span><strong>{track}</strong><small>{index === 0 ? "Playing" : "Lo-Fi blueprint"}</small></button>)}{embed && <iframe className="music-embed" title="Focus music player" src={embed} allow="autoplay; encrypted-media"/>}</div></div><IPTVPanel/></FeaturePage>;

}



function reviewLabel(state, today) {
  if (state.stage >= MASTERED_STAGE) return "Mastered";
  if (!state.due || state.due <= today) return "Due today";
  const days = Math.round((Date.parse(state.due) - Date.parse(today)) / 86400000);
  return `Next review in ${days} day${days === 1 ? "" : "s"}`;
}

// Flashcards built from saved mistakes. The AI rewrites each one into a short card with a memory hook;
// without the AI, the original question and answer are used.
function Flashcards({ study, setStudy, mistakes }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [status, setStatus] = useState("");
  const asked = useRef(new Set());
  const today = dayKey();
  const settings = withExtras(study).settings;
  useEffect(() => {
    const missing = mistakes.filter((item) => !item.card && !asked.current.has(item.id)).slice(0, 8);
    if (!missing.length) return;
    missing.forEach((item) => asked.current.add(item.id));
    setStatus("The AI is writing cards from your mistakes…");
    fetchJson("/api/cards", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: missing.map(({ id, question, answer, explanation }) => ({ id, question, answer, explanation })) }) })
      .then(({ cards }) => {
        const byId = new Map(cards.map((card) => [card.id, card]));
        setStudy((current) => ({ ...current, mistakes: current.mistakes.map((item) => byId.has(item.id) ? { ...item, card: byId.get(item.id) } : item) }));
        setStatus("");
      })
      .catch(() => setStatus("AI cards are unavailable right now, so these cards use your original questions."));
  }, [mistakes, setStudy]);
  if (!mistakes.length) return <div className="empty-panel">No mistakes saved yet, so there are no flashcards. Wrong answers become cards automatically.</div>;
  const item = mistakes[Math.min(index, mistakes.length - 1)];
  const card = item.card;
  const state = reviewState(study, item);
  const next = (knew) => {
    if (state.stage < MASTERED_STAGE && (!state.due || state.due <= today)) setStudy((current) => recordReview(current, item, knew));
    if (knew) celebrate(settings);
    setFlipped(false);
    setIndex((value) => (value + 1) % mistakes.length);
  };
  return <div className="flashcards">
    {status && <p className="fine-print" aria-live="polite">{status}</p>}
    <button className={flipped ? "flashcard flipped" : "flashcard"} onClick={() => setFlipped((value) => !value)} aria-label={flipped ? "Show the question" : "Show the answer"}>
      <span className="flashcard-tag">{item.section || "0452"} · card {index + 1} of {mistakes.length} · {reviewLabel(state, today)}</span>
      {!flipped ? <strong>{card?.front || item.question}</strong> : <div className="flashcard-back"><strong>{card?.back || `Correct answer: ${item.answer}`}</strong>{!card && item.explanation && <p>{item.explanation}</p>}{card?.hook && <em><Icon name="star" size={14}/> {card.hook}</em>}</div>}
      <small>{flipped ? "Tap to see the question" : "Tap to flip"}</small>
    </button>
    {flipped ? <div className="self-rate"><button className="outline-button compact-button" onClick={() => next(false)}><Icon name="x" size={16}/> Didn&apos;t know it</button><button className="primary-button compact-primary" onClick={() => next(true)}><Icon name="check" size={16}/> Knew it</button></div>
      : <div className="self-rate"><button className="text-button" onClick={() => { setFlipped(false); setIndex((value) => (value + mistakes.length - 1) % mistakes.length); }}>Previous</button><button className="text-button" onClick={() => { setFlipped(false); setIndex((value) => (value + 1) % mistakes.length); }}>Skip</button></div>}
    <p className="fine-print">A card that is due counts as a spaced review: knowing it pushes it further out (3, 7, then 14 days).</p>
  </div>;
}

function VaultPage({ study, setStudy }) {
  const [subject, setSubject] = useState("All");
  const [mode, setMode] = useState("list");
  const today = dayKey();
  const mistakes = study.mistakes.filter((item) => subject === "All" || item.subject === subject);
  const summary = reviewSummary(study, today);
  const mastery = summary.total ? Math.round((summary.mastered / summary.total) * 100) : 100;
  const clear = () => { if (window.confirm("Clear all saved review mistakes on this device?")) setStudy((current) => ({ ...current, mistakes: [], reviewedIds: [], reviews: {} })); };
  const markReviewed = (id) => setStudy((current) => ({ ...current, reviewedIds: [...new Set([...current.reviewedIds, id])] }));
  return <FeaturePage eyebrow="Review vault" title="Bring back what matters." description="Every wrong answer is saved here and comes back after 1, 3, 7 and 14 days. Get it right four times in a row and it is mastered."><div className="vault-stage"><div className="vault-mastery"><Ring value={mastery} label={`${mastery}%`}/><div><span>Mastered through spaced review</span><h2>{summary.mastered} / {summary.total}</h2><p>{summary.due} due today · saved on this device</p><button className="outline-button compact-button" onClick={clear} disabled={!study.mistakes.length}>Clear vault</button></div></div><div className="revision-downloads"><span>Accounting 0452 · 2027–2029</span><a href="https://www.cambridgeinternational.org/Images/718141-2027-2029-syllabus.pdf" target="_blank" rel="noreferrer">Official syllabus &amp; ratio formulas <Icon name="external" size={16}/></a><a href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-accounting-0452/past-papers/" target="_blank" rel="noreferrer">Official papers &amp; mark schemes <Icon name="external" size={16}/></a><a href="/accounting-revision.html" target="_blank" rel="noreferrer">Accounting revision handbook <Icon name="external" size={16}/></a></div></div>
    <div className="vault-filter"><div className="segmented">{[["list", "Mistake list"], ["cards", "Flashcards"]].map(([id, label]) => <button key={id} onClick={() => setMode(id)} className={mode === id ? "selected" : ""}>{label}</button>)}</div><div className="segmented">{["All", "Accounting"].map((item) => <button key={item} onClick={() => setSubject(item)} className={subject === item ? "selected" : ""}>{item}</button>)}</div><span>{mistakes.length} item{mistakes.length === 1 ? "" : "s"} to rebuild</span></div>
    {mode === "cards" ? <Flashcards study={study} setStudy={setStudy} mistakes={mistakes}/> : <div className="mistake-list">{mistakes.length ? mistakes.map((item) => <article key={item.id} className={study.reviewedIds.includes(item.id) ? "mistake-card reviewed" : "mistake-card"}><div><span>{item.subject} {item.section ? `· ${item.section}` : ""} · {reviewLabel(reviewState(study, item), today)}</span><h3>{item.question}</h3><p>Your answer: <strong>{item.selected || "Not answered"}</strong> · Correct: <strong>{item.answer}</strong></p><p>{item.explanation}</p></div><button className="outline-button compact-button" onClick={() => markReviewed(item.id)}>{study.reviewedIds.includes(item.id) ? "Reviewed" : "Mark reviewed"}</button></article>) : <div className="empty-panel">No mistakes saved yet. Complete a practice question or mock exam to build your vault.</div>}</div>}
  </FeaturePage>;
}

// Accuracy in every syllabus section, from practice, reviews and both papers.
function SectionBreakdown({ study, go }) {
  const stats = sectionStats(study);
  return <section className="panel section-breakdown"><div className="panel-title"><span><Icon name="layers"/> Accuracy by section</span><em>All 28</em></div><div className="section-rows">{TOPICS.map((topic) => <div key={topic.id} className="section-topic"><h4>Topic {topic.id} · {topic.name}</h4>{topic.sections.map((section) => { const item = stats[section]; const percent = item.accuracy === null ? null : Math.round(item.accuracy * 100); return <button key={section} className="section-row" onClick={() => go("learning", { section })}><span>{section} {SECTION_TITLES[section]}</span><div className={`bar ${percent === null ? "" : percent >= 70 ? "bar-lime" : "bar-violet"}`}><span style={{ width: `${percent ?? 0}%` }}/></div><b>{percent === null ? "—" : `${percent}%`}</b></button>; })}</div>)}</div></section>;
}

function ProgressPage({ study, go }) {

  const [subject, setSubject] = useState("All");

  const attempts = study.attempts.filter((item) => subject === "All" || item.subject === subject).slice(0, 12).reverse();

  const percents = attempts.map((item) => item.percent);

  const latest = attempts.at(-1)?.percent || 0;

  const best = percents.length ? Math.max(...percents) : 0;

  const average = percents.length ? Math.round(percents.reduce((sum, value) => sum + value, 0) / percents.length) : 0;

  const path = attempts.length ? attempts.map((item, index) => `${index ? "L" : "M"}${20 + index * (660 / Math.max(1, attempts.length - 1))} ${190 - item.percent * 1.5}`).join(" ") : "M20 190 L680 190";

  return <FeaturePage eyebrow="Progress" title="The line is moving up." description="Your mock results, predicted grade and accuracy in every syllabus section, all from your own work on this device."><div className="progress-toolbar"><div className="segmented">{["All", "Accounting"].map((item) => <button key={item} onClick={() => setSubject(item)} className={subject === item ? "selected" : ""}>{item}</button>)}</div><span>{attempts.length} recorded attempt{attempts.length === 1 ? "" : "s"}</span></div><div className="progress-screen"><div className="score-summary"><span>Latest score</span><strong>{study.attempts.length ? latest : "—"}{latest ? <small>%</small> : null}</strong><p>Best {best || "—"}% · Average {average || "—"}%</p></div><svg viewBox="0 0 720 250" className="large-chart" role="img" aria-label="Accounting attempt progress chart"><g stroke="#2a2547" strokeWidth="1"><path d="M18 30H700M18 85H700M18 140H700M18 195H700"/></g><path d={path} fill="none" stroke="#22d3ee" strokeWidth="4"/>{attempts.map((item, index) => <circle key={item.id} cx={20 + index * (660 / Math.max(1, attempts.length - 1))} cy={190 - item.percent * 1.5} r="5" fill="#22d3ee"/>)}<g fill="#a09cc0" fontSize="14">{attempts.map((item, index) => <text key={item.id} x={12 + index * (660 / Math.max(1, attempts.length - 1))} y="225">{formatDate(item.date)}</text>)}</g></svg></div><div className="progress-extra"><PredictedGrade study={study} go={go}/><SectionBreakdown study={study} go={go}/></div><div className="attempt-table">{attempts.length ? attempts.slice().reverse().map((item) => <div key={item.id}><span>{formatDate(item.date)}</span><strong>{item.subject}</strong><span>{item.examId} · {item.marking || "Automatic"}</span><span>{item.score} / {item.total}</span><b>{item.percent}%</b></div>) : <div className="empty-panel">Your score trend will appear after the first submitted mock exam.</div>}</div></FeaturePage>;

}



function Home({ study, setActiveSection, seconds, running, onToggle, coach, setCoach, askCoach }) {
  const [lessonCount, setLessonCount] = useState(1);
  useEffect(() => { let active = true; fetchJson("/api/content?type=summary").then(data => { if (active) setLessonCount(data.summary.Accounting.lessons); }).catch(() => {}); return () => { active = false; }; }, []);

  const [question, setQuestion] = useState("");

  const completed = study.completedLessons.length;

  const reviews = reviewSummary(study);
  const mastery = reviews.total ? Math.round((reviews.mastered / reviews.total) * 100) : 100;
  const streak = streakFor(study);
  const level = levelFor(xpFor(study));

  const latest = study.attempts[0]?.percent || 0;

  const progress = Math.min(100, Math.round(completed / lessonCount * 100));

  const ask = async (value) => { if (!value.trim()) return; setCoach({ ...coach, loading: true, error: "" }); try { setCoach({ loading: false, error: "", answer: await askCoach(value) }); setQuestion(""); } catch (error) { setCoach({ loading: false, error: error.message, answer: "" }); } };

  return <><header className="topbar"><div className="greeting"><h1>Ready to balance the books?</h1><p>Accounting 0452 · {progress}% of the course complete</p></div><div className="topbar-actions"><button className="streak" onClick={() => setActiveSection("today")} aria-label={`${streak.current}-day streak. Open today`}><Icon name="flame" size={18}/><strong>{streak.current}</strong><span>day{streak.current === 1 ? "" : "s"} streak</span></button><button className="streak level-chip" onClick={() => setActiveSection("rewards")} aria-label={`Level ${level.level}, ${level.rank}. Open rewards`}><Icon name="trophy" size={18}/><strong>Lv {level.level}</strong><span>{level.rank}</span></button></div></header><main className="dashboard"><section className="hero-card"><div className="hero-copy"><span className="hero-tag">IGCSE Accounting · Cambridge 0452</span><h1>Build the future.</h1><p>Your future. Your rules. <span>/</span> Master the money game.</p><div className="hero-actions"><button className="primary-button" onClick={() => setActiveSection("live")}><Icon name="live" size={18}/> Join the live class</button><button className="outline-button" onClick={() => setActiveSection("today")}>{reviews.due ? `Today · ${reviews.due} due` : "Today's 15 minutes"} <Icon name="arrow" size={18}/></button><button className="outline-button" onClick={() => setActiveSection("learning")}>Continue learning <Icon name="arrow" size={18}/></button></div></div><div className="hero-visual"><div className="course-ring" style={{ "--value": progress }}><div><strong>{progress}%</strong><span>{completed} / {lessonCount} lessons</span></div></div><div className="hero-stats"><div><span>Latest mock</span><strong className="lime-text">{latest ? `${latest}%` : "—"}</strong></div><div><span>Mocks taken</span><strong className="cyan-text">{study.attempts.length}</strong></div><div><span>Vault mastery</span><strong className="pink-text">{mastery}%</strong></div></div></div></section><section className="father-note" aria-label="A word from Omar's father"><div className="father-badge"><Icon name="heart" size={26}/></div><div><span className="father-note-tag">A word from Dad</span><p>Omar, my son — every lesson here was written with you in mind. On the long days, it is you who gives me the strength to keep going. You are my greatest motivation and my proudest achievement. Whatever the result, I believe in you, I am proud of you, and I love you more than words can say.</p><strong>— Your father, Mohamed Basiouny</strong></div></section><div className="content-grid top-grid"><section className="panel coach-card"><div className="panel-title"><span><Icon name="brain"/> AI Coach</span><em>Groq</em></div><p>Ask anything. Get clarity.</p><div className="quick-ask"><textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="What’s challenging you today?"/><button onClick={() => ask(question)} aria-label="Ask coach" disabled={coach.loading}>{coach.loading ? "…" : <Icon name="send" size={18}/>}</button></div><div className="suggestions">{["Explain double entry", "How do I prepare a trial balance?", "How do I reconcile a bank statement?"].map((item) => <button key={item} onClick={() => ask(item)} disabled={coach.loading}>{item}</button>)}</div>{coach.answer && <div className="mini-reply">{coach.answer}</div>}{coach.error && <div className="coach-error">{coach.error}</div>}</section><section className="panel music-card"><div className="panel-title"><span><Icon name="headphones"/> Focus Music</span><button className="tiny-icon" onClick={() => setActiveSection("music")} aria-label="Open focus music"><Icon name="plus" size={16}/></button></div><Timer seconds={seconds} running={running} onToggle={onToggle} compact/></section><section className="panel live-card"><div className="panel-title"><span><Icon name="live"/> Live Studio</span><em>Ready</em></div><strong className="blue-display">PRIVATE LINK</strong><h3>Shared Visual Pad</h3><p>Call, notes, and a collaborative whiteboard.</p><button className="outline-button" onClick={() => setActiveSection("live")}>Open studio<Icon name="calendar" size={18}/></button></section><section className="panel arena-card"><div className="panel-title"><span><Icon name="target"/> Exam Arena</span><em className="red-outline">0452 Practice</em></div><p>Use the Accounting 0452 mock-exam bank.</p><strong className="countdown">{latest ? `${latest}%` : "READY"}</strong><div className="countdown-labels"><span>LAST</span><span>EXAM</span><span>RESULT</span></div><button className="primary-button" onClick={() => setActiveSection("exam")}>Enter build mode <Icon name="arrow" size={21}/></button></section></div><div className="content-grid bottom-grid"><section className="panel review-card"><div className="panel-title"><span><Icon name="vault"/> Review Vault</span></div><div className="review-content"><Ring value={mastery} label={`${mastery}%`}/><div><span>Mastery</span><strong>{reviews.mastered} / {reviews.total}</strong><p>Mastered · {reviews.due} due today</p><button className="outline-button" onClick={() => setActiveSection("vault")}>Open Vault <Icon name="external" size={17}/></button></div></div></section><section className="panel progress-card"><div className="panel-title"><span><Icon name="trend"/> Progress</span><button className="range-button" onClick={() => setActiveSection("progress")}>Real attempts <span>↗</span></button></div><div className="progress-content"><div className="score-chip"><span>Latest score</span><strong>{study.attempts.length ? latest : "—"} {latest ? <small>%</small> : null}</strong><p>{study.attempts.length} saved mock attempt{study.attempts.length === 1 ? "" : "s"}</p></div><svg className="mini-chart" viewBox="0 0 690 150" role="img" aria-label="Progress score trend"><g stroke="#2a2547" strokeWidth="1"><path d="M5 25H675M5 75H675M5 125H675"/></g><path d={study.attempts.length ? study.attempts.slice(0, 8).reverse().map((attempt, index, array) => `${index ? "L" : "M"}${6 + index * (668 / Math.max(1, array.length - 1))} ${125 - attempt.percent}`).join(" ") : "M6 125 L674 125"} fill="none" stroke="#22d3ee" strokeWidth="3"/></svg></div></section></div></main></>;

}



export function AppClient() {
  const [activeSection, setActiveSection] = useState("home");
  const [target, setTarget] = useState(null);
  const [focusSeconds, setFocusSeconds] = useState(45 * 60);
  const [focusRunning, setFocusRunning] = useState(false);
  const account = useAccount();
  const [study, setStudy, hydrated, cloudState] = useStoredStudy(account);
  const [coach, setCoach] = useState({ loading: false, answer: "", error: "" });
  const [toast, setToast] = useState(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const settings = withExtras(study).settings;
  useEffect(() => { if (!focusRunning) return undefined; const timer = window.setInterval(() => setFocusSeconds((current) => current > 0 ? current - 1 : 45 * 60), 1000); return () => window.clearInterval(timer); }, [focusRunning]);
  const askCoach = useCallback(async (question, image = "") => { const response = await fetchJson("/api/coach", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question, image }) }); return response.reply; }, []);
  const go = useCallback((section, nextTarget = null) => { setTarget(nextTarget); setActiveSection(section); setMoreOpen(false); window.scrollTo({ top: 0 }); }, []);
  const notify = useCallback((message) => setToast(message), []);
  const live = useLiveClass({ activeSection, target, go, notify });
  const openSection = useCallback((section) => go("learning", { section }), [go]);
  const openLesson = useCallback((lessonId) => go("learning", { lessonId }), [go]);

  // Count study time only while the page is visible and Omar has interacted in the last two minutes.
  const lastInput = useRef(0);
  useEffect(() => {
    lastInput.current = Date.now();
    const mark = () => { lastInput.current = Date.now(); };
    const events = ["pointerdown", "keydown", "wheel", "touchstart"];
    events.forEach((name) => window.addEventListener(name, mark, { passive: true }));
    const timer = window.setInterval(() => { if (document.visibilityState === "visible" && Date.now() - lastInput.current < 120000) setStudy((current) => addStudyTime(current, 15)); }, 15000);
    return () => { window.clearInterval(timer); events.forEach((name) => window.removeEventListener(name, mark)); };
  }, [setStudy]);

  // Streak protectors, Dad's goals, level-ups and new badges.
  const level = useMemo(() => levelFor(xpFor(study)), [study]);
  const earned = useMemo(() => badgesFor(study).filter((badge) => badge.earned).map((badge) => badge.name), [study]);
  const seen = useRef(null);
  useEffect(() => {
    if (!hydrated) return;
    const freezes = updateFreezes(study);
    const unlocked = withExtras(study).goals.filter((goal) => !goal.unlockedAt && goalReached(goal, study));
    if (freezes || unlocked.length) {
      const now = new Date().toISOString();
      setStudy((current) => ({ ...current, ...(freezes ? { freezes } : {}), goals: withExtras(current).goals.map((goal) => unlocked.some((item) => item.id === goal.id) ? { ...goal, unlockedAt: now } : goal) }));
    }
    const previous = seen.current;
    seen.current = { level: level.level, earned };
    if (!previous) return;
    const newBadges = earned.filter((name) => !previous.earned.includes(name));
    let message = null;
    if (unlocked.length) message = { text: "Dad left you a message, and you just unlocked it.", section: "rewards", target: { goal: unlocked[0].id } };
    else if (level.level > previous.level) message = { text: `Level up! You're now level ${level.level}: ${level.rank}.`, section: "rewards" };
    else if (newBadges.length) message = { text: `Badge earned: ${newBadges.join(", ")}.`, section: "rewards" };
    if (message) { setToast(message); celebrate(withExtras(study).settings, true); }
  }, [hydrated, study, level, earned, setStudy]);
  useEffect(() => { if (!toast) return undefined; const timer = window.setTimeout(() => setToast(null), 7000); return () => window.clearTimeout(timer); }, [toast]);

  useEffect(() => {
    if (!moreOpen) return undefined;
    const close = (event) => { if (event.key === "Escape") setMoreOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [moreOpen]);
  useEffect(() => { document.documentElement.dataset.theme = settings.theme === "light" ? "light" : "dark"; }, [settings.theme]);
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => {});
  }, []);

  const renderSection = () => {
    if (activeSection === "today") return <TodayPage study={study} setStudy={setStudy} go={go}/>;
    if (activeSection === "learning") return <LearningPage study={study} setStudy={setStudy} askCoach={askCoach} target={target}/>;
    if (activeSection === "lab") return <LabPage study={study} setStudy={setStudy} openSection={openSection}/>;
    if (activeSection === "coach") return <CoachPage coach={coach} setCoach={setCoach} askCoach={askCoach} openLesson={openLesson}/>;
    if (activeSection === "pad") return <VisualPad/>;
    if (activeSection === "exam") return <ExamPage study={study} setStudy={setStudy}/>;
    if (activeSection === "live") return <LivePage live={live} activeSection={activeSection}/>;
    if (activeSection === "music") return <MusicPage seconds={focusSeconds} running={focusRunning} onToggle={() => setFocusRunning((current) => !current)} study={study} setStudy={setStudy}/>;
    if (activeSection === "vault") return <VaultPage study={study} setStudy={setStudy}/>;
    if (activeSection === "progress") return <ProgressPage study={study} go={go}/>;
    if (activeSection === "rewards") return <RewardsPage study={study} setStudy={setStudy} target={target}/>;
    if (activeSection === "dad") return <DadPage study={study} setStudy={setStudy}/>;
    return <Home study={study} setActiveSection={go} seconds={focusSeconds} running={focusRunning} onToggle={() => setFocusRunning((current) => !current)} coach={coach} setCoach={setCoach} askCoach={askCoach}/>;
  };

  const inMore = TAB_ITEMS.every(([id]) => id !== activeSection);
  return <div className="app-shell"><a className="skip-link" href="#main">Skip to content</a><aside className="sidebar"><button className="brand" onClick={() => go("home")}><span><BrandMark/>IGCSE Accounting | Cambridge (0452)</span><small>Mr. Mohamed Basiouny</small></button><button className="mobile-level" onClick={() => go("rewards")} aria-label={`Level ${level.level}. Open rewards`}><Icon name="trophy" size={16}/>Lv {level.level}</button><AccountChip cloudState={cloudState}/><div className="brand-rule"/><nav aria-label="Main" className="side-nav">{NAV_ITEMS.map(([id, label, icon]) => <button key={id} className={activeSection === id ? "nav-item active" : "nav-item"} aria-current={activeSection === id ? "page" : undefined} onClick={() => go(id)}><Icon name={icon}/><span>{label}</span></button>)}{account.isAdmin && <a className="nav-item nav-admin" href="/admin"><Icon name="shield"/><span>Admin console</span></a>}</nav><footer className="credit"><span>Designed &amp; developed by</span><strong>Eng. Ahmed Labib</strong><small>© 2026 · All rights reserved</small></footer></aside><div className="main-area" id="main" tabIndex={-1} style={{ zoom: Number(settings.textSize) || 1 }}><AnnouncementBanner/><LiveNudge live={live} onOpen={() => go("live")}/>{renderSection()}<footer className="credit credit-mobile"><span>Designed &amp; developed by</span><strong>Eng. Ahmed Labib</strong><small>© 2026 · All rights reserved</small></footer></div><nav className="tabbar" aria-label="Main sections">{TAB_ITEMS.map(([id, label, icon]) => <button key={id} className={`${activeSection === id && !moreOpen ? "active" : ""}${id === "live" ? " tab-live" : ""}`} aria-current={activeSection === id ? "page" : undefined} onClick={() => go(id)}><Icon name={icon} size={22}/><span>{label}</span></button>)}<button className={moreOpen || inMore ? "active" : ""} aria-expanded={moreOpen} aria-controls="more-sheet" onClick={() => setMoreOpen((value) => !value)}><Icon name="layers" size={22}/><span>More</span></button></nav>{moreOpen && <div className="sheet-backdrop" onClick={() => setMoreOpen(false)}><div className="more-sheet" id="more-sheet" role="dialog" aria-modal="true" aria-label="All sections" onClick={(event) => event.stopPropagation()}><div className="sheet-handle"/><h2>All sections</h2><div className="more-grid">{NAV_ITEMS.filter(([id]) => !TAB_ITEMS.some(([tab]) => tab === id)).map(([id, label, icon]) => <button key={id} className={activeSection === id ? "active" : ""} onClick={() => go(id)}><Icon name={icon} size={22}/><span>{label}</span></button>)}{account.isAdmin && <a href="/admin"><Icon name="shield" size={22}/><span>Admin</span></a>}</div></div></div>}<LiveCallDock live={live} theatre={activeSection === "live"} onOpenStudio={() => go("live")}/>{toast && <div className="toast" role="status"><Icon name="trophy" size={20}/><span>{toast.text}</span>{toast.section && <button className="text-button" onClick={() => { go(toast.section, toast.target || null); setToast(null); }}>Open</button>}<button className="tiny-icon" aria-label="Dismiss" onClick={() => setToast(null)}><Icon name="x" size={14}/></button></div>}</div>;
}
