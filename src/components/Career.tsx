"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AnimatedSVG, MotionPath } from "./MotionPath";

interface Career {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salary?: {
    min?: number;
    max?: number;
    currency: string;
    period: 'hourly' | 'monthly' | 'yearly';
  };
  experience: {
    min: number;
    max?: number;
  };
  skills: string[];
  isActive: boolean;
  isFeatured: boolean;
  applicationDeadline?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Career() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await fetch('/api/careers?active=true');
      if (response.ok) {
        const data = await response.json();
        setCareers(data);
      } else {
        setError('Failed to load careers');
      }
    } catch (err) {
      setError('Failed to load careers');
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (salary: Career['salary']) => {
    if (!salary) return '';
    
    const { min, max, currency, period } = salary;
    const periodText = period === 'yearly' ? 'year' : period === 'monthly' ? 'month' : 'hour';
    
    if (min && max) {
      return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}/${periodText}`;
    } else if (min) {
      return `${currency} ${min.toLocaleString()}+/${periodText}`;
    }
    return '';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-purple-100 text-purple-800';
      case 'internship': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <section className="relative min-h-screen bg-white py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F58906] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading careers...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative min-h-screen bg-white py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchCareers}
              className="bg-[#F58906] text-white px-6 py-2 rounded-full hover:bg-orange-500 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-white py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full">

        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-purple-900 mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join Our{" "}
            <span className="relative">
              Team
              <div className="absolute left-0 top-0 w-32 sm:w-full">
                <AnimatedSVG 
                  width={284} 
                  height={103} 
                  viewBox="0 0 284 103"
                  className="w-full h-full"
                  delay={1.5}
                >
                  <MotionPath 
                    d="M172.093 95.457C152.856 98.8852 104.535 103.685 65.155 95.457C15.9295 85.1721 3.70805 71.3519 3.02907 60.1028C2.3501 48.8537 13.2137 26.677 72.6237 13.821C132.034 0.964912 176.384 1.34543 210.333 5.84506C244.281 10.3447 279.966 19.082 280.984 37.0805C282.002 55.079 233.981 75.2473 211.915 80.7111C189.848 86.175 146.354 89.6357 140.736 89.6357C138.237 89.6357 133.355 88.6441 131.246 87.6524"
                    stroke="#F58906"
                    strokeWidth={5}
                    strokeLinecap="round"
                    delay={1.5}
                    duration={1.8}
                  />
                </AnimatedSVG>
              </div>
            </span>
          </motion.h1>

          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            We're looking for curious, creative minds to be our next lab partners. If you love experimenting, chasing trends, and making brands unforgettable, you'll fit right in.
          </motion.p>

          {/* Job Listings Grid */}
          {careers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {careers.map((career, index) => (
                <motion.div
                  key={career._id}
                  className={`rounded-2xl p-4 sm:p-6 min-h-32 flex flex-col justify-between relative overflow-hidden ${
                    career.isFeatured ? 'bg-gradient-to-br from-[#F58906] to-orange-600' : 'bg-[#F58906]'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 + (index * 0.1) }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {career.isFeatured && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-white text-[#F58906] px-2 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg leading-tight mb-2">
                      {career.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(career.type)}`}>
                        {career.type.replace('-', ' ')}
                      </span>
                      <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {career.location}
                      </span>
                    </div>

                    {career.salary && (
                      <p className="text-white/90 text-xs mb-2">
                        {formatSalary(career.salary)}
                      </p>
                    )}

                    <p className="text-white/80 text-xs line-clamp-2">
                      {career.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="text-white/80 text-xs">
                      {career.experience.min > 0 && (
                        <span>{career.experience.min}+ years exp</span>
                      )}
                    </div>
                    <motion.a 
                      href={`/apply?career=${career._id}`}
                      className="bg-white text-[#F58906] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-colors inline-block"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Apply Now
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <p className="text-gray-600 text-lg mb-4">No job openings available at the moment.</p>
              <p className="text-gray-500">Check back later or send us your resume for future opportunities!</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
