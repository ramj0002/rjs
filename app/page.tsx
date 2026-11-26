import Link from "next/link";
import HalftoneHero from "@/components/HalftoneHero";
import WorkGrid from "@/components/WorkGrid";
import Flower from "@/components/Flower";
import { site } from "@/content/site";
import { categories } from "@/content/projects";

export default function Home() {
  const band = [site.tagline, ...categories];
  return (
    <main>
      <section className="hero">
        <HalftoneHero />
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

      <WorkGrid />

      <footer className="footer">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <nav>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.resume} target="_blank" rel="noreferrer">resume</a>
          <Link href="/about/">about me</Link>
        </nav>
      </footer>
    </main>
  );
}
