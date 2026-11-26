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
  wide?: boolean;        // featured: spans the full row
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
    wide: true,
    summary:
      "Malaysia’s national rail app had a 1.6-star rating. I mapped the existing app’s information architecture, then rebuilt the structure and the key screens around what riders actually need to do, so the app earns back their trust.",
    facts: [["1.6 ★", "starting rating"], ["2", "architectures mapped: current and redesign"]],
    tools: ["UX research", "Information architecture", "UI design"],
    link: OLD + "ktmb-mobile-app-case-study",
    linkLabel: "Read the case study",
  },
  {
    id: "orchard",
    title: "Glow of Orchard: thermal retail analytics",
    category: "Creative Tech",
    wide: true,
    summary:
      "A camera-free way to see how shoppers move. An AMG8833 thermal sensor sits inside an LED downlight, an ESP32-class board sends the readings over Wi-Fi, and the server turns them into live heat maps of dwell time, traffic and density. Privacy is kept because there are no images, only heat.",
    facts: [["64", "temperatures per reading"], ["4th", "prototype board that worked"], ["Patent", "contributor"]],
    tools: ["AMG8833", "ESPUINO-32", "Java interpolation", "SolidWorks", "DIALux", "AWS study"],
    link: OLD + "glow-of-orchard",
    linkLabel: "See the build",
  },
  {
    id: "bag",
    title: "Breathing Bag",
    category: "Creative Tech",
    summary:
      "What if a bag was alive? Ten servo motors hidden inside a real leather bag move its fringes, driven from a browser dashboard through a local server and an Arduino.",
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
      "Can a model learn a disease from one to five examples? I reproduced Prototypical Networks on miniImageNet, moved them to MedMNIST, and tested FGSM perturbations in training. They hurt. What decides accuracy is how well the classes separate, not which model you pick.",
    facts: [["88%", "OrganAMNIST, 1-shot"], ["52%", "DermaMNIST, 1-shot"], ["600", "episodes × 3 seeds"]],
    tools: ["ProtoNet", "FGSM", "MedMNIST", "miniImageNet"],
    link: OLD + "few-shot-medical-image-classification",
    linkLabel: "Read the findings",
  },
  {
    id: "sarcasm",
    title: "Sarcasm detection (ORP)",
    category: "AI / Data",
    summary:
      "People often say the opposite of what they mean, and opinion tracking gets it wrong. I scraped Reddit, hand-labelled comments for sarcasm and sentiment, and trained classifiers on BERT embeddings inside a Streamlit app with a dashboard, a live chatbot and Excel export.",
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
      "A full-stack, database-driven shop: the customer journey from catalogue to checkout, a secure admin dashboard, real-time stock tracking and automatic order emails. Planned from site map and wireframes up.",
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
      "Bloom & Rise is a kids’ alarm clock that makes waking up worth it: petal form, rainbow colours and a collectible surprise. Alongside it, a syntactic analysis that takes an alarm clock apart to its frame, PCB and casing.",
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
      "Dimensioned CAD drawings made for fabrication and assembly: the plain, exact drawings that let someone else build the thing.",
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
      "A bilingual, hand-made zine about identity and perspective, set in Punjabi and English. Strictly red on white with halftone, so every image and letter has to pull its own weight.",
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
      "A body of drawings exploring composition and digital technique, from figure studies to finished pieces.",
    facts: [["6", "pieces"]],
    tools: ["Digital drawing"],
    link: OLD + "drawings",
    linkLabel: "See the drawings",
  },
];
