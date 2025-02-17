"use client";

import { useContext } from "react";
import { I18nContext } from "./i18n.context";
import { i18nFn } from "../i18n.fn";

export function useI18n(): {
  locale: string;
  t: <T = string>(key: string, values?: Record<string, string | number>) => T;
  getLocalizedPath: (path: string) => string;
} {
  const context = useContext(I18nContext);

  if (context === undefined) {
    throw new Error("I18nContext.Provider is not used.");
  }

  const { locale, translations } = context[0];

  return i18nFn(locale, translations);
}
