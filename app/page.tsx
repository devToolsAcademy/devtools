"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SITE_URL } from "@/lib/site";

export default function RootRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const browserLang = navigator.language?.toLowerCase() ?? "";
    const target = browserLang.startsWith("en") ? "/en" : "/es";
    router.replace(target);
  }, [router]);

  return (
    <html lang="es">
      <head>
        <meta httpEquiv="refresh" content="0; url=/es" />
        <link rel="canonical" href={`${SITE_URL}/es`} />
      </head>
      <body className="bg-white" />
    </html>
  );
}

