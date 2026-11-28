import type { Metadata } from "next";
import "../ktmb/case.css";
import "../glow-of-orchard/orchard.css";
import "../xyr/xyr.css";
import "../ai-pages.css";
import CaseImage from "@/components/CaseImage";
import TilemapViewer from "@/components/TilemapViewer";
import { AiFlow, AiFoot, AiHero, AiOverview, AiRows } from "@/components/AiPage";
import { site } from "@/content/site";

const tagline = "An AI agent that builds 2D game levels only through tool calls, and an evaluation that checks each level can really be played.";
export const metadata: Metadata = { title: `Tilemap agent — ${site.title}`, description: tagline };

const tools: [string, string][] = [
  ["get_tilemap_state", "See the map as text, with its size and markers"],
  ["set_tile", "Paint one cell: ground, platform or spikes"],
  ["fill_rect", "Paint a rectangle"],
  ["clear_area", "Empty a rectangle, e.g. to cut a pit"],
  ["place_marker", "Place the one start or the one exit"],
];

export default function Tilemap() {
  return (
    <main className="case xyr page-theme t-purple">
      <AiHero title="Tilemap agent + evaluation viewer" tagline={tagline} plate="tilemap"
        tags={["Anthropic API", "Tool calling", "Python", "Unity C#", "React + TypeScript", "pytest", "Vitest"]}
        sections={[["overview", "overview"], ["agent", "agent"], ["levels", "levels"], ["bug", "the bug"], ["viewer", "viewer"], ["tests", "tests"]]} />

      <AiOverview stats={[["5", "tools the agent can use"], ["6/6", "levels pass"], ["57", "tests in CI"]]}>
        <p className="case-lead">Letting an AI use a creative tool raises two questions: can it use the tool reliably, and is what it made any good?</p>
        <p className="case-lead">Claude builds platformer levels by calling five small tools, never by writing the map directly. A harness then checks each level: is there a start and an exit, can the player actually jump to the exit, and does it match what was asked for?</p>
        <div className="ai-links">
          <a href="https://ramj0002.github.io/tilemap-agent/" target="_blank" rel="noreferrer">live viewer ↗</a>
          <a href="https://github.com/ramj0002/tilemap-agent" target="_blank" rel="noreferrer">code on GitHub ↗</a>
        </div>
      </AiOverview>

      <section id="agent" className="case-sec">
        <h2 className="display">how the agent works</h2>
        <AiFlow steps={[
          ["Request", "“A level with one gap at least 3 tiles wide”"],
          ["Look", "Claude reads the map as text, the only way it can see it"],
          ["Build", "It edits only through tool calls, with a step limit"],
          ["Check", "Rule-based checks score the finished level"],
          ["Unity", "An Editor script replays the calls onto a real Tilemap"],
        ]} />
        <h3 className="display ai-sub">five tools, strict inputs</h3>
        <div className="ai-tools">
          {tools.map(([n, d]) => <div key={n}><code>{n}</code><p>{d}</p></div>)}
        </div>
        <p className="case-note">A bad call (off the map, unknown tile, wrong type) goes back to the model as an error that says how to fix it, so the loop never crashes.</p>
      </section>

      <section id="levels" className="case-sec">
        <h2 className="display">the levels it built</h2>
        <p className="case-lead">The real six levels from the agent’s first run. Pick a level, then switch the checker.</p>
        <TilemapViewer />
      </section>

      <section id="bug" className="case-sec">
        <h2 className="display">the failure that wasn’t</h2>
        <div className="ai-story">
          <div><span className="num display">01</span><h3 className="display">{"One level\nfailed"}</h3><p>“Two ledges” scored 0 ledges, so the first run was 5/6.</p></div>
          <div><span className="num display">02</span><h3 className="display">{"Looked at\nthe level"}</h3><p>It had 3 floating ledges. The agent had built them from ground tiles, not platform tiles.</p></div>
          <div><span className="num display">03</span><h3 className="display">{"Fixed the\nchecker"}</h3><p>A ledge is any floating solid tile, whatever it’s made of. Added a regression test for it.</p></div>
          <div><span className="num display">04</span><h3 className="display">{"Re-scored,\nnot re-run"}</h3><p>The same six levels scored again: 6/6. The change came from the checker, not the agent.</p></div>
        </div>
      </section>

      <section id="viewer" className="case-sec">
        <h2 className="display">evaluation viewer</h2>
        <p className="case-lead">A React + TypeScript app on GitHub Pages for reading runs: pass rate over time, each level and its checks, and a compare view that says whether a change came from the agent or from the checker.</p>
        <div className="case-grid-1 case-big ai-shot">
          <CaseImage src="/tilemap/viewer-compare.jpg" caption="Comparing run 1 with the re-scored run" />
        </div>
      </section>

      <section id="tests" className="case-sec">
        <h2 className="display">tests</h2>
        <div className="ai-tests">
          <div><b className="display">32</b><span>pytest</span><p>Tool rules, the agent loop, and the jump model: gaps, walls, ceilings, spikes.</p></div>
          <div><b className="display">25</b><span>Vitest</span><p>The viewer: reading run files, the comparison logic, and the screens.</p></div>
          <div><b className="display">CI</b><span>GitHub Actions</span><p>Every push runs both suites, on Python 3.10 and 3.12.</p></div>
        </div>
        <h3 className="display ai-sub">limits</h3>
        <AiRows rows={[
          ["Small test set", "Six cases. Pass rates should be read with that in mind."],
          ["Simple physics", "The jump model is an approximation; a real game’s physics would need measuring."],
          ["Unity untested in CI", "The C# bridge is written against Unity’s API but CI has no Unity Editor to compile it."],
        ]} />
      </section>
      <AiFoot />
    </main>
  );
}
