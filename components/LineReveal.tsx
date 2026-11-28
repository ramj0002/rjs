"use client";
import { useEffect, useRef, useState } from "react";

// Lines light up white one after another as you scroll, and dim again when you scroll back.
export default function LineReveal({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const el = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setLit(lines.length); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const b = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // starts when the block's top reaches 90% of the screen, done when its bottom reaches 55%
      const p = (vh * 0.9 - b.top) / (b.height + vh * 0.35);
      setLit(Math.round(Math.max(0, Math.min(1, p)) * lines.length));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [lines.length]);
  return (
    <div ref={ref} className="about-lines">
      {lines.map((l, i) => (
        <p key={i} className={`display line line-${i}${i < lit ? " lit" : ""}`}>{l}</p>
      ))}
    </div>
  );
}
