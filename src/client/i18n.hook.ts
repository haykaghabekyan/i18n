"use client";

import { useContext } from "react";

import { I18nContext, ITranslations } from "./i18n.context";
import { i18nConfig } from "../i18n.config";

export function useI18n(): {
  locale: (typeof i18nConfig.locales)[number];
  t: <T = string>(key: string, values?: Record<string, string | number>) => T;
  getLocalizedPath: (path: string) => string;
} {
  const context = useContext(I18nContext);

  if (context === undefined) {
    throw new Error("I18nContext.Provider is not used.");
  }

  const { locale, translations } = context[0];

  return {
    locale,
    t: <T = string>(
      key: string,
      values: Record<string, string | number> = {}
    ): T => {
      const [namespace, identifier] = key.includes(":")
        ? key.split(":")
        : [i18nConfig.defaultNamespace, key];

      if (!translations) {
        throw new Error("Translations are not loaded.");
      }

      const value = identifier.split(".").reduce<unknown>((acc, part) => {
        if (acc && typeof acc === "object" && part in acc) {
          return (acc as ITranslations)[part];
        }
        return undefined;
      }, translations?.[namespace] as unknown);

      if (typeof value === "string") {
        return Object.keys(values).reduce((translatedString, key) => {
          const placeholder = `{{${key}}}`;
          const value = values[key];
          return translatedString.replace(
            new RegExp(placeholder, "g"),
            String(value)
          );
        }, value) as T;
      }

      if (!value) {
        return key as T;
      }

      return value as T;
    },
    getLocalizedPath: (path: string) => {
      const normalizedPath = path.startsWith("/") ? path : `/${path}`;
      return `/${locale}${normalizedPath}`;
    },
  };
}
