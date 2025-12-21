"use client";

import { m, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./ScrollProgress.module.scss";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={styles.scrollWrapper}>
      <m.div 
        className={styles.scrollIndicator}
        style={{ scaleY }}
      />
    </div>
  );
}
