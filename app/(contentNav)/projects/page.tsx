"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Loader from "@/app/_components/Loader";
import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import { images } from "@/images/images";
import ContentHero from "@/app/(contentNav)/_components/ContentHero";

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { projectBg } = images();

  useEffect(() => {
    // Simulate page load - adjust timing as needed
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${
          typeof projectBg === "string" ? projectBg : projectBg.src
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ContentHero
        breadcrumb={{ home: "Home", current: "Projects" }}
        mainHeading="PROJECTS"
        headingLine2Highlight="WE"
        headingLine2End="HAVE DONE"
        backgroundImage={projectBg}
        sectionNumber="01"
        sectionLabel="PROJECTS"
      />
    </div>
  );
};

export default Projects;
