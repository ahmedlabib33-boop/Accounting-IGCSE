// Pure study logic shared by the Today, Dad and Practice Lab screens.
// Everything here works from the study object saved in the browser, so it can be unit-tested.

export const TOPICS = [
  { id: "1", name: "Accounting foundations", sections: ["1.1", "1.2"] },
  { id: "2", name: "Recording transactions", sections: ["2.1", "2.2", "2.3"] },
  { id: "3", name: "Checking records", sections: ["3.1", "3.2", "3.3", "3.4"] },
  { id: "4", name: "Accounting adjustments", sections: ["4.1", "4.2", "4.3", "4.4", "4.5"] },
  { id: "5", name: "Financial statements", sections: ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6"] },
  { id: "6", name: "Financial analysis", sections: ["6.1", "6.2", "6.3", "6.4", "6.5"] },
  { id: "7", name: "Concepts, ethics and technology", sections: ["7.1", "7.2", "7.3"] },
];

export const SECTIONS = TOPICS.flatMap((topic) => topic.sections);

export const SECTION_TITLES = {
  "1.1": "Purpose of accounting", "1.2": "The accounting equation",
  "2.1": "Double entry", "2.2": "Business documents", "2.3": "Books of prime entry",
  "3.1": "Trial balance", "3.2": "Correction of errors", "3.3": "Bank reconciliation", "3.4": "Control accounts",
  "4.1": "Capital and revenue", "4.2": "Depreciation and disposal", "4.3": "Accruals and prepayments", "4.4": "Irrecoverable debts", "4.5": "Inventory valuation",
  "5.1": "Sole traders", "5.2": "Partnerships", "5.3": "Limited companies", "5.4": "Manufacturing", "5.5": "Clubs and societies", "5.6": "Incomplete records",
  "6.1": "Calculating ratios", "6.2": "Interpreting ratios", "6.3": "Inter-firm comparison", "6.4": "Users of accounts", "6.5": "Limitations",
  "7.1": "Accounting principles", "7.2": "Professional ethics", "7.3": "Technology in accounting",
};

// Questions per section in each original Paper 1 mock (40 in total).
export const PAPER1_SHARE = {
  "1.1": 2, "1.2": 1, "2.1": 2, "2.2": 1, "2.3": 2, "3.1": 1, "3.2": 2, "3.3": 1, "3.4": 2,
  "4.1": 1, "4.2": 2, "4.3": 1, "4.4": 2, "4.5": 1, "5.1": 2, "5.2": 1, "5.3": 2, "5.4": 1, "5.5": 2, "5.6": 1,
  "6.1": 2, "6.2": 1, "6.3": 1, "6.4": 1, "6.5": 1, "7.1": 1, "7.2": 2, "7.3": 1,
};

export const LESSONS_PER_SECTION = {
  "1.1": 1, "1.2": 1, "2.1": 4, "2.2": 1, "2.3": 4, "3.1": 2, "3.2": 2, "3.3": 2, "3.4": 3,
  "4.1": 2, "4.2": 3, "4.3": 3, "4.4": 3, "4.5": 2, "5.1": 3, "5.2": 3, "5.3": 3, "5.4": 2, "5.5": 3, "5.6": 3,
  "6.1": 4, "6.2": 2, "6.3": 1, "6.4": 1, "6.5": 1, "7.1": 2, "7.2": 2, "7.3": 2,
};

// Paper weightings shown in the app: Paper 1 is 30%, Paper 2 is 70%.
export const PAPER_WEIGHTS = { 1: 0.3, 2: 0.7 };

// Indicative boundaries only. Cambridge sets real thresholds after every exam series.
export const GRADE_BOUNDARIES = [["A*", 80], ["A", 70], ["B", 60], ["C", 50], ["D", 40], ["E", 30], ["F", 20], ["G", 10]];

export const REVIEW_STEPS = [1, 3, 7, 14];
export const MASTERED_STAGE = REVIEW_STEPS.length;

export const LEVELS = [0, 200, 500, 900, 1400, 2000, 2700, 3500, 4400, 5400, 6500, 7700];
export const RANKS = ["Rookie Bookkeeper", "Journal Junior", "Ledger Apprentice", "Balance Builder", "Adjustment Ace", "Statement Pro", "Ratio Master", "Audit Ready", "Exam Hunter", "Distinction Track", "Ledger Legend", "Chartered Legend"];

export const MAX_FREEZES = 2;

export const EMPTY_EXTRAS = {
  practiceLog: [], reviews: {}, reviewLog: [], lessonDates: {}, labLog: [], time: {},
  freezes: { available: 1, usedDays: [], earnedOn: [] },
  settings: { sound: true, confetti: true, haptics: true, textSize: 1 },
  assignments: [], goals: [],
};

const pad = (value) => String(value).padStart(2, "0");

export function dayKey(value = new Date()) {
  const date = new Date(value);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function addDays(key, days) {
  const [year, month, day] = key.split("-").map(Number);
  return dayKey(new Date(year, month - 1, day + days));
}

export function daysBetween(fromKey, toKey) {
  const [a, b] = [fromKey, toKey].map((key) => { const [y, m, d] = key.split("-").map(Number); return Date.UTC(y, m - 1, d); });
  return Math.round((b - a) / 86400000);
}

export function withExtras(study) {
  return { ...EMPTY_EXTRAS, ...study, freezes: { ...EMPTY_EXTRAS.freezes, ...(study?.freezes || {}) }, settings: { ...EMPTY_EXTRAS.settings, ...(study?.settings || {}) } };
}

export function sectionsOf(value) {
  return String(value || "").split("/").map((part) => part.trim()).filter((part) => SECTIONS.includes(part));
}

export function sectionOfLesson(lessonId) {
  const match = /^0452-(\d\.\d)-/.exec(lessonId || "");
  return match ? match[1] : "";
}

// Accuracy per syllabus section from practice, reviews, Paper 1 results and Paper 2 part marks.
export function sectionStats(rawStudy) {
  const study = withExtras(rawStudy);
  const stats = Object.fromEntries(SECTIONS.map((section) => [section, { answered: 0, correct: 0 }]));
  const add = (section, answered, correct) => { if (stats[section]) { stats[section].answered += answered; stats[section].correct += correct; } };
  for (const item of study.practiceLog) add(item.section, 1, item.correct ? 1 : 0);
  for (const item of study.reviewLog) if (item.section) add(item.section, 1, item.correct ? 1 : 0);
  for (const attempt of study.attempts || []) {
    for (const item of attempt.results || []) add(item.section, 1, item.correct ? 1 : 0);
    for (const part of attempt.parts || []) {
      const sections = sectionsOf(part.section);
      for (const section of sections) add(section, part.max / sections.length / 4, part.marks / sections.length / 4);
    }
  }
  for (const section of SECTIONS) {
    const item = stats[section];
    item.accuracy = item.answered ? item.correct / item.answered : null;
  }
  return stats;
}

export function sectionMastery(rawStudy, lessonsPerSection = LESSONS_PER_SECTION) {
  const study = withExtras(rawStudy);
  const stats = sectionStats(study);
  const done = {};
  for (const id of study.completedLessons || []) { const section = sectionOfLesson(id); if (section) done[section] = (done[section] || 0) + 1; }
  return Object.fromEntries(SECTIONS.map((section) => {
    const total = lessonsPerSection[section] || 1;
    const lessonShare = Math.min(1, (done[section] || 0) / total);
    const { answered, accuracy } = stats[section];
    const confidence = Math.min(1, answered / 4);
    const score = Math.round(40 * lessonShare + 60 * (accuracy ?? 0) * confidence);
    const level = score === 0 && !answered ? "new" : score >= 80 ? "mastered" : score >= 50 ? "good" : "learning";
    return [section, { score, level, lessonsDone: done[section] || 0, lessons: total, answered: Math.round(answered), accuracy }];
  }));
}

export function gradeFor(percent) {
  for (const [grade, min] of GRADE_BOUNDARIES) if (percent >= min) return grade;
  return "U";
}

function average(values) { return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null; }

export function predictGrade(rawStudy) {
  const study = withExtras(rawStudy);
  const recent = (paper) => (study.attempts || []).filter((attempt) => (attempt.paper || 1) === paper).slice(0, 3).map((attempt) => attempt.percent);
  const p1 = average(recent(1));
  const p2 = average(recent(2));
  const stats = sectionStats(study);
  const answered = SECTIONS.reduce((sum, section) => sum + stats[section].answered, 0);
  let paper1 = p1;
  let basis = "mocks";
  if (paper1 === null && p2 === null) {
    if (answered < 12) return null;
    const weighted = SECTIONS.reduce((acc, section) => {
      const { accuracy } = stats[section];
      if (accuracy === null) return acc;
      return { sum: acc.sum + accuracy * PAPER1_SHARE[section], weight: acc.weight + PAPER1_SHARE[section] };
    }, { sum: 0, weight: 0 });
    paper1 = weighted.weight ? (weighted.sum / weighted.weight) * 100 : null;
    basis = "practice";
  }
  let percent;
  if (paper1 !== null && p2 !== null) percent = PAPER_WEIGHTS[1] * paper1 + PAPER_WEIGHTS[2] * p2;
  else percent = paper1 ?? p2;
  percent = Math.round(percent);
  const grade = gradeFor(percent);
  const index = GRADE_BOUNDARIES.findIndex(([name]) => name === grade);
  const next = index > 0 ? GRADE_BOUNDARIES[index - 1] : index === -1 ? GRADE_BOUNDARIES.at(-1) : null;
  const attemptCount = (study.attempts || []).length;
  const confidence = basis === "practice" || attemptCount < 2 ? "low" : attemptCount < 4 ? "medium" : "high";
  return {
    percent, grade, basis, confidence,
    paper1: paper1 === null ? null : Math.round(paper1),
    paper2: p2 === null ? null : Math.round(p2),
    next: next ? { grade: next[0], needed: Math.max(0, next[1] - percent) } : null,
  };
}

// The sections that would lift the predicted grade most: weak accuracy in heavily examined sections.
export function topGains(rawStudy, count = 3) {
  const stats = sectionStats(rawStudy);
  return SECTIONS.map((section) => {
    const { accuracy, answered } = stats[section];
    const known = accuracy ?? 0.5;
    return { section, title: SECTION_TITLES[section], accuracy, answered: Math.round(answered), share: PAPER1_SHARE[section], priority: PAPER1_SHARE[section] * (1 - known) * (answered ? 1 : 0.8) };
  }).sort((a, b) => b.priority - a.priority || a.section.localeCompare(b.section)).slice(0, count);
}

// ----- Spaced review (1, 3, 7 and 14 days) -----

export function reviewState(study, mistake) {
  const saved = withExtras(study).reviews[mistake.questionId];
  return saved || { stage: 0, due: addDays(dayKey(mistake.date || Date.now()), REVIEW_STEPS[0]) };
}

export function scheduleReview(state, correct, today = dayKey()) {
  if (!correct) return { stage: 0, due: addDays(today, REVIEW_STEPS[0]), last: today };
  const stage = Math.min(MASTERED_STAGE, (state?.stage || 0) + 1);
  return { stage, due: stage >= MASTERED_STAGE ? null : addDays(today, REVIEW_STEPS[stage]), last: today };
}

export function reviewQueue(rawStudy, today = dayKey()) {
  const study = withExtras(rawStudy);
  const stats = sectionStats(study);
  return (study.mistakes || [])
    .map((mistake) => ({ mistake, state: reviewState(study, mistake) }))
    .filter(({ state }) => state.stage < MASTERED_STAGE && state.due && state.due <= today)
    .sort((a, b) => a.state.due.localeCompare(b.state.due) || (stats[a.mistake.section]?.accuracy ?? 0.5) - (stats[b.mistake.section]?.accuracy ?? 0.5));
}

export function reviewSummary(rawStudy, today = dayKey()) {
  const study = withExtras(rawStudy);
  const states = (study.mistakes || []).map((mistake) => reviewState(study, mistake));
  return {
    total: states.length,
    due: states.filter((state) => state.stage < MASTERED_STAGE && state.due && state.due <= today).length,
    mastered: states.filter((state) => state.stage >= MASTERED_STAGE).length,
  };
}

// Today's 15-minute session: due reviews first, then fresh practice from the weakest sections.
export function dailyPlan(rawStudy, practicePool = [], today = dayKey(), size = 8) {
  const study = withExtras(rawStudy);
  const plan = reviewQueue(study, today).slice(0, size).map(({ mistake }) => ({
    kind: mistake.questionId.includes(":") ? "recall" : "review",
    questionId: mistake.questionId, section: mistake.section, mistake,
  }));
  if (plan.length >= size || !practicePool.length) return plan;
  const recentCorrect = new Set(study.practiceLog.filter((item) => item.correct).map((item) => item.id));
  const inPlan = new Set(plan.map((item) => item.questionId));
  const weak = topGains(study, SECTIONS.length).map((item) => item.section);
  for (const section of weak) {
    for (const question of practicePool.filter((item) => item.section === section)) {
      if (plan.length >= size) return plan;
      if (recentCorrect.has(question.id) || inPlan.has(question.id)) continue;
      plan.push({ kind: "practice", questionId: question.id, section });
      inPlan.add(question.id);
      break;
    }
  }
  return plan;
}

// ----- XP, levels, streaks, badges -----

export function xpFor(rawStudy) {
  const study = withExtras(rawStudy);
  const sum = (list, right, wrong) => list.reduce((total, item) => total + (item.correct ? right : wrong), 0);
  return (study.completedLessons || []).length * 50
    + sum(study.practiceLog, 10, 3)
    + sum(study.reviewLog, 15, 5)
    + sum(study.labLog, 20, 5)
    + (study.attempts || []).reduce((total, attempt) => total + 100 + Math.round(attempt.percent || 0), 0);
}

export function levelFor(xp) {
  let level = 1;
  for (let index = 0; index < LEVELS.length; index += 1) if (xp >= LEVELS[index]) level = index + 1;
  const floor = LEVELS[level - 1];
  const ceiling = LEVELS[level] ?? floor + 1500;
  return { level, rank: RANKS[Math.min(level, RANKS.length) - 1], xp, floor, ceiling, progress: Math.min(1, (xp - floor) / (ceiling - floor)) };
}

export function activeDays(rawStudy) {
  const study = withExtras(rawStudy);
  const days = new Set();
  const addDate = (value) => { if (value) days.add(dayKey(value)); };
  study.practiceLog.forEach((item) => addDate(item.date));
  study.reviewLog.forEach((item) => addDate(item.date));
  study.labLog.forEach((item) => addDate(item.date));
  (study.attempts || []).forEach((item) => addDate(item.date));
  Object.values(study.lessonDates).forEach(addDate);
  return days;
}

export function streakFor(rawStudy, today = dayKey()) {
  const study = withExtras(rawStudy);
  const days = activeDays(study);
  const covered = new Set([...days, ...study.freezes.usedDays]);
  let cursor = covered.has(today) ? today : addDays(today, -1);
  let current = 0;
  while (covered.has(cursor)) { current += 1; cursor = addDays(cursor, -1); }
  const sorted = [...covered].sort();
  let best = 0;
  let run = 0;
  sorted.forEach((day, index) => { run = index && daysBetween(sorted[index - 1], day) === 1 ? run + 1 : 1; best = Math.max(best, run); });
  return { current, best, studiedToday: days.has(today), freezes: study.freezes.available };
}

// Spend streak protectors on missed days, and earn one for every 7 days in a row (at most two saved).
export function updateFreezes(rawStudy, today = dayKey()) {
  const study = withExtras(rawStudy);
  const freezes = { ...study.freezes, usedDays: [...study.freezes.usedDays], earnedOn: [...study.freezes.earnedOn] };
  const covered = new Set([...activeDays(study), ...freezes.usedDays]);
  const before = [...covered].filter((day) => day < today).sort();
  const last = before.at(-1);
  if (last) {
    const gap = daysBetween(last, today) - 1;
    if (gap > 0 && gap <= freezes.available) {
      for (let offset = 1; offset <= gap; offset += 1) freezes.usedDays.push(addDays(last, offset));
      freezes.available -= gap;
    }
  }
  const { current, studiedToday } = streakFor({ ...study, freezes }, today);
  if (studiedToday && current > 0 && current % 7 === 0 && !freezes.earnedOn.includes(today)) {
    freezes.earnedOn.push(today);
    freezes.available = Math.min(MAX_FREEZES, freezes.available + 1);
  }
  const changed = JSON.stringify(freezes) !== JSON.stringify(study.freezes);
  return changed ? freezes : null;
}

function topicLevels(mastery, topicId) {
  return TOPICS.find((topic) => topic.id === topicId).sections.map((section) => mastery[section].level);
}

export function badgesFor(rawStudy, today = dayKey()) {
  const study = withExtras(rawStudy);
  const mastery = sectionMastery(study);
  const strongTopic = (id) => topicLevels(mastery, id).every((level) => level === "good" || level === "mastered");
  const lab = (tool) => study.labLog.filter((item) => item.tool === tool && item.correct).length;
  const masteredReviews = reviewSummary(study, today).mastered;
  const streak = streakFor(study, today);
  const attempts = study.attempts || [];
  return [
    { id: "first-step", name: "First Step", hint: "Complete your first lesson", earned: (study.completedLessons || []).length > 0 },
    { id: "ledger-legend", name: "Ledger Legend", hint: "Get 10 double-entry builds right in the Practice Lab", earned: lab("double-entry") >= 10 },
    { id: "balance-keeper", name: "Balance Keeper", hint: "Reach 'good' in every Topic 3 section", earned: strongTopic("3") },
    { id: "adjustment-ace", name: "Adjustment Ace", hint: "Reach 'good' in every Topic 4 section", earned: strongTopic("4") },
    { id: "statement-pro", name: "Statement Pro", hint: "Reach 'good' in every Topic 5 section", earned: strongTopic("5") },
    { id: "ratio-master", name: "Ratio Master", hint: "Reach 'good' in every Topic 6 section", earned: strongTopic("6") },
    { id: "principle-keeper", name: "Principle Keeper", hint: "Reach 'good' in every Topic 7 section", earned: strongTopic("7") },
    { id: "mock-warrior", name: "Mock Warrior", hint: "Finish 3 mock exams", earned: attempts.length >= 3 },
    { id: "a-star-mindset", name: "A* Mindset", hint: "Score 80% or more in a mock", earned: attempts.some((attempt) => attempt.percent >= 80) },
    { id: "comeback-kid", name: "Comeback Kid", hint: "Master 10 old mistakes through spaced review", earned: masteredReviews >= 10 },
    { id: "week-warrior", name: "Week Warrior", hint: "Study 7 days in a row", earned: streak.best >= 7 },
    { id: "error-hunter", name: "Error Hunter", hint: "Solve 5 Find-the-error puzzles", earned: lab("find-error") >= 5 },
    { id: "command-commander", name: "Command Commander", hint: "Get 10 command-word drills right", earned: lab("command") >= 10 },
    { id: "syllabus-sweep", name: "Syllabus Sweep", hint: "Start all 28 syllabus sections", earned: SECTIONS.every((section) => mastery[section].level !== "new") },
  ];
}

// ----- Weekly challenge -----

const CHALLENGES = [
  { name: "Foundation week", goals: { lessons: 5, reviews: 15, mocks: 1 } },
  { name: "Practice week", goals: { lessons: 4, practice: 30, lab: 10 } },
  { name: "Exam week", goals: { reviews: 20, mocks: 1, lab: 8 } },
  { name: "Momentum week", goals: { lessons: 6, practice: 25, reviews: 10 } },
];

export const CHALLENGE_LABELS = { lessons: "lessons completed", practice: "practice questions", reviews: "spaced reviews", mocks: "mock exams", lab: "Practice Lab tasks" };

export function weekStart(today = dayKey()) {
  const [y, m, d] = today.split("-").map(Number);
  const weekday = (new Date(y, m - 1, d).getDay() + 6) % 7; // Monday = 0
  return addDays(today, -weekday);
}

export function weeklyChallenge(rawStudy, today = dayKey()) {
  const study = withExtras(rawStudy);
  const start = weekStart(today);
  const index = Math.abs(Math.floor(daysBetween("2026-01-05", start) / 7)) % CHALLENGES.length;
  const challenge = CHALLENGES[index];
  const inWeek = (value) => value && dayKey(value) >= start && dayKey(value) <= addDays(start, 6);
  const progress = {
    lessons: Object.values(study.lessonDates).filter(inWeek).length,
    practice: study.practiceLog.filter((item) => inWeek(item.date)).length,
    reviews: study.reviewLog.filter((item) => inWeek(item.date)).length,
    mocks: (study.attempts || []).filter((item) => inWeek(item.date)).length,
    lab: study.labLog.filter((item) => inWeek(item.date)).length,
  };
  const goals = Object.entries(challenge.goals).map(([key, target]) => ({ key, label: CHALLENGE_LABELS[key], target, done: Math.min(target, progress[key]) }));
  return { name: challenge.name, start, end: addDays(start, 6), goals, complete: goals.every((goal) => goal.done >= goal.target) };
}

export function minutesStudied(rawStudy, days = 7, today = dayKey()) {
  const study = withExtras(rawStudy);
  let seconds = 0;
  for (let offset = 0; offset < days; offset += 1) seconds += study.time[addDays(today, -offset)] || 0;
  return Math.round(seconds / 60);
}

// Goals Dad sets that unlock a message when reached.
export function goalReached(goal, rawStudy) {
  const study = withExtras(rawStudy);
  const target = Number(goal.target);
  if (goal.kind === "level") return levelFor(xpFor(study)).level >= target;
  if (goal.kind === "streak") return streakFor(study).best >= target;
  if (goal.kind === "mock") return (study.attempts || []).some((attempt) => attempt.percent >= target);
  if (goal.kind === "topic") {
    const topic = TOPICS.find((item) => item.id === String(goal.target));
    const mastery = sectionMastery(study);
    return Boolean(topic) && topic.sections.every((section) => mastery[section].lessonsDone >= mastery[section].lessons);
  }
  return false;
}

// ----- Recording activity (pure updates to the saved study object) -----

const LOG_LIMIT = 3000;
const keep = (list, item) => [item, ...(list || [])].slice(0, LOG_LIMIT);

export function recordPractice(study, { id, section, correct }, date = new Date().toISOString()) {
  return { ...study, practiceLog: keep(study.practiceLog, { id, section, correct: Boolean(correct), date }) };
}

export function recordReview(rawStudy, mistake, correct, today = dayKey(), date = new Date().toISOString()) {
  const study = withExtras(rawStudy);
  const next = scheduleReview(reviewState(study, mistake), correct, today);
  return {
    ...study,
    reviews: { ...study.reviews, [mistake.questionId]: next },
    reviewLog: keep(study.reviewLog, { id: mistake.questionId, section: sectionsOf(mistake.section)[0] || "", correct: Boolean(correct), date }),
  };
}

export function recordLab(study, tool, correct, date = new Date().toISOString()) {
  return { ...study, labLog: keep(study.labLog, { tool, correct: Boolean(correct), date }) };
}

// A new wrong answer replaces any older copy of the same question and restarts its review schedule.
export function recordMistake(study, item, date = new Date().toISOString()) {
  const mistake = { ...item, id: `${item.id}:${Date.parse(date)}`, questionId: item.id, date };
  const reviews = { ...(study.reviews || {}) };
  delete reviews[item.id];
  return { ...study, reviews, mistakes: [mistake, ...(study.mistakes || []).filter((entry) => entry.questionId !== item.id)].slice(0, 300) };
}

export function completeLesson(study, lessonId, date = new Date().toISOString()) {
  if ((study.completedLessons || []).includes(lessonId)) return study;
  return { ...study, completedLessons: [...(study.completedLessons || []), lessonId], lessonDates: { ...(study.lessonDates || {}), [lessonId]: date } };
}

export function addStudyTime(study, seconds, today = dayKey()) {
  const time = study.time || {};
  return { ...study, time: { ...time, [today]: (time[today] || 0) + seconds } };
}

// Dad's assignments count as done once the matching work appears after the assignment date.
export function assignmentDone(assignment, rawStudy) {
  const study = withExtras(rawStudy);
  const since = assignment.created || assignment.date || "";
  if (assignment.kind === "lesson") return (study.completedLessons || []).includes(assignment.target);
  if (assignment.kind === "mock") return (study.attempts || []).some((attempt) => attempt.examId === assignment.target && attempt.date >= since);
  if (assignment.kind === "today") return [...study.reviewLog, ...study.practiceLog].filter((item) => item.date >= since).length >= 8;
  if (assignment.kind === "lab") return study.labLog.filter((item) => item.tool === assignment.target && item.date >= since).length >= 5;
  return false;
}
