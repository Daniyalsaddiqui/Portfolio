"use client";

import { m, useReducedMotion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { Code2, Database, Layout, Settings, Server, Workflow } from "lucide-react";
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
    icon: <Server className="text-primary" size={24} />,
    skills: ["Node.js", "Express.js", "JavaScript", "REST APIs", "Socket.io", "Authentication (JWT/OAuth)"],
    context: "Developing scalable server-side logic and real-time communication systems."
  },
  {
    title: "Databases",
    icon: <Database className="text-secondary" size={24} />,
    skills: ["MongoDB", "PostgreSQL", "Prisma", "Redis"],
    context: "Designing efficient schemas and managing high-availability data solutions."
  },
  {
    title: "AI Automation",
    icon: <Workflow className="text-secondary" size={24} />,
    skills: ["RAG workflow", "n8n", "make.com", "Webhooks", "AI Agents", "Workflow Design"],
    context: "Creating intelligent automation workflows that streamline processes and boost productivity."
  },
  {
    title: "Tools & DevOps",
    icon: <Code2 className="text-secondary" size={24} />,
    skills: ["Git", "Docker", "AWS / Vercel", "Testing (Jest/Cypress)", "CI/CD Pipelines"],
    context: "Streamlining development workflows and ensuring production-ready deployments."
  }
];

export function Skills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="skills" className={styles.skills}>
      <m.div
        variants={shouldReduceMotion ? undefined : staggerContainer()}
        initial={shouldReduceMotion ? undefined : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "show"}
        viewport={shouldReduceMotion ? undefined : { once: true, margin: "-50px" }}
        className={styles.inner}
      >
        <div className={styles.header}>
          <div className={styles.fitContent}>
            <m.h2 
              variants={shouldReduceMotion ? undefined : fadeIn("up", 0.1)}
              className={styles.title}
            >
              <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={3}>
                Technical Ecosystem
              </GradientText>
            </m.h2>
            <div className={styles.underlineWrapper}>
              <m.div
                className={styles.underline}
                initial={shouldReduceMotion ? undefined : { width: "0%" }}
                whileInView={shouldReduceMotion ? undefined : { width: "100%" }}
                viewport={shouldReduceMotion ? undefined : { once: false, margin: "0px", amount: 0.5 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
              />
            </div>
          </div>
        </div>

        <MagicGrid className={styles.grid}>
          {skillCategories.map((cat, i) => (
            <m.div
              key={cat.title}
              variants={shouldReduceMotion ? undefined : fadeIn("up", 0.1 * (i + 1))}
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
