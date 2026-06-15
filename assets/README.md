# Assets — drop your own media here

The site works fully without any media (it falls back to animated CSS/SVG
visuals). To make it feel exactly like your reference, drop in these files:

| File | Used by | Notes |
|------|---------|-------|
| `hero.mp4` | `index.html` hero background | **Active** — the cinematic loop behind the hero. Replace this file to change it (muted, ~1080p, compressed). |
| `portrait.gif` | hero portrait cell | **Active** — the tuxedo operator shown in the portrait cell. Swap this file to change it. |
| `portrait.png` | hero portrait cell (alt) | If you have a **transparent** cutout instead, drop it here and point the `.portrait-img` `src` at `assets/portrait.png`. |
| `hero-poster.svg` | video poster fallback | Already included — shown before the video loads or if it's missing. |

### Where to find free, license-safe media
- **Video:** Pexels, Pixabay, Coverr, Mixkit (free for commercial use). Search "cyberpunk", "HUD", "abstract dark", "neon grid".
- **Character art:** Use art you own/commissioned, or transparent renders you have rights to. Avoid uploading copyrighted anime stills to a public host.

Optimize before committing: `ffmpeg -i in.mp4 -vf scale=1280:-2 -crf 30 -an hero.mp4`
