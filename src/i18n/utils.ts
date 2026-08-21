import { defaultLang, locales, ui, type Lang } from "./ui";

export function isLang(value: string | undefined): value is Lang {
  return locales.includes(value as Lang);
}

export function useTranslations(lang: Lang) {
  return ui[lang] ?? ui[defaultLang];
}

export function localizedPath(lang: Lang, path: string) {
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${lang}/${trimmed}/` : `/${lang}/`;
}

export function switchLangPath(currentPath: string, nextLang: Lang) {
  const segments = currentPath.split("/").filter(Boolean);
  const rest = isLang(segments[0]) ? segments.slice(1) : segments;
  return localizedPath(nextLang, rest.join("/"));
}
