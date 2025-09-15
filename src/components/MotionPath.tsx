"use client";

import { motion } from "framer-motion";

interface MotionPathProps {
  d: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: "round" | "butt" | "square";
  delay?: number;
  duration?: number;
  className?: string;
}

export function MotionPath({ 
  d, 
  fill, 
  stroke, 
  strokeWidth, 
  strokeLinecap,
  delay = 0,
  duration = 2,
  className = ""
}: MotionPathProps) {
  return (
    <motion.path
      d={d}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      className={className}
      initial={{ 
        pathLength: 0,
        opacity: 0
      }}
      animate={{ 
        pathLength: 1,
        opacity: 1
      }}
      transition={{ 
        pathLength: { 
          duration: duration, 
          delay: delay, 
          ease: "easeInOut" 
        },
        opacity: { 
          duration: 0.3, 
          delay: delay 
        }
      }}
    />
  );
}

interface AnimatedSVGProps {
  children: React.ReactNode;
  width: number;
  height: number;
  viewBox: string;
  className?: string;
  delay?: number;
}

export function AnimatedSVG({ 
  children, 
  width, 
  height, 
  viewBox, 
  className = "",
  delay = 0
}: AnimatedSVGProps) {
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {children}
    </motion.svg>
  );
}
