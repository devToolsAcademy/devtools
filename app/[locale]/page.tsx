import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeTicker from "@/components/MarqueeTicker";
import ManifestoSection from "@/components/ManifestoSection";
import ServicesSection from "@/components/ServicesSection";
import AvailabilitySection from "@/components/AvailabilitySection";
import MethodologySection from "@/components/MethodologySection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import ScrollCanvasSequence from "@/components/ScrollCanvasSequence";
import ScrollReveal from "@/components/ScrollReveal";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20 relative">
        {/* Interactive Scroll Sequence Container spanning main sections */}
        <div className="relative">
          <ScrollCanvasSequence frameCount={240} />
          
          <div className="relative z-10">
            <HeroSection />
            <ScrollReveal>
              <MarqueeTicker />
            </ScrollReveal>
            <ScrollReveal>
              <ManifestoSection />
            </ScrollReveal>
            <ScrollReveal>
              <ServicesSection />
            </ScrollReveal>
            <ScrollReveal>
              <AvailabilitySection />
            </ScrollReveal>
            <ScrollReveal>
              <MethodologySection />
            </ScrollReveal>
            <ScrollReveal>
              <CaseStudiesSection />
            </ScrollReveal>
            <ScrollReveal>
              <TestimonialsSection />
            </ScrollReveal>
            <ScrollReveal>
              <FaqSection />
            </ScrollReveal>
            <ScrollReveal>
              <CtaSection />
            </ScrollReveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
