"use client";

import React, { useState } from "react";

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "strong";
  animated?: boolean;
  gradient?: boolean;
  borderGlow?: boolean;
}

export default function GlassmorphismCard({
  children,
  className = "",
  intensity = "medium",
  animated = true,
  gradient = true,
  borderGlow = true,
}: GlassmorphismCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getIntensityClasses = () => {
    switch (intensity) {
      case "light":
        return "bg-white/5 backdrop-blur-sm";
      case "medium":
        return "bg-white/10 backdrop-blur-md";
      case "strong":
        return "bg-white/20 backdrop-blur-lg";
      default:
        return "bg-white/10 backdrop-blur-md";
    }
  };

  const getBorderClass = () => {
    if (!borderGlow) return "border border-white/20";

    return isHovered
      ? "border border-white/40 shadow-lg shadow-blue-500/20"
      : "border border-white/20";
  };

  return (
    <div
      className={`
        relative rounded-lg overflow-hidden
        ${getIntensityClasses()}
        ${getBorderClass()}
        ${animated ? "transition-all duration-500 ease-out" : ""}
        ${isHovered && animated ? "transform scale-105 shadow-2xl" : ""}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background */}
      {gradient && (
        <div
          className={`absolute inset-0 opacity-30 transition-opacity duration-500 ${
            isHovered ? "opacity-50" : "opacity-30"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-cyan-400/20 animate-gradient-shift" />
        </div>
      )}

      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-50" />

      {/* Border highlight */}
      {borderGlow && (
        <div
          className={`absolute inset-0 rounded-lg transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            transform: isHovered ? "rotate(0deg)" : "rotate(-45deg)",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
      `}</style>
    </div>
  );
}

// Animated gradient text component
interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
}

export function AnimatedGradientText({
  children,
  className = "",
  colors = ["from-red-600", "via-white", "to-red-600"],
}: AnimatedGradientTextProps) {
  return (
    <span
      className={`
        bg-gradient-to-r ${colors.join(" ")} 
        bg-clip-text text-transparent
        animate-gradient-shift bg-200% 
        ${className}
      `}
    >
      {children}

      <style jsx>{`
        .bg-200% {
          background-size: 200% 200%;
        }
      `}</style>
    </span>
  );
}

// Floating gradient orb background
export function FloatingGradientOrbs({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-float-slow-reverse" />
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse-slow" />

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }

        @keyframes float-slow-reverse {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(20px) translateX(-10px);
          }
          50% {
            transform: translateY(10px) translateX(10px);
          }
          75% {
            transform: translateY(30px) translateX(-5px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slow-reverse {
          animation: float-slow-reverse 10s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
