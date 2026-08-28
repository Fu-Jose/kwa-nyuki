import { createClient } from "@sanity/client";
import groq from "groq";
import { createImageUrlBuilder } from "@sanity/image-url";
import { news, products, siteSettings, type NewsItem, type Product, type SiteSettings } from "../content/fallback";
import type { Lang } from "../i18n/ui";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.PUBLIC_SANITY_DATASET as string | undefined) ?? "production";

export const isSanityConfigured = Boolean(projectId);

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2025-08-01",
      useCdn: true,
    })
  : null;

const builder = client ? createImageUrlBuilder(client) : null;

export function urlFor(source: unknown) {
  return builder?.image(source as never);
}

const productQuery = groq`*[_type == "product" && language == $lang] | order(title asc) {
  _id,
  "slug": slug.current,
  title,
  excerpt,
  price,
  "image": image.asset->url,
  "imageAlt": image.alt
}`;

const newsQuery = groq`*[_type == "news" && language == $lang] | order(publishedAt desc) {
  _id,
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  body,
  "image": image.asset->url,
  "imageAlt": image.alt
}`;

const newsBySlugQuery = groq`*[_type == "news" && language == $lang && slug.current == $slug][0] {
  _id,
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  body,
  "image": image.asset->url,
  "imageAlt": image.alt
}`;

const settingsQuery = groq`*[_type == "siteSettings"][0] {
  instagram,
  facebook,
  heroVideoUrl,
  "heroPoster": heroPoster.asset->url
}`;

function mapProduct(item: Product): Product {
  return {
    ...item,
    image: item.image || products.en[0].image,
    imageAlt: item.imageAlt || item.title,
  };
}

export async function getProducts(lang: Lang): Promise<Product[]> {
  if (!client) return products[lang];
  try {
    const result = await client.fetch<Product[]>(productQuery, { lang });
    return result?.length ? result.map(mapProduct) : products[lang];
  } catch {
    return products[lang];
  }
}

export async function getNews(lang: Lang): Promise<NewsItem[]> {
  if (!client) return news[lang];
  try {
    const result = await client.fetch<NewsItem[]>(newsQuery, { lang });
    return result?.length ? result : news[lang];
  } catch {
    return news[lang];
  }
}

export async function getNewsBySlug(lang: Lang, slug: string): Promise<NewsItem | undefined> {
  if (!client) return news[lang].find((item) => item.slug === slug);
  try {
    const result = await client.fetch<NewsItem | null>(newsBySlugQuery, { lang, slug });
    return result ?? news[lang].find((item) => item.slug === slug);
  } catch {
    return news[lang].find((item) => item.slug === slug);
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!client) return siteSettings;
  try {
    const result = await client.fetch<Partial<SiteSettings> | null>(settingsQuery);
    return {
      ...siteSettings,
      ...result,
      heroVideoUrl: result?.heroVideoUrl || siteSettings.heroVideoUrl,
      heroPoster: result?.heroPoster || siteSettings.heroPoster,
    };
  } catch {
    return siteSettings;
  }
}
