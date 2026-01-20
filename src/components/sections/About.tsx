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
        viewport={shouldReduceMotion ? undefined : { once: true, margin: "-50px" }}
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
                  Building Intelligent Solutions & Scalable Systems
                </GradientText>
              </h2>
              <div className={styles.underlineWrapper}>
                <m.div
                  className={styles.underline}
                  initial={shouldReduceMotion ? undefined : { width: "0%" }}
                  whileInView={shouldReduceMotion ? undefined : { width: "100%" }}
                  viewport={shouldReduceMotion ? undefined : { once: false, margin: "0px", amount: 0.5 }}
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
              With a year of real-world experience, I bridge the gap between full-stack web development and intelligent automation. 
              My expertise spans the MERN stack for building scalable applications and AI automation tools like n8n and make.com 
              for creating smart workflows that transform business processes.
            </p>
            <p>
              From architecting role-based systems with Socket.io to building AI-powered automation workflows that handle content 
              creation and social media management, I focus on delivering solutions that combine technical excellence with real business impact. 
              Whether it's optimizing database schemas or designing intelligent automation pipelines, I thrive on challenges that require both 
              engineering precision and creative problem-solving.
            </p>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <h4>1+ Year</h4>
                <p>Real-world experience</p>
              </div>
              <div className={styles.statItem}>
                <h4>MERN + AI</h4>
                <p>Core Tech Expertise</p>
              </div>
            </div>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}
