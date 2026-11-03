# Product
<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
- **Primary: people who buy the honey.** They need to understand what the honey is and why it is different, then go to the Products page or write to order. Confirmed by the developer, 2026-11-02.
- **Present in the content but not the priority:** people curious about the regenerative project (the news articles), and visitors who may come to the farm shop.
- **Content editor:** the client edits everything in Sanity Studio. They are Italian-speaking, over 50 and not technical, so every editable field needs plain-language guidance.

## Product Purpose
Website of Kwa Nyuki, a small family farm, in Italian, French and English (Italian is the default). It presents the farm's honey and the project behind it.

There is **no online checkout**. Honey is bought at the farm shop ("bottega") or on request by email or phone (confirmed).

Success means a buyer reaches the Products page, or contacts the farm to order.

## Positioning
Kwa Nyuki calls itself a **"Shamba rigenerativa"**. *Shamba* is Swahili for a small farm where crops grow together under trees. The farm combines:
- organic and regenerative agriculture;
- syntropic agroforestry: herbs, shrubs and trees grown together in layers;
- no synthetic chemical products.

The aim is biodiversity and a living habitat for bees and other pollinators. Diverse plants bloom in sequence through the year, which shapes the honey. The farm also shares its methods and results openly with consumers.

Source: the client's own articles in Sanity: "Il progetto Kwa Nyuki", "La nostra visione", "Perché Shamba rigenerativa?". The developer did not contradict this summary.

## Operating Context
- **Stack:** Astro static site on Vercel, Sanity CMS with document-level translations (it/fr/en). Content goes live after a rebuild once the client presses "Pubblica". Whether that rebuild is automatic depends on a Sanity → Vercel webhook that has not been confirmed.
- **Client guide:** `public/guida.html` explains the Studio to the client and must stay consistent with the Studio's labels.

## Capabilities and Constraints
- **Products:** sold in the farm shop or on request, never online. Prices are entered in Sanity.
- **Editable in Site Settings:** address (one for all languages), shop hours (per language), email and phone. The phone is shown only when set.
- **Editable in "Pagina Home"** (one per language): the hero title, subtitle and button text, and the story title, text and photo. Every empty field keeps the built-in copy from `src/i18n/ui.ts`.
- **Open: farm location.** "Via delle Api 12, 53024 Montalcino" is a **placeholder**. The real address is not known yet; the client will replace it in Sanity. Do not use the location as a fact in new copy. The map and directions follow whatever address is set.
- **Open: email.** The address `hello@kwanyuki.com` does not match the `.it` domain. Not confirmed with the client.
- **Open, ask the client before launch: "biologico".** The hero says "Miele biologico premium", but the articles only say the methods are aligned with organic principles. Whether the honey is certified organic is not confirmed, and "biologico" is a regulated term in the EU. The client can change the hero sentence in "Pagina Home".

## Evidence on Hand
- **Articles:** 3 published in Italian, with French/English translations for one of them.
- **Products:** one real product in Sanity.
- **Client photos:** they have some, but not of good quality yet. They want to swap photos themselves in Sanity Studio to see how they look.
- **Current imagery:** stock from Pexels and Unsplash. It must never be presented as the farm's own.
- **Not available:** testimonials, certifications, press or awards. Do not fabricate them.

## Product Principles
1. Claims come from the farm's own words. No invented certifications, quality labels or testimonials.
2. The buyer's path ends with a person (shop, email, phone), not a cart.
3. The client can change the images and texts of the main pages in Sanity without a developer.
4. Placeholders are easy to replace and never pretend to be real farm content.

## Accessibility & Inclusion
- WCAG AA contrast in both light and dark themes. This was enforced in November 2026 after the Impeccable critique.
- Touch targets of at least 44px.
- Keyboard-usable menu.
- Both the audience and the editor include older users, so prefer clear labels and readable sizes.
