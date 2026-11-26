"use client";
import { useEffect, useRef, useState } from "react";

// A working copy of the Breathing Bag dashboard. Like the real bag, each servo pulls its
// fringes up and lets them drop, and lifting them shows the heart sewn underneath.
// Three tiers of fringe (rows 1–3) in three colours; ten motors: 3 + 3 + 4.

const ROWS = [[0, 1, 2], [3, 4, 5], [6, 7, 8, 9]];
const TIERS = [
  { top: 92, len: 118, color: "#17656f" }, // row 1, top tier
  { top: 150, len: 118, color: "#3aa6b4" }, // row 2
  { top: 208, len: 124, color: "#8fd6df" }, // row 3, bottom tier
];

type Strip = { x: number; top: number; len: number; motor: number; row: number; k: number };
const STRIPS: Strip[] = [];
ROWS.forEach((motors, row) => {
  const per = row === 2 ? 5 : 6;
  const n = motors.length * per;
  const x0 = 104, x1 = 296;
  for (let j = 0; j < n; j++) {
    const x = x0 + ((x1 - x0) * (j + 0.5)) / n;
    STRIPS.push({ x, top: TIERS[row].top, len: TIERS[row].len - ((j * 13) % 14), motor: motors[Math.floor(j / per)], row, k: j });
  }
});

const strip = (s: Strip, lift: number) => {
  // lift 0 = hanging, 1 = pulled up; the strip shortens and curls out a little as it rises
  const L = s.len * (1 - 0.8 * lift);
  const side = s.x < 200 ? -1 : 1;
  const bx = s.x + side * 18 * lift, by = s.top + L;
  const w = 4.2;
  const mx = s.x + side * 7 * lift, my = s.top + L * 0.55;
  const f = (n: number) => n.toFixed(1);
  return `M${f(s.x - w)} ${s.top} Q${f(mx - w)} ${f(my)} ${f(bx - w * 0.8)} ${f(by)} L${f(bx + w * 0.8)} ${f(by - 3)} Q${f(mx + w)} ${f(my)} ${f(s.x + w)} ${s.top} Z`;
};

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
      heartRef.current!.setAttribute("transform", `translate(200 182) scale(${hs.toFixed(3)}) translate(-200 -182)`);
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
        <svg viewBox="70 0 260 350" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Drawing of the bag: three tiers of fringe over a sewn-in heart">
          <path d="M140 84 C140 22 170 14 170 84" />
          <path d="M230 84 C230 14 260 22 260 84" />
          <rect x="96" y="84" width="208" height="176" rx="6" fill="#fff" />
          {/* the heart sewn into the bag */}
          <g transform="translate(0 -16)"><g ref={heartRef}>
            <path d="M186 140 C184 124 190 116 196 116 M206 140 C208 120 216 114 222 118" stroke="#8e1b25" strokeWidth="7" />
            <path d="M200 232 C170 214 150 192 152 168 C154 148 172 138 188 146 C194 149 198 154 200 158 C204 150 214 142 228 144 C246 148 252 168 244 188 C236 208 218 222 200 232 Z" fill="#c8323c" stroke="#8e1b25" strokeWidth="2.5" />
            <path d="M172 170 C180 178 182 192 178 204 M214 160 C206 176 208 194 220 204 M196 178 C200 190 198 204 200 214" stroke="#8e1b25" strokeWidth="1.6" opacity=".7" />
          </g></g>
          {/* stitches along the top of each tier */}
          {TIERS.map((tier, r) => (
            <path key={r} d={`M102 ${tier.top - 2} H298`} strokeWidth="1.5" strokeDasharray="3 4" opacity=".6" />
          ))}
          <g ref={strips} strokeWidth="1.2" stroke="#0e3f45">
            {STRIPS.map((s, i) => <path key={i} d={strip(s, 0)} fill={TIERS[s.row].color} />)}
          </g>
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
