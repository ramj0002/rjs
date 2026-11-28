"use client";
import { useState } from "react";

// Charts for the few-shot page. Colours validated with the dataviz palette checker:
// ordinal pair #a77bd0 → #5b2a86 (fewer → more), diverging pair #257de0 (up) / #e0582a (down).

type Tip = { x: number; y: number; text: string } | null;

function useTip() {
  const [tip, setTip] = useState<Tip>(null);
  const on = (e: React.MouseEvent | React.FocusEvent, text: string) => {
    const host = (e.currentTarget as Element).closest(".fc")!.getBoundingClientRect();
    const r = (e.currentTarget as Element).getBoundingClientRect();
    setTip({ x: r.left + r.width / 2 - host.left, y: r.top - host.top, text });
  };
  const off = () => setTip(null);
  const el = tip && <div className="fc-tip" style={{ left: tip.x, top: tip.y }}>{tip.text}</div>;
  return { on, off, el };
}

// One row per dataset: a dot for each condition joined by a line, on a 0–100% scale.
export function Dumbbell({ rows, a, b, chance, unit = "%" }: {
  rows: { name: string; sub?: string; a: number; b: number }[];
  a: string; b: string; chance?: number; unit?: string;
}) {
  const { on, off, el } = useTip();
  const pos = (v: number) => `${v}%`;
  return (
    <figure className="fc fc-db">
      <figcaption className="fc-legend">
        <span><i className="dot a" /> {a}</span>
        <span><i className="dot b" /> {b}</span>
        {chance !== undefined && <span><i className="chance" /> guessing ({chance}{unit})</span>}
      </figcaption>
      <div className="fc-db-rows">
        {rows.map((r) => {
          const lo = Math.min(r.a, r.b), hi = Math.max(r.a, r.b), gain = r.b - r.a;
          return (
            <div key={r.name} className="fc-db-row">
              <div className="fc-db-name"><b className="display">{r.name}</b>{r.sub && <em>{r.sub}</em>}</div>
              <div className="fc-db-track">
                {chance !== undefined && <span className="fc-chance" style={{ left: pos(chance) }} />}
                <span className="fc-db-line" style={{ left: pos(lo), width: `${hi - lo}%` }} />
                {([["a", r.a, a], ["b", r.b, b]] as const).map(([k, v, label]) => (
                  <button key={k} type="button" className={`fc-db-dot ${k}`} style={{ left: pos(v) }}
                    aria-label={`${r.name}, ${label}: ${v.toFixed(1)}${unit}`}
                    onMouseEnter={(e) => on(e, `${label}: ${v.toFixed(1)}${unit}`)} onMouseLeave={off}
                    onFocus={(e) => on(e, `${label}: ${v.toFixed(1)}${unit}`)} onBlur={off} />
                ))}
                <span className="fc-db-val a" style={{ left: pos(r.a) }}>{Math.round(r.a)}</span>
                <span className="fc-db-val b" style={{ left: pos(r.b) }}>{Math.round(r.b)}</span>
              </div>
              <div className="fc-db-gain"><b className="display">{gain > 0 ? "+" : ""}{gain.toFixed(1)}</b><em>points</em></div>
            </div>
          );
        })}
        <div className="fc-db-row fc-axis" aria-hidden>
          <div />
          <div className="fc-db-track">{[0, 25, 50, 75, 100].map((t) => <span key={t} style={{ left: `${t}%` }}>{t}{unit}</span>)}</div>
          <div />
        </div>
      </div>
      {el}
    </figure>
  );
}

// Change from the no-noise baseline, in percentage points, for each noise strength.
export function DeltaBars({ rows, heads }: { rows: { name: string; vals: number[] }[]; heads: string[] }) {
  const { on, off, el } = useTip();
  const max = 8; // ±8 points fills a cell
  return (
    <figure className="fc fc-dl">
      <figcaption className="fc-legend">
        <span><i className="sw down" /> worse than no noise</span>
        <span><i className="sw up" /> better than no noise</span>
      </figcaption>
      <div className="fc-dl-grid" style={{ gridTemplateColumns: `200px repeat(${heads.length - 1}, minmax(0, 1fr))` }}>
        <div />
        {heads.slice(1).map((h) => <div key={h} className="fc-dl-head"><em>noise {h}</em></div>)}
        {rows.map((r) => (
          <div key={r.name} className="fc-dl-row" style={{ display: "contents" }}>
            <div className="fc-dl-name"><b className="display">{r.name}</b><em>{r.vals[0].toFixed(1)}% with no noise</em></div>
            {r.vals.slice(1).map((v, i) => {
              const d = v - r.vals[0];
              const w = Math.min(50, (Math.abs(d) / max) * 50);
              const text = `${r.name}, noise ${heads[i + 1]}: ${v.toFixed(1)}% (${d > 0 ? "+" : ""}${d.toFixed(1)} points)`;
              return (
                <button key={i} type="button" className="fc-dl-cell" aria-label={text}
                  onMouseEnter={(e) => on(e, text)} onMouseLeave={off} onFocus={(e) => on(e, text)} onBlur={off}>
                  <span className="fc-dl-zero" />
                  <span className={`fc-dl-bar ${d < 0 ? "down" : "up"}`} style={d < 0 ? { right: "50%", width: `${w}%` } : { left: "50%", width: `${w}%` }} />
                  <b className={`fc-dl-num ${d < 0 ? "down" : "up"}`}>{d > 0 ? "+" : ""}{d.toFixed(1)}</b>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <details className="fc-table">
        <summary>see the numbers</summary>
        <table>
          <thead><tr><th>dataset</th>{heads.map((h) => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r) => <tr key={r.name}><th>{r.name}</th>{r.vals.map((v, i) => <td key={i}>{v.toFixed(2)}%</td>)}</tr>)}</tbody>
        </table>
      </details>
      {el}
    </figure>
  );
}
