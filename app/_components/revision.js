"use client";

import { useEffect, useMemo, useState } from "react";
import { FeaturePage, Icon, fetchJson } from "./ui";
import { TOPICS } from "../_lib/study-engine.mjs";

// The revision page: one-page section summaries, an A–Z glossary, the formula sheet, the printable
// handbook, and the Edexcel 4AC1 map for students sitting the Pearson paper.

const TABS = [["summaries", "Section summaries"], ["glossary", "Glossary"], ["formulas", "Formula sheet"], ["edexcel", "Edexcel 4AC1"]];

export function RevisionPage({ go, study }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("summaries");
  const [search, setSearch] = useState("");
  useEffect(() => { fetchJson("/api/content?type=revision").then(setData).catch((e) => setError(e.message)); }, []);
  const glossary = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return (data?.glossary || []).filter((item) => !needle || item.term.toLowerCase().includes(needle) || item.definition.toLowerCase().includes(needle));
  }, [data, search]);
  const openSection = (section) => go("learning", { section });
  return <FeaturePage eyebrow="Revision" title="Everything on one page." description="Section summaries, every key term, the formula sheet and the Edexcel map. Built from the same study guides you learn from, so nothing here is new on exam day.">
    <nav className="guide-tabs revision-tabs" role="tablist">{TABS.map(([id, label]) => <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}>{label}</button>)}
      <a className="outline-button compact-button" href="/accounting-revision.html" target="_blank" rel="noreferrer">Printable handbook <Icon name="external" size={15}/></a></nav>
    {error && <p className="coach-error">{error}</p>}
    {!data && !error && <div className="loading-panel">Loading revision material…</div>}
    {data && tab === "summaries" && <div className="revision-summaries">{TOPICS.map((topic) => <section key={topic.id}><h2>{topic.id}. {topic.name}</h2>{data.summaries.filter((s) => s.topicId === topic.id).map((s) => {
      const done = (study?.completedLessons || []).length;
      return <article key={s.section} className="revision-card"><header><span>{s.section}</span><h3>{s.title}</h3></header><p>{s.summary}</p><ul>{s.objectives.map((o) => <li key={o}>{o}</li>)}</ul><button className="text-button" onClick={() => openSection(s.section)} data-done={done}>Open the lesson and study guide <Icon name="arrow" size={14}/></button></article>;
    })}</section>)}</div>}
    {data && tab === "glossary" && <div className="revision-glossary">
      <div className="admin-search"><Icon name="target" size={16}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${data.glossary.length} terms…`}/></div>
      <dl>{glossary.map((item) => <div key={`${item.section}-${item.term}`}><dt>{item.term} <small>{item.section}</small></dt><dd>{item.definition}</dd></div>)}</dl>
      {!glossary.length && <p className="muted-line">No term matches that search.</p>}
    </div>}
    {data && tab === "formulas" && <div className="revision-formulas">{data.formulas.map((group) => <section key={group.group}><h2>{group.group}</h2><div className="guide-table"><table><thead><tr><th>Measure</th><th>Formula</th><th>Remember</th></tr></thead><tbody>{group.items.map((f) => <tr key={f.name}><td>{f.name}</td><td className="formula-cell">{f.formula}</td><td>{f.note}</td></tr>)}</tbody></table></div></section>)}</div>}
    {data && tab === "edexcel" && data.edexcel && <div className="revision-edexcel">
      <p className="lesson-tip">{data.edexcel.qualification}: {data.edexcel.exam} {data.edexcel.coverage}</p>
      <div className="guide-table"><table><thead><tr><th>Edexcel area</th><th>Taught in</th><th>What to note</th></tr></thead><tbody>{data.edexcel.areas.map((a) => <tr key={a.area}><td>{a.area}</td><td>{a.sections.map((s) => <button key={s} className="text-button" onClick={() => openSection(s)}>{s}</button>)}</td><td>{a.notes}</td></tr>)}</tbody></table></div>
      <h2>Edexcel-only extras</h2>
      {data.edexcel.extras.map((x) => <article key={x.title} className="revision-card"><h3>{x.title}</h3><p>{x.body}</p></article>)}
    </div>}
  </FeaturePage>;
}
