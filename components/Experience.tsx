"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const experiences = [
  {
    year: "2026",
    title: "Full-Stack & Motion Designer",
    place: "Freelance / Remote",
    tags: ["Next.js", "GSAP", "Supabase"],
    current: true,
  },
  {
    year: "2025",
    title: "UI/UX Designer & Frontend Dev",
    place: "Various Client Projects",
    tags: ["Figma", "React", "TypeScript"],
    current: false,
  },
  {
    year: "2024",
    title: "Flutter Mobile Developer",
    place: "Agency & Personal Projects",
    tags: ["Flutter", "Dart", "Firebase"],
    current: false,
  },
  {
    year: "2023",
    title: "Started the Journey",
    place: "Self-taught / Campus Projects",
    tags: ["HTML/CSS", "JavaScript", "Design"],
    current: false,
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".exp-line", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    gsap.from(".exp-item", {
      x: -30,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 md:py-32 px-6 md:px-12 bg-[#e6e6e6] border-t border-black/[0.05]"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-[1px] w-6 bg-[#951f26]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#951f26]">
                Timeline
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-normal tracking-tight text-[#111111]">
              Experience
            </h2>
          </div>
          <p className="text-[14px] text-black/40 max-w-xs leading-relaxed">
            A self-taught journey built on curiosity, craft, and relentless iteration.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal rule */}
          <div className="exp-line mb-0 h-[1px] bg-black/10 w-full" />

          <div className="divide-y divide-black/[0.06]">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="exp-item group py-8 md:py-10 grid grid-cols-12 gap-4 md:gap-8 items-center hover:bg-black/[0.02] transition-colors duration-500 px-2 -mx-2 rounded-sm"
              >
                {/* Year */}
                <div className="col-span-3 md:col-span-2">
                  <span className="text-[13px] font-medium tracking-widest text-black/30 group-hover:text-[#951f26] transition-colors duration-500">
                    {exp.year}
                  </span>
                  {exp.current && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#951f26] opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#951f26]" />
                      </span>
                      <span className="text-[9px] uppercase tracking-widest text-[#951f26] font-medium">Now</span>
                    </div>
                  )}
                </div>

                {/* Title & Place */}
                <div className="col-span-9 md:col-span-6">
                  <h3 className="text-[18px] md:text-[22px] font-medium tracking-tight text-[#111111] mb-1 group-hover:translate-x-1 transition-transform duration-500">
                    {exp.title}
                  </h3>
                  <p className="text-[12px] text-black/40 uppercase tracking-widest">
                    {exp.place}
                  </p>
                </div>

                {/* Tags */}
                <div className="col-span-12 md:col-span-4 flex flex-wrap gap-2 md:justify-end">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[9px] font-medium uppercase tracking-widest text-black/40 border border-black/10 rounded-full group-hover:border-black/20 group-hover:text-black/60 transition-all duration-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
