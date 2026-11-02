"use client";



import StructuredExam from "./structured-exam";

import { BrandMark } from "./_components/brand-mark";



import { useCallback, useEffect, useMemo, useRef, useState } from "react";



const NAV_ITEMS = [

  ["home", "Home", "home"],

  ["learning", "Learning", "book"],

  ["coach", "AI Coach", "brain"],

  ["pad", "Visual Pad", "pen"],

  ["exam", "Exam Arena", "target"],

  ["live", "Live Studio", "live"],

  ["music", "Focus Music", "headphones"],

  ["vault", "Review Vault", "vault"],

  ["progress", "Progress", "trend"],

];



const STORAGE_KEY = "accounting-0452:study:v1";

const EMPTY_STUDY = { completedLessons: [], attempts: [], mistakes: [], reviewedIds: [], musicUrl: "" };



function Icon({ name, size = 22, stroke = 1.8 }) {

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

    copy: <><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,

  };

  return <svg {...common}>{paths[name] || paths.home}</svg>;

}



function Ring({ value = 68, label = "68%", blue = false, size = "md" }) {

  return <div className={`ring ring-${size}`} style={{ "--value": Math.max(0, Math.min(100, value)), "--accent": blue ? "#22d3ee" : "#8b5cf6" }}><div><strong>{label}</strong></div></div>;

}



function useStoredStudy() {

  const [study, setStudy] = useState(EMPTY_STUDY);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {

    try {

      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");

      if (saved && typeof saved === "object") setStudy({ ...EMPTY_STUDY, ...saved });

    } catch { /* Start fresh when browser storage is malformed. */ }

    setHydrated(true);

  }, []);

  useEffect(() => {

    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(study));

  }, [study, hydrated]);

  return [study, setStudy, hydrated];

}



async function fetchJson(url, options) {

  const response = await fetch(url, options);

  const data = await response.json().catch(() => ({}));

  if (!response.ok) throw new Error(data.error || "The request could not be completed.");

  return data;

}



function safeText(value) { return String(value || "").trim(); }



function formatMinutes(seconds) {

  return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

}



function formatDate(value) {

  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));

}



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



function FeaturePage({ title, eyebrow, children, description }) {

  return <section className="section-screen"><div className="section-heading"><span>{eyebrow}</span><h1>{title}</h1>{description && <p>{description}</p>}</div>{children}</section>;

}



function QuestionChoices({ question, answer, onAnswer, result }) {

  return <div className="answer-list">{question.choices.map((choice) => {

    const state = result ? (choice.id === result.answer ? "correct" : choice.id === result.selected ? "wrong" : "") : answer === choice.id ? "selected-answer" : "";

    return <button key={choice.id} className={state} onClick={() => !result && onAnswer(choice.id)} disabled={Boolean(result)}><span>{choice.id}</span>{choice.text}{result && choice.id === result.answer && <Icon name="check" size={18}/>} {result && choice.id === result.selected && choice.id !== result.answer && <Icon name="x" size={18}/>}</button>;

  })}</div>;

}



function LearningPage({ study, setStudy, askCoach }) {

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

  const markComplete = () => { if (!lesson) return; setStudy((current) => ({ ...current, completedLessons: [...new Set([...current.completedLessons, lesson.id])]})); };

  const grade = async () => {

    if (!question || !answer) return;

    setGrading(true);

    try {

      const response = await fetchJson("/api/grade", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: [{ id: question.id, answer }] }) });

      const item = response.results[0]; setResult(item); if (item.correct) markComplete();

      if (!item.correct) setStudy((current) => ({ ...current, mistakes: [{ ...item, id: `${item.id}:${Date.now()}`, questionId: item.id, date: new Date().toISOString() }, ...current.mistakes.filter((mistake) => mistake.questionId !== item.id)] }));

    } catch (requestError) { setError(requestError.message); } finally { setGrading(false); }

  };

  return <FeaturePage eyebrow="Learning map" title="Build the structure first." description="Use the current Accounting 0452 lesson bank, then pressure-test the idea with syllabus-aligned accounting practice."><div className="study-control-bar"><div className="segmented">{["Accounting"].map((item) => <button key={item} onClick={() => setSubject(item)} className={subject === item ? "selected" : ""}>{item}</button>)}</div>{data && <span>{data.lessons.length} lessons · {data.practice.length} practice questions</span>}</div>{error && <p className="coach-error">{error}</p>}{!data && !error && <div className="loading-panel">Loading Accounting 0452 lesson bank…</div>}{data && <details className="coverage-panel"><summary>2027–2029 syllabus coverage · 7 topics · 28 sections</summary><p>The lesson map follows the official 0452 syllabus. Teaching and practice are independently authored.</p>{data.topics.map(t=><div key={t.topic_id}><h3>{t.topic_name}</h3>{[...new Set(data.lessons.filter(l=>l.topicId===t.topic_id).map(l=>l.section))].map(section=><p key={section}><strong>{section}</strong> · {data.lessons.filter(l=>l.section===section).map(l=>l.title).join(" · ")}</p>)}</div>)}<a href="https://www.cambridgeinternational.org/Images/718141-2027-2029-syllabus.pdf" target="_blank" rel="noreferrer">Open official syllabus and check scope</a></details>}{data && lesson && <div className="learning-workspace"><aside className="lesson-selectors"><label>Domain / topic<select value={topic} onChange={(event) => setTopic(event.target.value)}><option value="">All topics</option>{data.topics.map((item) => <option value={item.topic_id || item.topic_name} key={item.topic_id}>{item.topic_name}</option>)}</select></label><label>Lesson<select value={lesson.id} onChange={(event) => setLessonId(event.target.value)}>{visibleLessons.map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}</select></label><div className="lesson-meter"><span>Progress</span><strong>{study.completedLessons.includes(lesson.id) ? "Complete" : "In progress"}</strong></div><button className="outline-button" onClick={() => askCoach(`Teach me ${lesson.title} for Cambridge IGCSE Accounting (0452), 2027–2029. Formula or rule: ${lesson.formula || lesson.ruleTitle || "not provided"}. Explain it with this example: ${lesson.example}`)}>Ask AI about this lesson <Icon name="arrow" size={17}/></button></aside><article className="lesson-card"><div className="lesson-card-header"><span>{subject} / {lesson.difficulty || "Core skill"}</span><button className="tiny-icon" onClick={markComplete} aria-label="Mark lesson complete"><Icon name="check" size={17}/></button></div><h2>{lesson.title}</h2>{lesson.ruleTitle && <h3>{lesson.ruleTitle}</h3>}{lesson.formula && <div className="formula-block">{lesson.formula}</div>}<p className="lesson-explanation">{lesson.explanation}</p><p className="lesson-source">Syllabus section {lesson.section} · <a href="https://www.cambridgeinternational.org/Images/718141-2027-2029-syllabus.pdf" target="_blank" rel="noreferrer">Official Cambridge syllabus</a></p><div className="lesson-example"><span>Example</span><p>{lesson.example}</p></div>{lesson.arabic && <p className="arabic-helper" lang="ar">{lesson.arabic}</p>}{lesson.tip && <div className="lesson-tip">Tip: {lesson.tip}</div>}</article>{question && <aside className="practice-card"><span className="red-tag">PRACTICE</span><h3>{question.lessonTitle || lesson.title}</h3><p>{question.question}</p><QuestionChoices question={question} answer={answer} onAnswer={setAnswer} result={result}/>{!result && <button className="primary-button compact-primary" disabled={!answer || grading} onClick={grade}>{grading ? "Checking…" : "Check answer"}<Icon name="arrow" size={18}/></button>}{result && <div className={result.correct ? "feedback good" : "feedback"}>{result.correct ? "Correct. " : "Not yet. "}{result.explanation}</div>}{result && matchingPractice.length > practiceIndex + 1 && <button className="outline-button compact-button" onClick={() => { setPracticeIndex((value) => value + 1); setAnswer(""); setResult(null); }}>Next practice <Icon name="arrow" size={16}/></button>}</aside>}</div>}</FeaturePage>;

}



function CoachPage({ coach, askCoach, setCoach }) {

  const [prompt, setPrompt] = useState("");

  const ask = async (question = prompt) => {

    if (!question.trim()) return;

    setCoach({ ...coach, loading: true, error: "" });

    try { const reply = await askCoach(question); setCoach({ loading: false, error: "", answer: reply }); setPrompt(""); }

    catch (requestError) { setCoach({ loading: false, error: requestError.message, answer: "" }); }

  };

  return <FeaturePage eyebrow="AI coach" title="Ask. Test. Understand." description="The coach gives a concise next step for Cambridge IGCSE Accounting (0452) work."><div className="coach-stage"><div className="coach-orb"><Icon name="brain" size={52}/></div><h2>What are you building clarity on?</h2><p>The coach turns a stuck moment into the next useful step.</p><div className="coach-input"><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask about double entry, financial statements, ratios, or your exam plan…"/><button onClick={() => ask()} aria-label="Ask AI coach" disabled={coach.loading}>{coach.loading ? "…" : <Icon name="send" size={20}/>}</button></div><div className="question-chips">{["Explain double entry", "How do I calculate gross profit margin?", "How do I prepare a partnership appropriation account?"].map((q) => <button key={q} onClick={() => ask(q)} disabled={coach.loading}>{q}</button>)}</div>{coach.answer && <div className="coach-answer"><Icon name="brain" size={20}/><p>{coach.answer}</p></div>}{coach.error && <p className="coach-error">{coach.error}</p>}</div></FeaturePage>;

}



function ExamPage({study,setStudy}) {

  const [paper,setPaper]=useState(1);

  return <><div className="paper-switch segmented"><button className={paper===1?"selected":""} onClick={()=>setPaper(1)}>Paper 1 · Multiple choice</button><button className={paper===2?"selected":""} onClick={()=>setPaper(2)}>Paper 2 · Structured written</button></div>{paper===1?<MultipleChoiceExam study={study} setStudy={setStudy}/>:<StructuredExam setStudy={setStudy}/>}</>;

}



function MultipleChoiceExam({ study, setStudy }) {

  const [subject, setSubject] = useState("Accounting");

  const [exams, setExams] = useState([]);

  const [examId, setExamId] = useState("");

  const [questions, setQuestions] = useState([]);

  const [index, setIndex] = useState(0);

  const [answers, setAnswers] = useState({});

  const [seconds, setSeconds] = useState(90 * 60);

  const [result, setResult] = useState(null);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const submitGuard = useRef(false);

  useEffect(() => { let active = true; setExams([]); setExamId(""); setQuestions([]); setResult(null); fetchJson(`/api/content?type=exams&subject=${subject}`).then((data) => { if (active) { setExams(data.exams); setExamId(data.exams[0]?.id || ""); } }).catch((requestError) => active && setError(requestError.message)); return () => { active = false; }; }, [subject]);

  useEffect(() => { if (!examId) return; let active = true; setQuestions([]); setAnswers({}); setIndex(0); setResult(null); setSeconds(90 * 60); submitGuard.current = false; fetchJson(`/api/content?type=exam&subject=${subject}&examId=${encodeURIComponent(examId)}`).then((data) => active && setQuestions(data.questions)).catch((requestError) => active && setError(requestError.message)); return () => { active = false; }; }, [subject, examId]);

  useEffect(() => { if (!questions.length || result) return undefined; const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000); return () => window.clearInterval(timer); }, [questions.length, result]);

  const question = questions[index];

  const submit = async () => {

    if (!questions.length || submitGuard.current) return;

    submitGuard.current = true;

    setLoading(true);

    try {

      const graded = await fetchJson("/api/grade", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: questions.map((item) => ({ id: item.id, answer: answers[item.id] || "" })) }) });

      setResult(graded);

      const attempt = { id: `${subject}:${examId}:${Date.now()}`, date: new Date().toISOString(), subject, examId, paper: 1, marking: "Automatic", score: graded.score, total: graded.total, percent: graded.percent };

      const mistakes = graded.results.filter((item) => !item.correct && !item.error).map((item) => ({ ...item, id: `${item.id}:${Date.now()}`, questionId: item.id, date: attempt.date, examId }));

      setStudy((current) => ({ ...current, attempts: [attempt, ...current.attempts].slice(0, 60), mistakes: [...mistakes, ...current.mistakes.filter((item) => !mistakes.some((newItem) => newItem.questionId === item.questionId))].slice(0, 300) }));

    } catch (requestError) { submitGuard.current = false; setError(requestError.message); } finally { setLoading(false); }

  };

  const submitRef = useRef(submit);

  useEffect(() => { submitRef.current = submit; });

  useEffect(() => { if (seconds === 0 && questions.length && !result && !loading && !error) submitRef.current(); }, [seconds, questions.length, result, loading, error]);

  return <FeaturePage eyebrow="Exam arena" title="Pressure makes the plan real." description="Paper 1 · 40 questions · 90 minutes · 40 marks · 30% weighting. Original practice sampled from the lesson bank; not an official Cambridge paper."><div className="exam-controls"><div className="segmented">{["Accounting"].map((item) => <button key={item} onClick={() => setSubject(item)} className={subject === item ? "selected" : ""}>{item}</button>)}</div><label>Mock exam<select value={examId} onChange={(event) => setExamId(event.target.value)}>{exams.map((exam) => <option key={exam.id} value={exam.id}>{exam.id} · {exam.questions} questions</option>)}</select></label><strong className="exam-timer">{formatMinutes(seconds)}</strong></div>{error && <p className="coach-error">{error}</p>}{!question && !error && <div className="loading-panel">Preparing the exam arena…</div>}{question && !result && <div className="exam-stage"><div><span className="red-tag">{subject.toUpperCase()} / {question.section || "0452 PRACTICE"}</span><h2>Question {index + 1} of {questions.length}</h2>{question.passage && <blockquote className="exam-passage">{question.passage}</blockquote>}<p>{question.question}</p><QuestionChoices question={question} answer={answers[question.id]} onAnswer={(value) => setAnswers((current) => ({ ...current, [question.id]: value }))}/><div className="exam-navigation"><button className="outline-button compact-button" disabled={index === 0} onClick={() => setIndex((value) => value - 1)}>Previous</button><span>{Object.keys(answers).length} / {questions.length} answered</span>{index < questions.length - 1 ? <button className="outline-button compact-button" onClick={() => setIndex((value) => value + 1)}>Next</button> : <button className="primary-button compact-primary" onClick={submit} disabled={loading}>{loading ? "Grading…" : "Submit exam"}</button>}</div></div><aside className="exam-score"><Ring value={Math.round((Object.keys(answers).length / questions.length) * 100)} label={`${Object.keys(answers).length}/${questions.length}`}/><strong>{formatMinutes(seconds)}</strong><span>Time remaining</span><button className="primary-button compact-primary" onClick={submit} disabled={loading}>{loading ? "Grading…" : "Finish attempt"}</button></aside></div>}{result && <div className="exam-result"><Ring value={result.percent} label={`${result.percent}%`} blue/><div><span>Exam submitted</span><h2>{result.score} / {result.total} correct</h2><p>{result.results.filter((item) => !item.correct).length} questions are now in your Review Vault with their explanations.</p><button className="outline-button compact-button" onClick={() => { setResult(null); setIndex(0); setAnswers({}); setSeconds(90 * 60); submitGuard.current = false; }}>Try this exam again</button></div></div>}</FeaturePage>;

}



function liveRoomSlug(value) {

  return safeText(value).replace(/[^a-zA-Z0-9-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "ACCOUNTING-0452-STUDY-STUDIO";

}



function LivePage() {

  const [roomName, setRoomName] = useState("Accounting 0452 Study Studio");

  const [joined, setJoined] = useState(false);

  const [copied, setCopied] = useState(false);

  const [notes, setNotes] = useState("");

  const room = liveRoomSlug(roomName);

  const meetingUrl = `https://meet.jit.si/${encodeURIComponent(room)}`;

  useEffect(() => { setNotes(window.localStorage.getItem("accounting-0452:live-notes:v1") || ""); }, []);

  const updateNotes = (value) => { setNotes(value); window.localStorage.setItem("accounting-0452:live-notes:v1", value); };

  const copyLink = async () => {

    try { await navigator.clipboard.writeText(meetingUrl); setCopied(true); }

    catch { setCopied(false); }

  };

  return <FeaturePage eyebrow="Live studio" title="Explain it in real time." description="Open a direct Jitsi room for an anonymous call. Notes and the Visual Pad stay private to this browser."><div className="live-stage"><div className="live-video"><div className="live-signal"><Icon name="live" size={20}/> {joined ? "LIVE / CONNECTED" : "LIVE / READY"}</div>{joined ? <iframe title="Accounting 0452 Jitsi live call" className="jitsi-frame" src={meetingUrl} allow="camera; microphone; fullscreen; display-capture; autoplay; clipboard-write"/> : <div><span>Accounting Study Studio</span><h2>Transactions, statements &amp; decisions</h2><p>Name the room, then share the Jitsi link directly with your study partner.</p></div>}</div><div className="join-panel"><span>{joined ? "Studio active" : "Jitsi room"}</span><h2>{joined ? "Build together." : "One room away."}</h2><p>Jitsi handles the call without accounts. Use a unique room name and share its link only with invited people.</p><label>Room name<input value={roomName} onChange={(event) => { setRoomName(event.target.value); setJoined(false); setCopied(false); }} placeholder="Accounting 0452 Study Studio"/></label><button className="primary-button" onClick={() => setJoined(true)}>Open Live Studio <Icon name="live" size={18}/></button><button className="outline-button compact-button" onClick={copyLink}><Icon name="copy" size={16}/>{copied ? "Jitsi link copied" : "Copy Jitsi link"}</button></div></div><section className="shared-notes"><div><span>Session notes</span><small>This browser only</small></div><textarea value={notes} onChange={(event) => updateNotes(event.target.value)} placeholder="Write the steps you need to keep…"/><p>Use Visual Pad for diagrams; its work is also saved in this browser.</p></section></FeaturePage>;

}



function musicEmbedUrl(value) {

  try {

    const url = new URL(value);

    if (url.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;

    if (url.hostname.includes("youtube.com")) { const id = url.searchParams.get("v"); if (id) return `https://www.youtube.com/embed/${id}`; if (url.pathname.startsWith("/embed/")) return url.href; }

    if (url.hostname.includes("spotify.com")) return `https://open.spotify.com/embed${url.pathname}`;

    if (url.hostname.includes("soundcloud.com")) return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url.href)}`;

  } catch { return ""; }

  return "";

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



function VaultPage({ study, setStudy }) {

  const [subject, setSubject] = useState("All");

  const mistakes = study.mistakes.filter((item) => subject === "All" || item.subject === subject);

  const reviewed = study.mistakes.filter(item => study.reviewedIds.includes(item.id)).length;

  const clear = () => { if (window.confirm("Clear all saved review mistakes on this device?")) setStudy((current) => ({ ...current, mistakes: [], reviewedIds: [] })); };

  const markReviewed = (id) => setStudy((current) => ({ ...current, reviewedIds: [...new Set([...current.reviewedIds, id])] }));

  return <FeaturePage eyebrow="Review vault" title="Bring back what matters." description="Wrong answers stay here until the idea is secure. Revision decks remain ready for a focused final review."><div className="vault-stage"><div className="vault-mastery"><Ring value={study.mistakes.length ? Math.round((reviewed / study.mistakes.length) * 100) : 100} label={study.mistakes.length ? `${Math.round((reviewed / study.mistakes.length) * 100)}%` : "100%"}/><div><span>Items reviewed</span><h2>{reviewed} / {study.mistakes.length}</h2><p>Saved locally on this device</p><button className="outline-button compact-button" onClick={clear} disabled={!study.mistakes.length}>Clear vault</button></div></div><div className="revision-downloads"><span>Accounting 0452 · 2027–2029</span><a href="https://www.cambridgeinternational.org/Images/718141-2027-2029-syllabus.pdf" target="_blank" rel="noreferrer">Official syllabus &amp; ratio formulas <Icon name="external" size={16}/></a><a href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-accounting-0452/past-papers/" target="_blank" rel="noreferrer">Official papers &amp; mark schemes <Icon name="external" size={16}/></a><a href="/accounting-revision.html" target="_blank" rel="noreferrer">Accounting revision handbook <Icon name="external" size={16}/></a></div></div><div className="vault-filter"><div className="segmented">{["All", "Accounting"].map((item) => <button key={item} onClick={() => setSubject(item)} className={subject === item ? "selected" : ""}>{item}</button>)}</div><span>{mistakes.length} item{mistakes.length === 1 ? "" : "s"} to rebuild</span></div><div className="mistake-list">{mistakes.length ? mistakes.map((item) => <article key={item.id} className={study.reviewedIds.includes(item.id) ? "mistake-card reviewed" : "mistake-card"}><div><span>{item.subject} {item.section ? `· ${item.section}` : ""}</span><h3>{item.question}</h3><p>Your answer: <strong>{item.selected || "Not answered"}</strong> · Correct: <strong>{item.answer}</strong></p><p>{item.explanation}</p></div><button className="outline-button compact-button" onClick={() => markReviewed(item.id)}>{study.reviewedIds.includes(item.id) ? "Reviewed" : "Mark reviewed"}</button></article>) : <div className="empty-panel">No mistakes saved yet. Complete a practice question or mock exam to build your vault.</div>}</div></FeaturePage>;

}



function ProgressPage({ study }) {

  const [subject, setSubject] = useState("All");

  const attempts = study.attempts.filter((item) => subject === "All" || item.subject === subject).slice(0, 12).reverse();

  const percents = attempts.map((item) => item.percent);

  const latest = attempts.at(-1)?.percent || 0;

  const best = percents.length ? Math.max(...percents) : 0;

  const average = percents.length ? Math.round(percents.reduce((sum, value) => sum + value, 0) / percents.length) : 0;

  const path = attempts.length ? attempts.map((item, index) => `${index ? "L" : "M"}${20 + index * (660 / Math.max(1, attempts.length - 1))} ${190 - item.percent * 1.5}`).join(" ") : "M20 190 L680 190";

  return <FeaturePage eyebrow="Progress" title="The line is moving up." description="Your private attempt history is calculated from actual Accounting 0452 mock-exam results on this browser."><div className="progress-toolbar"><div className="segmented">{["All", "Accounting"].map((item) => <button key={item} onClick={() => setSubject(item)} className={subject === item ? "selected" : ""}>{item}</button>)}</div><span>{attempts.length} recorded attempt{attempts.length === 1 ? "" : "s"}</span></div><div className="progress-screen"><div className="score-summary"><span>Latest score</span><strong>{study.attempts.length ? latest : "—"}{latest ? <small>%</small> : null}</strong><p>Best {best || "—"}% · Average {average || "—"}%</p></div><svg viewBox="0 0 720 250" className="large-chart" role="img" aria-label="Accounting attempt progress chart"><g stroke="#2a2547" strokeWidth="1"><path d="M18 30H700M18 85H700M18 140H700M18 195H700"/></g><path d={path} fill="none" stroke="#22d3ee" strokeWidth="4"/>{attempts.map((item, index) => <circle key={item.id} cx={20 + index * (660 / Math.max(1, attempts.length - 1))} cy={190 - item.percent * 1.5} r="5" fill="#22d3ee"/>)}<g fill="#a09cc0" fontSize="14">{attempts.map((item, index) => <text key={item.id} x={12 + index * (660 / Math.max(1, attempts.length - 1))} y="225">{formatDate(item.date)}</text>)}</g></svg></div><div className="attempt-table">{attempts.length ? attempts.slice().reverse().map((item) => <div key={item.id}><span>{formatDate(item.date)}</span><strong>{item.subject}</strong><span>{item.examId} · {item.marking || "Automatic"}</span><span>{item.score} / {item.total}</span><b>{item.percent}%</b></div>) : <div className="empty-panel">Your score trend will appear after the first submitted mock exam.</div>}</div></FeaturePage>;

}



function Home({ study, setActiveSection, seconds, running, onToggle, coach, setCoach, askCoach }) {
  const [lessonCount, setLessonCount] = useState(1);
  useEffect(() => { let active = true; fetchJson("/api/content?type=summary").then(data => { if (active) setLessonCount(data.summary.Accounting.lessons); }).catch(() => {}); return () => { active = false; }; }, []);

  const [question, setQuestion] = useState("");

  const completed = study.completedLessons.length;

  const mastery = study.mistakes.length ? Math.round((study.mistakes.filter(item => study.reviewedIds.includes(item.id)).length / study.mistakes.length) * 100) : 100;

  const latest = study.attempts[0]?.percent || 0;

  const progress = Math.min(100, Math.round(completed / lessonCount * 100));

  const ask = async (value) => { if (!value.trim()) return; setCoach({ ...coach, loading: true, error: "" }); try { setCoach({ loading: false, error: "", answer: await askCoach(value) }); setQuestion(""); } catch (error) { setCoach({ loading: false, error: error.message, answer: "" }); } };

  return <><header className="topbar"><div className="greeting"><h1>Ready to balance the books, Omar?</h1><p>Accounting 0452 · {progress}% of the course complete</p></div><div className="topbar-actions"><div className="streak"><Icon name="flame" size={18}/><strong>{completed}</strong><span>lesson{completed === 1 ? "" : "s"} done</span></div></div></header><main className="dashboard"><section className="hero-card"><div className="hero-copy"><span className="hero-tag">IGCSE Accounting · Cambridge 0452</span><h1>Build the future.</h1><p>Your future. Your rules. <span>/</span> Master the money game.</p><div className="hero-actions"><button className="primary-button" onClick={() => setActiveSection("learning")}>Continue learning <Icon name="arrow" size={18}/></button><button className="outline-button" onClick={() => setActiveSection("exam")}>Take a mock exam <Icon name="arrow" size={18}/></button></div></div><div className="hero-visual"><div className="course-ring" style={{ "--value": progress }}><div><strong>{progress}%</strong><span>{completed} / {lessonCount} lessons</span></div></div><div className="hero-stats"><div><span>Latest mock</span><strong className="lime-text">{latest ? `${latest}%` : "—"}</strong></div><div><span>Mocks taken</span><strong className="cyan-text">{study.attempts.length}</strong></div><div><span>Vault mastery</span><strong className="pink-text">{mastery}%</strong></div></div></div></section><section className="father-note" aria-label="A word from Omar's father"><div className="father-badge"><Icon name="heart" size={26}/></div><div><span className="father-note-tag">A word from Dad</span><p>Omar, my son — every lesson here was written with you in mind. On the long days, it is you who gives me the strength to keep going. You are my greatest motivation and my proudest achievement. Whatever the result, I believe in you, I am proud of you, and I love you more than words can say.</p><strong>— Your father, Mohamed Basiouny</strong></div></section><div className="content-grid top-grid"><section className="panel coach-card"><div className="panel-title"><span><Icon name="brain"/> AI Coach</span><em>Groq</em></div><p>Ask anything. Get clarity.</p><div className="quick-ask"><textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="What’s challenging you today?"/><button onClick={() => ask(question)} aria-label="Ask coach" disabled={coach.loading}>{coach.loading ? "…" : <Icon name="send" size={18}/>}</button></div><div className="suggestions">{["Explain double entry", "How do I prepare a trial balance?", "How do I reconcile a bank statement?"].map((item) => <button key={item} onClick={() => ask(item)} disabled={coach.loading}>{item}</button>)}</div>{coach.answer && <div className="mini-reply">{coach.answer}</div>}{coach.error && <div className="coach-error">{coach.error}</div>}</section><section className="panel music-card"><div className="panel-title"><span><Icon name="headphones"/> Focus Music</span><button className="tiny-icon" onClick={() => setActiveSection("music")} aria-label="Open focus music"><Icon name="plus" size={16}/></button></div><Timer seconds={seconds} running={running} onToggle={onToggle} compact/></section><section className="panel live-card"><div className="panel-title"><span><Icon name="live"/> Live Studio</span><em>Ready</em></div><strong className="blue-display">PRIVATE LINK</strong><h3>Shared Visual Pad</h3><p>Call, notes, and a collaborative whiteboard.</p><button className="outline-button" onClick={() => setActiveSection("live")}>Open studio<Icon name="calendar" size={18}/></button></section><section className="panel arena-card"><div className="panel-title"><span><Icon name="target"/> Exam Arena</span><em className="red-outline">0452 Practice</em></div><p>Use the Accounting 0452 mock-exam bank.</p><strong className="countdown">{latest ? `${latest}%` : "READY"}</strong><div className="countdown-labels"><span>LAST</span><span>EXAM</span><span>RESULT</span></div><button className="primary-button" onClick={() => setActiveSection("exam")}>Enter build mode <Icon name="arrow" size={21}/></button></section></div><div className="content-grid bottom-grid"><section className="panel review-card"><div className="panel-title"><span><Icon name="vault"/> Review Vault</span></div><div className="review-content"><Ring value={mastery} label={`${mastery}%`}/><div><span>Mastery</span><strong>{study.mistakes.filter(item => study.reviewedIds.includes(item.id)).length} / {study.mistakes.length}</strong><p>Items reviewed</p><button className="outline-button" onClick={() => setActiveSection("vault")}>Open Vault <Icon name="external" size={17}/></button></div></div></section><section className="panel progress-card"><div className="panel-title"><span><Icon name="trend"/> Progress</span><button className="range-button" onClick={() => setActiveSection("progress")}>Real attempts <span>↗</span></button></div><div className="progress-content"><div className="score-chip"><span>Latest score</span><strong>{study.attempts.length ? latest : "—"} {latest ? <small>%</small> : null}</strong><p>{study.attempts.length} saved mock attempt{study.attempts.length === 1 ? "" : "s"}</p></div><svg className="mini-chart" viewBox="0 0 690 150" role="img" aria-label="Progress score trend"><g stroke="#2a2547" strokeWidth="1"><path d="M5 25H675M5 75H675M5 125H675"/></g><path d={study.attempts.length ? study.attempts.slice(0, 8).reverse().map((attempt, index, array) => `${index ? "L" : "M"}${6 + index * (668 / Math.max(1, array.length - 1))} ${125 - attempt.percent}`).join(" ") : "M6 125 L674 125"} fill="none" stroke="#22d3ee" strokeWidth="3"/></svg></div></section></div></main></>;

}



export default function Accounting0452() {

  const [activeSection, setActiveSection] = useState("home");

  const [focusSeconds, setFocusSeconds] = useState(45 * 60);

  const [focusRunning, setFocusRunning] = useState(false);

  const [study, setStudy] = useStoredStudy();

  const [coach, setCoach] = useState({ loading: false, answer: "", error: "" });

  useEffect(() => { if (!focusRunning) return undefined; const timer = window.setInterval(() => setFocusSeconds((current) => current > 0 ? current - 1 : 45 * 60), 1000); return () => window.clearInterval(timer); }, [focusRunning]);

  const askCoach = useCallback(async (question) => { const response = await fetchJson("/api/coach", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }) }); return response.reply; }, []);

  const navigate = (section) => setActiveSection(section);

  const renderSection = () => {

    if (activeSection === "learning") return <LearningPage study={study} setStudy={setStudy} askCoach={askCoach}/>;

    if (activeSection === "coach") return <CoachPage coach={coach} setCoach={setCoach} askCoach={askCoach}/>;

    if (activeSection === "pad") return <VisualPad/>;

    if (activeSection === "exam") return <ExamPage study={study} setStudy={setStudy}/>;

    if (activeSection === "live") return <LivePage/>;

    if (activeSection === "music") return <MusicPage seconds={focusSeconds} running={focusRunning} onToggle={() => setFocusRunning((current) => !current)} study={study} setStudy={setStudy}/>;

    if (activeSection === "vault") return <VaultPage study={study} setStudy={setStudy}/>;

    if (activeSection === "progress") return <ProgressPage study={study}/>;

    return <Home study={study} setActiveSection={navigate} seconds={focusSeconds} running={focusRunning} onToggle={() => setFocusRunning((current) => !current)} coach={coach} setCoach={setCoach} askCoach={askCoach}/>;

  };

  return <div className="app-shell"><aside className="sidebar"><button className="brand" onClick={() => navigate("home")}><span><BrandMark/>IGCSE Accounting | Cambridge (0452)</span><small>Mr. Mohamed Basiouny</small></button><div className="brand-rule"/><nav>{NAV_ITEMS.map(([id, label, icon]) => <button key={id} className={activeSection === id ? "nav-item active" : "nav-item"} onClick={() => navigate(id)}><Icon name={icon}/><span>{label}</span></button>)}</nav><footer className="credit"><span>Designed &amp; developed by</span><strong>Eng. Ahmed Labib</strong><small>© 2026 · All rights reserved</small></footer></aside><div className="main-area">{renderSection()}</div></div>;

}

