"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Flower from "./Flower";
import { site } from "@/content/site";
import { ShaderBackground } from "./ui/j-shader";

/* A little garden of flower friends, one per project colour.
   They sway, watch the cursor, and hop when you poke them. */

type Kind = "daisy" | "sun" | "bell" | "violet" | "tulip";
const FRIENDS: { kind: Kind; c: string; dark: string; h: number }[] = [
  { kind: "daisy", c: "#fb4bb6", dark: "#d92a92", h: 150 },
  { kind: "bell", c: "#5dc1cf", dark: "#1e93a6", h: 118 },
  { kind: "sun", c: "#f1bd04", dark: "#c99a00", h: 176 },
  { kind: "violet", c: "#9f49be", dark: "#7c2f9a", h: 128 },
  { kind: "tulip", c: "#ff3333", dark: "#d41f1f", h: 160 },
];

function Head({ kind, id }: { kind: Kind; id: string }) {
  const c = `url(#${id}-p)`, dark = `url(#${id}-d)`;
  const ring = (n: number, d: string, rot = 0, fill = c) =>
    Array.from({ length: n }, (_, i) => (
      <path key={i} d={d} fill={fill} transform={`rotate(${rot + (360 / n) * i} 60 60)`} />
    ));
  switch (kind) {
    case "daisy":
      return <g className="petals">{ring(10, "M60 60 C 48 44, 50 14, 60 8 C 70 14, 72 44, 60 60 Z")}<circle cx="60" cy="60" r="27" fill={dark} /></g>;
    case "sun":
      return <g className="petals">{ring(16, "M60 60 L 53 14 Q 60 4 67 14 Z", 0, c)}{ring(16, "M60 60 L 54 20 Q 60 12 66 20 Z", 11.25, dark)}<circle cx="60" cy="60" r="29" fill={`url(#${id}-b)`} /></g>;
    case "violet":
      return <g className="petals">{ring(5, "M60 60 C 34 50, 34 12, 60 14 C 86 12, 86 50, 60 60 Z")}<circle cx="60" cy="60" r="26" fill={dark} /></g>;
    case "bell":
      return <g className="petals"><path d="M22 62 C 22 26, 98 26, 98 62 L 92 92 L 80 80 L 68 94 L 60 82 L 52 94 L 40 80 L 28 92 Z" fill={c} /><circle cx="60" cy="58" r="26" fill={dark} /></g>;
    case "tulip":
      return <g className="petals"><path d="M24 40 L 40 56 L 60 26 L 80 56 L 96 40 C 100 80, 86 98, 60 98 C 34 98, 20 80, 24 40 Z" fill={c} /><path d="M60 26 L 80 56 L 60 70 L 40 56 Z" fill={dark} /></g>;
  }
}

function Friend({ f, i }: { f: (typeof FRIENDS)[number]; i: number }) {
  const [hop, setHop] = useState(0);
  const headY = 30;
  const stemTop = headY + 60;
  const total = stemTop + f.h;
  const id = `gf${i}`;
  return (
    <div
      className={`garden-friend${hop ? " hop" : ""}`}
      style={{ ["--d" as string]: `${3.2 + i * 0.45}s`, ["--delay" as string]: `${-i * 0.7}s` }}
      onPointerDown={() => { setHop(Date.now()); window.setTimeout(() => setHop(0), 650); }}
    >
      <svg viewBox={`0 0 120 ${total}`} width="100%" aria-hidden>
        <defs>
          <pattern id={`${id}-p`} width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.75" fill={f.c} /></pattern>
          <pattern id={`${id}-d`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="2.5" cy="2.5" r="2.25" fill={f.dark} /></pattern>
          <pattern id={`${id}-b`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="2.5" cy="2.5" r="2.3" fill="#7a4d0c" /></pattern>
          <pattern id={`${id}-g`} width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.8" fill="#3f9b47" /></pattern>
        </defs>
        <path d={`M60 ${stemTop} C 54 ${stemTop + f.h * 0.4}, 66 ${stemTop + f.h * 0.7}, 60 ${total}`} stroke="#3f9b47" strokeWidth="5" strokeDasharray="0 7" fill="none" strokeLinecap="round" />
        <path d={`M60 ${stemTop + f.h * 0.55} C 80 ${stemTop + f.h * 0.4}, 98 ${stemTop + f.h * 0.48}, 104 ${stemTop + f.h * 0.38} C 96 ${stemTop + f.h * 0.62}, 76 ${stemTop + f.h * 0.66}, 60 ${stemTop + f.h * 0.6} Z`} fill={`url(#${id}-g)`} />
        <g className="garden-head" transform={`translate(0 ${headY - 30})`}>
          <Head kind={f.kind} id={id} />
          <g className="eyes">
            <ellipse cx="49" cy="60" rx="6.5" ry="9" fill="#111" />
            <ellipse cx="71" cy="60" rx="6.5" ry="9" fill="#111" />
            <g className="pupils">
              <circle cx="51" cy="56" r="2.4" fill="#fff" />
              <circle cx="73" cy="56" r="2.4" fill="#fff" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function SiteFooter({ back = false }: { back?: boolean }) {
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
    <footer className="site-foot">
      <ShaderBackground className="foot-shader" themed />
      <div className="site-foot-top">
        <Link href="/" aria-label="home" className="site-foot-mark"><Flower size={46} /></Link>
        {back && (
          <nav aria-label="Footer">
            <Link href="/#work">← all work</Link>
          </nav>
        )}
      </div>
      <div className="garden" ref={ref}>
        {FRIENDS.map((f, i) => <Friend key={f.kind} f={f} i={i} />)}
      </div>
      <div className="site-foot-bottom">
        <small>© {new Date().getFullYear()} {site.title}</small>
      </div>
    </footer>
  );
}
