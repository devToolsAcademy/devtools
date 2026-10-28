import { getTranslations } from "next-intl/server";

type SecondaryCase = { label: string; title: string; description: string };

export default async function CaseStudiesSection() {
  const t = await getTranslations("CaseStudies");
  const secondary = t.raw("secondary") as SecondaryCase[];

  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-brand-border" id="casos">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-slate block mb-2">
            {t("eyebrow")}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-navy">
            {t("title")}
          </h2>
        </div>
        <p className="text-brand-slate max-w-md text-sm sm:text-base leading-relaxed">
          {t("intro")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Case Card */}
        <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[420px] rounded-3xl overflow-hidden bg-brand-navy p-6 sm:p-10 flex flex-col justify-end text-white border border-brand-border group">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-deep/80"></div>
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4 font-mono text-[10px] sm:text-xs uppercase tracking-wider">
              <span className="px-2.5 py-1 rounded-full bg-brand-lime text-brand-navy font-bold">
                {t("mainTag")}
              </span>
              <span className="text-brand-slate">{t("mainDelivery")}</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight mb-2 sm:mb-3">
              {t("mainTitle")}
            </h3>
            <p className="text-gray-300 text-xs sm:text-base max-w-xl mb-6">
              {t("mainQuote")}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-lime flex items-center justify-center font-bold text-brand-navy font-mono text-xs sm:text-sm">
                {t("mainAuthorInitials")}
              </div>
              <div>
                <div className="font-display font-bold text-xs sm:text-sm">{t("mainAuthorName")}</div>
                <div className="font-mono text-[11px] text-brand-slate">
                  {t("mainAuthorRole")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stacked Cases */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {secondary.map((item, idx) => (
            <div
              key={idx}
              className={`relative min-h-[180px] sm:min-h-[200px] rounded-3xl overflow-hidden p-6 sm:p-7 flex flex-col justify-end text-white border border-brand-border group ${
                idx % 2 === 0 ? "bg-brand-deep" : "bg-brand-navy"
              }`}
            >
              <div className="relative z-10">
                <div className="font-mono text-[10px] sm:text-[11px] text-brand-lime uppercase tracking-wider font-bold mb-1">
                  {item.label}
                </div>
                <h4 className="font-display font-bold text-lg sm:text-xl uppercase tracking-tight mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
