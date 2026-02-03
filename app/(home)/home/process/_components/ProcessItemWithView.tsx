"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ProcessItemWithViewProps {
  /**
   * Step number
   */
  number: number;

  /**
   * Step title
   */
  title: string;

  /**
   * Step description
   */
  description: string;

  /**
   * Animation delay
   */
  delay?: number;

  /**
   * Whether this item is active (from scroll or hover)
   */
  isActive?: boolean;

  /**
   * Callback when item enters/leaves view
   */
  onViewChange?: (inView: boolean) => void;

  /**
   * Callback on hover
   */
  onHover?: (isHovered: boolean) => void;
}

const ProcessItemWithView: React.FC<ProcessItemWithViewProps> = ({
  number,
  title,
  description,
  delay = 0,
  isActive = false,
  onViewChange,
  onHover,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    margin: "-50% 0px -50% 0px", // Trigger when item is in middle of viewport
    once: false,
  });

  // Notify parent when view changes
  React.useEffect(() => {
    onViewChange?.(inView);
  }, [inView, onViewChange]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.2 }}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className={`relative py-6 px-4 md:px-6 border-l-2 transition-all duration-300 cursor-pointer group ${
        isActive
          ? "border-l-[#00D9FF] bg-[#00D9FF]/5"
          : "border-l-[#FFF7EB40] hover:border-l-[#FFF7EB80]"
      }`}
    >
      {/* Step number and title */}
      <div className="flex items-start gap-4">
        {/* <motion.div
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
            isActive
              ? "bg-[#00D9FF] text-[#0a1419]"
              : "bg-[#FFF7EB]/20 text-[#FFF7EB]"
          }`}
        >
          {number}
        </motion.div> */}
        <div className="flex-1">
          <motion.h4
            animate={{ color: isActive ? "#00D9FF" : "#fff7eb6a" }}
            transition={{ duration: 0.3 }}
            className="text-lg md:text-[32px] font-[500] leading-tight"
          >
            {title}
          </motion.h4>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isActive ? 1 : 0.6,
              height: "auto",
            }}
            transition={{ duration: 0.3 }}
            className="text-xs md:text-sm text-[#fff7eb6a] mt-2 leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* Arrow indicator on active */}
      {/* <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
        transition={{ duration: 0.3 }}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-4"
      >
        <svg
          className="w-5 h-5 text-[#00D9FF]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.div> */}
    </motion.div>
  );
};

export default ProcessItemWithView;
