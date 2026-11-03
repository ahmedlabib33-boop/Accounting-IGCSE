"use client";
import {useEffect,useRef,useState} from 'react';
import {Icon,StepReveal,formatMinutes} from './_components/ui';
import {celebrate} from './_components/effects';
import {recordMistake,withExtras} from './_lib/study-engine.mjs';
async function request(url,options){const r=await fetch(url,options);const data=await r.json().catch(()=>({}));if(!r.ok)throw Error(data.error||'Request failed');return data;}
const DEFAULT_SECONDS=105*60;
const paperSeconds=(paper)=>((paper?.minutes||105)*60);
const paperMarks=(paper)=>(paper?.marks||100);

function AiVerdict({verdict}){
  return <div className="ai-verdict" aria-live="polite">
    <strong><Icon name="brain" size={16}/> AI marking: {verdict.marks} / {verdict.max}</strong>
    <ul>{verdict.points.map(point=><li key={point.n} className={point.met?'met':'missed'}><Icon name={point.met?'check':'x'} size={14}/><span>{point.text}</span>{point.evidence&&<em>{point.evidence}</em>}</li>)}</ul>
    {verdict.missing.length>0&&<div className="ai-missing"><b>What was missing</b>{verdict.missing.map(item=><span key={item}>{item}</span>)}</div>}
    {verdict.feedback&&<p>{verdict.feedback}</p>}
  </div>;
}

export default function StructuredExam({study,setStudy}){
  const [papers,setPapers]=useState([]),[paperId,setPaperId]=useState(''),[paper,setPaper]=useState(null);
  const [answers,setAnswers]=useState({}),[scheme,setScheme]=useState(null),[marks,setMarks]=useState({});
  const [seconds,setSeconds]=useState(DEFAULT_SECONDS),[error,setError]=useState(''),[busy,setBusy]=useState(false),[saved,setSaved]=useState(false);
  const [spent,setSpent]=useState({}),[current,setCurrent]=useState(''),[warning,setWarning]=useState('');
  const [verdicts,setVerdicts]=useState({}),[marking,setMarking]=useState({});
  const submitting=useRef(false),saving=useRef(false);
  const settings=withExtras(study).settings;
  useEffect(()=>{let active=true;request('/api/content?type=structured').then(d=>{if(active){setPapers(d.papers);setPaperId(d.papers[0]?.id||'');}}).catch(e=>active&&setError(e.message));return()=>{active=false;};},[]);
  useEffect(()=>{if(!paperId)return;let active=true;setPaper(null);setAnswers({});setScheme(null);setMarks({});setSaved(false);saving.current=false;setSeconds(DEFAULT_SECONDS);setError('');setSpent({});setCurrent('');setWarning('');setVerdicts({});submitting.current=false;
    request(`/api/content?type=structured-paper&examId=${encodeURIComponent(paperId)}`).then(d=>{if(active){setPaper(d);setSeconds(paperSeconds(d));setCurrent(d.questions[0]?.id||'');}}).catch(e=>active&&setError(e.message));return()=>{active=false;};},[paperId]);
  // The clock runs until submission. Time is charged to the question Omar is working on.
  useEffect(()=>{if(!paper||scheme)return;const timer=setInterval(()=>{setSeconds(s=>Math.max(0,s-1));if(current)setSpent(t=>({...t,[current]:(t[current]||0)+1}));},1000);return()=>clearInterval(timer);},[paper,scheme,current]);
  useEffect(()=>{if(!paper||scheme)return;const text=seconds===15*60?'15 minutes left. Make sure every question has at least an attempt with workings.':seconds===5*60?'5 minutes left. Finish the part you are on and add headings.':'';if(text){setWarning(text);if(settings.haptics!==false)navigator.vibrate?.([80,60,80]);}},[seconds,paper,scheme,settings.haptics]);
  async function submit(){if(submitting.current||!paper)return;submitting.current=true;setBusy(true);setError('');try{setScheme(await request('/api/structured',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({examId:paperId})}));}catch(e){submitting.current=false;setError(navigator.onLine===false?"You're offline. Your answers are kept; submit again when you're back online.":e.message);}finally{setBusy(false);}}
  const submitRef=useRef(submit);useEffect(()=>{submitRef.current=submit;});
  useEffect(()=>{if(seconds===0&&paper&&!scheme&&!busy&&!error)submitRef.current();},[seconds,paper,scheme,busy,error]);
  const key=(q,p)=>`${q.id}:${p.label}`;
  const allParts=scheme?.questions.flatMap(q=>q.parts.map(p=>({q,p,key:key(q,p)})))||[];
  const complete=allParts.length>0&&allParts.every(i=>Number.isInteger(marks[i.key])&&marks[i.key]>=0&&marks[i.key]<=i.p.marks);
  const score=Object.values(marks).reduce((a,b)=>a+(Number(b)||0),0);
  async function aiMark(item){
    setMarking(m=>({...m,[item.key]:true}));
    try{const verdict=await request('/api/mark',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({examId:paperId,questionId:item.q.id,label:item.p.label,answer:answers[item.key]||''})});setVerdicts(v=>({...v,[item.key]:verdict}));setMarks(m=>({...m,[item.key]:verdict.marks}));}
    catch(e){setVerdicts(v=>({...v,[item.key]:{error:e.message}}));}
    finally{setMarking(m=>({...m,[item.key]:false}));}
  }
  async function aiMarkAll(){for(const item of allParts)if(!verdicts[item.key]?.points)await aiMark(item);}
  function save(){if(!complete||saving.current)return;saving.current=true;
    const date=new Date().toISOString();
    const aiCount=allParts.filter(i=>verdicts[i.key]?.marks===marks[i.key]).length;
    const attempt={id:`0452:${paperId}:${Date.now()}`,date,subject:'Accounting',paper:2,examId:paperId,score,total:paperMarks(paper),percent:Math.round(score/paperMarks(paper)*100),seconds:paperSeconds(paper)-seconds,
      marking:aiCount===allParts.length?'AI-marked':aiCount?'AI and self-assessed':'Self-assessed',parts:allParts.map(i=>({id:i.key,section:i.q.section,marks:marks[i.key],max:i.p.marks}))};
    const weak=allParts.filter(i=>marks[i.key]<i.p.marks).map(i=>({id:i.key,subject:'Accounting',section:i.q.section,question:`${i.q.title} (${i.p.label}): ${i.p.prompt}`,selected:answers[i.key]||'Not answered',answer:i.p.model,explanation:i.p.points.join(' · '),examId:paperId}));
    setStudy(cur=>weak.reduce((next,item)=>recordMistake(next,item,date),{...cur,attempts:[attempt,...cur.attempts].slice(0,60)}));setSaved(true);celebrate(settings,score/paperMarks(paper)>=0.7);
  }
  return <section className="section-screen"><div className="section-heading"><span>Exam arena · Paper 2 rehearsal</span><h1>Show the workings.</h1><p>{paper&&!paper.id.includes('Original mock')?`${paper.minutes} minutes · ${paper.questions.length} questions of 20 marks · ${paperMarks(paper)} marks · topic practice.`:'105 minutes · five compulsory questions · 100 marks · 70% of the grade.'} Warnings at 15 and 5 minutes, and the paper is collected when time runs out. Afterwards, the AI marker checks each part against the mark scheme, point by point. Original practice; no official Cambridge grade is claimed.</p></div>
    <div className="exam-controls"><label>Structured paper<select value={paperId} disabled={busy} onChange={e=>setPaperId(e.target.value)}>{papers.map(p=><option key={p.id}>{p.id}</option>)}</select></label><strong className={seconds<=15*60&&!scheme?'exam-timer warn':'exam-timer'}>{formatMinutes(seconds)}</strong></div>
    {warning&&!scheme&&<div className="exam-warning" role="alert"><Icon name="clock" size={18}/>{warning}<button className="tiny-icon" aria-label="Dismiss warning" onClick={()=>setWarning('')}><Icon name="x" size={14}/></button></div>}
    {error&&<p role="alert" className="coach-error">{error}</p>}
    {paper&&!scheme&&<><p>Write account headings with dates, debit/credit sides, units and workings. Leaving this screen resets this unsaved attempt.</p>{paper.questions.map(q=><article className={`lesson-card structured-question${current===q.id?' working':''}`} key={q.id} onFocusCapture={()=>setCurrent(q.id)}><span>Question {q.number} · 20 marks · {q.section} · {formatMinutes(spent[q.id]||0)} spent (aim for about 21:00)</span><h2>{q.title}</h2><p className="exam-passage">{q.stimulus}</p>{q.parts.map(p=><label className="structured-part" key={p.label}><strong>({p.label}) {p.prompt} [{p.marks}]</strong><textarea rows={5} value={answers[key(q,p)]||''} disabled={busy||seconds===0} onChange={e=>setAnswers(a=>({...a,[key(q,p)]:e.target.value}))} placeholder="Write your answer and workings…"/></label>)}</article>)}<button className="primary-button compact-primary" disabled={busy} onClick={submit}>{busy?'Submitting…':'Submit and open marking'}</button></>}
    {scheme&&<><div className="lesson-tip">Submitted after {formatMinutes(paperSeconds(paper)-seconds)}. Mark each part with the AI marker, or compare it with the model yourself, then save. The AI follows the mark points strictly; you can change any mark it gives. <button className="outline-button compact-button" disabled={saved||Object.values(marking).some(Boolean)} onClick={aiMarkAll}><Icon name="brain" size={16}/> Mark every part with AI</button></div>
      <div className="time-bars p2-time">{scheme.questions.map(q=><div key={q.id}><span>Q{q.number} · {q.title}</span><div className="bar bar-violet"><span style={{width:`${Math.min(100,((spent[q.id]||0)/(21*60))*100)}%`}}/></div><b>{formatMinutes(spent[q.id]||0)}</b></div>)}</div>
      {scheme.questions.map(q=><article className="lesson-card structured-question" key={q.id}><h2>Question {q.number}: {q.title}</h2><p>{q.stimulus}</p>{q.parts.map(p=>{const item={q,p,key:key(q,p)};const verdict=verdicts[item.key];return <div className="structured-part" key={p.label}><h3>({p.label}) {p.prompt} [{p.marks}]</h3><p className="submitted-answer"><strong>Your answer</strong><br/>{answers[item.key]||'Not answered'}</p>
        <StepReveal key={item.key} label="Model answer, step by step" text={p.model}/>
        <details className="mark-points"><summary>Mark scheme points ({p.points.length})</summary><ul>{p.points.map(point=><li key={point}>{point}</li>)}</ul></details>
        {verdict?.points&&<AiVerdict verdict={verdict}/>}{verdict?.error&&<p className="coach-error">{verdict.error}</p>}
        <div className="mark-row"><button className="outline-button compact-button" disabled={saved||marking[item.key]} onClick={()=>aiMark(item)}><Icon name="brain" size={16}/>{marking[item.key]?'Marking…':verdict?.points?'Mark again':'Mark with AI'}</button><label>Marks for {q.number}{p.label}<select disabled={saved} value={marks[item.key]??''} onChange={e=>setMarks(m=>({...m,[item.key]:e.target.value===''?undefined:Number(e.target.value)}))}><option value="">Select marks</option>{Array.from({length:p.marks+1},(_,i)=><option key={i} value={i}>{i} / {p.marks}</option>)}</select></label></div>
      </div>;})}</article>)}
      <div className="exam-result"><h2>{score} / 100</h2><button className="primary-button compact-primary" disabled={!complete||saved} onClick={save}>{saved?'Result saved to Progress':'Save result'}</button><p>{complete?'Parts that lost marks go to the Review Vault and come back in your daily sessions.':'Give every part a mark before saving.'}</p></div></>}
  </section>;
}
