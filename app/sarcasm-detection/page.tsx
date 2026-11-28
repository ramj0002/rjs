import type { Metadata } from "next";
import { og } from "@/lib/meta";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import "../ktmb/case.css";
import "../glow-of-orchard/orchard.css";
import "../xyr/xyr.css";
import "../3d-renders/renders.css";
import "./sarcasm.css";
import CaseImage from "@/components/CaseImage";
import HighlightBlock from "@/components/Highlight";
import RenderViews from "@/components/RenderViews";
import SarcasmQuiz from "@/components/SarcasmQuiz";
import { marks } from "@/components/marks";
import { plates } from "@/components/plates";
import { sarcasm as s } from "@/content/sarcasm";
import { site } from "@/content/site";

export const metadata: Metadata = og({ title: `Sarcasm detection — ${site.title}`, description: s.tagline });

const sections = [
  ["overview", "overview"],
  ["try", "try it"],
  ["pipeline", "pipeline"],
  ["data", "data"],
  ["models", "models"],
  ["app", "web app"],
  ["learned", "learned"],
];

export default function Sarcasm() {
  let n = 0;
  const para = (t: string) => { const m = marks(t, n); n = m.next; return m.nodes; };
  return (
    <main className="case xyr sd page-theme t-purple">
      <header className="case-hero">
        <div className="case-hero-text">
          <p className="case-kicker"><em>case study · AI / Data</em></p>
          <h1 className="display">{s.title}</h1>
          <p className="case-tagline">{s.tagline}</p>
          <ul className="tools">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="case-hero-plate plate-svg" aria-hidden dangerouslySetInnerHTML={{ __html: plates.sarcasm() }} />
      </header>

      <nav className="case-nav" aria-label="Sections">
        {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <section id="overview" className="case-sec">
        <h2 className="display">overview</h2>
        <div className="case-two sd-two">
          <HighlightBlock>
            {s.problem.map((t, i) => <p key={i} className="case-lead">{para(t)}</p>)}
            <p className="label sd-role">{s.role}</p>
          </HighlightBlock>
          <HighlightBlock className="pop-block">
            <div className="case-stats vertical">
              {s.stats.map(([big, small]) => (
                <div key={small}><b className="display">{big}</b><span>{small}</span></div>
              ))}
            </div>
          </HighlightBlock>
        </div>
      </section>

      <section id="try" className="case-sec">
        <h2 className="display">sarcastic or sincere?</h2>
        <p className="case-lead">Six real comments from our data. You can probably tell. Most tools can’t.</p>
        <SarcasmQuiz items={s.quiz} />
      </section>

      <section id="pipeline" className="case-sec">
        <h2 className="display">pipeline</h2>
        <HighlightBlock className="orch-flow xyr-flow">
          <ol>
            {s.pipeline.map((p, i) => (
              <li key={p.title} style={{ ["--i" as string]: i }}>
                <span className="num display">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display">{p.title}</h3>
                <p>{p.text}</p>
                <div className="sd-ex"><code>{p.ex}</code><em>{p.exLabel}</em></div>
              </li>
            ))}
          </ol>
        </HighlightBlock>
        <p className="case-note">Follow one real comment from our data through every step.</p>
      </section>

      <section id="data" className="case-sec">
        <h2 className="display">data</h2>
        <p className="case-lead">4,249 comments from three Reddit topics: NTU, the US election and TikTok cringe. Each one got two labels.</p>
        <div className="sd-labels">
          {s.labels.map((l) => (
            <div key={l.name}>
              <p className="display sd-label-name">{l.name}</p>
              <ul>{l.values.map(([v, t]) => <li key={v}><b className="display">{v}</b><span>{t}</span></li>)}</ul>
            </div>
          ))}
        </div>
        <h3 className="display sd-sub">three topics, three moods</h3>
        <HighlightBlock className="sd-three sd-topics">
          {s.datasets.map((d) => {
            const t = d.neg + d.neu + d.pos;
            const pc = (x: number) => Math.round((x / t) * 100);
            return (
              <div key={d.name} className="sd-topic">
                <p className="display sd-topic-name">{d.name}</p>
                <p className="sd-topic-n"><em>{d.n.toLocaleString()} comments</em></p>
                <p className="sd-topic-sarc"><b className="display">{d.sarc}%</b> <em>sarcastic</em></p>
                <div className="sd-stack" aria-label={`${pc(d.neg)}% negative, ${pc(d.neu)}% neutral, ${pc(d.pos)}% positive`}>
                  <span className="neg" style={{ ["--w" as string]: `${pc(d.neg)}%` }} />
                  <span className="neu" style={{ ["--w" as string]: `${pc(d.neu)}%` }} />
                  <span className="pos" style={{ ["--w" as string]: `${pc(d.pos)}%` }} />
                </div>
                <p className="sd-stack-key"><span>{pc(d.neg)}% negative</span><span>{pc(d.neu)}% neutral</span><span>{pc(d.pos)}% positive</span></p>
                <CaseImage src={d.src} caption={d.caption} />
              </div>
            );
          })}
        </HighlightBlock>
        <p className="case-note">{s.datasetsText}</p>
      </section>

      <section id="models" className="case-sec">
        <h2 className="display">models</h2>
        <p className="case-lead">Both models learn from the BERT numbers. The MLP did better, so it runs the chatbot.</p>
        <HighlightBlock className="sd-models">
          {s.models.map((m) => (
            <div key={m.name} className={`sd-model ${m.best ? "best" : ""}`}>
              <div className="sd-model-head">
                <h3 className="display">{m.name}</h3>
                <p className="sd-acc"><b className="display">{m.acc}%</b> <em>accuracy {m.note}</em></p>
              </div>
              <div className="sd-bar"><span style={{ ["--w" as string]: `${m.acc}%` }} /></div>
              <ul className="case-list">{m.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          ))}
        </HighlightBlock>
      </section>

      <section id="app" className="case-sec">
        <h2 className="display">the web app</h2>
        <p className="case-lead">{s.app.intro}</p>
        <RenderViews views={s.app.views.map((v) => ({ ...v, ok: true }))} />
        <div className="case-rows case-rows-big" style={{ marginTop: 36 }}>
          {s.app.features.map(([t, d]) => (
            <div key={t}><h3 className="display">{t}</h3><div><p>{d}</p></div></div>
          ))}
        </div>
        <h3 className="display sd-sub">how it fits together</h3>
        <div className="sd-three sd-flows">
          {s.flows.map((im) => <CaseImage key={im.src} {...im} />)}
        </div>
      </section>

      <section id="learned" className="case-sec">
        <h2 className="display">what I learned</h2>
        <div className="case-rows case-rows-big">
          {s.learned.map(([t, d]) => (
            <div key={t}><h3 className="display">{t}</h3><div><p>{d}</p></div></div>
          ))}
        </div>
      </section>

      <SiteFooter back />
    </main>
  );
}
