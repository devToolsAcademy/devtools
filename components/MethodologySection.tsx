import { getTranslations } from "next-intl/server";

type Step = {
  num: string;
  time: string;
  title: string;
  description: string;
  deliverable: string;
};

// The highlighted step is a visual choice, independent of language.
const ACTIVE_STEP_INDEX = 2;

export default async function MethodologySection() {
  const t = await getTranslations("Methodology");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-brand-border" id="metodologia">
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
        {steps.map((step, idx) => {
          const active = idx === ACTIVE_STEP_INDEX;
          return (
            <div
              key={step.num}
              className={`p-5 sm:p-6 rounded-3xl flex flex-col justify-between min-h-[280px] sm:min-h-[300px] h-full border-2 transition-all ${
                active
                  ? "bg-white border-brand-navy shadow-lg"
                  : "bg-brand-light border-brand-border"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy">
                    {step.num}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full font-mono text-[10px] sm:text-[11px] font-bold ${
                      active
                        ? "bg-brand-lime text-brand-navy"
                        : "bg-white border border-brand-border text-brand-slate"
                    }`}
                  >
                    {step.time}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg uppercase tracking-tight text-brand-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-slate leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="font-mono text-[10px] sm:text-[11px] text-brand-navy font-semibold flex items-center gap-1.5 pt-4 border-t border-brand-border/60 mt-4">
                <span className="material-symbols-outlined text-brand-lime text-[16px]">
                  task_alt
                </span>
                <span>{step.deliverable}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
