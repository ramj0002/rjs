import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import "./case.css";
import CaseImage from "@/components/CaseImage";
import HighlightBlock from "@/components/Highlight";
import { marks } from "@/components/marks";
import { plates } from "@/components/plates";
import { ktmb as k } from "@/content/ktmb";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `KTMB case study — ${site.title}`,
  description: k.tagline,
};

const sections = [
  ["overview", "overview"],
  ["problem", "problem"],
  ["research", "research"],
  ["findings", "findings"],
  ["design", "design"],
  ["testing", "testing"],
  ["results", "results"],
  ["learned", "learned"],
];

// Wrap ★ and → so they can be centred on the numbers (they come from a fallback font).
function Big({ text }: { text: string }) {
  const parts = text.split(/([★→])/).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => (p === "★" || p === "→" ? <span key={i} className={p === "★" ? "sym star" : "sym arrow"}>{p}</span> : p))}
    </>
  );
}

function Stats({ items, className = "" }: { items: [string, string][]; className?: string }) {
  return (
    <div className={`case-stats ${className}`}>
      {items.map(([big, small]) => (
        <div key={big}>
          <b className="display"><Big text={big} /></b>
          <span>{small}</span>
        </div>
      ))}
    </div>
  );
}

export default function KtmbCase() {
  return (
    <main className="case page-theme t-pink">
      <header className="case-hero">
        <div className="case-hero-text">
          <p className="case-kicker"><em>case study · Product / UX</em></p>
          <h1 className="display">{k.title}</h1>
          <p className="case-tagline">{k.tagline}</p>
          <ul className="tools">{k.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="case-hero-plate plate-svg" aria-hidden dangerouslySetInnerHTML={{ __html: plates.ktmb() }} />
      </header>

      <nav className="case-nav" aria-label="Sections">
        {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <section id="overview" className="case-sec">
        <h2 className="display">overview</h2>
        <div className="case-two">
          <div>
            <p className="case-lead">{k.intro}</p>
            <ul className="case-list">{k.appDoes.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <HighlightBlock className="pop-block">
            <Stats className="vertical" items={[["1.6 ★", "starting app rating"], ["9 → 5", "booking steps"], ["1:39", "avg. booking time after"]]} />
          </HighlightBlock>
        </div>
        <h3 className="display case-h3">app infrastructure</h3>
        <div className="case-grid-1 case-big">
          {k.infrastructure.map((im) => <CaseImage key={im.src} src={im.src} caption={im.caption} className={"wide" in im && im.wide ? "wide" : ""} />)}
        </div>
      </section>

      <section id="problem" className="case-sec">
        <h2 className="display">the problem</h2>
        <div className="case-two">
          <HighlightBlock>
            <p className="label">hypothesis</p>
            <p className="case-lead">{marks(k.problem.hypothesis).nodes}</p>
            <p className="label">why we thought so</p>
            <p>{marks(k.problem.rationale, marks(k.problem.hypothesis).next).nodes}</p>
          </HighlightBlock>
          <CaseImage {...k.problem.image} />
        </div>
      </section>

      <section id="research" className="case-sec">
        <h2 className="display">understanding the users</h2>
        <p className="case-lead">{k.research.objective}</p>
        <HighlightBlock className="pop-methods">
          <div className="case-methods">
            {k.research.methods.map((m) => (
              <div key={m.label}>
                <b className="display">{m.n}</b>
                <span className="m-label"><em>{m.label}</em></span>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </HighlightBlock>
        <p className="case-note">{k.research.audience}</p>
        <h3 className="display case-h3">usability testing of the current app</h3>
        <Stats items={k.research.stats} />
      </section>

      <section id="findings" className="case-sec">
        <h2 className="display">key findings</h2>
        <p className="case-lead">Where the old 9-step booking breaks down:</p>
        <HighlightBlock className="pain-map">
          <ol className="pain-flow">
            {k.oldFlow.map((step, i) => {
              const hits = k.findings.map((f, n) => ({ ...f, n: n + 1 })).filter((f) => f.step === i);
              return (
                <li key={step} style={{ ["--i" as string]: i }}>
                  <span className="pill display">{step}</span>
                  <span className="pins">
                    {hits.map((f) => (
                      <a key={f.n} href={`#finding-${f.n}`} className="pin display" title={f.title}>{String(f.n).padStart(2, "0")}</a>
                    ))}
                  </span>
                </li>
              );
            })}
          </ol>
        </HighlightBlock>
        <ol className="case-findings">
          {k.findings.map((f, i) => (
            <li key={f.title} id={`finding-${i + 1}`}>
              <span className="num display">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="where"><em>{f.where}</em></p>
                <h3 className="display">{f.title}</h3>
                {f.quote ? <blockquote>“{f.quote}”</blockquote> : <blockquote className="no-quote" aria-hidden>&nbsp;</blockquote>}
                <p>{f.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="design" className="case-sec">
        <h2 className="display">ideation &amp; design</h2>
        <div className="case-grid-1 case-big">
          {k.ideation.images.map((im) => <CaseImage key={im.src} src={im.src} caption={im.caption} className={"wide" in im && im.wide ? "wide" : ""} />)}
        </div>
        <h3 className="display case-h3">what we built first</h3>
        <p>The high-impact, feasible ideas from our impact vs. effort map:</p>
        <ul className="case-list">{k.ideation.buildList.map((t) => <li key={t}>{t}</li>)}</ul>

        <h3 className="display case-h3">9 steps became 5</h3>
        <HighlightBlock className="case-flows anim-flows">
          <p className="label">before: 9 steps</p>
          <ol className="case-flow old">
            {k.oldFlow.map((s, i) => (
              <li key={s} style={{ ["--i" as string]: i }}><span className="display">{s}</span>{i < k.oldFlow.length - 1 && <i aria-hidden>→</i>}</li>
            ))}
          </ol>
          <p className="label">after: 5 steps</p>
          <ol className="case-flow">
            {k.flow.map((s, i) => (
              <li key={s} style={{ ["--i" as string]: i }}><span className="display">{s}</span>{i < k.flow.length - 1 && <i aria-hidden>→</i>}</li>
            ))}
          </ol>
        </HighlightBlock>
        <h3 className="display case-h3">from problem to fix</h3>
        <div className="fix-table" role="table" aria-label="Each problem, what users needed, and what we changed">
          <div className="fix-head" role="row">
            <span role="columnheader">problem</span><span role="columnheader">users needed to</span><span role="columnheader">so we</span>
          </div>
          {k.fixes.map((f) => (
            <div key={f.n} className="fix-row" role="row">
              <span role="cell" className="fix-problem"><b className="display">{f.n}</b><span className="display">{f.problem}</span></span>
              <span role="cell" className="fix-need"><em>{f.need}</em></span>
              <span role="cell" className="fix-fix">{f.fix}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="testing" className="case-sec">
        <h2 className="display">testing &amp; iteration</h2>
        <p className="case-lead">Two rounds of usability testing on the prototype: one on the first build, one after fixing what we learned.</p>
        <h3 className="display case-h3">round 1</h3>
        <Stats items={k.round1.stats} />
        <CaseImage {...k.round1.image} />
        <h3 className="display case-h3">round 1 → round 2</h3>
        <p>The same people, before and after the fixes:</p>
        <div className="pairs">
          {k.pairs.map((p) => (
            <div key={p.topic} className="pair">
              <p className="pair-topic display">{p.topic}</p>
              <figure className="pair-q before">
                <span className="tag"><em>round 1</em></span>
                <blockquote>“{p.before.quote}”</blockquote>
                <figcaption><cite>— {p.before.who}</cite></figcaption>
              </figure>
              <div className="pair-fix"><span className="arrow" aria-hidden>→</span><span>{p.fix}</span><span className="arrow" aria-hidden>→</span></div>
              <figure className="pair-q after">
                <span className="tag"><em>round 2</em></span>
                <blockquote>“{p.after.quote}”</blockquote>
                <figcaption><cite>— {p.after.who}</cite></figcaption>
              </figure>
            </div>
          ))}
        </div>

        <h3 className="display case-h3">round 2</h3>
        <div className="case-grid-2">
          {k.round2.images.map((im) => <CaseImage key={im.src} src={im.src} caption={im.caption} className={"wide" in im && im.wide ? "wide" : ""} />)}
        </div>
      </section>

      <section id="results" className="case-sec">
        <h2 className="display">results</h2>
        <HighlightBlock className="time-bars">
          <p className="label">average time to book a ticket</p>
          <div className="tbar before"><span className="tbar-name">round 1 prototype</span><span className="tbar-track"><span className="tbar-fill" style={{ ["--w" as string]: "100%" }} /></span><b className="display">~3:00</b></div>
          <div className="tbar after"><span className="tbar-name">final design</span><span className="tbar-track"><span className="tbar-fill" style={{ ["--w" as string]: `${(99 / 180) * 100}%` }} /></span><b className="display">1:39</b></div>
          <p className="tbar-note"><em>about 45% faster</em></p>
        </HighlightBlock>
        <Stats items={k.final.stats} />
        <p className="case-lead">{k.final.changed}</p>
        <div className="case-grid-1 case-big">
          {k.final.screens.map((im) => <CaseImage key={im.src} src={im.src} caption={im.caption} />)}
        </div>
        <div className="case-features">
          {k.final.features.map((f) => (
            <div key={f.src}>
              <CaseImage src={f.src} caption={f.title} />
              <div>
                <h3 className="display">{f.title}</h3>
                <p>{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="learned" className="case-sec">
        <h2 className="display">what I learned</h2>
        <div className="case-rows">
          {k.lessons.map((l) => (
            <div key={l.title}>
              <h3 className="display">{l.title}</h3>
              <div><p>{l.text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter back />
    </main>
  );
}
