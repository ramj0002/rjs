"use client";
import { useState } from "react";
import rates from "@/content/cardio-rates.json";

// "People like you" in the dataset. Uses the project's own grouping rules (BMI bins and BP categories
// from the notebook) and the real share of people in each group who had cardiovascular disease.
// It describes the data; it is not a prediction or medical advice.

const R = rates as unknown as { bp: Record<string, [number, number]>; bmi: Record<string, [number, number]>; age: Record<string, [number, number]>; chol: Record<string, [number, number]>; all: number };

const bpCat = (s: number, d: number) =>
  s >= 180 || d >= 120 ? "Hypertensive crisis" : s >= 140 || d >= 90 ? "Hypertension stage 2" : (s >= 130 && s <= 139) || (d >= 80 && d <= 89) ? "Hypertension stage 1" : s >= 120 && d < 80 ? "Elevated" : "Normal";
const bmiCat = (b: number) => (b < 18.5 ? "Underweight" : b < 24.9 ? "Normal weight" : b < 29.9 ? "Overweight" : "Obesity");
const ageCat = (a: number) => (a < 40 ? "under 40" : a < 45 ? "40–44" : a < 50 ? "45–49" : a < 55 ? "50–54" : a < 60 ? "55–59" : "60+");
const CHOL = ["normal", "above normal", "well above normal"];

function Slider({ label, unit, v, set, min, max }: { label: string; unit: string; v: number; set: (n: number) => void; min: number; max: number }) {
  return (
    <label className="ce-sl">
      <span><em>{label}</em><b className="display">{v}<small>{unit}</small></b></span>
      <input type="range" min={min} max={max} value={v} onChange={(e) => set(+e.target.value)} />
    </label>
  );
}

export default function CardioExplorer() {
  const [age, setAge] = useState(52);
  const [h, setH] = useState(168);
  const [w, setW] = useState(78);
  const [sys, setSys] = useState(130);
  const [dia, setDia] = useState(85);
  const [chol, setChol] = useState(1);
  const bmi = w / (h / 100) ** 2;
  const rows: [string, string, [number, number]][] = [
    ["Blood pressure", bpCat(sys, dia), R.bp[bpCat(sys, dia)]],
    ["Age", ageCat(age), R.age[ageCat(age)]],
    ["BMI " + bmi.toFixed(1), bmiCat(bmi), R.bmi[bmiCat(bmi)]],
    ["Cholesterol", CHOL[chol - 1], R.chol[String(chol)]],
  ];
  return (
    <div className="ce">
      <div className="ce-in">
        <Slider label="age" unit=" yrs" v={age} set={setAge} min={30} max={65} />
        <Slider label="height" unit=" cm" v={h} set={setH} min={140} max={200} />
        <Slider label="weight" unit=" kg" v={w} set={setW} min={40} max={150} />
        <Slider label="systolic BP" unit=" mmHg" v={sys} set={setSys} min={90} max={199} />
        <Slider label="diastolic BP" unit=" mmHg" v={dia} set={setDia} min={50} max={119} />
        <div className="ce-chol" role="group" aria-label="Cholesterol">
          <em>cholesterol</em>
          {CHOL.map((c, k) => <button key={c} className={chol === k + 1 ? "on" : ""} aria-pressed={chol === k + 1} onClick={() => setChol(k + 1)}>{c}</button>)}
        </div>
      </div>
      <div className="ce-out" aria-live="polite">
        <p className="ce-lead"><em>In the dataset, of people in the same group as you…</em></p>
        {rows.map(([label, group, [pct, n]]) => (
          <div key={label} className="ce-row">
            <div className="ce-row-head"><span><b>{label}</b> <em>{group}</em></span><b className="display">{pct}%</b></div>
            <div className="ce-bar"><span style={{ width: `${pct}%` }} /><i style={{ left: `${R.all}%` }} /></div>
            <p className="ce-n"><em>had heart disease · {n.toLocaleString()} people</em></p>
          </div>
        ))}
        <p className="ce-note"><em>The line marks the overall rate, {R.all}%. This describes the data; it isn’t a diagnosis.</em></p>
      </div>
    </div>
  );
}
