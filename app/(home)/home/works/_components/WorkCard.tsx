"use client";

import React from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";

interface WorkCardProps {
  /**
   * Background image for the card
   */
  image: StaticImageData | string;

  /**
   * Work year
   */
  year: string;

  /**
   * Card title/heading
   */
  title: string;

  /**
   * Card description
   */
  description: string;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Animation delay for staggered animations
   */
  delay?: number;

  /**
   * Custom className
   */
  className?: string;
}

const WorkCard: React.FC<WorkCardProps> = ({
  image,
  year,
  title,
  description,
  onClick,
  delay = 0,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.2 }}
      onClick={onClick}
      className={`relative group cursor-pointer w-full hover:border-[#FFF7EB80] transition-colors duration-300  ${className}`}
    >
      {/* Arrow at right edge */}
      <div className="absolute right-0 md:top-0 top-60 transform -translate-y-1/2 z-10">
        <div className="w-10 h-10 border border-[#4AA8C4] rounded-full flex items-center justify-center transition-opacity duration-300 group-hover:bg-[#4AA8C4]/10 group-hover:rotate-45 rotate-45 md:rotate-0">
          <ArrowUpRight className="w-5 h-5 text-[#00D9FF]" strokeWidth={1.5} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 ">
        {/* Image Section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.1 }}
          viewport={{ once: true }}
          className=" flex-shrink-0 relative w-full md:w-lg h-50 md:h-81 overflow-hidden rounded-lg group-hover:rounded-2xl transition-all duration-300"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Hover Corner Brackets */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>

        {/* Content Section */}
        <div className="w-full md:h-auto h-50 flex flex-col md:justify-between gap-5 md:gap-4">
          {/* Year Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-[#4AA8C4] text-xs md:text-sm font-medium uppercase tracking-widest">
              {year}
            </span>
          </motion.div>
          <div>
            {/* Title */}
            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: delay + 0.3 }}
              viewport={{ once: true }}
              className="text-[25px] md:text-[40px] font-normal text-[#FFF7EB] leading-tight group-hover:text-[#00D9FF] transition-colors duration-300"
            >
              {title}
            </motion.h4>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: delay + 0.4 }}
              viewport={{ once: true }}
              className="text-[#FFF7EB] text-sm md:text-[20px] leading-relaxed"
            >
              {description}
            </motion.p>
          </div>
          {/* CTA Arrow */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: delay + 0.5 }}
            viewport={{ once: true }}
            className="pt-2 md:pt-4"
          ></motion.div> */}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkCard;
