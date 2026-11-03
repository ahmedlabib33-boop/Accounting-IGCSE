import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import { units as baseUnits, groups, extraPractice, syllabusUrl } from '../data/accounting/course.mjs';
import { extensions } from '../data/accounting/extensions.mjs';
import { structuredPapers } from '../data/accounting/structured.mjs';
import { formulaSheet } from '../data/accounting/revision.mjs';
import { edexcelMap } from '../data/accounting/edexcel.mjs';
import { PAPER1_SHARE, SECTION_TITLES } from '../app/_lib/study-engine.mjs';
import { loadDeepTopics, validateDeep } from './validate-deep.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
const units = [...baseUnits, ...extensions].sort((a, b) => a[0].localeCompare(b[0], 'en', { numeric: true }));
const topics = groups.map((topic_name, i) => ({ topic_id: String(i + 1), topic_name: `${i + 1}. ${topic_name}`, order: i + 1 }));
const lessons = units.map(([section, title, formula, explanation, example]) => ({ id: `0452-${section}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, subject: 'Accounting', topicId: section.split('.')[0], section, title, formula, explanation, example, difficulty: '0452 · 2027–2029', source: syllabusUrl, tip: 'Write the account names, show workings and check debit/credit signs.' }));

function question(id, section, title, prompt, answers, explanation, index) {
  const offset = index % 4;
  const choices = answers.map((text, i) => ({ id: 'ABCD'[(i + offset) % 4], text })).sort((a, b) => a.id.localeCompare(b.id));
  return { id, subject: 'Accounting', section, topicId: section.split('.')[0], lessonTitle: title, question: prompt, choices, answer: 'ABCD'[offset], explanation, difficulty: 'Core', marks: 1 };
}
const practice = units.map((u, i) => question(`0452-practice-${i + 1}`, u[0], u[1], u[5], u[6], u[7], i));
extraPractice.forEach(([section, prompt, answers, explanation], i) => {
  const lesson = lessons.find((l) => l.section === section);
  practice.push(question(`0452-extra-${i + 1}`, section, lesson.title, prompt, answers, explanation, i + 1));
});

// ----- Deep content: textbook-depth guides, exercises and the question bank (data/accounting/deep) -----
const deepTopics = await loadDeepTopics();
const deepErrors = validateDeep(deepTopics);
assert.equal(deepErrors.length, 0, `Deep content problems:\n - ${deepErrors.slice(0, 20).join('\n - ')}`);
if (process.env.ALLOW_PARTIAL_DEEP !== '1') assert.equal(deepTopics.length, 7, 'All seven deep topic files are required (set ALLOW_PARTIAL_DEEP=1 while authoring).');
const guides = {};
for (const { topic } of deepTopics) for (const s of topic.sections) guides[s.section] = { ...s, topicId: String(topic.id), topicName: topic.name };
const guideList = Object.values(guides).sort((a, b) => a.section.localeCompare(b.section, 'en', { numeric: true }));

// Bank multiple-choice questions join the practice pool under a section label, so the Learning page's
// per-lesson practice is unchanged while the section quiz, the extra mocks and the grader can use them.
const bankMcq = [];
for (const g of guideList) g.mcq.forEach((q, i) => { const built = { ...question(q.id, g.section, `Section ${g.section} quiz`, q.question, q.choices, q.explanation, i), bank: true }; practice.push(built); bankMcq.push(built); });

const exams = [];
for (let version = 1; version <= 3; version++) {
  // Every section occurs before any extra questions are selected.
  const selected = [];
  const core = practice.filter((q) => !q.bank);
  for (const section of [...new Set(units.map((u) => u[0]))]) {
    const candidates = core.filter((q) => q.section === section);
    selected.push(candidates[(version - 1) % candidates.length]);
  }
  const remainder = core.filter((q) => !selected.includes(q));
  while (selected.length < 40) selected.push(remainder.splice(((version * 7) + selected.length) % remainder.length, 1)[0]);
  selected.forEach((q, i) => exams.push({ ...q, id: `0452-p1-${version}-${i + 1}`, examId: `Paper 1 · Original mock ${version}`, paper: 1, minutes: 90, number: i + 1, sourceQuestionId: q.id }));
}
// Mocks 4 to 8 come from the bank, weighted by the real paper's section shares (which total 40).
const bankMockCount = deepTopics.length === 7 ? 5 : 0;
for (let version = 4; version < 4 + bankMockCount; version++) {
  const selected = [];
  for (const [section, share] of Object.entries(PAPER1_SHARE)) {
    const pool = bankMcq.filter((q) => q.section === section);
    for (let k = 0; k < share; k++) selected.push(pool[((version - 4) * share + k) % pool.length]);
  }
  assert.equal(selected.length, 40);
  selected.forEach((q, i) => exams.push({ ...q, id: `0452-p1-${version}-${i + 1}`, examId: `Paper 1 · Original mock ${version}`, paper: 1, minutes: 90, number: i + 1, sourceQuestionId: q.id }));
}

const structured = structuredPapers();
// One topic-practice paper per topic, made of the bank's structured questions: 21 minutes and 20 marks each.
for (const { topic } of deepTopics) {
  const questions = topic.sections.flatMap((s) => s.structured.map((q) => ({ ...q, section: s.section })));
  questions.forEach((q, i) => { q.number = i + 1; });
  structured.push({ id: `Paper 2 · Topic practice ${topic.id}: ${topic.name}`, paper: 2, minutes: 21 * questions.length, marks: 20 * questions.length, marking: 'Self-assessed or AI-marked against the indicative mark scheme; not official grading', topicId: String(topic.id), questions });
}

const revision = {
  summaries: guideList.map((g) => ({ section: g.section, title: g.title, topicId: g.topicId, summary: g.summary, objectives: g.objectives })),
  glossary: guideList.flatMap((g) => g.keyTerms.map((k) => ({ ...k, section: g.section }))).sort((a, b) => a.term.localeCompare(b.term, 'en')),
  formulas: formulaSheet,
  edexcel: edexcelMap,
};

const content = {
  version: 3, qualification: 'Cambridge IGCSE Accounting (0452)', years: '2027–2029', syllabusUrl,
  provenance: 'Independent original teaching material, study guides, exercises and mock papers aligned to the official syllabus. Not endorsed by Cambridge or Pearson. Paper 1 mocks sample the practice bank; Paper 2 versions use scaled data.',
  learning: { Accounting: { topics, lessons, practice } }, exams: { Accounting: exams }, structured, guides, revision,
};

const expected = ['1.1', '1.2', '2.1', '2.2', '2.3', '3.1', '3.2', '3.3', '3.4', '4.1', '4.2', '4.3', '4.4', '4.5', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '6.1', '6.2', '6.3', '6.4', '6.5', '7.1', '7.2', '7.3'];
for (const section of expected) {
  assert(lessons.some((l) => l.section === section), `Missing lesson section ${section}`);
  assert(practice.some((q) => q.section === section), `Missing practice section ${section}`);
  assert.equal(SECTION_TITLES[section] !== undefined, true);
}
const ids = new Set();
for (const q of [...practice, ...exams]) {
  assert(!ids.has(q.id), `Duplicate ID ${q.id}`); ids.add(q.id);
  assert.equal(q.choices.length, 4); assert(q.choices.some((c) => c.id === q.answer));
  assert.equal(new Set(q.choices.map((c) => c.text)).size, 4);
  assert(q.question && q.explanation);
}
for (const paper of structured) {
  const perQuestion = paper.questions.map((q) => q.parts.reduce((s, p) => s + p.marks, 0));
  assert(perQuestion.every((m) => m === 20), `${paper.id}: every question is 20 marks`);
  if (paper.id.includes('Original mock')) { assert.equal(paper.questions.length, 5); assert.equal(paper.minutes, 105); }
  else { assert.equal(paper.marks, 20 * paper.questions.length); assert.equal(paper.minutes, 21 * paper.questions.length); }
}

const output = path.join(root, 'app/_data/accounting-content.json');
const serialized = JSON.stringify(content, null, 2) + '\n';
if (check) assert.equal(await readFile(output, 'utf8'), serialized, 'Content is stale; run npm run content:build');
else { await mkdir(path.dirname(output), { recursive: true }); await writeFile(output, serialized); }

const coverage = '# Accounting 0452 coverage register\n\nExam years: 2027–2029. Official scope: ' + syllabusUrl + '\n\nEvery syllabus section has a short lesson, a textbook-depth study guide (notes, worked examples, key terms, common errors, exam tips), workbook-style exercises with mark schemes, a Paper 1 question bank and Paper 2 structured questions. All material is original. Depth against each learning objective still deserves a teacher\'s review before claiming complete exam readiness.\n\n| Section | Lessons | Guide notes | Worked examples | Exercises | Paper 1 bank | Paper 2 bank | Practice questions |\n|---|---:|---:|---:|---:|---:|---:|---:|\n'
  + expected.map((s) => { const g = guides[s]; return `| ${s} | ${lessons.filter((l) => l.section === s).length} | ${g?.notes.length ?? 0} | ${g?.workedExamples.length ?? 0} | ${g?.exercises.length ?? 0} | ${g?.mcq.length ?? 0} | ${g?.structured.length ?? 0} | ${practice.filter((q) => q.section === s).length} |`; }).join('\n') + '\n'
  + `\nTotals: ${lessons.length} lessons · ${guideList.length} study guides · ${guideList.reduce((n, g) => n + g.exercises.length, 0)} exercises · ${bankMcq.length} bank multiple-choice questions · ${guideList.reduce((n, g) => n + g.structured.length, 0)} bank structured questions · ${new Set(exams.map((q) => q.examId)).size} Paper 1 mocks · ${structured.length} Paper 2 papers · ${revision.glossary.length} glossary terms.\n`;
if (!check) await writeFile(path.join(root, 'docs/SYLLABUS_COVERAGE.md'), coverage);

const esc = (text) => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const handbook = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Accounting 0452 revision handbook</title><style>body{font:17px/1.7 system-ui;max-width:980px;margin:40px auto;padding:0 24px;background:#101318;color:#eee}a{color:#8ab9ff}article{padding:22px 0;border-bottom:1px solid #444}blockquote{margin:16px 0;padding:14px;background:#202733}summary{cursor:pointer}nav{display:flex;flex-wrap:wrap;gap:15px}table{border-collapse:collapse;margin:12px 0}td,th{border:1px solid #444;padding:6px 10px;text-align:left}@media print{body{color:#000;background:white}details{display:none}article{break-inside:avoid}}</style><h1>Accounting 0452 · Revision handbook</h1><p>2027–2029 · Independent original teaching material aligned by syllabus section. This is not an official Cambridge publication.</p><p><a href="${syllabusUrl}">Official syllabus and ratio formulas</a> · <a href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-accounting-0452/past-papers/">Official papers and mark schemes</a></p><nav>${topics.map((t) => `<a href="#topic-${t.topic_id}">${esc(t.topic_name)}</a>`).join('')}</nav>${topics.map((t) => `<h2 id="topic-${t.topic_id}">${esc(t.topic_name)}</h2>${lessons.filter((l) => l.topicId === t.topic_id).map((l) => `<article><h3>${l.section} · ${esc(l.title)}</h3><strong>${esc(l.formula)}</strong><p>${esc(l.explanation)}</p><blockquote>${esc(l.example)}</blockquote>${practice.filter((q) => q.lessonTitle === l.title).map((q) => `<details><summary>Check: ${esc(q.question)}</summary><ol type="A">${q.choices.map((c) => `<li>${esc(c.text)}</li>`).join('')}</ol><p>Answer ${q.answer}: ${esc(q.explanation)}</p></details>`).join('')}</article>`).join('')}${guideList.filter((g) => g.topicId === t.topic_id).map((g) => `<article><h3>${g.section} · Study guide: ${esc(g.title)}</h3><p>${esc(g.summary)}</p>${g.notes.map((n) => `<h4>${esc(n.heading)}</h4>${n.body.split(/\n\n+/).map((p) => `<p>${esc(p)}</p>`).join('')}${n.table ? `<table><tr>${n.table.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr>${n.table.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</table>` : ''}`).join('')}</article>`).join('')}`).join('')}<h2>Formula sheet</h2>${formulaSheet.map((group) => `<h3>${esc(group.group)}</h3><table><tr><th>Measure</th><th>Formula</th><th>Note</th></tr>${group.items.map((f) => `<tr><td>${esc(f.name)}</td><td>${esc(f.formula)}</td><td>${esc(f.note)}</td></tr>`).join('')}</table>`).join('')}<h2>Exam response checklist</h2><p>For calculations, show a formula, substituted figures, result and unit. For accounts, use dates, names, debit/credit sides and balances. For analysis, connect a numerical change with a possible cause. For evaluation, weigh an action and its limitation before recommending it. An official grade cannot be inferred from a fixed practice percentage: thresholds vary by examination session.</p></html>`;
if (!check) await writeFile(path.join(root, 'public/accounting-revision.html'), handbook);
console.log(`Accounting content validated: ${topics.length} topics; ${expected.length} sections; ${lessons.length} lessons; ${guideList.length} study guides; ${practice.length} practice questions (${bankMcq.length} from the bank); ${new Set(exams.map((q) => q.examId)).size} Paper 1 mocks; ${structured.length} Paper 2 papers; ${revision.glossary.length} glossary terms.`);
