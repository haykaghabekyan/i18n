"use client";

import { FC, ReactNode, useState } from "react";
import { I18nContext, I18nContextValue } from "./i18n.context";
import { ITranslations } from "../i18n.types";

interface IProps {
  children: ReactNode;
  locale: string;
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
