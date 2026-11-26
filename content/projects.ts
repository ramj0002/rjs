// ✏️ Edit this file to add / change projects.
// Put images in /public/work/ and point `image` at them (jpg, png, svg all work).
// `link` is optional — add one to make the project open somewhere.

export type Category =
  | "Spatial / 3D"
  | "Visual / Artwork"
  | "AI / Data"
  | "Product / UX"
  | "Creative Tech";

export const categories: Category[] = [
  "Spatial / 3D",
  "Visual / Artwork",
  "AI / Data",
  "Product / UX",
  "Creative Tech",
];

export type Project = {
  title: string;
  category: Category;
  year?: string;
  blurb: string;
  image: string;
  link?: string;
};

export const projects: Project[] = [
  {
    title: "Technical Drawings",
    category: "Spatial / 3D",
    blurb: "Orthographic plans, sections and details — precision on paper.",
    image: "/work/technical-drawings.svg",
  },
  {
    title: "3D Rendered Visualisations",
    category: "Spatial / 3D",
    blurb: "Spaces modelled, lit and rendered before they exist.",
    image: "/work/3d-renders.svg",
  },
  {
    title: "Fashion Zine",
    category: "Visual / Artwork",
    blurb: "An editorial zine — layout, styling and print.",
    image: "/work/fashion-zine.svg",
    link: "/work/fashion-zine/",
  },
  {
    title: "Drawings",
    category: "Visual / Artwork",
    blurb: "A collection of hand drawings and studies.",
    image: "/work/drawings.svg",
  },
  {
    title: "Few-Shot Medical Image Classification",
    category: "AI / Data",
    blurb: "Teaching a model to classify medical images from only a handful of examples.",
    image: "/work/few-shot.svg",
  },
  {
    title: "Sarcasm Detection",
    category: "AI / Data",
    blurb: "An NLP model that tries to tell when someone doesn't mean it.",
    image: "/work/sarcasm.svg",
  },
  {
    title: "KTMB Mobile App Case Study",
    category: "Product / UX",
    blurb: "Rethinking the KTMB train booking experience, end to end.",
    image: "/work/ktmb.svg",
  },
  {
    title: "Full-Stack Fashion E-Commerce",
    category: "Product / UX",
    blurb: "Designed and built a fashion store — from Figma to database.",
    image: "/work/ecommerce.svg",
  },
  {
    title: "Breathing Bag",
    category: "Creative Tech",
    blurb: "A wearable object that breathes with you.",
    image: "/work/breathing-bag.svg",
  },
  {
    title: "Glow of Orchard",
    category: "Creative Tech",
    blurb: "A light-based installation inspired by Orchard Road.",
    image: "/work/glow-of-orchard.svg",
  },
];
