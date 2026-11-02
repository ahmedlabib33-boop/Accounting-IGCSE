import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import { units as baseUnits, groups, extraPractice, syllabusUrl } from '../data/accounting/course.mjs';
import { extensions } from '../data/accounting/extensions.mjs';
import { structuredPapers } from '../data/accounting/structured.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const units = [...baseUnits, ...extensions].sort((a,b)=>a[0].localeCompare(b[0], 'en', {numeric:true}));
const topics = groups.map((topic_name, i) => ({ topic_id: String(i + 1), topic_name: `${i + 1}. ${topic_name}`, order: i + 1 }));
const lessons = units.map(([section, title, formula, explanation, example], i) => ({ id: `0452-${section}-${title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`, subject: 'Accounting', topicId: section.split('.')[0], section, title, formula, explanation, example, difficulty: '0452 · 2027–2029', source: syllabusUrl, tip: 'Write the account names, show workings and check debit/credit signs.' }));
function question(id, section, title, prompt, answers, explanation, index) {
  const offset = index % 4;
  const choices = answers.map((text, i) => ({ id: 'ABCD'[(i + offset) % 4], text })).sort((a,b) => a.id.localeCompare(b.id));
  return { id, subject: 'Accounting', section, topicId: section.split('.')[0], lessonTitle: title, question: prompt, choices, answer: 'ABCD'[offset], explanation, difficulty: 'Core', marks: 1 };
}
const practice = units.map((u, i) => question(`0452-practice-${i + 1}`, u[0], u[1], u[5], u[6], u[7], i));
extraPractice.forEach(([section, prompt, answers, explanation], i) => {
  const lesson = lessons.find((l) => l.section === section);
  practice.push(question(`0452-extra-${i + 1}`, section, lesson.title, prompt, answers, explanation, i + 1));
});
const exams = [];
for (let version = 1; version <= 3; version++) {
  // Every section occurs before any extra questions are selected.
  const selected = [];
  for (const section of [...new Set(units.map(u=>u[0]))]) {
    const candidates = practice.filter(q=>q.section===section);
    selected.push(candidates[(version-1)%candidates.length]);
  }
  const remainder = practice.filter(q=>!selected.includes(q));
  while (selected.length < 40) selected.push(remainder.splice(((version * 7) + selected.length) % remainder.length, 1)[0]);
  selected.forEach((q, i) => exams.push({ ...q, id: `0452-p1-${version}-${i+1}`, examId: `Paper 1 · Original mock ${version}`, paper: 1, minutes: 90, number: i + 1, sourceQuestionId: q.id }));
}
const structured = structuredPapers();
const content = { version: 2, qualification: 'Cambridge IGCSE Accounting (0452)', years: '2027–2029', syllabusUrl, provenance: 'Independent original teaching material and mock papers aligned to the official syllabus. Not endorsed by Cambridge. Paper 1 mocks sample the practice bank; Paper 2 versions use scaled data.', learning: { Accounting: { topics, lessons, practice } }, exams: { Accounting: exams }, structured };
const expected = ['1.1','1.2','2.1','2.2','2.3','3.1','3.2','3.3','3.4','4.1','4.2','4.3','4.4','4.5','5.1','5.2','5.3','5.4','5.5','5.6','6.1','6.2','6.3','6.4','6.5','7.1','7.2','7.3'];
for (const section of expected) {
  assert(lessons.some(l=>l.section===section), `Missing lesson section ${section}`);
  assert(practice.some(q=>q.section===section), `Missing practice section ${section}`);
}
const ids = new Set();
for (const q of [...practice, ...exams]) {
  assert(!ids.has(q.id), `Duplicate ID ${q.id}`); ids.add(q.id);
  assert.equal(q.choices.length,4); assert(q.choices.some(c=>c.id===q.answer));
  assert.equal(new Set(q.choices.map(c=>c.text)).size,4);
  assert(q.question && q.explanation);
}
for (const paper of structured) {
  assert.equal(paper.questions.length,5);
  assert.equal(paper.questions.reduce((s,q)=>s+q.parts.reduce((n,p)=>n+p.marks,0),0),100);
  for (const q of paper.questions) assert.equal(q.parts.reduce((s,p)=>s+p.marks,0),20);
}
const output = path.join(root,'app/_data/accounting-content.json');
const serialized = JSON.stringify(content,null,2)+'\n';
if(process.argv.includes('--check')) assert.equal(await readFile(output,'utf8'),serialized,'Content is stale; run npm run content:build');
else { await mkdir(path.dirname(output),{recursive:true}); await writeFile(output,serialized); }
const coverage = '# Accounting 0452 coverage register\n\nExam years: 2027–2029. Official scope: '+syllabusUrl+'\n\nThis register verifies section presence, not independent certification of teaching depth. Each lesson and question is original. Detailed objective and instructional review remains necessary before claiming complete exam readiness.\n\n| Section | Lessons | Practice questions |\n|---|---:|---:|\n'+expected.map(s=>`| ${s} | ${lessons.filter(l=>l.section===s).length} | ${practice.filter(q=>q.section===s).length} |`).join('\n')+'\n';
if(!process.argv.includes('--check')) await writeFile(path.join(root,'docs/SYLLABUS_COVERAGE.md'),coverage);
const esc = text => String(text).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const handbook = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Accounting 0452 revision handbook</title><style>body{font:17px/1.7 system-ui;max-width:980px;margin:40px auto;padding:0 24px;background:#101318;color:#eee}a{color:#8ab9ff}article{padding:22px 0;border-bottom:1px solid #444}blockquote{margin:16px 0;padding:14px;background:#202733}summary{cursor:pointer}nav{display:flex;flex-wrap:wrap;gap:15px}@media print{body{color:#000;background:white}details{display:none}article{break-inside:avoid}}</style><h1>Accounting 0452 · Revision handbook</h1><p>2027–2029 · Independent original teaching material aligned by syllabus section. This is not an official Cambridge publication.</p><p><a href="${syllabusUrl}">Official syllabus and ratio formulas</a> · <a href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-accounting-0452/past-papers/">Official papers and mark schemes</a></p><nav>${topics.map(t=>`<a href="#topic-${t.topic_id}">${esc(t.topic_name)}</a>`).join('')}</nav>${topics.map(t=>`<h2 id="topic-${t.topic_id}">${esc(t.topic_name)}</h2>${lessons.filter(l=>l.topicId===t.topic_id).map(l=>`<article><h3>${l.section} · ${esc(l.title)}</h3><strong>${esc(l.formula)}</strong><p>${esc(l.explanation)}</p><blockquote>${esc(l.example)}</blockquote>${practice.filter(q=>q.lessonTitle===l.title).map(q=>`<details><summary>Check: ${esc(q.question)}</summary><ol type="A">${q.choices.map(c=>`<li>${esc(c.text)}</li>`).join('')}</ol><p>Answer ${q.answer}: ${esc(q.explanation)}</p></details>`).join('')}</article>`).join('')}`).join('')}<h2>Exam response checklist</h2><p>For calculations, show a formula, substituted figures, result and unit. For accounts, use dates, names, debit/credit sides and balances. For analysis, connect a numerical change with a possible cause. For evaluation, weigh an action and its limitation before recommending it. An official grade cannot be inferred from a fixed practice percentage: thresholds vary by examination session.</p></html>`;
if(!process.argv.includes('--check')) await writeFile(path.join(root,'public/accounting-revision.html'),handbook);
console.log(`Accounting content validated: ${topics.length} topics; ${expected.length} sections; ${lessons.length} lessons; ${practice.length} practice questions; 3 × 40-question Paper 1 mocks; ${structured.length} Paper 2 mocks. Section presence is checked; pedagogical completeness requires review.`);
