import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Hosvi",
  description:
    "Hosvi terms of service for referral coordination and SMS communications.",
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold">Terms of Service</h1>
        <p className="mt-4 text-slate-700">
          By using Hosvi services and website forms, you agree to the terms
          below.
        </p>

        <div className="mt-8 space-y-8 text-slate-700">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">SMS Use</h2>
            <p>
              Hosvi may send SMS messages related to referral coordination,
              appointment scheduling, onboarding instructions, and service
              updates.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">Opt-Out</h2>
            <p>
              You can opt out of SMS messages at any time by replying STOP.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              Help / Support
            </h2>
            <p>
              Reply HELP for assistance or contact{" "}
              <a
                href="mailto:support@hosvi.com"
                className="text-cyan-700 hover:text-cyan-800"
              >
                support@hosvi.com
              </a>
              .
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              Message Rates
            </h2>
            <p>
              Message and data rates may apply depending on the user&apos;s
              mobile carrier plan.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              Carrier Disclaimer
            </h2>
            <p>Mobile carriers are not liable for delayed or undelivered messages.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
