"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { ShaderBackground } from "./ui/j-shader";

import { PETAL } from "./Flower";

/* A garden of logo-flowers in halftone dots, one per project colour.
   They sway, watch the cursor, and hop when you poke them. */

// bend: how far the stem curves (and which way); leaves: [where on the stem 0–1, side, size]
const FRIENDS: { c: string; h: number; rot: number; s: number; bend: [number, number]; leaves: [number, number, number][] }[] = [
  { c: "#fb4bb6", h: 150, rot: 0, s: 1, bend: [-7, 6], leaves: [[0.5, 1, 1], [0.74, -1, 0.7]] },
  { c: "#5dc1cf", h: 112, rot: 12, s: 0.86, bend: [6, -3], leaves: [[0.62, -1, 0.85]] },
  { c: "#f1bd04", h: 176, rot: 22, s: 1.08, bend: [-3, 9], leaves: [[0.35, -1, 0.75], [0.55, 1, 1.15], [0.78, -1, 0.9]] },
  { c: "#9f49be", h: 128, rot: 6, s: 0.92, bend: [9, 2], leaves: [[0.68, 1, 0.8], [0.42, 1, 0.55]] },
  { c: "#ff3333", h: 160, rot: 30, s: 0.98, bend: [-10, -4], leaves: [[0.58, -1, 1.05]] },
];
const LEAF_D = "M0 0 C 12 -14, 30 -14, 40 -22 C 36 0, 16 8, 0 2 Z";

type Dot = [number, number, number, number]; // x, y, r, opacity
// Halftone field: dots are biggest at the centre and fade out to the petal tips.
function field(cx: number, cy: number, R: number, step: number, max: number, min = 0.25): Dot[] {
  const out: Dot[] = [];
  for (let y = cy - R; y <= cy + R; y += step) {
    const row = Math.round((y - (cy - R)) / step);
    for (let x = cx - R + (row % 2 ? step / 2 : 0); x <= cx + R; x += step) {
      const t = Math.hypot(x - cx, y - cy) / R;
      if (t > 1) continue;
      const k = Math.pow(1 - t, 0.7);
      out.push([+x.toFixed(2), +y.toFixed(2), +(min + (max - min) * k).toFixed(2), +(0.6 + 0.4 * k).toFixed(2)]);
    }
  }
  return out;
}
const HEAD = field(60, 60, 50, 3.2, 1.7, 0.55);
const LEAF = field(22, -6, 22, 3.2, 1.25, 0.3);

function Friend({ f, i }: { f: (typeof FRIENDS)[number]; i: number }) {
  const [hop, setHop] = useState(0);
  const stemTop = 92;
  const total = stemTop + f.h;
  const id = `gf${i}`;
  const [b1, b2] = f.bend;
  // cubic stem from (60, stemTop) to (60, total)
  const P = [[60, stemTop], [60 + b1, stemTop + f.h * 0.35], [60 + b2, stemTop + f.h * 0.7], [60, total - 2]];
  const at = (t: number) => {
    const u = 1 - t;
    const w = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
    return [0, 1].map((k) => w.reduce((acc, wi, j) => acc + wi * P[j][k], 0));
  };
  return (
    <div
      className={`garden-friend${hop ? " hop" : ""}`}
      style={{ ["--d" as string]: `${3.2 + i * 0.45}s`, ["--delay" as string]: `${-i * 0.7}s` }}
      onPointerDown={() => { setHop(Date.now()); window.setTimeout(() => setHop(0), 650); }}
    >
      <svg viewBox={`0 0 120 ${total}`} width="100%" aria-hidden>
        <defs>
          <clipPath id={`${id}-petals`}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
              <path key={r} d={PETAL} transform={`translate(10 10) rotate(${r + f.rot} 50 50) translate(50 50) scale(1.18) translate(-50 -50)`} />
            ))}
            <circle cx="60" cy="60" r="16" />
          </clipPath>
          <clipPath id={`${id}-leaf`}><path d={LEAF_D} /></clipPath>
        </defs>
        <path d={`M${P[0]} C ${P[1]}, ${P[2]}, ${P[3]}`} stroke="#3f9b47" strokeWidth="2.6" strokeDasharray="0 5" fill="none" strokeLinecap="round" opacity=".8" />
        {f.leaves.map(([t, side, size], li) => {
          const [x, y] = at(t);
          return (
            <g key={li} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${side * size} ${size}) rotate(${li % 2 ? 8 : -4})`}>
              <g clipPath={`url(#${id}-leaf)`} fill="#3f9b47">
                {LEAF.map(([lx, lyy, r, o], k) => <circle key={k} cx={lx} cy={lyy} r={r} opacity={o * 0.85} />)}
              </g>
            </g>
          );
        })}
        <g className="garden-head" transform={`scale(${f.s})`} style={{ transformOrigin: "60px 60px" }}>
          <g className="petals" clipPath={`url(#${id}-petals)`} fill={f.c}>
            {HEAD.map(([x, y, r, o], k) => <circle key={k} cx={x} cy={y} r={r} opacity={o} />)}
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function SiteFooter({ back = false, onSilk = false }: { back?: boolean; onSilk?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let raf = 0, mx = -1, my = -1;
    const look = () => {
      raf = 0;
      root.querySelectorAll<HTMLElement>(".garden-friend").forEach((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.width * 0.5;
        const dx = mx - cx, dy = my - cy, d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / 120);
        const p = el.querySelector<SVGGElement>(".eyes");
        if (p) p.style.transform = mx < 0 ? "" : `translate(${(dx / d) * 4 * k}px, ${(dy / d) * 4 * k}px)`;
      });
    };
    const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(look); };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <footer className={`site-foot${onSilk ? " on-silk" : ""}`}>
      {!onSilk && <ShaderBackground className="foot-shader" themed />}
      <div className="site-foot-top">
        {back && (
          <nav aria-label="Footer">
            <Link href="/#work">← all work</Link>
          </nav>
        )}
      </div>
      <div className="garden" ref={ref}>
        {FRIENDS.map((f, i) => <Friend key={f.c} f={f} i={i} />)}
      </div>
      <div className="site-foot-bottom">
        <small>© {new Date().getFullYear()} {site.title}</small>
        <nav className="foot-icons" aria-label="Elsewhere">
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>
          </a>
          <a href={`mailto:${site.email}`} aria-label={`Email ${site.email}`}>
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" d="M3 5.5h18v13H3z M3.5 6l8.5 7 8.5-7"/></svg>
          </a>
        </nav>
      </div>
    </footer>
  );
}
