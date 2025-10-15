"use client";

import { HeroSection } from "./home/HeroSection";
import { StatsSection } from "./home/StatsSection";
import { ServicesSection } from "./home/ServicesSection";
import { TestimonialsSection } from "./home/TestimonialsSection";
import { PricingSection } from "./home/PricingSection";
import { ContactSection } from "./home/ContactSection";
import { TrustStrip } from "./home/TrustStrip";
import { DashboardPreview } from "./home/DashboardPreview";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <ServicesSection />

      <StatsSection />

      <TrustStrip />

      <section
        aria-labelledby="dashboard-preview"
        className="py-12 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="dashboard-preview" className="sr-only">
            Dashboard preview
          </h2>
          <DashboardPreview />
        </div>
      </section>

      <TestimonialsSection />

      <PricingSection />

      <ContactSection />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-900 to-blue-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Grow Your Chiropractic Practice?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful chiropractors who trust Hosvi to fill
              their schedule with ideal patients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trial" className="btn btn-primary group">
                Start Your Free Trial
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#contact" className="btn btn-secondary">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
