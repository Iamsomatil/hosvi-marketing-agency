import type { Metadata } from "next";
import HomePageClient from "./home/HomePageClient";

export const metadata: Metadata = {
  title: "Structured Medical Placement Network for Personal Injury Law Firms",
  description:
    "Structured Medical Placement Network for Personal Injury Law Firms",
  alternates: {
    canonical: "https://hosvi.com",
  },
  openGraph: {
    title: "Hosvi - Referral Coordination for Personal Injury Cases",
    description:
      "Structured Medical Placement Network for Personal Injury Law Firms",
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
