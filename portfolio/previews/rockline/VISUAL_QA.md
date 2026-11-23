# Rockline Concept — Visual and Interaction QA

**Date:** 23 November 2026  
**Source branch:** \`concept/rockline-industrial-20261123\`  
**Read-only design snapshot:** https://www.magicpatterns.com/os/4TZDBjmjqwqs742PjmNbZP?file=cbTHGeDmMGW4SrKcsxsQPG

## Baseline

Based on the industrial-service content actually published at \`rockindus.com\` and \`rockindus.com/services.php\` on 23 Nov 2026. The Rockline concept is an unsolicited independent proposal, not its public website. No customer testimonials, success metrics, actual inventory availability, approved client brands or company photographs are asserted.

## Verified

- **15/15 tests passed** via \`node --test qa.test.mjs interactive.test.mjs\` in the Magic Patterns OS shell against copies of the GitHub branch source.
- **Node JS syntax gate passed:** \`node --check _shared/demo.js\`.
- Tests cover unique IDs, one H1, valid anchors, AR+EN content attributes, safe external links, disclosure/noindex, non-fabricated claims, local-only form logic, six service-to-select bindings, responsive menu ARIA, language persistence and RTL, accessible CSS properties, and functional mock interactions.
- **Visual previews inspected** at desktop 1280, tablet 768, and mobile 390 in English; and desktop/mobile in Arabic. The full page and standalone RFQ section were also reviewed.
- Hero image and feature image are AI-generated concept illustrations, not official Rockline photos. On one full-page screenshot, image CDN assets did not resolve before capture. A CSS-based graphic fallback was added for the equipment media tile. Network dependency remains a release risk.

## Screenshot evidence

English:
- [Hero — desktop](https://cdn.magicpatterns.com/previews/os-live/4TZDBjmjqwqs742PjmNbZP/cbTHGeDmMGW4SrKcsxsQPG/057fa477-a7dc-4c46-af20-211960df53e3.png)
- [Hero — tablet](https://cdn.magicpatterns.com/previews/os-live/4TZDBjmjqwqs742PjmNbZP/cbTHGeDmMGW4SrKcsxsQPG/7c466386-cf6c-44bd-89f7-b92763a5d8a4.png)
- [Hero — mobile](https://cdn.magicpatterns.com/previews/os-live/4TZDBjmjqwqs742PjmNbZP/cbTHGeDmMGW4SrKcsxsQPG/1d0852cc-cd6c-4ab2-a8b8-570f4cf36623.png)
- [Long-page capture, first 4000px; CDN images missing at capture time](https://cdn.magicpatterns.com/previews/os-live/4TZDBjmjqwqs742PjmNbZP/cbTHGeDmMGW4SrKcsxsQPG/d73eed9b-1166-4534-8da4-84a2befdbcc0.png)

Arabic:
- [RTL — desktop](https://cdn.magicpatterns.com/previews/os-live/4TZDBjmjqwqs742PjmNbZP/6LBRsUQxAaVVdcLcbsc5Wk/e95c9f61-701e-4a40-a224-e36a02a6d632.png)
- [RTL — mobile](https://cdn.magicpatterns.com/previews/os-live/4TZDBjmjqwqs742PjmNbZP/6LBRsUQxAaVVdcLcbsc5Wk/a50133ab-b589-4e57-a08e-9c64b89ed022.png)

RFQ:
- [Demo request form — desktop](https://cdn.magicpatterns.com/previews/os-live/4TZDBjmjqwqs742PjmNbZP/c3KUgUtbHH3acHmrLXXhg1/ad07b29c-865c-4a5f-acc6-647ac9bda057.png)
- [Demo request form — mobile](https://cdn.magicpatterns.com/previews/os-live/4TZDBjmjqwqs742PjmNbZP/c3KUgUtbHH3acHmrLXXhg1/27966f9d-1c9d-4b2b-9f84-9c05d28a0972.png)

## Limitations and release gates

1. Design QA is performed through a copy of the actual GitHub HTML/CSS/JS, embedded in a Magic Patterns review prototype. This is **not a live Render site or a production deploy**.
2. The language and request flows passed automated isolated DOM interaction tests, not a complete cross-browser E2E run against a live protected staging site.
3. Actual Safari/iOS and Android browser checks, small 320px overflow metrics, complete network/console trace and production-relative URL tests remain to be verified before launch.
4. \`noindex\` is not access control. Protect any live preview with password/access restrictions before sharing it externally.
5. Owner must approve the design and business outreach. Do not imply Rockline endorsed, commissioned or operates this concept.
6. Do not automatically merge to the portfolio deployment branch; this pull request is review-only.

## CTA refinement — 23 Nov 2026

**Design decision:** remove all decorative arrow glyphs and arrow-only card controls. The site now has a restrained CTA system: solid orange primary actions (header, hero and RFQ preview), typographic underlined secondary links, and descriptive service-specific text buttons in the capability rows. The same six `data-service` values and local-only RFQ behavior are preserved.

**Latest verification from the GitHub branch mirrored into the Magic Patterns review OS:**
- `node --test qa.test.mjs interactive.test.mjs`: **15/15 passed** (12 static/design tests and 3 isolated interaction tests).
- `node --check _shared/demo.js`: passed.
- Magic Patterns OS typecheck/build: passed for main page, Arabic QA, and RFQ QA frames.
- Reviewed updated EN desktop 1280 / mobile 390; AR desktop 1280 / mobile 390; mobile RFQ in the review OS.
- All decorative Unicode arrow glyphs are absent in current concept HTML. Six service pickers have visible AR/EN labels, and the JS still maps each picker to its service selector.
- **Not yet verified:** real hosted browser E2E, Safari/Android, 320px overflow instrumentation, external image CDN availability under constrained networks, and click-by-click browser journeys in production conditions. Keep this PR draft and deployment off.

**Updated visual evidence**
- [English desktop — complete page, first 4000px](https://cdn.magicpatterns.com/previews/os-live/4TZDBjmjqwqs742PjmNbZP/cbTHGeDmMGW4SrKcsxsQPG/0516f7fb-ac3c-4e54-b5b9-fbe13cce8926.png)
- [English mobile — complete page, first 4000px](https://cdn.magicpatterns.com/previews/os-live/4TZDBjmjqwqs742PjmNbZP/cbTHGeDmMGW4SrKcsxsQPG/4d488f9b-5321-48f3-b6d0-a3b2219a28f5.png)
- [Arabic desktop — hero](https://cdn.magicpatterns.com/previews/os-live/4TZDBjmjqwqs742PjmNbZP/6LBRsUQxAaVVdcLcbsc5Wk/e79b0da8-aa5d-44de-9412-737e3ba0eece.png)
- [Arabic mobile — hero](https://cdn.magicpatterns.com/previews/os-live/4TZDBjmjqwqs742PjmNbZP/6LBRsUQxAaVVdcLcbsc5Wk/36a0a9bc-e09a-4c8f-a306-21d9acc473d8.png)
- [RFQ mobile](https://cdn.magicpatterns.com/previews/os-live/4TZDBjmjqwqs742PjmNbZP/c3KUgUtbHH3acHmrLXXhg1/7655a20d-c7e8-4e12-bb7c-80292a377e34.png)
