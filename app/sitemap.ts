import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // One entry per locale; each lists all language alternates (hreflang) incl. x-default.
  const languages = {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}`]),
    ),
    "x-default": `${SITE_URL}/${routing.defaultLocale}`,
  };

  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }));
}
