"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { Github, Download, ChevronRight } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";
import LightPillar from "../ui/LightPillar/LightPillar";
import GradientText from "../ui/GradientText/GradientText";
import { CONFIG } from "@/lib/config";
import styles from "./Hero.module.scss";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scroll effect for the header underline
  const underlineWidth = useTransform(scrollYProgress, [0, 0.4], ["0%", "100%"]);
  
  // Parallax / Fade effects for smoothness
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section className={styles.hero} ref={containerRef}>
      {/* LightPillar Background */}
      <div className={styles.pillarBg}>
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={0.4}
          rotationSpeed={0.5}
          glowAmount={0.001}
          pillarWidth={5.0}
          pillarHeight={0.1}
          noiseIntensity={0.3}
          pillarRotation={135} // Diagonal flow: top-right to bottom-left
          interactive={false}
          mixBlendMode="normal"
        />
      </div>

      <m.div 
        style={{ opacity: contentOpacity }}
        className={styles.inner}
      >
        {/* Left Column: Text Content */}
        <div className={styles.contentLeft}>
          <div className={styles.headingWrapper}>
            <div className={styles.textGlow} />
            <div className={styles.fitContent}>
              <m.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={styles.title}
              >
                <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={3}>
                  DANIYAL SADDIQUI
                </GradientText>
              </m.h1>
              <div className={styles.underlineTrack}>
                <m.div 
                  style={{ width: underlineWidth }} 
                  className={styles.scrollUnderline} 
                />
              </div>
            </div>
            
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={styles.subtitle}
            >
              Full-Stack Developer with 1+ year of professional experience crafting <br />
              high-performance, user-centric web solutions that solve real-world problems.
            </m.p>
          </div>

          {/* Actions */}
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={styles.actions}
          >
            <Magnetic>
              <a href="#projects" className={styles.primaryBtn}>
                <span>View Projects</span>
                <ChevronRight size={18} />
              </a>
            </Magnetic>
            {/* <Magnetic>
              <a href={CONFIG.RESUME_URL} download className={styles.secondaryBtn}>
                <span>Download CV</span>
                <Download size={18} />
              </a>
            </Magnetic> */}
          </m.div>
        </div>

        {/* Right Column: Redesigned Geometric Portrait Area */}
        <m.div 
          className={styles.visualContainer}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Abstract Layering Shapes */}
          <div className={styles.abstractCircle1} />
          <div className={styles.abstractCircle2} />
          <div className={styles.abstractArc} />

          <m.div 
            style={{ y: imageY }}
            className={styles.circleFrame}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={CONFIG.HERO_IMAGE} 
              alt="Profile" 
              className={styles.portrait}
            />
          </m.div>

          
        </m.div>
      </m.div>
    </section>
  );
}
