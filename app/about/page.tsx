import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Hosvi | Referral Coordination for Personal Injury Cases",
  description:
    "Hosvi provides referral coordination and case placement services for personal injury matters. We do not provide medical or legal services.",
};

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-900">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              About Hosvi
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              Hosvi provides referral coordination and case placement services for personal injury matters. We coordinate between personal injury law firms and treatment provider clinics to help clients receive timely, quality treatment.
            </p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-2xl font-bold mb-6">Our Service</h2>
          <p className="text-slate-700 mb-6">
            Hosvi acts as a referral coordination and case placement broker, connecting personal injury paralegals with treatment providers who accept personal injury cases. Our mission is to streamline the referral process and ensure clients access appropriate treatment quickly and efficiently.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-5 bg-slate-50">
              <h3 className="font-semibold mb-2">Personal Injury Law Firms</h3>
              <p className="text-sm text-slate-700">
                Streamlined referral process for client placements
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5 bg-slate-50">
              <h3 className="font-semibold mb-2">Chiropractor Clinics</h3>
              <p className="text-sm text-slate-700">
                Coordinated case placements from partner law firms
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5 bg-slate-50">
              <h3 className="font-semibold mb-2">Physical Therapy Clinics</h3>
              <p className="text-sm text-slate-700">
                Consistent referral stream of qualified cases
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="border-t border-slate-100 bg-amber-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-2xl font-bold mb-6">Important Disclaimer</h2>
          <div className="space-y-4 text-slate-700">
            <p>
              <strong>Hosvi does not provide medical services or legal services.</strong> We are a referral coordination and case placement broker only. All treatment recommendations, medical advice, and legal counsel must come from licensed medical professionals and attorneys.
            </p>
            <p>
              Hosvi facilitates introductions between law firms and treatment providers. We do not diagnose, treat, or provide any form of medical or legal advice. Treatment decisions are made solely by the client and their healthcare providers or attorneys.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-2xl font-bold mb-8">How It Works</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-full font-bold mb-4">
                1
              </div>
              <h3 className="font-semibold mb-3">Paralegal Submits</h3>
              <p className="text-sm text-slate-700">
                Personal injury paralegals provide client information and treatment needs through our coordination process.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-full font-bold mb-4">
                2
              </div>
              <h3 className="font-semibold mb-3">Hosvi Coordinates</h3>
              <p className="text-sm text-slate-700">
                We match with an appropriate treatment provider in our network of clinics.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-full font-bold mb-4">
                3
              </div>
              <h3 className="font-semibold mb-3">Clinic Engages</h3>
              <p className="text-sm text-slate-700">
                The treatment provider contacts the client to schedule and begin appropriate care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Interested in Partnership?
          </h2>
          <p className="mt-3 text-slate-700">
            Contact us to learn more about how Hosvi can help coordinate referrals for your organization.
          </p>
          <div className="mt-6">
            <Link
              href="/#contact"
              className="inline-flex items-center px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
