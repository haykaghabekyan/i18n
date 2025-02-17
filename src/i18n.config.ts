export type I18nConfig = {
  locales: string[];
  defaultLocale: string;
  defaultNamespace: string;
};

const locales = (process.env.NEXT_PUBLIC_I18N_LOCALES ?? "en").split(",");
const defaultLocale = process.env.NEXT_PUBLIC_I18N_DEFAULT_LOCALE ?? locales[0];
const defaultNamespace =
  process.env.NEXT_PUBLIC_I18N_DEFAULT_NAMESPACE ?? "common";

// Fallback to defaults if user does not provide their own config
export const i18nConfig: I18nConfig = {
  locales,
  defaultLocale,
  defaultNamespace,
};
