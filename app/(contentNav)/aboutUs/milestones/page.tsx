import React, { useState, useEffect, useRef } from "react";
import SectionIndicator from "../../_components/SectionIndicator";
import { motion } from "framer-motion";

interface Milestone {
  year: string;
  title: string;
  description: string;
  side: "left" | "right";
}

const milestones: Milestone[] = [
  {
    year: "2019",
    title: "Company Launch",
    description:
      "Established Craftify, the creative digital marketing agency, with a vision to provide innovative solutions to clients.",
    side: "right",
  },
  {
    year: "2020",
    title: "Expansion of Services",
    description:
      "Expanded service offerings to include web design and development, expanding our capabilities and providing digital solutions.",
    side: "left",
  },
  {
    year: "2021",
    title: "International Expansion",
    description:
      "Expanded our reach beyond local markets by serving international clients, and establishing a global presence for Craftify.",
    side: "right",
  },
  {
    year: "2022",
    title: "100th Successful Project",
    description:
      "Celebrated the completion of our 100th successful project, showcasing our track record of delivering exceptional results.",
    side: "left",
  },
];

const Milestones = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      let closestIndex = 0;
      let closestDistance = Infinity;

      milestoneRefs.current.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const distance = Math.abs(elementCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      setActiveStep(closestIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="bg-[#0a1419] w-full h-auto mb-10">
      <SectionIndicator sectionNumber="03" sectionLabel="MILESTONES" />
      <motion.div className="flex w-full flex h-50 justify-center mt-[80px] md:mb-[64px] mb-0">
        <motion.div
          className="w-full text-[#FFF7EB] text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl md:text-[80px] font-bold md:font-semibold leading-tight">
            YEARS <br />
            <span
              style={{
                WebkitTextStroke: "2px white",
                color: "transparent",
              }}
            >
              OF{" "}
            </span>
            JOURNEY
          </h1>
        </motion.div>
      </motion.div>

      {/* Timeline Container */}
      <div className="rounded-lg px-8 md:px-16 relative md:h-[1200px] h-auto flex flex-col">
        {/* Vertical Timeline Line */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[8px] transform -translate-x-1/2"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255, 247, 235, 0.25) 0%, rgba(255, 247, 235, 0) 100%)",
          }}
        />

        {/* Milestones */}
        <div className="flex flex-col justify-around h-full">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              ref={(el) => {
                milestoneRefs.current[index] = el;
              }}
              className="relative flex items-center gap-4 md:gap-12"
              initial={{ opacity: 0, x: milestone.side === "left" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Left Content (Either year or text) */}
              <div className="flex-1">
                {milestone.side === "left" ? (
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-[#FFF7EB] mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <motion.div
                      animate={{
                        filter:
                          index === activeStep
                            ? "drop-shadow(0 0 20px rgba(74, 168, 196, 0.8))"
                            : "drop-shadow(0 0 0px rgba(74, 168, 196, 0))",
                      }}
                      transition={{ duration: 0.6 }}
                      className="text-5xl md:text-[120px] font-bold text-right"
                      style={
                        {
                          color: "transparent",
                          WebkitTextStroke:
                            index === activeStep
                              ? "2px rgba(74, 168, 196, 1)"
                              : "2px rgba(74, 168, 196, 0.2)",
                        } as React.CSSProperties
                      }
                    >
                      {milestone.year}
                    </motion.div>
                  </div>
                )}
              </div>
              {/* Center Dot */}
              <div className="hidden md:flex flex-col items-center z-20">
                <motion.div
                  animate={
                    index === activeStep
                      ? {
                          boxShadow:
                            "0 0 20px rgba(255, 247, 235, 1), 0 0 40px rgba(255, 247, 235, 0.5)",
                        }
                      : {
                          boxShadow: "0 0 0px rgba(255, 247, 235, 0)",
                        }
                  }
                  transition={{ duration: 0.6 }}
                  className="w-[8px] h-[8px] rounded-full ring-4 ring-[#0a1419] ring-offset-2 flex-shrink-0"
                  style={
                    {
                      backgroundColor: "#FFF7EB",
                      borderColor: "#FFF7EB",
                      boxShadow:
                        index === activeStep
                          ? "0 0 20px rgba(255, 247, 235, 1), 0 0 40px rgba(255, 247, 235, 0.5)"
                          : "0 0 0px rgba(255, 247, 235, 0)",
                    } as React.CSSProperties
                  }
                  whileHover={{ scale: 1.3 }}
                />
              </div>

              {/* Right Content (Either text or year) */}
              <div className="flex-1">
                {milestone.side === "right" ? (
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-[#FFF7EB] mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                ) : (
                  <div>
                    <motion.div
                      animate={{
                        filter:
                          index === activeStep
                            ? "drop-shadow(0 0 20px rgba(74, 168, 196, 0.8))"
                            : "drop-shadow(0 0 0px rgba(74, 168, 196, 0))",
                      }}
                      transition={{ duration: 0.6 }}
                      className="text-5xl md:text-[120px] font-bold"
                      style={
                        {
                          color: "transparent",
                          WebkitTextStroke:
                            index === activeStep
                              ? "2px rgba(74, 168, 196, 1)"
                              : "2px rgba(74, 168, 196, 0.2)",
                        } as React.CSSProperties
                      }
                    >
                      {milestone.year}
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Mobile Year Badge */}
              {/* <div className="md:hidden">
                <motion.div
                  animate={{
                    filter:
                      index === activeIndex
                        ? "drop-shadow(0 0 10px rgba(74, 168, 196, 0.8))"
                        : "drop-shadow(0 0 0px rgba(74, 168, 196, 0))",
                  }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl font-bold whitespace-nowrap"
                  style={
                    {
                      color: "transparent",
                      WebkitTextStroke:
                        index === activeIndex
                          ? "1px rgba(74, 168, 196, 1)"
                          : "1px rgba(74, 168, 196, 0.3)",
                    } as React.CSSProperties
                  }
                >
                  {milestone.year}
                </motion.div>
              </div> */}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Milestones;
