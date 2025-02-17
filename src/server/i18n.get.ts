"use server";

import { i18nFn } from "../i18n.fn";
import { loadTranslations } from "./i18n.load-translations";

export async function getI18n(locale: string, namespaces: string[]) {
  const translations = await loadTranslations(locale, namespaces);

  return i18nFn(locale, translations);
}
