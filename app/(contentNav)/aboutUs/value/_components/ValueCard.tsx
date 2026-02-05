import React from "react";
import { motion } from "framer-motion";

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}

export default function ValueCard({
  icon,
  title,
  description,
  index = 0,
}: ValueCardProps) {
  return (
    <motion.div
      className="border border-[#4AA8C4] rounded-lg p-[48px] w-70 h-101.5 hover:border-[#4AA8C4] transition-colors flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -10, borderColor: "#6BC4D4" }}
    >
      <div className="mb-[32px] flex justify-center w-25 h-25">{icon}</div>
      <div>
        <h3 className="text-2xl font-semibold text-[#FFF7EB] text-center mb-4">
          {title}
        </h3>
        <p className="text-sm text-gray-300 text-center leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
