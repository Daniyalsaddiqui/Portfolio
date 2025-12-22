"use client";

import { m, useReducedMotion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import GradientText from "../ui/GradientText/GradientText";
import styles from "./About.module.scss";

export function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className={styles.about}>
      <m.div
        variants={shouldReduceMotion ? undefined : staggerContainer()}
        initial={shouldReduceMotion ? undefined : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "show"}
        viewport={shouldReduceMotion ? undefined : { once: true, margin: "-120px" }}
        className={styles.inner}
      >
        <div className={styles.grid}>
          <m.div
            variants={shouldReduceMotion ? undefined : fadeIn("right", 0.2)}
            className={styles.header}
          >
            <div className={styles.fitContent}>
              <h2 className={styles.title}>
                <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={3}>
                  Driven by Problem-Solving & Scalability
                </GradientText>
              </h2>
              <div className={styles.underlineWrapper}>
                <m.div
                  className={styles.underline}
                  initial={shouldReduceMotion ? undefined : { width: "0%" }}
                  whileInView={shouldReduceMotion ? undefined : { width: "100%" }}
                  viewport={shouldReduceMotion ? undefined : { once: true, margin: "-120px" }}
                  transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          </m.div>

          <m.div
            variants={shouldReduceMotion ? undefined : fadeIn("left", 0.3)}
            className={styles.content}
          >
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
