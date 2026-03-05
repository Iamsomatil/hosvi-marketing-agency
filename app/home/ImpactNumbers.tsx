"use client";

import { motion } from "framer-motion";

const circleMetrics = [
  { value: "1,200+", label: "PI Client Placements Coordinated" },
  { value: "85+", label: "Law Firms Supported" },
  { value: "140+", label: "Partner Treatment Providers" },
  { value: "14 Days", label: "First Appointment Scheduling Window" },
];

const barMetrics = [
  { label: "Referral Intake-to-Placement Rate", value: 93 },
  { label: "On-Time Initial Scheduling", value: 89 },
  { label: "Partner Retention", value: 91 },
];

export default function ImpactNumbers() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-100 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/80 bg-white/80 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur-sm px-6 py-10 sm:px-10 sm:py-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900">
            Our Impact in Numbers
          </h2>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {circleMetrics.map((metric, index) => (
                <motion.article
                  key={metric.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group rounded-full border border-cyan-200/70 bg-gradient-to-b from-white to-cyan-50/70 h-40 w-40 mx-auto flex flex-col items-center justify-center text-center shadow-[0_12px_30px_-20px_rgba(8,145,178,0.7)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_-20px_rgba(30,64,175,0.55)]"
                >
                  <p className="text-3xl font-extrabold text-slate-900">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-600 max-w-[8rem]">
                    {metric.label}
                  </p>
                </motion.article>
              ))}
            </div>

            <div className="space-y-4">
              {barMetrics.map((metric, index) => (
                <motion.article
                  key={metric.label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-slate-700">
                      {metric.label}
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {metric.value}%
                    </p>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 transition-all duration-500"
                      style={{ width: `${metric.value}%` }}
                      aria-label={`${metric.label} ${metric.value}%`}
                    />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
