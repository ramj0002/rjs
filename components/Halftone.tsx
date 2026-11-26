"use client";
import { useEffect, useRef } from "react";

// Renders any image as halftone dots. Dots swell under the cursor like a lens.
// Drop in a real photo and it gets the same treatment.

type Props = {
  src: string;
  alt: string;
  color?: string;
  background?: string;
  cell?: number;
  interactive?: boolean;
  className?: string;
};

export default function Halftone({
  src, alt, color = "#000", background = "transparent", cell = 7, interactive = true, className = "",
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let lum: Float32Array = new Float32Array(0);
    let cols = 0, rows = 0, w = 0, h = 0, cs = cell;
    const mouse = { x: -9999, y: -9999 };
    const img = new Image();
    let frame = 0;

    const draw = () => {
      frame = 0;
      ctx.clearRect(0, 0, w, h);
      if (background !== "transparent") { ctx.fillStyle = background; ctx.fillRect(0, 0, w, h); }
      ctx.fillStyle = color;
      const R = Math.max(60, w * 0.18);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const dark = 1 - lum[j * cols + i];
          if (dark < 0.04) continue;
          const x = i * cs + cs / 2, y = j * cs + cs / 2;
          let boost = 1;
          if (interactive) {
            const d = Math.hypot(x - mouse.x, y - mouse.y);
            if (d < R) boost += (1 - d / R) * 0.9;
          }
          const r = Math.min(cs * 0.75, (cs / 2) * Math.sqrt(dark) * 1.1 * boost);
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(draw); };

    const layout = () => {
      if (!img.naturalWidth) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = Math.round((w * img.naturalHeight) / img.naturalWidth);
      canvas.style.height = `${h}px`;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cs = Math.max(4, cell * (w < 400 ? 0.8 : 1));
      cols = Math.ceil(w / cs); rows = Math.ceil(h / cs);
      const off = document.createElement("canvas");
      off.width = cols; off.height = rows;
      const o = off.getContext("2d")!;
      o.fillStyle = "#fff"; o.fillRect(0, 0, cols, rows);
      o.drawImage(img, 0, 0, cols, rows);
      const d = o.getImageData(0, 0, cols, rows).data;
      lum = new Float32Array(cols * rows);
      for (let k = 0; k < cols * rows; k++) {
        lum[k] = (0.299 * d[k * 4] + 0.587 * d[k * 4 + 1] + 0.114 * d[k * 4 + 2]) / 255;
      }
      request();
    };

    img.onload = layout;
    img.src = src;
    const ro = new ResizeObserver(layout);
    ro.observe(canvas);
    const move = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top; request();
    };
    const leave = () => { mouse.x = -9999; mouse.y = -9999; request(); };
    if (interactive) {
      canvas.addEventListener("pointermove", move);
      canvas.addEventListener("pointerleave", leave);
    }
    return () => {
      ro.disconnect(); cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, [src, color, background, cell, interactive]);

  return <canvas ref={ref} className={`halftone ${className}`} role="img" aria-label={alt} />;
}
