# Assets — drop your own media here

The site works fully without any media (it falls back to animated CSS/SVG
visuals). To make it feel exactly like your reference, drop in these files:

| File | Used by | Notes |
|------|---------|-------|
| `hero.mp4` | `index.html` hero background | A dark anime / tactical-HUD loop. Keep it short (8–15s), muted, ~1080p, compressed (< 6 MB ideal). The `<video>` tag already points here. |
| `portrait.png` | hero portrait cell | A **transparent** character cutout (e.g. adult Robin in a suit). To use it, open `index.html`, find the `.portrait` block, and replace the inline `<svg class="silhouette">…</svg>` with `<img src="assets/portrait.png" alt="Operator">`. |
| `hero-poster.svg` | video poster fallback | Already included — shown before the video loads or if it's missing. |

### Where to find free, license-safe media
- **Video:** Pexels, Pixabay, Coverr, Mixkit (free for commercial use). Search "cyberpunk", "HUD", "abstract dark", "neon grid".
- **Character art:** Use art you own/commissioned, or transparent renders you have rights to. Avoid uploading copyrighted anime stills to a public host.

Optimize before committing: `ffmpeg -i in.mp4 -vf scale=1280:-2 -crf 30 -an hero.mp4`
