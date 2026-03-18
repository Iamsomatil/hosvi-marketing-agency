import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Hosvi",
  description:
    "Privacy Policy for Hosvi LLC covering data collection, use, SMS communications, and user rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Privacy Policy – Hosvi LLC
        </h1>

        <div className="mt-8 space-y-8 text-slate-700">
          <div className="space-y-3">
            <p>
              Hosvi LLC ("Hosvi," "we," "our," or "us") is committed to
              protecting your privacy. This Privacy Policy explains how we
              collect, use, and safeguard your information when you visit our
              website or use our services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Information We Collect
            </h2>
            <p>
              We may collect personal information that you voluntarily provide
              to us, including:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company or organization information</li>
              <li>Any information submitted through our intake or contact forms</li>
            </ul>
            <p>
              We may also collect certain technical information automatically
              through cookies, analytics tools, and similar tracking
              technologies, including browser type, device information, IP
              address, and site usage data.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Provide and coordinate referral services</li>
              <li>
                Communicate with you regarding your inquiry or participation in
                our network
              </li>
              <li>
                Send service-related updates, including referral coordination
                updates, appointment scheduling, onboarding instructions, and
                case status notifications
              </li>
              <li>Improve our services and website functionality</li>
              <li>Maintain website performance, security, and analytics</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              SMS Communications
            </h2>
            <p>
              If you opt in to receive SMS communications, you may receive
              messages related to:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Referral coordination updates</li>
              <li>Appointment scheduling</li>
              <li>Onboarding instructions</li>
              <li>Case status notifications</li>
            </ul>
            <p>
              Message frequency may vary. Message and data rates may apply. You
              may opt out at any time by replying STOP. For assistance, reply
              HELP or contact us directly.
            </p>
            <p>
              Consent to receive SMS messages is not required to submit a form
              on our website. SMS messages are only sent based on the consent
              options selected by the user through our website forms.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Cookies &amp; Tracking
            </h2>
            <p>
              Our website may use cookies, analytics tools, and similar
              technologies to improve user experience, analyze site traffic, and
              monitor website performance.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Data Security
            </h2>
            <p>
              We implement reasonable administrative, technical, and physical
              safeguards to protect your personal information and prevent
              unauthorized access, use, or disclosure.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Confidentiality
            </h2>
            <p>
              All case-related information shared through Hosvi is handled with
              strict confidentiality and in accordance with applicable data
              privacy standards and professional responsibility requirements.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">User Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal information by contacting us. You may also opt out of SMS
              communications at any time by replying STOP.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Data Sharing and Non-Sharing Clause
            </h2>
            <p>
              No mobile information will be shared with third parties or
              affiliates for marketing or promotional purposes. Information
              sharing to subcontractors in support services, such as customer
              service, is permitted. All other use case categories exclude text
              messaging originator opt-in data and consent; this information
              will not be shared with any third parties.
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

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated effective date.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
