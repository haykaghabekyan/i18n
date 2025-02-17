"use server";

import path from "path";
import fs from "fs/promises";
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
      const filePath = path.join(
        process.cwd(),
        "public",
        "locales",
        validLocale,
        `${namespace}.json`
      );

      try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        translations[namespace] = JSON.parse(fileContent);
      } catch (error: unknown) {
        console.error(`Failed to load ${namespace}:`, error);
      }
    })
  );

  return translations;
}
