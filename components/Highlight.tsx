"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Marker-pen highlights that sweep in one after another whenever the block scrolls into view.
// Use with marks() from ./marks to turn ==text== into highlights.

export default function HighlightBlock({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current!;
    // Plays every time the block comes into view, and resets once it's fully out of view.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.45) setOn(true);
        else if (!e.isIntersecting) setOn(false);
      },
      { threshold: [0, 0.45] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`hl-block${on ? " on" : ""} ${className}`}>{children}</div>;
}
