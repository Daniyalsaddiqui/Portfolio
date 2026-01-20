"use client";

import { m } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Download, ChevronRight } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";
import dynamic from "next/dynamic";
import GradientText from "../ui/GradientText/GradientText";
import { CONFIG } from "@/lib/config";
import styles from "./Hero.module.scss";
import Image from "next/image";

const LightPillar = dynamic(() => import("../ui/LightPillar/LightPillar"), {
  ssr: false,
});

export function Hero() {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Defer LightPillar to allow LCP (hero image) to be detected first
    const run = () => {
      // Add extra delay to ensure LCP is captured before heavy WebGL loads
      setTimeout(() => setShowBackground(true), 2000);
    };

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(run, { timeout: 3000 });
    } else {
      setTimeout(run, 2000);
    }
  }, []);

  return (
    <section className={styles.hero}>
      {/* LightPillar Background */}
      {showBackground && (
        <div className={styles.pillarBg}>
          <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={1.0}
            rotationSpeed={9}
            glowAmount={0.003}
            pillarWidth={6.0}
            pillarHeight={0.1}
            noiseIntensity={0.5}
            pillarRotation={135} // Diagonal flow: top-right to bottom-left
            interactive={false}
            mixBlendMode="normal"
          />
        </div>
      )}

      <m.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className={styles.inner}
      >
        {/* Left Column: Text Content */}
        <div className={styles.contentLeft}>
          <div className={styles.headingWrapper}>
            <div className={styles.textGlow} />
            <div className={styles.fitContent}>
              <h1 className={styles.title}>
                <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={3}>
                  DANIYAL SADDIQUI
                </GradientText>
              </h1>
              <div className={styles.underlineTrack}>
                <m.div 
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: false, margin: "0px", amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  className={styles.scrollUnderline} 
                />
              </div>
            </div>
            
            <m.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className={styles.subtitle}
            >
              Full-Stack Developer & AI Automation Specialist with 1+ year of experience <br />
              building scalable web solutions and intelligent automation workflows that solve real-world problems.
            </m.p>
          </div>

          {/* Actions */}
          <m.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={styles.actions}
          >
            <Magnetic>
              <a href="#projects" className={styles.primaryBtn} aria-label="View Projects">
                <span>View Projects</span>
                <ChevronRight size={18} aria-hidden="true" />
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

        {/* Right Column: Professional Image Section */}
        <m.div 
          className={styles.visualContainer}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Mobile: Clean Professional Card */}
          <div className={styles.imageCard}>
            <div className={styles.imageWrapper}>
              <Image 
                src={CONFIG.HERO_IMAGE} 
                alt="Daniyal Saddiqui - Full-Stack Developer" 
                className={styles.portrait}
                width={400}
                height={400}
                priority
                fetchPriority="high"
              />
            </div>
          </div>

          {/* Desktop: Circular design with abstract elements */}
          <div className={styles.circleFrame}>
            <div className={styles.abstractCircle1} />
            <div className={styles.abstractCircle2} />
            <div className={styles.abstractArc} />
            
            <Image 
              src={CONFIG.HERO_IMAGE} 
              alt="Daniyal Saddiqui - Full-Stack Developer" 
              className={styles.portrait}
              width={400}
              height={400}
              priority
              fetchPriority="high"
            />
          </div>
        </m.div>
      </m.div>
    </section>
  );
}
