"use client";
import { useState } from "react";

// "Sarcastic or sincere?" — a quick feel for why the task is hard.
type Q = { text: string; sarcastic: boolean; topic?: string };

export default function SarcasmQuiz({ items }: { items: Q[] }) {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= items.length;
  const q = items[Math.min(i, items.length - 1)];

  const answer = (s: boolean) => {
    if (pick !== null) return;
    setPick(s);
    if (s === q.sarcastic) setScore((n) => n + 1);
  };
  const next = () => { setPick(null); setI((n) => n + 1); };
  const again = () => { setPick(null); setI(0); setScore(0); };

  return (
    <div className="sq">
      {!done ? (
        <>
          <p className="sq-count"><em>real comment {i + 1} of {items.length}{q.topic ? ` · ${q.topic}` : ""}</em></p>
          <blockquote className="sq-bubble" key={i}>“{q.text}”</blockquote>
          <div className="sq-btns">
            <button onClick={() => answer(true)} className={pick === true ? "on" : ""} disabled={pick !== null}>sarcastic</button>
            <button onClick={() => answer(false)} className={pick === false ? "on" : ""} disabled={pick !== null}>sincere</button>
          </div>
          <p className="sq-result" aria-live="polite">
            {pick !== null && (
              <>
                <b className="display">{pick === q.sarcastic ? "right" : "not quite"}</b>{" "}
                our team labelled it {q.sarcastic ? "sarcastic" : "sincere"}.{" "}
                <button className="sq-next" onClick={next}>{i + 1 < items.length ? "next →" : "see score →"}</button>
              </>
            )}
          </p>
        </>
      ) : (
        <div className="sq-end">
          <p className="display sq-score">{score} / {items.length}</p>
          <p>Some are easy, some you’d argue about. That’s the problem: sarcasm hides in tone and context, and even our labellers didn’t always agree. A keyword-based tool has no chance; the model has to learn it from thousands of examples.</p>
          <button className="sq-next" onClick={again}>try again ↻</button>
        </div>
      )}
    </div>
  );
}
