"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SkeletonWrapper } from "@/components/ui/LoadingWrapper";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Chiropractor, Back to Health Center",
    content:
      "Hosvi helped us increase new patient appointments by 200% in just 3 months. Their targeted approach to chiropractic marketing is unmatched.",
    rating: 5,
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Owner, Spine & Wellness Clinic",
    content:
      "For every dollar we spend with Hosvi, we see a 6x return in patient revenue. Their team understands the chiropractic industry inside out.",
    rating: 5,
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Sports Chiropractor, Peak Performance",
    content:
      "The detailed analytics help us understand which services patients are most interested in. We've optimized our practice based on real data.",
    rating: 5,
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    role: "Family Chiropractic Care",
    content:
      "The 24/7 support is incredible. Whether it's adjusting ad copy or optimizing our landing pages, the Hosvi team is always available.",
    rating: 5,
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    role: "Wellness Chiropractic Center",
    content:
      "Our patient retention rates have never been higher. The automated follow-up system ensures our patients stay engaged and committed to their care plans.",
    rating: 5,
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: 6,
    name: "Dr. Robert Garcia",
    role: "Advanced Spine & Rehab",
    content:
      "The integration with our practice management system was seamless. We've reduced admin work by 30% while increasing patient satisfaction.",
    rating: 5,
    avatar: "/placeholder-avatar.jpg",
  },
];

type ClientLogo = {
  id: number;
  name: string;
  logo: string;
};

const clientLogos: ClientLogo[] = [
  { id: 1, name: "Back to Health Center", logo: "/placeholder-logo.png" },
  { id: 2, name: "Spine & Wellness Clinic", logo: "/placeholder-logo.png" },
  {
    id: 3,
    name: "Peak Performance Chiropractic",
    logo: "/placeholder-logo.png",
  },
  { id: 4, name: "Family Chiropractic Care", logo: "/placeholder-logo.png" },
  {
    id: 5,
    name: "Wellness Chiropractic Center",
    logo: "/placeholder-logo.png",
  },
  { id: 6, name: "Advanced Spine & Rehab", logo: "/placeholder-logo.png" },
];

export function TestimonialsSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SkeletonWrapper loading={isLoading} type="card">
      <section id="testimonials" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
              Trusted by Chiropractic Professionals
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Join hundreds of chiropractic practices that have grown their
              patient base with our specialized marketing strategies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-slate-700 mb-4 sm:mb-6 flex-grow">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-slate-200 mr-4 overflow-hidden relative">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiA2NDY0NmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjAgMjF2LTJhNCA0IDAgMCAwLTQtNEg4YTQgNCAwIDAgMC00IDR2MiI+PC9wYXRoPjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCI+PC9jaXJjbGU+PC9zdmc+";
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Ready to grow your chiropractic practice?
              </h3>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
                Join hundreds of chiropractic professionals who trust Hosvi for
                their practice growth.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                href="/trial"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Start Free Trial
                <motion.span
                  animate={{
                    x: isHovered ? 5 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 20,
                  }}
                >
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </motion.span>
              </Link>
              <Link
                href="#contact"
                className="px-6 sm:px-8 py-3 sm:py-4 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors text-sm sm:text-base text-center"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </SkeletonWrapper>
  );
}
