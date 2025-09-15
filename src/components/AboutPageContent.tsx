"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPageContent() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
                {/* Decorative background SVGs */}
                <div className="absolute -top-8 left-0  z-0">
                    <Image src="/homepage/hero-decoration-1.svg" alt="" width={326} height={327} className="w-40 h-40" />
                </div>
                <div className="absolute -top-4 right-0 z-0">
                    <Image src="/homepage/hero-decoration-2.svg" alt="" width={171} height={230} className="w-32 h-44" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div 
                      className="text-center mb-12 sm:mb-16 px-4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.h1 
                          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6 leading-tight"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            We Believe Brands Shouldn't Whisper<br className="hidden xs:block" />
                            <span className="xs:hidden"> </span>They Should be <span className="relative inline-block">
                                Unforgettable
                                <div className="absolute top-0 w-full transform">
                                    <Image src="/homepage/unforgettable-decoration.svg" alt="" width={586} height={120} className="w-full" />
                                </div>
                            </span>
                        </motion.h1>
                        <motion.p 
                          className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed px-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            "Noisy" is the energy we bring: disruptive, viral, and impossible to ignore.
                            "Lab" is how we work: experimenting, testing, and innovating.
                        </motion.p>

                        {/* Swirling line pointing to CTA */}
                        <div className="relative inline-block mb-8">
                            <div className="absolute -left-8 sm:-left-16 md:-left-40 top-1/2 transform -translate-y-1/2 hidden sm:block">
                                <Image src="/homepage/button-decoration.svg" alt="" width={230} height={65} className="w-24 sm:w-32 h-6 sm:h-9" />
                            </div>
                            <div className="flex items-center gap-2 sm:gap-4">
                                <Link
                                    href="/contact"
                                    className="bg-[#F58906] hover:bg-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-semibold transition-colors inline-block w-full max-w-xs sm:w-auto"
                                >
                                    Let's Make Noise
                                </Link>
                                {/* Decorative SVG */}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
                        {/* Mission */}
                        <motion.div 
                          className="space-y-6 flex flex-col items-center"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* Purple sticky note */}
                            <motion.div 
                              className="relative transform -rotate-2 hover:rotate-0 transition-transform duration-300"
                              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                              animate={{ opacity: 1, scale: 1, rotate: -2 }}
                              transition={{ duration: 0.6, delay: 0.4 }}
                              whileHover={{ scale: 1.05 }}
                            >
                                {/* Decorative background SVGs */}
                                <div className="absolute -top-4 -left-4 transform z-0">
                                    <Image src="/homepage/notes-decoration.svg" alt="" width={140} height={233} className="w-20 h-32" />
                                </div>
                                <div className="absolute bottom-0 left-48 transform z-0">
                                    <Image src="/homepage/notes-decoration.svg" alt="" width={140} height={233} className="w-20 h-32" />
                                </div>
                                <Image src="/homepage/sticky-notes.svg" alt="" width={391} height={390} className="w-64 h-64 relative z-10" />
                                <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center p-8 z-20">
                                    <p className="text-xs font-semibold text-white text-center leading-tight max-w-[180px] -rotate-[8deg] font-['Rubik']">
                                        Turn up the volume. Lead the trends. Own the future of marketing.
                                    </p>
                                </div>
                            </motion.div>

                            <div className="text-center lg:text-left">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6">Our Mission</h2>
                                <p className="text-base sm:text-lg text-gray-600 leading-relaxed px-4 lg:px-0">
                                    We're on a mission to revolutionize how brands connect with their audiences. 
                                    We believe that in today's noisy world, brands need to be louder, bolder, and more memorable than ever before.
                                </p>
                            </div>
                        </motion.div>

                        {/* Vision */}
                        <motion.div 
                          className="space-y-6 flex flex-col items-center"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <div className="text-center lg:text-left">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6">Our Vision</h2>
                                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6 px-4 lg:px-0">
                                    We envision a world where every brand has the tools and strategies to cut through the noise 
                                    and create meaningful connections with their audience. A world where marketing isn't just 
                                    about selling products, but about telling stories that matter.
                                </p>
                            </div>

                            {/* Orange sticky note */}
                            <motion.div 
                              className="relative transform rotate-2 hover:rotate-0 transition-transform duration-300"
                              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                              animate={{ opacity: 1, scale: 1, rotate: 2 }}
                              transition={{ duration: 0.6, delay: 0.6 }}
                              whileHover={{ scale: 1.05 }}
                            >
                                {/* Decorative background SVGs */}
                                <div className="absolute -top-4 -right-4 transform z-0">
                                    <Image src="/homepage/notes-decoration.svg" alt="" width={140} height={233} className="w-20 h-32" />
                                </div>
                                <div className="absolute bottom-0 right-48 transform z-0">
                                    <Image src="/homepage/notes-decoration.svg" alt="" width={140} height={233} className="w-20 h-32" />
                                </div>
                                <Image src="/homepage/sticky-notes.svg" alt="" width={391} height={390} className="w-64 h-64 relative z-10" />
                                <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center p-8 z-20">
                                    <p className="text-xs font-semibold text-white text-center leading-tight max-w-[180px] rotate-[8deg] font-['Rubik']">
                                        Make it bold. Make it viral. Make it unforgettable.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Work With Us Section */}
            <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                      className="text-center mb-12 sm:mb-16"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <motion.h2 
                          className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-900 mb-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.0 }}
                        >
                          Why Work With Us?
                        </motion.h2>
                        <motion.p 
                          className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.2 }}
                        >
                          We're fearless, trend-savvy, and obsessed with making brands stand out.
                        </motion.p>
                        <motion.p 
                          className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.4 }}
                        >
                          With us, you don't just get marketing you get an experiment designed to spark conversations, ignite curiosity, and create impact.
                        </motion.p>
                        
                        {/* Arrow and Button */}
                        <motion.div 
                          className="relative flex items-center justify-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.6 }}
                        >
                          {/* Decorative Arrow - Positioned Absolutely */}
                          <div className="absolute left-2 sm:left-80 transform ">
                            <Image src="/homepage/work-with-us-decoration.svg" alt="" width={200} height={50} className="w-20 sm:w-40 h-auto" />
                          </div>
                          
                          {/* Centered Button */}
                          <Link
                            href="/contact"
                            className="bg-[#F58906] hover:bg-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-semibold transition-colors inline-block"
                          >
                            Work With Us
                          </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 2.0 }}
                    >
                        <motion.h2 
                          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 2.2 }}
                        >
                            Ready to Make Some Noise?
                        </motion.h2>
                        <motion.p 
                          className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 2.4 }}
                        >
                            Let's work together to create marketing that's impossible to ignore. 
                            Get in touch and let's start making noise for your brand.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 2.6 }}
                        >
                            <Link
                                href="/contact"
                                className="bg-[#F58906] hover:bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors inline-block"
                            >
                                Get Started Today
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Bottom Decoration */}
            <div className="relative">
                <div className="bottom-0 left-0 w-full">
                    <Image src="/homepage/about-decoration.svg" alt="" width={1200} height={200} className="w-full h-auto" />
                </div>
            </div>
        </div>
    );
}
