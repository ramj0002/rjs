import type { Metadata } from "next";
import Link from "next/link";
import "../ktmb/case.css";
import "../glow-of-orchard/orchard.css";
import "../xyr/xyr.css";
import "./fewshot.css";
import CaseImage from "@/components/CaseImage";
import HighlightBlock from "@/components/Highlight";
import ProtoDemo from "@/components/ProtoDemo";
import { marks } from "@/components/marks";
import { plates } from "@/components/plates";
import { fewshot as f } from "@/content/fewshot";
import { site } from "@/content/site";

export const metadata: Metadata = { title: `Few-shot medical image classification — ${site.title}`, description: f.tagline };

const sections = [
  ["overview", "overview"],
  ["how", "how it works"],
  ["results", "results"],
  ["why", "why"],
  ["noise", "noise"],
  ["errors", "mistakes"],
  ["finding", "finding"],
];

export default function FewShot() {
  let n = 0;
  const hl = (t: string) => { const m = marks(t, n); n = m.next; return m.nodes; };
  return (
    <main className="case xyr fs page-theme t-purple">
      <header className="case-hero">
        <div className="case-hero-text">
          <p className="case-kicker"><em>case study · AI / Data</em></p>
          <h1 className="display">{f.title}</h1>
          <p className="case-tagline">{f.tagline}</p>
          <ul className="tools">{f.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="case-hero-plate plate-svg" aria-hidden dangerouslySetInnerHTML={{ __html: plates.fewshot() }} />
      </header>

      <nav className="case-nav" aria-label="Sections">
        {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <section id="overview" className="case-sec">
        <h2 className="display">overview</h2>
        <div className="case-two fs-two">
          <HighlightBlock>
            {f.problem.map((t, i) => <p key={i} className="case-lead">{hl(t)}</p>)}
            <p className="label fs-meta">{f.meta}</p>
          </HighlightBlock>
          <HighlightBlock className="pop-block">
            <div className="case-stats vertical">
              {f.stats.map(([big, small]) => (
                <div key={small}><b className="display">{big}</b><span>{small}</span></div>
              ))}
            </div>
          </HighlightBlock>
        </div>
      </section>

      <section id="how" className="case-sec">
        <h2 className="display">learning from one example</h2>
        <p className="case-lead">{f.how}</p>
        <ProtoDemo />
        <h3 className="display fs-sub">what I did</h3>
        <HighlightBlock className="orch-flow fs-flow">
          <ol>
            {f.steps.map((s, i) => (
              <li key={s.title} style={{ ["--i" as string]: i }}>
                <span className="num display">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </HighlightBlock>
      </section>

      <section id="results" className="case-sec">
        <h2 className="display">results</h2>
        <p className="case-lead">{f.resultsText}</p>
        <HighlightBlock className="fs-bars">
          <div className="fs-bars-key"><span><i className="one" /> 1 example per class</span><span><i className="five" /> 5 examples per class</span></div>
          {f.results.map((r) => (
            <div key={r.name} className="fs-bar-row">
              <div className="fs-bar-name"><b className="display">{r.name}</b><em>{r.sub}</em></div>
              <div className="fs-bar-pair">
                {([["one", r.one], ["five", r.five]] as const).map(([k, v]) => (
                  <div key={k} className={`fs-bar ${k}`}>
                    <span style={{ ["--w" as string]: `${v}%` }} />
                    <b className="display">{v.toFixed(1)}%</b>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="fs-chance" aria-hidden><span>guessing 20%</span></div>
        </HighlightBlock>
      </section>

      <section id="why" className="case-sec">
        <h2 className="display">why organs beat skin</h2>
        <p className="case-lead">{f.umapText}</p>
        <div className="case-grid-2 fs-umaps">
          {f.umaps.map((im) => <CaseImage key={im.src} {...im} />)}
        </div>
        <h3 className="display fs-sub">trained on the wrong pictures</h3>
        <p className="case-lead">{f.shiftText}</p>
        <div className="fs-shift">
          {f.shift.map((s) => (
            <div key={s.name}>
              <p className="display fs-shift-name">{s.name}</p>
              <div className="fs-shift-row"><em>trained on photos</em><b className="display">{s.cross}%</b></div>
              <div className="fs-shift-row"><em>trained on medical</em><b className="display">{s.inDomain}%</b></div>
            </div>
          ))}
        </div>
      </section>

      <section id="noise" className="case-sec">
        <h2 className="display">adding noise</h2>
        <HighlightBlock><p className="case-lead">{hl(f.fgsm.text)}</p></HighlightBlock>
        <div className="fs-table" role="table" aria-label="1-shot accuracy with FGSM noise">
          <div className="fs-tr head" role="row"><span role="columnheader" />{f.fgsm.heads.map((h) => <span key={h} role="columnheader"><em>{h}</em></span>)}</div>
          {f.fgsm.rows.map((r) => (
            <div key={r.name} className="fs-tr" role="row">
              <span role="rowheader" className="display">{r.name}</span>
              {r.vals.map((v, i) => (
                <span key={i} role="cell" className={i === 0 ? "base" : v < r.vals[0] ? "down" : "up"}>
                  {v.toFixed(1)}%{i > 0 && <small>{v < r.vals[0] ? " ↓" : " ↑"}</small>}
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="case-note">1 example per class. Noise is only added in training; testing is always on clean images.</p>
      </section>

      <section id="errors" className="case-sec">
        <h2 className="display">where it goes wrong</h2>
        <p className="case-lead">Real mistakes from the test set. Skin lesions get confused by similar colour and borders; organs by similar shapes at 28 × 28 pixels.</p>
        {(["derma", "organ"] as const).map((ds) => (
          <div key={ds} className="fs-fails">
            <p className="display fs-fails-name">{ds === "derma" ? "skin lesions" : "organ CT scans"}</p>
            <div className="fs-fails-row">
              {f.failures[ds].map(([t, p], i) => (
                <figure key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/few-shot/${ds === "derma" ? "dermamnist" : "organamnist"}-0${i}.png`} alt={`true ${f[ds][t]}, predicted ${f[ds][p]}`} loading="lazy" />
                  <figcaption><span>is <b>{f[ds][t]}</b></span><span>guessed <b className="wrong">{f[ds][p]}</b></span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="finding" className="case-sec">
        <h2 className="display">the finding</h2>
        <HighlightBlock><p className="fs-big">{hl(f.finding)}</p></HighlightBlock>
        <h3 className="display fs-sub">next</h3>
        <div className="case-rows case-rows-big">
          {f.next.map(([t, d]) => (
            <div key={t}><h3 className="display">{t}</h3><div><p>{d}</p></div></div>
          ))}
        </div>
      </section>

      <footer className="case-foot">
        <Link href="/#work" className="display">← all work</Link>
        <Link href="/about/">about me →</Link>
      </footer>
    </main>
  );
}
