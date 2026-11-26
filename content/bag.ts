// ✏️ Breathing Bag case study (words from the original project page).
// Images live in /public/breathing-bag/. Until a file exists, the page shows a labelled placeholder.

export const bag = {
  title: "Breathing Bag",
  tagline: "A leather bag that seems alive: ten hidden motors move its fringes, controlled from a web dashboard.",
  tags: ["Arduino", "MG90S servos", "XAMPP", "Web dashboard", "Cirkit Designer", "Autodesk Inventor"],

  question: "What if a bag was ==alive==?",
  intro: "Small servo motors hidden inside the fringes make them move and breathe. It sits somewhere between a fashion accessory and an interactive sculpture.",
  stats: [
    ["10", "MG90S servos"],
    ["4", "control modes"],
    ["3", "rows of fringe"],
  ] as [string, string][],

  steps: [
    { title: "Web dashboard", text: "You send a command from the browser, to one motor or a whole row" },
    { title: "Signal sent", text: "An HTTP request goes to a local server running on XAMPP" },
    { title: "Arduino", text: "It receives the command and drives the chosen servos" },
    { title: "Bag breathes", text: "The fringes move" },
  ],

  sketch: { src: "/breathing-bag/sketch.jpg", caption: "Concept sketch" },
  dashboard: { src: "/breathing-bag/dashboard.jpg", caption: "The real dashboard" },

  modes: [
    ["Heart", "All 10 motors move together, so the bag swells and settles like a heartbeat."],
    ["Speed", "One slider changes how fast every active motor moves, from calm to restless."],
    ["One motor", "Start or stop any single motor, for precise choreography."],
    ["Rows", "Fire a whole row at once for a wave across the fringe."],
  ] as [string, string][],

  circuit: {
    embed: "https://app.cirkitdesigner.com/project/a6c4b9b4-3dda-4afd-b8ca-37a78f996a12?view=interactive_preview",
    link: "https://app.cirkitdesigner.com/project/a6c4b9b4-3dda-4afd-b8ca-37a78f996a12",
    text: "One Arduino, a breadboard, a battery pack and ten servos. Wired and tested in Cirkit Designer before anything was sewn in.",
  },

  holder: {
    text: "Each servo sits in a small holder I modelled in Autodesk Inventor and 3D printed, so it stays in place inside the leather.",
    images: [
      { src: "/breathing-bag/holder-1.jpg", caption: "Servo holder, front" },
      { src: "/breathing-bag/holder-2.jpg", caption: "Servo holder, base" },
    ],
  },

  build: [
    { src: "/breathing-bag/finished.jpg", caption: "The finished bag" },
    { src: "/breathing-bag/moving.mp4", caption: "The bag breathing" },
  ],
};
