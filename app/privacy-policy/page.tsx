import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Hosvi",
  description:
    "Hosvi privacy policy outlining data collection, use, and SMS communications.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-slate-700">
          Hosvi LLC respects your privacy and is committed to protecting your
          personal information. This Privacy Policy explains how we collect,
          use, and safeguard the information you provide when using our website
          and services.
        </p>

        <div className="mt-8 space-y-8 text-slate-700">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              Information We Collect
            </h2>
            <p>
              We may collect personal information such as your name, phone
              number, email address, and any other details you voluntarily
              provide through forms on our website.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              How We Use Your Information
            </h2>
            <p>
              The information collected is used to provide services, respond to
              inquiries, send appointment confirmations, onboarding
              instructions, and other service-related communications.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              SMS Communications
            </h2>
            <p>
              By providing your phone number and opting in, you consent to receive SMS messages from Hosvi LLC regarding case placement coordination, appointment scheduling, onboarding instructions, and service updates.
            </p>
            <p>Message frequency may vary. Message and data rates may apply.</p>
            <p>You may opt out at any time by replying STOP. For assistance, reply HELP.</p>
            <p className="font-medium mt-2">
              Mobile information will not be shared with third parties for marketing purposes.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              Data Protection
            </h2>
            <p>
              Hosvi LLC takes reasonable security measures to protect your personal
              information and prevent unauthorized access.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              User Rights
            </h2>
            <p>
              You may request access, updates, or deletion of your personal
              information by contacting us.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              Cookies &amp; Tracking
            </h2>
            <p>
              Our website may use cookies or analytics tools to improve user
              experience and monitor site performance.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              Contact Information
            </h2>
            <p>Hosvi LLC</p>
            <p>6421 N. Florida Ave Suite D-1130, Tampa, FL 33604</p>
            <p>
              Website:{" "}
              <a
                href="https://www.hosvi.com"
                className="text-cyan-700 hover:text-cyan-800"
              >
                https://www.hosvi.com
              </a>
            </p>
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
          </div>
        </div>
      </section>
    </div>
  );
}
