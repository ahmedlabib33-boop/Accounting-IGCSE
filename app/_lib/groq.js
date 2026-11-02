import "server-only";

// Groq retires models over time and not every key can use every model, so try a short list.
const FALLBACK_MODELS = ["llama-3.3-70b-versatile", "openai/gpt-oss-120b", "openai/gpt-oss-20b", "llama-3.1-8b-instant"];

export class GroqError extends Error {
  constructor(message, status) { super(message); this.status = status; }
}

export const VISION_MODELS = ["meta-llama/llama-4-scout-17b-16e-instruct", "meta-llama/llama-4-maverick-17b-128e-instruct"];

export async function callGroq({ messages, maxTokens = 420, temperature = 0.35, json = false, models: only }) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new GroqError("The AI Coach is offline: the GROQ_API_KEY setting is missing on the server. Ask the site owner to add it in Vercel → Settings → Environment Variables.", 503);
  const models = (only || [process.env.GROQ_MODEL, ...FALLBACK_MODELS]).filter((model, index, list) => model && list.indexOf(model) === index);
  let response;
  let data = {};
  try {
    for (const model of models) {
      response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model, temperature, max_tokens: maxTokens, messages, ...(json ? { response_format: { type: "json_object" } } : {}) }),
        cache: "no-store",
      });
      data = await response.json().catch(() => ({}));
      const unavailable = response.status === 404 || data?.error?.code === "model_not_found" || data?.error?.code === "model_decommissioned";
      if (!unavailable) break;
    }
  } catch {
    throw new GroqError("Could not reach Groq. Check your connection and try again.", 502);
  }
  if (!response.ok) throw new GroqError(data?.error?.message || "Groq could not complete that request.", response.status);
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new GroqError("Groq returned an empty response. Please try again.", 502);
  return text;
}

export function parseJsonReply(text) {
  try { return JSON.parse(text); } catch { /* fall through to extracting the first JSON object */ }
  const match = /\{[\s\S]*\}/.exec(text);
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch { return null; }
}
