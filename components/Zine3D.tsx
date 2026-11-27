"use client";
import { useEffect, useRef, useState } from "react";

// A floating 3D zine. It bobs and tilts toward the cursor (or the phone's tilt),
// and its pages turn as you scroll through the section. Arrows / keys also turn pages.

export default function Zine3D({ pages }: { pages: string[] }) {
  const section = useRef<HTMLElement>(null);
  const book = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const leaves = Math.ceil(pages.length / 2);
  const [p, setP] = useState(0); // 0 = closed cover … leaves = closed back cover
  const tapRef = useRef<(d: number) => void>(() => {});
  const resetSpin = useRef<() => void>(() => {});

  // Pages turn only when asked (buttons, tapping a page, arrow keys), easing to the next spread.
  const [target, setTarget] = useState(0);
  const pRef = useRef(0);
  useEffect(() => {
    let raf = 0;
    const step = () => {
      const d = target - pRef.current;
      pRef.current = Math.abs(d) < 0.002 ? target : pRef.current + d * 0.12;
      setP(pRef.current);
      if (pRef.current !== target) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  // Cursor / device tilt.
  useEffect(() => {
    const el = tilt.current!;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const move = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const orient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      tx = Math.max(-1, Math.min(1, e.gamma / 30));
      ty = Math.max(-1, Math.min(1, (e.beta - 40) / 30));
    };
    // Drag the zine sideways to spin it all the way round; a tap (no drag) turns the page instead.
    let spin = 0, spinV = 0, dragging = false, startX = 0, lastX = 0, moved = 0;
    const stage = el.closest(".zine-sticky") as HTMLElement;
    const down = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      dragging = true; startX = lastX = e.clientX; moved = 0; spinV = 0;
    };
    const drag = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX; lastX = e.clientX; moved = Math.max(moved, Math.abs(e.clientX - startX));
      if (moved > 6) { spin += dx * 0.5; spinV = dx * 0.5; stage.classList.add("spinning"); }
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false; stage.classList.remove("spinning");
      const face = (e.target as HTMLElement).closest(".face");
      if (moved <= 6 && face) {
        // tap a right-hand page to turn forward, a left-hand page to turn back
        tapRef.current(face.classList.contains("front") ? 1 : -1);
      }
    };
    const loop = () => {
      x += (tx - x) * 0.07; y += (ty - y) * 0.07;
      if (!dragging) { spin += spinV; spinV *= 0.92; }
      el.style.transform = `rotateX(${12 - y * 10}deg) rotateY(${x * 16 + spin}deg)`;
      raf = requestAnimationFrame(loop);
    };
    resetSpin.current = () => { spinV = 0; spin = Math.round(spin / 360) * 360; };
    stage.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", drag);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointermove", move);
    window.addEventListener("deviceorientation", orient);
    loop();
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("deviceorientation", orient);
      stage.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", drag);
      window.removeEventListener("pointerup", up);
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = (dir: number) => setTarget((t) => Math.max(0, Math.min(leaves, t + dir)));
  tapRef.current = go;
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      const b = section.current!.getBoundingClientRect();
      if (b.bottom < 120 || b.top > window.innerHeight - 120) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  });

  // Keep the visible spread centred: closed cover sits right of the spine, back cover left.
  const open = Math.min(1, p);
  const close = Math.max(0, p - (leaves - 1));
  const shift = -50 * (1 - open) + 50 * close; // % of one page width
  const spread = target;
  // an empty string in pages = no page on that side (it isn't drawn and isn't counted)
  const nums = [spread * 2 - 1, spread * 2].filter((n) => pages[n]);
  const label =
    spread === 0 ? "cover" : spread === leaves ? "back cover" : nums.length === 1 ? `page ${nums[0]}` : `pages ${nums[0]}–${nums[1]}`;

  return (
    <section ref={section} className="zine-stage">
      <div className="zine-sticky">
        <div className="zine-float">
          <div ref={tilt} className="zine-tilt">
            <div ref={book} className="zine-book" style={{ transform: `translateX(${shift}%)` }}>
              {Array.from({ length: leaves }, (_, i) => {
                const turn = Math.max(0, Math.min(1, p - i));
                const z = turn > 0.5 ? i : leaves - i;
                const front = pages[i * 2];
                const back = pages[i * 2 + 1];
                return (
                  <div
                    key={i}
                    className="leaf"
                    style={{ transform: `rotateY(${-180 * turn}deg) translateZ(${((leaves - i) * (1 - turn) - i * turn) * 0.6}px)`, zIndex: z }}
                  >
                    <div className={`face front ${front ? "" : "empty"}`}>{front && <img src={front} alt={`page ${i * 2}`} draggable={false} />}</div>
                    <div className={`face back ${back ? "" : "empty"}`}>{back && <img src={back} alt={`page ${i * 2 + 1}`} draggable={false} />}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="zine-shadow" />
        </div>
        <div className="zine-controls">
          <button onClick={() => go(-1)} aria-label="previous page" disabled={spread === 0}>←</button>
          <span>{label}</span>
          <button onClick={() => go(1)} aria-label="next page" disabled={spread === leaves}>→</button>
        </div>
        <p className="zine-hint"><em>tap a page or the arrows to turn it · drag sideways to spin it round</em></p>
      </div>
    </section>
  );
}
