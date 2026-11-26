"use client";
import { useEffect, useRef, useState } from "react";

// A working copy of the Breathing Bag dashboard. The buttons drive ten fringes on a drawn bag,
// the same way the real one drives ten servos: Heart, Speed, single motors, and rows.

const ROWS = [[0, 1, 2], [3, 4, 5], [6, 7, 8, 9]];
const rowOf = (i: number) => (i < 3 ? 0 : i < 6 ? 1 : 2);

export default function BagDashboard() {
  const [on, setOn] = useState<boolean[]>(Array(10).fill(false));
  const [heart, setHeart] = useState(false);
  const [speed, setSpeed] = useState(30);
  const fringe = useRef<SVGGElement>(null);
  const state = useRef({ on, heart, speed });
  state.current = { on, heart, speed };

  useEffect(() => {
    const g = fringe.current!;
    const els = Array.from(g.children) as SVGGElement[];
    const amp = Array(10).fill(0);
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, t = 0, last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const { on, heart, speed } = state.current;
      const hz = 0.25 + (speed / 60) * 2.2;
      t += dt * hz * Math.PI * 2;
      els.forEach((el, i) => {
        const active = heart || on[i];
        amp[i] += ((active ? 1 : 0) - amp[i]) * Math.min(1, dt * 4);
        let ang: number, sy = 1;
        if (heart) {
          // heartbeat: a double pulse, all together
          const p = (t % (Math.PI * 2)) / (Math.PI * 2);
          const beat = Math.exp(-((p - 0.15) ** 2) / 0.004) + 0.6 * Math.exp(-((p - 0.35) ** 2) / 0.004);
          ang = (i - 4.5) * 2.2 * beat * amp[i];
          sy = 1 - 0.12 * beat * amp[i];
        } else {
          ang = Math.sin(t - rowOf(i) * 0.9 - i * 0.25) * 16 * amp[i];
        }
        if (still) { ang *= 0.2; sy = 1; }
        el.setAttribute("transform", `rotate(${ang.toFixed(2)} ${el.dataset.x} 150) translate(0 150) scale(1 ${sy.toFixed(3)}) translate(0 -150)`);
        el.classList.toggle("live", amp[i] > 0.3);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const set = (ids: number[], v: boolean) => setOn((o) => o.map((x, i) => (ids.includes(i) ? v : x)));
  const anyOn = heart || on.some(Boolean);

  return (
    <div className="bd">
      <div className="bd-bag">
        <svg viewBox="0 0 400 330" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-label="Drawing of the bag; fringes move when motors are on">
          <path d="M140 60 C140 10 260 10 260 60" />
          <path d="M160 60 C160 28 240 28 240 60" opacity=".5" />
          <rect x="90" y="60" width="220" height="90" rx="6" fill="var(--panel, #fff)" />
          <g opacity=".5" strokeWidth="1.5" strokeDasharray="4 4"><path d="M100 128 H300" /></g>
          <g ref={fringe}>
            {Array.from({ length: 10 }, (_, i) => {
              const x = 106 + i * 21;
              const len = 120 + ((i * 37) % 40);
              return (
                <g key={i} data-x={x}>
                  <path d={`M${x - 6} 150 L${x - 4} ${150 + len} L${x + 4} ${150 + len - 3} L${x + 6} 150 Z`} fill="var(--panel, #fff)" strokeWidth="2" />
                  <circle cx={x} cy="140" r="4" className="bd-led" />
                </g>
              );
            })}
          </g>
        </svg>
        <p className="bd-status"><em>{heart ? "heart mode" : anyOn ? `${on.filter(Boolean).length} of 10 motors on` : "all motors off"}</em></p>
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
            <div key={r} className="bd-row">
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
