import type { SiteSettings } from "../content/fallback";
import type { Lang } from "../i18n/ui";
import { useTranslations } from "../i18n/utils";

/**
 * Shop contact details for one language: what the client typed in Site Settings,
 * falling back to the built-in copy in i18n/ui.ts field by field.
 */
export function getContactDetails(settings: SiteSettings, lang: Lang) {
  const t = useTranslations(lang);
  return {
    address: settings.address?.trim() || t.contact.address,
    hours: settings.hours?.[lang]?.trim() || t.contact.hours,
    email: settings.email?.trim() || t.contact.email,
    phone: settings.phone?.trim() || null,
  };
}
