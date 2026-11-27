// ✏️ Few-shot medical image classification — final year project (NTU EEE, A3206-251),
// supervised by A/P Wang Lipo. Numbers are the report's headline figures (mean of seeds 0, 1, 2; 600 test episodes).

export const fewshot = {
  title: "Few-shot medical image classification",
  tagline: "Can a model learn to recognise a disease from just one to five examples?",
  tags: ["Python", "PyTorch", "ProtoNet", "ResNet-12", "FGSM", "MedMNIST", "UMAP"],

  problem: [
    "Medical AI usually needs thousands of labelled scans. In practice they’re ==hard to get==: privacy rules limit sharing, experts are expensive to label with, and rare diseases only have a handful of cases.",
    "Few-shot learning tries to ==learn a class from a few examples==. I tested how well that works on real medical images, and whether adding adversarial noise in training helps.",
  ],
  stats: [
    ["88%", "organ scans, 1 example"],
    ["52%", "skin lesions, 1 example"],
    ["600", "test episodes × 3 seeds"],
  ] as [string, string][],
  meta: "Final year project, NTU · supervised by A/P Wang Lipo",

  how: "A Prototypical Network turns every image into a point. For each class it averages the few examples it’s given into one point, the prototype. A new image gets the class of the nearest prototype. Try it:",

  steps: [
    { title: "Reproduce", text: "ProtoNet on miniImageNet, everyday photos, to check it works" },
    { title: "Transfer", text: "The same model on skin lesions and abdominal CT scans" },
    { title: "Perturb", text: "Add FGSM noise in training at three strengths" },
    { title: "Measure", text: "600 test episodes, 3 random seeds, 1-shot and 5-shot" },
  ],

  results: [
    { name: "Organ CT scans", sub: "OrganAMNIST", one: 88.41, five: 94.81 },
    { name: "Everyday photos", sub: "miniImageNet", one: 56.26, five: 75.88 },
    { name: "Skin lesions", sub: "DermaMNIST", one: 52.05, five: 66.24 },
  ],
  resultsText: "Five-way tasks: pick the right class out of five. Guessing gets 20%.",

  umaps: [
    { src: "/few-shot/umap-derma.png", caption: "Skin lesions: classes mixed in one cloud" },
    { src: "/few-shot/umap-organ.png", caption: "Organs: classes in their own clusters" },
  ],
  umapText: "Each dot is one test image, placed by what the model sees. Where classes overlap, one example can’t make a good prototype.",

  fgsm: {
    text: "Adversarial noise is often used to make models tougher. Here it ==made things worse== wherever classes already overlap, and barely moved the organs.",
    rows: [
      { name: "Skin lesions", vals: [52.05, 48.98, 47.59, 45.38] },
      { name: "Everyday photos", vals: [56.26, 54.35, 51.15, 52.49] },
      { name: "Organ CT scans", vals: [88.41, 89.13, 89.62, 89.06] },
    ],
    heads: ["no noise", "ε 0.01", "ε 0.03", "ε 0.05"],
  },

  shift: [
    { name: "Skin lesions", cross: 25.66, inDomain: 53.71 },
    { name: "Organ CT scans", cross: 37.08, inDomain: 89.5 },
  ],
  shiftText: "A model trained only on everyday photos, tested straight on medical images, nearly falls to guessing.",

  derma: ["actinic keratosis", "basal cell carcinoma", "benign keratosis", "dermatofibroma", "melanoma", "mole (nevus)", "vascular lesion"],
  organ: ["bladder", "left femur", "right femur", "heart", "left kidney", "right kidney", "liver", "left lung", "right lung", "pancreas", "spleen"],
  failures: {
    derma: [[6, 5], [6, 5], [6, 1], [3, 5], [3, 1]] as [number, number][],
    organ: [[5, 0], [9, 5], [0, 5], [3, 5], [3, 5]] as [number, number][],
  },

  finding: "How well the model ==separates the classes== decides the result, more than the algorithm, the distance measure or the augmentation.",
  next: [
    ["Pre-train on medical images", "Self-supervised pre-training (like SimCLR or DINO) on medical scans, so the features fit the domain."],
    ["Gentler augmentation", "Methods like Mixup that don’t distort the details doctors look for."],
    ["Bigger images", "MedMNIST is only 28 × 28 pixels. Testing at full resolution would show how much detail is being lost."],
  ] as [string, string][],
};
