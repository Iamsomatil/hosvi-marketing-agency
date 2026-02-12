"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export function ContactSection() {
  const HOSVI_LOCATION = { lat: 27.998344, lng: -82.459747 };
  const DEFAULT_ZOOM = 15;

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    website: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitStatus({
        success: true,
        message: "Thank you for your message! We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
        website: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Get In Touch</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Have questions about our referral coordination services? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 p-8 rounded-lg">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-900 mb-2">
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  autoComplete="organization"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-900 mb-2">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tell us about your referral needs..."
                />
              </div>

              {submitStatus && (
                <div
                  className={`p-4 rounded-lg ${
                    submitStatus.success
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-800"
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-indigo-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Email</h3>
                  <a href="mailto:info@hosvi.com" className="text-slate-600 hover:text-indigo-600">
                    info@hosvi.com
                  </a>
                  <a href="mailto:contact@hosvi.com" className="block text-slate-600 hover:text-indigo-600">
                    contact@hosvi.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-indigo-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Phone</h3>
                  <a href="tel:7542070982" className="text-slate-600 hover:text-indigo-600">
                    754-207-0982
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-indigo-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900">Address</h3>
                  <p className="text-slate-600">
                    6421 N. Florida Ave, Suite D-1130
                    <br />
                    Tampa, FL 33604
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm">
              <div className="w-full aspect-video bg-slate-100">
                <iframe
                  title="Hosvi Office Location"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${HOSVI_LOCATION.lat},${HOSVI_LOCATION.lng}&z=${DEFAULT_ZOOM}&output=embed`}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
