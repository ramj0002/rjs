"use client";
import { useEffect, useRef, useState } from "react";

// A working copy of the Breathing Bag dashboard. Like the real bag, each servo pulls its
// fringes up and lets them drop, and lifting them shows the heart sewn underneath.
// Three tiers of fringe (rows 1–3) in three colours; ten motors: 3 + 3 + 4.

const ROWS = [[0, 1, 2], [3, 4, 5], [6, 7, 8, 9]];
// Each tier hangs over the one below it (row 1 on top), like layered leather fringe.
const TIERS = [
  { top: 120, len: 132, color: "#1d5c66", edge: "#0f353b" }, // row 1, top tier
  { top: 178, len: 132, color: "#3b9aa6", edge: "#1f5f68" }, // row 2
  { top: 236, len: 138, color: "#9fd8de", edge: "#4f9aa3" }, // row 3, bottom tier
];

// bag body: a soft trapezoid, wider at the bottom
const BODY_TOP = 112, BODY_BOT = 300;
const leftAt = (y: number) => 100 - (y - BODY_TOP) * 0.11;

type Strip = { x: number; top: number; len: number; w: number; tilt: number; motor: number; row: number; k: number };
const STRIPS: Strip[] = [];
// build bottom tier first so the top tier is drawn last and overlaps it
[2, 1, 0].forEach((row) => {
  const motors = ROWS[row];
  const per = row === 2 ? 5 : 6;
  const n = motors.length * per;
  const top = TIERS[row].top;
  const x0 = leftAt(top) + 8, x1 = 400 - leftAt(top) - 8;
  for (let j = 0; j < n; j++) {
    const x = x0 + ((x1 - x0) * (j + 0.5)) / n;
    const r = Math.sin(j * 12.9898 + row * 78.233) * 43758.5453;
    const rnd = r - Math.floor(r);
    STRIPS.push({
      x, top, len: TIERS[row].len - rnd * 16, w: 4.6 + rnd * 1.2,
      tilt: (x - 200) * 0.035 + (rnd - 0.5) * 2.5, // fan out a little toward the edges
      motor: motors[Math.floor(j / per)], row, k: j,
    });
  }
});

const f = (n: number) => n.toFixed(1);
const strip = (s: Strip, lift: number) => {
  // lift 0 = hanging, 1 = pulled up: the strip shortens and curls outward as it rises
  const L = s.len * (1 - 0.78 * lift);
  const side = s.x < 200 ? -1 : 1;
  const bx = s.x + s.tilt + side * 20 * lift, by = s.top + L;
  const mx = s.x + s.tilt * 0.4 + side * 8 * lift, my = s.top + L * 0.5;
  const w = s.w, t = w * 0.7;
  return `M${f(s.x - w)} ${s.top} Q${f(mx - w)} ${f(my)} ${f(bx - t)} ${f(by - t)} Q${f(bx)} ${f(by + t * 0.8)} ${f(bx + t)} ${f(by - t)} Q${f(mx + w)} ${f(my)} ${f(s.x + w)} ${s.top} Z`;
};

const BODY = `M${leftAt(BODY_TOP) + 8} ${BODY_TOP} H${400 - leftAt(BODY_TOP) - 8} Q${400 - leftAt(BODY_TOP)} ${BODY_TOP} ${400 - leftAt(BODY_TOP) + 1} ${BODY_TOP + 8}
  L${400 - leftAt(BODY_BOT) - 1} ${BODY_BOT - 14} Q${400 - leftAt(BODY_BOT)} ${BODY_BOT} ${400 - leftAt(BODY_BOT) - 16} ${BODY_BOT}
  H${leftAt(BODY_BOT) + 16} Q${leftAt(BODY_BOT)} ${BODY_BOT} ${leftAt(BODY_BOT) + 1} ${BODY_BOT - 14}
  L${leftAt(BODY_TOP) - 1} ${BODY_TOP + 8} Q${leftAt(BODY_TOP)} ${BODY_TOP} ${leftAt(BODY_TOP) + 8} ${BODY_TOP} Z`;

export default function BagDashboard() {
  const [on, setOn] = useState<boolean[]>(Array(10).fill(false));
  const [heart, setHeart] = useState(false);
  const [speed, setSpeed] = useState(30);
  const strips = useRef<SVGGElement>(null);
  const heartRef = useRef<SVGGElement>(null);
  const state = useRef({ on, heart, speed });
  state.current = { on, heart, speed };

  useEffect(() => {
    const paths = Array.from(strips.current!.querySelectorAll("path"));
    const amp = Array(10).fill(0);
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, t = 0, last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const { on, heart, speed } = state.current;
      t += dt * (0.2 + (speed / 60) * 1.6) * Math.PI * 2;
      for (let m = 0; m < 10; m++) amp[m] += ((heart || on[m] ? 1 : 0) - amp[m]) * Math.min(1, dt * 5);
      // heartbeat: a quick double pulse each cycle
      const p = (t % (Math.PI * 2)) / (Math.PI * 2);
      const beat = Math.exp(-((p - 0.12) ** 2) / 0.003) + 0.7 * Math.exp(-((p - 0.32) ** 2) / 0.003);
      STRIPS.forEach((s, i) => {
        const wave = heart ? beat : 0.5 - 0.5 * Math.cos(t - s.row * 0.8 - (s.k % 6) * 0.12);
        let lift = amp[s.motor] * wave;
        if (still) lift *= 0.3;
        paths[i].setAttribute("d", strip(s, lift));
      });
      const hs = 1 + (heart && !still ? 0.07 * beat : 0);
      heartRef.current!.setAttribute("transform", `translate(200 198) scale(${hs.toFixed(3)}) translate(-200 -198)`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const set = (ids: number[], v: boolean) => setOn((o) => o.map((x, i) => (ids.includes(i) ? v : x)));
  const count = on.filter(Boolean).length;

  return (
    <div className="bd">
      <div className="bd-bag">
        <svg viewBox="40 30 320 370" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-label="Drawing of the bag: three layered tiers of fringe over a sewn-in heart">
          <ellipse cx="200" cy="388" rx="120" ry="7" fill="#0e3f45" opacity=".08" />
          {/* handle: one semicircle */}
          <path d="M138 114 A62 62 0 0 1 262 114" stroke="#0f353b" strokeWidth="8" />
          <path d="M154 114 A46 46 0 0 1 246 114" stroke="#3b9aa6" strokeWidth="1.6" opacity=".6" />
          {/* body */}
          <path d={BODY} fill="#eef7f8" stroke="#0f353b" strokeWidth="2.5" />
          <path d={`M${leftAt(BODY_TOP) + 6} ${BODY_TOP + 6} H${400 - leftAt(BODY_TOP) - 6}`} stroke="#0f353b" strokeWidth="1.2" strokeDasharray="3 4" opacity=".5" />
          {/* the heart sewn into the bag */}
          <g ref={heartRef}>
            <path d="M188 150 C186 132 192 124 198 124 M208 150 C210 130 218 124 224 128" stroke="#8e1b25" strokeWidth="7" />
            <path d="M200 248 C170 230 150 208 152 184 C154 164 172 154 188 162 C194 165 198 170 200 174 C204 166 214 158 228 160 C246 164 252 184 244 204 C236 224 218 238 200 248 Z" fill="#c8323c" stroke="#8e1b25" strokeWidth="2.5" />
            <path d="M172 186 C180 194 182 208 178 220 M214 176 C206 192 208 210 220 220 M196 194 C200 206 198 220 200 230" stroke="#8e1b25" strokeWidth="1.6" opacity=".7" />
          </g>
          {/* fringe, bottom tier first; each tier gets a stitched leather band on top */}
          <g ref={strips} strokeWidth="1.1">
            {STRIPS.map((s, i) => <path key={i} d={strip(s, 0)} fill={TIERS[s.row].color} stroke={TIERS[s.row].edge} />)}
          </g>
          {TIERS.map((t, r) => (
            <g key={r}>
              <rect x={leftAt(t.top) + 2} y={t.top - 6} width={400 - 2 * leftAt(t.top) - 4} height="9" rx="3" fill={t.color} stroke={t.edge} strokeWidth="1.2" />
              <path d={`M${leftAt(t.top) + 8} ${t.top - 1.5} H${400 - leftAt(t.top) - 8}`} stroke="#fff" strokeWidth="1" strokeDasharray="3 3" opacity=".7" />
            </g>
          ))}
        </svg>
        <p className="bd-status"><em>{heart ? "heart mode: the whole bag beats" : count ? `${count} of 10 motors lifting` : "lift a row to find the heart"}</em></p>
      </div>

      <div className="bd-panel">
        <div className="bd-top">
          <div className="bd-box">
            <b className="display">Heart</b>
            <div className="bd-btns">
              <button className={heart ? "on" : ""} onClick={() => setHeart(true)}>start</button>
              <button onClick={() => setHeart(false)}>stop</button>
            </div>
          </div>
          <label className="bd-box">
            <b className="display">Speed <span>{speed}</span></b>
            <input type="range" min={1} max={60} value={speed} onChange={(e) => setSpeed(+e.target.value)} />
          </label>
        </div>
        <div className="bd-grid">
          {ROWS.map((ids, r) => (
            <div key={r} className="bd-row" style={{ ["--row" as string]: TIERS[r].color }}>
              <span className="bd-swatch" aria-hidden />
              {ids.map((i) => (
                <button key={i} className={`bd-motor ${on[i] ? "on" : ""}`} onClick={() => set([i], !on[i])} aria-pressed={on[i]}>
                  {i + 1}
                </button>
              ))}
              <span className="bd-row-btns">
                <button onClick={() => set(ids, true)}>row {r + 1} start</button>
                <button onClick={() => set(ids, false)}>stop</button>
              </span>
            </div>
          ))}
        </div>
        <button className="bd-off" onClick={() => { setHeart(false); setOn(Array(10).fill(false)); }}>all off</button>
      </div>
    </div>
  );
}
