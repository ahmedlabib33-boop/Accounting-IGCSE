import test from 'node:test';
import assert from 'node:assert/strict';
import {addDays, dailyPlan, gradeFor, levelFor, predictGrade, reviewQueue, scheduleReview, sectionMastery, streakFor, topGains, updateFreezes, weeklyChallenge, xpFor, goalReached, PAPER1_SHARE, LESSONS_PER_SECTION, SECTIONS} from '../app/_lib/study-engine.mjs';
import {readFile} from 'node:fs/promises';

const content=JSON.parse(await readFile(new URL('../app/_data/accounting-content.json',import.meta.url)));
const base={completedLessons:[],attempts:[],mistakes:[],reviewedIds:[]};

test('Section tables match the content bank',()=>{
  const {lessons}=content.learning.Accounting;
  for(const section of SECTIONS)assert.equal(lessons.filter(l=>l.section===section).length,LESSONS_PER_SECTION[section],section);
  const mock=content.exams.Accounting.filter(q=>q.examId==='Paper 1 · Original mock 1');
  for(const section of SECTIONS)assert.equal(mock.filter(q=>q.section===section).length,PAPER1_SHARE[section],section);
});

test('Spaced review follows 1, 3, 7 and 14 days and resets on a wrong answer',()=>{
  let state={stage:0,due:'2027-01-02'};
  state=scheduleReview(state,true,'2027-01-02');assert.deepEqual([state.stage,state.due],[1,'2027-01-05']);
  state=scheduleReview(state,true,'2027-01-05');assert.deepEqual([state.stage,state.due],[2,'2027-01-12']);
  state=scheduleReview(state,true,'2027-01-12');assert.deepEqual([state.stage,state.due],[3,'2027-01-26']);
  state=scheduleReview(state,true,'2027-01-26');assert.deepEqual([state.stage,state.due],[4,null]);
  assert.deepEqual(scheduleReview({stage:3},false,'2027-02-01'),{stage:0,due:'2027-02-02',last:'2027-02-01'});
});

test('A new mistake is due the next day and the plan fills up with weak-section practice',()=>{
  const study={...base,mistakes:[{questionId:'0452-practice-5',section:'2.1',date:'2027-01-01T10:00:00'}]};
  assert.equal(reviewQueue(study,'2027-01-01').length,0);
  assert.equal(reviewQueue(study,'2027-01-02').length,1);
  const plan=dailyPlan(study,content.learning.Accounting.practice,'2027-01-02',8);
  assert.equal(plan.length,8);assert.equal(plan[0].kind,'review');
  assert.equal(new Set(plan.map(p=>p.questionId)).size,8);
});

test('Predicted grade weights Paper 1 at 30% and Paper 2 at 70%',()=>{
  const study={...base,attempts:[{paper:1,percent:60,date:'2027-01-01'},{paper:2,percent:80,date:'2027-01-02'}]};
  const p=predictGrade(study);assert.equal(p.percent,74);assert.equal(p.grade,'A');assert.deepEqual(p.next,{grade:'A*',needed:6});
  assert.equal(predictGrade(base),null);
  assert.equal(gradeFor(80),'A*');assert.equal(gradeFor(49),'D');assert.equal(gradeFor(5),'U');
});

test('Top gains favour heavily examined weak sections',()=>{
  const log=SECTIONS.flatMap(section=>Array.from({length:4},(_,i)=>({id:`${section}-${i}`,section,correct:section!=='5.3',date:'2027-01-01'})));
  const gains=topGains({...base,practiceLog:log});assert.equal(gains[0].section,'5.3');
});

test('XP, levels and lesson mastery',()=>{
  const study={...base,completedLessons:['0452-1.1-why-accounting-matters'],practiceLog:[{id:'a',section:'1.1',correct:true,date:'2027-01-01'}],attempts:[{paper:1,percent:50,date:'2027-01-01'}]};
  assert.equal(xpFor(study),50+10+150);
  assert.equal(levelFor(210).level,2);assert.equal(levelFor(0).rank,'Rookie Bookkeeper');
  const m=sectionMastery(study);assert.equal(m['1.1'].lessonsDone,1);assert.equal(m['7.3'].level,'new');
});

test('Streaks count consecutive days and a protector covers one missed day',()=>{
  const days=['2027-01-01','2027-01-02','2027-01-03'];
  const study={...base,practiceLog:days.map((d,i)=>({id:String(i),section:'1.1',correct:true,date:`${d}T12:00:00`}))};
  assert.equal(streakFor(study,'2027-01-03').current,3);
  assert.equal(streakFor(study,'2027-01-04').current,3);
  assert.equal(streakFor(study,'2027-01-05').current,0);
  const freezes=updateFreezes(study,'2027-01-05');
  assert.deepEqual(freezes.usedDays,['2027-01-04']);assert.equal(freezes.available,0);
  assert.equal(streakFor({...study,freezes},'2027-01-05').current,4);
  assert.equal(updateFreezes({...study,freezes:{available:1,usedDays:[],earnedOn:[]}},'2027-01-09'),null);
});

test('Seven days in a row earns a protector, capped at two',()=>{
  const days=Array.from({length:7},(_,i)=>addDays('2027-03-01',i));
  const study={...base,practiceLog:days.map((d,i)=>({id:String(i),section:'1.1',correct:true,date:`${d}T09:00:00`})),freezes:{available:1,usedDays:[],earnedOn:[]}};
  const freezes=updateFreezes(study,'2027-03-07');assert.equal(freezes.available,2);
  assert.equal(updateFreezes({...study,freezes},'2027-03-07'),null);
});

test('Weekly challenge counts only this week and goals unlock',()=>{
  const study={...base,lessonDates:{a:'2027-03-02T10:00:00',b:'2027-02-20T10:00:00'}};
  const week=weeklyChallenge(study,'2027-03-03');
  assert.equal(week.start,'2027-03-01');
  const lessons=week.goals.find(g=>g.key==='lessons');if(lessons)assert.equal(lessons.done,1);
  assert.equal(goalReached({kind:'mock',target:70},{...base,attempts:[{percent:72}]}),true);
  assert.equal(goalReached({kind:'level',target:3},base),false);
});
