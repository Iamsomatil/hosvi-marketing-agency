import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Hosvi | Marketing for Chiropractors",
  description:
    "Hosvi is a performance-driven marketing agency connecting chiropractors with qualified clients through outbound, CRM automation, and booked appointments.",
};

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              About Hosvi
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-300">
              We connect chiropractors with clients who are ready to book. Hosvi
              combines targeted outbound campaigns, conversion-first landing experiences,
              and a streamlined CRM to turn interest into appointments.
            </p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="border-t border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold">Who we serve</h2>
            <p className="mt-4 text-slate-700 dark:text-slate-300">
              Our focus is on growth-minded chiropractors who want predictable
              client acquisition without the headache. We help you consistently
              fill your calendar with qualified appointments, not "leads" you have to chase.
            </p>
            <ul className="mt-6 space-y-2 text-slate-700 dark:text-slate-300 list-disc pl-5">
              <li>Chiropractic clinics aiming to grow new patient starts</li>
              <li>Multi-location chiropractic practices improving patient flow</li>
              <li>Practices that value data, speed, and client experience</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-800/40">
            <h3 className="text-lg font-semibold">What makes us different</h3>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
              We don’t sell generic leads. We build a complete, closed-loop
              system that turns outreach into booked appointments—and revenue.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-3">Targeted outbound</div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-3">Conversion-first funnels</div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-3">CRM + automation</div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-3">Booked appointments</div>
            </div>
          </div>
        </div>
      </section>

      {/* How we help */}
      <section className="border-t border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-2xl font-bold">How we help you grow</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/40">
              <h3 className="font-semibold">Outbound that books</h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300 text-sm">
                Research-driven targeting and compliant cold outreach that
                generates real conversations and appointment-ready demand.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/40">
              <h3 className="font-semibold">Conversion-first journeys</h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300 text-sm">
                High-converting landing pages and booking flows designed
                specifically for cash-pay and high-intent prospects.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/40">
              <h3 className="font-semibold">CRM + automation</h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300 text-sm">
                Centralized tracking, instant follow-up, and smart reminders so
                no opportunity slips through the cracks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Hosvi */}
      <section className="border-t border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-2xl font-bold">Why clinics choose Hosvi</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
              <h3 className="font-semibold">Performance mindset</h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300 text-sm">
                We optimize for booked appointments and revenue—never vanity
                metrics.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
              <h3 className="font-semibold">Built for speed</h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300 text-sm">
                From launch to first bookings in days, not months.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
              <h3 className="font-semibold">Transparent reporting</h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300 text-sm">
                Clear pipeline visibility—see exactly where each opportunity is
                in the journey.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
              <h3 className="font-semibold">Patient experience first</h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300 text-sm">
                Messaging that respects your brand and delivers a premium client
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Ready to connect with more clients?
          </h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300">
            Start your 30-day free trial and see how Hosvi fills your calendar
            with qualified appointments.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href="/trial"
              className="inline-flex items-center px-5 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow"
            >
              Start Free Trial
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center px-5 py-3 rounded-md border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
