// Generates the placeholder artwork in /public. Delete this script (and its call in package.json) once you add real images.
const fs=require("fs");
const W=800,H=600;
const grad=(id,a,b)=>`<radialGradient id="${id}" cx="35%" cy="35%" r="75%"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
const shapes={
 "technical-drawings":`<rect width="800" height="600" fill="#fff"/>${[...Array(12)].map((_,i)=>`<line x1="${80+i*55}" y1="60" x2="${80+i*55}" y2="540" stroke="#000" stroke-width="${i%3?2:6}"/>`).join("")}<rect x="200" y="150" width="400" height="300" fill="none" stroke="#000" stroke-width="18"/><circle cx="400" cy="300" r="90" fill="url(#g)"/>`,
 "3d-renders":`<rect width="800" height="600" fill="url(#g)"/><polygon points="400,90 640,220 640,440 400,560 160,440 160,220" fill="#111"/><polygon points="400,90 640,220 400,350 160,220" fill="#ddd"/><polygon points="400,350 640,220 640,440 400,560" fill="#666"/>`,
 "fashion-zine":`<rect width="800" height="600" fill="#eee"/><ellipse cx="400" cy="200" rx="90" ry="110" fill="url(#g)"/><path d="M230 600 Q260 330 400 320 Q540 330 570 600Z" fill="#111"/><text x="40" y="120" font-family="Impact,sans-serif" font-size="120" fill="#000">ZINE</text>`,
 "drawings":`<rect width="800" height="600" fill="#fff"/>${[...Array(18)].map((_,i)=>`<path d="M${60+i*10} ${520-i*8} C ${250+i*12} ${100+i*9}, ${500-i*5} ${600-i*14}, ${740-i*8} ${90+i*12}" fill="none" stroke="#000" stroke-width="${2+i%4*2}"/>`).join("")}`,
 "few-shot":`<rect width="800" height="600" fill="#fff"/>${[...Array(5)].map((_,r)=>[...Array(5)].map((_,c)=>`<rect x="${110+c*120}" y="${20+r*115}" width="100" height="100" rx="10" fill="${(r+c)%3==0?"#000":"url(#g)"}"/>`).join("")).join("")}`,
 "sarcasm":`<rect width="800" height="600" fill="url(#g)"/><rect x="120" y="140" width="560" height="260" rx="60" fill="#fff"/><polygon points="220,390 300,390 200,500" fill="#fff"/><text x="400" y="320" text-anchor="middle" font-family="Georgia,serif" font-size="150" font-style="italic" fill="#000">sure.</text>`,
 "ktmb":`<rect width="800" height="600" fill="#ddd"/><rect x="290" y="40" width="220" height="520" rx="36" fill="#000"/><rect x="305" y="80" width="190" height="440" rx="10" fill="url(#g)"/><rect x="325" y="380" width="150" height="40" rx="20" fill="#fff"/>`,
 "ecommerce":`<rect width="800" height="600" fill="#fff"/>${[0,1,2].map(i=>`<rect x="${70+i*230}" y="120" width="200" height="280" fill="${i==1?"#000":"url(#g)"}"/><rect x="${70+i*230}" y="420" width="140" height="18" fill="#000"/><rect x="${70+i*230}" y="450" width="80" height="18" fill="#888"/>`).join("")}`,
 "breathing-bag":`<rect width="800" height="600" fill="#fff"/>${[5,4,3,2,1].map(i=>`<ellipse cx="400" cy="320" rx="${i*70}" ry="${i*52}" fill="${i%2?"url(#g)":"#fff"}" stroke="#000" stroke-width="4"/>`).join("")}`,
 "glow-of-orchard":`<rect width="800" height="600" fill="#000"/>${[...Array(40)].map((_,i)=>{const x=(i*97)%760+20,y=(i*53)%520+40;return `<circle cx="${x}" cy="${y}" r="${10+(i*7)%45}" fill="url(#w)"/>`}).join("")}`,
 "me":`<rect width="600" height="700" fill="#fff"/><ellipse cx="300" cy="260" rx="130" ry="160" fill="url(#g)"/><path d="M60 700 Q90 450 300 440 Q510 450 540 700Z" fill="url(#g)"/>`,
};
for(const [k,body] of Object.entries(shapes)){
 const me=k==="me";
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${me?600:W}" height="${me?700:H}" viewBox="0 0 ${me?600:W} ${me?700:H}"><defs>${grad("g","#bbb","#000")}<radialGradient id="w"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>${body}</svg>`;
 fs.mkdirSync("public/work",{recursive:true});
 fs.writeFileSync(me?"public/me.svg":`public/work/${k}.svg`,svg);
}

// Stand-in zine pages (A4 portrait, red on white). Replace with your real pages in /public/zine/.
fs.mkdirSync("public/zine",{recursive:true});
const R="#ff1a00";
const dots=`<pattern id="d" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="3.2" fill="${R}"/></pattern>`;
const zinePages=[
 `<rect width="620" height="877" fill="#f4f1ec"/><text x="70" y="640" font-family="Impact,sans-serif" font-size="230" fill="${R}" transform="rotate(-90 70 640)">ZINE</text><circle cx="400" cy="470" r="150" fill="url(#d)"/><circle cx="400" cy="470" r="150" fill="none" stroke="${R}" stroke-width="6"/><text x="560" y="840" text-anchor="end" font-family="Georgia,serif" font-size="22" fill="${R}">FIRST EDITION</text>`,
 `<rect width="620" height="877" fill="#fff"/><text x="60" y="140" font-family="Georgia,serif" font-style="italic" font-size="44" fill="${R}">contents</text>${[0,1,2,3,4].map(i=>`<line x1="60" x2="560" y1="${230+i*90}" y2="${230+i*90}" stroke="${R}" stroke-width="2"/><text x="60" y="${215+i*90}" font-family="Georgia,serif" font-size="26" fill="${R}">0${i+1} — section</text>`).join("")}`,
 `<rect width="620" height="877" fill="#fff"/><rect x="0" y="0" width="620" height="560" fill="url(#d)"/><text x="40" y="680" font-family="Impact,sans-serif" font-size="96" fill="${R}">IDENTITY</text>`,
 `<rect width="620" height="877" fill="${R}"/><text x="310" y="470" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="70" fill="#fff">perspective</text>`,
 `<rect width="620" height="877" fill="#fff"/><path d="M80 820 Q120 300 310 260 Q500 300 540 820Z" fill="url(#d)"/><ellipse cx="310" cy="190" rx="90" ry="110" fill="none" stroke="${R}" stroke-width="8"/>`,
 `<rect width="620" height="877" fill="#fff"/><text x="60" y="160" font-family="Impact,sans-serif" font-size="88" fill="${R}">STYLE</text>${[...Array(10)].map((_,i)=>`<rect x="60" y="${220+i*52}" width="${500-(i%3)*90}" height="14" fill="${R}" opacity="0.8"/>`).join("")}`,
 `<rect width="620" height="877" fill="#fff"/>${[...Array(6)].map((_,i)=>`<circle cx="310" cy="440" r="${260-i*40}" fill="none" stroke="${R}" stroke-width="${i%2?3:10}"/>`).join("")}`,
 `<rect width="620" height="877" fill="#f4f1ec"/><rect x="420" y="760" width="140" height="70" fill="none" stroke="${R}" stroke-width="3"/>${[...Array(14)].map((_,i)=>`<rect x="${430+i*9}" y="770" width="${i%3?3:5}" height="50" fill="${R}"/>`).join("")}<text x="60" y="140" font-family="Georgia,serif" font-style="italic" font-size="36" fill="${R}">fin.</text>`,
];
zinePages.forEach((body,i)=>{
 const out=`public/zine/page-${i}.svg`;
 if(fs.existsSync(out) || fs.existsSync(`public/zine/page-${i}.jpg`)) return; // real pages win
 fs.writeFileSync(out,`<svg xmlns="http://www.w3.org/2000/svg" width="620" height="877" viewBox="0 0 620 877"><defs>${dots}</defs>${body}</svg>`);
});
