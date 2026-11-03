import { gradeMultipleChoice } from "./grading.mjs";
import "server-only";
import content from "../_data/accounting-content.json";

const SUBJECTS = new Set(["Accounting"]);

export function normalizeSubject(value) {
  return SUBJECTS.has(value) ? value : null;
}

export function publicQuestion(question) {
  const { answer, explanation, ...safeQuestion } = question;
  return safeQuestion;
}

export function getLearning(subject) {
  const selected = normalizeSubject(subject);
  if (!selected) return null;
  const data = content.learning[selected];
  return { subject: selected, topics: data.topics, lessons: data.lessons, practice: data.practice.map(publicQuestion) };
}

export function getExamSummaries(subject) {
  const selected = normalizeSubject(subject);
  if (!selected) return null;
  const byExam = new Map();
  for (const item of content.exams[selected]) {
    const existing = byExam.get(item.examId) || { id: item.examId, subject: selected, questions: 0, sections: new Set() };
    existing.questions += 1;
    if (item.section) existing.sections.add(item.section);
    byExam.set(item.examId, existing);
  }
  return [...byExam.values()].map((exam) => ({ ...exam, sections: [...exam.sections] }));
}

export function getExam(subject, examId) {
  const selected = normalizeSubject(subject);
  if (!selected || !examId) return null;
  const questions = content.exams[selected].filter((item) => item.examId === examId);
  return questions.length ? questions.map(publicQuestion) : null;
}

export function gradeItems(items) {
  return gradeMultipleChoice(items, [...content.learning.Accounting.practice, ...content.exams.Accounting]);
}

export function contentSummary() {
  const guides = Object.values(content.guides || {});
  return {
    Accounting: {
      lessons: content.learning.Accounting.lessons.length, practice: content.learning.Accounting.practice.length,
      exams: getExamSummaries("Accounting").length, structuredExams: content.structured.length,
      guides: guides.length, exercises: guides.reduce((n, g) => n + g.exercises.length, 0),
    },
  };
}

export function getStructuredPapers(){return content.structured.map(({questions,...paper})=>({...paper,questions:questions.length}));}

export function getStructuredPaper(id, reveal=false){
  const paper=content.structured.find(p=>p.id===id);
  if(!paper)return null;
  return {...paper,questions:paper.questions.map(q=>({...q,parts:q.parts.map(p=>reveal?p:{label:p.label,marks:p.marks,prompt:p.prompt})}))};
}

export function getQuestionsByIds(ids) {
  const wanted = new Set(ids);
  const bank = [...content.learning.Accounting.practice, ...content.exams.Accounting];
  const seen = new Set();
  return bank.filter((item) => wanted.has(item.id) && !seen.has(item.id) && seen.add(item.id)).map(publicQuestion);
}

export function getStructuredPart(examId, questionId, label) {
  const paper = content.structured.find((item) => item.id === examId);
  const question = paper?.questions.find((item) => item.id === questionId);
  const part = question?.parts.find((item) => item.label === label);
  return part ? { question, part } : null;
}

// ----- Study guides (textbook-depth material per syllabus section) -----

// The guide for one section, with exercise model answers held back until the student asks for them.
export function getGuide(section) {
  const guide = content.guides?.[section];
  if (!guide) return null;
  const { mcq, exercises, ...rest } = guide;
  return { ...rest, exercises: exercises.map(({ model, points, ...exercise }) => exercise), quizCount: mcq.length };
}

export function getGuideSections() {
  return Object.values(content.guides || {}).map((g) => ({ section: g.section, title: g.title, topicId: g.topicId, exercises: g.exercises.length, quiz: g.mcq.length })).sort((a, b) => a.section.localeCompare(b.section, "en", { numeric: true }));
}

export function getExercise(id) {
  for (const guide of Object.values(content.guides || {})) {
    const exercise = guide.exercises.find((item) => item.id === id);
    if (exercise) return { section: guide.section, title: guide.title, exercise };
  }
  return null;
}

// Bank multiple-choice questions for one or more sections, shuffled, answers withheld.
export function getQuiz(sections, count = 10) {
  const wanted = new Set(sections);
  const pool = content.learning.Accounting.practice.filter((q) => q.bank && wanted.has(q.section));
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  return pool.slice(0, Math.max(1, Math.min(40, count))).map(publicQuestion);
}

export function getRevision() {
  return content.revision || { summaries: [], glossary: [], formulas: [], edexcel: null };
}
