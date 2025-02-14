"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { i18nConfig } from "../i18n.config";

export interface ITranslations {
  [key: string]: string | ITranslations | Array<string | ITranslations>;
}

export interface I18nContextValue {
  locale: (typeof i18nConfig.locales)[number];
  translations: Record<string, ITranslations>;
}

export const I18nContext = createContext<
  [I18nContextValue, Dispatch<SetStateAction<I18nContextValue>>] | undefined
>(undefined);
