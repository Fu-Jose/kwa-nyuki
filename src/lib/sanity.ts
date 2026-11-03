import { createClient } from "@sanity/client";
import groq from "groq";
import { createImageUrlBuilder } from "@sanity/image-url";
import {
  news,
  products,
  siteSettings,
  type HomePage,
  type NewsItem,
  type Product,
  type SiteSettings,
} from "../content/fallback";
import { locales, type Lang } from "../i18n/ui";

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

// Documents in $lang, plus Italian ones that have no published $lang translation yet: an
// untranslated item shows in Italian instead of being missing (or replaced by sample content).
const IN_LANGUAGE_OR_UNTRANSLATED_ITALIAN = `(
  language == $lang ||
  (language == "it" && count(*[_type == "translation.metadata" && references(^._id)]
    .translations[language == $lang && defined(value->_id)]) == 0)
)`;

const productQuery = groq`*[_type == "product" && ${IN_LANGUAGE_OR_UNTRANSLATED_ITALIAN}] | order(title asc) {
  _id,
  language,
  "slug": slug.current,
  title,
  excerpt,
  price,
  format,
  "image": image.asset->url,
  "imageAlt": image.alt
}`;

const newsQuery = groq`*[_type == "news" && ${IN_LANGUAGE_OR_UNTRANSLATED_ITALIAN}] | order(publishedAt desc) {
  _id,
  language,
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  body,
  "image": image.asset->url,
  "imageAlt": image.alt
}`;

// translations: the versions linked by the translation plugin (unpublished ones resolve to null).
const newsBySlugQuery = groq`*[_type == "news" && language == $lang && slug.current == $slug][0] {
  _id,
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  body,
  "image": image.asset->url,
  "imageAlt": image.alt,
  "translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    language,
    "slug": slug.current
  }
}`;

// heroVideoUrl: an uploaded video file wins over the pasted link.
const settingsQuery = groq`*[_type == "siteSettings"][0] {
  instagram,
  facebook,
  "heroVideoUrl": coalesce(heroVideo.asset->url, heroVideoUrl),
  "heroPoster": heroPoster.asset->url,
  "logo": logo.asset->url,
  "logoAlt": logo.alt,
  email,
  phone,
  address,
  hours
}`;

const homeQuery = groq`*[_type == "home" && language == $lang][0] {
  heroTitle,
  heroSubtitle,
  heroButton,
  storyTitle,
  storyText,
  "storyImage": storyImage.asset->url,
  "storyImageAlt": storyImage.alt
}`;

function mapProduct(item: Product): Product {
  return {
    ...item,
    image: item.image || products.en[0].image,
    imageAlt: item.imageAlt || item.title,
  };
}

// Sample content (content/fallback.ts) is only for local development without Sanity. With Sanity
// configured it never reaches the site: an empty section shows its empty-state text, and a failed
// fetch throws so the build fails and Vercel keeps serving the last good deploy.
export async function getProducts(lang: Lang): Promise<Product[]> {
  if (!client) return products[lang];
  const result = await client.fetch<Product[] | null>(productQuery, { lang });
  return (result ?? []).map(mapProduct);
}

// A news item without a photo would make <Image> fail and stop the whole site from
// building, so fall back to a stock photo (the Studio also requires one now).
function mapNews(item: NewsItem): NewsItem {
  return {
    ...item,
    image: item.image || news.en[0].image,
    imageAlt: item.imageAlt || item.title,
  };
}

export async function getNews(lang: Lang): Promise<NewsItem[]> {
  if (!client) return news[lang];
  const result = await client.fetch<NewsItem[] | null>(newsQuery, { lang });
  return (result ?? []).map(mapNews);
}

// Sample articles share one _id across languages, which stands in for the translation links.
function getFallbackNewsBySlug(lang: Lang, slug: string): NewsItem | undefined {
  const item = news[lang].find((entry) => entry.slug === slug);
  if (!item) return undefined;
  const translations = locales.map((language) => ({
    language,
    slug: news[language].find((entry) => entry._id === item._id)?.slug ?? null,
  }));
  return { ...item, translations };
}

export async function getNewsBySlug(lang: Lang, slug: string): Promise<NewsItem | undefined> {
  if (!client) return getFallbackNewsBySlug(lang, slug);
  const result = await client.fetch<NewsItem | null>(newsBySlugQuery, { lang, slug });
  return result ? mapNews(result) : undefined;
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

export async function getHomePage(lang: Lang): Promise<HomePage> {
  if (!client) return {};
  try {
    return (await client.fetch<HomePage | null>(homeQuery, { lang })) ?? {};
  } catch {
    return {};
  }
}
