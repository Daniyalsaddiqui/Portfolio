"use client";

import { m } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { Send, Mail, MapPin } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";
import { CONFIG } from "@/lib/config";
import GradientText from "../ui/GradientText/GradientText";
import styles from "./Contact.module.scss";

export function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <m.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className={styles.inner}
      >
        <div className={styles.grid}>
          <m.div variants={fadeIn("right", 0.2)} className={styles.info}>
            <div>
              <h2 className={styles.title}>
                <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={3}>
                  Let&apos;s Build Something Extraordinary
                </GradientText>
              </h2>
              <p className={styles.description}>
                Currently looking for new opportunities and interesting projects to collaborate on. 
                Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </p>
            </div>

            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <Mail size={20} />
                </div>
                <div>
                  <p className={styles.label}>Email</p>
                  <p className={styles.value}>{CONFIG.EMAIL}</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <MapPin size={20} />
                </div>
                <div>
                  <p className={styles.label}>Location</p>
                  <p className={styles.value}>{CONFIG.LOCATION}</p>
                </div>
              </div>
            </div>
          </m.div>

          <m.div 
            variants={fadeIn("left", 0.3)}
            className={styles.formCard}
          >
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputsGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className={styles.input}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell me about your project..."
                  className={styles.textarea}
                />
              </div>
              <Magnetic className="w-full">
                <button 
                  type="submit"
                  className={styles.submitButton}
                >
                  Send Message
                  <Send size={18} />
                </button>
              </Magnetic>
            </form>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}
