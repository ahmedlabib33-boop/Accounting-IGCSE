import assert from 'node:assert/strict';
const base=process.env.ACCOUNTING_TEST_URL||'http://127.0.0.1:5417';
const get=async path=>{const r=await fetch(base+path);assert.equal(r.status,200);return r.json();};
const learning=await get('/api/content?type=learning&subject=Accounting');
assert.equal(learning.topics.length,7);assert(learning.lessons.length>=65);
assert(learning.practice.every(q=>!('answer' in q)&&!('explanation' in q)));
const summaries=await get('/api/content?type=exams&subject=Accounting');assert.equal(summaries.exams.length,3);
for(const e of summaries.exams){const d=await get(`/api/content?type=exam&subject=Accounting&examId=${encodeURIComponent(e.id)}`);assert.equal(d.questions.length,40);assert(d.questions.every(q=>!('answer' in q)&&!('explanation' in q)));}
const r=await fetch(base+'/api/grade',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:[{id:learning.practice[0].id,answer:'A'},{id:learning.practice[1].id,answer:''}]})});
const result=await r.json();assert.equal(result.total,2);assert(result.results[0].explanation);assert.equal(result.results[1].correct,false);
const papers=await get('/api/content?type=structured');assert.equal(papers.papers.length,3);
for(const p of papers.papers){const d=await get(`/api/content?type=structured-paper&examId=${encodeURIComponent(p.id)}`);assert.equal(d.questions.length,5);assert(d.questions.every(q=>q.parts.every(part=>!('model'in part)&&!('points'in part))));}
const scheme=await fetch(base+'/api/structured',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({examId:papers.papers[0].id})});const s=await scheme.json();assert(s.questions.every(q=>q.parts.every(p=>p.model&&p.points.length)));
const invalid=await fetch(base+'/api/grade',{method:'POST',headers:{'Content-Type':'application/json'},body:'{"items":[]}'});assert.equal(invalid.status,400);
const legacy=await fetch(base+'/api/content?type=learning&subject=Math');assert.equal(legacy.status,400);
const handbook=await fetch(base+'/accounting-revision.html');assert.equal(handbook.status,200);assert((await handbook.text()).includes('Accounting 0452'));
console.log('API checks passed: content coverage, paper formats, answer hiding, marking, invalid requests and revision handbook.');
