"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skills = [
  "Next.js", "TypeScript", "GSAP", "React", "Node.js", 
  "Tailwind", "Figma", "UI Design", "Motion", "Clean Code",
  "Supabase", "Flutter", "Interaction", "Performance", "Strategy"
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(itemsRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
    });
  }, []);

  return (
    <section ref={containerRef} className="section-padding bg-background border-t border-black/[0.03]">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-[1px] w-6 bg-black/20" />
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-black/40">Expertise</span>
            <div className="h-[1px] w-6 bg-black/20" />
          </div>
          <h2 className="text-4xl md:text-6xl font-normal tracking-tight">Technical Mastery</h2>
        </div>

        <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-3 lg:grid-cols-5">
          {skills.map((skill, index) => (
            <div 
              key={skill}
              ref={(el) => { if (el) itemsRef.current[index] = el; }}
              className="flex flex-col items-center justify-center gap-4 text-center group"
            >
              <span className="text-lg font-light text-black/40 group-hover:text-black transition-colors duration-500">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl md:text-2xl font-light italic text-black/30 group-hover:text-black transition-colors duration-500">
                {skill}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
