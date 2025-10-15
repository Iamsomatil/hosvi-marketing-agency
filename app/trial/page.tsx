"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, CreditCard, Calendar } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function TrialPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    city: "",
    state: "Florida",
    plan: "BASIC"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/trial/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStep(2);
        toast.success("Account created successfully!");
      } else {
        const error = await response.json();
        toast.error(error.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (step === 2) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
        <motion.div 
          className="glassmorphism max-w-2xl w-full p-8 rounded-3xl text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Welcome to Hosvi!
          </h1>
          
          <p className="text-blue-100 text-lg mb-8">
            Your 30-day free trial has started. We'll send you login credentials and next steps via email.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Schedule Onboarding Call
            </a>
            
            <Link 
              href="/login"
              className="glassmorphism text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-200"
            >
              Go to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="text-center mb-12"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Start Your 30-Day Free Trial
          </h1>
          <p className="text-xl text-blue-100">
            Complete lead generation system with no setup fees or hidden costs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div 
            className="glassmorphism p-8 rounded-3xl"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Get Started Today</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-blue-100 mb-2 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-blue-100 mb-2 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="businessName" className="block text-blue-100 mb-2 font-medium">
                  Business Name *
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  required
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                  placeholder="Your clinic or practice name"
                />
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-blue-100 mb-2 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-blue-100 mb-2 font-medium">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    placeholder="Miami"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="plan" className="block text-blue-100 mb-2 font-medium">
                  Choose Your Plan
                </label>
                <select
                  id="plan"
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  <option value="BASIC">Basic Plan - $495/month</option>
                  <option value="PREMIUM">Premium Plan - $995/month</option>
                </select>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-blue-900 px-6 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Account..." : "Start Free Trial"}
                {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />}
              </button>
            </form>
            
            <p className="text-blue-200 text-sm mt-4 text-center">
              By starting your trial, you agree to our{" "}
              <Link href="/legal" className="underline hover:text-white">
                Terms of Service & Privacy Policy
              </Link>
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glassmorphism p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-500 p-2 rounded-full">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">30-Day Free Trial</h3>
              </div>
              <p className="text-blue-100">
                Full access to your chosen plan with no restrictions. Cancel anytime before day 31.
              </p>
            </div>
            
            <div className="glassmorphism p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-cyan-500 p-2 rounded-full">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">No Setup Fees</h3>
              </div>
              <p className="text-blue-100">
                We'll set up everything for you. No hidden costs or surprise charges.
              </p>
            </div>
            
            <div className="glassmorphism p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-500 p-2 rounded-full">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Personal Onboarding</h3>
              </div>
              <p className="text-blue-100">
                Schedule a call with our team to get your campaigns running quickly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}