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

  quiz: [
    { text: "Oh great, another Monday. Love it.", sarcastic: true },
    { text: "The new library hours really helped me during exams.", sarcastic: false },
    { text: "Of course, nothing says genius like bragging constantly!", sarcastic: true },
    { text: "Wow, a 40 minute wait for the shuttle bus. Truly world class.", sarcastic: true },
    { text: "Honestly the food at this hall is better than I expected.", sarcastic: false },
  ],

  pipeline: [
    { title: "Collect", text: "A Python scraper pulls comments from Reddit threads through the API" },
    { title: "Label", text: "Every comment hand-labelled for sarcasm and for sentiment" },
    { title: "Embed", text: "BERT turns each comment into 768 numbers that hold its meaning" },
    { title: "Train", text: "An MLP and an SVM learn sarcastic vs sincere from those numbers" },
    { title: "Show", text: "A web app with a dashboard, graphs and a live chatbot" },
  ],

  labels: [
    { name: "Sarcasm", values: [["1", "sarcastic"], ["0", "not sarcastic"]] },
    { name: "Sentiment", values: [["1", "positive"], ["0", "neutral"], ["2", "negative"]] },
  ],

  datasets: [
    { src: "/sarcasm/graph-trump.jpg", caption: "US election: mostly negative" },
    { src: "/sarcasm/graph-tiktok.jpg", caption: "TikTok cringe: mostly neutral" },
    { src: "/sarcasm/graph-ntu.jpg", caption: "NTU: mostly neutral" },
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
