"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { MagicCard, MagicGrid } from "../ui/MagicCard/MagicCard";
import GradientText from "../ui/GradientText/GradientText";
import styles from "./Experience.module.scss";

const experiences = [
  {
    role: "MERN Stack Developer",
    company: "Software Allience",
    period: "2024 - Present",
    description: "Leading the development of scalable web applications using the MERN stack. Focused on real-time systems, performance optimization, and role-based access control.",
    highlights: ["Automation", "Socket Integration", "RBAC Implementation", " Real Time System", "Performance Optimization", "RDMS"]
  },
  {
    role: "Junior Frontend Developer",
    company: "Software Allience",
    period: "2023 - 2024",
    description: "Developed responsive user interfaces and translated complex designs into functional React components. Collaborated closely with backend teams for API integration.",
    highlights: ["UI/UX Optimization", "Component Architecture", "State Management","Api Integration", "Optimization", " "]
  },
  {
    role: "Junior Backend Developer",
    company: "Software Allience",
    period: "2023 - 2024",
    description: "Make the Relational Database management system  and also make the API for the system. using the role based access contro also make the real time system using the socket.io.",
    highlights: ["RDMS", "API Integration", "Performance Tuning","Rest API", "Socket Integration", "RBAC"]
  }
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: headerScroll } = useScroll({
    target: headingRef,
    offset: ["start 0.9", "center center"],
  });

  const { scrollYProgress: timelineScroll } = useScroll({
    target: timelineRef,
    offset: ["start 0.9", "end 0.2"],
  });

  const width = useTransform(headerScroll, [0, 1], ["0%", "100%"]);
  const timelineScaleY = useTransform(timelineScroll, [0, 1], [0, 1]);

  return (
    <section id="experience" className={styles.experience} ref={containerRef}>
      <m.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className={styles.inner}
      >
        <div className={styles.header} ref={headingRef}>
          <div className={styles.fitContent}>
            <m.h2 
              variants={fadeIn("up", 0.1)}
              className={styles.title}
            >
              <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={3}>
                Professional Journey
              </GradientText>
            </m.h2>
            <div className={styles.underlineWrapper}>
              <m.div style={{ width }} className={styles.underline} />
            </div>
          </div>
        </div>

        <div className={styles.timelineWrapper} ref={timelineRef}>
          {/* Animated Timeline Line */}
          <div className={styles.timelineTrack}>
            <m.div 
              style={{ scaleY: timelineScaleY, originY: 0 }} 
              className={styles.timelineLine} 
            />
          </div>

          <MagicGrid className={styles.timeline}>
          {experiences.map((exp, i) => (
            <m.div
              key={exp.role}
              variants={fadeIn(i % 2 === 0 ? "right" : "left", 0.2)}
              className={`${styles.itemWrapper} ${i % 2 === 0 ? styles.left : styles.right}`}
            >
              {/* Dot */}
              <div className={styles.dot} />

              <MagicCard className={styles.magicCardWrapper} borderGlow={true}>
                <div className={styles.cardInner}>
                  <span className={styles.period}>{exp.period}</span>
                  <h3 className={styles.role}>{exp.role}</h3>
                  <p className={styles.company}>{exp.company}</p>
                  <p className={styles.description}>{exp.description}</p>
                  <div className={styles.highlights}>
                    {exp.highlights.map((h) => (
                      <span key={h} className={styles.highlightTag}>
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </MagicCard>
            </m.div>
          ))}
          </MagicGrid>
        </div>
      </m.div>
    </section>
  );
}
