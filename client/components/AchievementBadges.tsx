"use client";

import React from "react";
import { Badge } from "./ui/badge";
import { Award, Shield, Star, Users, Calendar, Trophy } from "lucide-react";

interface Achievement {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  glow: string;
}

const achievements: Achievement[] = [
  {
    id: "platinum-dealer",
    icon: Trophy,
    title: "Platinum ScubaPro Dealer",
    description: "Top-tier equipment provider",
    color: "from-purple-400 to-purple-600",
    glow: "purple",
  },
  {
    id: "years-experience",
    icon: Calendar,
    title: "25+ Years Experience",
    description: "Quarter century of excellence",
    color: "from-blue-400 to-blue-600",
    glow: "blue",
  },
  {
    id: "padi-center",
    icon: Shield,
    title: "PADI 5-Star Center",
    description: "Highest certification level",
    color: "from-green-400 to-green-600",
    glow: "green",
  },
  {
    id: "happy-divers",
    icon: Users,
    title: "10K+ Happy Divers",
    description: "Satisfied customers worldwide",
    color: "from-orange-400 to-orange-600",
    glow: "orange",
  },
  {
    id: "safety-record",
    icon: Award,
    title: "Perfect Safety Record",
    description: "Zero incidents in 25+ years",
    color: "from-red-400 to-red-600",
    glow: "red",
  },
  {
    id: "top-rated",
    icon: Star,
    title: "#1 Rated in Florida Keys",
    description: "Consistently top reviews",
    color: "from-cyan-400 to-cyan-600",
    glow: "cyan",
  },
];

interface AchievementBadgesProps {
  className?: string;
  animated?: boolean;
}

export default function AchievementBadges({
  className = "",
  animated = true,
}: AchievementBadgesProps) {
  const glowColorMap = {
    purple: "shadow-purple-500/25",
    blue: "shadow-blue-500/25",
    green: "shadow-green-500/25",
    orange: "shadow-orange-500/25",
    red: "shadow-red-500/25",
    cyan: "shadow-cyan-500/25",
  };

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}
    >
      {achievements.map((achievement, index) => {
        const Icon = achievement.icon;
        return (
          <div
            key={achievement.id}
            className={`group relative ${animated ? "animate-fade-in-up" : ""}`}
            style={animated ? { animationDelay: `${index * 0.1}s` } : {}}
          >
            {/* Glow effect */}
            <div
              className={`absolute inset-0 rounded-lg bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg ${glowColorMap[achievement.glow as keyof typeof glowColorMap]}`}
            />

            {/* Badge container */}
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-center group-hover:bg-white/20 transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-1">
              {/* Icon with gradient background */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${achievement.color} mb-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-white mb-1 group-hover:text-gray-100 transition-colors duration-300">
                {achievement.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                {achievement.description}
              </p>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
            </div>
          </div>
        );
      })}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-shine {
          animation: shine 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
}
