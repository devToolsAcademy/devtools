import { getTranslations } from "next-intl/server";

export default async function ManifestoSection() {
  const t = await getTranslations("Manifesto");

  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-16 sm:py-28" id="manifesto">
      <div className="max-w-4xl">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-slate block mb-3 sm:mb-4">
          {"// "}{t("eyebrow")}
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl uppercase leading-[0.95] tracking-tight text-brand-navy mb-6 sm:mb-8">
          {t("titleLine1")} <br />
          {t("titleLine2")}
        </h2>
        <p className="text-lg sm:text-2xl text-brand-slate leading-relaxed">
          {t.rich("body", {
            brand: (chunks) => <strong className="text-brand-navy">{chunks}</strong>,
            highlight: (chunks) => (
              <strong className="text-brand-navy font-bold">{chunks}</strong>
            ),
          })}
        </p>
      </div>
    </section>
  );
}
