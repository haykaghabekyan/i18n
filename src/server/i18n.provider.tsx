"use server";

import { ReactNode } from "react";
import { I18nProvider as I18nProviderCLient } from "../client/i18n.provider";
import { i18nConfig } from "../i18n.config";
import { fetchTranslations } from "./i18n.fetch";

interface IProps {
  children: ReactNode;
  locale: (typeof i18nConfig.locales)[number];
  namespaces: string[];
}

export async function I18nProvider({
  children,
  locale,
  namespaces,
}: Readonly<IProps>) {
  const translations = await fetchTranslations(locale, namespaces);

  return (
    <I18nProviderCLient locale={locale} translations={translations}>
      {children}
    </I18nProviderCLient>
  );
}
