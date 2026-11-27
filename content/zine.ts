// ✏️ The Fashion Zine page. Pages are listed in reading order:
// front cover first, back cover last. Put your page images in /public/zine/
// (A4 portrait, e.g. 1240×1754 jpg) and list them here.

export const zine = {
  heading: "Fashion Editorial & Zine Design",
  subheading: "Through illustration, photography, and graphic design",
  title: "ਦ੍ਰਿਸ਼ਟੀਕੋਣ",
  pronunciation: "/pər·spek·tiv/ · noun",
  intro: "A personal fashion zine exploring identity, perspective, and style as a form of storytelling.",
  tagline: "bilingual, bold, and entirely hand-made.",
  // cover, then spreads, a blank inside back cover, then the back cover
  pages: Array.from({ length: 10 }, (_, i) => `/zine/page-${i}.jpg`),
  about:
    "Through illustrations, photography and written reflections, the zine captures how everyday textures, moods and memories shape the way I dress and see the world. The process was intuitive and layered: sketching, collage and minimal graphic design, made into a visual diary of my inspirations and identity.",
  sketches: [
    { src: "/zine/sketch-layout.jpg", caption: "Layout sketches" },
    { src: "/zine/sketch-fashion.jpg", caption: "Fashion sketches: futuristic fashion and sustainability" },
  ],
  process: [
    {
      step: "01 — Research",
      title: "Concept development",
      text: "Exploring futuristic fashion, sustainability, and the idea of perspective as a recurring theme.",
    },
    {
      step: "02 — Visual language",
      title: "Duotone constraint",
      text: "Committing to a strict red-on-white palette with halftone textures. The constraint forced every element (type, image, illustration) to carry its own visual weight.",
    },
    {
      step: "03 — Production",
      title: "Bilingual layout",
      text: "Weaving Punjabi script and English typography throughout, not as decoration but as a statement of dual identity. Each spread is a balance of script, image, and space.",
    },
  ],
};
