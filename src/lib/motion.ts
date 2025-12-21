import { Variants } from "framer-motion";

export const fadeIn = (direction: "up" | "down" | "left" | "right", delay: number = 0): Variants => ({
    hidden: {
        y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
        x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
        opacity: 0,
    },
    show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 1.25,
            delay: delay,
        },
    },
});

export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0): Variants => ({
    hidden: {},
    show: {
        transition: {
            staggerChildren: staggerChildren,
            delayChildren: delayChildren,
        },
    },
});

export const textVariant = (delay: number = 0): Variants => ({
    hidden: {
        y: 50,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 1.25,
            delay: delay,
        },
    },
});

export const scaleIn = (delay: number = 0): Variants => ({
    hidden: {
        scale: 0.8,
        opacity: 0,
    },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 1.25,
            delay: delay,
        },
    },
});
