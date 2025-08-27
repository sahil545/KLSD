"use client";

import React, { useEffect, useState, useRef } from "react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundImage?: string;
  speed?: number;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  height?: string;
}

export default function ParallaxSection({
  children,
  backgroundImage,
  speed = 0.5,
  className = "",
  overlay = true,
  overlayOpacity = 0.4,
  height = "h-screen",
}: ParallaxSectionProps) {
  const [offsetY, setOffsetY] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const rect = parallaxRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;

        // Only apply parallax when element is in viewport
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
          setOffsetY(rate);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={parallaxRef}
      className={`relative overflow-hidden ${height} ${className}`}
    >
      {/* Parallax background */}
      {backgroundImage && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: `translateY(${offsetY}px)`,
            willChange: "transform",
          }}
        />
      )}

      {/* Gradient overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// Multi-layer parallax component for complex effects
interface MultiLayerParallaxProps {
  children: React.ReactNode;
  layers: {
    image: string;
    speed: number;
    opacity?: number;
  }[];
  className?: string;
  height?: string;
}

export function MultiLayerParallax({
  children,
  layers,
  className = "",
  height = "h-screen",
}: MultiLayerParallaxProps) {
  const [offsetY, setOffsetY] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const rect = parallaxRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;

        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
          setOffsetY(scrolled);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={parallaxRef}
      className={`relative overflow-hidden ${height} ${className}`}
    >
      {/* Multiple parallax layers */}
      {layers.map((layer, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage: `url(${layer.image})`,
            transform: `translateY(${offsetY * layer.speed}px)`,
            opacity: layer.opacity || 1,
            zIndex: layers.length - index,
            willChange: "transform",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// Parallax mouse movement effect
interface MouseParallaxProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MouseParallax({
  children,
  strength = 20,
  className = "",
}: MouseParallaxProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = (e.clientX - centerX) / rect.width;
        const mouseY = (e.clientY - centerY) / rect.height;

        setMousePosition({ x: mouseX * strength, y: mouseY * strength });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [strength]);

  return (
    <div
      ref={containerRef}
      className={`transform transition-transform duration-100 ease-out ${className}`}
      style={{
        transform: `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`,
      }}
    >
      {children}
    </div>
  );
}
