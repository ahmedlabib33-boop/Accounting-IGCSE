import { NextResponse } from "next/server";
import { gradeItems } from "../../_lib/accounting-content";

export const runtime = "nodejs";

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Send valid grading data." }, { status: 400 });
  }
  if (!Array.isArray(payload?.items) || payload.items.length < 1 || payload.items.length > 100) {
    return NextResponse.json({ error: "Submit between 1 and 100 answers." }, { status: 400 });
  }
  const results = gradeItems(payload.items.map((item) => ({ id: String(item?.id || ""), answer: item?.answer })));
  const valid = results.filter((item) => !item.error);
  const correct = valid.filter((item) => item.correct).length;
  return NextResponse.json({ results, score: correct, total: valid.length, percent: valid.length ? Math.round((correct / valid.length) * 100) : 0 });
}
