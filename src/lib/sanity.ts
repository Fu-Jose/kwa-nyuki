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

export async function getProducts(lang: Lang): Promise<Product[]> {
  if (!client) return products[lang];
  try {
    const result = await client.fetch<Product[]>(productQuery, { lang });
    return result?.length ? result.map(mapProduct) : products[lang];
  } catch {
    return products[lang];
  }
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
  try {
    const result = await client.fetch<NewsItem[]>(newsQuery, { lang });
    return result?.length ? result.map(mapNews) : news[lang];
  } catch {
    return news[lang];
  }
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
  try {
    const result = await client.fetch<NewsItem | null>(newsBySlugQuery, { lang, slug });
    return result ? mapNews(result) : getFallbackNewsBySlug(lang, slug);
  } catch {
    return getFallbackNewsBySlug(lang, slug);
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

export async function getHomePage(lang: Lang): Promise<HomePage> {
  if (!client) return {};
  try {
    return (await client.fetch<HomePage | null>(homeQuery, { lang })) ?? {};
  } catch {
    return {};
  }
}
