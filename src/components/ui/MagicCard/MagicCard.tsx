"use client";

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import styles from './MagicCard.module.scss';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  particleCount?: number;
  glowColor?: string; // e.g. "132, 0, 255"
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  borderGlow?: boolean;
  disabled?: boolean;
}

const createParticleElement = (x: number, y: number, color: string) => {
  const el = document.createElement('div');
  el.className = styles.particle;
  el.style.cssText = `
    left: ${x}px;
    top: ${y}px;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
  `;
  return el;
};

export const MagicCard: React.FC<MagicCardProps> = ({
  children,
  className,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  borderGlow = true,
  disabled = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isHoveredRef = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldDisable = disabled || isMobile;

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => particle.remove()
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
        const timeoutId = setTimeout(() => {
            if (!isHoveredRef.current || !cardRef.current) return;

            const particle = createParticleElement(
                Math.random() * width,
                Math.random() * height,
                glowColor
            );
            cardRef.current.appendChild(particle);
            particlesRef.current.push(particle);

            gsap.fromTo(particle, 
                { scale: 0, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
            );

            gsap.to(particle, {
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                rotation: Math.random() * 360,
                duration: 2 + Math.random() * 2,
                ease: 'none',
                repeat: -1,
                yoyo: true
            });

            gsap.to(particle, {
                opacity: 0.3,
                duration: 1.5,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true
            });
        }, i * 100);
        timeoutsRef.current.push(timeoutId);
    }
  }, [particleCount, glowColor]);

  useEffect(() => {
    if (shouldDisable || !cardRef.current) return;

    const el = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearParticles();
      
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        gsap.to(el, {
          rotateX,
          rotateY,
          duration: 0.2,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.1;
        const magnetY = (y - centerY) * 0.1;
        magnetismAnimationRef.current = gsap.to(el, {
          x: magnetX,
          y: magnetY,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 10;
      `;
      el.appendChild(ripple);

      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, {
        scale: 1,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => ripple.remove()
      });
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('click', handleClick);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('click', handleClick);
      clearParticles();
    };
  }, [shouldDisable, animateParticles, clearParticles, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={cn(
        styles.magicCard,
        borderGlow && styles.borderGlow,
        className
      )}
      style={{ 
        '--glow-color-rgb': glowColor,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

interface MagicGridProps {
    children: React.ReactNode;
    className?: string;
    spotlightRadius?: number;
    glowColor?: string;
    disabled?: boolean;
}

export const MagicGrid: React.FC<MagicGridProps> = ({
    children,
    className,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    glowColor = DEFAULT_GLOW_COLOR,
    disabled = false
}) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (disabled || isMobile || !gridRef.current) return;

        const spotlight = document.createElement('div');
        spotlight.className = styles.globalSpotlight;
        spotlight.style.setProperty('--glow-color-rgb', glowColor);
        document.body.appendChild(spotlight);
        spotlightRef.current = spotlight;

        const handleMouseMove = (e: MouseEvent) => {
            if (!spotlightRef.current || !gridRef.current) return;

            const rect = gridRef.current.getBoundingClientRect();
            const mouseInside = 
                e.clientX >= rect.left && 
                e.clientX <= rect.right && 
                e.clientY >= rect.top && 
                e.clientY <= rect.bottom;

            const cards = gridRef.current.querySelectorAll(`.${styles.magicCard}`);

            if (!mouseInside) {
                gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
                cards.forEach(card => (card as HTMLElement).style.setProperty('--glow-intensity', '0'));
                return;
            }

            const proximity = spotlightRadius * 0.5;
            const fadeDistance = spotlightRadius * 0.75;
            let minDistance = Infinity;

            cards.forEach(card => {
                const cardEl = card as HTMLElement;
                const cardRect = cardEl.getBoundingClientRect();
                const centerX = cardRect.left + cardRect.width / 2;
                const centerY = cardRect.top + cardRect.height / 2;
                const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
                const effectiveDistance = Math.max(0, distance);

                minDistance = Math.min(minDistance, effectiveDistance);

                let intensity = 0;
                if (effectiveDistance <= proximity) intensity = 1;
                else if (effectiveDistance <= fadeDistance) {
                    intensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
                }

                const relX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
                const relY = ((e.clientY - cardRect.top) / cardRect.height) * 100;

                cardEl.style.setProperty('--glow-x', `${relX}%`);
                cardEl.style.setProperty('--glow-y', `${relY}%`);
                cardEl.style.setProperty('--glow-intensity', intensity.toString());
                cardEl.style.setProperty('--glow-radius', `${spotlightRadius}px`);
            });

            gsap.to(spotlightRef.current, {
                left: e.clientX,
                top: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });

            const targetOpacity = minDistance <= proximity ? 0.8 : 
                                 minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;

            gsap.to(spotlightRef.current, {
                opacity: targetOpacity,
                duration: targetOpacity > 0 ? 0.2 : 0.5
            });
        };

        const handleMouseLeave = () => {
            if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
            gridRef.current?.querySelectorAll(`.${styles.magicCard}`).forEach(card => {
                (card as HTMLElement).style.setProperty('--glow-intensity', '0');
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        gridRef.current.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            spotlightRef.current?.remove();
        };
    }, [disabled, isMobile, spotlightRadius, glowColor]);

    return (
        <div ref={gridRef} className={cn(styles.magicGrid, className)}>
            {children}
        </div>
    );
};
