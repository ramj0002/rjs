import type { Metadata } from "next";
import { og } from "@/lib/meta";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import "../ktmb/case.css";
import "../xyr/xyr.css";
import "./renders.css";
import CaseImage from "@/components/CaseImage";
import HighlightBlock from "@/components/Highlight";
import RenderViews from "@/components/RenderViews";
import ClockParts from "@/components/ClockParts";
import PickABox from "@/components/PickABox";
import ClockEvolution from "@/components/ClockEvolution";
import { plates } from "@/components/plates";
import { renders as r } from "@/content/renders";
import { site } from "@/content/site";

export const metadata: Metadata = og({
  title: `3D rendered visualisations — ${site.title}`,
  description: r.tagline,
});

const sections = [
  ["clock", "the clock"],
  ["renders", "renders"],
  ["evolution", "evolution"],
  ["teardown", "teardown"],
  ["bloom", "bloom & rise"],
];

const exists = (src: string) => fs.existsSync(path.join(process.cwd(), "public", src));

export default function Renders() {
  return (
    <main className="case xyr page-theme t-yellow">
      <header className="case-hero">
        <div className="case-hero-text">
          <p className="case-kicker"><em>case study · Spatial / 3D</em></p>
          <h1 className="display">{r.title}</h1>
          <p className="case-tagline">{r.tagline}</p>
          <ul className="tools">{r.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="case-hero-plate plate-svg" aria-hidden dangerouslySetInnerHTML={{ __html: plates.renders() }} />
      </header>

      <nav className="case-nav" aria-label="Sections">
        {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <section id="clock" className="case-sec">
        <h2 className="display">the IKEA clock</h2>
        <p className="case-lead">{r.ikea.intro}</p>
        <div className="case-grid-1 case-big">
          <CaseImage {...r.ikea.image} />
        </div>
      </section>

      <section id="renders" className="case-sec">
        <h2 className="display">product renders</h2>
        <p className="case-lead">Modelled in Autodesk Inventor, rendered in KeyShot. Pick a view to see it large.</p>
        <RenderViews views={r.views.map((v) => ({ ...v, ok: exists(v.src) }))} />
        <div className="case-grid-1 case-big" style={{ marginTop: 40 }}>
          <CaseImage {...r.exploded} />
        </div>
      </section>

      <section id="evolution" className="case-sec">
        <h2 className="display">one change at a time</h2>
        <p className="case-lead">{r.evolution.text}</p>
        <ClockEvolution src={r.evolution.src} />
      </section>

      <section id="teardown" className="case-sec">
        <h2 className="display">syntactic analysis</h2>
        <p className="case-lead">{r.analysis.intro}</p>
        <ClockParts parts={r.parts} />
        <div className="case-grid-1 case-big" style={{ marginTop: 40 }}>
          <CaseImage {...r.analysis.board} />
        </div>
      </section>

      <section id="bloom" className="case-sec">
        <h2 className="rd-bloom">Bloom &amp; <em>Rise</em></h2>
        <HighlightBlock>
          <p className="case-lead">
            Bloom &amp; Rise started with a simple question: <mark className="hl" style={{ ["--i" as string]: 0 }}><em>{r.bloom.question}</em></mark>
          </p>
        </HighlightBlock>
        <p className="case-lead">{r.bloom.text}</p>
        <div className="case-grid-2 rd-posters" style={{ marginTop: 28 }}>
          {r.bloom.posters.map((im) => <CaseImage key={im.src} {...im} />)}
        </div>
        <h3 className="display rd-try">pick a box</h3>
        <p className="case-lead">Five colours to collect, and one rare secret flower. Tap a box to unbox it.</p>
        <PickABox />
      </section>

      <SiteFooter back />
    </main>
  );
}
