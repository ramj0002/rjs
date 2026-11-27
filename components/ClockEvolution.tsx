"use client";
import { useEffect, useRef, useState } from "react";

// The IKEA clock evolving into something new, changing one part per iteration.
// Steps through the seven clocks in the render, spotlighting one at a time.

const STEPS = [
  { x: [0, 13.3], text: "The original TJINGA clock" },
  { x: [13.3, 23.5], text: "The snooze button moves to the front corner" },
  { x: [23.5, 38], text: "The body stretches wider" },
  { x: [38, 53.3], text: "It’s lifted onto a tapered stand" },
  { x: [53.3, 68], text: "The stand becomes a post on a square base" },
  { x: [68, 82.8], text: "The post slims down onto a round base" },
  { x: [82.8, 100], text: "The body softens into a rounded pill" },
];

export default function ClockEvolution({ src }: { src: string }) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!auto) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id);
      if (e.isIntersecting) id = setInterval(() => setI((k) => (k + 1) % STEPS.length), 1700);
    }, { threshold: 0.5 });
    io.observe(ref.current!);
    return () => { io.disconnect(); clearInterval(id); };
  }, [auto]);

  const pick = (k: number) => { setAuto(false); setI(k); };
  const s = STEPS[i];

  return (
    <div className="ev" ref={ref}>
      <div className="ev-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="Seven versions of the clock, each changing one part from the last" />
        {STEPS.map((t, k) => (
          <button key={k} className={`ev-spot ${k === i ? "on" : ""}`} style={{ left: `${t.x[0]}%`, width: `${t.x[1] - t.x[0]}%` }}
            onClick={() => pick(k)} onMouseEnter={() => pick(k)} aria-label={`Step ${k + 1}: ${t.text}`} />
        ))}
      </div>
      <div className="ev-steps">
        {STEPS.map((t, k) => (
          <button key={k} className={k === i ? "on" : ""} onClick={() => pick(k)} aria-pressed={k === i}
            style={{ left: `calc(${t.x[0]}% + 4px)`, width: `calc(${t.x[1] - t.x[0]}% - 8px)` }}>
            <span className="display">{String(k + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
      <p className="ev-text" aria-live="polite"><b className="display">{String(i + 1).padStart(2, "0")}</b> {s.text}</p>
    </div>
  );
}
