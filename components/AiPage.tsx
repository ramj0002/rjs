import Link from "next/link";
import type { ReactNode } from "react";
import HighlightBlock from "@/components/Highlight";
import { plates } from "@/components/plates";

// Shared frame for the AI / Data build pages: hero, section nav, overview with stats, footer.
export function AiHero({ title, tagline, tags, plate, sections }: { title: string; tagline: string; tags: string[]; plate: string; sections: [string, string][] }) {
  return (
    <>
      <header className="case-hero">
        <div className="case-hero-text">
          <p className="case-kicker"><em>case study · AI / Data</em></p>
          <h1 className="display">{title}</h1>
          <p className="case-tagline">{tagline}</p>
          <ul className="tools">{tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="case-hero-plate plate-svg" aria-hidden dangerouslySetInnerHTML={{ __html: plates[plate]() }} />
      </header>
      <nav className="case-nav" aria-label="Sections">
        {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
    </>
  );
}

export function AiOverview({ children, stats }: { children: ReactNode; stats: [string, string][] }) {
  return (
    <section id="overview" className="case-sec">
      <h2 className="display">overview</h2>
      <div className="case-two ai-two">
        <HighlightBlock>{children}</HighlightBlock>
        <HighlightBlock className="pop-block">
          <div className="case-stats vertical">
            {stats.map(([big, small]) => <div key={small}><b className="display">{big}</b><span>{small}</span></div>)}
          </div>
        </HighlightBlock>
      </div>
    </section>
  );
}

export function AiFlow({ steps }: { steps: [string, string][] }) {
  return (
    <HighlightBlock className="orch-flow ai-flow">
      <ol style={{ ["--n" as string]: steps.length }}>
        {steps.map(([t, d], i) => (
          <li key={t} style={{ ["--i" as string]: i }}>
            <span className="num display">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="display">{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ol>
    </HighlightBlock>
  );
}

export function AiRows({ rows }: { rows: [string, string][] }) {
  return (
    <div className="case-rows case-rows-big">
      {rows.map(([t, d]) => <div key={t}><h3 className="display">{t}</h3><div><p>{d}</p></div></div>)}
    </div>
  );
}

export function AiFoot() {
  return (
    <footer className="case-foot">
      <Link href="/#work" className="display">← all work</Link>
      <Link href="/about/">about me →</Link>
    </footer>
  );
}
