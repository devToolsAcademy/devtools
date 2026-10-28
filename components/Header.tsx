"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const t = useTranslations("Header");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-brand-border/80">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo: Logotipo on Desktop, Isotipo + Text on Mobile */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          {/* Desktop Logo */}
          <img
            src="/logotipo-1.png"
            alt={t("logoAlt")}
            className="hidden sm:block h-11 sm:h-12 lg:h-14 w-auto object-contain"
          />
          {/* Mobile Logo */}
          <div className="flex sm:hidden items-center gap-2.5 font-display font-black text-2xl tracking-tighter text-brand-navy">
            <img
              src="/isotipo-1.png"
              alt={t("isotypeAlt")}
              className="h-9 w-auto object-contain"
            />
            <span>DEVTOOLS</span>
            <span className="text-brand-slate text-xs font-mono tracking-widest font-normal">
              {"//"} SDLC
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs uppercase tracking-wider text-brand-slate">
          <a
            href="#servicios"
            className="hover:text-brand-navy transition-colors"
          >
            {t("nav.services")}
          </a>
          <a
            href="#disponibilidad"
            className="hover:text-brand-navy transition-colors"
          >
            {t("nav.availability")}
          </a>
          <a
            href="#metodologia"
            className="hover:text-brand-navy transition-colors"
          >
            {t("nav.methodology")}
          </a>
          <a href="#casos" className="hover:text-brand-navy transition-colors">
            {t("nav.cases")}
          </a>
          <a href="#faq" className="hover:text-brand-navy transition-colors">
            {t("nav.faq")}
          </a>
        </nav>

        {/* Right CTAs & Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-light border border-brand-border">
            <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></span>
            <span className="font-mono text-[11px] text-brand-navy font-medium">
              {t("slotsBadge")}
            </span>
          </div>
          <LanguageSwitcher />
          <a
            href="#contacto"
            className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-brand-lime text-brand-navy font-display font-bold text-xs uppercase tracking-wider hover:opacity-95 hover:shadow-lg transition-all"
          >
            <span>{t("cta")}</span>
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </a>

          {/* Hamburger Icon Button for Mobile */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={t("openMenu")}
            className="md:hidden p-2 rounded-xl text-brand-navy hover:bg-brand-light transition-colors focus:outline-none"
          >
            <span className="material-symbols-outlined text-[26px] block">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-white px-6 pt-6 pb-8 flex flex-col gap-6 overflow-y-auto transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-3 py-2 rounded-full bg-brand-light border border-brand-border w-fit">
          <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></span>
          <span className="font-mono text-[11px] text-brand-navy font-medium">
            {t("slotsBadgeMobile")}
          </span>
        </div>

        <nav className="flex flex-col gap-4 font-mono text-sm uppercase tracking-wider text-brand-navy font-semibold flex-grow">
          <a
            href="#servicios"
            onClick={closeMenu}
            className="py-2 border-b border-brand-border/40 hover:text-brand-slate transition-colors flex items-center justify-between"
          >
            <span>{t("nav.services")}</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
          </a>
          <a
            href="#disponibilidad"
            onClick={closeMenu}
            className="py-2 border-b border-brand-border/40 hover:text-brand-slate transition-colors flex items-center justify-between"
          >
            <span>{t("nav.availability")}</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
          </a>
          <a
            href="#metodologia"
            onClick={closeMenu}
            className="py-2 border-b border-brand-border/40 hover:text-brand-slate transition-colors flex items-center justify-between"
          >
            <span>{t("nav.methodology")}</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
          </a>
          <a
            href="#casos"
            onClick={closeMenu}
            className="py-2 border-b border-brand-border/40 hover:text-brand-slate transition-colors flex items-center justify-between"
          >
            <span>{t("nav.cases")}</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
          </a>
          <a
            href="#faq"
            onClick={closeMenu}
            className="py-2 border-b border-brand-border/40 hover:text-brand-slate transition-colors flex items-center justify-between"
          >
            <span>{t("nav.faq")}</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
          </a>
        </nav>

        <LanguageSwitcher className="self-start" />


        <a
          href="#contacto"
          onClick={closeMenu}
          className="w-full text-center py-4 rounded-full bg-brand-lime text-brand-navy font-display font-bold text-[13px] uppercase tracking-wider shadow-md flex items-center justify-center gap-2 mt-auto mb-4"
        >
          <span>{t("ctaMobile")}</span>
          <span className="material-symbols-outlined text-[16px]">
            arrow_forward
          </span>
        </a>
      </div>
    </header>
  );
}
