import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="w-full border-t border-brand-border bg-white pt-12 sm:pt-16 pb-10 sm:pb-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-12 sm:pb-16">
          {/* Column 1: Brand */}
          <div className="md:col-span-5">
            <img
              src="/logotipo-1.png"
              alt={t("logoAlt")}
              className="h-12 sm:h-16 lg:h-20 w-auto object-contain mb-4"
            />
            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-brand-slate mb-3 sm:mb-4">
              {t("tagline")}
            </div>
            <p className="text-xs sm:text-sm text-brand-slate max-w-sm leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Column 2: Explore */}
          <div className="md:col-span-3">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-navy font-bold mb-3 sm:mb-4">
              {t("navTitle")}
            </div>
            <ul className="space-y-2 font-body text-xs text-brand-slate">
              <li>
                <a href="#servicios" className="hover:text-brand-navy transition-colors">
                  {t("nav.services")}
                </a>
              </li>
              <li>
                <a href="#metodologia" className="hover:text-brand-navy transition-colors">
                  {t("nav.methodology")}
                </a>
              </li>
              <li>
                <a href="#disponibilidad" className="hover:text-brand-navy transition-colors">
                  {t("nav.availability")}
                </a>
              </li>
              <li>
                <a href="#casos" className="hover:text-brand-navy transition-colors">
                  {t("nav.cases")}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-navy transition-colors">
                  {t("nav.faq")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-4">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-navy font-bold mb-3 sm:mb-4">
              {t("contactTitle")}
            </div>
            <p className="text-xs text-brand-slate leading-relaxed mb-3 sm:mb-4">
              {t("contactText")}
            </p>
            <div className="font-mono text-xs font-bold text-brand-navy">
              contacto@devtools.tech
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 sm:pt-8 border-t border-brand-border/60 text-center sm:text-left text-[11px] sm:text-xs font-mono text-brand-slate">
          © {new Date().getFullYear()} DevTools. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
