import type { Metadata } from "next";
import Link from "next/link";
import "../ktmb/case.css";
import "./drawings.css";
import ModelSheet from "@/components/ModelSheet";
import { plates } from "@/components/plates";
import { site } from "@/content/site";

const tagline = "Examples of my work in Autodesk Inventor: everyday products, modelled part by part.";

export const metadata: Metadata = { title: `Technical drawings — ${site.title}`, description: tagline };

const models = [
  { src: "/drawings-3d/ikea-clock.png", name: "IKEA clock", note: "The TJINGA alarm clock: body, recessed face, hands and snooze button." },
  { src: "/drawings-3d/ikea-clock-back.png", name: "IKEA clock, back", note: "The back of the clock: the cover, screw points and slots." },
  { src: "/drawings-3d/soap-dispenser.png", name: "Soap dispenser", note: "A round bottle with a collar, pump stem and nozzle." },
  { src: "/drawings-3d/water-faucet.png", name: "Water faucet", note: "A single-lever basin tap: base, body, spout and handle." },
  { src: "/drawings-3d/lamp.png", name: "Lamp", note: "A rounded shade on a pebble-shaped base." },
];

export default function TechnicalDrawings() {
  return (
    <main className="case page-theme t-yellow2">
      <header className="case-hero">
        <div className="case-hero-text">
          <p className="case-kicker"><em>Spatial / 3D</em></p>
          <h1 className="display">Technical drawings</h1>
          <p className="case-tagline">{tagline}</p>
          <ul className="tools"><li>Autodesk Inventor</li><li>3D modelling</li></ul>
        </div>
        <div className="case-hero-plate plate-svg" aria-hidden dangerouslySetInnerHTML={{ __html: plates.tech() }} />
      </header>

      <section className="case-sec">
        <h2 className="display">the models</h2>
        <p className="case-lead">Five models. Pick one to put it on the sheet.</p>
        <ModelSheet models={models} />
      </section>

      <footer className="case-foot">
        <Link href="/#work" className="display">← all work</Link>
      </footer>
    </main>
  );
}
