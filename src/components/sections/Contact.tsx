"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { cn } from "@/lib/utils";
import GradientText from "../ui/GradientText/GradientText";
import styles from "./Contact.module.scss";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        // Reset success after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <section id="contact" className={styles.contact}>
      <m.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={styles.inner}
      >
        <div className={styles.grid}>
          {/* Left Side: Human Heading */}
          <div className={styles.info}>
            <m.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={styles.title}
            >
              <GradientText colors={["#6366f1", "#a855f7", "#6366f1"]} animationSpeed={5}>
                Let&apos;s build something meaningful
              </GradientText>
            </m.h2>
            <m.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={styles.description}
            >
              Have a project in mind or just want to say hi? 
              I&apos;m always open to discussing new opportunities and how we can collaborate to create value.
            </m.p>
          </div>

          {/* Right Side: Aceternity Form */}
          <m.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={styles.card}
          >
            <h2 className="text-xl font-bold text-white">
              Get in touch
            </h2>
            <p className="mt-2 max-w-sm text-sm text-neutral-400">
              Fill out the form below and I&apos;ll get back to you as soon as possible.
            </p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <LabelInputContainer>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  placeholder="john@example.com" 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="message">Message</Label>
                <Input 
                  id="message" 
                  placeholder="Your message here..." 
                  isTextArea 
                  rows={4} 
                  required 
                  value={formData.message}
                  onChange={handleChange}
                />
              </LabelInputContainer>

              {error && (
                <m.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-4 flex items-center gap-2 text-sm text-rose-500 font-medium"
                >
                  <AlertCircle size={16} />
                  {error}
                </m.div>
              )}

              <button
                className={cn(
                  "group/btn relative h-10 w-full overflow-hidden rounded-md bg-zinc-800 text-white shadow-input transition-all hover:bg-zinc-700 disabled:opacity-50",
                  styles.submitBtn
                )}
                type="submit"
                disabled={isSubmitting || isSuccess}
              >
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <m.span 
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2 text-emerald-400"
                    >
                      Sent Successfully <CheckCircle2 size={16} />
                    </m.span>
                  ) : isSubmitting ? (
                    <m.span 
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      Sending... <m.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Send size={14} /></m.div>
                    </m.span>
                  ) : (
                    <span key="idle">Send Message &rarr;</span>
                  )}
                </AnimatePresence>
                <BottomGradient />
              </button>

              <div className={styles.divider} />
            </form>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className={cn(styles.bottomGradient, "group-hover/btn:opacity-100 opacity-0")} />
      <span className={cn(styles.bottomGradientSecondary, "group-hover/btn:opacity-100 opacity-0")} />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-4 mb-12", className)}>
      {children}
    </div>
  );
};
