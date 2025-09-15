"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Career {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export default function Apply() {
  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    businessName: "",
    brandDescription: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    extraNotes: "",
    position: "", // Add position field
    careerId: "" // Add careerId field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    // Check for career parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const careerId = urlParams.get('career');

    if (careerId) {
      fetchCareer(careerId);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCareer = async (careerId: string) => {
    try {
      const response = await fetch(`/api/careers/${careerId}`);
      if (response.ok) {
        const careerData = await response.json();
        setCareer(careerData);
        // Pre-fill position field
        setFormData(prev => ({
          ...prev,
          position: careerData.title,
          careerId: careerData._id
        }));
      } else {
        console.error('Failed to fetch career');
      }
    } catch (error) {
      console.error('Error fetching career:', error);
    } finally {
      setLoading(false);
    }
  };

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
      const response = await fetch('/api/apply', {
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
          email: "",
          phoneNumber: "",
          businessName: "",
          brandDescription: "",
          instagram: "",
          facebook: "",
          tiktok: "",
          extraNotes: "",
          position: career ? career.title : "",
          careerId: career ? career._id : ""
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

  if (loading) {
    return (
      <section className="relative min-h-screen bg-white py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F58906] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading application form...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-white py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {career ? `Apply for ${career.title}` : 'Submit Your Application'}
          </motion.h1>
          
          {career && (
            <motion.div
              className="bg-gray-50 rounded-lg p-4 mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Department:</span> {career.department}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Location:</span> {career.location}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Type:</span> {career.type.replace('-', ' ')}
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
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

          <div className="space-y-6">
            {/* Required Fields */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
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
            </motion.div>

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

            {/* Position Field - Only show if not career-specific */}
            {!career && (
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                  Position You're Applying For*
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="e.g., Digital Marketing Specialist"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F58906] focus:border-transparent transition-colors"
                  required
                />
              </div>
            )}

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
            <motion.div 
              className="flex justify-center sm:justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 sm:px-8 py-3 rounded-full font-semibold transition-colors ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#F58906] hover:bg-orange-500'
                } text-white w-full sm:w-auto`}
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </motion.button>
            </motion.div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
