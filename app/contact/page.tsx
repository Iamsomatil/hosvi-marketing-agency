import type { Metadata } from "next";
import { ContactSection } from "../home/ContactSection";

export const metadata: Metadata = {
  title: "Contact Hosvi",
  description: "Contact Hosvi for referral coordination and onboarding support.",
};

export default function ContactPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-16 pb-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Contact Hosvi</h1>
        <p className="mt-4 text-slate-700">Business Name: Hosvi</p>
        <p className="mt-2 text-slate-700">
          Complete the form below for referral coordination and service support.
        </p>
      </section>
      <ContactSection />
    </div>
  );
}
