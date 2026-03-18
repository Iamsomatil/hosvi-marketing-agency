import type { Metadata } from "next";
import Link from "next/link";

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
            <h2 className="text-xl font-semibold text-slate-900">SMS Terms</h2>
            <p>
              By opting in, you agree to receive SMS messages from Hosvi LLC related to referral coordination services, including referral coordination updates, appointment scheduling, onboarding instructions, and case status notifications.  You can cancel the SMS service at any time by texting “STOP” to +1 (754) 310-5950. After sending “STOP,” you will receive a confirmation message and will no longer receive SMS communications.  If you are experiencing issues with the messaging program, reply HELP or contact us at info@hosvi.com.  Carriers are not liable for delayed or undelivered messages.  Message and data rates may apply. Message frequency may vary.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              Customer Support
            </h2>
            <p>
              If you have any questions about these terms, you may contact Hosvi LLC at:
            </p>
            <p>6421 N. Florida Ave Suite D-1130, Tampa, FL 33604</p>
            <p>
              Email:{" "}
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
              Phone:{" "}
              <a
                href="tel:+17543105950"
                className="text-cyan-700 hover:text-cyan-800"
              >
                +1 (754) 310-5950
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
              <Link
                href="/privacy-policy"
                className="text-cyan-700 hover:text-cyan-800"
              >
                https://www.hosvi.com/privacy-policy
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
