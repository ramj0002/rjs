import type { Metadata } from "next";
import Link from "next/link";
import "../ktmb/case.css";
import "./drawings.css";
import ArtGallery from "@/components/ArtGallery";
import { plates } from "@/components/plates";
import { site } from "@/content/site";

const tagline = "Pencil drawings, a lino print, a paper collage, a poster and a logo. Where I practise composition, line, tone and colour theory.";

export const metadata: Metadata = { title: `Drawings — ${site.title}`, description: tagline };

const art = [
  { src: "/drawings/eyes.jpg", title: "Eyes", medium: "pencil", wide: true },
  { src: "/drawings/still-life.jpg", title: "Still life", medium: "pencil", wide: true },
  { src: "/drawings/lino.jpg", title: "Mask", medium: "lino print" },
  { src: "/drawings/collage.jpg", title: "House", medium: "paper collage" },
  { src: "/drawings/black-swan.jpg", title: "Black Swan", medium: "poster" },
  { src: "/drawings/shutter-bug.jpg", title: "Shutter Bug", medium: "logo" },
];

export default function Drawings() {
  return (
    <main className="case page-theme t-red">
      <header className="case-hero">
        <div className="case-hero-text">
          <p className="case-kicker"><em>Visual / Artwork</em></p>
          <h1 className="display">Drawings</h1>
          <p className="case-tagline">{tagline}</p>
          <ul className="tools"><li>Pencil</li><li>Lino print</li><li>Collage</li><li>Digital</li></ul>
        </div>
        <div className="case-hero-plate plate-svg" aria-hidden dangerouslySetInnerHTML={{ __html: plates.drawings() }} />
      </header>

      <section className="case-sec">
        <h2 className="display">the pieces</h2>
        <p className="case-lead">Six pieces. Tap one to see it large.</p>
        <ArtGallery art={art} />
      </section>

      <footer className="case-foot">
        <Link href="/#work" className="display">← all work</Link>
        <Link href="/about/">about me →</Link>
      </footer>
    </main>
  );
}
