import Link from "next/link";
import { plates } from "@/components/plates";
import { projects } from "@/content/projects";

// A slowly drifting strip of the projects' line drawings. Hover pauses it and the
// drawing takes on that project's colour; click opens the project.
const SHORT: Record<string, string> = {
  ktmb: "KTMB app", orchard: "Glow of Orchard", bag: "Breathing Bag", fewshot: "Few-shot", sarcasm: "Sarcasm",
  tilemap: "Tilemap agent", resume: "Resume reviewer", cardio: "Heart disease", xyr: "XYR store",
  renders: "3D renders", tech: "Technical drawings", zine: "Fashion zine", drawings: "Drawings",
};

export default function PlateStrip() {
  const list = projects.map((p, i) => ({ ...p, n: String(i + 1).padStart(2, "0") }));
  return (
    <nav className="strip" aria-label="Projects">
      <div className="strip-track">
        {[0, 1].map((copy) => (
          <div className="strip-set" key={copy} aria-hidden={copy === 1}>
            {list.map((p) => (
              <Link key={p.id} href={p.link} className={`strip-tile t-${p.theme}`} tabIndex={copy === 1 ? -1 : undefined}>
                <span className="strip-plate plate-svg" dangerouslySetInnerHTML={{ __html: plates[p.id]?.() ?? "" }} />
                <span className="strip-cap"><b className="display">{p.n}</b><em>{SHORT[p.id] ?? p.title}</em></span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
