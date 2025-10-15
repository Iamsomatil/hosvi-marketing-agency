"use client";

import { motion } from "framer-motion";

export function TrustStrip() {
  return (
    <section aria-label="Trusted by chiropractors" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-slate-600 text-sm font-medium mb-6">
          Trusted by chiropractors across the US
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.7, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item * 0.1 }}
            >
              <div className="h-8 w-full bg-slate-200 rounded" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
