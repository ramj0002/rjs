"use client";
import { useState } from "react";

// "Sarcastic or sincere?" — a quick feel for why the task is hard.
type Q = { text: string; sarcastic: boolean };

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
          <p className="sq-count"><em>comment {i + 1} of {items.length}</em></p>
          <blockquote className="sq-bubble" key={i}>“{q.text}”</blockquote>
          <div className="sq-btns">
            <button onClick={() => answer(true)} className={pick === true ? "on" : ""} disabled={pick !== null}>sarcastic</button>
            <button onClick={() => answer(false)} className={pick === false ? "on" : ""} disabled={pick !== null}>sincere</button>
          </div>
          <p className="sq-result" aria-live="polite">
            {pick !== null && (
              <>
                <b className="display">{pick === q.sarcastic ? "right" : "not quite"}</b>{" "}
                it’s {q.sarcastic ? "sarcastic" : "sincere"}.{" "}
                <button className="sq-next" onClick={next}>{i + 1 < items.length ? "next →" : "see score →"}</button>
              </>
            )}
          </p>
        </>
      ) : (
        <div className="sq-end">
          <p className="display sq-score">{score} / {items.length}</p>
          <p>Easy for a person who reads the tone. A keyword-based tool sees “great”, “love” and “genius” and calls them positive. That’s the gap the model is trained to close.</p>
          <button className="sq-next" onClick={again}>try again ↻</button>
        </div>
      )}
    </div>
  );
}
