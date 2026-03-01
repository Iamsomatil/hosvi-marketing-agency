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
              Hosvi streamlines medical placement for personal injury law firms by connecting legal teams with treatment providers who accept PI cases. Our focus is fast scheduling, structured coordination, and reliable access to care for injured clients.
            </p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-2xl font-bold mb-6">Our Service</h2>
          <p className="text-slate-700 mb-6">
            Hosvi coordinates medical placement for personal injury law firms, connecting legal teams with treatment providers who accept PI cases. We streamline the referral process so injured clients are placed quickly, professionally, and without administrative friction.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-5 bg-slate-50">
              <h3 className="text-[15px] font-semibold mb-2">
                Speak with our team about joining the Hosvi medical placement network.
              </h3>
            </div>
            <div className="rounded-xl border border-slate-200 p-5 bg-slate-50">
              <h3 className="text-[15px] font-semibold mb-2">
                Structured case placements from verified legal partners
              </h3>
            </div>
            <div className="rounded-xl border border-slate-200 p-5 bg-slate-50">
              <h3 className="text-[15px] font-semibold mb-2">
                Consistent stream of qualified personal injury cases
              </h3>
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
              <strong>Hosvi does not provide medical or legal services.</strong>  Hosvi operates as a medical placement coordination network connecting personal injury law firms with independent treatment providers.
 <br />Hosvi does not diagnose, treat, provide medical advice, offer legal counsel, or make treatment recommendations. <br /><br />All medical and legal decisions are made solely between the client and their licensed healthcare providers or attorneys.
Treatment providers within the Hosvi network are independent entities and are not employees, partners, or agents of Hosvi.
            </p>
            <p>
              Hosvi facilitates introductions and coordination only. Any care, treatment plans, legal strategies, or professional services are the sole responsibility of the respective licensed professionals and the client.
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
              <h3 className="font-semibold mb-3">Legal Team Submits Case</h3>
              <p className="text-sm text-slate-700">
                Attorneys and case managers submit client details and treatment requirements.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-full font-bold mb-4">
                2
              </div>
              <h3 className="font-semibold mb-3">Hosvi Manages Placement</h3>
              <p className="text-sm text-slate-700">
                We connect the client with a qualified treatment provider in our network.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-full font-bold mb-4">
                3
              </div>
              <h3 className="font-semibold mb-3">Clinic Schedules the Client</h3>
              <p className="text-sm text-slate-700">
                The treatment provider contacts the client directly to schedule treatment.
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
            Speak with our team about joining Hosvi medical placement network.
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
