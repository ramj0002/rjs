"use client";
import { useEffect, useRef } from "react";

// Lines fill with white from left to right, one after another, smoothly following the scroll.
// Scrolling back up un-fills them again.
export default function LineReveal({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const rows = Array.from(el.querySelectorAll<HTMLElement>(".line"));
    const set = (p: number) =>
      rows.forEach((r, i) => r.style.setProperty("--f", String(Math.max(0, Math.min(1, p * rows.length - i)))));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { set(1); return; }
    let raf = 0, cur = 0, target = 0;
    const measure = () => {
      const b = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // starts when the block's top reaches 92% of the screen, done when its bottom reaches 50%
      target = Math.max(0, Math.min(1, (vh * 0.92 - b.top) / (b.height + vh * 0.42)));
    };
    const tick = () => {
      cur += (target - cur) * 0.18; // ease towards the scroll position
      if (Math.abs(target - cur) < 0.0005) cur = target;
      set(cur);
      raf = cur === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => { measure(); if (!raf) raf = requestAnimationFrame(tick); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [lines.length]);
  return (
    <div ref={ref} className="about-lines">
      {lines.map((l, i) => (
        <p key={i} className={`display line line-${i}`}>{l}</p>
      ))}
    </div>
  );
}
