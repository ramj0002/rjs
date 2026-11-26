// Line drawings ("plates") for each project, drawn like technical figures.
// Colours come from CSS: currentColor = ink, var(--accent), var(--soft), var(--panel).

const S = (inner: string) =>
  `<svg viewBox="0 0 400 300" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;
// Serif label (Baskervville) and display label (Anton)
const T = (x: number, y: number, t: string, o = "") =>
  `<text x="${x}" y="${y}" fill="currentColor" stroke="none" font-family="Baskervville,Georgia,serif" font-size="15" ${o}>${t}</text>`;
const D = (x: number, y: number, t: string, o = "") =>
  `<text x="${x}" y="${y}" fill="currentColor" stroke="none" font-family="Anton,Impact,sans-serif" font-size="17" ${o}>${t}</text>`;

let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

export const plates: Record<string, () => string> = {
  ktmb: () =>
    S(`<rect x="70" y="40" width="110" height="220" rx="16"/><rect x="220" y="40" width="110" height="220" rx="16" stroke-width="2.5"/>
<g opacity=".45"><rect x="84" y="70" width="82" height="14"/><rect x="84" y="94" width="50" height="10"/><rect x="84" y="114" width="82" height="34"/><rect x="84" y="158" width="36" height="36"/><rect x="130" y="158" width="36" height="36"/><rect x="84" y="204" width="82" height="10"/></g>
${D(125, 240, "1.6 ★", 'text-anchor="middle"')}
<path d="M238 80 H312" stroke="var(--accent)" stroke-width="5"/><circle cx="238" cy="80" r="6" fill="var(--panel)" stroke="var(--accent)" stroke-width="3"/><circle cx="312" cy="80" r="6" fill="var(--accent)" stroke="var(--accent)"/>
<rect x="234" y="104" width="82" height="40" rx="6"/><rect x="234" y="154" width="82" height="40" rx="6"/><rect x="234" y="208" width="82" height="30" rx="15" fill="currentColor"/>
<path d="M190 150 H210 M204 144 L210 150 L204 156" stroke="var(--accent)"/>`),

  orchard: () => {
    let c = "";
    for (let y = 0; y < 8; y++)
      for (let x = 0; x < 8; x++) {
        const v = Math.exp(-((x - 2.4) ** 2 + (y - 3) ** 2) / 4) + 0.8 * Math.exp(-((x - 5.6) ** 2 + (y - 4.6) ** 2) / 3);
        // halftone: dot size follows heat
        const r = Math.min(9.5, 1.2 + v * 8.5).toFixed(1);
        c += `<circle cx="${216 + x * 20}" cy="${80 + y * 20}" r="${r}" fill="var(--accent)" stroke="none"/>`;
      }
    return S(`<path d="M40 70 H160 L148 100 H52 Z" fill="var(--panel)"/><rect x="82" y="100" width="36" height="10"/><circle cx="100" cy="114" r="6" fill="var(--accent)" stroke="var(--accent)"/>
<path d="M100 120 L50 250 M100 120 L150 250" stroke-dasharray="5 6" opacity=".5"/><path d="M40 250 H160" />
<circle cx="76" cy="226" r="9"/><path d="M76 235 V250"/><circle cx="124" cy="222" r="9"/><path d="M124 231 V250"/>
${c}<rect x="206" y="70" width="160" height="160"/>${T(206, 256, "8 × 8 thermal grid, ~1 Hz", 'font-style="italic"')}`);
  },

  bag: () => {
    let m = "";
    for (let i = 0; i < 10; i++) {
      const x = 70 + i * 28;
      m += `<rect x="${x}" y="110" width="20" height="30" rx="3"/><path d="M${x + 10} 140 V${190 + (i % 3) * 14}" stroke="var(--accent)" stroke-width="3"/>`;
    }
    return S(`<path d="M50 90 H350" stroke-width="3"/>${m}<path d="M70 240 H346" stroke-dasharray="4 5" opacity=".5"/>${D(70, 72, "row 1")}${D(200, 72, "row 2", 'text-anchor="middle"')}${D(346, 72, "row 3", 'text-anchor="end"')}${T(200, 270, "heart, speed, single and row control", 'text-anchor="middle" fill="var(--soft)" font-style="italic"')}`);
  },

  fewshot: () => {
    seed = 11;
    let d = "";
    const cl = (cx: number, cy: number, sp: number, col: string) => {
      for (let i = 0; i < 14; i++) {
        const a = rnd() * 6.28, r = rnd() * sp;
        d += `<circle cx="${(cx + Math.cos(a) * r).toFixed(1)}" cy="${(cy + Math.sin(a) * r).toFixed(1)}" r="3.5" fill="${col}" stroke="none"/>`;
      }
    };
    cl(60, 90, 22, "currentColor"); cl(130, 80, 22, "var(--accent)"); cl(90, 160, 22, "var(--soft)");
    cl(260, 110, 52, "currentColor"); cl(300, 140, 52, "var(--accent)"); cl(280, 170, 52, "var(--soft)");
    return S(`<path d="M195 30 V250" stroke-dasharray="4 6" opacity=".4"/>${d}<circle cx="60" cy="90" r="28" opacity=".5"/><circle cx="130" cy="80" r="28" opacity=".5"/><circle cx="90" cy="160" r="28" opacity=".5"/>
${D(100, 236, "OrganAMNIST 88%", 'text-anchor="middle"')}${D(290, 236, "DermaMNIST 52%", 'text-anchor="middle"')}${T(100, 256, "compact clusters", 'text-anchor="middle" fill="var(--soft)" font-style="italic"')}${T(290, 256, "overlapping", 'text-anchor="middle" fill="var(--soft)" font-style="italic"')}`);
  },

  sarcasm: () =>
    S(`<path d="M40 50 H250 V140 H120 L90 170 V140 H40 Z" fill="var(--panel)"/>${D(56, 90, "oh great, another", 'font-size="22"')}${D(56, 120, "monday. love it.", 'font-size="22"')}
<path d="M200 180 C260 180 280 150 300 120" stroke="var(--accent)"/><path d="M292 124 L300 120 L302 129" stroke="var(--accent)"/>
<rect x="250" y="190" width="120" height="60" fill="var(--accent)" stroke="var(--accent)"/>${D(310, 218, "sarcastic", 'text-anchor="middle" fill="#fff"')}${T(310, 238, "negative", 'text-anchor="middle" fill="#fff" font-style="italic"')}
<g opacity=".5">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${40 + i * 22}" y="214" width="14" height="${8 + ((i * 37) % 30)}" transform="translate(0 ${30 - ((i * 37) % 30)})"/>`).join("")}</g>${T(40, 276, "BERT, 768 dimensions", 'fill="var(--soft)" font-style="italic"')}`),

  xyr: () =>
    S(`<rect x="40" y="36" width="320" height="228" rx="8"/><path d="M40 62 H360"/><circle cx="56" cy="49" r="4"/><circle cx="70" cy="49" r="4"/><circle cx="84" cy="49" r="4"/>
${D(60, 92, "XYR", 'font-size="22"')}<path d="M260 84 H340" opacity=".4"/>
${[0, 1, 2, 3].map((i) => `<rect x="${60 + i * 74}" y="106" width="62" height="78" ${i == 1 ? 'fill="var(--accent)" fill-opacity=".14" stroke="var(--accent)"' : ""}/><path d="M${60 + i * 74} 196 H${110 + i * 74}" opacity=".5"/><path d="M${60 + i * 74} 208 H${92 + i * 74}" opacity=".5"/>`).join("")}
<rect x="60" y="226" width="96" height="22" rx="11" fill="currentColor"/>${D(260, 244, "stock: 12 left", 'fill="var(--accent)"')}`),

  renders: () => {
    let p = "";
    for (let i = 0; i < 8; i++) {
      p += `<ellipse cx="200" cy="96" rx="22" ry="44" transform="rotate(${i * 45} 200 150)" fill="var(--panel)" ${i % 2 ? 'stroke="var(--accent)"' : ""}/>`;
    }
    return S(`${p}<circle cx="200" cy="150" r="40" fill="var(--panel)" stroke-width="2.5"/><path d="M200 150 V124 M200 150 L218 160" stroke-width="3"/><circle cx="200" cy="150" r="3" fill="currentColor"/>
<path d="M150 260 H250"/><path d="M200 230 V260" opacity=".5"/>${D(30, 42, "bloom &amp; rise")}${T(30, 60, "kids’ alarm clock", 'fill="var(--soft)" font-style="italic"')}`);
  },

  tech: () =>
    S(`<path d="M50 70 H170 V110 H120 V180 H50 Z"/><path d="M50 200 H170 V230 H50 Z"/><path d="M220 70 H300 V180 H220 Z"/><circle cx="85" cy="140" r="12"/><path d="M85 122 V158 M67 140 H103" stroke-dasharray="3 4" opacity=".6"/>
<path d="M260 70 V180" stroke-dasharray="10 4 2 4" opacity=".6"/>
<g stroke="var(--accent)" stroke-width="1.4"><path d="M50 52 V62 M170 52 V62 M50 57 H170"/><path d="M320 70 H330 M320 180 H330 M325 70 V180"/></g>
${T(110, 46, "120", 'text-anchor="middle" fill="var(--accent)"')}${T(338, 130, "110", 'fill="var(--accent)"')}${T(50, 270, "front, plan and side, dimensioned for fabrication", 'fill="var(--soft)" font-style="italic"')}`),

  zine: () => {
    let h = "";
    for (let y = 0; y < 9; y++)
      for (let x = 0; x < 7; x++) {
        h += `<circle cx="${226 + x * 16}" cy="${66 + y * 18}" r="${(1 + ((x + y) % 5) * 1.3).toFixed(1)}" fill="var(--accent)" stroke="none"/>`;
      }
    return S(`<rect x="40" y="40" width="160" height="220" fill="var(--panel)"/><rect x="200" y="40" width="160" height="220" fill="var(--panel)"/>${h}
<text x="120" y="130" text-anchor="middle" font-family="'Noto Serif Gurmukhi',serif" font-size="26" font-weight="500" fill="var(--accent)" stroke="none">ਦ੍ਰਿਸ਼ਟੀਕੋਣ</text>
${T(120, 160, "perspective", 'text-anchor="middle" fill="var(--accent)" font-size="17" font-style="italic"')}<path d="M70 190 H170 M70 204 H150 M70 218 H160" stroke="var(--accent)" opacity=".6"/>`);
  },

  drawings: () =>
    S(`<path d="M90 230 C80 160 110 90 170 70 C230 50 290 90 300 150 C310 210 260 250 200 250" stroke-width="2.5"/>
<path d="M150 130 C160 120 175 120 182 132 M222 128 C230 118 246 120 252 132" stroke-width="2.5"/><path d="M196 150 C192 170 200 180 210 178" stroke-width="2"/>
<path d="M170 205 C190 218 220 218 238 202" stroke="var(--accent)" stroke-width="3"/>
<g opacity=".35" stroke-width="1">${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${60 + i * 6} ${250 - i * 30} L${110 + i * 6} ${200 - i * 30}"/>`).join("")}</g>${T(310, 270, "digital illustration", 'text-anchor="end" fill="var(--soft)" font-style="italic"')}`),
};
