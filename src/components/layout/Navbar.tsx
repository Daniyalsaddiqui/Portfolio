"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "../ui/Magnetic";
import { CONFIG } from "@/lib/config";
import styles from "./Navbar.module.scss";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        styles.nav,
        scrolled && styles.scrolled
      )}
    >
      <div className={styles.inner}>
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={styles.logoWrapper}
        >
          <a href="#" aria-label="Home" className={styles.logo}>
            DS<span className={styles.logoDot} />
          </a>
        </m.div>

        {/* Desktop Nav */}
        <div className={styles.desktopNav}>
          {navLinks.map((link, i) => (
            <m.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={styles.navLink}
            >
              {link.name}
            </m.a>
          ))}
          <div className={styles.socialsWrapper}>
            <Magnetic>
              <a href={CONFIG.GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className={styles.socialLink}>
                <Github size={20} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={CONFIG.LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className={styles.socialLink}>
                <Linkedin size={20} />
              </a>
            </Magnetic>
            <Magnetic>
              <a 
                href={CONFIG.RESUME_URL} 
                className={styles.cvButton}
                download
                aria-label="Download Resume"
              >
                <Download size={16} />
                <span>Resume</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className={styles.mobileMenuToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={styles.mobileMenu}
          >
            <div className={styles.mobileInner}>
              <div className={styles.mobileLinks}>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={styles.mobileNavLink}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <div className={styles.mobileSocials}>
                <a href={CONFIG.GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile"><Github size={24} /></a>
                <a href={CONFIG.LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"><Linkedin size={24} /></a>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
