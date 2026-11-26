"use client";
import { useEffect, useRef } from "react";

// Words light up one by one as you scroll — like the original About page.

export default function RevealText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current!;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("span"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const b = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top hits 85% of the screen, 1 when its bottom reaches 45%.
      const p = (vh * 0.85 - b.top) / (b.height + vh * 0.4);
      const lit = Math.max(0, Math.min(1, p)) * spans.length;
      spans.forEach((s, i) => {
        s.style.opacity = String(0.18 + 0.82 * Math.max(0, Math.min(1, lit - i)));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <p ref={ref} className={`reveal ${className}`}>
      {words.map((w, i) => (
        <span key={i}>{w} </span>
      ))}
    </p>
  );
}
