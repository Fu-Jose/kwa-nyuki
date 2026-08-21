# Kwa Nyuki

Mobile-first boutique site for a family-owned bee farm. Astro 7, Tailwind CSS (class-based dark mode), Motion, and Sanity with document-level i18n.

## Routes

- `/` → `/it/` (default language)
- `/it/`, `/fr/`, `/en/` — home with video hero
- `/[lang]/products/`
- `/[lang]/news/`
- `/[lang]/contact/`

## Develop

```bash
npm install
npm run dev
```

The site ships with Unsplash/Pexels placeholders so it runs without CMS credentials.

## Sanity

1. Create a project at [sanity.io](https://www.sanity.io)
2. Copy `.env.example` to `.env` and set `PUBLIC_SANITY_PROJECT_ID`
3. Run Studio: `npm run studio`
4. Products, News, and Site Settings (logo notes, social, hero video) are already modelled. Unsplash is available as an image source. Document translations cover `en`, `it`, and `fr`.

Rebuild on CMS updates with a Vercel or Netlify webhook from Sanity.

## Stack notes

- View Transitions via Astro `ClientRouter`
- Navbar glassmorphism + full-screen mobile overlay
- Preloader splits away once the hero video can play through
