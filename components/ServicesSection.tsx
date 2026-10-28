import { getTranslations } from "next-intl/server";

type Service = {
  number: string;
  title: string;
  description: string;
  tags: string;
  timeframe: string;
  icon: string;
};

export default async function ServicesSection() {
  const t = await getTranslations("Services");
  const services = t.raw("items") as Service[];

  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-6 pb-16 sm:pb-28" id="servicios">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {services.map((service) => (
          <div
            key={service.number}
            className="group bg-white rounded-3xl p-5 sm:p-6 border border-brand-border hover:border-brand-navy transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-light border border-brand-border flex items-center justify-center text-brand-navy group-hover:bg-brand-lime transition-colors">
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
                    {service.icon}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-brand-light text-brand-navy">
                  {service.number}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-tight text-brand-navy mb-2 sm:mb-3">
                {service.title}
              </h3>
              <p className="text-brand-slate text-xs sm:text-sm leading-relaxed mb-6">
                {service.description}
              </p>
            </div>

            <div className="pt-4 border-t border-brand-border flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-brand-slate">
              <span>{service.tags}</span>
              <span className="text-brand-navy font-bold">{service.timeframe}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
