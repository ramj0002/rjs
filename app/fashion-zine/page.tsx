import type { Metadata } from "next";
import Link from "next/link";
import "@fontsource/texturina/400-italic.css";
import "../ktmb/case.css";
import "./zine.css";
import { plates } from "@/components/plates";
import Zine3D from "@/components/Zine3D";
import RevealText from "@/components/RevealText";
import { zine } from "@/content/zine";
import { site } from "@/content/site";

export const metadata: Metadata = { title: `fashion zine — ${site.title}` };

export default function FashionZine() {
  return (
    <main className="zine-page page-theme t-red">
      <div className="case">
        <header className="case-hero">
          <div className="case-hero-text">
            <p className="case-kicker"><em>case study · Visual / Artwork</em></p>
            <h1 className="display">{zine.heading}</h1>
            <p className="case-tagline">{zine.subheading}</p>
            <ul className="tools"><li>Illustration</li><li>Photography</li><li>Editorial layout</li></ul>
          </div>
          <div className="case-hero-plate plate-svg" aria-hidden dangerouslySetInnerHTML={{ __html: plates.zine() }} />
        </header>
      </div>

      <section className="zine-intro">
        <p className="zine-title" lang="pa">{zine.title}</p>
        <p className="zine-pron">{zine.pronunciation}</p>
        <RevealText className="zine-def" text={zine.intro} />
        <p className="zine-tag"><em>{zine.tagline}</em></p>
      </section>

      <Zine3D pages={zine.pages} />

      <section className="zine-about">
        <h2 className="display">about the zine</h2>
        <p>{zine.about}</p>
        <div className="zine-sketches">
          {zine.sketches.map((im) => (
            <figure key={im.src}>
              <figcaption><em>{im.caption}</em></figcaption>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.src} alt={im.caption} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="zine-process">
        <h2 className="display">process</h2>
        <ol>
          {zine.process.map((s) => (
            <li key={s.step}>
              <span className="step">{s.step}</span>
              <h3 className="display">{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <footer className="zine-foot">
        <Link href="/#work" className="display">← all work</Link>
      </footer>
    </main>
  );
}
