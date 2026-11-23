# Rockline | Independent Website Concept

**Status:** Private sales proposal / demo — **not approved by Rockline**.
**Owner:** Abdulrahman Studio (independent developer).
**Source repo:** Abdulrahmnh/Abdulrahmnh, branch concept/rockline-industrial-20261123.
**Path under portfolio static publish root:** \`/previews/rockline/\`. This path does **not** exist on the active site until an authorized deployment includes it.

## Company researched
- Correct company: **Rockline Industrial Services** (Jubail), official website: https://rockindus.com/.
- Different entities at \`therockline.com\` and \`rockline.rocks\` are **not** the target.
- Existing site's main and service pages contain visible Lorem Ipsum, duplicated service excerpts and an outdated 2018 copyright label.
- Actual listed capabilities include heavy/light equipment, heavy lift/transport, plant maintenance, power/automation, industrial material supply, project support, manpower supply, material trading and civil equipment.
- The proposed visible content focuses on six capabilities; the equipment examples reflect the site's published equipment descriptions, without asserting current fleet availability.

### Verifiable public sources
- https://rockindus.com/
- https://rockindus.com/services.php
- https://rockindus.com/about.php
- https://rockindus.com/contact.php

## Included
- Original editorial visual direction: industrial dark surfaces, high-contrast typography and signal-orange CTAs.
- Two AI-generated original conceptual photographs. **They do not depict Rockline facilities, projects or actual equipment.**
- Hero, about, service chooser, sample equipment categories, three-step *proposed* enquiry process, interactive local-only form, footer disclosure.
- AR/EN bilingual switching, RTL/LTR, mobile menu, in-page navigation, preselected service through service cards.
- RFQ demo with required fields, email validity, confirmation checkbox and local preview: **no transmission and no stored contact data**. Language preference is the only localStorage value.
- Shared CSS/JS in \`../_shared/\` to reuse on future Ahlam Bayan and ISTE proposals.

## Assets
Generated, original conceptual imagery is served via Magic Patterns CDN:
- \`https://cdn.magicpatterns.com/patterns/generated-images/b9c0b5a2-37eb-4007-a1bb-84e36cc29a41.jpg\` (hero)
- \`https://cdn.magicpatterns.com/patterns/generated-images/ece14fda-9131-462d-94a6-18daf709df56.jpg\` (equipment detail)

They must remain labelled **concept imagery**. No real customer logo, employee portrait, installed project imagery, client testimonial, customer statistics, operational promise or unverified fleet availability is used.

## Run and verify
From repo root:

\`\`\`sh
node --test portfolio/previews/*.test.mjs
node --check portfolio/previews/_shared/demo.js
python3 -m http.server 8000 --directory portfolio
# Navigate to http://localhost:8000/previews/rockline/
\`\`\`

QA status (23 Nov 2026): 13 automated assertions passed, including three interactive simulations using a DOM harness. See [VISUAL_QA.md](./VISUAL_QA.md).

QA checklist:
- Desktop 1440, tablet 768, mobile 390, small mobile 320, both locales.
- Toggle language and confirm text/direction, refresh persists language.
- In-page navigation and keyboard tab/escape; mobile menu opens/closes.
- Pick any service; it preselects \`#service-select\`; can edit other fields.
- Submit empty/invalid email -> validation; submit valid example + demo checkbox -> local preview, no network send.
- Edit preview; check accessible focus/scroll and no overflow.
- Images load without layout jump; if CDN blocked, semantic copy remains usable.
- Test Safari on a physical device if available. Static tests are NOT full E2E evidence.

## Exposure and approval gates
- \`noindex,nofollow,noarchive,nosnippet,noimageindex\` is set. **This does not make a URL private.**
- Do not merge into the active Render branch or share publicly with prospective clients without owner approval. For genuine private previews configure access control or protected staging.
- Do not send the form to Rockline's official address; the live demo must never impersonate its business workflow.
- Confirm rights, compliance and planned outreach with owner before approaching any third party.
- No sends, deployments or claimed conversion outcomes are included in this PR.

## Draft outreach positioning (after approval)
**Subject:** A private website concept for Rockline Industrial Services

Hello,

I reviewed Rockline's website and prepared a short independent concept showing how its industrial capabilities and equipment categories could be presented more clearly, with a simpler route to request a quotation.

Here's the concept preview: [PRIVATE REVIEW LINK]

This is not an official website or a commissioned redesign — just a tailored idea for your consideration. If the direction is interesting, I would be glad to share a proposed scope and discuss it with whoever oversees your website or commercial operations.

Best regards,
Abdulrahman
Independent Web Developer

**Do not send before preview access and portfolio rights are checked.**
