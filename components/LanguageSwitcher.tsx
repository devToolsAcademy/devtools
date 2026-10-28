"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: (typeof routing.locales)[number]) => {
    if (next === locale) return;
    const hash = window.location.hash;
    startTransition(() => {
      router.replace(`${pathname}${hash}`, { locale: next });
    });
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`inline-flex items-center rounded-full border border-brand-border bg-brand-light p-0.5 font-mono text-[11px] font-bold uppercase ${
        isPending ? "opacity-60" : ""
      } ${className}`}
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-pressed={l === locale}
          aria-label={t(l)}
          lang={l}
          className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
            l === locale
              ? "bg-brand-navy text-white"
              : "text-brand-slate hover:text-brand-navy"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
