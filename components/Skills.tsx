"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Skill {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate";
  desc: string;
  icon: string;
}

const skills: Skill[] = [
  { name: "Next.js", level: "Expert", desc: "App Router, SSR/SSG, API Routes", icon: "/icon/nextjs.svg" },
  { name: "TypeScript", level: "Advanced", desc: "Types, Generics, Strict Mode", icon: "/icon/typescript.svg" },
  { name: "React", level: "Expert", desc: "Hooks, Context, Performance", icon: "/icon/react.svg" },
  { name: "Node.js", level: "Advanced", desc: "REST API, Backend, Auth", icon: "/icon/nodejs.svg" },
  { name: "Three.js", level: "Intermediate", desc: "WebGL, Shaders, 3D Scenes", icon: "/icon/threejs.svg" },
  { name: "Figma", level: "Expert", desc: "UI/UX, Prototyping, Systems", icon: "/icon/figma.svg" },
  { name: "Tailwind", level: "Advanced", desc: "Utility-first CSS, Design System", icon: "/icon/tailwind.svg" },
  { name: "MySQL", level: "Intermediate", desc: "Relational DB, Queries, Design", icon: "/icon/mysql.svg" },
  { name: "JavaScript", level: "Expert", desc: "ES6+, Async, DOM Manipulation", icon: "/icon/js.svg" },
  { name: "Git", level: "Advanced", desc: "Version Control, Workflow", icon: "/icon/git.svg" },
];

const levelMap: Record<string, { label: string; bars: number }> = {
  Expert: { label: "Expert", bars: 3 },
  Advanced: { label: "Advanced", bars: 2 },
  Intermediate: { label: "Intermediate", bars: 1 },
};

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".skill-card",
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="skills"
      className="py-24 md:py-32 px-6 md:px-12 bg-[#e6e6e6] border-t border-black/[0.05]"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-[1px] w-6 bg-[#951f26]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#951f26]">
                Expertise
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-normal tracking-tight text-[#111111]">
              Tech Stack
            </h2>
          </div>
          <p className="text-[14px] text-black/40 max-w-xs leading-relaxed">
            Tools and technologies I wield with precision to bring ideas to life.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {skills.map((skill) => {
            const { bars } = levelMap[skill.level];
            return (
              <div
                key={skill.name}
                className="skill-card group relative p-5 md:p-6 bg-white/60 hover:bg-white border border-black/[0.06] hover:border-[#951f26]/30 rounded-xl transition-all duration-500 cursor-default overflow-hidden flex flex-col gap-3"
              >
                {/* Accent top bar */}
                <div
                  className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out rounded-t-xl bg-[#951f26]"
                />

                {/* Icon Wrapper */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center p-2 bg-[#f5f5f5] group-hover:bg-[#951f26]/5 transition-colors duration-500"
                >
                  <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500">
                    <Image 
                      src={skill.icon} 
                      alt={skill.name} 
                      fill 
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-[14px] md:text-[15px] font-semibold tracking-tight text-[#111111] leading-tight">
                  {skill.name}
                </h3>

                {/* Level dots */}
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className="h-1.5 w-1.5 rounded-full transition-colors duration-300"
                      style={{
                        backgroundColor: dot <= bars ? "#951f26" : "#11111120",
                      }}
                    />
                  ))}
                  <span className={`ml-1 text-[9px] uppercase tracking-widest font-bold ${skill.level === 'Expert' ? 'text-[#951f26]' : 'text-black/30'}`}>
                    {skill.level}
                  </span>
                </div>

                {/* Desc on hover */}
                <p className="mt-1 text-[11px] leading-relaxed text-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden max-h-0 group-hover:max-h-16">
                  {skill.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
