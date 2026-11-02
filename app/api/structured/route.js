import { NextResponse } from 'next/server';
import { getStructuredPaper } from '../../_lib/accounting-content';
export async function POST(request) {
  let data;
  try { data=await request.json(); } catch { return NextResponse.json({error:'Send valid paper data.'},{status:400}); }
  const paper=getStructuredPaper(data?.examId,true);
  if(!paper)return NextResponse.json({error:'Paper not found.'},{status:404});
  return NextResponse.json(paper);
}
