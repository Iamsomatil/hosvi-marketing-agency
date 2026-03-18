import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Treatment Providers | Hosvi",
  description:
    "Structured case placement coordination for chiropractors and physical therapy clinics.",
};

const whatYouGain = [
  "Qualified personal injury case placements",
  "Structured coordination with partner law firms",
  "Clear communication framework",
  "Consistent placement process",
];

export default function ClinicPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-800 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-cyan-100 font-semibold tracking-wide uppercase text-sm">
                For Treatment Providers
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold mt-3 leading-tight">
                Structured case placement coordination for chiropractors and
                physical therapy clinics.
              </h1>
              <p className="mt-4 text-sky-100 text-lg">
                Hosvi connects independent treatment providers with personal
                injury law firms seeking structured medical placement
                coordination. We facilitate introductions and manage the
                placement process from referral to scheduling.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center px-6 py-3 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition-colors"
                >
                  Contact Hosvi
                </Link>
                <Link
                  href="/law-firm"
                  className="inline-flex items-center px-6 py-3 rounded-md border border-white/40 hover:bg-white/10 text-white font-semibold transition-colors"
                >
                  View Law Firm Page
                </Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <Image
                src="/images/clinic/hero-placeholder.jpg"
                alt="Clinic treatment facility"
                width={3840}
                height={5760}
                className="w-full h-auto"
                priority
                quality={72}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">How Hosvi Supports Clinics</h2>
          <div className="grid gap-6">
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-semibold mb-3">Structured Coordination</h3>
              <p>
                Our focus is simple: provide a clear, organized framework for
                receiving personal injury cases without the need for marketing
                or outreach. Clinics maintain full independence while benefiting
                from coordinated case placement.
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-semibold mb-3">
                Independent Clinical Control
              </h3>
              <p>
                Hosvi does not provide medical services, control treatment
                decisions, or manage patient care.
              </p>
              <p className="mt-3">
                All medical services remain solely between the provider and the
                client.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <article className="rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-semibold mb-3">What You Gain</h3>
              <ul className="mt-4 space-y-2 list-disc list-inside text-slate-700">
                {whatYouGain.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-slate-200 p-6 bg-slate-50">
              <h3 className="text-xl font-semibold mb-3">Ready to Partner</h3>
              <p>
                If your clinic accepts personal injury cases and is prepared to
                engage clients promptly, our team is ready to discuss
                partnership.
              </p>
            </article>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
              <Image
                src="/images/clinic/facility-placeholder.jpg"
                alt="Treatment facility"
                width={5464}
                height={3643}
                className="w-full h-auto"
                quality={70}
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
              <h3 className="text-xl font-semibold mb-4">
                Next Step
              </h3>
              <p>
                Connect with Hosvi to discuss case placement coordination for
                your clinic.
              </p>
              <Link
                href="/#contact"
                className="mt-6 inline-flex items-center px-5 py-3 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white font-medium transition-colors"
              >
                Join the Network
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
