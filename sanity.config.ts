import { defineConfig, isDev } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { itITLocale } from "@sanity/locale-it-it";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { documentInternationalization } from "@sanity/document-internationalization";
import { LANGUAGES, home, news, product, siteSettings } from "./studio/schemaTypes";

// Sanity's own tooling only exposes env vars prefixed SANITY_STUDIO_ to the
// Studio app bundle (the Astro site instead reads PUBLIC_-prefixed ones,
// per Astro/Vite's convention — see src/lib/sanity.ts).
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "placeholder";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

// Site Settings is one shared document, opened from the sidebar: it must not be
// created twice, duplicated or deleted from the Studio.
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

// Language-less "new product/news" templates: a document created from them has no
// language, and the site only shows documents in a language — it would never appear.
// The translation plugin adds "Italiano/Francese/Inglese …" templates instead.
const REMOVED_TEMPLATES = new Set(["home", "product", "news", "siteSettings"]);

export default defineConfig({
  name: "kwa-nyuki",
  title: "Kwa Nyuki",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenuti")
          .items([
            S.listItem()
              .title("Impostazioni del sito")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.documentTypeListItem("home").title("Pagina Home"),
            S.documentTypeListItem("product").title("Prodotti"),
            S.documentTypeListItem("news").title("Notizie"),
          ]),
    }),
    itITLocale(),
    // Query console for developers only; hidden in the Studio deployed for the client.
    ...(isDev ? [visionTool()] : []),
    unsplashImageAsset(),
    documentInternationalization({
      supportedLanguages: LANGUAGES,
      schemaTypes: ["home", "product", "news"],
    }),
  ],
  schema: {
    types: [home, product, news, siteSettings],
    templates: (prev) => prev.filter((template) => !REMOVED_TEMPLATES.has(template.id)),
  },
  document: {
    actions: (prev, { schemaType }) =>
      schemaType === "siteSettings"
        ? prev.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : prev,
  },
});
