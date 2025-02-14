export * from "./i18n.config";

// Server exports
export { I18nProvider as I18nProviderServer } from "./server/i18n.provider";
export { fetchTranslations } from "./server/i18n.fetch";

// Client exports
export { I18nProvider as I18nProviderClient } from "./client/i18n.provider";
export { Trans } from "./client/trans";
export { useI18n } from "./client/i18n.hook";
export { I18nContext } from "./client/i18n.context";
