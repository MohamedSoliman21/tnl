"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Values() {
  const values = [
    {
      code: "Lc",
      number: "01",
      title: "Lab Coats On, Egos Off",
      description: "We're all about collaboration, not competition.",
      bgColor: "#FEECEC"
    },
    {
      code: "Tp",
      number: "02",
      title: "Trust the Process (and Each Other)",
      description: "In our lab, trust is the baseline.",
      bgColor: "#ECFCD8"
    },
    {
      code: "Nl",
      number: "03",
      title: "No Limits, Just Lab Rats",
      description: "Boundaries? Never heard of 'em.",
      bgColor: "#E9E8FD"
    },
    {
      code: "Bw",
      number: "04",
      title: "Best Idea Wins",
      description: "Doesn't matter who said it. If it's genius, we run with it.",
      bgColor: "#F0E8FF"
    },
    {
      code: "Cu",
      number: "05",
      title: "Curious (and Slightly Unhinged)",
      description: "We're mad for learning. Obsessed with what's next.",
      bgColor: "#DDF5FD"
    },
    {
      code: "Nj",
      number: "06",
      title: "No Jerks in the Lab",
      description: "We keep the lab drama-free.",
      bgColor: "#FFF2DB"
    }
  ];

  return (
    <section id="values" className="relative bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-purple-900 mb-4">Our Values</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
            Every great experiment needs the right chemistry. These are the rules we live (and work) by:
          </p>
        </div>

         {/* Grid */}
         <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
           {values.map((value, index) => (
             <motion.div
               key={index}
               className="relative rounded-lg border border-gray-200 overflow-hidden"
               style={{ minHeight: '160px' }}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: index * 0.1 }}
               whileHover={{ scale: 1.05, y: -5 }}
               whileTap={{ scale: 0.95 }}
             >
               {/* Floating Periodic Symbol Box */}
               <motion.div 
                 className="absolute top-4 xs:top-6 left-4 xs:left-6 w-[48px] xs:w-[56px] h-[55px] xs:h-[65px] border border-black bg-transparent z-10 flex items-end justify-center text-lg xs:text-xl sm:text-2xl font-bold text-black leading-none pb-1 xs:pb-2"
                 initial={{ opacity: 0, scale: 0.5 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.4, delay: (index * 0.1) + 0.3 }}
                 whileHover={{ scale: 1.1 }}
               >
                 {value.code}
               </motion.div>

               <motion.span 
                 className="absolute top-2 xs:top-4 right-2 text-[8px] xs:text-[10px] font-semibold text-gray-600"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.3, delay: (index * 0.1) + 0.5 }}
               >
                 {value.number}
               </motion.span>

               {/* Top White Area */}
               <div className="h-[40px] xs:h-[50px] bg-white" />

               {/* Bottom Colored Area */}
               <div className="pt-8 xs:pt-10 sm:pt-12 pb-4 xs:pb-6 pl-4 xs:pl-6" style={{ backgroundColor: value.bgColor }}>
                 <motion.h3 
                   className="text-sm xs:text-base sm:text-lg font-bold text-gray-900 leading-snug mb-1"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.4, delay: (index * 0.1) + 0.4 }}
                 >
                   {value.title}
                 </motion.h3>

                 {/* Divider */}
                 <motion.div 
                   className="w-full border-t-2 border-black mb-2"
                   initial={{ scaleX: 0 }}
                   animate={{ scaleX: 1 }}
                   transition={{ duration: 0.5, delay: (index * 0.1) + 0.6 }}
                 />

                 <motion.p 
                   className="text-xs xs:text-sm text-gray-800 leading-relaxed"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.4, delay: (index * 0.1) + 0.7 }}
                 >
                   {value.description}
                 </motion.p>
               </div>
             </motion.div>
           ))}
         </div>
      </div>
    </section>
  );
}