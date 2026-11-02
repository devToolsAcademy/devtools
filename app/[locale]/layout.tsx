import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const OG_LOCALES: Record<string, string> = { es: "es_CO", en: "en_MT" };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    authors: [{ name: "DevTools Team" }],
    creator: "DevTools",
    publisher: "DevTools",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
        "x-default": "/es",
      },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALES[locale] ?? "es_CO",
      alternateLocale: Object.entries(OG_LOCALES)
        .filter(([key]) => key !== locale)
        .map(([, value]) => value),
      url: `${SITE_URL}/${locale}`,
      title: t("titleDefault"),
      description: t("ogDescription"),
      siteName: "DevTools",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "DevTools",
    description:
      locale === "es"
        ? "Estudio de ingeniería de software especializado en el desarrollo a medida, arquitectura escalable y ciclo de vida integral (SDLC)."
        : "Software engineering studio specializing in custom development, scalable architecture, and end-to-end SDLC.",
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/logotipo-1.png`,
    image: `${SITE_URL}/logotipo-1.png`,
    email: "info@devtoolsgroup.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MT", // Malta (Registered HQ)
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Colombia",
      },
      {
        "@type": "Country",
        name: "Malta",
      },
      {
        "@type": "AdministrativeArea",
        name: "European Union",
      },
    ],
    knowsLanguage: ["es", "en"],
    priceRange: "$$$",
    sameAs: [],
  };

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${plusJakarta.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-brand-navy antialiased selection:bg-brand-lime selection:text-brand-navy">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
