"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MarqueeProps {
  text: string;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export default function Marquee({ 
  text, 
  speed = 15, 
  direction = "left",
  className = "" 
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current || !containerRef.current) return;

    const textWidth = textRef.current.offsetWidth;
    const xDist = direction === "left" ? -textWidth : textWidth;

    gsap.set(textRef.current, { x: 0 });

    gsap.to(textRef.current, {
      x: xDist,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden whitespace-nowrap bg-[#951f26] py-3 md:py-6 ${className}`}
    >
      <div 
        ref={textRef} 
        className="inline-block"
      >
        {/* Repeat the text multiple times to ensure continuous flow */}
        {[...Array(6)].map((_, i) => (
          <span 
            key={i} 
            className="text-[24px] md:text-[50px] font-bold uppercase tracking-tighter text-white px-8 md:px-12"
          >
            {text} <span className="opacity-30">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
