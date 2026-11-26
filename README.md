# rjportfolio

Portfolio site, built with Next.js, ready for Vercel.

## Edit your content

- `content/site.ts` holds your name, bio, email and resume link.
- `content/projects.ts` holds your projects: title, category, blurb, image and an optional link.
- Images go in `public/work/`. Your photo goes in `public/me.jpg`; then set `photo: "/me.jpg"` in `site.ts`.
  Every image is redrawn as halftone dots automatically.

## Run it on your computer

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Put it online (free)

1. Create a GitHub repo and push this folder to it.
2. On vercel.com, sign in with GitHub, choose **Add New → Project**, pick the repo and click **Deploy**.
3. Your site goes live at `your-project.vercel.app`. Every push to GitHub updates it.

## Use your own domain

1. Buy the domain, for example on Cloudflare Registrar.
2. In Vercel, open the project and go to **Settings → Domains**, then add `yourname.com`.
3. Copy the DNS records Vercel shows you into Cloudflare's DNS settings.
   In Cloudflare, set them to **DNS only** (grey cloud), not proxied.
