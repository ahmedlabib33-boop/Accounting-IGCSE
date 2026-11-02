"use client";

import { useMemo, useState } from "react";
import { Icon, ProgressBar } from "./ui";
import { SORTERS, computeRatios } from "../_lib/lab-content.mjs";
import { SHOP, demandFor, playMonth, startShop, yearEndAccounts } from "../_lib/shop-sim.mjs";

const money = (value) => `${value < 0 ? "−" : ""}$${Math.abs(Math.round(value)).toLocaleString()}`;

function shuffled(list, seed) {
  const copy = [...list];
  let value = seed;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    value = (value * 9301 + 49297) % 233280;
    const j = Math.floor((value / 233280) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Drag-and-drop ledger builder: each item is checked the moment it is dropped.
export function LedgerBuilder({ log }) {
  const [setId, setSetId] = useState(SORTERS[0].id);
  const [round, setRound] = useState(1);
  const [placed, setPlaced] = useState({});
  const [picked, setPicked] = useState("");
  const [slips, setSlips] = useState(0);
  const [message, setMessage] = useState(null);
  const set = SORTERS.find((item) => item.id === setId);
  const answers = useMemo(() => Object.fromEntries(set.items), [set]);
  const pool = useMemo(() => shuffled(set.items.map(([name]) => name), round * 31 + set.items.length), [set, round]);
  const remaining = pool.filter((name) => !placed[name]);
  const finished = remaining.length === 0;
  const reset = (id = setId) => { setSetId(id); setPlaced({}); setPicked(""); setSlips(0); setMessage(null); setRound((value) => value + 1); };
  const drop = (zone, name) => {
    if (!name || placed[name]) return;
    setPicked("");
    if (answers[name] === zone) {
      const next = { ...placed, [name]: zone };
      setPlaced(next);
      setMessage({ good: true, text: `${name} → ${zone}. Correct.` });
      if (Object.keys(next).length === set.items.length) log("ledger-builder", set.id, slips === 0);
    } else {
      setSlips((value) => value + 1);
      setMessage({ good: false, text: `${name} does not belong in ${zone}. ${set.hint}` });
    }
  };
  return <div className="lab-panel">
    <div className="segmented sorter-sets">{SORTERS.map((item) => <button key={item.id} className={item.id === setId ? "selected" : ""} onClick={() => reset(item.id)}>{item.title}</button>)}</div>
    <p className="lab-instructions">Drag each item into its place, or tap an item and then tap the place. Each one is checked as you go. Section {set.section}.</p>
    {set.note && <p className="fine-print">{set.note}</p>}
    <div className="sorter-progress"><ProgressBar value={Object.keys(placed).length / set.items.length} label="Items placed" tone="lime"/><span>{Object.keys(placed).length} / {set.items.length} placed · {slips} slip{slips === 1 ? "" : "s"}</span></div>
    {!finished && <div className="chip-pool" aria-label="Items to place">{remaining.map((name) => <button key={name} draggable onDragStart={(event) => event.dataTransfer.setData("text/plain", name)} className={`account-chip${picked === name ? " picked" : ""}`} onClick={() => setPicked(picked === name ? "" : name)} aria-pressed={picked === name}>{name}</button>)}</div>}
    {message && <div className={message.good ? "feedback good" : "feedback"} aria-live="polite">{message.text}</div>}
    <div className={`sorter-zones zones-${set.zones.length}`}>{set.zones.map((zone) => <div key={zone} role="button" tabIndex={0} className={`sorter-zone${picked ? " ready" : ""}`} onClick={() => drop(zone, picked)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); drop(zone, picked); } }} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); drop(zone, event.dataTransfer.getData("text/plain")); }} aria-label={`${zone}${picked ? `: place ${picked} here` : ""}`}>
      <h4>{zone}</h4>{set.items.filter(([name]) => placed[name] === zone).map(([name]) => <span key={name} className="placed-item"><Icon name="check" size={14}/>{name}</span>)}
    </div>)}</div>
    {finished && <div className="feedback good" aria-live="polite">{slips === 0 ? "Perfect build: no slips at all." : `Built, with ${slips} slip${slips === 1 ? "" : "s"} on the way. Try it again for a clean run.`} <button className="text-button" onClick={() => reset()}>Shuffle and go again</button></div>}
  </div>;
}

function Statement({ title, rows }) {
  return <div className="sim-statement"><h4>{title}</h4>{rows.map(([label, value, strong]) => <div key={label} className={strong ? "total" : ""}><span>{label}</span><b>{value}</b></div>)}</div>;
}

// Run a small shop for a year, then produce the accounts from your own transactions.
export function ShopSimulation({ log, openSection }) {
  const [state, setState] = useState(startShop);
  const [decision, setDecision] = useState({ buy: 70, price: SHOP.basePrice, drawings: 0, onCredit: false });
  const [showJournal, setShowJournal] = useState(false);
  const last = state.history.at(-1);
  const set = (key, value) => setDecision((current) => ({ ...current, [key]: value }));
  const play = () => { const next = playMonth(state, decision); setState(next); if (next.done) log("simulation", "year", yearEndAccounts(next).profit > 0); };
  const accounts = state.done ? yearEndAccounts(state) : null;
  const ratios = accounts ? computeRatios(accounts.ratioInput).filter((ratio) => ["gm", "mu", "pm", "roce", "cr", "at", "rd", "pd"].includes(ratio.id)) : [];
  const monthEntries = state.journal.filter((entry) => entry.month === state.month - 1 && state.month > 0);
  return <div className="lab-panel">
    <div className="lab-task"><span className="red-tag">{SHOP.name.toUpperCase()}</span><h3>{state.done ? "Year complete. Here are your accounts." : `${SHOP.months[state.month]}: month ${state.month + 1} of 12`}</h3><p className="muted-line">You start with ${SHOP.capital.toLocaleString()} capital in the bank. Sneakers cost ${SHOP.unitCost} a pair from the supplier, rent is ${SHOP.rent} and wages ${SHOP.wages} a month, and {Math.round(SHOP.creditShare * 100)}% of sales are on credit (customers pay next month). Credit purchases are paid the month after.</p></div>
    <div className="sim-status">{[["Bank", money(state.bank), state.bank < 0], ["Pairs in stock", state.inventory], ["Trade receivables", money(state.receivables)], ["Trade payables", money(state.payables)]].map(([label, value, alert]) => <div key={label} className={alert ? "alert" : ""}><span>{label}</span><strong>{value}</strong></div>)}</div>
    {last && !state.done && <div className={last.lostSales > 0 ? "feedback" : "feedback good"}>{SHOP.months[last.month]}: {last.demand} customers wanted sneakers at ${last.price} and you sold {last.sold}{last.lostSales > 0 ? `. You ran out and lost ${last.lostSales} sales.` : "."} Revenue {money(last.revenue)}.</div>}
    {!state.done && <div className="sim-controls">
      <label>Pairs to buy<input type="number" min="0" max="400" value={decision.buy} onChange={(event) => set("buy", event.target.value)}/></label>
      <label>Selling price ($)<input type="number" min="1" max="200" value={decision.price} onChange={(event) => set("price", event.target.value)}/><small>About {demandFor(Number(decision.price) || 1, state.month)} customers expected</small></label>
      <label>Drawings ($)<input type="number" min="0" max="5000" step="50" value={decision.drawings} onChange={(event) => set("drawings", event.target.value)}/></label>
      <label className="switch-row"><span>Buy on credit</span><input type="checkbox" role="switch" checked={decision.onCredit} onChange={(event) => set("onCredit", event.target.checked)}/></label>
      <button className="primary-button compact-primary" onClick={play}>Run {SHOP.months[state.month]} <Icon name="play" size={16}/></button>
    </div>}
    {monthEntries.length > 0 && !state.done && <div className="sim-journal"><h4>This month&apos;s double entries</h4>{monthEntries.map((entry, index) => <div key={index}><span>{entry.text}</span><em>Dr {entry.debit} · Cr {entry.credit}</em><b>{money(entry.amount)}</b></div>)}</div>}
    {accounts && <>
      <div className="sim-accounts">
        <Statement title={`Income statement for the year`} rows={[["Revenue", money(accounts.revenue)], ["Purchases", money(accounts.purchases)], ["Less closing inventory", `(${money(accounts.closingInventory)})`], ["Cost of sales", money(accounts.costOfSales)], ["Gross profit", money(accounts.grossProfit), true], ["Less rent", `(${money(accounts.rent)})`], ["Less wages", `(${money(accounts.wages)})`], [accounts.profit >= 0 ? "Profit for the year" : "Loss for the year", money(accounts.profit), true]]}/>
        <Statement title="Statement of financial position at year end" rows={[["Inventory", money(accounts.closingInventory)], ["Trade receivables", money(accounts.receivables)], ["Bank", money(accounts.bank)], ["Current assets", money(accounts.currentAssets), true], ["Trade payables", `(${money(accounts.payables)})`], ...(accounts.overdraft ? [["Bank overdraft", `(${money(accounts.overdraft)})`]] : []), ["Net assets", money(accounts.currentAssets - accounts.currentLiabilities), true], ["Opening capital", money(accounts.openingCapital)], ["Add profit", money(accounts.profit)], ["Less drawings", `(${money(accounts.drawings)})`], ["Closing capital", money(accounts.closingCapital), true]]}/>
      </div>
      <p className={accounts.balances ? "feedback good" : "feedback"}>{accounts.balances ? "Net assets equal closing capital, so the statement balances." : "The statement does not balance. Please report this."} Every figure above comes from your own {state.journal.length} transactions.</p>
      <div className="ratio-grid">{ratios.map((ratio) => <div key={ratio.id} className="ratio-card"><span>{ratio.name}</span><strong>{ratio.value === null ? "—" : ratio.unit === ":1" ? `${ratio.value} : 1` : `${ratio.value}${ratio.unit}`}</strong><code>{ratio.formula}</code><small>{ratio.read}</small></div>)}</div>
      <div className="ratio-actions"><button className="outline-button compact-button" onClick={() => openSection("5.1")}>Lesson: sole trader statements (5.1)</button><button className="outline-button compact-button" onClick={() => openSection("6.2")}>Lesson: interpreting ratios (6.2)</button><button className="primary-button compact-primary" onClick={() => { setState(startShop()); setShowJournal(false); }}>Play another year</button></div>
    </>}
    {state.journal.length > 1 && <button className="text-button" onClick={() => setShowJournal((value) => !value)}>{showJournal ? "Hide" : "Show"} the full journal ({state.journal.length} entries)</button>}
    {showJournal && <div className="sim-journal">{state.journal.map((entry, index) => <div key={index}><span>{entry.text}</span><em>Dr {entry.debit} · Cr {entry.credit}</em><b>{money(entry.amount)}</b></div>)}</div>}
  </div>;
}
