import { getTranslations } from "next-intl/server";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

// The featured (lime) card is a visual choice, independent of language.
const FEATURED_INDEX = 1;

export default async function TestimonialsSection() {
  const t = await getTranslations("Testimonials");
  const testimonials = t.raw("items") as Testimonial[];

  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-brand-border">
      <div className="mb-8 sm:mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-slate block mb-2">
          {t("eyebrow")}
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-6xl uppercase tracking-tight text-brand-navy">
          {t("title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {testimonials.map((item, idx) => {
          const featured = idx === FEATURED_INDEX;
          return (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-3xl flex flex-col justify-between ${
                featured
                  ? "bg-brand-lime border border-brand-lime shadow-lg"
                  : "bg-white border border-brand-border shadow-sm"
              }`}
            >
              <p
                className={`text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8 ${
                  featured
                    ? "text-brand-navy font-medium"
                    : "text-brand-navy font-normal"
                }`}
              >
                {item.quote}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold font-mono text-xs ${
                    featured
                      ? "bg-brand-navy text-white"
                      : "bg-brand-light border border-brand-border text-brand-navy"
                  }`}
                >
                  {item.initials}
                </div>
                <div>
                  <div className="font-display font-bold text-xs sm:text-sm text-brand-navy">
                    {item.name}
                  </div>
                  <div
                    className={`font-mono text-[11px] ${
                      featured ? "text-brand-navy/70" : "text-brand-slate"
                    }`}
                  >
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
