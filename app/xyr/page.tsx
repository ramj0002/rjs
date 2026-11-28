import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import "../ktmb/case.css";
import "../glow-of-orchard/orchard.css";
import "./xyr.css";
import CaseImage from "@/components/CaseImage";
import HighlightBlock from "@/components/Highlight";
import CheckoutDemo from "@/components/CheckoutDemo";
import { plates } from "@/components/plates";
import { xyr as x } from "@/content/xyr";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `XYR Fashion Store — ${site.title}`,
  description: x.tagline,
};

const sections = [
  ["overview", "overview"],
  ["journey", "journey"],
  ["design", "design"],
  ["checkout", "checkout"],
  ["admin", "admin"],
  ["database", "database"],
  ["security", "security"],
  ["versions", "versions"],
  ["testing", "testing"],
  ["payments", "payments"],
];

export default function Xyr() {
  const hasVideo = fs.existsSync(path.join(process.cwd(), "public", x.video));
  return (
    <main className="case xyr page-theme t-pink2">
      <header className="case-hero">
        <div className="case-hero-text">
          <p className="case-kicker"><em>case study · Product / UX</em></p>
          <h1 className="display">{x.title}</h1>
          <p className="case-tagline">{x.tagline}</p>
          <ul className="tools">{x.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="case-hero-plate plate-svg" aria-hidden dangerouslySetInnerHTML={{ __html: plates.xyr() }} />
      </header>

      <nav className="case-nav" aria-label="Sections">
        {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <section id="overview" className="case-sec">
        <h2 className="display">overview</h2>
        <div className="case-two">
          <div>
            <p className="case-lead">{x.intro}</p>
          </div>
          <HighlightBlock className="pop-block">
            <div className="case-stats vertical">
              {x.stats.map(([big, small]) => (
                <div key={small}><b className="display">{big}</b><span>{small}</span></div>
              ))}
            </div>
          </HighlightBlock>
        </div>
      </section>

      <section id="journey" className="case-sec">
        <h2 className="display">the shopper’s journey</h2>
        <HighlightBlock className="orch-flow xyr-flow">
          <ol>
            {x.journey.map((s, i) => (
              <li key={s.title} style={{ ["--i" as string]: i }}>
                <span className="num display">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </HighlightBlock>
        <figure className="case-img xyr-home" style={{ marginTop: 36 }}>
          <div className="xyr-home-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/xyr/home-full.jpg" alt="XYR home page" loading="lazy" />
            {hasVideo && (
              <div className="xyr-hero-vid">
                <video src={x.video} poster="/xyr/walk-the-future.jpg" autoPlay muted loop playsInline preload="metadata" />
                <div className="xyr-hero-text" aria-hidden><b>Walk the Future</b><span>Shop Now</span></div>
              </div>
            )}
          </div>
          <figcaption>Home page, with the “Walk the Future” video</figcaption>
        </figure>
        <div className="case-grid-1 case-big xyr-screens">
          {x.customer.filter((im) => !im.src.endsWith("home.png")).map((im) => <CaseImage key={im.src} {...im} />)}
        </div>
      </section>

      <section id="design" className="case-sec">
        <h2 className="display">site map &amp; wireframe</h2>
        <div className="case-grid-1 case-big">
          {x.design.map((im) => <CaseImage key={im.src} {...im} />)}
        </div>
      </section>

      <section id="checkout" className="case-sec">
        <h2 className="display">all-or-nothing checkout</h2>
        <p className="case-lead">{x.checkout.intro}</p>
        <CheckoutDemo />
        <div className="case-grid-1 case-big xyr-big" style={{ marginTop: 36 }}>
          {x.email.map((im) => <CaseImage key={im.src} {...im} />)}
        </div>
      </section>

      <section id="admin" className="case-sec">
        <h2 className="display">admin dashboard</h2>
        <p className="case-lead">One page with four tabs. Every action talks to a small API, so nothing reloads.</p>
        <div className="sol xyr-admin">
          {x.admin.map((a, i) => (
            <div key={a.title} className="xyr-admin-card">
              <span className="num display">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display">{a.title}</h3>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
        <div className="case-grid-1 case-big xyr-big" style={{ marginTop: 32 }}>
          {x.adminImages.map((im) => <CaseImage key={im.src} {...im} />)}
        </div>
      </section>

      <section id="database" className="case-sec">
        <h2 className="display">database</h2>
        <p className="case-lead">Four tables. Stock lives per size, and every sale keeps its own price.</p>
        <div className="db">
          {x.tables.map((t) => (
            <div key={t.name} className={`db-table db-${t.name}`}>
              <p className="db-name display">{t.name}</p>
              <ul>
                {t.cols.map((c) => (
                  <li key={c} className={c.includes("→") ? "fk" : c === "id" ? "pk" : ""}>
                    {c.replace(" →", "")}{c.includes("→") && <span className="db-link"> → products</span>}{c === "id" && <span className="db-link"> key</span>}
                  </li>
                ))}
              </ul>
              <p className="db-note">{t.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="security" className="case-sec">
        <h2 className="display">security</h2>
        <div className="case-rows case-rows-big">
          {x.security.map(([title, text]) => (
            <div key={title}>
              <h3 className="display">{title}</h3>
              <div><p>{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="versions" className="case-sec">
        <h2 className="display">built twice</h2>
        <p className="case-lead">First in PHP, then rebuilt with React, Vite and Tailwind on the same APIs.</p>
        <div className="xyr-versions">
          {x.versions.map((v, i) => (
            <div key={v.title} className={i === 1 ? "now" : ""}>
              <h3 className="display">{v.title}</h3>
              <p className="label">{v.sub}</p>
              <ul className="case-list">{v.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section id="testing" className="case-sec">
        <h2 className="display">testing</h2>
        <p className="case-lead">26 test cases across the whole store. All 26 passed.</p>
        <HighlightBlock className="pop-methods">
          <div className="case-methods xyr-tests">
            {x.tests.map(([n, label, text]) => (
              <div key={label}>
                <b className="display">{n}</b>
                <span className="m-label"><em>{label}</em></span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </HighlightBlock>
        <p className="case-note">{x.next}</p>
      </section>

      <section id="payments" className="case-sec">
        <h2 className="display">then, real payments</h2>
        <div className="case-two">
          <p className="case-lead">{x.payments.intro}</p>
          <HighlightBlock className="pop-block">
            <div className="case-stats vertical">
              {x.payments.stats.map(([big, small]) => (
                <div key={small}><b className="display">{big}</b><span>{small}</span></div>
              ))}
            </div>
          </HighlightBlock>
        </div>
        <div className="case-rows case-rows-big" style={{ marginTop: 28 }}>
          {x.payments.rows.map(([title, text]) => (
            <div key={title}>
              <h3 className="display">{title}</h3>
              <div><p>{text}</p></div>
            </div>
          ))}
        </div>
        <p className="case-note">
          Stripe Checkout · PHPUnit · GitHub Actions on PHP 8.2 and 8.3 ·{" "}
          <a href={x.payments.repo} target="_blank" rel="noreferrer">see the code on GitHub →</a>
        </p>
      </section>

      <SiteFooter back />
    </main>
  );
}
