# Abdulrahman Studio V3 — Independent Brand, Visual QA and Release Gates

**Date:** 23 November 2026  
**Branch:** `design/abdulrahman-studio-v3-independent-20261123`  
**Merge target:** `portfolio/independent-web-developer-20261123` (Render-connected)  
**Status:** Draft / owner review / not deployed.

## Background and decision

- V1 was rejected for weak, generic editorial typography and insufficient real project proof.
- V2 improved the surface and case-study treatment but drifted too close to DawServe's own dark teal and medical visual identity.
- V3 establishes **Abdulrahman's own developer identity:** warm ivory, near-black, vibrant cobalt, independent `A/` monogram, deliberate English/Arabic typography and a personal positioning statement.
- DawServe appears **only in the selected-work section** as an independent proposal case, not as the identity of the Hero or wider website.
- The page has an extensible work layout for future cases and a single outbound sales/portfolio narrative.

## Implemented in GitHub

- Original independently branded AR/EN Hero with illustration dedicated to the studio (`MAKE IT WORK.`), distinct from any customer branding.
- Project-led DawServe section with original concept photo assets versioned locally in `portfolio/assets/`, a stylized interface composition labelled **CONCEPT VISUAL — NOT A SCREENSHOT**, clear RFQ/catalog/WordPress scope, and an actual public demo link.
- Three horizontal capabilities instead of three SaaS-template service cards.
- Practical delivery steps, distinct closing contact panel and accessible mobile navigation.
- Arabic RTL and English LTR, saved locale choice, localized image alternative text.
- Inline SVG arrows rather than emoji arrows.
- `noindex` preserved and no unverifiable metrics, client endorsements or paid-client claims added.
- No extra packages, build step, user-data collection form or analytics.

## Visual review — Magic Patterns

[Interactive V3 design prototype with Arabic / English toggle](https://www.magicpatterns.com/os/oR1Um1fc3MDdRtrhspitgs?file=au4iGjEU1vfYZxTjeG4fQy)

Source-snapshot captures after final case visual label update:

- [Arabic — 390px mobile, full visible portion](https://cdn.magicpatterns.com/previews/os-live/oR1Um1fc3MDdRtrhspitgs/qi4M6tr5oJE2eA1RDckgQf/91893dc0-7360-49f0-84b3-f8bf8fcf7ccb.png)
- [Arabic — 768px tablet](https://cdn.magicpatterns.com/previews/os-live/oR1Um1fc3MDdRtrhspitgs/qi4M6tr5oJE2eA1RDckgQf/84a3d738-0c54-4378-b2ed-dc89186d3c3a.png)
- [English — 1280px desktop](https://cdn.magicpatterns.com/previews/os-live/oR1Um1fc3MDdRtrhspitgs/oKvFTaibvhCxpFkCigFs3Z/ea987400-30e4-4352-9f2a-4eb7ee660747.png)
- [English — 390px mobile](https://cdn.magicpatterns.com/previews/os-live/oR1Um1fc3MDdRtrhspitgs/oKvFTaibvhCxpFkCigFs3Z/ae997ad5-50f8-4dd1-bd06-9efb2a29bdc3.png)
- [Earlier Arabic — 1280px desktop full visible portion](https://cdn.magicpatterns.com/previews/os-live/oR1Um1fc3MDdRtrhspitgs/qi4M6tr5oJE2eA1RDckgQf/cf031ad3-027f-4d9a-9f73-d184f576db97.png) (the small case stamp was then made more explicit).

The previews embed local project asset binaries as data URLs; GitHub remains the source of truth. Magic Patterns screenshots are visual reviews, **not** proof of live Render behavior.

## Automated QA

**13/13 tests passed**, run in isolated Magic Patterns shell against the GitHub branch files and the exact binary assets. `node --check site/app.js` passed. Magic Patterns typecheck passed.

Tests cover: semantic landmarks, unique IDs, internal anchor targets, secure outbound links, paired AR/EN copy, mobile nav markup, strict independent developer identity, DawServe case disclosure, binary image existence, noindex/contact safety, reduced-motion/focus styles, SVG instead of emoji arrows, conversion journeys and **actual menu/language controller execution through a Node DOM fixture**.

## Production release blockers

1. Owner's **visual approval** after comparing this independent design to V2 and the DawServe site.
2. Confirm public feature permission for the DawServe name, photos and demo link; otherwise unbrand the concept.
3. Add a direct, approved business contact path instead of the provisional GitHub link.
4. Verify deployed images, Arabic/English interactive switching and critical user journeys; run physical iOS Safari / Android checks and basic performance audit.
5. Keep `noindex` until the content is ready for discovery and contracting compliance has been checked.

**No merge, Render deploy or changes to other repositories are part of this V3 draft.**
