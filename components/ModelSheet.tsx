"use client";
import { useState } from "react";

// A drafting sheet: the chosen model on grid paper with a title block, and the others below.
type Model = { src: string; name: string; note: string };

export default function ModelSheet({ models }: { models: Model[] }) {
  const [i, setI] = useState(0);
  const m = models[i];
  return (
    <div className="ms">
      <div className="ms-sheet">
        <div className="ms-paper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={m.src} src={m.src} alt={`${m.name}, modelled in Autodesk Inventor`} />
          <span className="ms-fig"><em>Fig. {i + 1}</em></span>
        </div>
        <dl className="ms-block">
          <div className="ms-title"><dt>Part</dt><dd className="display">{m.name}</dd></div>
          <div className="ms-note"><dt>Notes</dt><dd>{m.note}</dd></div>
          <div><dt>Software</dt><dd>Autodesk Inventor</dd></div>
          <div><dt>Drawn by</dt><dd>Ram Jeet Singh</dd></div>
          <div><dt>Sheet</dt><dd>{i + 1} of {models.length}</dd></div>
        </dl>
      </div>
      <div className="ms-thumbs" role="tablist" aria-label="Models">
        {models.map((t, k) => (
          <button key={t.src} role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => setI(k)} onMouseEnter={() => setI(k)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.src} alt="" loading="lazy" />
            <em>{t.name}</em>
          </button>
        ))}
      </div>
    </div>
  );
}
