import type { Metadata } from "next";
import "../ktmb/case.css";
import "../glow-of-orchard/orchard.css";
import "../xyr/xyr.css";
import "../ai-pages.css";
import CaseImage from "@/components/CaseImage";
import HighlightBlock from "@/components/Highlight";
import CardioExplorer from "@/components/CardioExplorer";
import { AiFlow, AiFoot, AiHero, AiOverview, AiRows } from "@/components/AiPage";
import { site } from "@/content/site";

const tagline = "Which health factors matter most for heart disease? Four models on 68,583 people, and a personal risk report explained with SHAP.";
export const metadata: Metadata = { title: `Cardiovascular disease prediction — ${site.title}`, description: tagline };

// test-set results from the notebook's final comparison (after cross-validated tuning)
const models: [string, number, number][] = [["XGBoost", 73.4, 71.19], ["Random Forest", 73.3, 70.92], ["Decision Tree", 73.0, 71.12], ["Logistic Regression", 72.7, 70.12]];
// XGBoost feature importance scores
const features: [string, number][] = [["BMI", 211], ["Age", 173], ["Systolic BP", 152], ["Diastolic BP", 84], ["Cholesterol", 74]];

export default function Cardio() {
  return (
    <main className="case xyr page-theme t-purple">
      <AiHero title="Cardiovascular disease prediction" tagline={tagline} plate="cardio"
        tags={["Python", "pandas", "XGBoost", "Random Forest", "scikit-learn", "SHAP"]}
        sections={[["overview", "overview"], ["explore", "explore"], ["data", "data"], ["models", "models"], ["why", "what matters"], ["report", "risk report"]]} />

      <AiOverview stats={[["68,583", "people after cleaning"], ["73.4%", "accuracy, XGBoost"], ["4", "models compared"]]}>
        <p className="case-lead">The goal: help people take charge of their health by showing which factors raise the risk of cardiovascular disease the most.</p>
        <p className="case-lead">We cleaned a dataset of 70,000 patients, explored it, compared four models, and used SHAP to turn the best one into a personal risk report with a recommendation.</p>
      </AiOverview>

      <section id="explore" className="case-sec">
        <h2 className="display">people like you</h2>
        <p className="case-lead">Move the sliders. Using the project’s own groups for blood pressure, BMI and age, see how many people in the same group in our data had heart disease.</p>
        <CardioExplorer />
      </section>

      <section id="data" className="case-sec">
        <h2 className="display">preparing the data</h2>
        <AiFlow steps={[
          ["Readable", "Renamed columns, turned coded values into words, ages from days into years"],
          ["Clean", "Removed impossible heights and blood pressures, no duplicates or missing values"],
          ["Add", "Worked out BMI from height and weight"],
          ["Group", "BMI into 4 groups, blood pressure into 5, from normal to crisis"],
        ]} />
        <div className="case-grid-2" style={{ marginTop: 32 }}>
          <CaseImage src="/cardio/histograms.jpg" caption="Age, blood pressure, BMI and weight of patients with heart disease" />
          <CaseImage src="/cardio/heatmap.jpg" caption="How the numbers relate to each other" />
        </div>
      </section>

      <section id="models" className="case-sec">
        <h2 className="display">four models</h2>
        <p className="case-lead">Each tuned with cross-validation and tested on 13,717 people it hadn’t seen. They all land close together, around 73%. XGBoost was the best balance.</p>
        <HighlightBlock className="mb">
          {models.map(([n, acc, f1], i) => (
            <div key={n} className={`mb-row ${i === 0 ? "best" : ""}`}>
              <span className="display">{n}</span>
              <div className="bar" style={{ ["--w" as string]: `${((acc - 60) / 20) * 100}%` }} />
              <b className="display">{acc.toFixed(1)}%</b>
            </div>
          ))}
        </HighlightBlock>
        <p className="case-note">Accuracy on the test set; bars start at 60%. XGBoost also had the best F1 score (0.712) and lowest error.</p>
      </section>

      <section id="why" className="case-sec">
        <h2 className="display">what matters most</h2>
        <p className="case-lead">By XGBoost’s own count, BMI is the factor it uses most, then age and systolic blood pressure. SHAP, which measures how much each factor actually moves a prediction, puts systolic blood pressure first. Smoking, alcohol and gender barely changed the rate in our data.</p>
        <HighlightBlock className="mb">
          {features.map(([n, v], i) => (
            <div key={n} className={`mb-row ${i < 3 ? "best" : ""}`}>
              <span className="display">{n}</span>
              <div className="bar" style={{ ["--w" as string]: `${(v / 211) * 100}%` }} />
              <b className="display">{v}</b>
            </div>
          ))}
        </HighlightBlock>
        <p className="case-note">XGBoost feature importance: how often the model splits on each factor.</p>
        <div className="case-grid-1 case-big" style={{ marginTop: 32 }}>
          <CaseImage src="/cardio/shap-summary.jpg" caption="SHAP: how much each factor pushes a prediction up or down" />
        </div>
      </section>

      <section id="report" className="case-sec">
        <h2 className="display">a personal risk report</h2>
        <p className="case-lead">Anyone can enter their age, height, weight, blood pressure and cholesterol. The XGBoost model and SHAP give their risk, the factors behind it, and a recommendation for the biggest one.</p>
        <div className="case-grid-1 case-big">
          <CaseImage src="/cardio/risk-report.jpg" caption="Risk report for one patient from the test set" />
        </div>
        <h3 className="display ai-sub">what I learned</h3>
        <AiRows rows={[
          ["Models agree", "Four very different models all reached about 73%. The limit is what the data can tell us, not the model."],
          ["Explain it", "SHAP turned a number into a reason a person can act on."],
          ["Clean first", "Blood pressures of zero or less and impossible heights had to go before anything else made sense."],
        ]} />
      </section>
      <AiFoot />
    </main>
  );
}
