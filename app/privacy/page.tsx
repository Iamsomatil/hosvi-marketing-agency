import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Hosvi",
  description:
    "Hosvi privacy policy outlining how information is collected, used, and protected.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-slate-700">
          Hosvi respects your privacy. This policy describes how we collect,
          use, and protect information submitted through our site.
        </p>
        <div className="mt-8 space-y-4 text-slate-700">
          <p>
            We collect contact details and message content you submit via our
            forms so we can respond to inquiries and coordinate referrals.
          </p>
          <p>
            We do not sell personal information. We only share details with
            service partners when necessary to coordinate a referral, and only
            with your consent.
          </p>
          <p>
            If you have questions or would like to request changes to your
            information, contact us at info@hosvi.com.
          </p>
        </div>
      </section>
    </div>
  );
}
