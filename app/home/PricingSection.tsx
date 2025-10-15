"use client";

import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";

async function redirectToCheckout(plan: "BASIC" | "PREMIUM") {
  try {
    const res = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Checkout session error:", err);
      alert(
        err?.error ||
          "Unable to start checkout. Please ensure environment variables are set and try again."
      );
      return;
    }

    const data = await res.json();
    if (data?.url) {
      window.location.href = data.url as string;
    } else {
      console.error("No checkout URL in response:", data);
      alert("Unable to start checkout. Please try again in a moment.");
    }
  } catch (e) {
    console.error("Checkout fetch failed:", e);
    alert("Network error starting checkout. Check your connection and try again.");
  }
}

const features = [
  "Outbound Email Campaign",
  "CRM & Pipeline Tracking",
  "Professional Booking Pages",
  "Google Business Profile Setup",
  "LinkedIn Setup",
  "Email Support",
  "SMS Follow-up Campaign",
  "Paid Ads Management",
  "Advanced Analytics",
  "Priority Phone Support",
  "Monthly Strategy Calls",
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Choose the plan that fits your chiropractic practice's needs. No
            hidden fees, cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow"
            whileHover={{ y: -5 }}
          >
            <div className="p-5 sm:p-6 border-b border-slate-200">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                Basic Plan
              </h3>
              <span className="inline-block bg-indigo-50 text-indigo-700 text-xs sm:text-sm font-semibold px-2 py-1 rounded-full mb-2">
                Founder’s Launch Offer – limited to the first 15 clients.
              </span>
              <p className="text-slate-600 text-sm sm:text-base mb-4">
                Perfect for new practices or those focused on lead generation
              </p>
              <div className="flex items-baseline mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-indigo-600">
                  $495
                </span>
                <span className="ml-2 text-slate-500">/month</span>
              </div>
              <button
                onClick={() => redirectToCheckout("BASIC")}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Start Free Trial
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            <div className="p-5 sm:p-6">
              <h4 className="font-medium text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">
                Everything included:
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {features.slice(0, 6).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-indigo-600 relative"
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rounded-bl-lg">
              MOST POPULAR
            </div>
            <div className="p-5 sm:p-6 border-b border-slate-200">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                Premium Plan
              </h3>
              <span className="inline-block bg-indigo-50 text-indigo-700 text-xs sm:text-sm font-semibold px-2 py-1 rounded-full mb-2">
                Founder’s Launch Offer – limited to the first 15 clients.
              </span>
              <p className="text-slate-600 text-sm sm:text-base mb-4">
                For growing practices that want maximum results
              </p>
              <div className="flex items-baseline mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-indigo-600">
                  $995
                </span>
                <span className="ml-2 text-slate-500">/month</span>
              </div>
              <button
                onClick={() => redirectToCheckout("PREMIUM")}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Start Free Trial
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            <div className="p-5 sm:p-6">
              <h4 className="font-medium text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">
                Everything in Basic, plus:
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {features.slice(6).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 sm:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-slate-600 text-sm sm:text-base mb-3 sm:mb-4">
            Need a custom solution for multiple locations?
          </p>
          <Link
            href="#contact"
            className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline text-sm sm:text-base transition-colors inline-flex items-center"
          >
            Contact our sales team for enterprise pricing
            <ChevronRight className="ml-1 w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
