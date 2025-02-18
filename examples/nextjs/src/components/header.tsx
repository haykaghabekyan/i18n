"use client";

import { useI18n } from "@haykaghabekyan/i18n";

export function Header() {
  const { t } = useI18n();

  return (
    <header>
      <div>{t("header:welcome", { name: "User" })}</div>
    </header>
  );
}
