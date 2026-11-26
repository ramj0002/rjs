// ✏️ Edit this file to add / change projects.
// Each project shows a drawn "plate" (see components/plates.ts). To show a real
// image instead, put it in /public/work/ and set `image: "/work/your-file.jpg"`;
// it gets the halftone treatment automatically.

export type Category = "Product / UX" | "AI / Data" | "Creative Tech" | "Spatial / 3D" | "Visual / Artwork";

export const categories: Category[] = [
  "Product / UX",
  "AI / Data",
  "Creative Tech",
  "Spatial / 3D",
  "Visual / Artwork",
];

export type Project = {
  id: string;            // also picks the drawing in components/plates.ts
  title: string;
  category: Category;
  summary: string;
  facts: [string, string][]; // [big number, what it means]
  tools: string[];
  link: string;
  linkLabel: string;
  image?: string;
};

const OLD = "https://rjsportfolio.framer.website/";

export const projects: Project[] = [
  {
    id: "ktmb",
    title: "Redesigning the KTMB Mobile App",
    category: "Product / UX",
    summary:
      "Malaysia’s rail app was rated 1.6 stars. I mapped how it works today and redesigned it around what riders actually need.",
    facts: [["1.6 ★", "starting rating"], ["2", "app structures mapped"]],
    tools: ["UX research", "Information architecture", "UI design"],
    link: OLD + "ktmb-mobile-app-case-study",
    linkLabel: "Read the case study",
  },
  {
    id: "orchard",
    title: "Glow of Orchard: thermal retail analytics",
    category: "Creative Tech",
    summary:
      "A thermal sensor hidden in a shop light tracks how shoppers move, turning heat into live heat maps. No cameras, so no faces.",
    facts: [["64", "temperatures per reading"], ["4th", "prototype that worked"], ["Patent", "contributor"]],
    tools: ["AMG8833", "ESPUINO-32", "Java interpolation", "SolidWorks", "DIALux", "AWS study"],
    link: OLD + "glow-of-orchard",
    linkLabel: "See the build",
  },
  {
    id: "bag",
    title: "Breathing Bag",
    category: "Creative Tech",
    summary:
      "A leather bag that seems alive: ten hidden motors move its fringes, controlled from a web dashboard.",
    facts: [["10", "MG90S servos"], ["4", "control modes"]],
    tools: ["Arduino", "XAMPP", "Web dashboard", "Cirkit Designer"],
    link: OLD + "breathing-bag",
    linkLabel: "See it move",
  },
  {
    id: "fewshot",
    title: "Few-shot medical image classification",
    category: "AI / Data",
    summary:
      "Teaching a model to spot diseases from only one to five examples. What mattered most was how different the classes look, not which model I used.",
    facts: [["88%", "OrganAMNIST, 1-shot"], ["52%", "DermaMNIST, 1-shot"], ["600", "episodes × 3 seeds"]],
    tools: ["ProtoNet", "FGSM", "MedMNIST", "miniImageNet"],
    link: OLD + "few-shot-medical-image-classification",
    linkLabel: "Read the findings",
  },
  {
    id: "sarcasm",
    title: "Sarcasm detection",
    category: "AI / Data",
    summary:
      "A tool that spots sarcasm in Reddit comments, built on BERT, with a dashboard and a chatbot to try it live.",
    facts: [["75.56%", "accuracy, MLP + BERT"], ["4,249", "labelled comments"]],
    tools: ["Python", "Reddit API", "BERT", "MLP", "SVM", "Streamlit"],
    link: OLD + "sarcasm-detection",
    linkLabel: "See the app",
  },
  {
    id: "xyr",
    title: "XYR Fashion Store",
    category: "Product / UX",
    summary:
      "A full online fashion store: shopping and checkout for customers, plus an admin dashboard with live stock and order emails.",
    facts: [["Full stack", "front end to database"], ["Live", "stock tracking"]],
    tools: ["Database design", "Admin dashboard", "Wireframes", "Email automation"],
    link: OLD + "full-stack-fashion-e-commerce-platform",
    linkLabel: "Tour the store",
  },
  {
    id: "renders",
    title: "3D rendered visualisations",
    category: "Spatial / 3D",
    summary:
      "Bloom & Rise, a flower-shaped alarm clock for kids, plus a breakdown of how an alarm clock is built.",
    facts: [["3", "product studies"]],
    tools: ["3D modelling", "Rendering", "Product analysis"],
    link: OLD + "3d-rendered-visualisations",
    linkLabel: "View the renders",
  },
  {
    id: "tech",
    title: "Technical drawings",
    category: "Spatial / 3D",
    summary:
      "Precise, dimensioned CAD drawings that someone else can build from.",
    facts: [["CAD", "fabrication sets"]],
    tools: ["CAD", "Orthographic projection"],
    link: OLD + "technical-drawings",
    linkLabel: "View the drawings",
  },
  {
    id: "zine",
    title: "ਦ੍ਰਿਸ਼ਟੀਕੋਣ, a fashion zine",
    category: "Visual / Artwork",
    summary:
      "A hand-made fashion zine about identity, in Punjabi and English, printed in just red and white.",
    facts: [["2", "scripts, one voice"], ["1", "colour"]],
    tools: ["Illustration", "Photography", "Editorial layout"],
    link: "/work/fashion-zine/",
    linkLabel: "Flip through",
  },
  {
    id: "drawings",
    title: "Digital illustration",
    category: "Visual / Artwork",
    summary:
      "A collection of digital drawings, from quick studies to finished pieces.",
    facts: [["6", "pieces"]],
    tools: ["Digital drawing"],
    link: OLD + "drawings",
    linkLabel: "See the drawings",
  },
];
