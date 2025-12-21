"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { Code2, Database, Layout, Settings } from "lucide-react";
import { MagicCard, MagicGrid } from "../ui/MagicCard/MagicCard";
import GradientText from "../ui/GradientText/GradientText";
import styles from "./Skills.module.scss";

const skillCategories = [
  {
    title: "Frontend",
    icon: <Layout className="text-secondary" size={24} />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux Toolkit"],
    context: "Building responsive, highly interactive user interfaces with modern frameworks."
  },
  {
    title: "Backend",
    icon: <Settings className="text-primary" size={24} />,
    skills: ["Node.js", "Express.js", "REST APIs", "Socket.io", "Authentication (JWT/OAuth)"],
    context: "Developing scalable server-side logic and real-time communication systems."
  },
  {
    title: "Databases",
    icon: <Database className="text-secondary" size={24} />,
    skills: ["MongoDB", "PostgreSQL", "Mongoose", "Prisma", "Redis"],
    context: "Designing efficient schemas and managing high-availability data solutions."
  },
  {
    title: "Tools & DevOps",
    icon: <Code2 className="text-primary" size={24} />,
    skills: ["Git", "Docker", "AWS / Vercel", "Testing (Jest/Cypress)", "CI/CD Pipelines"],
    context: "Streamlining development workflows and ensuring production-ready deployments."
  }
];

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.9", "center center"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="skills" className={styles.skills} ref={containerRef}>
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
                Technical Ecosystem
              </GradientText>
            </m.h2>
            <div className={styles.underlineWrapper}>
              <m.div style={{ width }} className={styles.underline} />
            </div>
          </div>
        </div>

        <MagicGrid className={styles.grid}>
          {skillCategories.map((cat, i) => (
            <m.div
              key={cat.title}
              variants={fadeIn("up", 0.1 * (i + 1))}
              className={styles.cardContainer}
            >
              <MagicCard className={styles.magicCardWrapper} borderGlow={true}>
                <div className={styles.cardInner}>
                  <div className={styles.iconWrapper}>
                    {cat.icon}
                  </div>
                  <h3 className={styles.cardTitle}>{cat.title}</h3>
                  <p className={styles.context}>
                    {cat.context}
                  </p>
                  <div className={styles.skillList}>
                    {cat.skills.map((skill) => (
                      <span 
                        key={skill}
                        className={styles.skillTag}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </MagicCard>
            </m.div>
          ))}
        </MagicGrid>
      </m.div>
    </section>
  );
}
