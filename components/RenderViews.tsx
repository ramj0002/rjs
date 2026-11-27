"use client";
import { useState } from "react";

// One big render with a strip of views to switch between. Missing files show a labelled placeholder.
type View = { src: string; label: string; ok: boolean };

export default function RenderViews({ views }: { views: View[] }) {
  const [i, setI] = useState(0);
  const v = views[i];
  return (
    <div className="rv">
      <figure className="case-img rv-main">
        <figcaption>{v.label}</figcaption>
        <div className="rv-stage">
          {v.ok ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={v.src} src={v.src} alt={`Clock render, ${v.label}`} />
          ) : (
            <div className="case-img-missing" role="img" aria-label={`${v.label} (image coming soon)`}><span>{v.src.split("/").pop()}</span></div>
          )}
        </div>
      </figure>
      <div className="rv-thumbs" role="tablist" aria-label="Views">
        {views.map((t, k) => (
          <button key={t.src} role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => setI(k)} onMouseEnter={() => setI(k)}>
            {t.ok ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.src} alt="" loading="lazy" />
            ) : (
              <span className="rv-empty" />
            )}
            <em>{t.label}</em>
          </button>
        ))}
      </div>
    </div>
  );
}
