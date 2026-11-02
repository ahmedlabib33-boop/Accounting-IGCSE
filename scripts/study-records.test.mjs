import test from 'node:test';
import assert from 'node:assert/strict';
import {assignmentDone, completeLesson, recordMistake, recordPractice, recordReview, reviewState, sectionStats, addStudyTime, minutesStudied} from '../app/_lib/study-engine.mjs';

const base={completedLessons:[],attempts:[],mistakes:[],reviewedIds:[]};

test('A new mistake restarts its review schedule and replaces the older copy',()=>{
  let s=recordMistake(base,{id:'q1',section:'2.1',question:'x'},'2026-11-01T10:00:00.000Z');
  s=recordReview(s,s.mistakes[0],true,'2026-11-02');
  assert.equal(s.reviews.q1.stage,1);assert.equal(s.reviews.q1.due,'2026-11-05');
  s=recordMistake(s,{id:'q1',section:'2.1',question:'x'},'2026-11-03T10:00:00.000Z');
  assert.equal(s.mistakes.length,1);assert.equal(s.reviews.q1,undefined);
  assert.equal(reviewState(s,s.mistakes[0]).due,'2026-11-04');
});

test('Practice, reviews and Paper 2 parts all feed section accuracy',()=>{
  let s=recordPractice(base,{id:'p',section:'3.3',correct:true});
  s=recordPractice(s,{id:'p2',section:'3.3',correct:false});
  s={...s,attempts:[{paper:2,percent:50,parts:[{section:'2.1 / 3.3',marks:4,max:8}]}]};
  const st=sectionStats(s);
  assert(st['3.3'].answered>2);assert(st['2.1'].answered>0);assert(st['3.3'].accuracy>0&&st['3.3'].accuracy<1);
});

test('Lessons record their completion date once',()=>{
  let s=completeLesson(base,'0452-1.1-a','2026-11-01T00:00:00.000Z');
  s=completeLesson(s,'0452-1.1-a','2026-11-09T00:00:00.000Z');
  assert.deepEqual(s.completedLessons,['0452-1.1-a']);assert.equal(s.lessonDates['0452-1.1-a'],'2026-11-01T00:00:00.000Z');
});

test('Assignments count as done only after they were set',()=>{
  const s={...base,attempts:[{examId:'Paper 1 · Original mock 1',date:'2026-11-01T00:00:00.000Z'}]};
  assert.equal(assignmentDone({kind:'mock',target:'Paper 1 · Original mock 1',created:'2026-11-02T00:00:00.000Z'},s),false);
  assert.equal(assignmentDone({kind:'mock',target:'Paper 1 · Original mock 1',created:'2026-10-30T00:00:00.000Z'},s),true);
  assert.equal(assignmentDone({kind:'lesson',target:'x',created:'2026-10-30T00:00:00.000Z'},{...base,completedLessons:['x']}),true);
});

test('Study time adds up per day',()=>{
  let s=addStudyTime(base,600,'2026-11-02');s=addStudyTime(s,300,'2026-11-02');s=addStudyTime(s,120,'2026-10-20');
  assert.equal(minutesStudied(s,7,'2026-11-02'),15);
});
