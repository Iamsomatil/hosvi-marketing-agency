"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">Hosvi</span>
            </div>
            <p className="text-cyan-300 text-sm max-w-3xl">
              Hosvi is a medical placement coordination network connecting personal injury law firms with qualified treatment providers. We facilitate structured case placements between legal teams and independent clinics.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-cyan-300 hover:text-cyan-200 transition-colors"
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
                  href="/about"
                  className="text-cyan-300 hover:text-cyan-200 text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-cyan-300 hover:text-cyan-200 text-sm"
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
                  href="/privacy-policy"
                  className="text-cyan-300 hover:text-cyan-200 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-cyan-300 hover:text-cyan-200 text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-cyan-300 hover:text-cyan-200 text-sm"
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
            <address className="mt-4 not-italic text-cyan-300 text-sm space-y-2">
              <p className="!text-cyan-300">6421 N. Florida Ave<br/>Suite D-1130</p>
              <p className="!text-cyan-300">Tampa, FL 33604</p>
              <p className="!text-cyan-300">
                <span className="!text-cyan-300">Email:</span>{" "}
                <a
                  href="mailto:info@hosvi.com"
                  className="text-cyan-300 hover:text-cyan-200"
                >
                  info@hosvi.com
                </a>
                {" "}|{" "}
                <a
                  href="mailto:contact@hosvi.com"
                  className="text-cyan-300 hover:text-cyan-200"
                >
                  contact@hosvi.com
                </a>
                {" "}|{" "}
                <a
                  href="mailto:support@hosvi.com"
                  className="text-cyan-300 hover:text-cyan-200"
                >
                  support@hosvi.com
                </a>
              </p>
              <p className="!text-cyan-300">
                <span className="!text-cyan-300">Phone:</span>{" "}
                <a
                  href="tel:+17543105950"
                  className="text-cyan-300 hover:text-cyan-200"
                >
                  +1 (754) 310-5950
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-cyan-300 text-sm text-center">
            &copy; {currentYear} Hosvi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
