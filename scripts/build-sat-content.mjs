import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inflateRawSync } from "node:zlib";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const outputFile = path.join(projectRoot, "app", "_data", "sat-content.json");
const checkOnly = process.argv.includes("--check");

const WORKBOOKS = {
  mathTopics: { file: "data/learning_math_topics.xlsx", required: ["subject", "topic_id", "topic_name", "order"] },
  mathLessons: { file: "data/learning_math_content.xlsx", required: ["topic_id", "domain", "lesson_title", "formula", "example", "explanation", "difficulty", "arabic"] },
  mathPractice: { file: "data/learning_math_questions.xlsx", required: ["domain", "lesson_title", "formula", "difficulty", "question", "option_a", "option_b", "option_c", "option_d", "correct_answer", "explanation"] },
  englishTopics: { file: "data/learning_english_topics.xlsx", required: ["subject", "topic_id", "topic_name", "order"] },
  englishLessons: { file: "data/learning_english_content.xlsx", required: ["topic_id", "lesson_title", "rule_title", "explanation", "example", "tip"] },
  englishPractice: { file: "data/learning_english_questions.xlsx", required: ["topic_id", "lesson_title", "rule_title", "difficulty", "question", "option_a", "option_b", "option_c", "option_d", "correct_answer", "explanation"] },
  mockEnglish: { file: "data/mock_english.xlsx", required: ["exam_id", "subject", "section", "question_number", "skill", "difficulty", "passage", "question", "option_a", "option_b", "option_c", "option_d", "correct_answer", "explanation"] },
  mockMath: { file: "data/mock_math.xlsx", required: ["exam_id", "subject", "section", "question_number", "skill", "difficulty", "passage", "question", "option_a", "option_b", "option_c", "option_d", "correct_answer", "explanation"] },
};

function text(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "object" && "text" in value) return String(value.text ?? "").trim();
  return String(value).trim();
}

function decodeXml(value) {
  return String(value || "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&#(x[\da-f]+|\d+);/gi, (_, entity) => String.fromCodePoint(entity[0].toLowerCase() === "x" ? Number.parseInt(entity.slice(1), 16) : Number.parseInt(entity, 10)));
}

function zipEntries(buffer) {
  let eocd = -1;
  for (let index = buffer.length - 22; index >= Math.max(0, buffer.length - 65557); index -= 1) {
    if (buffer.readUInt32LE(index) === 0x06054b50) { eocd = index; break; }
  }
  if (eocd < 0) throw new Error("Workbook is not a valid XLSX ZIP archive.");
  const count = buffer.readUInt16LE(eocd + 10);
  let offset = buffer.readUInt32LE(eocd + 16);
  const entries = new Map();
  for (let index = 0; index < count; index += 1) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) throw new Error("Workbook ZIP directory is malformed.");
    const compression = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localOffset = buffer.readUInt32LE(offset + 42);
    const name = buffer.subarray(offset + 46, offset + 46 + nameLength).toString("utf8");
    if (buffer.readUInt32LE(localOffset) !== 0x04034b50) throw new Error(`Workbook ZIP entry ${name} is malformed.`);
    const localNameLength = buffer.readUInt16LE(localOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localOffset + 28);
    const data = buffer.subarray(localOffset + 30 + localNameLength + localExtraLength, localOffset + 30 + localNameLength + localExtraLength + compressedSize);
    if (compression === 0) entries.set(name, data.toString("utf8"));
    else if (compression === 8) entries.set(name, inflateRawSync(data).toString("utf8"));
    else throw new Error(`Workbook ZIP entry ${name} uses unsupported compression.`);
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

function columnIndex(reference) {
  return [...reference.replace(/\d/g, "")].reduce((total, letter) => total * 26 + letter.charCodeAt(0) - 64, 0) - 1;
}

function sharedStrings(xml = "") {
  return [...xml.matchAll(/<si>([\s\S]*?)<\/si>/g)].map((match) => decodeXml([...match[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((item) => item[1]).join("")));
}

function worksheetRows(xml, strings) {
  const rows = [];
  for (const rowMatch of xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
    const row = [];
    for (const cellMatch of rowMatch[1].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
      const reference = /\br="([A-Z]+\d+)"/.exec(cellMatch[1])?.[1];
      if (!reference) continue;
      const index = columnIndex(reference);
      const type = /\bt="([^"]+)"/.exec(cellMatch[1])?.[1];
      const raw = /<v[^>]*>([\s\S]*?)<\/v>/.exec(cellMatch[2])?.[1] ?? [...cellMatch[2].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((item) => item[1]).join("");
      row[index] = type === "s" ? strings[Number(raw)] || "" : decodeXml(raw);
    }
    rows.push(row);
  }
  return rows;
}

function answerLetter(record) {
  const raw = text(record.correct_answer).toUpperCase();
  if (["A", "B", "C", "D"].includes(raw)) return raw;
  return ["A", "B", "C", "D"].find((letter) => raw === text(record[`option_${letter.toLowerCase()}`]).toUpperCase()) || "";
}

async function readWorkbook(name, spec) {
  const filename = path.join(projectRoot, spec.file);
  const entries = zipEntries(await readFile(filename));
  const sheetName = [...entries.keys()].filter((entry) => /^xl\/worksheets\/sheet\d+\.xml$/.test(entry)).sort()[0];
  if (!sheetName) throw new Error(`${spec.file}: no worksheet found.`);
  const rows = worksheetRows(entries.get(sheetName), sharedStrings(entries.get("xl/sharedStrings.xml")));
  const headers = (rows.shift() || []).map((value) => text(value));
  const missing = spec.required.filter((column) => !headers.includes(column));
  if (missing.length) throw new Error(`${spec.file}: missing required columns: ${missing.join(", ")}.`);

  const records = [];
  for (const values of rows) {
    const record = Object.fromEntries(headers.map((header, index) => [header, text(values[index])]));
    if (Object.values(record).some(Boolean)) records.push(record);
  }
  if (!records.length) throw new Error(`${spec.file}: no data rows found.`);
  return records;
}

function choices(record) {
  return ["A", "B", "C", "D"].map((letter) => ({ id: letter, text: text(record[`option_${letter.toLowerCase()}`]) }));
}

function learningQuestion(record, id, subject) {
  const answer = answerLetter(record);
  if (!answer) throw new Error(`${id}: correct_answer must resolve to A, B, C, or D.`);
  return {
    id,
    subject,
    topicId: record.topic_id || "",
    domain: record.domain || "",
    lessonTitle: record.lesson_title,
    ruleTitle: record.rule_title || "",
    formula: record.formula || "",
    difficulty: record.difficulty || "",
    question: record.question,
    choices: choices(record),
    answer,
    explanation: record.explanation,
  };
}

function examQuestion(record, id, subject) {
  const answer = answerLetter(record);
  if (!answer) throw new Error(`${id}: correct_answer must resolve to A, B, C, or D.`);
  return {
    id,
    subject,
    examId: record.exam_id,
    section: record.section,
    number: record.question_number,
    skill: record.skill,
    difficulty: record.difficulty,
    passage: record.passage,
    question: record.question,
    choices: choices(record),
    answer,
    explanation: record.explanation,
  };
}

const [mathTopics, mathLessons, mathPractice, englishTopics, englishLessons, englishPractice, mockEnglish, mockMath] = await Promise.all(
  Object.entries(WORKBOOKS).map(([name, spec]) => readWorkbook(name, spec)),
);

const content = {
  version: 1,
  learning: {
    Math: {
      topics: mathTopics,
      lessons: mathLessons.map((row, index) => ({ id: `math-lesson-${index + 1}`, subject: "Math", topicId: row.topic_id, domain: row.domain, title: row.lesson_title, formula: row.formula, example: row.example, explanation: row.explanation, difficulty: row.difficulty, arabic: row.arabic })),
      practice: mathPractice.map((row, index) => learningQuestion(row, `math-practice-${index + 1}`, "Math")),
    },
    English: {
      topics: englishTopics,
      lessons: englishLessons.map((row, index) => ({ id: `english-lesson-${index + 1}`, subject: "English", topicId: row.topic_id, title: row.lesson_title, ruleTitle: row.rule_title, explanation: row.explanation, example: row.example, tip: row.tip, difficulty: "" })),
      practice: englishPractice.map((row, index) => learningQuestion(row, `english-practice-${index + 1}`, "English")),
    },
  },
  exams: {
    English: mockEnglish.map((row, index) => examQuestion(row, `english-exam-${index + 1}`, "English")),
    Math: mockMath.map((row, index) => examQuestion(row, `math-exam-${index + 1}`, "Math")),
  },
};

const serialized = `${JSON.stringify(content, null, 2)}\n`;
if (checkOnly) {
  const current = await readFile(outputFile, "utf8").catch(() => "");
  if (current !== serialized) throw new Error("Generated SAT content is stale. Run: npm run content:build");
  console.log("SAT content is valid and current.");
} else {
  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, serialized, "utf8");
  console.log(`Generated ${path.relative(projectRoot, outputFile)} from ${Object.keys(WORKBOOKS).length} validated workbooks.`);
}
