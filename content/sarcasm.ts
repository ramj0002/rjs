// ✏️ Sarcasm detection (ORP) case study, from the IEM Design & Innovation Project report
// and the original project page. Images live in /public/sarcasm/.

export const sarcasm = {
  title: "Opposite Role-Playing detection",
  tagline: "A web app that spots sarcasm and sentiment in Reddit comments, using BERT embeddings and a neural network.",
  tags: ["Python", "Reddit API", "BERT", "MLP", "SVM", "Streamlit", "MySQL"],

  problem: [
    "When thousands of Reddit comments flood in on a controversial topic, existing AI can’t tell if someone is being sarcastic or sincere. People monitoring public opinion get a ==distorted picture==.",
    "We called it ORP, ==Opposite Role-Playing==: when people say the opposite of what they mean. We built a system to catch it.",
  ],
  stats: [
    ["4,249", "labelled comments"],
    ["73.56%", "chatbot accuracy"],
    ["3", "Reddit topics"],
  ] as [string, string][],

  role: "Group project of eight. My part: turning comments into BERT embeddings, building and tuning the MLP model, and training both the MLP and SVM.",

  // Real comments from our labelled Reddit data, with the label our team gave them.
  quiz: [
    { text: "Y’all would really rather do this than fork out $1 to take 179? LOL this one is on you.", topic: "NTU", sarcastic: true },
    { text: "serious qs, why ppl prefer take ntu shuttle bus compared to 179? i think 179 q fast as well", topic: "NTU", sarcastic: false },
    { text: "My how the turns have tabled", topic: "TikTok cringe", sarcastic: true },
    { text: "I’d like to point out that even when it was his turn to speak, she was speaking almost as much as he was.", topic: "TikTok cringe", sarcastic: false },
    { text: "Just because I have people in my family that are tall, it doesn’t mean I’m not short. Just sayin’", topic: "US election", sarcastic: true },
    { text: "A lot of geniuses compared to what?! Lol.", topic: "US election", sarcastic: false },
  ],

  // one real comment followed through every step
  pipeline: [
    { title: "Collect", text: "A Python scraper pulls comments from Reddit threads through the API", ex: "“My how the turns have tabled”", exLabel: "r/TikTokCringe" },
    { title: "Label", text: "Every comment hand-labelled for sarcasm and for sentiment", ex: "sarcasm 1 · sentiment 0", exLabel: "sarcastic, neutral" },
    { title: "Embed", text: "BERT turns each comment into 768 numbers that hold its meaning", ex: "[0.12, −0.48, 0.91, …]", exLabel: "768 numbers" },
    { title: "Train", text: "An MLP and an SVM learn sarcastic vs sincere from those numbers", ex: "768 → 10 → 2", exLabel: "the MLP’s layers" },
    { title: "Show", text: "A web app with a dashboard, graphs and a live chatbot", ex: "sarcastic", exLabel: "the chatbot’s answer" },
  ],

  labels: [
    { name: "Sarcasm", values: [["1", "sarcastic"], ["0", "not sarcastic"]] },
    { name: "Sentiment", values: [["1", "positive"], ["0", "neutral"], ["2", "negative"]] },
  ],

  // counts from the labelled files: Book2.csv (US election), TikTokCringe.xlsx (cleaned), ntubus.csv (NTU)
  datasets: [
    { name: "US election", n: 1387, sarc: 12.3, neg: 679, neu: 541, pos: 169, src: "/sarcasm/graph-trump.jpg", caption: "US election graph" },
    { name: "TikTok cringe", n: 1631, sarc: 20.2, neg: 495, neu: 987, pos: 150, src: "/sarcasm/graph-tiktok.jpg", caption: "TikTok cringe graph" },
    { name: "NTU", n: 1206, sarc: 10.7, neg: 201, neu: 964, pos: 41, src: "/sarcasm/graph-ntu.jpg", caption: "NTU graph" },
  ],
  datasetsText: "Each comment is a dot coloured by its sentiment and sarcasm, with lines to the comments it replies to.",

  models: [
    { name: "MLP", acc: 72, note: "on 4,000 comments", best: true, points: ["768 inputs, one hidden layer of 10, sarcastic or not out", "Weighted training so both classes are learnt", "73.56% on the chatbot’s test set"] },
    { name: "SVM", acc: 49, note: "on 900 comments", best: false, points: ["RBF kernel, minority class oversampled", "Could only run small on our laptops", "Hard to tune C and gamma, so we chose the MLP"] },
  ],

  app: {
    intro: "We called the web app KayPoh, Singlish for nosy, with a curious mouse as its mascot.",
    views: [
      { src: "/sarcasm/app-main.jpg", label: "trending posts" },
      { src: "/sarcasm/app-dashboard.jpg", label: "dashboard" },
      { src: "/sarcasm/app-analysis.jpg", label: "comment analysis" },
      { src: "/sarcasm/app-graph.jpg", label: "graph" },
      { src: "/sarcasm/app-excel.jpg", label: "Excel export" },
      { src: "/sarcasm/app-chatbot.jpg", label: "chatbot" },
    ],
    features: [
      ["Analysis dashboard", "Each post’s top comments, its positive, neutral and negative split, and how much of it is sarcastic."],
      ["Live sarcasm chatbot", "Type any comment and the model says straight away if it’s sarcastic or sincere. Built with Streamlit."],
      ["Search and filter", "Browse posts by topic, search, and save posts to come back to."],
      ["Excel export", "Download the full analysis of any post, for teams tracking opinion at scale."],
    ] as [string, string][],
  },

  flows: [
    { src: "/sarcasm/flow-data.jpg", caption: "Data collection" },
    { src: "/sarcasm/flow-frontend.jpg", caption: "Front end" },
    { src: "/sarcasm/flow-backend.jpg", caption: "Back end" },
  ],

  learned: [
    ["Labelling is the hard part", "Thousands of comments labelled by hand, by several people, and sarcasm is read differently by each."],
    ["Laptops have limits", "Training ran out of memory, so we subsampled the data and tuned batch sizes."],
    ["Next", "Paste a thread link and have it scraped, labelled, predicted and shown automatically, retraining as new data comes in."],
  ] as [string, string][],
};
