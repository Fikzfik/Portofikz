"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Fintrack Pro",
    category: "Full Stack / Mobile App",
    year: "2024",
    description:
      "AI-powered personal finance tracker with voice recognition, smart categorization, and real-time analytics.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1400",
    tags: ["Flutter", "Supabase", "AI", "Gemini"],
    num: "01",
  },
  {
    title: "Studio Interface",
    category: "UI/UX / Motion Design",
    year: "2024",
    description:
      "Premium creative studio website with cutting-edge scroll animations and immersive user experience.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1400",
    tags: ["Next.js", "GSAP", "Figma", "Lenis"],
    num: "02",
  },
  {
    title: "Commerce Plus",
    category: "E-Commerce / React",
    year: "2023",
    description:
      "Minimalist e-commerce platform with real-time inventory, Stripe checkout, and headless CMS.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1400",
    tags: ["Next.js", "Stripe", "Sanity", "TypeScript"],
    num: "03",
  },
  {
    title: "Motion Lab",
    category: "WebGL / Three.js",
    year: "2024",
    description:
      "Interactive 3D design laboratory showcasing experimental web technologies and GPU-powered visuals.",
    image:
      "https://images.unsplash.com/photo-1614332284144-67252063d8d6?auto=format&fit=crop&q=80&w=1400",
    tags: ["Three.js", "WebGL", "GLSL", "React"],
    num: "04",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const totalSlides = projects.length + 1; // +1 for the title panel
    const scrollDistance = (totalSlides - 1) * 100; // vw to scroll

    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: `-${scrollDistance}vw`,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `${scrollDistance * 12} top`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section id="work" className="overflow-hidden bg-background">
      <div ref={triggerRef}>
        <div
          ref={sectionRef}
          className="flex h-screen"
          style={{ width: `${(projects.length + 1) * 100}vw` }}
        >
          {/* Title Panel */}
          <div className="flex h-full w-screen flex-col justify-center px-6 md:px-16 flex-shrink-0">
            <div className="max-w-[1400px] mx-auto w-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-accent" />
                <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em]">
                  Selected Projects
                </span>
              </div>
              <h2
                className="font-display font-bold tracking-tighter leading-none mb-10"
                style={{ fontSize: "clamp(60px, 11vw, 160px)" }}
              >
                FEATURED<br />
                <span className="text-accent">WORK</span>
              </h2>
              <p className="text-[#555] text-sm max-w-xs leading-relaxed mb-10">
                A curated selection of projects spanning full-stack development, UI/UX design, and motion.
              </p>
              <div className="flex items-center gap-4 text-[#444]">
                <div className="w-10 h-[1px] bg-accent/40" />
                <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                <ArrowUpRight size={12} className="text-accent" />
              </div>
            </div>
          </div>

          {/* Project Cards */}
          {projects.map((project) => (
            <div
              key={project.num}
              className="relative flex h-full w-screen flex-shrink-0 items-center p-6 md:p-16"
            >
              <div className="group relative h-[75vh] w-full overflow-hidden" data-cursor="hover">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={project.num === "01"}
                />

                {/* Index badge */}
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <span className="px-3 py-1.5 bg-black/70 backdrop-blur-md text-[10px] uppercase tracking-[0.3em] text-[#999] border border-white/10">
                    {project.num} / 0{projects.length}
                  </span>
                  <span className="px-3 py-1.5 bg-black/70 backdrop-blur-md text-[10px] uppercase tracking-[0.3em] text-[#999] border border-white/10">
                    {project.year}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-accent mb-3">
                      {project.category}
                    </p>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                      <div>
                        <h3
                          className="font-display font-bold text-white mb-4"
                          style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
                        >
                          {project.title}
                        </h3>
                        <p className="text-[#aaa] text-sm max-w-md leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-3 py-1 bg-accent/10 text-accent border border-accent/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-accent text-black">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
