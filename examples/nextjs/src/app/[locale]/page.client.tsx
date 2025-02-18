"use client";

import { Trans, useI18n } from "@haykaghabekyan/i18n";

export function HomePageClient() {
  const { t } = useI18n();

  return (
    <main>
      <div>{t("common:home")}</div>
      <div>
        <Trans
          i18nKey='home:component'
          components={{
            clickable: (
              <button onClick={() => alert("clicked")}>
                {t("home:click-me")}
              </button>
            ),
          }}
        />
      </div>
    </main>
  );
}
