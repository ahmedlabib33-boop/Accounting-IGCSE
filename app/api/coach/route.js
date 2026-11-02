import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are an independent Cambridge IGCSE Accounting (0452) tutor for exams in 2027–2029. Teach the next useful step using a rule, a worked accounting example and a short check question. Use correct debit/credit terminology and show calculations. Cover bookkeeping, verification, adjustments, financial statements, ratios, concepts, ethics, technology and sustainability. Distinguish cash from profit, capital from revenue and profit allocation from expenses. ROCE uses profit before interest; capital employed for the specified company formula is issued shares plus reserves plus non-current liabilities. Use 365 days for turnover periods. Do not claim Cambridge endorsement or invent official grade thresholds or papers. If uncertain about the syllabus or a marking point, say so and refer to the official syllabus. Keep answers under 250 words unless more detail is requested. This is educational accounting, not personal financial advice.`;

const FALLBACK_MODELS = ["llama-3.3-70b-versatile", "openai/gpt-oss-120b", "openai/gpt-oss-20b", "llama-3.1-8b-instant"];

export async function POST(request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The AI Coach is offline: the GROQ_API_KEY setting is missing on the server. Ask the site owner to add it in Vercel → Settings → Environment Variables." },
      { status: 503 },
    );
  }

  let question = "";
  try {
    ({ question = "" } = await request.json());
  } catch {
    return NextResponse.json({ error: "Send a valid coach question." }, { status: 400 });
  }

  if (typeof question !== "string" || !question.trim()) {
    return NextResponse.json({ error: "Write a question for the AI Coach first." }, { status: 400 });
  }

  try {
    // Groq retires models over time and not every key can use every model, so try a short list.
    const models = [process.env.GROQ_MODEL, ...FALLBACK_MODELS].filter((model, index, list) => model && list.indexOf(model) === index);
    let groqResponse;
    let groqData = {};
    for (const model of models) {
      groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          temperature: 0.35,
          max_tokens: 420,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: question.trim().slice(0, 3000) },
          ],
        }),
        cache: "no-store",
      });
      groqData = await groqResponse.json().catch(() => ({}));
      const modelUnavailable = groqResponse.status === 404 || groqData?.error?.code === "model_not_found" || groqData?.error?.code === "model_decommissioned";
      if (!modelUnavailable) break;
    }

    if (!groqResponse.ok) {
      return NextResponse.json(
        { error: groqData?.error?.message || "Groq could not complete that request." },
        { status: groqResponse.status },
      );
    }

    const reply = groqData?.choices?.[0]?.message?.content;
    if (!reply) return NextResponse.json({ error: "Groq returned an empty response. Please try again." }, { status: 502 });
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Could not reach Groq. Check your connection and try again." }, { status: 502 });
  }
}
