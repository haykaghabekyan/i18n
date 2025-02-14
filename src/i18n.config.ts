export type I18nConfig = {
  locales: string[];
  defaultLocale: string;
  defaultNamespace: string;
};

const locales = process.env.I18N_LOCALES ?? "";

// Fallback to defaults if user does not provide their own config
export const i18nConfig: I18nConfig = {
  locales: locales.split(","),
  defaultLocale: process.env.I18N_DEFAULT_LOCALE as string,
  defaultNamespace: process.env.I18N_DEFAULT_NAMESPACE as string,
};
