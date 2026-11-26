import type { Metadata } from "next";
import Link from "next/link";
import "@fontsource/texturina/400-italic.css";
import "./zine.css";
import Zine3D from "@/components/Zine3D";
import RevealText from "@/components/RevealText";
import { zine } from "@/content/zine";
import { site } from "@/content/site";

export const metadata: Metadata = { title: `fashion zine — ${site.title}` };

export default function FashionZine() {
  return (
    <main className="zine-page">
      <header className="zine-band">
        <h1 className="display">{zine.heading}</h1>
        <p>{zine.subheading}</p>
      </header>

      <section className="zine-intro">
        <p className="zine-title" lang="pa">{zine.title}</p>
        <p className="zine-pron">{zine.pronunciation}</p>
        <RevealText className="zine-def" text={zine.intro} />
        <p className="zine-tag"><em>{zine.tagline}</em></p>
      </section>

      <Zine3D pages={zine.pages} />

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
        <Link href="/about/">about me →</Link>
      </footer>
    </main>
  );
}
