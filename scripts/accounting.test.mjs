import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {gradeMultipleChoice} from '../app/_lib/grading.mjs';
const content=JSON.parse(await readFile(new URL('../app/_data/accounting-content.json',import.meta.url)));
test('Every syllabus section has teaching, an example, practice and coverage in every Paper 1',()=>{
  const expected=['1.1','1.2','2.1','2.2','2.3','3.1','3.2','3.3','3.4','4.1','4.2','4.3','4.4','4.5','5.1','5.2','5.3','5.4','5.5','5.6','6.1','6.2','6.3','6.4','6.5','7.1','7.2','7.3'];
  for(const section of expected){
    const lessons=content.learning.Accounting.lessons.filter(l=>l.section===section);
    assert(lessons.length>0,section);assert(lessons.every(l=>l.example&&l.explanation));
    assert(content.learning.Accounting.practice.some(q=>q.section===section));
    for(const examId of new Set(content.exams.Accounting.map(q=>q.examId)))assert(content.exams.Accounting.some(q=>q.examId===examId&&q.section===section));
  }
});
test('All lessons have their own practice, and every answer points to a real choice',()=>{
  const {lessons,practice}=content.learning.Accounting;
  for(const l of lessons)assert(practice.some(q=>q.lessonTitle===l.title),l.title);
  for(const q of [...practice,...content.exams.Accounting])assert(q.choices.some(c=>c.id===q.answer));
});
test('Grading normalises input, counts blanks wrong and refuses duplicate or unknown questions',()=>{
  const bank=content.learning.Accounting.practice;
  const q=bank[0];const results=gradeMultipleChoice([{id:q.id,answer:` ${q.answer.toLowerCase()} `},{id:q.id,answer:q.answer},{id:'missing',answer:'A'},{id:bank[1].id,answer:''}],bank);
  assert.equal(results[0].correct,true);assert(results[1].error);assert(results[2].error);assert.equal(results[3].correct,false);assert.equal(results[3].selected,'');
});
test('Paper formats have the specified question counts and mark totals',()=>{
  for(const id of new Set(content.exams.Accounting.map(q=>q.examId))){const qs=content.exams.Accounting.filter(q=>q.examId===id);assert.equal(qs.length,40);assert(qs.every(q=>q.minutes===90));assert.equal(new Set(qs.map(q=>q.sourceQuestionId)).size,40);}
  for(const p of content.structured){assert.equal(p.minutes,105);assert.equal(p.questions.length,5);for(const q of p.questions){assert.equal(q.parts.reduce((s,p)=>s+p.marks,0),20);assert(q.parts.every(p=>p.points.length===p.marks&&p.model));}}
});
test('Key worked numerical answers match independent arithmetic',()=>{
  const find=(title)=>content.learning.Accounting.practice.find(q=>q.lessonTitle===title);
  const chosen=q=>q.choices.find(c=>c.id===q.answer).text;
  assert.equal(chosen(find('Cash book and discounts')),`$${1000*.9*.98}`);
  assert.equal(chosen(find('Depreciation methods')),`$${((10000-1000)/3).toLocaleString('en-US')}`);
  assert.equal(chosen(find('Inventory item-by-item comparison')),`$${Math.min(100,80)+Math.min(100,130)}`);
  assert.equal(chosen(find('Working-capital decisions')),`$${(25000-18000).toLocaleString('en-US')}`);
});
