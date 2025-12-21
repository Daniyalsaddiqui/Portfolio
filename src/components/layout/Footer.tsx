"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";
import { CONFIG } from "@/lib/config";
import styles from "./Footer.module.scss";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.copyrightWrapper}>
          <div className={styles.logo}>
            DS<span>.</span>
          </div>
          <p className={styles.copyright}>
            &copy; {currentYear} Daniyal Saddiqui. All rights reserved.
          </p>
        </div>

        <div className={styles.socials}>
          <Magnetic>
            <a href={CONFIG.GITHUB} target="_blank" className={styles.socialIcon}>
              <Github size={20} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={CONFIG.LINKEDIN} target="_blank" className={styles.socialIcon}>
              <Linkedin size={20} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={CONFIG.TWITTER} target="_blank" className={styles.socialIcon}>
              <Twitter size={20} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={`mailto:${CONFIG.EMAIL}`} className={styles.socialIcon}>
              <Mail size={20} />
            </a>
          </Magnetic>
        </div>

        <div className={styles.navLinks}>
          <a href="#" className={styles.navLink}>Privacy</a>
          <a href="#" className={styles.navLink}>Terms</a>
        </div>
      </div>
    </footer>
  );
}
