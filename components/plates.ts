// Line drawings ("plates") for each project, drawn like technical figures, each with
// a small looping animation (classes a-* are animated in app/globals.css).
// Colours come from CSS: currentColor = ink, var(--accent), var(--soft), var(--panel).

const S = (inner: string) =>
  `<svg viewBox="0 0 400 300" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;
// Serif label (Baskervville) and display label (Anton)
// (defaults only apply when `o` doesn't set them: a repeated SVG attribute is ignored)
const attrs = (o: string, defaults: Record<string, string>) =>
  Object.entries(defaults).filter(([k]) => !new RegExp(`(^|\\s)${k}=`).test(o)).map(([k, v]) => `${k}="${v}"`).join(" ");
const T = (x: number, y: number, t: string, o = "") =>
  `<text x="${x}" y="${y}" stroke="none" font-family="Baskervville,Georgia,serif" ${attrs(o, { fill: "currentColor", "font-size": "15" })} ${o}>${t}</text>`;
const D = (x: number, y: number, t: string, o = "") =>
  `<text x="${x}" y="${y}" stroke="none" font-family="Anton,Impact,sans-serif" ${attrs(o, { fill: "currentColor", "font-size": "17" })} ${o}>${t}</text>`;
const delay = (s: number) => `style="animation-delay:${s.toFixed(2)}s"`;

let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

export const plates: Record<string, () => string> = {
  // The old app's 1.6 ★ pops out, then the redesign earns its 5 stars.
  ktmb: () =>
    S(`<rect x="70" y="40" width="110" height="220" rx="16"/><rect x="220" y="40" width="110" height="220" rx="16" stroke-width="2.5"/>
<g opacity=".45" class="a-fade"><rect x="84" y="70" width="82" height="14"/><rect x="84" y="94" width="50" height="10"/><rect x="84" y="114" width="82" height="34"/><rect x="84" y="158" width="36" height="36"/><rect x="130" y="158" width="36" height="36"/><rect x="84" y="204" width="82" height="10"/></g>
${D(125, 244, "1.6 ★", 'class="a-pop-a" text-anchor="middle" font-size="26" fill="var(--accent)"')}
<path d="M238 80 H312" stroke="var(--accent)" stroke-width="5"/><circle cx="238" cy="80" r="6" fill="var(--panel)" stroke="var(--accent)" stroke-width="3"/><circle cx="312" cy="80" r="6" fill="var(--accent)" stroke="var(--accent)"/>
<circle class="a-travel" cx="238" cy="80" r="5" fill="currentColor" stroke="none"/>
<rect x="234" y="102" width="82" height="36" rx="6"/><rect x="234" y="146" width="82" height="36" rx="6"/><rect x="234" y="190" width="82" height="22" rx="11" fill="currentColor"/>
${D(275, 244, "5 ★", 'class="a-pop-b" text-anchor="middle" font-size="26" fill="var(--accent)"')}
<path class="a-nudge" d="M190 150 H210 M204 144 L210 150 L204 156" stroke="var(--accent)"/>`),

  // The heat map breathes like people moving under the light; the beam scans.
  orchard: () => {
    let c = "";
    for (let y = 0; y < 8; y++)
      for (let x = 0; x < 8; x++) {
        const v = Math.exp(-((x - 2.4) ** 2 + (y - 3) ** 2) / 4) + 0.8 * Math.exp(-((x - 5.6) ** 2 + (y - 4.6) ** 2) / 3);
        const r = Math.min(9.5, 1.2 + v * 8.5).toFixed(1);
        c += `<circle class="a-heat" ${delay((x + y) * 0.09)} cx="${216 + x * 20}" cy="${80 + y * 20}" r="${r}" fill="var(--accent)" stroke="none"/>`;
      }
    return S(`<path d="M40 70 H160 L148 100 H52 Z" fill="var(--panel)"/><rect x="82" y="100" width="36" height="10"/><circle class="a-blink" cx="100" cy="114" r="6" fill="var(--accent)" stroke="var(--accent)"/>
<path class="a-march" d="M100 120 L50 250 M100 120 L150 250" stroke-dasharray="5 6" opacity=".5"/><path d="M40 250 H160" />
<g class="a-walk"><circle cx="76" cy="226" r="9"/><path d="M76 235 V250"/></g><g class="a-walk" ${delay(-1.6)}><circle cx="124" cy="222" r="9"/><path d="M124 231 V250"/></g>
${c}<rect x="206" y="70" width="160" height="160"/>${T(206, 256, "8 × 8 thermal grid, ~1 Hz", 'font-style="italic"')}`);
  },

  // (Fallback only: the Breathing Bag uses the interactive BagPlate component.)
  bag: () => {
    let m = "";
    for (let i = 0; i < 10; i++) {
      const x = 70 + i * 28;
      m += `<rect x="${x}" y="110" width="20" height="30" rx="3"/><path class="a-sway" ${delay(i * 0.15)} d="M${x + 10} 140 V${190 + (i % 3) * 14}" stroke="var(--accent)" stroke-width="3"/>`;
    }
    return S(`<path d="M50 90 H350" stroke-width="3"/>${m}`);
  },

  // Points drift inside their clusters; prototypes pulse.
  fewshot: () => {
    seed = 11;
    let d = "";
    let k = 0;
    const cl = (cx: number, cy: number, sp: number, col: string) => {
      for (let i = 0; i < 14; i++) {
        const a = rnd() * 6.28, r = rnd() * sp;
        d += `<circle class="a-float" ${delay(-(k++ % 9) * 0.45)} cx="${(cx + Math.cos(a) * r).toFixed(1)}" cy="${(cy + Math.sin(a) * r).toFixed(1)}" r="3.5" fill="${col}" stroke="none"/>`;
      }
    };
    cl(60, 90, 22, "currentColor"); cl(130, 80, 22, "var(--accent)"); cl(90, 160, 22, "var(--soft)");
    cl(260, 110, 52, "currentColor"); cl(300, 140, 52, "var(--accent)"); cl(280, 170, 52, "var(--soft)");
    return S(`<path d="M195 30 V250" stroke-dasharray="4 6" opacity=".4"/>${d}<circle class="a-pulse" cx="60" cy="90" r="28" opacity=".5"/><circle class="a-pulse" ${delay(0.6)} cx="130" cy="80" r="28" opacity=".5"/><circle class="a-pulse" ${delay(1.2)} cx="90" cy="160" r="28" opacity=".5"/>
${D(100, 236, "OrganAMNIST 88%", 'text-anchor="middle"')}${D(290, 236, "DermaMNIST 52%", 'text-anchor="middle"')}${T(100, 256, "compact clusters", 'text-anchor="middle" fill="var(--soft)" font-style="italic"')}${T(290, 256, "overlapping", 'text-anchor="middle" fill="var(--soft)" font-style="italic"')}`);
  },

  // A sentence is split into tokens, embedded by BERT, then classified.
  sarcasm: () => {
    const toks = ["oh", "great", "another", "monday", "love", "it"];
    const widths = toks.map((t) => 12 + t.length * 8.2);
    let x = 200 - (widths.reduce((a, b) => a + b, 0) + 6 * (toks.length - 1)) / 2, chips = "";
    toks.forEach((t, i) => {
      const w = 12 + t.length * 8.2;
      chips += `<g class="a-tok" ${delay(i * 0.14)}><rect x="${x}" y="84" width="${w}" height="24" rx="12"/>${T(x + w / 2, 101, t, 'text-anchor="middle" font-size="14"')}</g>`;
      x += w + 6;
    });
    let cells = "";
    for (let i = 0; i < 24; i++) {
      const o = (0.25 + ((i * 53) % 70) / 100).toFixed(2);
      cells += `<rect class="a-cell" ${delay((i % 8) * 0.06)} x="${34 + i * 14}" y="186" width="11" height="22" fill="var(--accent)" fill-opacity="${o}" stroke="none"/>`;
    }
    return S(`<rect x="24" y="20" width="352" height="44" rx="6" fill="var(--panel)"/>${T(200, 48, "“oh great, another monday. love it.”", 'text-anchor="middle" font-size="17" font-style="italic"')}
<path d="M200 66 V80" opacity=".5"/>${chips}
<path d="M200 112 V126" opacity=".5"/>
<g class="a-bert"><rect x="150" y="128" width="100" height="40" fill="currentColor"/>${D(200, 156, "BERT", 'text-anchor="middle" fill="#fff" font-size="20"')}</g>
<path d="M200 170 V182" opacity=".5"/>${cells}${T(200, 224, "768-d embedding", 'text-anchor="middle" fill="var(--soft)" font-style="italic" font-size="13"')}
<rect x="34" y="240" width="200" height="14" rx="7"/><rect class="a-meter" x="34" y="240" width="184" height="14" rx="7" fill="var(--accent)" stroke="none"/>
${T(134, 274, "sarcasm score", 'text-anchor="middle" fill="var(--soft)" font-style="italic" font-size="13"')}
<g class="a-verdict"><rect x="250" y="228" width="126" height="40" fill="var(--accent)" stroke="var(--accent)"/>${D(313, 254, "sarcastic ✓", 'text-anchor="middle" fill="#fff" font-size="19"')}</g>`);
  },

  // The selection hops across the products; stock ticks down.
  xyr: () =>
    S(`<rect x="40" y="36" width="320" height="228" rx="8"/><path d="M40 62 H360"/><circle cx="56" cy="49" r="4"/><circle cx="70" cy="49" r="4"/><circle cx="84" cy="49" r="4"/>
${D(60, 92, "XYR", 'font-size="22"')}<path d="M260 84 H340" opacity=".4"/>
<rect class="a-scan" x="60" y="106" width="62" height="78" fill="var(--accent)" fill-opacity=".16" stroke="var(--accent)" stroke-width="2.5"/>
${[0, 1, 2, 3].map((i) => `<rect x="${60 + i * 74}" y="106" width="62" height="78"/><path d="M${60 + i * 74} 196 H${110 + i * 74}" opacity=".5"/><path d="M${60 + i * 74} 208 H${92 + i * 74}" opacity=".5"/>`).join("")}
<rect class="a-pulse" x="60" y="226" width="96" height="22" rx="11" fill="currentColor"/>${[["12 left", 0], ["3 left", -3.75], ["27 left", -2.5], ["sold out", -1.25]].map(([t, d]) => D(344, 244, "stock: " + t, `text-anchor="end" class="a-stock" ${delay(d as number)} fill="var(--accent)"`)).join("")}`),

  // The petals turn slowly; the clock hands keep time.
  renders: () => {
    let p = "";
    for (let i = 0; i < 8; i++) {
      p += `<ellipse cx="200" cy="96" rx="22" ry="44" transform="rotate(${i * 45} 200 150)" fill="var(--panel)" ${i % 2 ? 'stroke="var(--accent)"' : ""}/>`;
    }
    return S(`<g class="a-spin-slow">${p}</g><circle cx="200" cy="150" r="40" fill="var(--panel)" stroke-width="2.5"/>
<path class="a-hand-min" d="M200 150 V118" stroke-width="2.5"/><path class="a-hand-hr" d="M200 150 L218 160" stroke-width="3.5"/><circle cx="200" cy="150" r="3" fill="currentColor"/>
${D(30, 42, "bloom &amp; rise")}${T(30, 60, "kids’ alarm clock", 'fill="var(--soft)" font-style="italic"')}`);
  },

  // Dimension lines draw themselves in; the centreline marches.
  tech: () =>
    S(`<path d="M50 70 H170 V110 H120 V180 H50 Z"/><path d="M50 200 H170 V230 H50 Z"/><path d="M220 70 H300 V180 H220 Z"/><circle cx="85" cy="140" r="12"/><path d="M85 122 V158 M67 140 H103" stroke-dasharray="3 4" opacity=".6"/>
<path class="a-march" d="M260 70 V180" stroke-dasharray="10 4 2 4" opacity=".6"/>
<g class="a-draw-loop" stroke="var(--accent)" stroke-width="1.4"><path pathLength="1" d="M50 52 V62 M170 52 V62 M50 57 H170"/><path pathLength="1" d="M320 70 H330 M320 180 H330 M325 70 V180"/></g>
<g class="a-pop">${T(110, 46, "120", 'text-anchor="middle" fill="var(--accent)"')}${T(338, 130, "110", 'fill="var(--accent)"')}</g>${T(50, 270, "front, plan and side, dimensioned for fabrication", 'fill="var(--soft)" font-style="italic"')}`),

  // The zine flips: the halftone page turns over to reveal the next spread.
  zine: () => {
    let h = "";
    for (let y = 0; y < 9; y++)
      for (let x = 0; x < 7; x++) {
        h += `<circle cx="${226 + x * 16}" cy="${66 + y * 18}" r="${(1 + ((x + y) % 5) * 1.3).toFixed(1)}" fill="var(--accent)" stroke="none"/>`;
      }
    let figure = "";
    for (let y = 0; y < 7; y++)
      for (let x = 0; x < 6; x++) {
        const dx = x - 2.5, dy = y - 3.2;
        const r = Math.max(0.6, 5 - Math.hypot(dx * 1.2, dy) * 1.5);
        figure += `<circle cx="${78 + x * 17}" cy="${92 + y * 17}" r="${r.toFixed(1)}" fill="var(--accent)" stroke="none"/>`;
      }
    return S(`<rect x="40" y="40" width="160" height="220" fill="var(--panel)"/>
<text x="120" y="130" text-anchor="middle" font-family="'Noto Serif Gurmukhi',serif" font-size="26" font-weight="500" fill="var(--accent)" stroke="none">ਦ੍ਰਿਸ਼ਟੀਕੋਣ</text>
${T(120, 160, "perspective", 'text-anchor="middle" fill="var(--accent)" font-size="17" font-style="italic"')}<path d="M70 190 H170 M70 204 H150 M70 218 H160" stroke="var(--accent)" opacity=".6"/>
<rect x="200" y="40" width="160" height="220" fill="var(--panel)"/>
${D(280, 120, "identity", 'text-anchor="middle" fill="var(--accent)" font-size="34"')}<path d="M232 150 H328 M232 166 H312 M232 182 H322 M232 198 H300" stroke="var(--accent)" opacity=".6"/>${T(280, 236, "p. 03", 'text-anchor="middle" fill="var(--accent)" font-style="italic"')}
<g class="a-leaf-front"><rect x="200" y="40" width="160" height="220" fill="var(--panel)"/>${h}</g>
<g class="a-leaf-back"><rect x="40" y="40" width="160" height="220" fill="var(--panel)"/>${figure}${T(120, 236, "p. 02", 'text-anchor="middle" fill="var(--accent)" font-style="italic"')}</g>
<path d="M200 40 V260" stroke-width="2.5"/>`);
  },

  // A stylus draws a line on a tablet; the line appears as the pen moves.
  drawings: () => {
    const line = "M96 206 C110 130 150 110 172 150 C192 188 150 214 168 176 C186 138 236 110 258 150 C276 184 246 214 268 186 C286 162 306 150 314 128";
    const swatches = ["currentColor", "var(--accent)", "var(--soft)", "var(--panel)"];
    return S(`<rect x="52" y="44" width="296" height="212" rx="18" stroke-width="2.5"/><rect x="68" y="60" width="264" height="180" rx="6" fill="var(--panel)"/>
<circle cx="340" cy="150" r="3" fill="currentColor" stroke="none"/>
${swatches.map((c, i) => `<circle cx="${86 + i * 22}" cy="222" r="7" fill="${c}" ${i === 1 ? 'class="a-pulse" stroke="var(--accent)"' : ""}/>`).join("")}
<path pathLength="1" d="${line}" stroke="var(--accent)" stroke-width="4" stroke-dasharray="1 1">
  <animate attributeName="stroke-dashoffset" values="1;0;0;0" keyTimes="0;0.6;0.85;1" dur="5s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="1;1;1;0" keyTimes="0;0.6;0.85;1" dur="5s" repeatCount="indefinite"/>
</path>
<g>
  <animateMotion path="${line}" keyPoints="0;1;1" keyTimes="0;0.6;1" calcMode="linear" dur="5s" repeatCount="indefinite"/>
  <g transform="rotate(-35)"><path d="M0 0 L-5 -14 L5 -14 Z" fill="currentColor"/><rect x="-5" y="-74" width="10" height="60" rx="3" fill="var(--panel)" stroke-width="2"/><path d="M-5 -62 H5" opacity=".5"/></g>
</g>`);
  },
};
