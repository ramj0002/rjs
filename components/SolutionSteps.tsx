// The solution as four illustrated steps: heat not images → follows movement →
// maps foot traffic → sends it to the server. Icons are small looping drawings.

type Point = { icon: string; title: string; text: string };

function Icon({ kind }: { kind: string }) {
  const common = { viewBox: "0 0 120 90", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "heat") {
    // a crossed-out camera becomes a warm heat blob
    return (
      <svg {...common}>
        <g opacity=".35">
          <rect x="10" y="30" width="38" height="28" rx="5" />
          <circle cx="29" cy="44" r="8" />
          <path d="M6 64 L52 24" stroke="#e0301e" />
        </g>
        <path d="M58 44 H70 M66 40 L70 44 L66 48" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx="95" cy="44" r={8 + i * 8} opacity={0.9 - i * 0.3} fill={i === 0 ? "currentColor" : "none"} className="a-pulse" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
      </svg>
    );
  }
  if (kind === "path") {
    // a heat dot walking a dotted path
    return (
      <svg {...common}>
        <path d="M12 70 C 30 20, 60 80, 78 34 S 104 22, 110 18" strokeDasharray="2 7" opacity=".5" />
        <circle r="7" fill="currentColor" stroke="none">
          <animateMotion dur="3.2s" repeatCount="indefinite" path="M12 70 C 30 20, 60 80, 78 34 S 104 22, 110 18" />
        </circle>
      </svg>
    );
  }
  if (kind === "map") {
    // a little floor-plan heat map
    const dots = [];
    for (let y = 0; y < 5; y++)
      for (let x = 0; x < 8; x++) {
        const v = Math.exp(-((x - 2) ** 2 + (y - 2) ** 2) / 2) + 0.8 * Math.exp(-((x - 6) ** 2 + (y - 3.4) ** 2) / 1.6);
        dots.push(<circle key={`${x}${y}`} cx={18 + x * 12} cy={21 + y * 12} r={Math.min(5.4, 0.8 + v * 5).toFixed(1)} fill="currentColor" stroke="none" className="a-heat" style={{ animationDelay: `${((x + y) * 0.1).toFixed(2)}s` }} />);
      }
    return (
      <svg {...common}>
        <rect x="8" y="11" width="104" height="68" rx="4" opacity=".5" />
        {dots}
      </svg>
    );
  }
  // server: wifi waves into a stack
  return (
    <svg {...common}>
      <circle cx="22" cy="60" r="3.5" fill="currentColor" stroke="none" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${22 + 8 + i * 8} ${60 - 8 - i * 8} A ${10 + i * 8} ${10 + i * 8} 0 0 1 ${22 + 10 + i * 8} 60`} className="a-blink" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      <rect x="70" y="18" width="40" height="18" rx="3" />
      <rect x="70" y="40" width="40" height="18" rx="3" />
      <rect x="70" y="62" width="40" height="18" rx="3" />
      <circle cx="78" cy="27" r="2.2" fill="currentColor" stroke="none" className="a-blink" />
      <circle cx="78" cy="49" r="2.2" fill="currentColor" stroke="none" className="a-blink" style={{ animationDelay: "0.5s" }} />
      <circle cx="78" cy="71" r="2.2" fill="currentColor" stroke="none" className="a-blink" style={{ animationDelay: "1s" }} />
    </svg>
  );
}

export default function SolutionSteps({ points }: { points: Point[] }) {
  return (
    <ol className="sol">
      {points.map((p, i) => (
        <li key={p.title} style={{ ["--i" as string]: i }}>
          <div className="sol-icon plate-svg"><Icon kind={p.icon} /></div>
          <span className="num display">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="display">{p.title}</h3>
          <p>{p.text}</p>
        </li>
      ))}
    </ol>
  );
}
