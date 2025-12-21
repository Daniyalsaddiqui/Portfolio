"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeIn, staggerContainer } from "@/lib/motion";
import GradientText from "../ui/GradientText/GradientText";
import styles from "./About.module.scss";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.9", "center center"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="about" className={styles.about} ref={containerRef}>
      <m.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className={styles.inner}
      >
        <div className={styles.grid}>
          <m.div variants={fadeIn("right", 0.2)} className={styles.header} ref={headingRef}>
            <div className={styles.fitContent}>
              <h2 className={styles.title}>
                <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={3}>
                  Driven by Problem-Solving & Scalability
                </GradientText>
              </h2>
              <div className={styles.underlineWrapper}>
                <m.div style={{ width }} className={styles.underline} />
              </div>
            </div>
          </m.div>

          <m.div variants={fadeIn("left", 0.3)} className={styles.content}>
            <p>
              With a year of real-world experience in the MERN stack, I specialize in bridging the gap between complex backend logic 
              and intuitive frontend experiences. My focus is on creating systems that are not just functional, but built to scale.
            </p>
            <p>
              I believe in clean code, performance optimization, and the importance of user experience. From architecting role-based 
              systems with Socket.io to optimizing database schemas for real estate platforms, I thrive on tackling technical challenges 
              that have a direct impact on business growth.
            </p>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <h4>1+ Year</h4>
                <p>Real-world experience</p>
              </div>
              <div className={styles.statItem}>
                <h4>MERN</h4>
                <p>Primary Tech Stack</p>
              </div>
            </div>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}
