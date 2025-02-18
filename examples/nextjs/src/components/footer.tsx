"use client";

import { ChangeEvent } from "react";
import { i18nConfig, useI18n } from "@haykaghabekyan/i18n";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useI18n();

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newPathname = pathname.replace(locale, event.target.value);

    // Add query parameters back to the new URL
    const queryParams = searchParams.toString();
    const fullPath = queryParams
      ? `${newPathname}?${queryParams}`
      : newPathname;

    router.push(fullPath);
  };

  return (
    <footer>
      <select value={locale} onChange={handleLocaleChange}>
        {i18nConfig.locales.map((locale) => (
          <option key={locale} value={locale}>
            {locale}
          </option>
        ))}
      </select>
    </footer>
  );
}
