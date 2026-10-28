import { getTranslations } from "next-intl/server";

type Slot = {
  title: string;
  subtitle: string;
  modality: string;
  duration: string;
  status: string;
};

// Visual styling is language-independent and indexed to the slot order.
const badgeColors = [
  "bg-brand-lime text-brand-navy font-bold",
  "bg-brand-light border border-brand-border text-brand-navy font-bold",
  "bg-brand-light border border-brand-border text-brand-slate",
];

export default async function AvailabilitySection() {
  const t = await getTranslations("Availability");
  const slots = t.raw("slots") as Slot[];

  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-brand-border" id="disponibilidad">
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

      <div className="border-t border-brand-border divide-y divide-brand-border">
        {slots.map((slot, idx) => (
          <div
            key={idx}
            className="py-5 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-brand-light/60 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xl transition-colors"
          >
            <div className="md:w-1/4">
              <h3 className="font-display font-bold text-base sm:text-xl text-brand-navy uppercase">
                {slot.title}
              </h3>
              <span className="text-xs text-brand-slate font-mono">
                {slot.subtitle}
              </span>
            </div>
            <div className="flex justify-between md:contents">
              <div className="md:w-1/5 font-mono text-xs text-brand-slate">
                <div className="text-[9px] sm:text-[10px] uppercase text-brand-slate/70">{t("modality")}</div>
                <div className="text-brand-navy font-semibold text-xs">{slot.modality}</div>
              </div>
              <div className="md:w-1/5 font-mono text-xs text-brand-slate text-right md:text-left">
                <div className="text-[9px] sm:text-[10px] uppercase text-brand-slate/70">{t("duration")}</div>
                <div className="text-brand-navy font-semibold text-xs">{slot.duration}</div>
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-start md:w-1/6">
              <span className={`inline-block px-3 py-1 rounded-full font-mono text-[10px] sm:text-[11px] uppercase ${badgeColors[idx]}`}>
                {slot.status}
              </span>
            </div>
            <div className="md:w-auto pt-2 md:pt-0">
              <a
                href="#contacto"
                className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full border border-brand-navy text-xs font-mono uppercase tracking-wider font-bold text-brand-navy hover:bg-brand-navy hover:text-white transition-all"
              >
                <span>{t("reserve")}</span>
                <span className="material-symbols-outlined text-[14px]">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
