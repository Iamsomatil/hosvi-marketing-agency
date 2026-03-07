import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Hosvi",
  description:
    "Hosvi terms of service for use of the website and referral coordination services.",
};

export default function TermsPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold">Terms of Service</h1>
        <p className="mt-4 text-slate-700">
          By using the Hosvi website and services, you agree to the following
          terms.
        </p>
        <div className="mt-8 space-y-8 text-slate-700">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              SMS Communications
            </h2>
            <p>
              By providing your phone number through forms on our website, you
              consent to receive SMS messages from Hosvi related to service
              updates, appointment confirmations, onboarding information, and
              other relevant communications.
            </p>
            <p>Message frequency may vary.</p>
            <p>Message and data rates may apply.</p>
            <p>
              You may opt out of receiving SMS messages at any time by replying
              STOP. For assistance, reply HELP.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              Carrier Disclaimer
            </h2>
            <p>Carriers are not liable for delayed or undelivered messages.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              Age Requirement
            </h2>
            <p>Users must be at least 18 years old to use our services.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              Customer Support
            </h2>
            <p>
              If you have any questions about these terms, you may contact us
              at:
            </p>
            <p>
              <a
                href="mailto:info@hosvi.com"
                className="text-cyan-700 hover:text-cyan-800"
              >
                info@hosvi.com
              </a>
              {" "}or{" "}
              <a
                href="mailto:support@hosvi.com"
                className="text-cyan-700 hover:text-cyan-800"
              >
                support@hosvi.com
              </a>
            </p>
            <p>
              <a
                href="https://www.hosvi.com"
                className="text-cyan-700 hover:text-cyan-800"
              >
                https://www.hosvi.com
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              Privacy Policy
            </h2>
            <p>
              Your use of our services is also governed by our Privacy Policy
              available at:
            </p>
            <p>
              <a
                href="https://www.hosvi.com/privacy-policy"
                className="text-cyan-700 hover:text-cyan-800"
              >
                https://www.hosvi.com/privacy-policy
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
