"use client";
import { useMemo, useState } from "react";

// The reviewer's rule-based checks, ported from checks.py so they run right here in the browser.
// They run before the AI, so they catch simple factual errors the model can let through.

const BUZZWORDS = [
  "results-driven", "results driven", "team player", "hard-working", "hardworking",
  "detail-oriented", "detail oriented", "analytical", "synergy", "dynamic",
  "go-getter", "passionate", "self-starter", "self starter", "think outside the box",
  "strong interest", "skilled in", "data-driven", "responsible for",
  "leverage", "leveraging", "drive digital transformation", "meaningful impact",
  "deliver impact", "solve complex business challenges", "scalable",
];

// fictional sample from the repo's examples/resume.md
const SAMPLE = `Alex Tan | alex.tan@example.com

PROFILE
Analytical and detail-oriented engineering graduate with a strong interest in data-driven decision-making.

EXPERIENCE
Example Bank — Operations Intern, May 2025 – Aug 2025
• Responsible for updating weekly reports in Excel.
• Investigated a reconciliation error and worked with the IT team to fix it.

PROJECTS
Customer Churn Analysis
• Analysed a 40,000-row telecom dataset in Python and found contract type was the strongest churn driver.
• Ran usability interviews with 5 users: 70% of 5 users preferred the new dashboard.`;

type Finding = { level: "fix" | "check" | "consider"; check: string; detail: string };

function run(text: string): Finding[] {
  const out: Finding[] = [];
  const pct = /(\d{1,3}(?:\.\d+)?)\s*%\s+of\s+(?:the\s+)?(\d{1,4})\b/gi;
  for (const m of text.matchAll(pct)) {
    const n = +m[2], count = (+m[1] / 100) * n;
    if (n > 0 && Math.abs(count - Math.round(count)) > 0.01)
      out.push({ level: "fix", check: "Impossible percentage", detail: `“${m[0]}” works out to ${+count.toFixed(2)} people. Check where the number came from.` });
  }
  const low = text.toLowerCase();
  for (const w of BUZZWORDS) {
    const hits = low.match(new RegExp(`\\b${w.replace(/[-]/g, "\\-")}\\b`, "g"))?.length ?? 0;
    if (hits) out.push({ level: "consider", check: "Buzzword", detail: `“${w}” appears ${hits}×. Replace it with evidence.` });
  }
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*[•\-*▪●]\s+(.*)$/);
    if (m && !/\d/.test(m[1])) out.push({ level: "check", check: "No metric", detail: `“${m[1].slice(0, 90)}${m[1].length > 90 ? "…" : ""}”` });
  }
  const order = { fix: 0, check: 1, consider: 2 };
  return out.sort((a, b) => order[a.level] - order[b.level]);
}

export default function ResumeChecks() {
  const [text, setText] = useState(SAMPLE);
  const found = useMemo(() => run(text), [text]);
  return (
    <div className="rc">
      <label className="rc-in">
        <span><em>resume text, edit it and the checks update</em></span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} rows={14} />
        <button type="button" className="rc-reset" onClick={() => setText(SAMPLE)}>reset sample ↻</button>
      </label>
      <div className="rc-out" aria-live="polite">
        <p className="display rc-count">{found.length} {found.length === 1 ? "finding" : "findings"}</p>
        {found.length === 0 && <p className="rc-empty"><em>Nothing flagged. The AI review would run next.</em></p>}
        <ul>
          {found.map((f, k) => (
            <li key={k} className={f.level}>
              <span className="rc-tag">{f.level}</span>
              <span><b>{f.check}</b>{f.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
