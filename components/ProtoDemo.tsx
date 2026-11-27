"use client";
import { useEffect, useMemo, useRef, useState } from "react";

// How a Prototypical Network decides, in 2D.
// Five classes of points. Each class's prototype is the average of its K support examples (the big rings).
// Every spot on the map is coloured by its nearest prototype; query points are scored against it.
// "Compact" behaves like OrganAMNIST (well-separated clusters), "overlapping" like DermaMNIST.

const COLORS = ["#7b3fa0", "#e0457b", "#2f8fd8", "#f0a020", "#2fae7a"];
const W = 640, H = 420;

function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}
function gauss(r: () => number) {
  return Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r());
}

export default function ProtoDemo() {
  const [shots, setShots] = useState<1 | 5>(1);
  const [mode, setMode] = useState<"compact" | "overlap">("compact");
  const [seed, setSeed] = useState(3);
  const canvas = useRef<HTMLCanvasElement>(null);

  const data = useMemo(() => {
    const r = rng(seed * 97 + (mode === "compact" ? 1 : 2));
    // class centres on a ring; overlapping classes sit closer and spread wider
    const ringR = mode === "compact" ? 140 : 70;
    const spread = mode === "compact" ? 26 : 62;
    const centres = COLORS.map((_, c) => {
      const a = (c / COLORS.length) * Math.PI * 2 - Math.PI / 2;
      return [W / 2 + Math.cos(a) * ringR * 1.25, H / 2 + Math.sin(a) * ringR];
    });
    const pt = (c: number) => [centres[c][0] + gauss(r) * spread, centres[c][1] + gauss(r) * spread * 0.8];
    const support = COLORS.map((_, c) => Array.from({ length: shots }, () => pt(c)));
    const query = COLORS.flatMap((_, c) => Array.from({ length: 15 }, () => ({ c, p: pt(c) })));
    const protos = support.map((s) => [s.reduce((a, p) => a + p[0], 0) / s.length, s.reduce((a, p) => a + p[1], 0) / s.length]);
    const nearest = (x: number, y: number) => {
      let best = 0, bd = Infinity;
      protos.forEach((p, k) => { const d = (x - p[0]) ** 2 + (y - p[1]) ** 2; if (d < bd) { bd = d; best = k; } });
      return best;
    };
    const right = query.filter((q) => nearest(q.p[0], q.p[1]) === q.c).length;
    return { support, query, protos, nearest, acc: Math.round((right / query.length) * 100) };
  }, [shots, mode, seed]);

  useEffect(() => {
    const cv = canvas.current!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr;
    const g = cv.getContext("2d")!;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, W, H);
    // decision regions
    const step = 8;
    for (let y = 0; y < H; y += step) for (let x = 0; x < W; x += step) {
      g.fillStyle = COLORS[data.nearest(x + step / 2, y + step / 2)] + "1f";
      g.fillRect(x, y, step, step);
    }
    // query points: filled if right, hollow cross if wrong
    data.query.forEach(({ c, p }) => {
      const ok = data.nearest(p[0], p[1]) === c;
      g.fillStyle = COLORS[c]; g.strokeStyle = COLORS[c];
      if (ok) { g.globalAlpha = 0.55; g.beginPath(); g.arc(p[0], p[1], 3.5, 0, Math.PI * 2); g.fill(); g.globalAlpha = 1; }
      else { g.lineWidth = 2; g.beginPath(); g.moveTo(p[0] - 4, p[1] - 4); g.lineTo(p[0] + 4, p[1] + 4); g.moveTo(p[0] + 4, p[1] - 4); g.lineTo(p[0] - 4, p[1] + 4); g.stroke(); }
    });
    // support examples and their prototype
    data.support.forEach((s, c) => {
      s.forEach((p) => {
        g.fillStyle = "#fff"; g.strokeStyle = COLORS[c]; g.lineWidth = 2.5;
        g.beginPath(); g.rect(p[0] - 5, p[1] - 5, 10, 10); g.fill(); g.stroke();
        if (s.length > 1) { g.globalAlpha = 0.35; g.lineWidth = 1; g.beginPath(); g.moveTo(p[0], p[1]); g.lineTo(data.protos[c][0], data.protos[c][1]); g.stroke(); g.globalAlpha = 1; }
      });
      const [x, y] = data.protos[c];
      g.lineWidth = 3; g.strokeStyle = COLORS[c]; g.fillStyle = "#fff";
      g.beginPath(); g.arc(x, y, 11, 0, Math.PI * 2); g.fill(); g.stroke();
      g.fillStyle = COLORS[c]; g.beginPath(); g.arc(x, y, 4.5, 0, Math.PI * 2); g.fill();
    });
  }, [data]);

  return (
    <div className="pd">
      <div className="pd-controls">
        <div className="pd-group" role="group" aria-label="Examples per class">
          <span><em>examples per class</em></span>
          {([1, 5] as const).map((k) => (
            <button key={k} className={shots === k ? "on" : ""} aria-pressed={shots === k} onClick={() => setShots(k)}>{k}-shot</button>
          ))}
        </div>
        <div className="pd-group" role="group" aria-label="How the classes look">
          <span><em>classes look</em></span>
          <button className={mode === "compact" ? "on" : ""} aria-pressed={mode === "compact"} onClick={() => setMode("compact")}>distinct (like organs)</button>
          <button className={mode === "overlap" ? "on" : ""} aria-pressed={mode === "overlap"} onClick={() => setMode("overlap")}>similar (like skin lesions)</button>
        </div>
        <button className="pd-again" onClick={() => setSeed((s) => s + 1)}>new examples ↻</button>
      </div>
      <div className="pd-stage">
        <canvas ref={canvas} style={{ width: "100%", aspectRatio: `${W} / ${H}` }} aria-label={`Prototype demo: ${data.acc}% of query points classified correctly`} />
        <div className="pd-score" aria-live="polite">
          <b className="display">{data.acc}%</b>
          <em>of the query points land on the right prototype</em>
        </div>
      </div>
      <p className="pd-key">
        <span><i className="sq" /> support example</span>
        <span><i className="ring" /> prototype (their average)</span>
        <span><i className="dot" /> query, right</span>
        <span><i className="x">×</i> query, wrong</span>
      </p>
    </div>
  );
}
