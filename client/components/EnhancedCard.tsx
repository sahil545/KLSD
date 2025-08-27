"use client";

import React, { useState } from "react";
import { Card } from "./ui/card";

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  glowColor?: string;
  tilting?: boolean;
}

export default function EnhancedCard({
  children,
  className = "",
  hoverScale = 1.05,
  glowColor = "blue",
  tilting = true,
}: EnhancedCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilting) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  const getTransformStyle = () => {
    if (!isHovered || !tilting) return "";

    const rect = document
      .querySelector(".enhanced-card")
      ?.getBoundingClientRect();
    if (!rect) return "";

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (mousePosition.y - centerY) / 10;
    const rotateY = (centerX - mousePosition.x) / 10;

    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${hoverScale})`;
  };

  const glowColorMap = {
    blue: "rgba(59, 130, 246, 0.4)",
    green: "rgba(34, 197, 94, 0.4)",
    purple: "rgba(147, 51, 234, 0.4)",
    orange: "rgba(249, 115, 22, 0.4)",
    red: "rgba(239, 68, 68, 0.4)",
    cyan: "rgba(6, 182, 212, 0.4)",
  };

  return (
    <div
      className={`enhanced-card relative transform transition-all duration-500 ease-out ${className}`}
      style={{
        transform: getTransformStyle(),
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 ${
          isHovered ? "opacity-100" : ""
        }`}
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColorMap[glowColor as keyof typeof glowColorMap] || glowColorMap.blue}, transparent 40%)`,
          zIndex: -1,
        }}
      />

      {/* Glass reflection effect */}
      <div
        className={`absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 ${
          isHovered ? "opacity-100" : ""
        }`}
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Original card content */}
      <Card
        className={`relative overflow-hidden backdrop-blur-sm border-white/20 shadow-2xl transition-all duration-500 ${
          isHovered ? "shadow-3xl border-white/40" : ""
        }`}
      >
        {children}

        {/* Shimmer effect on hover */}
        <div
          className={`absolute inset-0 opacity-0 transition-opacity duration-700 ${
            isHovered ? "opacity-100" : ""
          }`}
          style={{
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.8s ease-in-out",
          }}
        />
      </Card>
    </div>
  );
}
