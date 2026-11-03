"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon, QuestionChoices, fetchJson } from "./ui";
import { recordMistake } from "../_lib/study-engine.mjs";

// The textbook-depth study guide for one syllabus section: notes, worked examples, key terms, common
// errors and exam tips, workbook-style exercises with model answers and AI marking, and a section quiz.

const TABS = [["notes", "Notes"], ["examples", "Worked examples"], ["terms", "Key terms"], ["tips", "Mistakes & tips"], ["exercises", "Exercises"], ["quiz", "Quiz"]];

export function SectionGuide({ section, study, setStudy, askCoach }) {
  const [guide, setGuide] = useState(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("notes");
  useEffect(() => {
    let active = true;
    setGuide(null); setError(""); setTab("notes");
    fetchJson(`/api/content?type=guide&section=${encodeURIComponent(section)}`).then((data) => active && setGuide(data)).catch((e) => active && setError(e.message));
    return () => { active = false; };
  }, [section]);
  if (error) return <section className="guide"><p className="muted-line">{error}</p></section>;
  if (!guide) return <section className="guide"><div className="loading-panel">Loading the study guide for {section}…</div></section>;
  const done = guide.exercises.filter((x) => study?.guideMarks?.[x.id]).length;
  return <section className="guide" aria-label={`Study guide ${section}`}>
    <header className="guide-head">
      <div><span className="red-tag">STUDY GUIDE · {section}</span><h2>{guide.title}</h2><p>{guide.summary}</p></div>
      <div className="guide-progress"><strong>{done}/{guide.exercises.length}</strong><span>exercises attempted</span></div>
    </header>
    <div className="guide-objectives"><b>By the end you can:</b><ul>{guide.objectives.map((o) => <li key={o}>{o}</li>)}</ul></div>
    <nav className="guide-tabs" role="tablist">{TABS.map(([id, label]) => <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}>{label}{id === "exercises" ? ` (${guide.exercises.length})` : id === "quiz" ? ` (${guide.quizCount})` : ""}</button>)}</nav>
    {tab === "notes" && <div className="guide-notes">{guide.notes.map((note) => <article key={note.heading}><h3>{note.heading}</h3>{note.body.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}{note.table && <div className="guide-table"><table><thead><tr>{note.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{note.table.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>}</article>)}
      <button className="outline-button compact-button" onClick={() => askCoach(`Explain section ${section} ${guide.title} of Cambridge IGCSE Accounting 0452 in simple words, then give me one quick question to check I understood.`)}>Ask the AI Coach about this section <Icon name="arrow" size={16}/></button></div>}
    {tab === "examples" && <div className="guide-examples">{guide.workedExamples.map((ex) => <WorkedExample key={ex.title} example={ex}/>)}</div>}
    {tab === "terms" && <dl className="guide-terms">{guide.keyTerms.map((k) => <div key={k.term}><dt>{k.term}</dt><dd>{k.definition}</dd></div>)}</dl>}
    {tab === "tips" && <div className="guide-tips"><div><h3><Icon name="x" size={16}/> Mistakes students make</h3><ul>{guide.commonErrors.map((c) => <li key={c.error}><strong>{c.error}</strong><span>{c.fix}</span></li>)}</ul></div><div><h3><Icon name="star" size={16}/> How the marks are won</h3><ul>{guide.examTips.map((t) => <li key={t}>{t}</li>)}</ul></div></div>}
    {tab === "exercises" && <div className="guide-exercises">{guide.exercises.map((x, i) => <Exercise key={x.id} index={i + 1} exercise={x} section={section} title={guide.title} study={study} setStudy={setStudy}/>)}</div>}
    {tab === "quiz" && <SectionQuiz section={section} title={guide.title} count={guide.quizCount} setStudy={setStudy}/>}
  </section>;
}

function WorkedExample({ example }) {
  const [shown, setShown] = useState(0);
  return <article className="guide-example">
    <h3>{example.title}</h3>
    <p className="guide-scenario">{example.scenario}</p>
    <ol>{example.steps.slice(0, shown).map((step, i) => <li key={i}>{step}</li>)}</ol>
    {shown < example.steps.length ? <button className="outline-button compact-button" onClick={() => setShown((n) => n + 1)}>{shown === 0 ? "Show step 1" : `Show step ${shown + 1}`} of {example.steps.length} <Icon name="arrow" size={15}/></button>
      : <div className="guide-answer"><b>Answer</b>{example.answer}</div>}
  </article>;
}

const TYPE_LABELS = { calculation: "Calculate", entries: "Record the entries", statement: "Prepare", explain: "Explain" };

function Exercise({ index, exercise, section, title, study, setStudy }) {
  const saved = study?.guideMarks?.[exercise.id];
  const [answer, setAnswer] = useState("");
  const [model, setModel] = useState(null);
  const [verdict, setVerdict] = useState(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const reveal = async () => {
    if (model) return model;
    setBusy("reveal"); setError("");
    try { const data = await fetchJson(`/api/content?type=exercise&id=${encodeURIComponent(exercise.id)}`); setModel(data); return data; }
    catch (e) { setError(e.message); return null; } finally { setBusy(""); }
  };
  const record = (marks) => {
    const date = new Date().toISOString();
    setStudy((current) => {
      const next = { ...current, guideMarks: { ...(current.guideMarks || {}), [exercise.id]: { marks, max: exercise.marks, date } } };
      if (marks < exercise.marks && model) return recordMistake(next, { id: `guide:${exercise.id}`, subject: "Accounting", section, question: `${title} · exercise ${index}: ${exercise.prompt}`, selected: answer || "Not answered", answer: model.model, explanation: model.points.join(" · "), examId: "Study guide" }, date);
      return next;
    });
  };
  const aiMark = async () => {
    setBusy("ai"); setError("");
    try {
      const shown = await reveal(); if (!shown) return;
      const result = await fetchJson("/api/mark", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ exerciseId: exercise.id, answer }) });
      setVerdict(result); record(result.marks);
    } catch (e) { setError(e.message); } finally { setBusy(""); }
  };
  return <article className={`guide-exercise${saved ? " done" : ""}`}>
    <header><span>Exercise {index} · {TYPE_LABELS[exercise.type] || exercise.type} · {exercise.marks} marks</span>{saved && <b className={saved.marks === saved.max ? "good" : ""}>{saved.marks}/{saved.max}</b>}</header>
    <p>{exercise.prompt}</p>
    <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={exercise.type === "explain" ? 4 : 6} placeholder={exercise.type === "explain" ? "Write your answer in full sentences. Make a point, then say why." : "Show your workings: account names, debit and credit sides, dates and totals."}/>
    <div className="guide-exercise-actions">
      <button className="primary-button compact-primary" disabled={!answer.trim() || busy !== ""} onClick={aiMark}>{busy === "ai" ? "Marking…" : "AI mark my answer"} <Icon name="brain" size={16}/></button>
      <button className="outline-button compact-button" disabled={busy !== ""} onClick={reveal}>{model ? "Model answer shown" : "Show model answer"}</button>
    </div>
    {error && <p className="coach-error">{error}</p>}
    {verdict?.points && <div className="ai-verdict"><strong><Icon name="brain" size={16}/> AI marking: {verdict.marks} / {verdict.max}</strong><ul>{verdict.points.map((p) => <li key={p.n} className={p.met ? "met" : "missed"}><Icon name={p.met ? "check" : "x"} size={14}/><span>{p.text}</span></li>)}</ul>{verdict.feedback && <p>{verdict.feedback}</p>}</div>}
    {model && <div className="guide-model"><b>Model answer</b><p>{model.model}</p><ol>{model.points.map((pt) => <li key={pt}>{pt}</li>)}</ol>
      {!verdict && <div className="guide-selfmark"><span>Mark yourself:</span>{Array.from({ length: exercise.marks + 1 }, (_, m) => <button key={m} className={saved?.marks === m ? "selected" : ""} onClick={() => record(m)}>{m}</button>)}<small>/ {exercise.marks}</small></div>}</div>}
  </article>;
}

function SectionQuiz({ section, title, count, setStudy }) {
  const [questions, setQuestions] = useState(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");
  const [grading, setGrading] = useState(false);
  const start = () => {
    setQuestions(null); setIndex(0); setAnswer(""); setResult(null); setScore(0); setError("");
    fetchJson(`/api/content?type=quiz&sections=${encodeURIComponent(section)}&count=${count}`).then((d) => setQuestions(d.questions)).catch((e) => setError(e.message));
  };
  useEffect(start, [section, count]);
  const question = questions?.[index];
  const finished = questions && index >= questions.length;
  const percent = useMemo(() => questions?.length ? Math.round((score / questions.length) * 100) : 0, [score, questions]);
  const check = async () => {
    if (!question || !answer) return;
    setGrading(true); setError("");
    try {
      const data = await fetchJson("/api/grade", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: [{ id: question.id, answer }] }) });
      const item = data.results[0]; setResult(item);
      if (item.correct) setScore((s) => s + 1);
      else setStudy((current) => recordMistake(current, { id: `quiz:${question.id}`, subject: "Accounting", section, question: question.question, selected: question.choices.find((c) => c.id === answer)?.text || answer, answer: question.choices.find((c) => c.id === item.answer)?.text || item.answer, explanation: item.explanation, examId: `Section ${section} quiz` }));
    } catch (e) { setError(e.message); } finally { setGrading(false); }
  };
  if (error) return <p className="coach-error">{error}</p>;
  if (!questions) return <div className="loading-panel">Preparing {count} questions on {title}…</div>;
  if (finished) return <div className="guide-quiz-done"><strong>{score} / {questions.length}</strong><p>{percent >= 80 ? "Strong. Move on to the exercises or the next section." : percent >= 50 ? "Getting there. Read the Mistakes & tips tab, then try again." : "Not yet. Go back to the notes and worked examples, then retry."}</p><button className="primary-button compact-primary" onClick={start}>Try a fresh set <Icon name="shuffle" size={16}/></button></div>;
  return <div className="guide-quiz">
    <div className="guide-quiz-head"><span>Question {index + 1} of {questions.length}</span><span>Score {score}</span></div>
    <p className="guide-quiz-question">{question.question}</p>
    <QuestionChoices question={question} answer={answer} onAnswer={setAnswer} result={result}/>
    {!result && <button className="primary-button compact-primary" disabled={!answer || grading} onClick={check}>{grading ? "Checking…" : "Check answer"} <Icon name="arrow" size={16}/></button>}
    {result && <div className={result.correct ? "feedback good" : "feedback"}>{result.correct ? "Correct. " : "Not yet. "}{result.explanation}</div>}
    {result && <button className="outline-button compact-button" onClick={() => { setIndex((i) => i + 1); setAnswer(""); setResult(null); }}>{index + 1 < questions.length ? "Next question" : "See my score"} <Icon name="arrow" size={15}/></button>}
  </div>;
}
