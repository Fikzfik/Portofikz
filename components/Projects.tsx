"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import TransitionLink from "./TransitionLink";

const projects = [
  {
    title: "Minimal Studio",
    category: "Architecture / Web",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1400",
    id: "01",
  },
  {
    title: "The Editorial",
    category: "Design / Typography",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1400",
    id: "02",
  },
  {
    title: "Lunar Identity",
    category: "Branding / Motion",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1400",
    id: "03",
  },
  {
    title: "Zen Spaces",
    category: "Interior / Layout",
    image: "https://images.unsplash.com/photo-1614332284144-67252063d8d6?auto=format&fit=crop&q=80&w=1400",
    id: "04",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    // Parallax on images inside horizontal scroll
    imageRefs.current.forEach((img) => {
      if (!img) return;
      const innerImg = img.querySelector("img");
      if (!innerImg) return;

      gsap.to(innerImg, {
        x: -80,
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
    <section ref={containerRef} id="work" className="bg-background">
      <div className="overflow-hidden">
        <div
          ref={horizontalRef}
          className="flex h-screen w-max items-center px-[5vw]"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative flex h-full w-screen items-center justify-center p-8 md:p-24"
            >
              <TransitionLink
                href={`/work/${project.id}`}
                className="group relative flex h-full w-full flex-col justify-center max-w-[1200px] cursor-pointer"
              >
                <div
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                  className="relative aspect-[16/9] w-full overflow-hidden bg-black/5 grayscale hover:grayscale-0 transition-all duration-1000"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="scale-125 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/5 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                  
                  {/* View Project indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="bg-white/90 backdrop-blur-sm px-8 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-black">
                      View Project
                    </span>
                  </div>
                </div>

                <div className="mt-12 flex items-end justify-between overflow-hidden">
                  <div>
                    <span className="mb-4 block text-[10px] uppercase tracking-[0.4em] text-black/40">
                      {project.category}
                    </span>
                    <h3 className="text-5xl font-normal leading-none md:text-7xl tracking-tighter">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-8xl font-light italic text-black/[0.03] leading-none">
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
