"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { ITranslations } from "../i18n.types";

export interface I18nContextValue {
  locale: string;
  translations: Record<string, ITranslations>;
}

export const I18nContext = createContext<
  [I18nContextValue, Dispatch<SetStateAction<I18nContextValue>>] | undefined
>(undefined);
