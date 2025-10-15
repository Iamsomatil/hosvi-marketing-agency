"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, User, LogOut, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useUserSession } from "@/hooks/use-session";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { session, isAdmin, isLoading, isAuthenticated, handleSignOut } =
    useUserSession();

  const user = session?.user;

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
    { href: "/#services", label: "Services" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center"
              ref={firstLinkRef}
              onClick={() => setOpen(false)}
            >
              <Image
                src="/hosvi-logo.jpg"
                alt="Hosvi Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
                priority
              />
              <span className="ml-3 text-xl font-bold text-slate-900 dark:text-white">
                Hosvi
              </span>
            </Link>
          </div>
          <div className="hidden md:ml-10 md:flex md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200"
                scroll={true}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 text-sm font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 focus:outline-none"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="truncate max-w-[120px]">
                    {user?.name || user?.email?.split("@")[0]}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isDropdownOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                        role="menuitem"
                        tabIndex={-1}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                          role="menuitem"
                          tabIndex={-1}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={async () => {
                          await handleSignOut();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                        role="menuitem"
                        tabIndex={-1}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    try {
                      router.push("/login");
                    } catch {
                    } finally {
                      if (typeof window !== "undefined")
                        window.location.assign("/login");
                    }
                  }}
                  className="text-sm font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => {
                    try {
                      router.push("/trial");
                    } catch {
                    } finally {
                      if (typeof window !== "undefined")
                        window.location.assign("/trial");
                    }
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </>
            )}
          </div>
          <div className="flex items-center md:hidden space-x-2">
            {isAuthenticated && !isLoading && (
              <Link
                href="/dashboard"
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                aria-label="Dashboard"
              >
                <User className="h-5 w-5 text-slate-700 dark:text-slate-300" />
              </Link>
            )}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setOpen(true)}
              aria-label="Open main menu"
              ref={closeBtnRef}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu: full-height top sheet, no inner scroll containers */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out transform ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        } md:hidden`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        <div
          ref={drawerRef}
          className="relative flex flex-col w-full h-[100dvh] bg-white dark:bg-slate-900 shadow-xl overflow-auto"
        >
          <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src="/hosvi-logo.jpg"
                  alt="Hosvi logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  quality={90}
                />
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-md p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          <nav className="px-4 py-2">
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {[
                { href: "/#services", label: "Services" },
                { href: "/#pricing", label: "Pricing" },
                { href: "/#testimonials", label: "Testimonials" },
                { href: "/about", label: "About" },
                { href: "/#contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block w-full py-4 text-lg font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-4 py-4 space-y-3 mt-auto">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="block w-full text-center px-4 py-4 rounded-md text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => setOpen(false)}
                >
                  Go to Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block w-full text-center px-4 py-4 rounded-md text-base font-semibold border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
                    onClick={() => setOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    setOpen(false);
                  }}
                  className="block w-full text-center px-4 py-4 rounded-md text-base font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    try {
                      router.push("/login");
                    } catch {
                    } finally {
                      if (typeof window !== "undefined")
                        window.location.assign("/login");
                    }
                  }}
                  className="block w-full text-center px-4 py-4 rounded-md text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    try {
                      router.push("/trial");
                    } catch {
                    } finally {
                      if (typeof window !== "undefined")
                        window.location.assign("/trial");
                    }
                  }}
                  className="block w-full text-center px-4 py-4 rounded-md text-base font-semibold border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Start Free Trial
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
