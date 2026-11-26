# Portfolio site: working rules

Next.js (static export) deployed on Vercel from `main`. Content lives in `content/*.ts`.

## Design rules (from Ram's feedback, keep applying them)
- **Always align.** Side-by-side items must line up: titles, descriptions, numbers,
  images and captions start and end at the same lines. Use equal-height rows
  (`grid-auto-rows: 1fr`, subgrid, fixed `min-height` for titles, blank placeholders
  where one item lacks a quote, `aspect-ratio` + `object-fit` for images of different shapes).
- Titles in a row of cards: same number of lines (use `\n` + `white-space: pre-line`).
- Text in sections runs full width unless it sits beside an image or stat.
- Lists are row by row (one item per row) rather than multi-column when they hold sentences.
- Numbers pop in on scroll; key phrases get the marker highlight (`==text==` + `marks()`),
  and these replay when scrolled back to.
- Project colours come from the original Framer site (`.t-*` classes in app/globals.css):
  pink = Product/UX, teal = Creative Tech, purple = AI/Data, yellow = Spatial/3D, red = Visual/Art.
  Home stays blue; cards switch to their colour on hover; project pages are fully themed.
- Keep descriptions short and plain.

## Process
- After every push, check the live site (Vercel has missed a push before; an empty commit retriggers it).
