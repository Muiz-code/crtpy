"use client";

import React from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface TestimonialCardProps {
  /**
   * Client image
   */
  image: StaticImageData | string;

  /**
   * Testimonial text
   */
  quote: string;

  /**
   * Client name
   */
  name: string;

  /**
   * Client company/title
   */
  company: string;

  /**
   * Animation delay
   */
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  image,
  quote,
  name,
  company,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.2 }}
      className="flex-shrink-0 w-full sm:w-[350px] md:w-[380px] p-6 md:p-8 rounded-xl border border-[#4AA8C4]/30 bg-[#0a1419]/40 backdrop-blur-sm hover:border-[#4AA8C4]/60 transition-all duration-300 group"
    >
      {/* Quote Mark */}
      <div className="mb-6">
        <svg
          className="w-8 h-8 text-[#4AA8C4]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.156-5-10-5-5.844 0-10 3.75-10 5v6c0 1 0 4 6 4 1 0 11 0 11-4s-10-3-10-3-4-3-4-7 1-5 5-5 5.375 3 5.375 3h5.062c0 0 0-4.375-7.437-4.375-9.032 0-13.562 4.531-13.562 10.969 0 6.438 4.531 10.906 13.562 10.906 6.062 0 7.438-3.531 7.438-3.531s1.125 3.531 1.125 3.531v2.844c0 2-1.531 4.219-7.438 4.219z" />
        </svg>
      </div>

      {/* Quote Text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.1 }}
        viewport={{ once: true }}
        className="text-sm md:text-base text-gray-300 leading-relaxed mb-8"
      >
        {quote}
      </motion.p>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-[#4AA8C4]/30 to-transparent mb-6" />

      {/* Client Info */}
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
          viewport={{ once: true }}
          className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border border-[#4AA8C4]/50"
        >
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="flex-1 min-w-0">
          <motion.h4
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
            viewport={{ once: true }}
            className="text-sm md:text-base font-bold text-white truncate"
          >
            {name}
          </motion.h4>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: delay + 0.3 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm text-[#4AA8C4] truncate"
          >
            {company}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
