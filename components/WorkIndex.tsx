"use client";
import { useEffect, useRef, useState } from "react";
import { categories, projects, type Category } from "@/content/projects";
import Halftone from "./Halftone";

// A filterable index of projects. Hover a row: a halftone preview follows the cursor.
// Click a row: it opens up with the image and description.

export default function WorkIndex() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [open, setOpen] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const list = projects.filter((p) => filter === "All" || p.category === filter);
  const hovered = projects.find((p) => p.title === hover);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      el.style.transform = `translate(${x + 24}px, ${y - 110}px) rotate(${(tx - x) * 0.04}deg)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    loop();
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="work" id="work">
      <div className="work-head">
        <h2 className="display">work</h2>
        <div className="filters" role="tablist">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              className={filter === c ? "on" : ""}
              onClick={() => { setFilter(c); setOpen(null); }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <ol className="rows">
        {list.map((p, i) => {
          const isOpen = open === p.title;
          return (
            <li key={p.title} className={`row ${isOpen ? "open" : ""}`}>
              <button
                className="row-head"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : p.title)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHover(p.title)}
                onPointerLeave={() => setHover(null)}
              >
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span className="title">{p.title}</span>
                <span className="cat">{p.category}</span>
                <span className="plus" aria-hidden>{isOpen ? "–" : "+"}</span>
              </button>
              {isOpen && (
                <div className="row-body">
                  <Halftone src={p.image} alt={p.title} color="#000CED" cell={6} />
                  <div className="row-text">
                    <p>{p.blurb}</p>
                    {p.link && (
                      <a
                        href={p.link}
                        {...(p.link.startsWith("/") ? {} : { target: "_blank", rel: "noreferrer" })}
                        className="spaced"
                      >
                        {p.link.startsWith("/") ? "OPEN PROJECT →" : "VIEW PROJECT ↗"}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div ref={previewRef} className={`preview ${hovered && open !== hovered.title ? "show" : ""}`} aria-hidden>
        {hovered && <Halftone key={hovered.image} src={hovered.image} alt="" color="#000CED" background="#fff" cell={5} interactive={false} />}
      </div>
    </section>
  );
}
