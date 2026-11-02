"use client";

import { useEffect, useMemo, useState } from "react";
import { FeaturePage, Icon, ProgressBar, QuestionChoices, Ring, fetchJson, formatMinutes, loadLearning } from "./ui";
import { celebrate } from "./effects";
import {
  SECTION_TITLES, assignmentDone, dailyPlan, dayKey, goalReached, predictGrade, recordMistake, recordPractice, recordReview,
  reviewSummary, streakFor, topGains, weeklyChallenge, withExtras,
} from "../_lib/study-engine.mjs";

const SESSION_SECONDS = 15 * 60;

export { assignmentDone };

// One place that records any answered question: practice, review or recall.
export function recordAnswer(study, item, correct, result) {
  if (item.kind === "practice") {
    const next = recordPractice(study, { id: item.questionId, section: item.section, correct });
    return !correct && result ? recordMistake(next, result) : next;
  }
  return recordReview(study, item.mistake, correct);
}

export function PredictedGrade({ study, go, compact = false }) {
  const prediction = predictGrade(study);
  const gains = topGains(study);
  if (!prediction) {
    return <section className="panel grade-card"><div className="panel-title"><span><Icon name="trophy"/> Predicted grade</span><em>Needs data</em></div><p>Answer at least 12 questions or take one mock and your likely grade appears here, worked out section by section.</p><button className="outline-button compact-button" onClick={() => go("exam")}>Take a mock <Icon name="arrow" size={16}/></button></section>;
  }
  return <section className="panel grade-card">
    <div className="panel-title"><span><Icon name="trophy"/> Predicted grade</span><em>{prediction.confidence} confidence</em></div>
    <div className="grade-main"><strong className="grade-letter">{prediction.grade}</strong><div><b>{prediction.percent}%</b><span>{prediction.basis === "mocks" ? `Paper 1 ${prediction.paper1 === null ? "not taken" : `${prediction.paper1}%`} · Paper 2 ${prediction.paper2 === null ? "not taken" : `${prediction.paper2}%`}` : "From practice answers, weighted like Paper 1"}</span>{prediction.next && <span className="lime-text">{prediction.next.needed} more marks per 100 for {prediction.next.grade}</span>}</div></div>
    {!compact && <><h4>Three topics that would raise it most</h4><ol className="gain-list">{gains.map((gain) => <li key={gain.section}><button onClick={() => go("learning", { section: gain.section })}><span>{gain.section}</span><strong>{gain.title}</strong><small>{gain.accuracy === null ? "Not tried yet" : `${Math.round(gain.accuracy * 100)}% right`} · {gain.share} of 40 Paper 1 marks</small><Icon name="arrow" size={16}/></button></li>)}</ol></>}
    <p className="fine-print">An estimate using indicative boundaries (A* 80%, A 70%, B 60%, C 50%…). Cambridge sets the real thresholds after each exam series.</p>
  </section>;
}

function useQuestions(ids) {
  const [questions, setQuestions] = useState({});
  const [error, setError] = useState("");
  const key = ids.join(",");
  useEffect(() => {
    if (!key) return undefined;
    let active = true;
    fetchJson(`/api/content?type=questions&ids=${encodeURIComponent(key)}`)
      .then((data) => { if (active) setQuestions(Object.fromEntries(data.questions.map((question) => [question.id, question]))); })
      .catch((requestError) => { if (active) setError(requestError.message); });
    return () => { active = false; };
  }, [key]);
  return [questions, error];
}

function SessionCard({ item, question, onDone, settings }) {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const check = async () => {
    setBusy(true); setError("");
    try {
      const response = await fetchJson("/api/grade", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: [{ id: question.id, answer }] }) });
      setResult(response.results[0]);
      if (response.results[0].correct) celebrate(settings);
    } catch (requestError) { setError(navigator.onLine === false ? "You're offline. Your answer is kept; check it when you're back online." : requestError.message); } finally { setBusy(false); }
  };
  const tag = item.kind === "practice" ? "New practice" : "Spaced review";
  if (item.kind === "recall") {
    const { mistake } = item;
    return <article className="session-card"><span className="red-tag">{tag} · {mistake.section}</span><h3>{mistake.question}</h3><p className="fine-print">Say or write your answer first, then compare it with the model.</p>
      {!revealed ? <button className="primary-button compact-primary" onClick={() => setRevealed(true)}>Show the model answer <Icon name="arrow" size={18}/></button>
        : <><div className="lesson-example"><span>Model answer</span><p>{mistake.answer}</p></div>{mistake.explanation && <p className="fine-print">Mark points: {mistake.explanation}</p>}<div className="self-rate"><button className="outline-button compact-button" onClick={() => onDone(false)}><Icon name="x" size={16}/> Not yet</button><button className="primary-button compact-primary" onClick={() => { celebrate(settings); onDone(true); }}><Icon name="check" size={16}/> I had it</button></div></>}
    </article>;
  }
  if (!question) return <article className="session-card"><div className="loading-panel">Loading question…</div></article>;
  return <article className="session-card"><span className="red-tag">{tag} · {question.section}</span><h3>{question.lessonTitle}</h3>{question.passage && <blockquote className="exam-passage">{question.passage}</blockquote>}<p>{question.question}</p>
    <QuestionChoices question={question} answer={answer} onAnswer={setAnswer} result={result}/>
    {error && <p className="coach-error">{error}</p>}
    {!result ? <button className="primary-button compact-primary" disabled={!answer || busy} onClick={check}>{busy ? "Checking…" : "Check answer"}<Icon name="arrow" size={18}/></button>
      : <><div className={result.correct ? "feedback good" : "feedback"}>{result.correct ? "Correct. " : "Not yet. "}{result.explanation}</div><button className="primary-button compact-primary" onClick={() => onDone(result.correct, result)}>Next <Icon name="arrow" size={18}/></button></>}
  </article>;
}

function DailySession({ study, setStudy, go }) {
  const [pool, setPool] = useState(null);
  const [plan, setPlan] = useState(null);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(SESSION_SECONDS);
  const [started, setStarted] = useState(false);
  const [poolError, setPoolError] = useState("");
  const full = withExtras(study);
  useEffect(() => { loadLearning().then((data) => setPool(data.practice)).catch((error) => setPoolError(error.message)); }, []);
  const ids = useMemo(() => (plan || []).filter((item) => item.kind !== "recall").map((item) => item.questionId), [plan]);
  const [questions, questionError] = useQuestions(ids);
  useEffect(() => {
    if (!started || step >= (plan?.length || 0)) return undefined;
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [started, step, plan]);
  const begin = () => { setPlan(dailyPlan(study, pool || [], dayKey(), 8)); setStep(0); setScore(0); setSeconds(SESSION_SECONDS); setStarted(true); };
  const finish = (correct, result) => {
    const item = plan[step];
    setStudy((current) => recordAnswer(current, item, correct, result));
    if (correct) setScore((value) => value + 1);
    if (step + 1 >= plan.length) celebrate(full.settings, true);
    setStep((value) => value + 1);
  };
  const reviews = reviewSummary(study);
  if (!started) {
    return <section className="panel session-panel"><div className="panel-title"><span><Icon name="today"/> Today&apos;s 15-minute session</span><em>{reviews.due} due</em></div>
      <h2>{reviews.due ? `${reviews.due} old mistake${reviews.due === 1 ? "" : "s"} to bring back` : "Fresh practice from your weakest sections"}</h2>
      <p>Mistakes come back after 1, 3, 7 and 14 days. Get one right four times in a row and it&apos;s mastered. The rest of the session targets the sections that would lift your grade most.</p>
      <div className="session-stats"><div><strong>{reviews.total}</strong><span>saved mistakes</span></div><div><strong>{reviews.due}</strong><span>due today</span></div><div><strong>{reviews.mastered}</strong><span>mastered</span></div></div>
      {poolError && <p className="coach-error">{poolError}</p>}
      <button className="primary-button" onClick={begin} disabled={!pool && !poolError}>{pool ? "Start today's session" : "Loading…"} <Icon name="play" size={18}/></button>
    </section>;
  }
  if (!plan.length) return <section className="panel session-panel"><h2>Nothing to review yet.</h2><p>Answer some practice questions or take a mock first, and your sessions will build from your own mistakes.</p><button className="primary-button" onClick={() => go("learning")}>Open Learning <Icon name="arrow" size={18}/></button></section>;
  if (step >= plan.length) {
    return <section className="panel session-panel session-done"><Ring value={Math.round((score / plan.length) * 100)} label={`${score}/${plan.length}`} blue/><div><span>Session complete</span><h2>{score === plan.length ? "Perfect session." : "Done. That is real progress."}</h2><p>Wrong answers come back tomorrow. Right ones move further out, to 3, 7 and then 14 days.</p><div className="hero-actions"><button className="outline-button compact-button" onClick={begin}>Another round</button><button className="primary-button compact-primary" onClick={() => go("lab")}>Practice Lab <Icon name="arrow" size={16}/></button></div></div></section>;
  }
  const item = plan[step];
  return <section className="panel session-panel"><div className="session-progress"><span>Question {step + 1} of {plan.length}</span><ProgressBar value={step / plan.length} label="Session progress"/><strong className={seconds < 120 ? "pink-text" : "cyan-text"}>{formatMinutes(seconds)}</strong></div>
    {questionError && <p className="coach-error">{questionError}</p>}
    <SessionCard key={`${step}:${item.questionId}`} item={item} question={questions[item.questionId]} onDone={finish} settings={full.settings}/>
  </section>;
}

function WeeklyChallenge({ study }) {
  const challenge = weeklyChallenge(study);
  return <section className="panel challenge-card"><div className="panel-title"><span><Icon name="star"/> Weekly challenge</span><em>{challenge.complete ? "Complete" : "Ends Sunday"}</em></div><h3>{challenge.name}</h3>
    {challenge.goals.map((goal) => <div className="challenge-goal" key={goal.key}><div><span>{goal.done} / {goal.target} {goal.label}</span>{goal.done >= goal.target && <Icon name="check" size={16}/>}</div><ProgressBar value={goal.done / goal.target} label={goal.label} tone={goal.done >= goal.target ? "lime" : "violet"}/></div>)}
  </section>;
}

function StreakCard({ study }) {
  const streak = streakFor(study);
  return <section className="panel streak-card"><div className="panel-title"><span><Icon name="flame"/> Streak</span><em>Best {streak.best}</em></div><div className="streak-big"><strong>{streak.current}</strong><span>day{streak.current === 1 ? "" : "s"} in a row</span></div><p>{streak.studiedToday ? "Today counts. Nice." : "Answer one question today to keep it going."}</p><div className="freeze-row"><Icon name="shield" size={18}/><span>{streak.freezes} streak protector{streak.freezes === 1 ? "" : "s"} saved. One covers a missed day automatically. Earn one for every 7 days in a row (two at most).</span></div></section>;
}

export function DadInbox({ study, go }) {
  const full = withExtras(study);
  const open = full.assignments.filter((assignment) => !assignmentDone(assignment, full));
  const goals = full.goals;
  if (!open.length && !goals.length) return null;
  return <section className="panel dad-inbox"><div className="panel-title"><span><Icon name="heart"/> From Dad</span><em>{open.length} to do</em></div>
    {open.map((assignment) => <button key={assignment.id} className="assignment-row" onClick={() => go(assignment.kind === "mock" ? "exam" : assignment.kind === "lab" ? "lab" : assignment.kind === "today" ? "today" : "learning", assignment.kind === "lesson" ? { lessonId: assignment.target } : undefined)}><Icon name={assignment.kind === "mock" ? "target" : assignment.kind === "lab" ? "lab" : "book"} size={18}/><div><strong>{assignment.title}</strong>{assignment.note && <small>“{assignment.note}”</small>}</div><Icon name="arrow" size={16}/></button>)}
    {goals.map((goal) => <div key={goal.id} className={goalReached(goal, full) ? "goal-row unlocked" : "goal-row"}><Icon name={goalReached(goal, full) ? "unlock" : "lock"} size={18}/><div><strong>{goalReached(goal, full) ? "Message unlocked" : "A message is waiting"}</strong><small>{goal.label}</small></div>{goalReached(goal, full) && <button className="outline-button compact-button" onClick={() => go("rewards", { goal: goal.id })}>Open</button>}</div>)}
  </section>;
}

export function TodayPage({ study, setStudy, go }) {
  return <FeaturePage eyebrow="Today" title="Fifteen minutes. Every day." description={`Your plan for ${new Intl.DateTimeFormat("en", { weekday: "long", day: "numeric", month: "long" }).format(new Date())}, built from your own mistakes and weakest sections.`}>
    <div className="today-grid"><DailySession study={study} setStudy={setStudy} go={go}/><div className="today-side"><DadInbox study={study} go={go}/><PredictedGrade study={study} go={go}/><StreakCard study={study}/><WeeklyChallenge study={study}/></div></div>
    <p className="fine-print">All {Object.keys(SECTION_TITLES).length} syllabus sections are tracked. Everything is saved in this browser.</p>
  </FeaturePage>;
}
