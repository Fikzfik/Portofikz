"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import TransitionLink from "./TransitionLink";

const projects = [
  {
    title: "EventAir",
    category: "Event Management / UX Design",
    description: "A comprehensive platform for campus event orchestration, featuring real-time attendance and dynamic scheduling.",
    image: "/image/event-hub.png",
    gif: "/gif/event-hub.gif",
    id: "01",
  },
  {
    title: "EcoSphere",
    category: "Sustainability / E-commerce",
    description: "Reimagining sustainable shopping through a minimalist and performance-driven marketplace experience.",
    image: "/image/green-life.png",
    gif: "/gif/green-life.gif",
    id: "02",
  },
  {
    title: "Culinara",
    category: "Social Media / Gastronomy",
    description: "Connecting culinary enthusiasts through a shared community space for recipes and gastronomic stories.",
    image: "/image/recipe-mama.png",
    gif: "/gif/recipe-mama.gif",
    id: "03",
  },
  {
    title: "SonicFlow",
    category: "Entertainment / API Integration",
    description: "High-fidelity music streaming interface with seamless Spotify API integration and custom playback logic.",
    image: "/image/abinawa.webp",
    gif: "/gif/ceritain.gif",
    id: "04",
  },
  {
    title: "SIMAK-GO",
    category: "Backend / Clean Architecture",
    description: "Academic information system built with Go, emphasizing scalability and robust database design.",
    image: "/image/hpc-japan.webp",
    gif: "/gif/sakura-japan.gif",
    id: "05",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // --- MOUSE TRACKING FOR FLOATING PREVIEW ---
  useEffect(() => {
    if (!modalRef.current) return;

    const xTo = gsap.quickTo(modalRef.current, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(modalRef.current, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- POPUP REACTION ---
  useEffect(() => {
    if (!modalRef.current) return;
    
    if (hoveredIndex !== null) {
      gsap.to(modalRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(modalRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [hoveredIndex]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const horizontalScroll = gsap.to(horizontalRef.current, {
      translateX: `-${(projects.length - 1) * 100}vw`,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${projects.length * 1000}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Efek hover pada gambar tetap ada via CSS

    return () => {
      horizontalScroll.kill();
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="work" className="bg-[#e6e6e6] text-[#111111]">
      <div className="relative overflow-hidden">
        
        {/* 
            FLOATING CURSOR MODAL:
            Ini adalah jendela yang mengikuti kursor
        */}
        <div 
          ref={modalRef}
          className="pointer-events-none fixed left-0 top-0 z-[100] h-[200px] w-[280px] overflow-hidden rounded-lg bg-white shadow-2xl opacity-0 scale-0 origin-center"
          style={{ 
            marginTop: '-100px', 
            marginLeft: '-140px' 
          }}
        >
          <div className="relative h-full w-full">
            {/* Blue dot indicator ala Studio Namma */}
            <div className="absolute left-1/2 top-1/2 z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
            
            {/* Dynamic Project GIF Preview */}
            <div className="h-full w-full transition-transform duration-500 ease-out scale-110">
              {hoveredIndex !== null && (
                <Image
                  src={projects[hoveredIndex].gif}
                  alt="Preview GIF"
                  fill
                  unoptimized // Penting agar GIF tidak dikompres menjadi gambar statis
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>

        {/* Header Indicator Statically Floating or Just in Flow */}
        <div className="absolute top-4 left-6 right-6 md:left-12 md:right-12 flex justify-between z-10 pointer-events-none mix-blend-difference">
           <span className="text-[10px] md:text-[12px] font-medium tracking-[0.2em] uppercase text-white/50">
             05 Works
           </span>
           <span className="text-[10px] md:text-[12px] font-medium tracking-[0.2em] uppercase text-white/50">
             Selected Portfolio
           </span>
        </div>

        <div ref={horizontalRef} className="flex h-screen w-max items-center px-[5vw]">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative flex h-full w-screen items-center justify-center p-6 md:p-24"
            >
              <TransitionLink
                href={`/work/${project.id}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex h-[70vh] w-full flex-col lg:flex-row items-center gap-8 lg:gap-16 max-w-[1400px] cursor-pointer"
              >
                
                {/* Image Wrap */}
                <div
                  ref={(el) => { imageRefs.current[index] = el; }}
                  className="relative aspect-[4/3] lg:aspect-[16/10] w-full lg:w-3/5 overflow-hidden bg-[#d1d1d1] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black/5"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="scale-125 object-cover hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  />
                  
                  {/* View Project indicator (Minimalist) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-black/20 backdrop-blur-[4px]">
                    <span className="bg-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.4em] text-black">
                      View Project
                    </span>
                  </div>
                </div>

                {/* Typography Side */}
                <div className="flex flex-col justify-between h-full py-4 lg:py-12 w-full lg:w-2/5 text-[#111111]">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="h-[1px] w-8 bg-[#111111]/20"></span>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[#111111]/60 font-semibold">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-5xl lg:text-8xl font-bold leading-[0.9] tracking-tighter mb-6">
                      {project.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-[#111111]/60 max-w-sm hidden lg:block">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="relative mt-auto">
                    <div className="h-[2px] w-12 bg-[#951f26] mb-4 lg:hidden"></div>
                    <span className="text-[140px] lg:text-[240px] font-black italic text-[#111111]/5 leading-none absolute bottom-0 right-0 lg:static lg:block select-none pointer-events-none">
                      {project.id}
                    </span>
                  </div>
                </div>

              </TransitionLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
