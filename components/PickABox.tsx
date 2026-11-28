"use client";
import { useState } from "react";

// Bloom & Rise's surprise mechanic: pick a box, unbox a flower clock.
// Five colours, plus one rare secret rainbow flower.

const FLOWERS = [
  { name: "pink daisy", petals: ["#e85aa8"] },
  { name: "roseberry red", petals: ["#e43a35"] },
  { name: "sunflower pop", petals: ["#e9e04a"] },
  { name: "lavender bloom", petals: ["#7d3fe0"] },
  { name: "mint clover", petals: ["#3fae45"] },
];
const SECRET = { name: "secret rainbow", petals: ["#e43a35", "#f28c28", "#e9e04a", "#3fae45", "#2f7de1", "#7d3fe0", "#e85aa8", "#2fc1c1"] };
const BOX_COLORS = ["#2f55e8", "#e85aa8", "#f2b632", "#3fae45", "#e43a35", "#7d3fe0"];

function FlowerClock({ petals, size = 150 }: { petals: string[]; size?: number }) {
  const n = 10;
  return (
    <svg viewBox="-60 -60 120 120" width={size} height={size} aria-hidden>
      {Array.from({ length: n }, (_, k) => (
        <ellipse key={k} cx="0" cy="-38" rx="15" ry="20" fill={petals[k % petals.length]} stroke="#3b2a1e" strokeWidth="2" transform={`rotate(${(360 / n) * k})`} />
      ))}
      <circle r="31" fill="#3b2a1e" />
      <circle r="26" fill="#f6f1e6" />
      {Array.from({ length: 12 }, (_, k) => (
        <line key={k} x1="0" y1="-22" x2="0" y2="-19" stroke="#3b2a1e" strokeWidth="1.6" transform={`rotate(${k * 30})`} />
      ))}
      <line x1="0" y1="0" x2="0" y2="-15" stroke="#3b2a1e" strokeWidth="2.4" strokeLinecap="round" transform="rotate(-60)" />
      <line x1="0" y1="0" x2="0" y2="-20" stroke="#3b2a1e" strokeWidth="1.6" strokeLinecap="round" transform="rotate(60)" />
      <circle r="2.4" fill="#3b2a1e" />
    </svg>
  );
}

export default function PickABox() {
  const [opened, setOpened] = useState<(number | null)[]>(Array(6).fill(null));
  const [found, setFound] = useState<Set<number>>(new Set());

  const open = (b: number) => {
    if (opened[b] !== null) return;
    // the secret flower is rare: about 1 box in 12
    const pick = Math.random() < 1 / 12 ? 5 : Math.floor(Math.random() * 5);
    setOpened((o) => o.map((x, k) => (k === b ? pick : x)));
    setFound((f) => new Set(f).add(pick));
  };
  const reset = () => setOpened(Array(6).fill(null));
  const all = [...FLOWERS, SECRET];

  return (
    <div className="pab">
      <div className="pab-boxes">
        {opened.map((o, b) => (
          <button key={b} className={`pab-box ${o !== null ? "open" : ""}`} onClick={() => open(b)} aria-label={o === null ? `Mystery box ${b + 1}` : all[o].name}>
            {o === null ? (
              <span className="pab-closed" style={{ ["--bx" as string]: BOX_COLORS[b], color: ["#f2b632", "#3fae45"].includes(BOX_COLORS[b]) ? "#1f1300" : "#fff" }}>
                <span className="display">?</span>
              </span>
            ) : (
              <span className="pab-flower">
                <FlowerClock petals={all[o].petals} size={120} />
                <em>{all[o].name}{o === 5 ? " ✦" : ""}</em>
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="pab-foot">
        <p className="pab-collection">
          <em>collection</em>{" "}
          {all.map((f, k) => (
            <span key={f.name} className={`pab-dot ${found.has(k) ? "got" : ""}`} title={found.has(k) ? f.name : "not found yet"}
              style={{ background: found.has(k) ? (k === 5 ? `conic-gradient(${SECRET.petals.join(",")})` : f.petals[0]) : undefined }} />
          ))}
          <span className="pab-count">{found.size} of 6{found.has(5) ? ", you found the secret one" : ""}</span>
        </p>
        <button className="pab-again" onClick={reset}>new boxes ↻</button>
      </div>
    </div>
  );
}
