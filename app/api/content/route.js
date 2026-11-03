import { NextResponse } from "next/server";
import { contentSummary, getExam, getExamSummaries, getExercise, getGuide, getGuideSections, getLearning, getQuiz, getRevision, normalizeSubject, getStructuredPapers, getStructuredPaper, getQuestionsByIds } from "../../_lib/accounting-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "summary";
  const subject = searchParams.get("subject");

  if (type === "summary") return NextResponse.json({ summary: contentSummary() });
  if (type === "questions") {
    const ids = (searchParams.get("ids") || "").split(",").map((id) => id.trim()).filter(Boolean).slice(0, 60);
    return NextResponse.json({ questions: getQuestionsByIds(ids) });
  }
  if (type === "structured") return NextResponse.json({ papers: getStructuredPapers() });
  if (type === "structured-paper") {
    const paper = getStructuredPaper(searchParams.get("examId"));
    return paper ? NextResponse.json(paper) : NextResponse.json({ error: "Paper not found." }, { status: 404 });
  }
  if (type === "guide") {
    const guide = getGuide(searchParams.get("section") || "");
    return guide ? NextResponse.json(guide) : NextResponse.json({ error: "No study guide for that section yet." }, { status: 404 });
  }
  if (type === "guides") return NextResponse.json({ sections: getGuideSections() });
  if (type === "exercise") {
    // The model answer and mark points for one exercise, revealed on request.
    const found = getExercise(searchParams.get("id") || "");
    return found ? NextResponse.json({ id: found.exercise.id, model: found.exercise.model, points: found.exercise.points }) : NextResponse.json({ error: "Exercise not found." }, { status: 404 });
  }
  if (type === "quiz") {
    const sections = (searchParams.get("sections") || "").split(",").map((s) => s.trim()).filter(Boolean);
    if (!sections.length) return NextResponse.json({ error: "Choose at least one section." }, { status: 400 });
    return NextResponse.json({ questions: getQuiz(sections, Number(searchParams.get("count")) || 10) });
  }
  if (type === "revision") return NextResponse.json(getRevision());
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
