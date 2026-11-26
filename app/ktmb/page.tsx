import type { Metadata } from "next";
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

function Stats({ items }: { items: [string, string][] }) {
  return (
    <div className="case-stats">
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
    <main className="case">
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
          <Stats items={[["1.6 ★", "starting app rating"], ["9 → 5", "booking steps"], ["1:39", "avg. booking time after"]]} />
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
        <div className="case-methods">
          {k.research.methods.map((m) => (
            <div key={m.label}>
              <b className="display">{m.n}</b>
              <span className="m-label"><em>{m.label}</em></span>
              <p>{m.text}</p>
            </div>
          ))}
        </div>
        <p className="case-note">{k.research.audience}</p>
        <h3 className="display case-h3">usability testing of the current app</h3>
        <Stats items={k.research.stats} />
      </section>

      <section id="findings" className="case-sec">
        <h2 className="display">key findings</h2>
        <ol className="case-findings">
          {k.findings.map((f, i) => (
            <li key={f.title}>
              <span className="num display">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="display">{f.title}</h3>
                {f.quote ? <blockquote>“{f.quote}”</blockquote> : <blockquote className="no-quote" aria-hidden>&nbsp;</blockquote>}
                <p>{f.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <h3 className="display case-h3">what users need</h3>
        <dl className="case-needs">
          {k.needs.map(([a, b]) => (
            <div key={a}><dt className="display">{a}</dt><dd>{b}</dd></div>
          ))}
        </dl>
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
        <p className="label">before: 9 steps</p>
        <ol className="case-flow old">
          {k.oldFlow.map((s, i) => (
            <li key={s}><span className="display">{s}</span>{i < k.oldFlow.length - 1 && <i aria-hidden>→</i>}</li>
          ))}
        </ol>
        <p className="label">after: 5 steps</p>
        <ol className="case-flow">
          {k.flow.map((s, i) => (
            <li key={s}><span className="display">{s}</span>{i < k.flow.length - 1 && <i aria-hidden>→</i>}</li>
          ))}
        </ol>
        <p>Every screen has the same progress bar at the top and a booking summary at the bottom, so you always know where you are and what you picked.</p>
        <div className="case-rows case-rows-big">
          {k.decisions.map((d, i) => (
            <div key={d.title}>
              <div>
                <p className="label">decision {i + 1}</p>
                <h3 className="display">{d.title}</h3>
              </div>
              <div><p>{d.text}</p></div>
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
        <h4 className="display case-h4">comments</h4>
        <div className="case-rows">
          {k.round1.pains.map((p) => (
            <div key={p.title}>
              <h3 className="display">{p.title}</h3>
              <div>
                <blockquote>“{p.quote}” <cite>— {p.who}</cite></blockquote>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="case-fixes">
          <h4 className="display">fixes after round 1</h4>
          <ol>{k.round1.fixes.map((f) => <li key={f}>{f}</li>)}</ol>
        </div>

        <h3 className="display case-h3">round 2</h3>
        <div className="case-grid-2">
          {k.round2.images.map((im) => <CaseImage key={im.src} src={im.src} caption={im.caption} className={"wide" in im && im.wide ? "wide" : ""} />)}
        </div>
        <h4 className="display case-h4">comments</h4>
        <div className="case-rows">
          {k.round2.quotes.map((q) => (
            <div key={q.who}>
              <h3 className="display">{q.title}</h3>
              <div>
                <blockquote>“{q.quote}” <cite>— {q.who}</cite></blockquote>
                <p>{q.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="results" className="case-sec">
        <h2 className="display">results</h2>
        <Stats items={k.final.stats} />
        <p className="case-lead">{k.final.changed}</p>
        <div className="case-grid-2">
          {k.final.screens.map((im) => <CaseImage key={im.src} src={im.src} caption={im.caption} className={"wide" in im && im.wide ? "wide" : ""} />)}
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
        <h3 className="display case-h3">what I’d do next</h3>
        <ul className="tools">{k.next.map((t) => <li key={t}>{t}</li>)}</ul>
      </section>

      <footer className="case-foot">
        <Link href="/#work" className="display">← all work</Link>
        <Link href="/about/">about me →</Link>
      </footer>
    </main>
  );
}
