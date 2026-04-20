"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Palette, Zap, Smartphone } from "lucide-react";

const services = [
  {
    Icon: Code2,
    number: "01",
    title: "Web Development",
    description:
      "Building high-performance, scalable web applications using Next.js, React, and TypeScript with a focus on accessibility and SEO.",
    tags: ["Next.js", "React", "TypeScript", "Node.js"],
  },
  {
    Icon: Palette,
    number: "02",
    title: "UI/UX Design",
    description:
      "Creating intuitive, visually striking interfaces with pixel-perfect precision. From wireframes to full design systems in Figma.",
    tags: ["Figma", "Prototyping", "Design Systems", "UX Research"],
  },
  {
    Icon: Zap,
    number: "03",
    title: "Motion & Animation",
    description:
      "Bringing interfaces to life with fluid, purposeful animations using GSAP, Lenis, and CSS. Making the web feel alive.",
    tags: ["GSAP", "Lenis", "CSS Animation", "Lottie"],
  },
  {
    Icon: Smartphone,
    number: "04",
    title: "Mobile Development",
    description:
      "Crafting cross-platform mobile applications with Flutter that deliver native performance and beautiful user experiences.",
    tags: ["Flutter", "Dart", "Firebase", "Supabase"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".service-heading", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    gsap.from(".service-card", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".service-grid",
        start: "top 75%",
      },
    });
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-32 md:py-40 px-6 md:px-16 bg-surface">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="service-heading flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em]">What I Do</span>
            </div>
            <h2
              className="font-display font-bold tracking-tighter leading-tight"
              style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
            >
              SERVICES &<br />EXPERTISE
            </h2>
          </div>
          <p className="max-w-sm text-[#666] text-base leading-relaxed md:text-right">
            End-to-end digital solutions from concept to deployment — crafted with precision and passion.
          </p>
        </div>

        {/* Grid */}
        <div className="service-grid grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {services.map(({ Icon, number, title, description, tags }) => (
            <div
              key={number}
              className="service-card group bg-background p-10 md:p-14 hover:bg-[#0a0a0a] transition-colors duration-500"
              data-cursor="hover"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-accent/40 transition-colors duration-500">
                  <Icon size={20} className="text-accent" />
                </div>
                <span className="text-7xl font-bold text-white/[0.04] group-hover:text-white/[0.07] transition-colors duration-500 font-display">
                  {number}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors duration-300 font-display">
                {title}
              </h3>
              <p className="text-[#666] leading-relaxed mb-8 text-sm">{description}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 border border-white/10 text-[#555] group-hover:border-accent/25 group-hover:text-accent/70 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
