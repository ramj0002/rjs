"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Marker-pen highlights that sweep in one after another whenever the block scrolls into view.
// Use with marks() from ./marks to turn ==text== into highlights.

export default function HighlightBlock({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current!;
    // Plays every time the block comes into view, and resets once it's mostly scrolled away.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.6) setOn(true);
        else if (e.intersectionRatio < 0.3) setOn(false); // mostly scrolled away: reset
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.6, 0.8, 1], rootMargin: "-110px 0px 0px 0px" }, // ignore the area under the sticky menus
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`hl-block${on ? " on" : ""} ${className}`}>{children}</div>;
}
