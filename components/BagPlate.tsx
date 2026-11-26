"use client";
import { useEffect, useRef } from "react";

// The Breathing Bag as a technical drawing. Its ten fringes sway gently on their own
// ("breathing") and swing when you brush them with the cursor or a finger.

const TOP = 330; // where the fringes hang from (bottom edge of the bag)

export default function BagPlate() {
  const svgRef = useRef<SVGSVGElement>(null);
  const fringeRef = useRef<SVGGElement>(null);
  const servoRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current!;
    const fr = fringeRef.current!;
    const servos = servoRef.current!;

    type F = { px: number; len: number; row: number; a: number; v: number; b: number };
    const F: F[] = [];
    let servoHtml = '<rect x="184" y="246" width="272" height="44" stroke-dasharray="4 4" opacity=".55"/>';
    for (let i = 0; i < 10; i++) {
      const x = 182 + i * 32, row = i < 3 ? 0 : i < 7 ? 1 : 2, len = 112 + ((i * 29) % 34);
      F.push({ px: x, len, row, a: 0, v: 0, b: 0 });
      servoHtml += `<rect x="${186 + i * 27}" y="256" width="20" height="24" rx="2"/>`;
    }
    servos.innerHTML = servoHtml;
    fr.innerHTML = F.map(() => '<g><path fill="var(--panel)" stroke-width="2"/><path stroke-width="1" opacity=".4"/></g>').join("");
    const els = Array.from(fr.children).map((g) => g.children);
    const still = matchMedia("(prefers-reduced-motion: reduce)");

    const shape = (f: F) => {
      const L = f.len, a = f.a, bend = f.b;
      const tx = f.px + Math.sin(a) * L, ty = TOP + Math.cos(a) * L;
      const mx = f.px + Math.sin(a * 0.45 + bend) * L * 0.5, my = TOP + Math.cos(a * 0.45) * L * 0.5;
      const nx = Math.cos(a), ny = -Math.sin(a);
      const w0 = 7, w1 = 5;
      return [
        `M${(f.px - w0).toFixed(1)} ${TOP} Q${(mx - 6 * nx).toFixed(1)} ${(my - 6 * ny).toFixed(1)} ${(tx - w1 * nx).toFixed(1)} ${(ty - w1 * ny).toFixed(1)} L${(tx + w1 * nx).toFixed(1)} ${(ty + w1 * ny - 4).toFixed(1)} Q${(mx + 6 * nx).toFixed(1)} ${(my + 6 * ny).toFixed(1)} ${(f.px + w0).toFixed(1)} ${TOP} Z`,
        `M${f.px.toFixed(1)} ${TOP + 8} Q${mx.toFixed(1)} ${my.toFixed(1)} ${tx.toFixed(1)} ${(ty - 8).toFixed(1)}`,
      ];
    };

    let last: DOMPoint | null = null, lastT = 0, pv = 0, px = 0, py = 0, inside = false;
    let running = false, raf = 0, visible = true;
    let prev = performance.now();
    const t0 = prev;

    const toSvg = (e: PointerEvent) => {
      const p = svg.createSVGPoint();
      p.x = e.clientX; p.y = e.clientY;
      return p.matrixTransform(svg.getScreenCTM()!.inverse());
    };
    const move = (e: PointerEvent) => {
      const p = toSvg(e), now = performance.now();
      if (last) { const dt = Math.max(8, now - lastT); pv += ((p.x - last.x) / dt - pv) * 0.35; }
      last = p; lastT = now; px = p.x; py = p.y; inside = true; kick();
    };
    const leave = () => { last = null; inside = false; };

    const step = (now: number) => {
      const dt = Math.min(0.033, (now - prev) / 1000); prev = now;
      const t = (now - t0) / 1000;
      let moving = false;
      pv *= Math.exp(-dt * 6);
      F.forEach((f, i) => {
        const rest = still.matches ? 0 : Math.sin(t * 1.4 - f.row * 0.9 - i * 0.22) * 0.045;
        let force = (rest - f.a) * 16 - f.v * 2.6;
        if (inside && py > TOP - 30 && py < TOP + f.len + 40) {
          const tip = f.px + Math.sin(f.a) * f.len * 0.7, d = px - tip;
          const fall = Math.exp(-(d * d) / (2 * 38 * 38));
          const depth = Math.min(1, Math.max(0.25, (py - TOP) / f.len));
          force += pv * fall * depth * 55;
        }
        const nb = (F[i - 1] ? F[i - 1].a : f.a) + (F[i + 1] ? F[i + 1].a : f.a) - 2 * f.a;
        force += nb * 4;
        f.v += force * dt; f.v = Math.max(-3, Math.min(3, f.v)); f.a += f.v * dt;
        f.a = Math.max(-0.75, Math.min(0.75, f.a));
        f.b += (-f.v * 0.09 - f.b) * Math.min(1, dt * 10);
        if (Math.abs(f.v) > 0.002 || Math.abs(f.a - rest) > 0.002) moving = true;
        const d = shape(f);
        els[i][0].setAttribute("d", d[0]);
        els[i][1].setAttribute("d", d[1]);
      });
      if (visible && (moving || inside || !still.matches)) raf = requestAnimationFrame(step);
      else running = false;
    };
    const kick = () => {
      if (!running) { running = true; prev = performance.now(); raf = requestAnimationFrame(step); }
    };

    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) kick(); });
    io.observe(svg);
    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerleave", leave);
    kick();
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      svg.removeEventListener("pointermove", move);
      svg.removeEventListener("pointerleave", leave);
    };
  }, []);

  const serif = "Baskervville,Georgia,serif";
  const display = "Anton,Impact,sans-serif";

  return (
    <svg
      ref={svgRef}
      className="bag-plate"
      viewBox="0 0 720 560"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Technical drawing of the Breathing Bag, a leather bag whose fringes are moved by ten servo motors"
    >
      <defs>
        <pattern id="bag-hat" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="1" opacity=".22" />
        </pattern>
      </defs>
      <path d="M240 150 C240 70 400 70 400 150" strokeWidth={7} />
      <path d="M252 150 C252 88 388 88 388 150" strokeWidth={1.5} opacity={0.5} />
      <path d="M170 150 H470 L500 330 H140 Z" fill="var(--panel)" strokeWidth={3} />
      <path d="M455 150 H470 L500 330 H478 Z" fill="url(#bag-hat)" stroke="none" />
      <path d="M182 172 H458" strokeDasharray="6 6" strokeWidth={1.5} opacity={0.6} />
      <path d="M154 310 H486" strokeDasharray="6 6" strokeWidth={1.5} opacity={0.6} />
      <rect x="296" y="160" width="48" height="26" rx="4" fill="var(--panel)" />
      <circle cx="320" cy="173" r="4" fill="currentColor" />
      <g ref={servoRef} strokeWidth={1.5} />
      <g ref={fringeRef} />
      <g stroke="var(--accent)" strokeWidth={1.5}>
        <path d="M140 488 V508 M500 488 V508 M140 498 H500" />
        <path d="M146 493 L140 498 L146 503 M494 493 L500 498 L494 503" />
        <path d="M456 268 L520 228 H704" />
        <circle cx="456" cy="268" r="4" fill="var(--accent)" />
        <path d="M320 186 V200 L520 100 H704" />
        <circle cx="320" cy="186" r="4" fill="var(--accent)" />
        <path d="M152 286 L96 268 H24" />
        <circle cx="152" cy="286" r="4" fill="var(--accent)" />
      </g>
      <g fill="currentColor" stroke="none">
        <text x="24" y="44" fill="var(--accent)" fontFamily={serif} fontStyle="italic" fontSize="22">brush the fringes with your cursor</text>
        <text x="320" y="538" textAnchor="middle" fontFamily={display} fontSize="28">10 fringes in 3 rows</text>
        <text x="704" y="128" textAnchor="end" fontFamily={display} fontSize="28">arduino</text>
        <text x="704" y="154" textAnchor="end" fill="var(--soft)" fontFamily={serif} fontStyle="italic" fontSize="21">via XAMPP server</text>
        <text x="704" y="256" textAnchor="end" fontFamily={display} fontSize="28">10 × MG90S</text>
        <text x="704" y="282" textAnchor="end" fill="var(--soft)" fontFamily={serif} fontStyle="italic" fontSize="21">servos, hidden</text>
        <text x="24" y="200" fontFamily={display} fontSize="28">heart</text>
        <text x="24" y="232" fontFamily={display} fontSize="28">mode</text>
        <text x="24" y="296" fill="var(--soft)" fontFamily={serif} fontStyle="italic" fontSize="21">motors</text>
        <text x="24" y="320" fill="var(--soft)" fontFamily={serif} fontStyle="italic" fontSize="21">breathe</text>
      </g>
    </svg>
  );
}
