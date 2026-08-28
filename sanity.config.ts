import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { documentInternationalization } from "@sanity/document-internationalization";
import { news, product, siteSettings } from "./studio/schemaTypes";

// Sanity's own tooling only exposes env vars prefixed SANITY_STUDIO_ to the
// Studio app bundle (the Astro site instead reads PUBLIC_-prefixed ones,
// per Astro/Vite's convention — see src/lib/sanity.ts).
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "placeholder";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "kwa-nyuki",
  title: "Kwa Nyuki",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.documentTypeListItem("product").title("Products"),
            S.documentTypeListItem("news").title("News"),
          ]),
    }),
    visionTool(),
    unsplashImageAsset(),
    documentInternationalization({
      supportedLanguages: [
        { id: "it", title: "Italiano" },
        { id: "fr", title: "Français" },
        { id: "en", title: "English" },
      ],
      schemaTypes: ["product", "news"],
    }),
  ],
  schema: {
    types: [product, news, siteSettings],
  },
});
