import { I18nProviderServer } from "@haykaghabekyan/i18n";

import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <I18nProviderServer locale={locale} namespaces={["header"]}>
          <Header />
          {children}
          <Footer />
        </I18nProviderServer>
      </body>
    </html>
  );
}
