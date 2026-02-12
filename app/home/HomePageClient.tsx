"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ContactSection } from "./ContactSection";

export default function HomePageClient() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Referral Coordination for Personal Injury Cases
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-6 max-w-2xl">
                Hosvi coordinates referrals between personal injury law firms and
                treatment provider clinics. We help paralegals place clients with
                chiropractors and physical therapy clinics that accept personal injury
                cases.
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <Image
                src="/hero-hosvi.png"
                alt="Hosvi - Referral Coordination Platform"
                width={600}
                height={480}
                priority
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-slate-900">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Paralegal Submits Client Info",
                description:
                  "Personal injury paralegals submit their client's information and treatment needs.",
              },
              {
                step: 2,
                title: "Hosvi Places Client with Clinic",
                description:
                  "We coordinate placement with an appropriate treatment provider clinic in our network.",
              },
              {
                step: 3,
                title: "Clinic Contacts Client",
                description:
                  "The clinic reaches out to schedule treatment, and care begins immediately.",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.step * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full font-bold text-xl mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-slate-900">
            Who We Serve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Personal Injury Law Firms",
              "Chiropractor Clinics",
              "Physical Therapy Clinics",
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md border border-slate-200 text-center"
              >
                <CheckCircle2 className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">{item}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />

      <section className="py-16 bg-gradient-to-br from-indigo-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Partner with Hosvi?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us to learn how we can help coordinate referrals for your
            organization.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
