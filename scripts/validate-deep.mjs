// Validates data/accounting/deep/topic*.mjs against the shape in data/accounting/deep/README.md.
// Usage: node scripts/validate-deep.mjs [--topic N]   (exit 1 when anything is wrong)
import { access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TOPIC_SECTIONS = {
  1: ["1.1", "1.2"], 2: ["2.1", "2.2", "2.3"], 3: ["3.1", "3.2", "3.3", "3.4"], 4: ["4.1", "4.2", "4.3", "4.4", "4.5"],
  5: ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6"], 6: ["6.1", "6.2", "6.3", "6.4", "6.5"], 7: ["7.1", "7.2", "7.3"],
};
const RANGE = { objectives: [4, 8], keyTerms: [6, 12], notes: [5, 8], workedExamples: [3, 4], commonErrors: [4, 6], examTips: [4, 6], exercises: [8, 10], mcq: [10, 10], structured: [2, 2] };
const EXERCISE_TYPES = new Set(["calculation", "entries", "statement", "explain"]);
const MARKDOWN = /(\*\*|^#|```|^\s*[-*•]\s)/m;

export async function loadDeepTopics(only) {
  const topics = [];
  for (const n of Object.keys(TOPIC_SECTIONS).map(Number)) {
    if (only && only !== n) continue;
    const file = path.join(root, "data/accounting/deep", `topic${n}.mjs`);
    try { await access(file); } catch { continue; }
    const mod = await import(pathToFileURL(file).href + `?t=${Date.now()}`);
    topics.push({ n, file, topic: mod.topic });
  }
  return topics;
}

export function validateDeep(topics) {
  const errors = [];
  const ids = new Set();
  const words = (text) => String(text || "").trim().split(/\s+/).filter(Boolean).length;
  const str = (value, where, min = 1) => { if (typeof value !== "string" || value.trim().length < min) errors.push(`${where}: missing or too short text`); else if (MARKDOWN.test(value)) errors.push(`${where}: markdown syntax is not allowed`); };
  const count = (list, key, where) => {
    const [min, max] = RANGE[key];
    if (!Array.isArray(list)) { errors.push(`${where}.${key}: not an array`); return false; }
    if (list.length < min || list.length > max) errors.push(`${where}.${key}: ${list.length} items, expected ${min}${min === max ? "" : `–${max}`}`);
    return true;
  };
  const uid = (id, pattern, where) => {
    if (typeof id !== "string" || !pattern.test(id)) errors.push(`${where}: bad id "${id}"`);
    if (ids.has(id)) errors.push(`${where}: duplicate id "${id}"`);
    ids.add(id);
  };
  for (const { n, topic, file } of topics) {
    const t = `topic${n}`;
    if (!topic || typeof topic !== "object") { errors.push(`${file}: no exported "topic"`); continue; }
    if (String(topic.id) !== String(n)) errors.push(`${t}: id should be "${n}"`);
    str(topic.name, `${t}.name`);
    const expected = TOPIC_SECTIONS[n];
    const got = (topic.sections || []).map((s) => s.section);
    for (const code of expected) if (!got.includes(code)) errors.push(`${t}: section ${code} missing`);
    for (const code of got) if (!expected.includes(code)) errors.push(`${t}: unexpected section ${code}`);
    if (new Set(got).size !== got.length) errors.push(`${t}: a section appears twice`);
    for (const s of topic.sections || []) {
      const w = `${t} ${s.section}`;
      str(s.title, `${w}.title`); str(s.summary, `${w}.summary`, 40);
      if (count(s.objectives, "objectives", w)) s.objectives.forEach((o, i) => str(o, `${w}.objectives[${i}]`, 10));
      if (count(s.keyTerms, "keyTerms", w)) s.keyTerms.forEach((k, i) => { str(k?.term, `${w}.keyTerms[${i}].term`); str(k?.definition, `${w}.keyTerms[${i}].definition`, 15); });
      if (count(s.notes, "notes", w)) s.notes.forEach((b, i) => {
        str(b?.heading, `${w}.notes[${i}].heading`); str(b?.body, `${w}.notes[${i}].body`, 40);
        if (words(b?.body) < 60) errors.push(`${w}.notes[${i}].body: ${words(b?.body)} words, need at least 60`);
        if (b?.table) {
          if (!Array.isArray(b.table.head) || !Array.isArray(b.table.rows)) errors.push(`${w}.notes[${i}].table: needs head and rows arrays`);
          else for (const row of b.table.rows) if (!Array.isArray(row) || row.length !== b.table.head.length) errors.push(`${w}.notes[${i}].table: a row does not match the head`);
        }
      });
      if (count(s.workedExamples, "workedExamples", w)) s.workedExamples.forEach((e, i) => {
        str(e?.title, `${w}.workedExamples[${i}].title`); str(e?.scenario, `${w}.workedExamples[${i}].scenario`, 30); str(e?.answer, `${w}.workedExamples[${i}].answer`, 10);
        if (!Array.isArray(e?.steps) || e.steps.length < 2) errors.push(`${w}.workedExamples[${i}].steps: need at least 2 steps`); else e.steps.forEach((st, j) => str(st, `${w}.workedExamples[${i}].steps[${j}]`, 10));
      });
      if (count(s.commonErrors, "commonErrors", w)) s.commonErrors.forEach((c, i) => { str(c?.error, `${w}.commonErrors[${i}].error`, 10); str(c?.fix, `${w}.commonErrors[${i}].fix`, 10); });
      if (count(s.examTips, "examTips", w)) s.examTips.forEach((tip, i) => str(tip, `${w}.examTips[${i}]`, 15));
      if (count(s.exercises, "exercises", w)) s.exercises.forEach((x, i) => {
        const where = `${w}.exercises[${i}]`;
        uid(x?.id, new RegExp(`^ex-${s.section.replace(".", "\\.")}-\\d+$`), where);
        if (!EXERCISE_TYPES.has(x?.type)) errors.push(`${where}: type must be one of ${[...EXERCISE_TYPES].join(", ")}`);
        if (!Number.isInteger(x?.marks) || x.marks < 2 || x.marks > 10) errors.push(`${where}: marks must be 2–10`);
        str(x?.prompt, `${where}.prompt`, 20); str(x?.model, `${where}.model`, 20);
        if (!Array.isArray(x?.points) || x.points.length !== x?.marks) errors.push(`${where}: points.length must equal marks`); else x.points.forEach((p, j) => str(p, `${where}.points[${j}]`, 8));
      });
      if (count(s.mcq, "mcq", w)) s.mcq.forEach((q, i) => {
        const where = `${w}.mcq[${i}]`;
        uid(q?.id, new RegExp(`^mcq-${s.section.replace(".", "\\.")}-\\d+$`), where);
        str(q?.question, `${where}.question`, 15); str(q?.explanation, `${where}.explanation`, 20);
        if (!Array.isArray(q?.choices) || q.choices.length !== 4) errors.push(`${where}: exactly 4 choices`);
        else { q.choices.forEach((c, j) => str(c, `${where}.choices[${j}]`)); if (new Set(q.choices.map((c) => String(c).trim().toLowerCase())).size !== 4) errors.push(`${where}: choices must be different`); }
      });
      if (count(s.structured, "structured", w)) s.structured.forEach((q, i) => {
        const where = `${w}.structured[${i}]`;
        uid(q?.id, new RegExp(`^sq-${s.section.replace(".", "\\.")}-\\d+$`), where);
        str(q?.title, `${where}.title`); str(q?.stimulus, `${where}.stimulus`, 60);
        if (!Array.isArray(q?.parts) || q.parts.length < 3 || q.parts.length > 5) { errors.push(`${where}: 3–5 parts`); return; }
        const total = q.parts.reduce((sum, p) => sum + (Number(p?.marks) || 0), 0);
        if (total !== 20) errors.push(`${where}: parts total ${total} marks, need 20`);
        q.parts.forEach((p, j) => {
          const pw = `${where}.parts[${j}]`;
          if (!/^[a-e]$/.test(String(p?.label))) errors.push(`${pw}: label must be a–e`);
          if (!Number.isInteger(p?.marks) || p.marks < 2 || p.marks > 10) errors.push(`${pw}: marks must be 2–10`);
          str(p?.prompt, `${pw}.prompt`, 15); str(p?.model, `${pw}.model`, 20);
          if (!Array.isArray(p?.points) || p.points.length !== p?.marks) errors.push(`${pw}: points.length must equal marks`); else p.points.forEach((pt, k) => str(pt, `${pw}.points[${k}]`, 8));
        });
      });
    }
  }
  return errors;
}

export function summarizeDeep(topics) {
  const rows = [];
  for (const { topic } of topics) for (const s of topic.sections || []) rows.push({ section: s.section, notes: s.notes?.length || 0, examples: s.workedExamples?.length || 0, exercises: s.exercises?.length || 0, mcq: s.mcq?.length || 0, structured: s.structured?.length || 0, terms: s.keyTerms?.length || 0 });
  return rows;
}

const invoked = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  const flag = process.argv.indexOf("--topic");
  const only = flag > -1 ? Number(process.argv[flag + 1]) : 0;
  const topics = await loadDeepTopics(only);
  if (!topics.length) { console.error(only ? `topic${only}.mjs not found` : "No deep topic files found"); process.exit(1); }
  const errors = validateDeep(topics);
  for (const row of summarizeDeep(topics)) console.log(`${row.section}: notes ${row.notes}, examples ${row.examples}, terms ${row.terms}, exercises ${row.exercises}, mcq ${row.mcq}, structured ${row.structured}`);
  if (errors.length) { console.error(`\n${errors.length} problem(s):`); errors.slice(0, 80).forEach((e) => console.error(" - " + e)); if (errors.length > 80) console.error(` … and ${errors.length - 80} more`); process.exit(1); }
  console.log(`\nOK: ${topics.length} topic file(s), ${summarizeDeep(topics).length} sections valid.`);
}
