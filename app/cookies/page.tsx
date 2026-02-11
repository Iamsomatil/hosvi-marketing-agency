import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Hosvi",
  description: "Hosvi cookie policy for website usage and analytics.",
};

export default function CookiesPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold">Cookie Policy</h1>
        <p className="mt-4 text-slate-700">
          We use cookies to improve site performance and understand how visitors
          engage with our content.
        </p>
        <div className="mt-8 space-y-4 text-slate-700">
          <p>
            Cookies are small files stored in your browser. They help us measure
            traffic and improve user experience.
          </p>
          <p>
            You can control cookies through your browser settings. Disabling
            cookies may impact some site features.
          </p>
          <p>
            For questions, contact us at info@hosvi.com.
          </p>
        </div>
      </section>
    </div>
  );
}
