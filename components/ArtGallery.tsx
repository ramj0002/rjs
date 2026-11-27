"use client";
import { useEffect, useState } from "react";

// Artworks in equal frames (whole piece always shown), with a lightbox to see each one large.
type Art = { src: string; title: string; medium: string; wide?: boolean };

export default function ArtGallery({ art }: { art: Art[] }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % art.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + art.length) % art.length));
    };
    addEventListener("keydown", key);
    document.documentElement.style.overflow = "hidden";
    return () => { removeEventListener("keydown", key); document.documentElement.style.overflow = ""; };
  }, [open, art.length]);

  const wide = art.filter((a) => a.wide), tall = art.filter((a) => !a.wide);
  const tile = (a: Art) => {
    const k = art.indexOf(a);
    return (
      <button key={a.src} className="ag-tile" onClick={() => setOpen(k)}>
        <span className="ag-cap"><b className="display">{a.title}</b><em>{a.medium}</em></span>
        <span className="ag-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.src} alt={`${a.title}, ${a.medium}`} loading="lazy" />
        </span>
      </button>
    );
  };

  return (
    <>
      <div className="ag ag-wide">{wide.map(tile)}</div>
      <div className="ag ag-tall">{tall.map(tile)}</div>

      {open !== null && (
        <div className="ag-box" role="dialog" aria-modal="true" aria-label={art[open].title} onClick={() => setOpen(null)}>
          <figure onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={art[open].src} alt={`${art[open].title}, ${art[open].medium}`} />
            <figcaption><b className="display">{art[open].title}</b> <em>{art[open].medium}</em> <span>{open + 1} / {art.length}</span></figcaption>
          </figure>
          <button className="ag-nav prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + art.length) % art.length); }}>←</button>
          <button className="ag-nav next" aria-label="Next" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % art.length); }}>→</button>
          <button className="ag-close" aria-label="Close" onClick={() => setOpen(null)}>×</button>
        </div>
      )}
    </>
  );
}
