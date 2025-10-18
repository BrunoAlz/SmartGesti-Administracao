import React, { useEffect } from "react";
import SmartGestiNavbar from "@/landing-page/components/SmartGestiNavbar";
import SmartGestiLandingHero from "@/landing-page/components/SmartGestiLandingHero";
import FeaturesSection from "@/landing-page/components/FeaturesSection";
import AISection from "@/landing-page/components/AISection";
import IntegrationsSection from "@/landing-page/components/IntegrationsSection";
import TestimonialsSection from "@/landing-page/components/TestimonialsSection";
import PricingPreviewSection from "@/landing-page/components/PricingPreviewSection";
import Footer from "@/landing-page/components/Footer";

export default function SmartGestiLandingPage() {
  // SEO básico
  useEffect(() => {
    document.title = "SmartGesTI - Sistema Administrativo Inteligente";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Sistema administrativo completo para gestão inteligente. Dashboard avançado, relatórios em tempo real, automação de processos e muito mais. Acesse o painel administrativo!"
      );
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navbar */}
      <SmartGestiNavbar />

      {/* Main Content */}
      <div className="relative z-10">
        <div id="hero">
          <SmartGestiLandingHero />
        </div>
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="ai">
          <AISection />
        </div>
        <div id="integrations">
          <IntegrationsSection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <div id="pricing">
          <PricingPreviewSection />
        </div>
        <Footer />
      </div>
    </div>
  );
}
