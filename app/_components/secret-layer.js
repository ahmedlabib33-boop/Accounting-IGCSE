"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "./brand-mark";
import { Icon } from "./ui";

// A hidden layer. It opens only from a physical keyboard (laptop or desktop, not a phone) when the
// digits 1 2 3 6 5 4 are typed in order outside any text field. Escape or the close button hides it.
const CODE = "123654";

const hasKeyboard = () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(max-width: 640px)").matches;

export function SecretLayer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let typed = "";
    const onKey = (event) => {
      if (event.key === "Escape") { setOpen(false); return; }
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable)) return;
      if (!/^[0-9]$/.test(event.key)) return;
      if (!hasKeyboard()) return;
      typed = (typed + event.key).slice(-CODE.length);
      if (typed === CODE) { typed = ""; setOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;
  return <div className="secret-backdrop" onClick={() => setOpen(false)}>
    <article className="secret-card" role="dialog" aria-modal="true" aria-label="For Beso, from Beba" onClick={(event) => event.stopPropagation()}>
      <button className="tiny-icon secret-close" onClick={() => setOpen(false)} aria-label="Close"><Icon name="x" size={18}/></button>
      <header><BrandMark size={46}/><div><span>IGCSE ACCOUNTING · CAMBRIDGE 0452</span><h2>For Beso, from Beba</h2></div></header>
      <p>Beso, I built this entire platform for you as my way of saying <b>I&apos;m sorry</b>. Every lesson, every mock exam, and the live classroom are all <b>yours to run however you want</b>. I genuinely wish you <b>nothing but success</b>.</p>
      <p>And with that, Beso, I feel like I&apos;ve done my part and <b>made up for my mistake</b>. Yeah, I messed up and let your secret slip, and <b>I own that</b>. But I swear to God, <b>I never made you look bad</b>. Quite the opposite, actually. I was saying <b>nothing but good things about you</b>.</p>
      <p>And to make things right, I genuinely put a <b>crazy amount of time and effort</b> into this. And I mean <b>A LOT</b>. I really <b>gave it my all</b>, and I think <b>the platform speaks for itself</b>.</p>
      <p><b>I just hope you can see that.</b></p>
      <footer>— Beba</footer>
    </article>
  </div>;
}
