"use client";

import { m, useReducedMotion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { ExternalLink, Github } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";
import { MagicCard, MagicGrid } from "../ui/MagicCard/MagicCard";
import GradientText from "../ui/GradientText/GradientText";
import styles from "./Projects.module.scss";

const projects = [
  {
    title: "Construction Ticket Management",
    problem: "Inefficient manual tracking of equipment maintenance and site requests.",
    solution: "Developed an automated ticketing system with real-time status tracking.",
    impact: "Reduced equipment downtime by 20% through automated maintenance alerts.",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    github: "https://github.com/Daniyalsaddiqui",
    live: "https://new.ticketview.ca/"
  },
  {
    title: "Jamica Restaurant",
    problem: "Open the new bussiness and needed a website to market the restaurant.",
    solution: "Built a website with a restaurant menu and booking system.",
    impact: "Increased the number of bookings by 20%.",
    tech: ["MERN Stack", "React.js", "big bucket", "Next.js", "TypeScript","PostgreSQL"],
    github: "https://github.com/Daniyalsaddiqui",
    live: "https://jamica-restaurant.vercel.app/"
  },
  {
    title: "Real Estate Property Platform",
    problem: "High bounce rates on property listings due to slow load times and poor UX.",
    solution: "Optimized image delivery and implemented a high-performance search engine.",
    impact: "Increased user engagement duration by 40% per session.",
    tech: ["MERN Stack",  "TypeScript","React.js","Node.js","PostgreSQL","Scss"],
    github: "https://github.com/Daniyalsaddiqui",
    live: "https://dev.showupmate.com/"
  },
  {
    title: "Comparison Tools",
    problem: "Compare products and ai tools which are available in the market.",
    solution: "Built a webiste tht comparison  a Ai tools and products.",
    impact: "Help the users to compare products and ai tools which one is best for them.",
    tech: ["NestJs", "Automation", "TypeScript","PostgreSQL"],
    github: "https://github.com/Daniyalsaddiqui",
    live: "https://comparison.com/lander?oref=https%3A%2F%2Fwww.google.com%2F"
  },
  {
    title: "AI Learning Tool (Extension)",
    problem: "Information overload when learning new technical concepts online.",
    solution: "Chrome extension that uses AI to summarize documentation and link related resources.",
    impact: "Helping 500+ developers learn faster by condensing technical documentation.",
    tech: ["JavaScript", "OpenAI API", "Chrome API", "NestJs","TypeScript","PostgreSQL"],
    github: "https://github.com/Daniyalsaddiqui",
    live: "https://ai-learning-tool.com/"
  },
  {
    title: "Real-time Blog Management System",
    problem: "Internal teams struggled with concurrent edits and role-based content approvals.",
    solution: "Built a centralized platform with Socket.io for live updates and robust RBAC.",
    impact: "Streamlined content workflows for an internal team of 15+ editors.",
    tech: ["MERN Stack", "React.js", "TypeScript","NodeJs","Socket.io"],
    github: "https://github.com/Daniyalsaddiqui",
    live: "#"
  },
];

export function Projects() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="projects" className={styles.projects}>
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
                Selected Projects
              </GradientText>
            </m.h2>
            <div className={styles.underlineWrapper}>
              <m.div
                className={styles.underline}
                initial={shouldReduceMotion ? undefined : { width: "0%" }}
                whileInView={shouldReduceMotion ? undefined : { width: "100%" }}
                viewport={shouldReduceMotion ? undefined : { once: false, margin: "-50px", amount: 0.3 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        <MagicGrid className={styles.grid}>
          {projects.map((project, i) => (
            <m.div
              key={project.title}
              variants={shouldReduceMotion ? undefined : fadeIn("up", 0.2 * (i % 2 === 0 ? 1 : 1.5))}
              className={styles.cardContainer}
            >
              <MagicCard className={styles.magicCardWrapper} borderGlow={true}>
                <div className={styles.cardInner}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <div className={styles.links}>
                      <Magnetic>
                        <a href={project.github} className={styles.linkIcon}>
                          <Github size={18} />
                        </a>
                      </Magnetic>
                      <Magnetic>
                        <a href={project.live} className={styles.linkIcon}>
                          <ExternalLink size={18} />
                        </a>
                      </Magnetic>
                    </div>
                  </div>

                  <div className={styles.sectionWrapper}>
                    <div className={styles.section}>
                      <span className={styles.sectionLabel}>Problem</span>
                      <p className={styles.sectionText}>{project.problem}</p>
                    </div>
                    <div className={styles.section}>
                      <span className={styles.sectionLabel}>Solution & Impact</span>
                      <p className={styles.sectionImpact}>{project.impact}</p>
                    </div>
                  </div>

                  <div className={styles.techStack}>
                    {project.tech.map((t) => (
                      <span key={t} className={styles.techTag}>
                        {t}
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
