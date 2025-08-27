"use client";

import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}

export default function FloatingBubbles({ count = 25 }: { count?: number }) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate bubbles only on client side to avoid hydration mismatch
    const generatedBubbles = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
    }));

    setBubbles(generatedBubbles);
    setMounted(true);
  }, [count]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute w-2 h-2 bg-white/20 rounded-full animate-float opacity-60"
          style={{
            left: bubble.left,
            top: bubble.top,
            animationDelay: bubble.animationDelay,
            animationDuration: bubble.animationDuration,
          }}
        />
      ))}
    </div>
  );
}
