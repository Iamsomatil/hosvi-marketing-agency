'use client';

import { Counter } from './Counter';

export function StatsSection() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Proven Results for Chiropractors</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We help chiropractic practices of all sizes attract more patients and grow their practice.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <Counter target={250} label="Chiropractic Clients" />
            <p className="text-slate-500 mt-2">Trusted by practices nationwide</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <Counter target={1200} label="New Patients Monthly" />
            <p className="text-slate-500 mt-2">Average for our clients</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <Counter target={98} label="Client Satisfaction" suffix="%"/>
            <p className="text-slate-500 mt-2">30-day money-back guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
}
