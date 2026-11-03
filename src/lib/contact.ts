import type { SiteSettings } from "../content/fallback";
import { defaultLang, siteName, type Lang } from "../i18n/ui";
import { useTranslations, type PageKey } from "../i18n/utils";

/**
 * Shop contact details for one language: what the client typed in Site Settings,
 * falling back to the built-in copy in i18n/ui.ts field by field.
 */
export function getContactDetails(settings: SiteSettings, lang: Lang) {
  const t = useTranslations(lang);
  return {
    address: settings.address?.trim() || t.contact.address,
    // Hours fall back to the Italian ones the client wrote before the built-in placeholder.
    hours: settings.hours?.[lang]?.trim() || settings.hours?.[defaultLang]?.trim() || t.contact.hours,
    email: settings.email?.trim() || t.contact.email,
    phone: settings.phone?.trim() || null,
  };
}

/** Legal identity for the footer and the privacy page. */
export function getBusinessDetails(settings: SiteSettings) {
  return {
    legalName: settings.legalName?.trim() || siteName,
    vatNumber: settings.vatNumber?.trim() || null,
  };
}

/** Google/browser title of a page: the client's own from Site Settings, else the default in ui.ts. */
export function getPageTitle(settings: SiteSettings, page: PageKey, lang: Lang) {
  const custom = page === "privacy" ? null : settings.seoTitles?.[page]?.[lang]?.trim();
  return custom || useTranslations(lang).seo[page];
}
