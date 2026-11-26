import type { Metadata } from "next";
import Link from "next/link";
import "../ktmb/case.css";
import "./orchard.css";
import CaseImage from "@/components/CaseImage";
import HighlightBlock from "@/components/Highlight";
import ThermalDemo from "@/components/ThermalDemo";
import SensorCompare from "@/components/SensorCompare";
import SolutionSteps from "@/components/SolutionSteps";
import { marks } from "@/components/marks";
import { plates } from "@/components/plates";
import { orchard as o } from "@/content/orchard";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Glow of Orchard — ${site.title}`,
  description: o.subtitle,
};

const sections = [
  ["overview", "overview"],
  ["system", "system"],
  ["algorithm", "heat map"],
  ["built", "what I built"],
  ["prototypes", "prototypes"],
  ["production", "production"],
  ["patent", "patent"],
];

export default function GlowOfOrchard() {
  return (
    <main className="case page-theme t-teal">
      <header className="case-hero">
        <div className="case-hero-text">
          <p className="case-kicker"><em>case study · Creative Tech</em></p>
          <h1 className="display">{o.title}</h1>
          <p className="case-tagline">{o.tagline}</p>
          <ul className="tools">{o.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="case-hero-plate plate-svg" aria-hidden dangerouslySetInnerHTML={{ __html: plates.orchard() }} />
      </header>

      <nav className="case-nav" aria-label="Sections">
        {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <section id="overview" className="case-sec">
        <h2 className="display">overview</h2>
        <div className="case-two">
          <div>
            <p className="case-lead">{o.subtitle}</p>
            <p>{o.context}</p>
          </div>
          <HighlightBlock className="pop-block">
            <div className="case-stats vertical single">
              {o.stats.map(([big, small]) => (
                <div key={small}><b className="display">{big}</b><span>{small}</span></div>
              ))}
            </div>
          </HighlightBlock>
        </div>

        <h3 className="display case-h3">the problem</h3>
        <p className="case-lead">Stores want to know how people move, but the usual options each fall short somewhere.</p>
        <SensorCompare />
        <HighlightBlock>
          <blockquote className="orch-hmw">“{marks(o.hmw).nodes}”</blockquote>
        </HighlightBlock>

        <h3 className="display case-h3">the solution</h3>
        <p className="case-lead">{o.solution.intro}</p>
        <HighlightBlock className="sol-block">
          <SolutionSteps points={o.solution.points} />
        </HighlightBlock>
      </section>

      <section id="system" className="case-sec">
        <h2 className="display">system flow</h2>
        <HighlightBlock className="orch-flow">
          <ol>
            {o.flow.map((s, i) => (
              <li key={s.title} style={{ ["--i" as string]: i }}>
                <span className="num display">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </HighlightBlock>

        <h3 className="display case-h3">hardware layer</h3>
        <div className="orch-hw-wrap">
          <CaseImage src={o.hardwareImage.src} caption={o.hardwareImage.caption} className="orch-photo" />
          <div>
            <p>Each lighting unit includes:</p>
            <div className="orch-hw">
              {o.hardware.map((hw) => (
                <div key={hw.title}>
                  <h3 className="display">{hw.title}</h3>
                  <p className="label">{hw.sub}</p>
                  <ul className="case-list">{hw.points.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="algorithm" className="case-sec">
        <h2 className="display">heat map algorithm</h2>
        <p className="case-lead">The sensor only sees 64 points. Bilinear interpolation (written in Java for the real system) fills in the gaps to make a smooth heat map. Try it: move your cursor over either grid to add your own body heat (shown in red).</p>
        <ThermalDemo />
      </section>

      <section id="built" className="case-sec">
        <h2 className="display">what I built</h2>
        <div className="case-rows case-rows-big">
          {o.built.map(([title, text]) => (
            <div key={title}>
              <h3 className="display">{title}</h3>
              <div><p>{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="prototypes" className="case-sec">
        <h2 className="display">prototypes</h2>
        <p className="case-lead">It took five boards to get a sensor that read reliably, stayed on Wi-Fi and could be built in quantity.</p>
        <HighlightBlock className="orch-proto">
          <ol>
            {o.prototypes.map((p, i) => (
              <li key={p.board} className={p.final ? "final" : p.ok ? "ok" : "fail"} style={{ ["--i" as string]: i }}>
                <span className="num display">{i + 1}</span>
                <p className="board display">{p.board}</p>
                <p className="result">{p.ok ? "✓" : "✕"} {p.result}</p>
              </li>
            ))}
          </ol>
        </HighlightBlock>
      </section>

      <section id="production" className="case-sec">
        <h2 className="display">production &amp; integration</h2>
        <div className="orch-hw-wrap reverse">
          <ul className="case-list orch-big-list">{o.production.map((t) => <li key={t}>{t}</li>)}</ul>
          <CaseImage src={o.productionImage.src} caption={o.productionImage.caption} className="orch-photo" />
        </div>
        <div className="case-grid-2">
          {o.installImages.map((im, i) => <CaseImage key={im.src + i} {...im} />)}
        </div>
      </section>

      <section id="patent" className="case-sec">
        <h2 className="display">patent</h2>
        <div className="orch-patent">
          <p className="display orch-patent-no">{o.patent.number}</p>
          <p className="case-lead">{o.patent.text}</p>
          <a className="orch-btn display" href={o.patent.link} target="_blank" rel="noreferrer">view the patent ↗</a>
        </div>
      </section>

      <footer className="case-foot">
        <Link href="/#work" className="display">← all work</Link>
        <Link href="/about/">about me →</Link>
      </footer>
    </main>
  );
}
