"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─── Types ─── */
interface Skill {
  name: string;
  percent: number;
  icon: string;
}

interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  skills: Skill[];
}

/* ─── Data: All 31 icons grouped into categories ─── */
const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    subtitle: "Interfaces & Interactions",
    skills: [
      { name: "HTML", percent: 98, icon: "/icon/html.svg" },
      { name: "CSS", percent: 95, icon: "/icon/css.svg" },
      { name: "JavaScript", percent: 92, icon: "/icon/js.svg" },
      { name: "Sass", percent: 90, icon: "/icon/sass.svg" },
      { name: "React", percent: 85, icon: "/icon/react.svg" },
      { name: "Next.js", percent: 82, icon: "/icon/nextjs.svg" },
      { name: "Tailwind", percent: 80, icon: "/icon/tailwind.svg" },
      { name: "Bootstrap", percent: 78, icon: "/icon/bootstrap.svg" },
      { name: "Webpack", percent: 75, icon: "/icon/webpack.svg" },
      { name: "TypeScript", percent: 65, icon: "/icon/typescript.svg" },
      { name: "Three.js", percent: 60, icon: "/icon/threejs.svg" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    subtitle: "Logic & Infrastructure",
    skills: [
      { name: "Go (Fiber v2)", percent: 95, icon: "/icon/go.svg" },
      { name: "Laravel", percent: 92, icon: "/icon/laravel.svg" },
      { name: "MongoDB", percent: 90, icon: "/icon/mongodb.svg" },
      { name: "PHP", percent: 85, icon: "/icon/php.svg" },
      { name: "MySQL", percent: 82, icon: "/icon/mysql.svg" },
      { name: "PostgreSQL", percent: 80, icon: "/icon/mysql.svg" },
      { name: "Node.js", percent: 65, icon: "/icon/nodejs.svg" },
      { name: "Express", percent: 60, icon: "/icon/express.svg" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Others",
    subtitle: "Workflow & Creativity",
    skills: [
      { name: "Git", percent: 95, icon: "/icon/git.svg" },
      { name: "GitHub", percent: 92, icon: "/icon/github.svg" },
      { name: "NPM", percent: 85, icon: "/icon/npm.svg" },
      { name: "Yarn", percent: 82, icon: "/icon/yarn.svg" },
      { name: "Vite", percent: 80, icon: "/icon/vite.svg" },
      { name: "Figma", percent: 95, icon: "/icon/figma.svg" },
      { name: "Blender", percent: 85, icon: "/icon/blender.svg" },
      { name: "Spline", percent: 82, icon: "/icon/spline.svg" },
    ],
  },
];

/* ─── Helpers ─── */
function getPercentColor(p: number): string {
  if (p >= 90) return "#951f26";
  if (p >= 75) return "#c44d52";
  return "#888888";
}

function getPercentLabel(p: number): string {
  if (p >= 90) return "Expert";
  if (p >= 75) return "Advanced";
  if (p >= 60) return "Intermediate";
  return "Learning";
}

/* ─── Skill Card ─── */
function SkillCard({ skill }: { skill: Skill }) {
  const color = getPercentColor(skill.percent);
  const label = getPercentLabel(skill.percent);

  return (
    <div className="skill-card group relative flex flex-col items-center gap-4 p-5 md:p-6 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-white/30 hover:bg-white/[0.08] transition-all duration-500 cursor-default overflow-hidden">
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color}15 0%, transparent 70%)`,
        }}
      />

      {/* Icon with percentage ring */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* SVG circular progress */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 64 64"
        >
          {/* Track */}
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="2"
          />
          {/* Progress */}
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${(skill.percent / 100) * 175.93} 175.93`}
            className="opacity-40 group-hover:opacity-100 transition-opacity duration-700"
          />
        </svg>

        {/* Icon */}
        <div className="relative w-8 h-8 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110">
          <Image
            src={skill.icon}
            alt={skill.name}
            fill
            className="object-contain drop-shadow-sm"
            sizes="32px"
          />
        </div>
      </div>

      {/* Name */}
      <h4 className="text-[13px] font-semibold tracking-tight text-white transition-colors duration-500 text-center leading-tight">
        {skill.name}
      </h4>

      {/* Percentage + Label */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="text-[22px] font-bold tracking-tighter leading-none transition-colors duration-500"
          style={{ color }}
        >
          {skill.percent}
          <span className="text-[12px] font-medium">%</span>
        </span>
        <span className="text-[8px] uppercase tracking-[0.25em] text-white/40 font-medium">
          {label}
        </span>
      </div>
    </div>
  );
}

/* ─── Category Accordion ─── */
function CategorySection({
  group,
  isOpen,
  onToggle,
  index,
}: {
  group: SkillGroup;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Animate open/close
  useGSAP(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      // First set display
      gsap.set(contentRef.current, { display: "block" });

      // Animate container height
      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.7,
          ease: "power3.inOut",
        }
      );

      // Stagger cards in
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".skill-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.04,
            ease: "power2.out",
            delay: 0.2,
          }
        );
      }
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          if (contentRef.current) {
            gsap.set(contentRef.current, { display: "none" });
          }
        },
      });
    }
  }, [isOpen]);

  return (
    <div className="category-section border-b border-white/10 last:border-b-0">
      {/* Header / Toggle */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-8 md:py-10 px-2 group/header cursor-pointer transition-colors duration-300 hover:bg-white/[0.02] rounded-lg"
      >
        <div className="flex items-center gap-6 md:gap-10">
          {/* Index */}
          <span className="text-[12px] font-mono text-white/15 tracking-widest w-6">
            0{index + 1}
          </span>

          {/* Title & Subtitle */}
          <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 text-left">
            <h3
              className={`text-[24px] md:text-[32px] font-medium tracking-tight transition-colors duration-500 ${
                isOpen ? "text-white" : "text-white/70 group-hover/header:text-white"
              }`}
            >
              {group.title}
            </h3>
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-medium font-mono">
              {group.subtitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          {/* Skill count */}
          <span
            className={`text-[11px] font-mono tracking-wider transition-colors duration-500 ${
              isOpen ? "text-[#951f26]" : "text-white/40"
            }`}
          >
            [{group.skills.length}]
          </span>

          {/* Toggle icon */}
          <div
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
              isOpen
                ? "border-[#951f26]/60 bg-[#951f26]/20 rotate-45"
                : "border-white/20 bg-transparent rotate-0 group-hover/header:border-white/40"
            }`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-colors duration-500"
            >
              <path
                d="M7 1V13M1 7H13"
                stroke={isOpen ? "#951f26" : "rgba(255,255,255,0.3)"}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* Collapsible Content */}
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: isOpen ? "auto" : 0, display: isOpen ? "block" : "none" }}
      >
        <div
          ref={gridRef}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4 pb-10 md:pb-14 px-2"
        >
          {group.skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(["frontend"]) // First category open by default
  );

  const toggleCategory = useCallback((id: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const allOpen = openCategories.size === skillGroups.length;

  const toggleAll = useCallback(() => {
    if (allOpen) {
      setOpenCategories(new Set());
    } else {
      setOpenCategories(new Set(skillGroups.map((g) => g.id)));
    }
  }, [allOpen]);

  // Entrance animation
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".skills-header",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      ".category-section",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, { scope: containerRef });

  // Total skills count
  const totalSkills = skillGroups.reduce((sum, g) => sum + g.skills.length, 0);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="py-24 md:py-32 px-6 md:px-12 bg-[#050505] border-t border-white/[0.05]"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="skills-header mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-[1px] w-6 bg-[#951f26]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#951f26]">
                Expertise
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-normal tracking-tight text-[#f5f5f5]">
              Tech Stack
            </h2>
          </div>

          <div className="flex items-center gap-8">
            <p className="text-[13px] text-white/30 leading-relaxed">
              <span className="text-white/60 font-semibold">{totalSkills}</span> tools across{" "}
              <span className="text-white/60 font-semibold">{skillGroups.length}</span> disciplines
            </p>

            {/* Expand All */}
            <button
              onClick={toggleAll}
              className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/25 hover:text-white/60 transition-colors duration-300 border border-white/[0.06] hover:border-white/[0.15] rounded-full px-4 py-2"
            >
              {allOpen ? "Collapse all" : "Expand all"}
            </button>
          </div>
        </div>

        {/* Category Accordions */}
        <div className="border-t border-white/10">
          {skillGroups.map((group, i) => (
            <CategorySection
              key={group.id}
              group={group}
              index={i}
              isOpen={openCategories.has(group.id)}
              onToggle={() => toggleCategory(group.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
