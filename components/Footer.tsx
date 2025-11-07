"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">Hosvi</span>
            </div>
            <p className="text-slate-300 text-sm max-w-3xl">
              We connect chiropractors with clients who are ready to book. Hosvi combines targeted outbound campaigns, conversion-first landing experiences, and a streamlined CRM to turn interest into appointments.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/#services"
                  className="text-slate-300 hover:text-white text-sm"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-slate-300 hover:text-white text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonials"
                  className="text-slate-300 hover:text-white text-sm"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-slate-300 hover:text-white text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-300 hover:text-white text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-300 hover:text-white text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-slate-300 hover:text-white text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-white">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Contact Us
            </h3>
            <address className="mt-4 not-italic text-white text-sm space-y-2">
              <p className="!text-white">6421 N. Florida Ave<br/>Suite D-1130</p>
              <p className="!text-white">Tampa, FL 33604</p>
              <p className="!text-white">
                <span className="!text-white">Email:</span>{" "}
                <a
                  href="mailto:info@hosvi.com"
                  className="text-white underline hover:opacity-90"
                >
                  info@hosvi.com
                </a>
              </p>
              <p className="!text-white">
                <span className="!text-white">Phone:</span>{" "}
                <a
                  href="tel:+17542070982"
                  className="text-white underline hover:opacity-90"
                >
                  (754) 207-0982
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-slate-400 text-sm text-center">
            &copy; {currentYear} Hosvi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
