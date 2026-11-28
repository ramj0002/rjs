"use client";
import { useState } from "react";
import runs from "@/content/tilemap-runs.json";

// The six levels the agent built in its first evaluation run, drawn from the real run files,
// scored by either the original checker (v1) or the fixed one (v2).
type Case = { id: string; prompt: string; steps: number; errors: number; w: number; h: number; cells: [number, number, string][]; v1: [string, boolean, string][]; v2: [string, boolean, string][] };
const CASES = runs as Case[];

const NAMES: Record<string, string> = {
  has_start: "has a start", has_exit: "has an exit", start_on_solid: "start stands on ground", exit_on_solid: "exit stands on ground",
  exit_reachable: "exit can be reached", has_pit: "pit is wide enough", platforms: "enough floating ledges",
  hazards: "enough spikes", exit_higher: "exit is higher than start", exit_higher_than_start: "exit is higher than start",
};

export default function TilemapViewer() {
  const [i, setI] = useState(2); // "two-ledges", the case the checker got wrong
  const [v, setV] = useState<"v1" | "v2">("v1");
  const c = CASES[i];
  const grid: Record<string, string> = {};
  c.cells.forEach(([x, y, t]) => (grid[`${x},${y}`] = t));
  const checks = c[v];
  const pass = checks.every((k) => k[1]);
  const score = (ver: "v1" | "v2") => CASES.filter((k) => k[ver].every((x) => x[1])).length;

  return (
    <div className="tv">
      <div className="tv-top">
        <div className="tv-cases" role="tablist" aria-label="Levels">
          {CASES.map((k, n) => (
            <button key={k.id} role="tab" aria-selected={n === i} className={`${n === i ? "on" : ""} ${k[v].every((x) => x[1]) ? "" : "fail"}`} onClick={() => setI(n)}>
              {k.id.replace(/-/g, " ")}
            </button>
          ))}
        </div>
        <div className="tv-ver" role="group" aria-label="Checker version">
          <span><em>scored by</em></span>
          <button className={v === "v1" ? "on" : ""} aria-pressed={v === "v1"} onClick={() => setV("v1")}>original checker · {score("v1")}/6</button>
          <button className={v === "v2" ? "on" : ""} aria-pressed={v === "v2"} onClick={() => setV("v2")}>fixed checker · {score("v2")}/6</button>
        </div>
      </div>

      <p className="tv-prompt"><em>request</em> “{c.prompt}”</p>

      <div className="tv-body">
        <div className="tv-map" style={{ gridTemplateColumns: `repeat(${c.w}, 1fr)` }} role="img" aria-label={`Level ${c.id}`}>
          {Array.from({ length: c.h }, (_, r) => c.h - 1 - r).map((y) =>
            Array.from({ length: c.w }, (_, x) => {
              const t = grid[`${x},${y}`];
              return <span key={`${x},${y}`} className={`tv-c ${t ? "t-" + t : ""}`}>{t === "s" ? "S" : t === "e" ? "E" : ""}</span>;
            })
          )}
        </div>
        <div className="tv-checks">
          <p className={`display tv-verdict ${pass ? "ok" : "no"}`}>{pass ? "pass" : "fail"}</p>
          <p className="tv-meta"><em>{c.steps} tool calls · {c.errors} tool errors</em></p>
          <ul>
            {checks.map(([name, ok, detail]) => (
              <li key={name} className={ok ? "ok" : "no"}>
                <b>{ok ? "✓" : "✕"}</b>
                <span>{NAMES[name] ?? name.replace(/_/g, " ")}<em>{detail}</em></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="tv-key">
        <span><i className="t-g" /> ground</span><span><i className="t-p" /> platform</span><span><i className="t-h" /> spikes</span>
        <span><i className="t-s" /> start</span><span><i className="t-e" /> exit</span>
      </p>
    </div>
  );
}
