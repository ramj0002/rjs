"use client";
import { useEffect, useRef, useState } from "react";

// A word drawn in halftone dots that dissolves and reassembles into the next word.
// Same dot language as the "welcome!" above it. Pure canvas.

type P = { x: number; y: number; tx: number; ty: number; r: number; tr: number; delay: number };
const INK = "#000CED";

export default function DotWord({ words, hold = 2200 }: { words: string[]; hold?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, cell = 5, raf = 0, k = 0, ps: P[] = [], timer: ReturnType<typeof setTimeout>, visible = true;

    const sample = (word: string) => {
      const off = document.createElement("canvas");
      off.width = w; off.height = h;
      const o = off.getContext("2d")!;
      let size = h * 0.92;
      o.font = `400 ${size}px Anton, Impact, sans-serif`;
      while (o.measureText(word).width > w * 0.96 && size > 12) { size -= 2; o.font = `400 ${size}px Anton, Impact, sans-serif`; }
      o.textAlign = "center"; o.textBaseline = "middle";
      o.fillText(word, w / 2, h / 2 + size * 0.04);
      const d = o.getImageData(0, 0, w, h).data;
      const pts: { x: number; y: number; r: number }[] = [];
      for (let y = cell / 2; y < h; y += cell)
        for (let x = cell / 2; x < w; x += cell) {
          const a = d[(Math.floor(y) * w + Math.floor(x)) * 4 + 3];
          if (a > 50) pts.push({ x, y, r: (cell / 2) * (0.5 + 0.5 * (a / 255)) });
        }
      return pts;
    };

    const go = (word: string, first = false) => {
      const pts = sample(word);
      // pair dots left-to-right so the change sweeps across the word
      pts.sort((a, b) => a.x - b.x || a.y - b.y);
      ps.sort((a, b) => a.tx - b.tx || a.ty - b.ty);
      const n = Math.max(pts.length, ps.length);
      const next: P[] = [];
      for (let j = 0; j < n; j++) {
        const t = pts[Math.floor((j / n) * pts.length)] ?? pts[pts.length - 1];
        const from = ps[Math.floor((j / n) * ps.length)];
        const sx = from ? from.x : w / 2 + (Math.random() - 0.5) * w;
        const sy = from ? from.y : h / 2 + (Math.random() - 0.5) * h * 2;
        next.push({ x: first ? sx : sx, y: sy, tx: t.x, ty: t.y, r: from ? from.r : 0, tr: j < pts.length ? t.r : 0, delay: (t.x / w) * 14 });
      }
      ps = next.filter((p, j) => j < pts.length || p.r > 0.2);
      k = 0;
    };

    const build = async () => {
      try { await document.fonts.load("400 80px Anton"); } catch {}
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = Math.max(3.5, Math.round(h / 16));
      ps = [];
      go(words[0], true);
      if (still) ps.forEach((p) => { p.x = p.tx; p.y = p.ty; p.r = p.tr; });
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      k++;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = INK;
      for (const p of ps) {
        if (k > p.delay) {
          p.x += (p.tx - p.x) * 0.12;
          p.y += (p.ty - p.y) * 0.12;
          p.r += (p.tr - p.r) * 0.12;
        }
        if (p.r < 0.15) continue;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    };

    let n = 0;
    const loop = () => {
      timer = setTimeout(() => { n = (n + 1) % words.length; setI(n); go(words[n]); loop(); }, hold);
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    let rt: ReturnType<typeof setTimeout>;
    const resize = () => { clearTimeout(rt); rt = setTimeout(() => { build(); }, 150); };
    build().then(() => { tick(); if (!still) loop(); });
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); io.disconnect(); window.removeEventListener("resize", resize); };
  }, [words, hold]);

  return (
    <span className="dotword">
      <canvas ref={ref} aria-hidden />
      <span className="sr-only" aria-live="polite">{words[i]}</span>
    </span>
  );
}
