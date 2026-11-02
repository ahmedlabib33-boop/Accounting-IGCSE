export function gradeMultipleChoice(items, bank) {
  const index=new Map(bank.map(q=>[q.id,q]));
  const seen=new Set();
  return items.map(({id,answer})=>{
    if(seen.has(id))return {id,error:'Duplicate question.'};
    seen.add(id);
    const q=index.get(id);if(!q)return {id,error:'Question not found.'};
    const selected=typeof answer==='string'?answer.trim().toUpperCase():'';
    return {id,correct:selected===q.answer,selected:['A','B','C','D'].includes(selected)?selected:'',answer:q.answer,explanation:q.explanation,subject:q.subject,question:q.question,lessonTitle:q.lessonTitle||'',section:q.section||'',number:q.number||''};
  });
}
