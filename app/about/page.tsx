import type { Metadata } from "next";
import RevealText from "@/components/RevealText";
import { site } from "@/content/site";
import { skills } from "@/content/skills";

export const metadata: Metadata = { title: `about me — ${site.title}` };

export default function About() {
  return (
    <main className="about-page">
      <div className="about">
        <section className="about-intro">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="about-me" src="/about/me.webp" alt={`${site.title}, taking a mirror selfie`} width={543} height={946} />
          <div className="about-side">
            <h1 className="about-title display">about me</h1>
            <div className="about-copy">
              <RevealText className="display" text={`${site.tagline} ${site.bio}`} />
            </div>
            <div className="hello">
            <video src="/about/hello.mp4" poster="/about/hello-poster.jpg" autoPlay muted loop playsInline aria-label="hello! my name is ram, in my handwriting" />
            </div>
          </div>
        </section>

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
        </section>
      </div>
    </main>
  );
}
