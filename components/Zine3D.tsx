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

  // Scroll → page progress.
  useEffect(() => {
    const el = section.current!;
    let raf = 0;
    const update = () => {
      raf = 0;
      const b = el.getBoundingClientRect();
      const run = b.height - window.innerHeight;
      const t = Math.max(0, Math.min(1, -b.top / Math.max(1, run)));
      setP(t * leaves);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [leaves]);

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
    const loop = () => {
      x += (tx - x) * 0.07; y += (ty - y) * 0.07;
      el.style.transform = `rotateX(${12 - y * 10}deg) rotateY(${x * 16}deg)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("deviceorientation", orient);
    loop();
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("deviceorientation", orient);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Jump to a page by scrolling the section.
  const go = (dir: number) => {
    const el = section.current!;
    const target = Math.max(0, Math.min(leaves, Math.round(p) + dir));
    const top = el.getBoundingClientRect().top + window.scrollY;
    const run = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (target / leaves) * run + 1, behavior: "smooth" });
  };
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      const b = section.current!.getBoundingClientRect();
      if (b.top > 0 || b.bottom < window.innerHeight) return;
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
  const spread = Math.round(p);
  const label =
    spread === 0 ? "cover" : spread === leaves ? "back cover" : `pages ${spread * 2 - 1}–${spread * 2}`;

  return (
    <section ref={section} className="zine-stage" style={{ height: `${(leaves + 1) * 90}vh` }}>
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
                    style={{ transform: `rotateY(${-180 * turn}deg)`, zIndex: z }}
                  >
                    <div className="face front">{front && <img src={front} alt={`page ${i * 2}`} draggable={false} />}</div>
                    <div className="face back">{back && <img src={back} alt={`page ${i * 2 + 1}`} draggable={false} />}</div>
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
        <p className="zine-hint"><em>scroll to turn the pages</em></p>
      </div>
    </section>
  );
}
