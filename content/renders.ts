// ✏️ 3D rendered visualisations (words from the original project page and the analysis board).
// Images live in /public/renders/. Until a file exists, the page shows a labelled placeholder.

export const renders = {
  title: "3D rendered visualisations",
  tagline: "Realistic renders that show form, light and material, plus a teardown of how an alarm clock is built and a playful clock for kids.",
  tags: ["Autodesk Inventor", "KeyShot", "Product analysis", "Materials"],

  ikea: {
    intro: "I rebuilt IKEA’s TJINGA alarm clock in 3D, part by part, to understand how a simple everyday product is designed and put together.",
    image: { src: "/renders/ikea.jpg", caption: "IKEA TJINGA alarm clock, the starting point" },
  },

  views: [
    { src: "/renders/front.jpg", label: "front" },
    { src: "/renders/side.jpg", label: "side" },
    { src: "/renders/back.jpg", label: "back" },
    { src: "/renders/inside.jpg", label: "inside" },
    { src: "/renders/angle.jpg", label: "top" },
    { src: "/renders/battery.jpg", label: "battery lid off" },
  ],
  exploded: { src: "/renders/exploded.jpg", caption: "Exploded view" },
  evolution: {
    src: "/renders/sizes.jpg",
    text: "An assignment: evolve the IKEA clock into something new by changing just one part in each iteration.",
  },

  analysis: {
    intro: "A syntactic analysis breaks the clock into its parts to see how materials, assembly and structure decide how well it works, lasts and gets made.",
    board: { src: "/renders/analysis.jpg", caption: "Syntactic analysis board" },
  },
  parts: [
    {
      name: "Main body", material: "Polypropylene",
      points: [
        "Injection-moulded, for low cost and consistent parts",
        "Small internal ribs stop it warping after moulding",
        "Wide base and rounded edges add strength and stop it tipping",
        "Screws are hidden under the battery lid, and there are few of them",
        "Recessed ridges protect the knobs when clocks are packed or stacked",
      ],
    },
    {
      name: "Internal frame", material: "Polypropylene",
      points: [
        "Bosses and ribs hold the circuit board firmly in place",
        "An uneven screw layout means it can only go in the right way",
      ],
    },
    {
      name: "PCB", material: "Circuit board",
      points: ["Extra screw holes make it more precise and easier to assemble"],
    },
    {
      name: "Button", material: "ABS plastic",
      points: [
        "A wide rim stops it slipping out through the hole",
        "A long stem makes steady contact with the circuit board",
        "Snooze is on the face, not the top, so there’s less drilling",
      ],
    },
    {
      name: "Hands", material: "ABS plastic",
      points: [
        "Light and stiff, so the motor works less",
        "Glow-in-the-dark coating for reading at night",
        "Balanced for steady, accurate movement",
      ],
    },
    {
      name: "Glass", material: "Polystyrene",
      points: [
        "Snaps into place, no glue or screws",
        "Its rim sits flush with the body, leaving no gaps",
        "Keeps dust off the hands",
        "Lighter and tougher than real glass",
      ],
    },
  ],

  bloom: {
    question: "what if an alarm clock made kids actually want to wake up?",
    text: "The petal shape, the rainbow of colours and the collectible surprise all came from thinking about what brings joy to a child’s morning.",
    posters: [
      { src: "/renders/bloom-1.jpg", caption: "Bloom & Rise" },
      { src: "/renders/bloom-2.jpg", caption: "Pick a box, meet your flower friend" },
    ],
    steps: ["Pick a box", "Unbox your surprise", "Meet your flower friend", "Wake up happy every morning"],
  },
};
