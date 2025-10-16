"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SkeletonWrapper } from "@/components/ui/LoadingWrapper";

// Preload critical images
const preloadImages = () => {
  if (typeof window !== "undefined") {
    const heroImage = new window.Image();
    heroImage.src = "/hero-hosvi.png";

    const logoImage = new window.Image();
    logoImage.src = "/hosvi-logo.webp";
  }
};

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Preload images and simulate data loading
  useEffect(() => {
    preloadImages();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SkeletonWrapper loading={isLoading} type="card">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Hero background image */}
          <Image
            src="/hero-hosvi.png"
            alt="Hosvi hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={70}
          />
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <Image
              src="/grid-pattern.svg"
              alt="Background pattern"
              fill
              priority
              className="object-cover"
              sizes="100vw"
              quality={30}
            />
          </div>
          {/* Gradient overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/50"></div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 items-center">
            <div className="text-center lg:text-left max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-800/30 text-blue-200 mb-6 border border-blue-700/50"
              >
                <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                Trusted by 500+ chiropractic practices
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Grow Your Chiropractic Practice with{" "}
                <span className="text-cyan-300">More Patients</span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Our proven marketing strategies help chiropractors attract more
                patients and grow their practice with a 30-day free trial, no
                credit card required. Specializing in spinal health, pain
                management, and wellness care.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link
                  href="/trial"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-600 md:py-4 md:text-lg md:px-8 transition-colors duration-200"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
                </Link>
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-white/10 hover:bg-white/20 md:py-4 md:text-lg md:px-8 transition-colors duration-200"
                >
                  View Pricing
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </SkeletonWrapper>
  );
}
