"use client";
import { useEffect, useRef } from "react";

// A live demo of the Glow of Orchard heat map algorithm.
// Two shoppers wander under the "sensor"; your cursor is a third heat source, shown in red.
// Left: the raw 8×8 reading. Right: the same reading upscaled with bilinear interpolation.
// Both are drawn as halftone dots: bigger dot = warmer.

const N = 8;      // sensor grid
const UP = 40;    // interpolated grid

export default function ThermalDemo() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, panel = 0, gap = 0, raf = 0, visible = true;
    const mouse = { x: -1, y: -1, on: false }; // in 0..1 field coords
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      gap = Math.max(18, w * 0.05);
      panel = Math.min((w - gap) / 2, 420);
      h = panel + 34;
      canvas.style.height = `${h}px`;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Temperature at (x, y) in 0..1 space. Shoppers and the visitor's cursor are kept
    // separately so the cursor's own heat can be drawn in red.
    const blob = (x: number, y: number, px: number, py: number) => Math.exp(-((x - px) ** 2 + (y - py) ** 2) / 0.012);
    const shoppers = (x: number, y: number, t: number) =>
      blob(x, y, 0.5 + 0.32 * Math.sin(t * 0.37), 0.5 + 0.3 * Math.sin(t * 0.53 + 1)) +
      blob(x, y, 0.5 + 0.3 * Math.cos(t * 0.29 + 2), 0.5 + 0.32 * Math.sin(t * 0.41 + 4));
    const you = (x: number, y: number) => (mouse.on ? blob(x, y, mouse.x, mouse.y) : 0);

    const raw = new Float32Array(N * N);
    const mine = new Float32Array(N * N); // share of each reading that is the cursor's heat
    const BLUE = [0, 12, 237], RED = [230, 40, 30];
    const mix = (k: number) => `rgb(${BLUE.map((b, i) => Math.round(b + (RED[i] - b) * k)).join(",")})`;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const t = reduce ? 3 : now / 1000;
      for (let j = 0; j < N; j++)
        for (let i = 0; i < N; i++) {
          const x = (i + 0.5) / N, y = (j + 0.5) / N;
          const a = shoppers(x, y, t), b = you(x, y);
          raw[j * N + i] = Math.min(1, a + b);
          mine[j * N + i] = a + b > 0.001 ? b / (a + b) : 0;
        }

      ctx.clearRect(0, 0, w, h);
      const x0 = (w - (panel * 2 + gap)) / 2;
      const ink = "#000CED";

      // Left panel: raw 8×8, one big dot per pixel.
      const c1 = panel / N;
      ctx.strokeStyle = "rgba(0,12,237,.25)"; ctx.lineWidth = 1;
      ctx.strokeRect(x0 + 0.5, 0.5, panel - 1, panel - 1);
      ctx.fillStyle = ink;
      for (let j = 0; j < N; j++)
        for (let i = 0; i < N; i++) {
          const v = raw[j * N + i];
          const r = (c1 / 2) * (0.08 + 0.9 * Math.sqrt(v));
          ctx.fillStyle = mix(mine[j * N + i]);
          ctx.beginPath();
          ctx.arc(x0 + (i + 0.5) * c1, (j + 0.5) * c1, r, 0, Math.PI * 2);
          ctx.fill();
        }

      // Right panel: bilinear interpolation of the same 8×8 reading.
      const x1 = x0 + panel + gap;
      const c2 = panel / UP;
      ctx.strokeRect(x1 + 0.5, 0.5, panel - 1, panel - 1);
      for (let j = 0; j < UP; j++)
        for (let i = 0; i < UP; i++) {
          const gx = Math.min(N - 1.001, Math.max(0, ((i + 0.5) / UP) * N - 0.5));
          const gy = Math.min(N - 1.001, Math.max(0, ((j + 0.5) / UP) * N - 0.5));
          const ix = Math.floor(gx), iy = Math.floor(gy), fx = gx - ix, fy = gy - iy;
          const a = raw[iy * N + ix], b = raw[iy * N + ix + 1], c = raw[(iy + 1) * N + ix], d = raw[(iy + 1) * N + ix + 1];
          const v = a * (1 - fx) * (1 - fy) + b * fx * (1 - fy) + c * (1 - fx) * fy + d * fx * fy;
          const ma = mine[iy * N + ix], mb = mine[iy * N + ix + 1], mc = mine[(iy + 1) * N + ix], md = mine[(iy + 1) * N + ix + 1];
          ctx.fillStyle = mix(ma * (1 - fx) * (1 - fy) + mb * fx * (1 - fy) + mc * (1 - fx) * fy + md * fx * fy);
          const r2 = (c2 / 2) * Math.min(1.15, 0.12 + 1.05 * Math.sqrt(v));
          ctx.beginPath();
          ctx.arc(x1 + (i + 0.5) * c2, (j + 0.5) * c2, r2, 0, Math.PI * 2);
          ctx.fill();
        }

      ctx.fillStyle = ink;
      ctx.font = "italic 15px Baskervville, Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("raw 8 × 8 sensor reading", x0 + panel / 2, panel + 24);
      ctx.fillText("after bilinear interpolation", x1 + panel / 2, panel + 24);
    };

    const move = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      const x0 = (w - (panel * 2 + gap)) / 2;
      let x = e.clientX - b.left - x0, y = e.clientY - b.top;
      if (x > panel + gap) x -= panel + gap; // either panel works
      mouse.x = x / panel; mouse.y = y / panel;
      mouse.on = mouse.x >= 0 && mouse.x <= 1 && mouse.y >= 0 && mouse.y <= 1;
    };
    const leave = () => { mouse.on = false; };
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(layout);
    ro.observe(canvas);
    layout();
    raf = requestAnimationFrame(draw);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="thermal-demo"
      role="img"
      aria-label="Live demo: a raw 8 by 8 thermal reading beside the same reading smoothed with bilinear interpolation"
    />
  );
}
