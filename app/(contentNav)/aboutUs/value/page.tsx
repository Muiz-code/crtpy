"use client";

import React from "react";
import Image from "next/image";
import { images } from "@/images/images";
import ValueCard from "./_components/ValueCard";
import SectionIndicator from "../../_components/SectionIndicator";
import { motion } from "framer-motion";

export default function ValuePage() {
  const { creativity, excellence, innovation, teamwork } = images();
  return (
    <div className="bg-[#0a1419] w-full mb-10">
      <SectionIndicator sectionNumber="02" sectionLabel="VALUES" />
      <motion.div className="flex w-full flex md:flex-row flex-col md:gap-0 gap-4 md:h-50 justify-between mt-[80px] mb-[64px]">
        <motion.div
          className="w-full text-[#FFF7EB]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="flex md:flex-col flex-row md:justify-start justify-center gap-2 md:gap-4 w-full md:w-130.5">
            <h1 className="text-4xl md:text-[80px] font-bold md:font-semibold leading-tight">
              VALUES
            </h1>
            <h1 className="text-4xl md:text-[80px] font-bold md:font-semibold leading-tight">
              <span
                style={{
                  WebkitTextStroke: "2px white",
                  color: "transparent",
                }}
              >
                WE{" "}
              </span>
              PURSUE
            </h1>
          </div>
        </motion.div>

        <motion.div className="md:w-220 w-full flex items-end h-full">
          <motion.p className="text-[#FFF7EB] text-[16px] font-light md:text-start text-center">
            Discover the heartbeat of our agency in the in our values, where
            integrity, innovation, and client-centricity converge to form the
            foundation of our digital excellence.
          </motion.p>
        </motion.div>
      </motion.div>

      <section className="w-full h-auto md:h-[446px] flex md:justify-between justify-center items-center md:py-20 py-0">
        {/* Values Grid */}
        <motion.div className="flex md:flex-row flex-col items-center md:gap-[67px] gap-10 w-full">
          <div className="md:mt-[40px] mt-0">
            <ValueCard
              icon={
                <Image
                  src={creativity}
                  alt="Creativity Icon"
                  width={80}
                  height={80}
                />
              }
              title="Creativity"
              description="We strive to bring fresh, imaginative ideas to every projects."
              index={0}
            />
          </div>
          <ValueCard
            icon={
              <Image
                src={excellence}
                alt="Excellence Icon"
                width={80}
                height={80}
              />
            }
            title="Excellence"
            description="We are committed to delivering more excellence in every aspect of our work."
            index={1}
          />{" "}
          <div className="md:mt-[40px] mt-0">
            <ValueCard
              icon={
                <Image
                  src={innovation}
                  alt="Innovation Icon"
                  width={80}
                  height={80}
                />
              }
              title="Innovation"
              description="We embrace innovation and stay ahead of the curve with our innovation."
              index={2}
            />
          </div>
          <ValueCard
            icon={
              <Image
                src={teamwork}
                alt="Teamwork Icon"
                width={80}
                height={80}
              />
            }
            title="Teamwork"
            description="We value collaboration and open teamwork communication."
            index={3}
          />
        </motion.div>
      </section>
    </div>
  );
}
