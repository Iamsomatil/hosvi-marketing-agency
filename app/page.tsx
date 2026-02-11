import type { Metadata } from "next";
import HomePageClient from "./home/HomePageClient";

export const metadata: Metadata = {
  title: "Hosvi - Referral Coordination for Personal Injury Cases",
  description:
    "Hosvi coordinates referrals between personal injury law firms and treatment provider clinics. We help paralegals place clients with chiropractors and physical therapy clinics that accept personal injury cases.",
  alternates: {
    canonical: "https://hosvi.com",
  },
  openGraph: {
    title: "Hosvi - Referral Coordination for Personal Injury Cases",
    description:
      "Referral coordination between personal injury law firms and treatment provider clinics.",
    url: "https://hosvi.com",
    siteName: "Hosvi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hosvi - Referral Coordination for Personal Injury Cases",
    description:
      "Referral coordination between personal injury law firms and treatment provider clinics.",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
