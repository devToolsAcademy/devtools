"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";

export default function CtaSection() {
  const t = useTranslations("Cta");
  const [submitted, setSubmitted] = useState(false);
  const serviceOptions = t.raw("serviceOptions") as string[];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 sm:py-16" id="contacto">
      <div className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-brand-navy text-white p-6 sm:p-12 lg:p-16 border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-deep/90 pointer-events-none"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          {/* Text and Headline */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 font-mono text-[10px] sm:text-[11px] text-brand-lime font-bold uppercase tracking-wider mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-lime animate-ping"></span>
              <span>{t("badge")}</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-6xl lg:text-7xl uppercase leading-[0.95] sm:leading-[0.92] tracking-tighter mb-4 sm:mb-6">
              {t("titleLine1")} <br />
              <span className="text-brand-lime">{t("titleHighlight")}</span> <br />
              {t("titleLine3")}
            </h2>
            <p className="text-gray-300 text-sm sm:text-lg max-w-xl leading-relaxed mb-6 sm:mb-8">
              {t("body")}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="mailto:contacto@devtools.tech"
                className="w-full sm:w-auto text-center px-6 py-3.5 sm:py-4 rounded-full bg-brand-lime text-brand-navy font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">
                  mail
                </span>
                <span>contacto@devtools.tech</span>
              </a>
            </div>
          </div>

          {/* Quick Form */}
          <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-brand-navy shadow-2xl">
            <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-tight mb-1 text-brand-navy">
              {t("formTitle")}
            </h3>
            <p className="text-xs text-brand-slate mb-5">
              {t("formSubtitle")}
            </p>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase font-bold text-brand-slate mb-1">
                  {t("nameLabel")}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t("namePlaceholder")}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-light text-brand-navy placeholder:text-brand-slate/60 text-xs sm:text-sm focus:border-brand-navy focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase font-bold text-brand-slate mb-1">
                  {t("emailLabel")}
                </label>
                <input
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-light text-brand-navy placeholder:text-brand-slate/60 text-xs sm:text-sm focus:border-brand-navy focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase font-bold text-brand-slate mb-1">
                  {t("serviceLabel")}
                </label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-light text-brand-navy text-xs sm:text-sm focus:border-brand-navy focus:outline-none">
                  {serviceOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-navy text-white hover:bg-brand-deep font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t("submit")}</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </button>

              {submitted && (
                <div className="p-3 rounded-lg bg-brand-lime/30 text-brand-navy font-mono text-xs text-center font-bold">
                  {t("success")}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
