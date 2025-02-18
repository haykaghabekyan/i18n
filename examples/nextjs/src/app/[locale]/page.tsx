import { Metadata } from "next";
import { getI18n, I18nProviderServer } from "@haykaghabekyan/i18n";
import { HomePageClient } from "./page.client";

type Props = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const { t } = await getI18n(locale, ["home"]);

  return {
    title: t("home:metadata.title"),
    description: t("home:metadata.description"),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  return (
    <I18nProviderServer locale={locale} namespaces={["common", "home"]}>
      <HomePageClient />
    </I18nProviderServer>
  );
}
