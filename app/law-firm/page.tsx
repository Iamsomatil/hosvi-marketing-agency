import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Personal Injury Law Firms | Hosvi",
  description:
    "Structured medical placement coordination without administrative friction for personal injury law firms.",
};

const whatYouGain = [
  "Reduced administrative coordination",
  "Structured provider connections",
  "Clear placement framework",
  "Faster scheduling initiation",
];

export default function LawFirmPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-800 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-cyan-100 font-semibold tracking-wide uppercase text-sm">
                For Personal Injury Law Firms
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold mt-3 leading-tight">
                Structured medical placement coordination without
                administrative friction.
              </h1>
              <p className="mt-4 text-sky-100 text-lg">
                Hosvi provides structured medical placement coordination for
                personal injury matters. We connect legal teams with independent
                treatment providers experienced in handling PI cases and
                facilitate the placement process from introduction to
                scheduling.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center px-6 py-3 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition-colors"
                >
                  Contact Hosvi
                </Link>
                <Link
                  href="/clinic"
                  className="inline-flex items-center px-6 py-3 rounded-md border border-white/40 hover:bg-white/10 text-white font-semibold transition-colors"
                >
                  View Clinic Page
                </Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl mx-auto max-w-2xl">
              <Image
                src="/images/law-firm/team-updated.jpg"
                alt="Law firm operations"
                width={2200}
                height={1468}
                className="w-full h-auto object-cover"
                priority
                quality={72}
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">How Hosvi Supports Your Firm</h2>
          <div className="grid gap-6">
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-semibold mb-3">Structured Coordination</h3>
              <p>
                Our focus is simple: reduce administrative friction while
                maintaining a clear, professional structure between firms and
                clinics. We coordinate placement so your team can stay focused
                on case management and client advocacy.
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-semibold mb-3">Neutral Role</h3>
              <p>
                Hosvi operates as a neutral coordination network. We do not
                provide legal or medical services, and all treatment decisions
                remain between the client and the licensed provider.
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
              <h3 className="text-xl font-semibold mb-3">Ready to Connect</h3>
              <p>
                If your firm is seeking a more efficient way to coordinate
                treatment placement, our team is ready to connect.
              </p>
            </article>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg mx-auto max-w-xl">
              <Image
                src="/images/law-firm/hero-placeholder.png"
                alt="Law firm team"
                width={1536}
                height={1024}
                className="w-full h-auto object-cover"
                quality={70}
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
              <h3 className="text-xl font-semibold mb-4">
                Next Step
              </h3>
              <p>
                Speak with our team to start structured treatment placement
                coordination for your PI cases.
              </p>
              <Link
                href="/#contact"
                className="mt-6 inline-flex items-center px-5 py-3 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white font-medium transition-colors"
              >
                Speak with Hosvi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
