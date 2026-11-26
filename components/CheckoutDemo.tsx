"use client";
import { useEffect, useRef, useState } from "react";

// Shows how XYR's checkout works as one all-or-nothing transaction.
// Pick a scenario; the steps play out: lock each item's stock row, check it,
// then either commit (stock drops, sale saved, email sent) or roll everything back.

type Item = { name: string; size: string; want: number; stock: number };

const scenarios: Record<string, { label: string; items: Item[] }> = {
  ok: {
    label: "everything in stock",
    items: [
      { name: "Black boxy coat", size: "M", want: 1, stock: 4 },
      { name: "Square sunglasses", size: "One size", want: 1, stock: 9 },
      { name: "Leather derbys", size: "42", want: 1, stock: 2 },
    ],
  },
  fail: {
    label: "one item sold out",
    items: [
      { name: "Black boxy coat", size: "M", want: 1, stock: 4 },
      { name: "Square sunglasses", size: "One size", want: 1, stock: 9 },
      { name: "Leather derbys", size: "42", want: 1, stock: 0 },
    ],
  },
};

export default function CheckoutDemo() {
  const [key, setKey] = useState<"ok" | "fail">("ok");
  const [step, setStep] = useState(0); // 0 start, 1..n checking items, n+1 result
  const [run, setRun] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const items = scenarios[key].items;
  const failAt = items.findIndex((i) => i.want > i.stock);
  const last = failAt === -1 ? items.length : failAt + 1; // stop at the first failure

  // Play when scrolled into view, and whenever the scenario changes.
  useEffect(() => {
    const el = ref.current!;
    let timers: ReturnType<typeof setTimeout>[] = [];
    const play = () => {
      timers.forEach(clearTimeout); timers = [];
      setStep(0);
      for (let s = 1; s <= last + 1; s++) timers.push(setTimeout(() => setStep(s), 300 + s * 650));
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) play(); }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, [key, run, last]);

  const done = step > last;
  const ok = failAt === -1;

  return (
    <div ref={ref} className="co">
      <div className="co-tabs" role="tablist" aria-label="Checkout scenario">
        {(["ok", "fail"] as const).map((k) => (
          <button key={k} role="tab" aria-selected={key === k} className={key === k ? "on" : ""}
            onClick={() => { setKey(k); setRun((r) => r + 1); }}>
            {scenarios[k].label}
          </button>
        ))}
        <button className="co-replay" onClick={() => setRun((r) => r + 1)} aria-label="Replay">↻ replay</button>
      </div>

      <div className="co-body">
        <ol className="co-steps">
          <li className={step >= 0 ? "on" : ""}><b className="display">begin transaction</b></li>
          {items.map((it, i) => {
            const reached = step >= i + 1 && i < last;
            const state = it.want <= it.stock ? "pass" : "fail";
            return (
              <li key={it.name} className={reached ? `on ${state}` : ""}>
                <span className="lock" aria-label={reached ? "row locked" : undefined}>
                  {reached && (
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="7" width="10" height="7" rx="1.5" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
                    </svg>
                  )}
                </span>
                <span className="co-item">
                  <b className="display">{it.name}</b>
                  <em>size {it.size} · wants {it.want} · in stock {it.stock}</em>
                </span>
                <span className="co-mark">{reached ? (it.want <= it.stock ? "✓" : "✕") : ""}</span>
              </li>
            );
          })}
        </ol>

        <div className={`co-result ${done ? (ok ? "commit" : "rollback") : ""}`} aria-live="polite">
          {!done && <p className="co-wait"><em>checking each item…</em></p>}
          {done && ok && (
            <>
              <p className="display co-big">commit ✓</p>
              <ul>
                <li>Stock goes down for each size</li>
                <li>Each item is saved to sales</li>
                <li>The bag is emptied</li>
                <li>A confirmation email is sent</li>
              </ul>
            </>
          )}
          {done && !ok && (
            <>
              <p className="display co-big">rollback ↺</p>
              <ul>
                <li>{items[failAt].name} is sold out</li>
                <li>Nothing is charged or changed</li>
                <li>The other items stay in the bag</li>
                <li>No half-finished order</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
