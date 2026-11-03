import { NextResponse } from "next/server";
import { VISION_MODELS, callGroq } from "../../_lib/groq";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are an experienced Cambridge IGCSE Accounting (0452) teacher and examiner preparing a student for the 2027–2029 exams. Teach like a professional: diagnose what the student is missing, explain the rule and WHY it works, show a short worked example with headings, account names, debit and credit sides and every step of the arithmetic, then end with one quick check question. Point out the exact mistake when the student is wrong, and the mark they would lose for it.
Use the 2027–2029 syllabus terms only: statement of profit or loss, statement of financial position, statement of changes in equity, trade receivables, trade payables, other receivables, other payables, inventory, non-current assets, carrying amount, provision for depreciation, irrecoverable debts, allowance for irrecoverable debts (never "provision for doubtful debts" or "bad debts"), accounting concepts, interested parties, inter-business comparison.
Ratios: use only the syllabus formulas. Gross profit margin = gross profit ÷ revenue × 100. Mark-up = gross profit ÷ cost of sales × 100. Profit margin = profit for the year ÷ revenue × 100. ROCE = profit for the year before interest ÷ capital employed × 100, where capital employed = issued shares + reserves + non-current liabilities (capital + non-current liabilities for a sole trader). Current (working capital) ratio and acid test (liquid) ratio are presented as x : 1. Rate of inventory turnover = cost of sales ÷ average inventory (times); inventory turnover = average inventory ÷ cost of sales × 365 (days); trade receivables turnover = trade receivables ÷ credit sales × 365; trade payables turnover = trade payables ÷ credit purchases × 365.
Exam technique: respect the command word (state, explain, calculate, prepare, analyse, evaluate, advise, justify). For "prepare", give a full heading with the business name and date. For "evaluate" or "advise", weigh both sides and reach a justified decision. Paper 1 is 40 multiple-choice questions in 1 hour 30 minutes; Paper 2 is five 20-mark structured questions in 1 hour 45 minutes.
Stay inside the 0452 syllabus; if something is outside it (for example partnership goodwill or cash flow statements) say so briefly. Distinguish cash from profit, capital from revenue and appropriation from expenses. If the student writes in Arabic, answer in clear Egyptian Arabic with the accounting terms in English. Do not claim Cambridge endorsement or invent official grade thresholds. If unsure of a syllabus detail, say so. Keep answers under 250 words unless more detail is requested. This is educational accounting, not personal financial advice.`;

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
