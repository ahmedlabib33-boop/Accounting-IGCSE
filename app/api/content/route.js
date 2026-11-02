import { NextResponse } from "next/server";
import { contentSummary, getExam, getExamSummaries, getLearning, normalizeSubject, getStructuredPapers, getStructuredPaper } from "../../_lib/accounting-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "summary";
  const subject = searchParams.get("subject");

  if (type === "summary") return NextResponse.json({ summary: contentSummary() });
  if (type === "structured") return NextResponse.json({ papers: getStructuredPapers() });
  if (type === "structured-paper") {
    const paper = getStructuredPaper(searchParams.get('examId'));
    return paper ? NextResponse.json(paper) : NextResponse.json({error:'Paper not found.'},{status:404});
  }
  if (!normalizeSubject(subject)) return NextResponse.json({ error: "Choose Accounting." }, { status: 400 });
  if (type === "learning") return NextResponse.json(getLearning(subject));
  if (type === "exams") return NextResponse.json({ subject, exams: getExamSummaries(subject) });
  if (type === "exam") {
    const questions = getExam(subject, searchParams.get("examId"));
    if (!questions) return NextResponse.json({ error: "Exam not found." }, { status: 404 });
    return NextResponse.json({ subject, examId: searchParams.get("examId"), questions });
  }
  return NextResponse.json({ error: "Unsupported content request." }, { status: 400 });
}
