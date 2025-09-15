"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatedSVG, MotionPath } from "./MotionPath";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phoneNumber: "",
    brandDescription: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    extraNotes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: result.message 
        });
        // Reset form
        setFormData({
          name: "",
          businessName: "",
          email: "",
          phoneNumber: "",
          brandDescription: "",
          instagram: "",
          facebook: "",
          tiktok: "",
          extraNotes: ""
        });
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: result.error || 'Something went wrong. Please try again.' 
        });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gray-50 py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Section - Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                We Help You Get Noticed In a{" "}
                <span className="relative">
                  Big Way
                  <div className="absolute left-0 top-0 w-full">
                    <AnimatedSVG 
                      width={284} 
                      height={103} 
                      viewBox="0 0 284 103"
                      className="w-full h-full"
                      delay={1.0}
                    >
                      <MotionPath 
                        d="M172.093 95.457C152.856 98.8852 104.535 103.685 65.155 95.457C15.9295 85.1721 3.70805 71.3519 3.02907 60.1028C2.3501 48.8537 13.2137 26.677 72.6237 13.821C132.034 0.964912 176.384 1.34543 210.333 5.84506C244.281 10.3447 279.966 19.082 280.984 37.0805C282.002 55.079 233.981 75.2473 211.915 80.7111C189.848 86.175 146.354 89.6357 140.736 89.6357C138.237 89.6357 133.355 88.6441 131.246 87.6524"
                        stroke="#F58906"
                        strokeWidth={5}
                        strokeLinecap="round"
                        delay={1.0}
                        duration={1.8}
                      />
                    </AnimatedSVG>
                  </div>
                </span>
              </motion.h1>
              <motion.p 
                className="text-base sm:text-lg text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Share a few quick details about your business, and we'll cook up something amazing that's smart, bold, and impossible to ignore.
              </motion.p>
            </motion.div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Phone */}
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-xl font-semibold text-gray-800">Phone Number</h3>
                <p className="text-gray-600">
                  Sometimes it's just easier to talk it out. Call us and let's spark ideas in real time.
                </p>
                <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 text-[#F58906] rounded-full flex items-center justify-center">
                     <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <g clipPath="url(#clip0_448_611)">
                         <path d="M19.9463 0.40251C19.6014 0.325868 19.3331 0.459992 19.084 0.689919C17.3787 2.39521 15.6543 4.11966 13.949 5.82496C13.8724 5.9016 13.7957 5.97824 13.6999 6.03572C13.5083 6.15069 13.2975 6.07404 13.2017 5.88244C13.1634 5.78663 13.1443 5.69083 13.1443 5.59503C13.1443 5.03937 13.1443 4.50287 13.1443 3.94722C13.1443 3.48736 12.7802 3.14247 12.3395 3.14247C11.803 3.14247 11.439 3.50652 11.439 4.1005C11.439 5.57587 11.439 7.07039 11.439 8.54576C11.439 9.21638 11.7839 9.56127 12.4545 9.56127C13.1826 9.56127 13.9298 9.56127 14.6579 9.56127C15.4052 9.56127 16.1716 9.56127 16.9189 9.56127C17.4745 9.56127 17.8386 9.19722 17.8386 8.69904C17.8386 8.18171 17.4745 7.85598 16.9189 7.85598C16.4207 7.85598 15.9225 7.85598 15.4244 7.85598C15.2136 7.85598 15.022 7.83682 14.9262 7.60689C14.8304 7.39612 14.9645 7.24284 15.0986 7.10871C15.137 7.07039 15.1753 7.03207 15.1944 7.01291C16.8614 5.34594 18.5475 3.67897 20.2145 1.99284C20.2912 1.9162 20.3486 1.85871 20.4253 1.78207C20.8085 1.2839 20.5402 0.555795 19.9463 0.421671V0.40251Z" fill="#F58906" stroke="#F58906" strokeWidth="0.4" strokeMiterlimit="10"/>
                         <path d="M19.6397 15.1558C18.7966 14.6193 17.9727 14.0828 17.1105 13.5655C16.4207 13.144 15.6734 13.3164 15.2136 13.9679C15.1561 14.0445 15.1178 14.1211 15.0603 14.1978C14.7154 14.7343 14.3897 15.2516 14.0448 15.7881C13.7382 16.248 13.2209 16.3438 12.761 16.0755C11.324 15.1941 9.98275 14.1786 8.75648 13.029C7.30027 11.6303 6.03567 10.0591 4.98184 8.35381C4.59863 7.72151 4.69443 7.24249 5.30757 6.84012C5.90155 6.45691 6.49553 6.09286 7.07034 5.70965C7.66432 5.28812 7.81761 4.59833 7.45356 3.96604C6.8979 3.02717 6.32308 2.0883 5.69078 1.20691C5.13513 0.421327 4.08129 0.17224 3.23823 0.612933C2.66341 0.919503 2.10775 1.24523 1.60958 1.66677C0.823994 2.35655 0.383301 3.23793 0.383301 4.33009C0.383301 5.09651 0.555746 5.82461 0.747352 6.55271C1.36049 8.71786 2.41432 10.6722 3.75556 12.4925C5.0968 14.3128 6.68713 15.8839 8.50739 17.2252C10.2127 18.4898 12.0521 19.5053 14.1023 20.1184C14.907 20.3483 15.7118 20.5783 16.4399 20.6166C17.4362 20.6166 18.241 20.3292 18.9307 19.7544C19.5822 19.1987 20.0037 18.4898 20.3869 17.7425C20.9043 16.727 20.5019 15.6923 19.6588 15.1558H19.6397Z" fill="#F58906" stroke="#F58906" strokeWidth="0.4" strokeMiterlimit="10"/>
                       </g>
                       <defs>
                         <clipPath id="clip0_448_611">
                           <rect width="21" height="21" fill="white"/>
                         </clipPath>
                       </defs>
                     </svg>
                   </div>
                  <a href="tel:+201154022288" className="text-[#F58906] font-semibold text-lg hover:text-orange-500 transition-colors">
                    +20 115 4022288
                  </a>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">
                  Not a phone person? Send us an email and we'll get back faster than your next scroll refresh.
                </p>
                <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 text-[#F58906] rounded-full flex items-center justify-center">
                     <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path fillRule="evenodd" clipRule="evenodd" d="M23 0L18.6285 17.5214L10.1396 14.7934L17.7216 5.45597L7.94479 14.116L0 11.6077L23 0ZM9.86751 20.9817V16.1665L12.6609 17.0087L9.86751 21V20.9817Z" fill="#F58906"/>
                     </svg>
                   </div>
                  <a href="mailto:thenoisylabb@gmail.com" className="text-[#F58906] font-semibold text-lg hover:text-orange-500 transition-colors">
                    thenoisylabb@gmail.com
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Section - Contact Form */}
          <motion.div 
            className="bg-[#FFDFB6] rounded-2xl shadow-lg p-6 sm:p-8 md:p-12"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
              Get In Touch
            </h2>

            {/* Status Message */}
            {submitStatus.type && (
              <motion.div
                className={`p-4 rounded-lg mb-6 ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Required Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                     className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F58906] focus:border-transparent transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name*
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Your business name"
                     className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F58906] focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                     className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F58906] focus:border-transparent transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                     className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F58906] focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="brandDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Brand in One Line*
                </label>
                <input
                  type="text"
                  id="brandDescription"
                  name="brandDescription"
                  value={formData.brandDescription}
                  onChange={handleInputChange}
                  placeholder="What makes you impossible to ignore?"
                     className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F58906] focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Social Media Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="@yourbusiness"
                     className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F58906] focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Facebook
                  </label>
                  <input
                    type="url"
                    id="facebook"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    placeholder="facebook.com/yourbusiness"
                     className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F58906] focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="tiktok" className="block text-sm font-medium text-gray-700 mb-2">
                    Business TikTok
                  </label>
                  <input
                    type="url"
                    id="tiktok"
                    name="tiktok"
                    value={formData.tiktok}
                    onChange={handleInputChange}
                    placeholder="@yourbusiness"
                     className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F58906] focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="extraNotes" className="block text-sm font-medium text-gray-700 mb-2">
                  Extra Notes
                </label>
                <textarea
                  id="extraNotes"
                  name="extraNotes"
                  value={formData.extraNotes}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Anything we should know to make the noise louder?"
                   className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F58906] focus:border-transparent transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-full font-semibold transition-colors ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#F58906] hover:bg-orange-500'
                  } text-white`}
                  whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
