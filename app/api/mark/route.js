import { NextResponse } from "next/server";
import { getStructuredPart } from "../../_lib/accounting-content";
import { callGroq, parseJsonReply } from "../../_lib/groq";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are a careful Cambridge IGCSE Accounting (0452) examiner marking one part of an original practice Paper 2 question.
Mark ONLY against the numbered mark points. Each point is worth one mark. Award a point when the student's answer clearly shows it, even if worded differently or reached by a valid alternative method. Allow own-figure follow-through when a later step is correct using the student's own earlier figure.
Never award a point for something that is not in the answer. Be strict about debit/credit sides, account names, headings with dates, and figures.
Return JSON only, in this shape:
{"points":[{"n":1,"met":true,"evidence":"short quote or reason"}],"missing":["short, specific fixes such as 'No date in the heading' or 'Debit and credit reversed for discount allowed'"],"feedback":"two short sentences of encouragement and the single most important improvement"}`;

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Send the answer to mark." }, { status: 400 }); }
  const { examId, questionId, label } = body || {};
  const answer = typeof body?.answer === "string" ? body.answer.trim().slice(0, 4000) : "";
  const found = getStructuredPart(examId, questionId, label);
  if (!found) return NextResponse.json({ error: "That question part was not found." }, { status: 404 });
  const { question, part } = found;
  const points = part.points.map((text, index) => ({ n: index + 1, text }));

  if (!answer) {
    return NextResponse.json({ marks: 0, max: part.marks, points: points.map((point) => ({ ...point, met: false, evidence: "" })), missing: ["No answer was written for this part."], feedback: "Even a partial answer with workings can earn marks, so always write something." });
  }

  try {
    const text = await callGroq({
      json: true, temperature: 0.1, maxTokens: 900,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: [
          `Question ${question.number}: ${question.title}`,
          `Information: ${question.stimulus}`,
          `Part (${part.label}) [${part.marks} marks]: ${part.prompt}`,
          `Indicative answer: ${part.model}`,
          `Mark points:\n${points.map((point) => `${point.n}. ${point.text}`).join("\n")}`,
          `Student's answer:\n"""${answer}"""`,
        ].join("\n\n") },
      ],
    });
    const result = parseJsonReply(text);
    if (!result || !Array.isArray(result.points)) return NextResponse.json({ error: "The AI marker returned an unreadable result. Please try again." }, { status: 502 });
    const verdicts = new Map(result.points.map((item) => [Number(item.n), item]));
    const marked = points.map((point) => ({ ...point, met: verdicts.get(point.n)?.met === true, evidence: String(verdicts.get(point.n)?.evidence || "").slice(0, 240) }));
    const marks = Math.min(part.marks, marked.filter((point) => point.met).length);
    const missing = (Array.isArray(result.missing) ? result.missing : []).map((item) => String(item).slice(0, 200)).slice(0, 6);
    return NextResponse.json({ marks, max: part.marks, points: marked, missing, feedback: String(result.feedback || "").slice(0, 400) });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 502 });
  }
}
