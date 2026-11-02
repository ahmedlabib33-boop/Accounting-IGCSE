import { NextResponse } from "next/server";
import { VISION_MODELS, callGroq } from "../../_lib/groq";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are an independent Cambridge IGCSE Accounting (0452) tutor for exams in 2027–2029. Teach the next useful step using a rule, a worked accounting example and a short check question. Use correct debit/credit terminology and show calculations. Cover bookkeeping, verification, adjustments, financial statements, ratios, concepts, ethics, technology and sustainability. Distinguish cash from profit, capital from revenue and profit allocation from expenses. ROCE uses profit before interest; capital employed for the specified company formula is issued shares plus reserves plus non-current liabilities. Use 365 days for turnover periods. Do not claim Cambridge endorsement or invent official grade thresholds or papers. If uncertain about the syllabus or a marking point, say so and refer to the official syllabus. Keep answers under 250 words unless more detail is requested. This is educational accounting, not personal financial advice.`;

const PHOTO_PROMPT = `${SYSTEM_PROMPT}
The student has sent a photo of a homework or past-paper question. First say in one line what the question asks. Then guide them: name the topic and the rule, give the first step worked out, and ask them to try the next step. Do not give the final answer outright unless they ask for it after trying. If the photo is unreadable or not about accounting, say so politely.`;

// Photos arrive as small JPEG data URLs, resized in the browser first.
const IMAGE_PATTERN = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;

export async function POST(request) {
  let question = "";
  let image = "";
  try {
    ({ question = "", image = "" } = await request.json());
  } catch {
    return NextResponse.json({ error: "Send a valid coach question." }, { status: 400 });
  }

  if (image && (typeof image !== "string" || image.length > 3_000_000 || !IMAGE_PATTERN.test(image))) {
    return NextResponse.json({ error: "That photo could not be read. Try a JPEG or PNG under 2 MB." }, { status: 400 });
  }
  if (typeof question !== "string" || (!question.trim() && !image)) {
    return NextResponse.json({ error: "Write a question for the AI Coach first." }, { status: 400 });
  }

  try {
    const reply = image
      ? await callGroq({ models: VISION_MODELS, maxTokens: 600, messages: [
        { role: "system", content: PHOTO_PROMPT },
        { role: "user", content: [
          { type: "text", text: question.trim().slice(0, 1500) || "Help me with this question." },
          { type: "image_url", image_url: { url: image } },
        ] },
      ] })
      : await callGroq({ messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: question.trim().slice(0, 3000) },
      ] });
    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 502 });
  }
}
