import type { Metadata } from "next";
import Halftone from "@/components/Halftone";
import RevealText from "@/components/RevealText";
import { site } from "@/content/site";
import { categories } from "@/content/projects";

export const metadata: Metadata = { title: `about me — ${site.title}` };

export default function About() {
  return (
    <main className="about">
      <h1 className="about-title display">about me</h1>

      <div className="about-grid">
        <div className="about-copy">
          <RevealText className="display" text={`${site.tagline} ${site.bio}`} />
        </div>
        <div className="about-photo">
          <Halftone src={site.photo} alt={site.name} color="#000" background="#fff" cell={6} />
        </div>
      </div>

      <p className="hello">hello</p>

      <section className="about-does">
        <p className="label"><em>things I make</em></p>
        <ul>
          {categories.map((c) => (
            <li key={c} className="display">{c}</li>
          ))}
        </ul>
      </section>

      <section className="about-contact">
        <a className="spaced resume" href={site.resume} target="_blank" rel="noreferrer">
          R E S U M E
        </a>
        <a className="email" href={`mailto:${site.email}`}>
          {site.email}
          <span className="label">EMAIL</span>
        </a>
      </section>
    </main>
  );
}
