"use server";

import { ReactNode } from "react";
import { I18nProvider as I18nProviderCLient } from "../client/i18n.provider";
import { loadTranslations } from "./i18n.load-translations";

interface IProps {
  children: ReactNode;
  locale: string;
  namespaces: string[];
}

export async function I18nProvider({
  children,
  locale,
  namespaces,
}: Readonly<IProps>) {
  const translations = await loadTranslations(locale, namespaces);

  return (
    <I18nProviderCLient locale={locale} translations={translations}>
      {children}
    </I18nProviderCLient>
  );
}
