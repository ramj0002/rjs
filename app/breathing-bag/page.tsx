import type { Metadata } from "next";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import "../ktmb/case.css";
import "../glow-of-orchard/orchard.css";
import "../xyr/xyr.css";
import "./bag.css";
import CaseImage from "@/components/CaseImage";
import HighlightBlock from "@/components/Highlight";
import BagPlate from "@/components/BagPlate";
import BagDashboard from "@/components/BagDashboard";
import { bag as b } from "@/content/bag";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Breathing Bag — ${site.title}`,
  description: b.tagline,
};

const sections = [
  ["overview", "overview"],
  ["how", "how it works"],
  ["dashboard", "dashboard"],
  ["circuit", "circuit"],
  ["holder", "3D holder"],
  ["build", "the bag"],
];

const exists = (src: string) => fs.existsSync(path.join(process.cwd(), "public", src));

function Media({ src, caption }: { src: string; caption: string }) {
  if (src.endsWith(".mp4") && exists(src))
    return (
      <figure className="case-img">
        <figcaption>{caption}</figcaption>
        <video src={src} poster={src.replace(".mp4", ".jpg")} autoPlay muted loop playsInline preload="metadata" />
      </figure>
    );
  return <CaseImage src={src} caption={caption} />;
}

export default function BreathingBag() {
  return (
    <main className="case xyr page-theme t-teal">
      <header className="case-hero">
        <div className="case-hero-text">
          <p className="case-kicker"><em>case study · Creative Tech</em></p>
          <h1 className="display">{b.title}</h1>
          <p className="case-tagline">{b.tagline}</p>
          <ul className="tools">{b.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="case-hero-plate plate-svg bag-hero-plate"><BagPlate /></div>
      </header>

      <nav className="case-nav" aria-label="Sections">
        {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <section id="overview" className="case-sec bag-overview">
        <h2 className="display">overview</h2>
        <HighlightBlock>
          <p className="bag-q display">What if a bag was <mark className="hl" style={{ ["--i" as string]: 0 }}><em className="bag-alive" aria-label="alive">{"alive".split("").map((ch, i) => <span key={i} aria-hidden style={{ ["--k" as string]: i }}>{ch}</span>)}</em></mark>?</p>
        </HighlightBlock>
        <div className="case-two">
          <p className="case-lead">{b.intro}</p>
          <HighlightBlock className="pop-block">
            <div className="case-stats vertical">
              {b.stats.map(([big, small]) => (
                <div key={small}><b className="display">{big}</b><span>{small}</span></div>
              ))}
            </div>
          </HighlightBlock>
        </div>
      </section>

      <section id="how" className="case-sec">
        <h2 className="display">how it works</h2>
        <HighlightBlock className="orch-flow">
          <ol>
            {b.steps.map((s, i) => (
              <li key={s.title} style={{ ["--i" as string]: i }}>
                <span className="num display">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </HighlightBlock>
        <div className="case-grid-1 case-big" style={{ marginTop: 36 }}>
          <CaseImage {...b.sketch} />
        </div>
      </section>

      <section id="dashboard" className="case-sec">
        <h2 className="display">the dashboard</h2>
        <p className="case-lead">Try it. These buttons work like the real ones.</p>
        <BagDashboard />
        <div className="case-rows case-rows-big" style={{ marginTop: 36 }}>
          {b.modes.map(([title, text]) => (
            <div key={title}>
              <h3 className="display">{title}</h3>
              <div><p>{text}</p></div>
            </div>
          ))}
        </div>
        <div className="case-grid-1 case-big" style={{ marginTop: 36 }}>
          <CaseImage {...b.dashboard} />
        </div>
      </section>

      <section id="circuit" className="case-sec">
        <h2 className="display">from circuit to fashion</h2>
        <p className="case-lead">{b.circuit.text}</p>
        <figure className="case-img bag-circuit">
          <figcaption>Circuit, live preview from Cirkit Designer</figcaption>
          <iframe src={b.circuit.embed} title="Breathing Bag circuit in Cirkit Designer" loading="lazy" allowFullScreen />
        </figure>
        <p className="case-note"><a href={b.circuit.link} target="_blank" rel="noreferrer">Open the circuit in Cirkit Designer →</a></p>
        <div className="bag-three" style={{ marginTop: 36 }}>
          {b.build.map((m) => <Media key={m.src} {...m} />)}
        </div>
      </section>

      <section id="holder" className="case-sec">
        <h2 className="display">3D model holder</h2>
        <p className="case-lead">{b.holder.text}</p>
        <div className="case-grid-2 bag-holders">
          {b.holder.images.map((im) => <CaseImage key={im.src} {...im} />)}
        </div>
      </section>

      <section id="build" className="case-sec">
        <h2 className="display">the bag</h2>
        <div className="bag-three">
          {b.videos.map((m) => <Media key={m.src} {...m} />)}
        </div>
      </section>

      <footer className="case-foot">
        <Link href="/#work" className="display">← all work</Link>
      </footer>
    </main>
  );
}
