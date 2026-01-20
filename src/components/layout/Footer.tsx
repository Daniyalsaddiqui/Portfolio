"use client";

import { m } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUp, Heart } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";
import { CONFIG } from "@/lib/config";
import styles from "./Footer.module.scss";
import { useState, useEffect } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled more than 400px from top
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer className={styles.footer}>
      {/* Floating Gradient Orbs Background */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      
      {/* Animated Gradient Divider */}
      <div className={styles.gradientDivider}>
        <m.div 
          className={styles.gradientLine}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>

      <m.div 
        className={styles.inner}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Left Section: Brand & Tagline */}
        <m.div className={styles.brandSection} variants={itemVariants}>
          <div className={styles.logo}>
            DS<span className={styles.logoDot}>.</span>
          </div>
          <p className={styles.tagline}>
            Crafting digital experiences
            <br />
            <span className={styles.gradientText}>one pixel at a time</span>
          </p>
          <div className={styles.madeWith}>
            Made with <Heart size={14} className={styles.heartIcon} /> by Daniyal
          </div>
        </m.div>

        {/* Center Section: Quick Links */}
        <m.div className={styles.linksSection} variants={itemVariants}>
          <div className={styles.linkColumn}>
            <h4 className={styles.linkTitle}>Navigation</h4>
            <a href="#hero" className={styles.link}>Home</a>
            <a href="#about" className={styles.link}>About</a>
            <a href="#projects" className={styles.link}>Projects</a>
            <a href="#experience" className={styles.link}>Experience</a>
          </div>
          <div className={styles.linkColumn}>
            <h4 className={styles.linkTitle}>Contact</h4>
            <a href={`mailto:${CONFIG.EMAIL}`} className={styles.link}>Email</a>
            <a href={CONFIG.GITHUB} target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
            <a href={CONFIG.LINKEDIN} target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
          </div>
        </m.div>

        {/* Right Section: Social Links & CTA */}
        <m.div className={styles.socialSection} variants={itemVariants}>
          <h4 className={styles.socialTitle}>Let's Connect</h4>
          <div className={styles.socials}>
            <Magnetic>
              <a 
                href={CONFIG.GITHUB} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub Profile" 
                className={styles.socialIcon}
              >
                <Github size={22} />
              </a>
            </Magnetic>
            <Magnetic>
              <a 
                href={CONFIG.LINKEDIN} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn Profile" 
                className={styles.socialIcon}
              >
                <Linkedin size={22} />
              </a>
            </Magnetic>
            {CONFIG.TWITTER !== "https://twitter.com/yourusername" && (
              <Magnetic>
                <a 
                  href={CONFIG.TWITTER} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Twitter Profile" 
                  className={styles.socialIcon}
                >
                  <Twitter size={22} />
                </a>
              </Magnetic>
            )}
            <Magnetic>
              <a 
                href={`mailto:${CONFIG.EMAIL}`} 
                aria-label="Send Email" 
                className={styles.socialIcon}
              >
                <Mail size={22} />
              </a>
            </Magnetic>
          </div>
          <p className={styles.availability}>
            Currently <span className={styles.availableDot}>●</span> Available for opportunities
          </p>
        </m.div>
      </m.div>

      {/* Bottom Bar */}
      <m.div 
        className={styles.bottomBar}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            © {currentYear} Daniyal Saddiqui. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <a href="#privacy" className={styles.legalLink}>Privacy</a>
            <span className={styles.separator}>•</span>
            <a href="#terms" className={styles.legalLink}>Terms</a>
          </div>
        </div>
      </m.div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Magnetic>
          <m.button
            className={styles.scrollTop}
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </m.button>
        </Magnetic>
      )}
    </footer>
  );
}
