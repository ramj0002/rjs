import type { Metadata } from "next";
import { og } from "@/lib/meta";
import "../ktmb/case.css";
import "../glow-of-orchard/orchard.css";
import "../xyr/xyr.css";
import "../ai-pages.css";
import CaseImage from "@/components/CaseImage";
import ResumeChecks from "@/components/ResumeChecks";
import { AiFlow, AiFoot, AiHero, AiOverview, AiRows } from "@/components/AiPage";
import { marks } from "@/components/marks";
import { site } from "@/content/site";

const tagline = "A recruiter-style resume review against a specific job ad: rule-based checks for the facts, Claude for the judgement.";
export const metadata: Metadata = og({ title: `AI resume reviewer — ${site.title}`, description: tagline });

export default function Resume() {
  return (
    <main className="case xyr page-theme t-purple">
      <AiHero title="AI resume reviewer" tagline={tagline} plate="resume"
        tags={["React", "TypeScript", "FastAPI", "Server-Sent Events", "Claude", "Tailwind", "Docker"]}
        sections={[["overview", "overview"], ["checks", "try the checks"], ["flow", "how it works"], ["states", "states"], ["safe", "safeguards"], ["tests", "tests"]]} />

      <AiOverview stats={[["3", "resumes with one error, caught"], ["36", "tests in CI"], ["2 MB", "upload cap, nothing stored"]]}>
        <p className="case-lead">I built it while applying for graduate roles. AI is good at judgement, like whether a bullet is strong or matches the role, but it {marks("==let a simple factual error through==").nodes}.</p>
        <p className="case-lead">One of my resumes said “60% of 4 users”, which is 2.4 people. The error had been copied into three tailored versions before I caught it. So the tool never trusts the AI alone.</p>
        <div className="ai-links"><a href="https://github.com/ramj0002/resume-review-agent" target="_blank" rel="noreferrer">code on GitHub ↗</a></div>
      </AiOverview>

      <section id="checks" className="case-sec">
        <h2 className="display">try the checks</h2>
        <p className="case-lead">The same rules the reviewer runs before Claude, working right here. This sample resume is fictional; edit it or paste your own (nothing leaves your browser).</p>
        <ResumeChecks />
      </section>

      <section id="flow" className="case-sec">
        <h2 className="display">how it works</h2>
        <AiFlow steps={[
          ["Paste", "A job ad and a resume, plus an optional longer master resume"],
          ["Check", "Rules flag impossible numbers, buzzwords and bullets with no metrics"],
          ["Review", "Claude must confirm or dismiss each check, then reviews like a recruiter"],
          ["Stream", "The review appears as it’s written, through Server-Sent Events"],
        ]} />
        <h3 className="display ai-sub">what the review gives you</h3>
        <AiRows rows={[
          ["Match score", "Shortlist yes, maybe or no, and a score out of 100."],
          ["Requirement table", "Every requirement in the ad marked met, partly met or missing, with the ad’s exact keywords."],
          ["Weak lines", "The line quoted, why it’s weak, and a rewrite. It never makes up numbers; it leaves [X] to fill in."],
          ["Top 5 fixes", "Ranked by impact, plus what to bring in from the master resume."],
        ]} />
      </section>

      <section id="states" className="case-sec">
        <h2 className="display">every state designed</h2>
        <div className="ai-tools">
          {[["empty", "A clear start before the first review"], ["loading", "Skeletons while the checks run"], ["streaming", "The review appears line by line"], ["error", "A full-page message when nothing came back"], ["partial", "If only the AI fails, the checks stay visible"]].map(([n, d]) => <div key={n}><code>{n}</code><p>{d}</p></div>)}
        </div>
        <div className="case-grid-1 case-big ai-shot" style={{ marginTop: 32 }}>
          <CaseImage src="/resume-review/app.jpg" caption="After a review: checks first, then the streamed review (test run, fictional resume)" />
        </div>
      </section>

      <section id="safe" className="case-sec">
        <h2 className="display">safe to put online</h2>
        <AiRows rows={[
          ["API key stays on the server", "The browser never sees it, and error messages never include upstream details."],
          ["Rate limits", "Reviews per person per hour and a daily total. The checks are free and unlimited."],
          ["2 MB uploads, nothing kept", "Files are read in memory and never stored or logged."],
          ["Clear file errors", "Messages for unsupported, unreadable, empty (scanned) or oversized files."],
        ]} />
      </section>

      <section id="tests" className="case-sec">
        <h2 className="display">tests</h2>
        <div className="ai-tests">
          <div><b className="display">22</b><span>pytest</span><p>Each check, and the API: streaming, upload limits, unreadable files, rate limits, no leaked errors.</p></div>
          <div><b className="display">14</b><span>Vitest</span><p>The front end: the stream parser across split network chunks, every state, retries.</p></div>
          <div><b className="display">CI</b><span>GitHub Actions · Docker</span><p>Both suites on every push, and a Docker image to deploy.</p></div>
        </div>
      </section>
      <AiFoot />
    </main>
  );
}
