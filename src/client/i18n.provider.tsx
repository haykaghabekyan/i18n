"use client";

import { FC, ReactNode, useState } from "react";
import { I18nContext, I18nContextValue, ITranslations } from "./i18n.context";
import { i18nConfig } from "../i18n.config";

interface IProps {
  children: ReactNode;
  locale: (typeof i18nConfig.locales)[number];
  translations: Record<string, ITranslations>;
}

export const I18nProvider: FC<IProps> = ({
  children,
  locale,
  translations,
}) => {
  const value = useState<I18nContextValue>({
    locale,
    translations,
  });

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
