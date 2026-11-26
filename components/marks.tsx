import type { ReactNode } from "react";

// Turns ==text== into <mark class="hl">, numbered so highlights sweep in order.
export function marks(text: string, start = 0): { nodes: ReactNode[]; next: number } {
  let n = start;
  const nodes = text.split(/==(.+?)==/g).map((part, i) =>
    i % 2 ? <mark key={i} className="hl" style={{ ["--i" as string]: n++ }}>{part}</mark> : part,
  );
  return { nodes, next: n };
}

