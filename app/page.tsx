import Link from "next/link";
import HalftoneHero from "@/components/HalftoneHero";
import WorkGrid from "@/components/WorkGrid";
import DotWord from "@/components/DotWord";
import { site } from "@/content/site";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <HalftoneHero />
      </section>

      <section className="intro" aria-label="About">
        <p className="intro-line">I’m Ram Jeet, an engineer who designs</p>
        <DotWord hold={2600} words={["mobile apps", "AI agents", "sensors", "kinetic bags", "zines", "3D products"]} />
        <p className="intro-links">
          <Link href="/about/">about me</Link>
          <a href={site.resume} target="_blank" rel="noreferrer">résumé</a>
          <a href="#work">see the work</a>
        </p>
      </section>

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
