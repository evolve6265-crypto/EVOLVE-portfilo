# EVOLVE — Premium Portfolio

> *Where creative meets result.* A multi-page, animated portfolio for a digital
> studio offering **Discord bots, custom ticket systems, web development and hosting.**

Pure static HTML/CSS/JS — **no build step, no framework**. Deploys to InfinityFree,
Vercel, Netlify or GitHub Pages by uploading the files as-is.

## ✦ Features
- **Multi-page architecture** — `index.html` (Home), `services.html` (Catalog), `contact.html` (Contact)
- **Lenis smooth scrolling** on every page
- **Frosted-glass navbar** locked to the viewport (glassmorphism blur)
- **Liquid page transitions** powered by GSAP (no blank-flash between pages)
- **Bento-box grid** homepage with thin neon divider lines
- **Cinematic video background** slot (`assets/hero.mp4`) with SVG poster fallback
- **Masked text reveal** — hero headline slides up out of a line mask on load
- **Character portrait** cell (animated SVG, swap in your own transparent PNG)
- **Infinite text marquee** of the tech stack in outlined display type
- **Glowing HUD service cards** that lift + cast a neon shadow on hover
- **Dynamic number counters** (count up via GSAP ScrollTrigger)
- **Magnetic buttons & links** that pull toward the cursor
- **Custom cursor**, ambient grid/noise background, reduced-motion support

## ✦ Project structure
```
index.html          Home (hero, bento, marquee, capabilities, CTA)
services.html       4 HUD service cards, process steps, stats
contact.html        Command-center channels + brief form + counters
css/style.css       Design system, navbar, footer, cursor, transition
css/pages.css       Page-specific components (bento, HUD, contact…)
js/main.js          Lenis, GSAP reveals/transitions, magnetic, counters, marquee
assets/             Drop hero.mp4 / portrait.png here (see assets/README.md)
vercel.json         Headers + clean URLs for Vercel
```

Libraries (Lenis, GSAP, ScrollTrigger) load from CDN — nothing to install.

## ✦ Contact channels (already wired)
- **Discord:** ID `1113887571605471294`
- **Twitter / X:** [@Evolve1792968](https://twitter.com/Evolve1792968)
- **Email:** evolve6265@gmail.com
- The contact form posts via **FormSubmit** to that email (confirm once on first send).

## ✦ Run locally
Any static server works:
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## ✦ Deploy

### Vercel (recommended)
1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Framework preset: **Other**. Build command: *(none)*. Output dir: `./` (root).
4. Deploy. `vercel.json` handles clean URLs and caching automatically.

### InfinityFree
1. Log into the InfinityFree control panel → **File Manager** (or use FTP).
2. Upload **everything** into the `htdocs/` folder, keeping the folder
   structure (`css/`, `js/`, `assets/` must stay as subfolders).
3. Visit your domain — `index.html` loads by default. *(`vercel.json` is ignored
   on InfinityFree, which is fine.)*

### Netlify / GitHub Pages
Drag-and-drop the folder (Netlify) or enable Pages on the repo root (GitHub Pages).

## ✦ Customize media
See [`assets/README.md`](assets/README.md) to drop in your own background video
and character portrait.

---
© 2026 EVOLVE.
