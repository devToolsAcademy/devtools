import { getTranslations } from "next-intl/server";

export default async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-6 sm:pt-16 pb-10 sm:pb-12 flex flex-col gap-6 sm:gap-8">
      {/* Hero Visual Card: 1st on mobile, 2nd on desktop */}
      <div className="order-1 lg:order-2 relative w-full min-h-[560px] sm:min-h-[280px] lg:h-[520px] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-brand-deep shadow-2xl border border-brand-border p-6 sm:p-8 flex flex-col justify-between animate-fade-up delay-200">
        {/* Background Overlays & Brand Line Accents */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-brand-deep to-brand-navy pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

        {/* Technical Status Badge */}
        <div className="relative sm:absolute sm:top-8 sm:right-8 bg-brand-navy/90 backdrop-blur-md text-white border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl w-full sm:max-w-xs z-10 mb-6 sm:mb-0 animate-fade-up delay-300">
          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-brand-lime font-bold mb-1">
            {t("metricsEyebrow")}
          </div>
          <div className="font-display font-bold text-lg sm:text-2xl tracking-tight text-white mb-2 sm:mb-3">
            {t("metricsTitle")}
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center font-mono">
            <div>
              <div className="text-[9px] sm:text-[10px] text-brand-slate uppercase">{t("timeToMarket")}</div>
              <div className="text-xs sm:text-sm font-bold text-brand-lime">2.5x</div>
            </div>
            <div>
              <div className="text-[9px] sm:text-[10px] text-brand-slate uppercase">{t("uptime")}</div>
              <div className="text-xs sm:text-sm font-bold text-white">99.99%</div>
            </div>
            <div>
              <div className="text-[9px] sm:text-[10px] text-brand-slate uppercase">{t("coverage")}</div>
              <div className="text-xs sm:text-sm font-bold text-white">100%</div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="relative sm:absolute sm:bottom-8 sm:left-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 z-10 w-full sm:w-auto mt-auto sm:mt-0 animate-fade-up delay-400">
          <a
            href="#contacto"
            className="px-6 py-3.5 rounded-full bg-brand-lime text-brand-navy font-display font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>{t("ctaPrimary")}</span>
            <span className="material-symbols-outlined text-[18px]">
              east
            </span>
          </a>
          <a
            href="#servicios"
            className="px-5 py-3.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 font-mono text-xs uppercase tracking-wider hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-brand-lime text-[18px]">
              terminal
            </span>
            <span>{t("ctaSecondary")}</span>
          </a>
        </div>
      </div>

      {/* Top Row: Titular monumental + Subtítulo: 2nd on mobile, 1st on desktop */}
      <div className="order-2 lg:order-1 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end">
        <div className="lg:col-span-8 animate-fade-up">
          <h1 className="font-display font-extrabold text-3xl sm:text-6xl lg:text-[90px] leading-[0.95] sm:leading-[0.92] tracking-tighter uppercase text-brand-navy">
            {t("titleLine1")} <br />
            {t("titleLine2")}
          </h1>
        </div>
        <div className="lg:col-span-4 pb-1 sm:pb-2 animate-fade-up delay-150">
          <p className="text-brand-slate text-sm sm:text-lg leading-relaxed">
            {t.rich("intro", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-navy text-white font-mono text-[11px] sm:text-xs uppercase font-medium tracking-wider">
              {t("pillLifecycle")}
            </span>
            <span className="inline-block px-3 py-1 rounded-full bg-brand-lime text-brand-navy font-mono text-[11px] sm:text-xs uppercase font-bold tracking-wider">
              {t("pillSprints")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
