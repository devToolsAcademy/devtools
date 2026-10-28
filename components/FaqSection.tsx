import { getTranslations } from "next-intl/server";

type Faq = { q: string; a: string };

export default async function FaqSection() {
  const t = await getTranslations("Faq");
  const faqs = t.raw("items") as Faq[];

  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-brand-border" id="faq">
      <div className="max-w-3xl mb-8 sm:mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-slate block mb-2">
          {t("eyebrow")}
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-navy">
          {t("title")}
        </h2>
      </div>

      <div className="divide-y divide-brand-border border-y border-brand-border max-w-4xl">
        {faqs.map((faq, idx) => (
          <details key={idx} className="group py-5 sm:py-6 cursor-pointer">
            <summary className="flex items-center justify-between font-display font-bold text-base sm:text-xl text-brand-navy list-none select-none gap-4">
              <span>{faq.q}</span>
              <span className="material-symbols-outlined transition-transform duration-200 group-open:rotate-180 text-brand-slate text-[20px] sm:text-[24px] shrink-0">
                expand_more
              </span>
            </summary>
            <div className="pt-3 sm:pt-4 text-brand-slate text-xs sm:text-base leading-relaxed font-body">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
