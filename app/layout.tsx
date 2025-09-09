import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavBar from "../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hosvi - Get More Clients with Our 30-Day Free Trial",
  description:
    "Complete lead generation system for chiropractors and med spas in Florida. Outbound email, CRM tracking, booking pages, and more.",
  keywords:
    "chiropractic marketing, med spa marketing, lead generation, Florida",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " animated-site-bg min-h-screen"}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] bg-white text-slate-900 px-4 py-2 rounded-lg shadow"
        >
          Skip to content
        </a>
        <NavBar />
        <main id="main" className="relative">
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
