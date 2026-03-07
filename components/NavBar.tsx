'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/law-firm", label: "Law Firm" },
    { href: "/clinic", label: "Clinic" },
    { href: "/about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 overflow-hidden transition-all duration-300 ${
        hasScrolled
          ? "-translate-y-full opacity-0 pointer-events-none max-h-0 border-transparent"
          : "translate-y-0 opacity-100 max-h-40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/hosvi-logo.jpg"
              alt="Hosvi Logo"
              width={100}
              height={100}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-700 hover:text-cyan-700 transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-slate-200 bg-white"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-cyan-700 hover:bg-cyan-50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
