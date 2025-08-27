"use client";

import React, { useEffect, useState } from "react";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
}

interface FloatingBubblesProps {
  count?: number;
  className?: string;
}

export default function FloatingBubbles({
  count = 15,
  className = "",
}: FloatingBubblesProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles: Bubble[] = [];
      for (let i = 0; i < count; i++) {
        newBubbles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10, // 10-30px
          speed: Math.random() * 3 + 2, // 2-5s
          opacity: Math.random() * 0.4 + 0.1, // 0.1-0.5
          delay: Math.random() * 5, // 0-5s delay
        });
      }
      setBubbles(newBubbles);
    };

    generateBubbles();
  }, [count]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-white/20 backdrop-blur-sm animate-float"
          style={{
            left: `${bubble.x}%`,
            bottom: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            opacity: bubble.opacity,
            animationDuration: `${bubble.speed}s`,
            animationDelay: `${bubble.delay}s`,
            background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, ${bubble.opacity * 0.8}), transparent 70%)`,
            boxShadow: `inset 2px 2px 4px rgba(255, 255, 255, 0.3), 0 0 8px rgba(59, 130, 246, 0.2)`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-20vh) scale(1.2);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}
