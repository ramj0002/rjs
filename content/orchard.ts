// ✏️ Glow of Orchard case study content (from the original project page).
// Images: put files in /public/orchard/ with the names below. Until a file exists,
// the page shows a labelled placeholder in its place.

export const orchard = {
  title: "Glow of Orchard",
  tagline: "Smart retail analytics using thermal sensing",
  subtitle: "A low-cost, privacy-preserving system for real-time customer behaviour analysis.",
  tags: ["IoT", "Thermal sensing", "Hardware integration", "Lighting engineering", "Patent"],

  stats: [
    ["300", "lights installed"],
  ] as [string, string][],

  context: "Modern retail relies heavily on customer behaviour data to optimise layout, product placement and operations.",
  problems: {
    cameras: ["Camera-based systems are expensive", "They raise privacy concerns", "They need heavy computation (video processing)"],
    sensors: ["Traditional sensors lack spatial resolution", "They can’t capture meaningful movement patterns"],
  },
  hmw: "How might we track customer movement and engagement in a retail space without using cameras, while keeping it low cost and scalable?",
  solution: {
    intro: "A distributed IoT sensing system built into the store’s lighting, which:",
    points: [
      "Captures thermal data instead of images",
      "Tracks customer movement through heat signatures",
      "Generates heat maps of foot traffic",
      "Sends structured data to a central server for analysis",
    ],
  },

  flow: [
    { title: "LED downlight", text: "AMG8833 sensor built into the light housing" },
    { title: "Thermal capture", text: "An 8×8 grid of 64 temperatures, every second, picks up body heat" },
    { title: "Wi-Fi transmission", text: "The ESPDUINO-32 sends the readings to the server" },
    { title: "Heat map", text: "The server builds live floor-plan heat maps: dwell time, traffic flow, density" },
  ],

  hardware: [
    { title: "Thermal sensor", sub: "AMG8833", points: ["8×8 infrared grid", "64 temperature readings each frame"] },
    { title: "Microcontroller", sub: "ESPDUINO-32", points: ["Handles data acquisition", "Pre-processes the sensor output"] },
    { title: "Network module", sub: "Wi-Fi", points: ["Sends data to the server"] },
  ],
  hardwareImages: [
    { src: "/orchard/downlight-1.png", caption: "The downlight with the sensor fitted inside" },
    { src: "/orchard/downlight-2.png", caption: "Sensor mount on the light housing" },
  ],

  built: [
    ["Heat map algorithm", "Implemented bilinear interpolation in Java to upscale the 8×8 sensor grid into a smooth, colour-coded heat map."],
    ["Lighting engineering", "Trained in DIALux lux calculations, LED driver selection, BCA Green Mark compliance, lighting proposals and real-world installation management."],
    ["Hardware integration", "Designed the sensor housing in SolidWorks, 3D printed the casing and fitted the AMG8833 into the fixtures: wiring, drilling, soldering and assembly for a client."],
    ["Patent contribution", "Contributed to the invention: the first LED downlight with built-in thermal sensing that can generate retail floor heat maps without cameras."],
    ["Installation lead", "Led the whole installation: client communication, site paperwork, and coordinating the production team from drilling to final commissioning."],
    ["Cloud & IoT", "Studied AWS architecture for storing and analysing thermal data at scale, and the IaaS, PaaS and SaaS options for deploying the heat map dashboard to retail operators."],
  ] as [string, string][],

  prototypes: [
    { board: "Arduino Uno + AMG8833", result: "Sensor readings confirmed", ok: true },
    { board: "Arduino Uno + ESP8266 + logic converter", result: "Too complex, failed", ok: false },
    { board: "Arduino Pro Mini + ESP8266 + FTDI", result: "Impractical for mass production", ok: false },
    { board: "Arduino Nano + ESP8266", result: "Wi-Fi still unstable", ok: false },
    { board: "ESPDUINO-32", result: "Stable, compact, the final board", ok: true, final: true },
  ],

  production: [
    "The light housing was precision-drilled to fit the internal wiring while keeping its industrial look.",
    "A custom 3D-printed mount holds the thermal sensor, keeping its angle and position steady.",
    "Sensor placement was calibrated to get the best field of view with the least noise in the readings.",
  ],
  installImages: [
    { src: "/orchard/install-1.jpg", caption: "Installed in store" },
    { src: "/orchard/install-2.jpg", caption: "Installed in store" },
  ],

  patent: {
    number: "US Patent No. 11,246,205 B1",
    text: "An LED downlight with an integrated thermal sensor that generates retail floor heat maps without cameras. I contributed to the invention as part of the team that designed, built and installed it.",
    link: "https://drive.google.com/file/d/1idWuWyBegQ02unD5YGzCgEx_Q4OMuGvQ/view",
  },
};
