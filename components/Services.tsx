"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "./TransitionLink";

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(leftRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      y: 100,
      opacity: 0,
      rotation: -5,
      duration: 1.5,
      ease: "power3.out",
    });

    gsap.from(rightRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
      y: 60,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="services" className="py-32 px-6 md:px-12 w-full overflow-hidden bg-[#050505] border-t border-white/5">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">
        
        {/* Kolom Kiri: Grafis "Red Cards" (Asimetris) */}
        <div ref={leftRef} className="relative w-full aspect-[4/3] flex items-center justify-center">
          <div className="absolute w-[60%] aspect-[3/2] bg-[#8a1c22] transform -rotate-12 translate-x-4 translate-y-4 rounded-sm shadow-xl flex items-center justify-center p-6 text-white/50 text-[10px] tracking-widest border border-white/10 uppercase">
            Creative
          </div>
          <div className="absolute w-[60%] aspect-[3/2] bg-[#951f26] transform rotate-6 -translate-x-4 -translate-y-4 rounded-sm shadow-2xl p-6 border border-white/10 flex flex-col justify-between hover:scale-105 transition-transform duration-500 cursor-default">
            <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white/50 mb-4">
              <span className="text-[10px]">FIX</span>
            </div>
            <div className="text-white text-[12px] uppercase tracking-widest">
              Digital<br/>Experience
            </div>
          </div>
        </div>

        {/* Kolom Kanan: The "For Agencies" Box dengan Crosshair styling */}
        <div ref={rightRef} className="flex justify-center md:justify-end">
          <div className="relative p-12 md:p-16 max-w-sm flex flex-col items-center text-center">
            {/* Ornamen Crosshairs di 4 Sudut */}
            <span className="absolute top-0 left-0 text-[14px] text-white/20">+</span>
            <span className="absolute top-0 right-0 text-[14px] text-white/20">+</span>
            <span className="absolute bottom-0 left-0 text-[14px] text-white/20">+</span>
            <span className="absolute bottom-0 right-0 text-[14px] text-white/20">+</span>

            <h3 className="text-[20px] font-semibold tracking-tight text-white mb-6">
              For Brands & Agencies
            </h3>
            <p className="text-[15px] font-medium leading-relaxed text-white/70 mb-8">
              Your agency a hand short? I{"'"}m here to slot in and ride along with your team. Reach out.
            </p>
            
            <TransitionLink 
              href="#contact" 
              className="px-8 py-4 border border-white/10 hover:border-[#951f26] hover:bg-[#951f26] text-white text-[11px] uppercase tracking-widest transition-all duration-500 rounded-sm"
            >
              Reach out
            </TransitionLink>
          </div>
        </div>

      </div>
    </section>
  );
}
