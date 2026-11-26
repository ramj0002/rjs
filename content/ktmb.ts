// ✏️ KTMB case study content (from the Notion write-up).
// Images: put files in /public/ktmb/ with the names below. Until a file exists,
// the page shows a labelled placeholder in its place.

export const ktmb = {
  title: "Redesigning the KTMB Mobile App",
  tagline: "From a 1.6-star experience to one users actually trust",
  tags: ["UX research", "Information architecture", "UI design", "Usability testing"],

  intro: "KTMB (Keretapi Tanah Melayu Berhad) is Malaysia’s national railway. Its mobile app lets people:",
  appDoes: [
    "Search train routes and check availability",
    "Book and pay for train tickets",
    "Select seats",
    "Manage or modify bookings",
    "View schedules and travel information",
  ],

  infrastructure: [
    { src: "/ktmb/ia-1.jpg", caption: "Current app: login and registration" },
    { src: "/ktmb/ia-2.jpg", caption: "Current app: main menu" },
    { src: "/ktmb/ia-3.jpg", caption: "Current app: ticket and seat booking" },
    { src: "/ktmb/ia-4.jpg", caption: "Current app: passenger, booking details and payment" },
  ],

  problem: {
    hypothesis:
      "The current information architecture and task flow of the KTMB app may not fully match users’ mental models and booking habits, causing friction during key tasks.",
    rationale:
      "The app has consistently low ratings and recurring negative feedback across platforms, which suggests a mismatch between the app’s structure and how people expect it to work.",
    image: { src: "/ktmb/reviews.jpg", caption: "Ratings: 1.6 on the App Store, 3.2 on Google Play" },
  },

  research: {
    objective: "Understand the end-to-end booking journey of young adult commuters on the KTMB app.",
    methods: [
      { n: "Online", label: "research", text: "App store reviews and academic sources, to find recurring pain points." },
      { n: "100", label: "survey responses", text: "A screener survey to qualify participants and spot broad usability patterns." },
      { n: "6", label: "interviews", text: "Ages 18–34, Singaporean and Malaysian, for deeper insight." },
      { n: "4", label: "usability tests", text: "First-time users completing a full booking on the live app." },
    ],
    audience: "Most KTMB travellers are 26–35 years old (52%).",
    stats: [
      ["60%", "had problems booking a ticket"],
      ["74%", "had to stop mid-flow to work out the next step"],
      ["90%", "did not feel confident completing the booking"],
    ] as [string, string][],
  },

  findings: [
    {
      title: "Not beginner-friendly",
      quote: "Like we need a PhD in Malaysian trains just to use this app.",
      text: "The home screen showed ETS, KTM Komuter and Shuttle Tebrau with no explanation of the difference. Station tags (ETS / Intercity) weren’t explained either, so users hesitated before every choice.",
    },
    {
      title: "Linear-only navigation",
      quote: "It goes all the way back to the beginning if you need to change anything.",
      text: "Going back to change a departure time triggered a “Cancel Booking” warning that wiped all progress. One mistake meant starting over.",
    },
    {
      title: "Selections disappear",
      quote: "Why does it not tell me what I picked? There was a time I purchased the wrong ticket assuming I’d picked correctly.",
      text: "Your chosen train vanished after seat selection, so users had to remember their choices across 9 steps.",
    },
    {
      title: "Unclear train classes",
      quote: "",
      text: "ETS Platinum and ETS Gold looked identical and the difference was never explained. All four test users either asked what it meant or picked at random.",
    },
    {
      title: "Cryptic errors",
      quote: "",
      text: "Failed logins only said “Server didn’t give proper response.” Users didn’t know whether to retry, check their details or call support.",
    },
  ],

  needs: [
    ["Understand options quickly", "Train classes, services and seat types should be clear at a glance."],
    ["See selections clearly", "The chosen train, seat and price should stay visible at every step."],
    ["Edit without restarting", "Changing a detail shouldn’t erase the booking."],
    ["Trust the system", "Errors need plain language and a way to recover."],
    ["Get clear feedback", "Always confirm what just happened and what comes next."],
  ] as [string, string][],

  ideation: {
    images: [
      { src: "/ktmb/process.jpg", caption: "Our process: brainstorm, affinity mapping, impact vs. effort", wide: true },
      { src: "/ktmb/brainstorm.jpg", caption: "Brainstormed ideas" },
      { src: "/ktmb/affinity.jpg", caption: "Affinity map: clarity, control, errors, visibility, feedback, guidance" },
      { src: "/ktmb/matrix.gif", caption: "Impact vs. effort matrix" },
      { src: "/ktmb/sketches.jpg", caption: "Sketches" },
    ],
    buildList: [
      "Progress indicator: Search → Select → Seat → Details → Payment",
      "Booking summary visible at every step",
      "Visual train timeline: departure, duration, arrival",
      "Train comparison cards with clear labels (‘Fastest’, ‘Best Value’)",
      "Clear error messages with recovery steps",
      "Simpler home screen with popular routes and quick actions",
    ],
  },

  flow: ["Search", "Select", "Seat", "Details", "Payment"],
  decisions: [
    {
      title: "Booking summary on every screen",
      text: "The original app only showed your choices at step 8 of 9. Now a compact card (train, times, duration, price, seat) follows you from Select onwards, which fixes the “wrong ticket” problem.",
    },
    {
      title: "Going back doesn’t cancel",
      text: "The progress bar doubles as navigation. Tap an earlier step to go back and your data stays. The “Cancel Booking” interruption is gone.",
    },
    {
      title: "Train comparison cards",
      text: "Platinum and Gold get distinct colours, a ‘Most Popular’ or ‘Best Value’ badge and a one-tap “What’s the difference?”: Platinum has fewer stops, faster arrival and a meal; Gold is cheaper with more stops.",
    },
    {
      title: "Errors you can recover from",
      text: "Every error now explains what went wrong in plain English, lists what you can do, shows a reference code for support, and offers Retry or Back to Home.",
    },
  ],

  round1: {
    image: { src: "/ktmb/round-1.jpg", caption: "Round 1 prototype: the 5-step flow" },
    stats: [
      ["~3:00", "average task time"],
      ["1–2", "errors per participant"],
      ["2/5", "average satisfaction"],
    ] as [string, string][],
    pains: [
      {
        title: "No orientation on the seat map",
        quote: "When I reach the seat selection part, I a bit blur. I cannot really tell where the toilet or luggage area is.",
        who: "P1, 23",
        text: "Users couldn’t tell the front of the train from the back, or find toilets and luggage space.",
      },
      {
        title: "Two cabin menus",
        quote: "Since got the one at the side already, the top one just makes the screen look more messy.",
        who: "P2, 20",
        text: "A top tab bar and a sidebar did the same job, adding clutter.",
      },
      {
        title: "Unclear next steps",
        quote: "I still need to think a bit where to go next.",
        who: "P3, 25",
        text: "Even regular KTMB users kept pausing to re-orient themselves.",
      },
      {
        title: "Cluttered first impression",
        quote: "Feels a bit cluttered. Some information doesn’t stand out clearly.",
        who: "P6, 34",
        text: "Price, class and departure time didn’t stand out from everything else.",
      },
    ],
    fixes: [
      "Added a FRONT/BACK bar and toilet and luggage icons to the seat map",
      "Added a cabin position sidebar",
      "Removed the duplicate top cabin menu",
      "Made key information stand out on booking screens",
    ],
  },

  round2: {
    images: [
      { src: "/ktmb/round-2-gold.jpg", caption: "Round 2: Gold flow" },
      { src: "/ktmb/round-2-silver.jpg", caption: "Round 2: Silver flow" },
    ],
    quotes: [
      { who: "P1, 23", quote: "Now it’s much clearer. I can easily see where things are, especially the facilities.", note: "Moved through seat selection without pausing." },
      { who: "P2, 20", quote: "Removing the top navigation really helps — feels less messy and easier to use.", note: "Noticed the cleaner navigation straight away." },
      { who: "P4, 30", quote: "Compared to the old KTMB app, this one much better. I don’t need to keep guessing what to press next.", note: "Far fewer pauses mid-flow." },
      { who: "P5, 22", quote: "Wah this one really easy to use sia. Booking feels very smooth.", note: "Fastest run: 1:30, with no second-guessing." },
      { who: "P6, 34", quote: "Feels clean, modern, and not cluttered. First impression is quite good.", note: "Went from “cluttered” to “clean and modern”." },
    ],
  },

  final: {
    stats: [
      ["1:39", "average task time"],
      ["6/6", "completed both tasks"],
      ["0", "confused by the seat screen"],
    ] as [string, string][],
    changed:
      "Between rounds the seat map gained orientation and facility icons, the duplicate cabin menu went, visual hierarchy tightened, train classes got colour-coding and seat types got explanations. Every Round 1 pain point was confirmed fixed.",
    screens: [
      { src: "/ktmb/final-gold.jpg", caption: "Final: Gold flow", wide: true },
      { src: "/ktmb/final-silver.jpg", caption: "Final: Silver flow", wide: true },
      { src: "/ktmb/final-seat-info.jpg", caption: "Seat info prompt: seat types and wheelchair access explained", wide: true },
      { src: "/ktmb/final-train-compare.jpg", caption: "Train comparison prompt: the difference between ETS Gold and Platinum" },
      { src: "/ktmb/final-tickets.jpg", caption: "Simplified ticket access: view, search and open tickets in one place" },
    ],
  },

  lessons: [
    {
      title: "Friction is cumulative",
      text: "The old app wasn’t broken in one big place; it was slightly broken in many small ones. Now I look for micro-frictions, not just big failures.",
    },
    {
      title: "Let research prove you wrong",
      text: "We thought the booking screens were the main problem. Login issues, especially on iOS, turned out to cause a lot of drop-off too.",
    },
    {
      title: "Removing is designing",
      text: "The best fix in Round 1 was deleting the duplicate cabin menu. Every element competes for attention, so cutting one is a real design decision.",
    },
  ],
  next: [
    "Personalised recommendations",
    "Clearer train comparison",
    "Real-time booking help",
    "Advanced filters",
    "A refined design system and stronger branding",
    "Faster performance and live updates",
  ],
};
