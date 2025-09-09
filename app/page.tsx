"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  BarChart3,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const DashboardPreview = dynamic(
  () => import("../components/DashboardPreview"),
  { ssr: false }
);

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function Counter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let observer: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer && observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1400; // ms
    const startValue = 0;
    const endValue = target;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      const current = Math.round(startValue + (endValue - startValue) * eased);
      setValue(current);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(endValue);
      return;
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="mx-auto inline-flex items-center justify-center rounded-full px-6 py-4 text-4xl font-extrabold tabular-nums bg-gradient-to-r from-indigo-500/10 to-cyan-400/10 text-slate-900">
        {value}
      </div>
      <p className="mt-2 text-slate-600">{label}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative hero-gradient overflow-hidden">
        {/* Service-relevant background image with reserved space and overlay */}
        <div className="absolute inset-0">
          <Image
            src="/hero-hosvi.jpg"
            alt="Hosvi marketing agency - lead generation for healthcare practices"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/40"
            aria-hidden="true"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24 lg:py-32">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.h1
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              variants={fadeInUp}
            >
              Get More Clients with <br />
              <span className="text-cyan-300">Hosvi's 30-Day Free Trial</span>
            </motion.h1>

            <motion.p
              className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Complete lead generation system for chiropractors and med spas in
              Florida. One system, more patients, guaranteed results.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Link
                href="/trial"
                className="btn-gradient bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="glass text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
              >
                Book Consultation
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl lg:text-4xl font-bold text-slate-900 text-center mb-10">
            Trusted by growing practices
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-14 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <span className="text-slate-500 text-sm">Client Logo</span>
              </div>
            ))}
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="card-gradient p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <p className="text-slate-700">
                  “Hosvi helped us book more qualified appointments in 30 days
                  than the previous quarter.”
                </p>
                <p className="mt-4 text-sm text-slate-500">— Practice Owner</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Counter target={250} label="Clients Onboarded" />
            <Counter target={1200} label="Campaigns Launched" />
            <Counter target={9800} label="Qualified Leads Generated" />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div aria-hidden="true" className="relative">
        <svg
          className="w-full h-12 text-white"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
        >
          <path fill="currentColor" d="M0,48 L1440,0 L1440,48 L0,48 Z" />
        </svg>
      </div>

      {/* Benefits Section */}
      <section
        id="services"
        className="py-20 bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2
              className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6"
              variants={fadeInUp}
            >
              Everything You Need to{" "}
              <span className="text-gradient">Grow Your Practice</span>
            </motion.h2>

            <motion.p
              className="text-xl text-slate-600 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Our proven system delivers qualified leads and helps you convert
              them into loyal patients.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {[
              {
                icon: Mail,
                title: "Outbound Email Campaigns",
                description:
                  "Targeted email sequences that reach qualified prospects in your area",
              },
              {
                icon: BarChart3,
                title: "CRM & Pipeline Tracking",
                description:
                  "Complete visibility into your lead funnel with detailed analytics",
              },
              {
                icon: Globe,
                title: "Professional Booking Pages",
                description:
                  "Custom-branded pages that convert visitors into appointments",
              },
              {
                icon: Phone,
                title: "SMS Follow-ups (Premium)",
                description:
                  "Multi-channel approach with automated SMS sequences",
              },
              {
                icon: CheckCircle,
                title: "GBP & LinkedIn Setup",
                description:
                  "Optimized profiles that establish your authority and credibility",
              },
              {
                icon: ArrowRight,
                title: "Paid Ads Management (Premium)",
                description:
                  "Google and Facebook ads managed by our expert team",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div aria-hidden="true" className="relative">
        <svg
          className="w-full h-12 text-slate-50"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
        >
          <path fill="currentColor" d="M0,0 L1440,48 L0,48 L0,0 Z" />
        </svg>
      </div>

      {/* Plans Section */}
      <section
        id="pricing"
        className="py-20 bg-gradient-to-b from-white to-slate-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2
              className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6"
              variants={fadeInUp}
            >
              Choose Your <span className="text-gradient">Growth Plan</span>
            </motion.h2>

            <motion.p
              className="text-xl text-slate-600 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Start with our 30-day free trial. No setup fees, no hidden costs.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {/* Basic Plan */}
            <motion.div
              className="card-gradient p-8 rounded-3xl shadow-xl border-2 border-slate-200 relative"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Basic Plan
                </h3>
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  $1,500
                  <span className="text-lg font-normal text-slate-600">
                    /month
                  </span>
                </div>
                <p className="text-slate-600">Perfect for growing practices</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Outbound email campaigns",
                  "CRM & pipeline tracking",
                  "Professional booking pages",
                  "GBP & LinkedIn setup",
                  "Email support",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/trial"
                className="w-full btn-gradient bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 text-white px-6 py-4 rounded-full font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              className="hero-gradient p-8 rounded-3xl shadow-xl border-2 border-blue-500 relative"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-cyan-400 text-blue-900 px-6 py-2 rounded-full text-sm font-semibold">
                  MOST POPULAR
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Premium Plan
                </h3>
                <div className="text-4xl font-bold text-white mb-2">
                  $3,000
                  <span className="text-lg font-normal text-blue-100">
                    /month
                  </span>
                </div>
                <p className="text-blue-100">Maximum growth potential</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Basic plan",
                  "SMS follow-up campaigns",
                  "Paid ads management",
                  "Advanced analytics",
                  "Priority phone support",
                  "Monthly strategy calls",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-300 flex-shrink-0" />
                    <span className="text-blue-50">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/trial"
                className="w-full btn-gradient bg-white text-blue-900 px-6 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-slate-600 text-lg">
              <strong>30-day free trial</strong> includes full access to your
              chosen plan. Card required for automatic conversion on day 31.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div aria-hidden="true" className="relative">
        <svg
          className="w-full h-12 text-slate-50"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
        >
          <path fill="currentColor" d="M0,0 L1440,48 L0,48 L0,0 Z" />
        </svg>
      </div>

      {/* CTA Section */}
      <section id="contact" className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2
              className="text-3xl lg:text-5xl font-bold text-white mb-6"
              variants={fadeInUp}
            >
              Ready to Transform Your Practice?
            </motion.h2>

            <motion.p
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Join hundreds of successful practitioners who've grown their
              patient base with Hosvi.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Link
                href="/trial"
                className="btn-gradient bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
              >
                Get Started Now - Free for 30 Days
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-white py-12"
        style={{
          background: "linear-gradient(180deg,#0f172a 0%,#0b1220 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">Hosvi</h3>
              <p className="text-slate-400">
                Complete lead generation system for healthcare practices in
                Florida.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/trial"
                    className="nav-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    Start Free Trial
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="nav-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    Client Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal"
                    className="nav-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    Privacy & Terms
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-slate-300">
                Email: hello@hosvi.com
                <br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 mt-8 text-center text-slate-400">
            <p>&copy; 2025 Hosvi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
