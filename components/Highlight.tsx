"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Marker-pen highlights that sweep in one after another when the block scrolls into view.
// Use with marks() from ./marks to turn ==text== into highlights.

export default function HighlightBlock({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`hl-block${on ? " on" : ""} ${className}`}>{children}</div>;
}
