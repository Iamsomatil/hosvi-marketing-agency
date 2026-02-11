import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Providers from "./providers";

const ChatWidget = dynamic(() => import("../components/ChatWidget"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hosvi - Referral Coordination for Personal Injury Cases",
  description:
    "Hosvi coordinates referrals between personal injury law firms and treatment provider clinics. We help paralegals place clients with chiropractors and physical therapy clinics that accept personal injury cases.",
  keywords: "personal injury referral, case placement, treatment providers",
  metadataBase: new URL("https://hosvi.com"),
  icons: {
    icon: "/hosvi-logo.jpg",
  },
  openGraph: {
    title: "Hosvi - Referral Coordination for Personal Injury Cases",
    description:
      "Hosvi coordinates referrals between personal injury law firms and treatment provider clinics.",
    url: "https://hosvi.com",
    siteName: "Hosvi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hosvi - Referral Coordination for Personal Injury Cases",
    description:
      "Hosvi coordinates referrals between personal injury law firms and treatment provider clinics.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] bg-white text-slate-900 px-4 py-2 rounded-lg shadow"
        >
          Skip to content
        </a>
        <Providers>
          <NavBar />
          <main
            id="main"
            className="flex-grow relative min-h-[calc(100vh-4rem)]"
          >
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
