import Link from "next/link";
import HalftoneHero from "@/components/HalftoneHero";
import WorkIndex from "@/components/WorkIndex";
import Flower from "@/components/Flower";
import { site } from "@/content/site";
import { categories } from "@/content/projects";

export default function Home() {
  const band = [site.tagline, ...categories];
  return (
    <main>
      <section className="hero">
        <HalftoneHero />
        <p className="hero-hint">
          <em>run your cursor (or finger) through the dots</em>
          <a href="#work">scroll ↓</a>
        </p>
      </section>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>
              {band.map((t) => (
                <span key={t} className="marquee-item">
                  {t} <Flower size={28} className="spin" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <WorkIndex />

      <footer className="footer">
        <p className="footer-kicker"><em>got something in mind?</em></p>
        <a className="footer-email display" href={`mailto:${site.email}`}>say hi</a>
        <div className="footer-links">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a className="spaced" href={site.resume} target="_blank" rel="noreferrer">RESUME</a>
          <Link href="/about/">about me →</Link>
        </div>
      </footer>
    </main>
  );
}
