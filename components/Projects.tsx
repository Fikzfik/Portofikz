"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import TransitionLink from "./TransitionLink";

const projects = [
  {
    title: "Campus Event Hub",
    category: "Management Platform",
    image: "/image/event-hub.png",
    gif: "/gif/event-hub.gif",
    id: "01",
  },
  {
    title: "Green Life",
    category: "Sustainability E-commerce",
    image: "/image/green-life.png",
    gif: "/gif/green-life.gif",
    id: "02",
  },
  {
    title: "Recipe Mama",
    category: "Culinary Community",
    image: "/image/recipe-mama.png",
    gif: "/gif/recipe-mama.gif",
    id: "03",
  },
  {
    title: "Spotify Clone",
    category: "Entertainment API Integration",
    image: "/image/abinawa.webp",
    gif: "/gif/ceritain.gif",
    id: "04",
  },
  {
    title: "SIMAK-GO (Academic)",
    category: "Backend Clean Architecture",
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

    // Efek Parallax halus pada gambar saat geser samping
    imageRefs.current.forEach((img) => {
      if (!img) return;
      const innerImg = img.querySelector("img");
      if (!innerImg) return;

      gsap.to(innerImg, {
        x: -120, // Bergerak ke kiri sedikit melawan slide untuk parallax
        ease: "none",
        scrollTrigger: {
          trigger: img,
          containerAnimation: horizontalScroll,
          start: "left right",
          end: "right left",
          scrub: true,
        },
      });
    });

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
          className="pointer-events-none fixed left-0 top-0 z-[100] h-[220px] w-[320px] overflow-hidden rounded-xl bg-white shadow-2xl opacity-0 scale-0 origin-center"
          style={{ 
            marginTop: '-110px', 
            marginLeft: '-160px' 
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
                className="group relative flex h-full w-full flex-col justify-center max-w-[1200px] cursor-pointer"
              >
                
                {/* Image Wrap */}
                <div
                  ref={(el) => { imageRefs.current[index] = el; }}
                  className="relative aspect-[16/9] w-full overflow-hidden bg-[#d9d9d9]"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="scale-125 object-cover hover:scale-110 transition-all duration-700 ease-out"
                  />
                  
                  {/* View Project indicator (Minimalist) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/5">
                    <span className="bg-white px-8 py-3 text-[10px] font-medium uppercase tracking-[0.3em] text-black">
                      View Project
                    </span>
                  </div>
                </div>

                {/* Typography Bottom */}
                <div className="mt-8 flex items-end justify-between overflow-hidden text-[#111111]">
                  <div>
                    <span className="mb-2 md:mb-4 block text-[10px] uppercase tracking-[0.3em] text-[#111111]/40 font-medium">
                      {project.category}
                    </span>
                    <h3 className="text-4xl lg:text-7xl font-semibold leading-tight tracking-tighter">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-5xl lg:text-8xl font-light italic text-[#111111]/10 leading-none pb-2">
                    {project.id}
                  </span>
                </div>

              </TransitionLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
