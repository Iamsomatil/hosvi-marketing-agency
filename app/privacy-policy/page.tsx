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
          Hosvi is committed to protecting your personal information and using
          it responsibly to provide referral coordination services.
        </p>

        <div className="mt-8 space-y-8 text-slate-700">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              Information Collected
            </h2>
            <p>
              We collect personal information such as name, phone number, email
              address, and details submitted through our intake forms.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              How Data Is Used
            </h2>
            <p>
              Information is used to provide referral coordination services,
              communicate with clients, schedule appointments, and send service
              updates.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              SMS Disclosure
            </h2>
            <p>
              By submitting your phone number through our forms, you consent to
              receive SMS messages from Hosvi regarding referral coordination,
              appointment scheduling, onboarding instructions, and service
              notifications. Message frequency may vary. Message and data rates
              may apply. Reply STOP to unsubscribe or HELP for assistance.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">
              Mobile Data Sharing Statement
            </h2>
            <p>
              SMS consent is not shared with third parties or affiliates for
              marketing purposes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
