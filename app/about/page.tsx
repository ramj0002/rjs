import type { Metadata } from "next";
import RevealText from "@/components/RevealText";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/content/site";
import { skills } from "@/content/skills";

export const metadata: Metadata = { title: `about me — ${site.title}` };

export default function About() {
  return (
    <main className="about-page">
      <div className="about">
        <h1 className="about-title display">about me</h1>

        <div className="about-grid">
          <div className="about-copy">
            <RevealText className="display" text={`${site.tagline} ${site.bio}`} />
          </div>
          <div className="about-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about/me.avif" alt={`${site.title}, taking a mirror selfie`} width={611} height={1076} />
          </div>
        </div>

        <div className="hello">
          <video src="/about/hello.mp4" poster="/about/hello-poster.jpg" autoPlay muted loop playsInline aria-label="hello! my name is ram, in my handwriting" />
        </div>

        <section className="about-skills" aria-labelledby="skills-h">
          <h2 id="skills-h" className="label"><em>skills</em></h2>
          <ul>
            {skills.map((s) => (
              <li key={s.group}>
                <h3 className="display">{s.group}</h3>
                <p>{s.items.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-contact">
          <a className="card-hand" href={site.resume} target="_blank" rel="noreferrer" aria-label="Open my resume">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about/hand.png" alt="" width={1024} height={694} />
            <span className="card-word display" aria-hidden>RESUME</span>
          </a>
          <a className="email" href={`mailto:${site.email}`}>
            <span className="display">{site.email}</span>
            <span className="label">EMAIL</span>
          </a>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
