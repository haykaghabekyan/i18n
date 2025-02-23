import { i18nConfig } from "../i18n.config";
import { ITranslations } from "../i18n.types";

export async function loadTranslations(
  locale: string,
  namespaces: string[]
): Promise<Record<string, ITranslations>> {
  const translations: Record<string, ITranslations> = {};

  // Validate locale before processing
  const validLocale = i18nConfig.locales.includes(locale)
    ? locale
    : i18nConfig.defaultLocale;

  await Promise.all(
    namespaces.map(async (namespace) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/locales/${validLocale}/${namespace}.json`
      );
      if (!response.ok) {
        console.error(`Failed to load ${namespace}:`, response.statusText);
      }

      translations[namespace] = await response.json();
    })
  );

  return translations;
}
