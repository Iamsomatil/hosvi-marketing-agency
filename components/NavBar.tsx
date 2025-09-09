"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
        if (e.key === "Tab") {
          const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (!focusable || focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            (last as HTMLElement).focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            (first as HTMLElement).focus();
          }
        }
      };
      document.addEventListener("keydown", onKeyDown);
      setTimeout(() => firstLinkRef.current?.focus(), 0);
      return () => {
        document.body.style.overflow = previousOverflow;
        document.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto container px-4">
        <nav className="mt-3 mb-3 glass rounded-full px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="Hosvi home"
            >
              <Image
                src="/hosvi-logo.jpg"
                alt="Hosvi logo"
                width={200}
                height={56}
                className="h-14 w-auto object-contain rounded-md"
                priority={false}
              />
            </Link>
          </div>

          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="nav-underline px-1 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/trial"
              className="btn-gradient bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 text-white px-5 py-2.5 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
            >
              Book Free 30-Day Trial
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={drawerRef}
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] glass backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 shadow-xl p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-900 font-semibold">Menu</span>
              <button
                ref={closeBtnRef}
                onClick={() => setOpen(false)}
                className="w-10 h-10 inline-flex items-center justify-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ul className="space-y-2">
                {navItems.map((item, idx) => (
                  <li key={item.label}>
                    <Link
                      ref={idx === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      className="block px-3 py-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/trial"
              className="mt-4 btn-gradient bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 text-white px-5 py-3 text-sm font-semibold text-center"
            >
              Book Free 30-Day Trial
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
