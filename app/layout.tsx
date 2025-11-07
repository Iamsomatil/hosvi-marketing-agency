import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hosvi - Get More Clients with Our 30-Day Free Trial",
  description:
    "Complete lead generation system for chiropractors in Florida. Outbound email, CRM tracking, booking pages, and more.",
  keywords: "chiropractic marketing, lead generation, Florida",
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
        </Providers>
      </body>
    </html>
  );
}
