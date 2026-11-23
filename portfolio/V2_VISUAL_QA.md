# Portfolio V2 — Visual QA & Release Gates

**Date:** 23 November 2026  
**Working branch:** `design/portfolio-visual-proof-v2-20261123`  
**Deployment base:** `portfolio/independent-web-developer-20261123`  
**Status:** VISUAL REVIEW / NOT APPROVED TO DEPLOY

## Why V1 was rejected

Owner reviewed two mobile screen recordings: `ScreenRecording_11-22-2026 20-16-28_1(1).mp4` (DawServe) and `ScreenRecording_11-23-2026 18-35-52_1.mp4` (previous portfolio). DawServe made its product, medical supply photography and RFQ flow tangible. The portfolio had abstract typographic graphics and no meaningful visual project proof. Arrow glyphs rendered as emoji on the iPhone.

## V2 changes

- Replaced decorative typographic illustrations with original photo assets from the published DawServe concept, versioned under `portfolio/assets/`.
- Rebuilt the page as a dark, visual-first introduction with a featured concept photo and direct proof link.
- New DawServe case study, clearer business capabilities, three visual service categories and structured delivery flow.
- All arrow decorations use inline SVG (no Unicode arrow emoji).
- Bilingual RTL Arabic and LTR English, including image alt text. Current language is saved locally.
- Preserved the disclosure that DawServe is an **independent proposal demo**, not a paid, endorsed or completed client delivery.
- Preserved `noindex` and `robots.txt` restrictions.
- No third-party UI libraries, page build dependency, user data form or tracking code.

### Source and asset integrity

The source assets are from the user-controlled **public DawServe demo** at `https://dawserve.onrender.com/`. They are copied locally to avoid blocked GitHub raw image URLs.

- `assets/dawserve-hero.webp` — 100,062 bytes, Git blob `becf0c7a1445634192dea332822d9909c9f75261`.
- `assets/dawserve-dental.webp` — 40,612 bytes, Git blob `f1f6eccc542ea130537adae019481b0f8d9a6e42`.

These are **original concept media**, *not screenshots of a deployed WordPress administration experience*. The public DawServe demo is a static preview without live WordPress runtime, database, or email transport.

## Visual review evidence

Magic Patterns source-snapshot review (not a Render deployment):

- [Arabic preview](https://www.magicpatterns.com/os/b9zGAaUPU7yEGdMXkmcZCu?file=v3LXbc5UL5zPZCkQhep1vZ)
- [English LTR preview](https://www.magicpatterns.com/os/b9zGAaUPU7yEGdMXkmcZCu?file=4MkBmw3AG7j7cRqFgwWo1x)

Reviewed captures:

- [AR 1280 desktop, full page](https://cdn.magicpatterns.com/previews/os-live/b9zGAaUPU7yEGdMXkmcZCu/v3LXbc5UL5zPZCkQhep1vZ/789d2432-ffd4-4075-a0a0-38eb8c1c817e.png)
- [AR 390 mobile, full page](https://cdn.magicpatterns.com/previews/os-live/b9zGAaUPU7yEGdMXkmcZCu/v3LXbc5UL5zPZCkQhep1vZ/dc5c9782-f34f-438e-85ed-48cb69415884.png)
- [EN 1280 desktop](https://cdn.magicpatterns.com/previews/os-live/b9zGAaUPU7yEGdMXkmcZCu/4MkBmw3AG7j7cRqFgwWo1x/321dec2d-9f60-44e2-912d-ad163e08b58f.png)
- [EN 390 mobile](https://cdn.magicpatterns.com/previews/os-live/b9zGAaUPU7yEGdMXkmcZCu/4MkBmw3AG7j7cRqFgwWo1x/9f85aa6d-a0bc-439f-a913-0adba4d22a93.png)

Caveat: Visual previews inline images for reliable offline rendering. They are an inspection copy of GitHub source. The later copy-only change to the selected-work heading is not represented in these initial captures.

## Automated verification

`node --test portfolio/qa.test.mjs` — **10/10 passed** on a staging copy of the GitHub branch, including checks for:

- Semantic H1 and unique ids
- Functional anchor targets
- Secure external links
- Complete bilingual text labels
- Locally bundled binary image sizes and translated alt text
- Language direction, persistence and document metadata
- Removal of V1's abstract graphics and emoji arrow glyphs
- Accurate noindex / independent concept disclosure
- Mobile breakpoints and reduced-motion handling
- Work, service, process and contact targets

`node --check portfolio/app.js` passed; Magic Patterns visualization typecheck passed.

**Not verified:** a physical Safari device, automated real-browser E2E on the deployed branch, Core Web Vitals, all broken-link checks on the eventual public URL, formal asset-use consent, or a direct business contact channel.

## Release gates

1. Owner approves the **visual result on phone and desktop**.
2. Confirm permission to show the DawServe name, photos and concept link on a publicly discoverable portfolio; otherwise replace with neutral demonstration media.
3. Configure a proper approved sales contact channel instead of the public GitHub profile.
4. Run browser tests including real iOS Safari and confirm images load from `portfolio/assets/` after staging deploy.
5. Only after those gates: consider merge into the Render-connected portfolio branch and optional removal of `noindex`.

**No merge, no Render deploy, no edits to DawServe or Sanead.**
