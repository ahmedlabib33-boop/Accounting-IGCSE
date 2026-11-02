import { NextResponse } from "next/server";
import { callGroq, parseJsonReply } from "../../_lib/groq";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You turn a Cambridge IGCSE Accounting (0452) student's wrong answers into revision flashcards.
For each item, write:
- "front": a short question that tests the same idea and can be answered on its own. If the answer needs figures, include every figure needed. Max 35 words.
- "back": the correct answer with the key reason or working, using correct debit/credit terminology. Max 45 words.
- "hook": a memory trick or rule of thumb, max 15 words. It must be exactly consistent with the back: use the same formula terms (for example "cost of sales", never "sales", when the formula uses cost of sales). If no accurate hook fits, give the rule in plain words.
Use only the facts given, and do not invent figures. Return JSON only: {"cards":[{"id":"…","front":"…","back":"…","hook":"…"}]}`;

export async function POST(request) {
  let items;
  try { ({ items } = await request.json()); } catch { return NextResponse.json({ error: "Send the mistakes to turn into cards." }, { status: 400 }); }
  if (!Array.isArray(items) || !items.length) return NextResponse.json({ error: "Send at least one mistake." }, { status: 400 });
  const clean = items.slice(0, 8).map((item) => ({
    id: String(item.id || "").slice(0, 120),
    question: String(item.question || "").slice(0, 600),
    correct: String(item.answer || "").slice(0, 600),
    explanation: String(item.explanation || "").slice(0, 800),
  }));
  try {
    const text = await callGroq({ json: true, temperature: 0.3, maxTokens: 1400, messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: JSON.stringify(clean) },
    ] });
    const wanted = new Set(clean.map((item) => item.id));
    const cards = (parseJsonReply(text)?.cards || [])
      .filter((card) => wanted.has(card?.id) && card.front && card.back)
      .map((card) => ({ id: card.id, front: String(card.front).slice(0, 300), back: String(card.back).slice(0, 500), hook: String(card.hook || "").slice(0, 200) }));
    return NextResponse.json({ cards });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 502 });
  }
}
