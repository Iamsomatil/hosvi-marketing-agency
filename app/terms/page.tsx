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
          By using this website, you agree to these terms. Hosvi provides
          referral coordination and case placement services only and does not
          provide medical or legal advice.
        </p>
        <div className="mt-8 space-y-4 text-slate-700">
          <p>
            Information on this site is for general informational purposes. Any
            treatment or legal guidance must come from licensed professionals.
          </p>
          <p>
            You agree not to misuse the site, attempt unauthorized access, or
            submit false or misleading information.
          </p>
          <p>
            We may update these terms periodically. Continued use of the site
            indicates acceptance of the updated terms.
          </p>
        </div>
      </section>
    </div>
  );
}
