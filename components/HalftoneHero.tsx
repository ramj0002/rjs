"use client";
import { useEffect, useRef } from "react";
import { PETAL } from "./Flower";

// "welc✿me!" drawn as a field of halftone dots that scatter away from the cursor
// and spring back. Pure canvas, no libraries.

type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; r: number };

const INK = "#000CED";

function drawFlower(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  // Same petal as the SVG mark (components/Flower.tsx), drawn solid.
  ctx.save();
  ctx.translate(cx - s, cy - s);
  ctx.scale(s / 50, s / 50);
  ctx.fillStyle = "#000";
  const petal = new Path2D(PETAL);
  for (let i = 0; i < 8; i++) {
    ctx.save();
    ctx.translate(50, 50);
    ctx.rotate((Math.PI / 4) * i);
    ctx.translate(-50, -50);
    ctx.fill(petal);
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(50, 50, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export default function HalftoneHero() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let dots: Dot[] = [];
    let w = 0, h = 0, cell = 8;
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = true;
    let first = true;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const build = async () => {
      try { await document.fonts.load("400 200px Anton"); } catch {}
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Draw the word into an offscreen canvas, then sample it on a grid.
      const off = document.createElement("canvas");
      off.width = w; off.height = h;
      const o = off.getContext("2d")!;
      let size = Math.min(h * 0.55, 400);
      o.font = `400 ${size}px Anton, Impact, sans-serif`;
      const left = "welc", right = "me!";
      const gap = () => o.measureText("o").width * 1.15;
      const total = () => o.measureText(left).width + gap() + o.measureText(right).width;
      while (total() > w * 0.86 && size > 20) {
        size -= 4;
        o.font = `400 ${size}px Anton, Impact, sans-serif`;
      }
      const x0 = (w - total()) / 2;
      const y0 = h / 2 + size * 0.36;
      o.fillStyle = "#000";
      o.fillText(left, x0, y0);
      const fx = x0 + o.measureText(left).width + gap() / 2;
      drawFlower(o, fx, h / 2 + size * 0.02, size * 0.42);
      o.fillText(right, x0 + o.measureText(left).width + gap(), y0);

      cell = Math.max(4, Math.round(size / 34));
      const data = o.getImageData(0, 0, w, h).data;
      dots = [];
      for (let y = cell / 2; y < h; y += cell) {
        for (let x = cell / 2; x < w; x += cell) {
          const a = data[(Math.floor(y) * w + Math.floor(x)) * 4 + 3];
          if (a > 40) {
            // first load: start scattered below the word and fly up into place
            const sx = first && !still ? x + (Math.random() - 0.5) * w * 0.5 : x;
            const sy = first && !still ? h + 40 + Math.random() * h : y;
            dots.push({ hx: x, hy: y, x: sx, y: sy, vx: 0, vy: 0, r: (cell / 2) * (0.45 + 0.55 * (a / 255)) });
          }
        }
      }
    };

    const tick = () => {
      if (first) first = false;
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = INK;
      const R = Math.max(90, w * 0.09);
      for (const d of dots) {
        const dx = d.x - mouse.x, dy = d.y - mouse.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < R * R) {
          const dist = Math.sqrt(dist2) || 1;
          const f = (1 - dist / R) * 2.2;
          d.vx += (dx / dist) * f;
          d.vy += (dy / dist) * f;
        }
        d.vx += (d.hx - d.x) * 0.06;
        d.vy += (d.hy - d.y) * 0.06;
        d.vx *= 0.82; d.vy *= 0.82;
        d.x += d.vx; d.y += d.vy;
        const disp = Math.min(1, Math.hypot(d.x - d.hx, d.y - d.hy) / 40);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * (1 - disp * 0.35), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const move = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top;
    };
    const leave = () => { mouse.x = -9999; mouse.y = -9999; };
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(canvas);
    let t: ReturnType<typeof setTimeout>;
    const resize = () => { clearTimeout(t); t = setTimeout(build, 150); };

    build().then(tick);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-label="welcome!" role="img" />;
}
