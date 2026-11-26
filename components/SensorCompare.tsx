// "What each option sees": camera vs. basic motion sensor vs. the thermal downlight,
// with the same four checks under each so the trade-offs read at a glance.

type Check = { label: string; good: boolean; note: string };
type Option = { key: string; title: string; sees: string; checks: Check[]; ours?: boolean };

const options: Option[] = [
  {
    key: "camera",
    title: "camera",
    sees: "sees exactly who you are",
    checks: [
      { label: "Cost", good: false, note: "expensive" },
      { label: "Privacy", good: false, note: "records faces" },
      { label: "Computing", good: false, note: "heavy video processing" },
      { label: "Movement", good: true, note: "detailed" },
    ],
  },
  {
    key: "motion",
    title: "basic motion sensor",
    sees: "only knows someone is there",
    checks: [
      { label: "Cost", good: true, note: "cheap" },
      { label: "Privacy", good: true, note: "no images" },
      { label: "Computing", good: true, note: "light" },
      { label: "Movement", good: false, note: "no position or path" },
    ],
  },
  {
    key: "thermal",
    title: "thermal downlight",
    sees: "sees where people are, not who",
    ours: true,
    checks: [
      { label: "Cost", good: true, note: "low cost, built into lights" },
      { label: "Privacy", good: true, note: "heat only, no faces" },
      { label: "Computing", good: true, note: "64 numbers, not video" },
      { label: "Movement", good: true, note: "position, paths, dwell time" },
    ],
  },
];

function Picture({ kind }: { kind: string }) {
  if (kind === "camera") {
    return (
      <svg viewBox="0 0 200 150" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        {/* viewfinder corners */}
        <path d="M20 40 V20 H40 M160 20 H180 V40 M180 110 V130 H160 M40 130 H20 V110" />
        <circle cx="168" cy="32" r="4" fill="var(--accent)" stroke="none" className="a-blink" />
        <text x="150" y="36" textAnchor="end" fontSize="11" fill="var(--accent)" stroke="none" fontFamily="Anton, sans-serif">REC</text>
        {/* an identifiable person */}
        <circle cx="100" cy="62" r="22" />
        <path d="M91 58 h0.1 M109 58 h0.1" strokeWidth={5} />
        <path d="M92 71 Q100 77 108 71" />
        <path d="M84 44 Q100 30 116 44" />
        <path d="M58 130 Q62 92 100 90 Q138 92 142 130" />
        {/* face-recognition box */}
        <rect x="72" y="34" width="56" height="58" stroke="var(--accent)" strokeDasharray="5 4" strokeWidth={1.8} />
      </svg>
    );
  }
  if (kind === "motion") {
    return (
      <svg viewBox="0 0 200 150" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M80 22 H120 V34 Q100 52 80 34 Z" fill="var(--panel)" />
        <path d="M70 44 Q100 70 130 44" opacity=".35" className="a-pulse" />
        <path d="M58 56 Q100 92 142 56" opacity=".2" className="a-pulse" style={{ animationDelay: "0.4s" }} />
        <rect x="52" y="92" width="96" height="40" rx="20" fill="currentColor" />
        <text x="100" y="118" textAnchor="middle" fontSize="18" fill="#fff" stroke="none" fontFamily="Anton, sans-serif">MOTION: YES</text>
      </svg>
    );
  }
  // thermal: an 8×8 halftone with two warm blobs
  const dots = [];
  for (let y = 0; y < 8; y++)
    for (let x = 0; x < 8; x++) {
      const v = Math.exp(-((x - 2.2) ** 2 + (y - 3) ** 2) / 2.2) + Math.exp(-((x - 5.6) ** 2 + (y - 4.8) ** 2) / 2);
      const r = Math.min(6.4, 0.9 + v * 6);
      dots.push(
        <circle key={`${x}-${y}`} cx={44 + x * 16} cy={19 + y * 16} r={r.toFixed(1)} fill="currentColor" stroke="none"
          className="a-heat" style={{ animationDelay: `${((x + y) * 0.09).toFixed(2)}s` }} />,
      );
    }
  return (
    <svg viewBox="0 0 200 150" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="36" y="11" width="128" height="128" opacity=".5" />
      {dots}
    </svg>
  );
}

export default function SensorCompare() {
  return (
    <div className="compare">
      {options.map((o) => (
        <div key={o.key} className={`compare-card${o.ours ? " ours" : ""}`}>
          {o.ours && <span className="compare-badge display">our approach</span>}
          <div className="compare-pic plate-svg">
            <Picture kind={o.key} />
          </div>
          <h3 className="display">{o.title}</h3>
          <p className="compare-sees"><em>{o.sees}</em></p>
          <ul>
            {o.checks.map((c) => (
              <li key={c.label} className={c.good ? "good" : "bad"}>
                <span className="mark" aria-label={c.good ? "good" : "bad"}>{c.good ? "✓" : "✕"}</span>
                <b>{c.label}</b>
                <span className="note">{c.note}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
