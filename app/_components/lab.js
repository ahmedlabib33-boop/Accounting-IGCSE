"use client";

import { useMemo, useState } from "react";
import { FeaturePage, Icon } from "./ui";
import { celebrate } from "./effects";
import { COMMAND_DRILLS, COMMAND_WORDS, DOUBLE_ENTRY, FIND_ERROR, RATIO_EXAMPLE, RATIO_FIELDS, computeRatios } from "../_lib/lab-content.mjs";
import { withExtras } from "../_lib/study-engine.mjs";
import { LedgerBuilder, ShopSimulation } from "./lab-extra";

function shuffle(list, seed) {
  const copy = [...list];
  let value = seed;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    value = (value * 9301 + 49297) % 233280;
    const j = Math.floor((value / 233280) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function useLabLog(setStudy, settings) {
  return (tool, id, correct) => {
    setStudy((current) => { const study = withExtras(current); return { ...study, labLog: [...study.labLog, { tool, id, correct, date: new Date().toISOString() }].slice(-3000) }; });
    if (correct) celebrate(settings);
  };
}

function Stepper({ index, total, onPrev, onNext, label }) {
  return <div className="lab-stepper"><button className="outline-button compact-button" onClick={onPrev} disabled={index === 0}>Previous</button><span>{label} {index + 1} of {total}</span><button className="outline-button compact-button" onClick={onNext} disabled={index === total - 1}>Next</button></div>;
}

function DoubleEntryBuilder({ log }) {
  const [index, setIndex] = useState(0);
  const [slots, setSlots] = useState({ debit: "", credit: "" });
  const [picked, setPicked] = useState("");
  const [checked, setChecked] = useState(false);
  const task = DOUBLE_ENTRY[index];
  const chips = useMemo(() => shuffle(task.options, index + 7), [task, index]);
  const place = (side, account) => { if (checked || !account) return; setSlots((current) => ({ ...Object.fromEntries(Object.entries(current).map(([key, value]) => [key, value === account ? "" : value])), [side]: account })); setPicked(""); };
  const go = (next) => { setIndex(next); setSlots({ debit: "", credit: "" }); setPicked(""); setChecked(false); };
  const check = () => { setChecked(true); log("double-entry", task.id, slots.debit === task.debit && slots.credit === task.credit); };
  const slotState = (side) => !checked ? "" : slots[side] === task[side] ? "right" : "wrong";
  return <div className="lab-panel">
    <p className="lab-instructions">Drag each account into the Debit or Credit side, or tap an account and then tap a side.</p>
    <div className="lab-task"><span className="red-tag">TRANSACTION {index + 1}</span><h3>{task.text}</h3></div>
    <div className="chip-pool" aria-label="Accounts">{chips.map((account) => { const used = Object.values(slots).includes(account); return <button key={account} draggable={!checked} onDragStart={(event) => event.dataTransfer.setData("text/plain", account)} className={`account-chip${picked === account ? " picked" : ""}${used ? " used" : ""}`} onClick={() => setPicked(picked === account ? "" : account)} disabled={checked}>{account}</button>; })}</div>
    <div className="t-account" aria-label="T-account">
      {["debit", "credit"].map((side) => <button key={side} className={`t-side ${slotState(side)}`} onClick={() => place(side, picked)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); place(side, event.dataTransfer.getData("text/plain")); }} aria-label={`${side} side${slots[side] ? `: ${slots[side]}` : ", empty"}`}>
        <span className="t-label">{side === "debit" ? "Debit (Dr)" : "Credit (Cr)"}</span>
        <strong>{slots[side] || (picked ? "Tap to place here" : "Drop an account here")}</strong>
        {checked && slots[side] !== task[side] && <small>Correct: {task[side]}</small>}
      </button>)}
    </div>
    {!checked ? <button className="primary-button compact-primary" disabled={!slots.debit || !slots.credit} onClick={check}>Check entry <Icon name="check" size={18}/></button>
      : <div className={slots.debit === task.debit && slots.credit === task.credit ? "feedback good" : "feedback"} aria-live="polite">{slots.debit === task.debit && slots.credit === task.credit ? "Balanced! " : "Not yet. "}{task.why}</div>}
    <Stepper index={index} total={DOUBLE_ENTRY.length} label="Transaction" onPrev={() => go(index - 1)} onNext={() => go(index + 1)}/>
  </div>;
}

function FindTheError({ log }) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const puzzle = FIND_ERROR[index];
  const go = (next) => { setIndex(next); setChoice(null); };
  const pick = (row) => { if (choice !== null) return; setChoice(row); log("find-error", puzzle.id, row === puzzle.wrong); };
  return <div className="lab-panel">
    <div className="lab-task"><span className="red-tag">PUZZLE {index + 1} · {puzzle.title.toUpperCase()}</span><h3>{puzzle.context}</h3><p className="muted-line">Tap the line that is wrong.</p></div>
    <div className="error-table" role="table">
      <div className="error-row head" role="row">{puzzle.columns.map((column) => <span key={column} role="columnheader">{column}</span>)}</div>
      {puzzle.rows.map((row, rowIndex) => { const state = choice === null ? "" : rowIndex === puzzle.wrong ? "is-wrong" : rowIndex === choice ? "picked-wrong" : ""; return <button key={rowIndex} role="row" className={`error-row ${state}`} style={{ gridTemplateColumns: `repeat(${puzzle.columns.length}, minmax(0, 1fr))` }} onClick={() => pick(rowIndex)} disabled={choice !== null}>{row.map((cell, cellIndex) => <span key={cellIndex} role="cell">{cell}</span>)}</button>; })}
    </div>
    {choice !== null && <div className={choice === puzzle.wrong ? "feedback good" : "feedback"} aria-live="polite">{choice === puzzle.wrong ? "Spotted it. " : "That line is fine. The error is the highlighted line. "}{puzzle.why}</div>}
    <Stepper index={index} total={FIND_ERROR.length} label="Puzzle" onPrev={() => go(index - 1)} onNext={() => go(index + 1)}/>
  </div>;
}

function CommandTrainer({ log }) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const drill = COMMAND_DRILLS[index];
  const go = (next) => { setIndex(next); setChoice(null); };
  const pick = (option) => { if (choice !== null) return; setChoice(option); log("command", drill.id, option === drill.answer); };
  return <div className="lab-panel">
    <div className="command-grid">{COMMAND_WORDS.map((word) => <div key={word.word} className={word.word === drill.word ? "command-card active" : "command-card"}><strong>{word.word}</strong><span>{word.meaning}</span><em lang="ar">{word.arabic}</em></div>)}</div>
    <div className="lab-task"><span className="red-tag">DRILL {index + 1} · COMMAND WORD: {drill.word.toUpperCase()}</span><h3>{drill.question}</h3><p className="muted-line">What does a full-mark answer need?</p></div>
    <div className="answer-list single">{drill.options.map((option, optionIndex) => { const state = choice === null ? "" : optionIndex === drill.answer ? "correct" : optionIndex === choice ? "wrong" : ""; return <button key={option} className={state} onClick={() => pick(optionIndex)} disabled={choice !== null}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>; })}</div>
    {choice !== null && <div className={choice === drill.answer ? "feedback good" : "feedback"} aria-live="polite">{choice === drill.answer ? "Exactly. " : "Not quite. "}{drill.why}</div>}
    <Stepper index={index} total={COMMAND_DRILLS.length} label="Drill" onPrev={() => go(index - 1)} onNext={() => go(index + 1)}/>
  </div>;
}

function RatioCalculator({ openSection }) {
  const [values, setValues] = useState(RATIO_EXAMPLE);
  const ratios = computeRatios(values);
  const groups = [...new Set(ratios.map((ratio) => ratio.group))];
  return <div className="lab-panel">
    <p className="lab-instructions">Type the figures from a question. The example figures are filled in so you can see how it works.</p>
    <div className="ratio-inputs">{RATIO_FIELDS.map(([key, label]) => <label key={key}>{label}<input id={`ratio-${key}`} inputMode="decimal" value={values[key] ?? ""} onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value.replace(/[^\d.-]/g, "") }))}/></label>)}</div>
    <div className="ratio-actions"><button className="outline-button compact-button" onClick={() => setValues(RATIO_EXAMPLE)}>Use example figures</button><button className="outline-button compact-button" onClick={() => setValues(Object.fromEntries(RATIO_FIELDS.map(([key]) => [key, ""])))}>Clear all</button></div>
    {groups.map((group) => <div key={group} className="ratio-group"><h3>{group}</h3><div className="ratio-grid">{ratios.filter((ratio) => ratio.group === group).map((ratio) => <div key={ratio.id} className="ratio-card">
      <span>{ratio.name}</span>
      <strong>{ratio.value === null ? "—" : `${ratio.unit === ":1" ? `${ratio.value} : 1` : `${ratio.value.toLocaleString()}${ratio.unit}`}`}</strong>
      <code>{ratio.formula}</code>
      <p>{ratio.meaning}</p>
      <small>{ratio.read}</small>
    </div>)}</div></div>)}
    <div className="ratio-actions"><button className="outline-button compact-button" onClick={() => openSection("6.1")}>Lesson: calculating ratios (6.1)</button><button className="outline-button compact-button" onClick={() => openSection("6.2")}>Lesson: interpreting ratios (6.2)</button></div>
  </div>;
}

const TOOLS = [
  ["double-entry", "Double-entry builder"],
  ["ledger-builder", "Ledger builder"],
  ["find-error", "Find the error"],
  ["command", "Command words"],
  ["ratios", "Ratio calculator"],
  ["simulation", "Shop simulation"],
];

export function LabPage({ study, setStudy, openSection }) {
  const [tool, setTool] = useState("double-entry");
  const log = useLabLog(setStudy, withExtras(study).settings);
  const solved = (name) => withExtras(study).labLog.filter((item) => item.tool === name && item.correct).length;
  return <FeaturePage eyebrow="Practice Lab" title="Learn it with your hands." description="Build entries and statements, hunt for errors, train for command words, test ratios and run a shop for a year. Every correct answer earns 20 XP.">
    <div className="segmented lab-tabs">{TOOLS.map(([id, label]) => <button key={id} className={tool === id ? "selected" : ""} onClick={() => setTool(id)}>{label}{id !== "ratios" && id !== "simulation" && <small> · {solved(id)}</small>}</button>)}</div>
    {tool === "double-entry" && <DoubleEntryBuilder log={log}/>}
    {tool === "find-error" && <FindTheError log={log}/>}
    {tool === "command" && <CommandTrainer log={log}/>}
    {tool === "ratios" && <RatioCalculator openSection={openSection}/>}
    {tool === "ledger-builder" && <LedgerBuilder log={log}/>}
    {tool === "simulation" && <ShopSimulation log={log} openSection={openSection}/>}
  </FeaturePage>;
}
