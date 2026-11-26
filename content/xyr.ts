// ✏️ XYR Fashion Store case study (from the IE4727 report and the original project page).
// Images live in /public/xyr/. Until a file exists, the page shows a labelled placeholder.

export const xyr = {
  title: "XYR Fashion Store",
  tagline: "A full-stack, database-driven shop: the customer journey from catalogue to checkout, a secure admin dashboard, real-time stock tracking and automatic order emails.",
  tags: ["PHP", "MySQL", "JavaScript", "React + Vite", "Tailwind CSS", "PHPMailer", "Stripe"],

  stats: [
    ["4", "product categories"],
    ["26/26", "tests passed"],
    ["2", "versions: PHP, then React"],
  ] as [string, string][],
  intro: "An online store for a fashion label, XYR. Shoppers browse, pick a size and check out; the admin manages prices, stock and sales reports from one dashboard.",

  journey: [
    { title: "Browse", text: "Four categories, sorted by price instantly in the browser" },
    { title: "Pick a size", text: "Each size shows live stock; sold-out items can’t be added" },
    { title: "Bag", text: "Add, remove and see the count update in the header" },
    { title: "Checkout", text: "All-or-nothing: if one item is gone, nothing is charged" },
    { title: "Email", text: "An HTML order confirmation lands in the inbox" },
  ],

  design: [
    { src: "/xyr/site-map.png", caption: "Site map" },
    { src: "/xyr/wireframe.png", caption: "Wireframe" },
  ],

  customer: [
    { src: "/xyr/home.png", caption: "Home page" },
    { src: "/xyr/catalogue.png", caption: "Product catalogue" },
    { src: "/xyr/product.png", caption: "Product detail" },
  ],
  video: "/xyr/walk-the-future.mp4",

  checkout: {
    intro: "Checkout runs as one database transaction. Each item’s stock row is locked while it’s checked, so two people can’t buy the last one at the same time. If any item is short, everything is undone.",
  },
  email: [
    { src: "/xyr/thank-you.png", caption: "Thank-you page after checkout" },
    { src: "/xyr/email.png", caption: "The confirmation email, sent with PHPMailer" },
  ],

  admin: [
    { title: "Update price", text: "Pick a product, set a new price." },
    { title: "Manage stock", text: "Update a size’s stock or add a new size, in one query." },
    { title: "Add product", text: "Name, price, category, first size, stock, description and photo (React version)." },
    { title: "Sales report", text: "Units sold and revenue for every product, highest revenue first." },
  ],
  adminImages: [
    { src: "/xyr/admin-stock.png", caption: "Manage stock" },
    { src: "/xyr/admin-add-product.png", caption: "Add product" },
  ],

  tables: [
    { name: "products", cols: ["id", "name", "price", "image", "description", "category"], note: "One row per item. Category is limited to the four shop sections." },
    { name: "product_variants", cols: ["id", "product_id →", "size", "stock"], note: "One row per size. A product can only have each size once, which lets one query add or update stock." },
    { name: "sales", cols: ["id", "product_id →", "quantity_sold", "sale_price", "size", "sale_date"], note: "Every item sold. The price is saved at the time of sale, so reports stay accurate if prices change." },
    { name: "users", cols: ["id", "username", "email", "password", "role"], note: "Role is ‘customer’ or ‘admin’, checked by every admin page and API." },
  ],

  security: [
    ["Role-based access", "Every admin page and API checks the user’s role, so customers can’t reach admin tools even with the URL."],
    ["No SQL injection", "Every query with user input uses prepared statements."],
    ["Safe checkout", "A transaction with row locking stops overselling and half-finished orders."],
    ["Clean logout", "Logging out destroys the session."],
  ] as [string, string][],

  versions: [
    { title: "Base version", sub: "PHP · MySQL · JavaScript", points: ["Server-rendered shop pages for a fast first load", "Admin dashboard as a single page, talking to small JSON APIs", "One file per API action, easy to debug"] },
    { title: "Rebuilt", sub: "React + Vite · Tailwind CSS", points: ["Reusable components instead of PHP includes", "Feels like an app: no full page reloads", "Utility classes for consistent, responsive styling"] },
  ],

  tests: [
    ["8", "accounts & access", "Register, log in, wrong password, admin-only pages, log out"],
    ["3", "browsing", "Categories, sorting by price, product details"],
    ["4", "bag", "Add, stock check, view, remove"],
    ["5", "checkout & email", "Order goes through, stock drops, sale recorded, bag cleared, email arrives"],
    ["6", "admin", "Prices, stock, new sizes, new products, sales report"],
  ] as [string, string, string][],

  next: "Next steps: hashed passwords, order history, carts saved to the account, reviews and wishlists.",

  payments: {
    intro: "The original checkout recorded the sale without taking any money. Afterwards I added real payments with Stripe, built around what goes wrong.",
    repo: "https://github.com/ramj0002/xyr-payments-reliability",
    stats: [
      ["12", "failure scenarios handled"],
      ["29", "automated tests"],
      ["2", "PHP versions in CI"],
    ] as [string, string][],
    rows: [
      ["Same payment sent twice", "Applied once. Each Stripe event is recorded with its effects, so a repeat does nothing."],
      ["Fake or replayed request", "Rejected. Every webhook is signed and must be less than 5 minutes old."],
      ["Wrong amount or sold out", "Set aside for review. No stock change, no sale."],
      ["Webhook never arrives", "A scheduled job checks Stripe and repairs the missed payment."],
      ["Network timeout", "Retried with the same key, so no duplicate charge."],
    ] as [string, string][],
  },
};
