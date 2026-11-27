"use client";
import { useState } from "react";

// Take the clock apart: pick a part to see what it's made of and why it's designed that way.
type Part = { name: string; material: string; points: string[] };

export default function ClockParts({ parts }: { parts: Part[] }) {
  const [i, setI] = useState(0);
  const p = parts[i];
  return (
    <div className="cp">
      <div className="cp-list" role="tablist" aria-label="Clock parts">
        {parts.map((q, k) => (
          <button key={q.name} role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => setI(k)}>
            <span className="num display">{String(k + 1).padStart(2, "0")}</span>
            <span className="display">{q.name}</span>
          </button>
        ))}
      </div>
      <div className="cp-detail" key={p.name} aria-live="polite">
        <p className="cp-mat"><em>made of</em> <b className="display">{p.material}</b></p>
        <ul>
          {p.points.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>
    </div>
  );
}
