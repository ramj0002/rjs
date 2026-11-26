"use client";
import { useState } from "react";
import Link from "next/link";
import { categories, projects, type Category } from "@/content/projects";
import { plates } from "./plates";
import Halftone from "./Halftone";
import BagPlate from "./BagPlate";

// Project cards: a drawn plate (or halftone image), key numbers, tools and a link.
// One project per row: plate on the left, details on the right.

export default function WorkGrid() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const shown = (p: (typeof projects)[number]) => filter === "All" || p.category === filter;
  const firstShown = projects.find(shown);
  const count = (c: Category | "All") => (c === "All" ? projects.length : projects.filter((p) => p.category === c).length);

  return (
    <section className="work" id="work">
      <div className="work-head">
        <h2 className="display">work</h2>
        <div className="filters" role="toolbar" aria-label="Filter projects">
          {(["All", ...categories] as const).map((c) => (
            <button key={c} aria-pressed={filter === c} className={filter === c ? "on" : ""} onClick={() => setFilter(c)}>
              {c}
              <span className="n">{count(c)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="cards">
        {/* Every card is always rendered. Hidden ones are stacked invisibly in the first
            row so they still count toward the shared row height: every card keeps the
            same size whichever filter is on. */}
        {projects.map((p) => {
          const fig = projects.indexOf(p) + 1;
          const visible = shown(p);
          const pin = !visible || p === firstShown;
          const internal = p.link.startsWith("/");
          const LinkEl = internal ? Link : "a";
          return (
            <article
              key={p.id}
              className={`card${visible ? "" : " ghost"}`}
              style={pin ? { gridArea: "1 / 1" } : undefined}
              aria-hidden={!visible}
              inert={!visible}
            >
              <div className="plate">
                {p.image ? (
                  <Halftone src={p.image} alt={p.title} color="#000CED" cell={6} />
                ) : p.id === "bag" ? (
                  <div className="plate-svg"><BagPlate /></div>
                ) : (
                  <div className="plate-svg" role="img" aria-label={`Drawing for ${p.title}`}
                    dangerouslySetInnerHTML={{ __html: plates[p.id]?.() ?? "" }} />
                )}
                <span className="fig display">{String(fig).padStart(2, "0")}</span>
              </div>
              <div className="card-body">
                <p className="cat"><em>{p.category}</em></p>
                <h3 className="display">{p.title}</h3>
                <p className="summary">{p.summary}</p>
                <div className="facts">
                  {p.facts.map(([big, small]) => (
                    <div key={big}>
                      <b className="display">{big}</b>
                      <span>{small}</span>
                    </div>
                  ))}
                </div>
                <ul className="tools">
                  {p.tools.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <LinkEl
                  className="more"
                  href={p.link}
                  {...(internal ? {} : { target: "_blank", rel: "noreferrer" })}
                >
                  {p.linkLabel} <span aria-hidden>→</span>
                </LinkEl>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
