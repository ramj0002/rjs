import Link from "next/link";
import HalftoneHero from "@/components/HalftoneHero";
import WorkGrid from "@/components/WorkGrid";
import PlateStrip from "@/components/PlateStrip";
import { site } from "@/content/site";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <HalftoneHero />
      </section>

      <PlateStrip />

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
