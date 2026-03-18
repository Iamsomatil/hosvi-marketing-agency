import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Hosvi",
  description:
    "Terms of Service for Hosvi LLC covering referral coordination services and SMS program terms.",
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Terms of Service – Hosvi LLC
        </h1>

        <div className="mt-8 space-y-8 text-slate-700">
          <div className="space-y-3">
            <p>
              Welcome to Hosvi LLC. By using our website or services, you agree
              to the following Terms of Service.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Service Description
            </h2>
            <p>
              Hosvi LLC operates as a medical referral coordination platform
              that facilitates structured case placement opportunities between
              participating law firms and healthcare providers.
            </p>
            <p>
              Hosvi provides coordination services including referral
              introductions, onboarding support, appointment coordination, and
              case-related communication. Hosvi does not provide medical or
              legal services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              SMS Program Description
            </h2>
            <p>
              By opting in through our website forms, you agree to receive SMS
              messages from Hosvi LLC related to:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Referral coordination updates</li>
              <li>Appointment scheduling</li>
              <li>Onboarding instructions</li>
              <li>Case status notifications</li>
            </ul>
            <p>
              These messages are intended to support users who request medical
              referral coordination services through our website.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Opt-Out Instructions
            </h2>
            <p>
              You can cancel the SMS service at any time. Just text "STOP" to
              +1 (754) 310-5950. After you send the SMS message "STOP" to us, we
              will send you a confirmation message to confirm that you have been
              unsubscribed. After this, you will no longer receive SMS messages
              from us. If you want to join again, just sign up as you did the
              first time and we will start sending SMS messages to you again.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">Support</h2>
            <p>
              If you are experiencing issues with the messaging program, you can
              reply with the keyword HELP for more assistance, or you can get
              help directly at:
            </p>
            <p>Email: info@hosvi.com</p>
            <p>Phone: +1 (754) 310-5950</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Carrier Disclaimer
            </h2>
            <p>Carriers are not liable for delayed or undelivered messages.</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Message Frequency and Rates
            </h2>
            <p>
              Message frequency may vary. Message and data rates may apply for
              any messages sent to you from us and to us from you. If you have
              any questions about your text plan or data plan, it is best to
              contact your wireless provider.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Age Restriction
            </h2>
            <p>You must be 18 years or older to use this service.</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Professional Independence
            </h2>
            <p>
              Participation in the Hosvi network does not create an employment
              relationship, partnership, joint venture, or agency relationship.
              Each participating organization remains solely responsible for its
              own professional services, compliance obligations, and operational
              decisions.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              No Guarantees
            </h2>
            <p>
              Hosvi does not guarantee case outcomes, case volume, or case
              placement frequency.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Privacy Policy
            </h2>
            <p>If you have any questions regarding privacy, please read our privacy policy:</p>
            <p>
              <Link
                href="/privacy-policy"
                className="text-cyan-700 hover:text-cyan-800"
              >
                https://www.hosvi.com/privacy-policy
              </Link>
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Contact Information
            </h2>
            <p>Hosvi LLC</p>
            <p>6421 N. Florida Ave, Suite D-1130</p>
            <p>Tampa, FL 33604</p>
            <p>Email: info@hosvi.com</p>
            <p>Phone: +1 (754) 310-5950</p>
          </div>
        </div>
      </section>
    </div>
  );
}
