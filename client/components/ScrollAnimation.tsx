"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?:
    | "fadeInUp"
    | "fadeInLeft"
    | "fadeInRight"
    | "scaleIn"
    | "slideInUp"
    | "fadeIn";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollAnimation({
  children,
  animation = "fadeInUp",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = "",
  once = true,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasAnimated || !once) {
            setTimeout(() => {
              setIsVisible(true);
              if (once) setHasAnimated(true);
            }, delay);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold, once, hasAnimated]);

  const getAnimationClass = () => {
    const baseClasses = "transition-all ease-out";
    const durationClass = `duration-${duration}`;

    if (!isVisible) {
      switch (animation) {
        case "fadeInUp":
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
        case "fadeInLeft":
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`;
        case "fadeInRight":
          return `${baseClasses} ${durationClass} opacity-0 translate-x-8`;
        case "scaleIn":
          return `${baseClasses} ${durationClass} opacity-0 scale-95`;
        case "slideInUp":
          return `${baseClasses} ${durationClass} translate-y-full`;
        case "fadeIn":
          return `${baseClasses} ${durationClass} opacity-0`;
        default:
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
      }
    } else {
      return `${baseClasses} ${durationClass} opacity-100 translate-x-0 translate-y-0 scale-100`;
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Hook for scroll animations
export function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// Staggered children animations
interface StaggeredAnimationProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn";
  className?: string;
}

export function StaggeredAnimation({
  children,
  staggerDelay = 100,
  animation = "fadeInUp",
  className = "",
}: StaggeredAnimationProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollAnimation
          key={index}
          animation={animation}
          delay={index * staggerDelay}
        >
          {child}
        </ScrollAnimation>
      ))}
    </div>
  );
}
