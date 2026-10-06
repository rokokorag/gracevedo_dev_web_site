import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from "astro:i18n";
import es from "./locales/es.json";
import en from "./locales/en.json";

export type Locale = "es" | "en";

export const locales: Locale[] = ["en", "es"];
export const defaultLocale: Locale = "en";

// Typed against `en` so a key missing from `es.json` fails `astro check`.
const translations: Record<Locale, typeof en> = { es, en };

export function useTranslations(lang: Locale) {
  return translations[lang];
}

export type Translations = typeof en;

export function localeUrl(lang: Locale, path = "") {
  return getRelativeLocaleUrl(lang, path);
}

export function absoluteLocaleUrl(lang: Locale, path = "") {
  return getAbsoluteLocaleUrl(lang, path);
}

export function formatMonthYear(date: string, lang: Locale) {
  // Dates are "YYYY-MM"; build them in UTC so the month never shifts with the timezone.
  const [year, month] = date.split("-").map(Number);
  return new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1)));
}
