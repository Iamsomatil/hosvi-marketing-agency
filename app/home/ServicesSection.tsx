'use client';

import { motion } from 'framer-motion';
import { Zap, BarChart2, MessageSquare, Users, Calendar, Target } from 'lucide-react';

const services = [
  {
    title: 'Lead Generation',
    description: 'Targeted campaigns to attract new patients actively seeking chiropractic care in your area.',
    icon: <Zap className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: 'Practice Growth',
    description: 'Strategic marketing to fill your schedule with ideal patients who value your expertise.',
    icon: <BarChart2 className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: 'Patient Communication',
    description: 'Automated follow-ups and reminders to reduce no-shows and improve patient retention.',
    icon: <MessageSquare className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: 'Online Reputation',
    description: 'Manage and improve your online presence with verified patient reviews and testimonials.',
    icon: <Users className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: 'Appointment Booking',
    description: 'Seamless online scheduling that works 24/7 to convert visitors into patients.',
    icon: <Calendar className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: 'Targeted Advertising',
    description: 'Reach potential patients in your area with precision-targeted digital ads.',
    icon: <Target className="w-8 h-8 text-indigo-600" />,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Chiropractic Marketing That Delivers Results</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Our comprehensive marketing solutions are designed specifically for chiropractors to attract more patients and grow their practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-slate-600">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-indigo-50 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to transform your practice?</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Join hundreds of successful chiropractors who trust Hosvi to fill their schedules with ideal patients.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            >
              View Pricing
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
