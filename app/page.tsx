import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import HalftoneHero from "@/components/HalftoneHero";
import { ShaderBackground } from "@/components/ui/j-shader";
import WorkGrid from "@/components/WorkGrid";
import { site } from "@/content/site";

export default function Home() {
  return (
    <main>
      <ShaderBackground className="site-shader" />
      <section className="hero">
        <HalftoneHero />
      </section>

      <WorkGrid />
      <SiteFooter />
    </main>
  );
}
