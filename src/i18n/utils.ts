import { defaultLang, locales, ui, type Lang } from "./ui";

export function isLang(value: string | undefined): value is Lang {
  return locales.includes(value as Lang);
}

export function useTranslations(lang: Lang) {
  return ui[lang] ?? ui[defaultLang];
}

/** Every page of the site; the article page lives under the news section. */
export type PageKey = "home" | "products" | "news" | "contact" | "privacy";
export const pageKeys: PageKey[] = ["home", "products", "news", "contact", "privacy"];

/**
 * URL segment of each page per language. Italian (the default) has no language prefix:
 * "/prodotti/", "/en/products/", "/fr/produits/". Change a segment here and add a
 * redirect in vercel.json for the old address.
 */
const pageSegments: Record<PageKey, Record<Lang, string>> = {
  home: { it: "", en: "", fr: "" },
  products: { it: "prodotti", en: "products", fr: "produits" },
  news: { it: "notizie", en: "news", fr: "actualites" },
  contact: { it: "contatti", en: "contact", fr: "contact" },
  privacy: { it: "privacy", en: "privacy", fr: "confidentialite" },
};

/** Root-relative URL of a page (with trailing slash), e.g. pagePath("en", "news", "spring") → "/en/news/spring/". */
export function pagePath(lang: Lang, page: PageKey, slug?: string) {
  const parts = [lang === defaultLang ? "" : lang, pageSegments[page][lang], slug ?? ""].filter(Boolean);
  return parts.length ? `/${parts.join("/")}/` : "/";
}

/** The same page in every language, for hreflang and the language switcher. */
export function pageAlternates(page: PageKey) {
  return Object.fromEntries(locales.map((code) => [code, pagePath(code, page)])) as Record<Lang, string>;
}

/** Language of a URL: its first segment when it is a non-default language, otherwise Italian. */
export function langFromPath(pathname: string): Lang {
  const first = pathname.split("/").filter(Boolean)[0];
  return isLang(first) && first !== defaultLang ? first : defaultLang;
}

export function getNavLinks(lang: Lang) {
  const t = useTranslations(lang);
  return (["home", "products", "news", "contact"] as const).map((page) => ({
    page,
    href: pagePath(lang, page),
    label: t.nav[page],
  }));
}
