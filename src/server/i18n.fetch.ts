"use server";

import path from "path";
import fs from "fs/promises";
import { ITranslations } from "../client/i18n.context";
import { i18nConfig } from "../i18n.config";

export async function fetchTranslations(
  locale: (typeof i18nConfig.locales)[number],
  namespaces: string | string[]
): Promise<Record<string, ITranslations>> {
  const namespaceArray = Array.isArray(namespaces) ? namespaces : [namespaces];

  const translations: Record<string, ITranslations> = {};

  await Promise.all(
    namespaceArray.map(async (namespace) => {
      const filePath = path.join(
        process.cwd(),
        "public",
        "locales",
        i18nConfig.locales.includes(locale) ? locale : i18nConfig.defaultLocale,
        `${namespace}.json`
      );

      try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        translations[namespace] = JSON.parse(fileContent);
      } catch (error: unknown) {
        console.error(`Error loading translation for ${namespace}:`, error);
      }
    })
  );

  return translations;
}
