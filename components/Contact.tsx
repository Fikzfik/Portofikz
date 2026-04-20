"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "./TransitionLink";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".contact-fade", {
      opacity: 0,
      y: 40,
      duration: 1.5,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      },
    });

    gsap.from(textRef.current, {
      opacity: 0,
      y: 100,
      scale: 0.9,
      duration: 2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 95%",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="contact" className="pt-32 pb-8 bg-[#050505] text-[#f5f5f5] min-h-screen flex flex-col justify-between">
      
      {/* Upper Links */}
      <div className="w-full max-w-6xl mx-auto px-6 mb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 text-[14px] md:text-[16px] font-light">
          <div className="contact-fade flex items-center gap-2 cursor-pointer hover:text-white/60 transition-colors">
            +62 812 3456 7890 <span className="text-[10px]">&rarr;</span>
          </div>
          <div className="contact-fade flex items-center gap-2 cursor-pointer hover:text-white/60 transition-colors">
            work@portofikz.com <span className="text-[10px]">&rarr;</span>
          </div>
        </div>

        <div className="mt-24 contact-fade">
          <TransitionLink href="#" className="flex items-center gap-2 text-[14px] md:text-[16px] font-light hover:text-white/60 transition-colors inline-flex">
            Start collaboration <span className="text-[10px]">&rarr;</span>
          </TransitionLink>
        </div>
      </div>

      {/* Raksasa Merah & Sub-footer */}
      <div className="w-full flex flex-col items-center mt-auto">
        <h1 
          ref={textRef} 
          className="text-[#951f26] text-[13vw] font-bold uppercase tracking-tighter leading-none text-center w-full select-none"
        >
          House of Fikz
        </h1>

        {/* Tiny Sub-footer */}
        <div className="contact-fade w-full grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-8 border-t border-white/5 mt-4 text-[10px] text-[#f5f5f5]/40 leading-relaxed uppercase tracking-widest text-center md:text-left">
          
          <div className="flex flex-col">
            <span>Guide for agencies</span>
            <span className="text-white">Download in socials</span>
          </div>
          
          <div className="flex flex-col">
            <span>Availability from</span>
            <span className="text-white">Late May 26</span>
          </div>

          <div className="flex flex-col">
            <span>Instagram</span>
            <span className="text-white hover:text-white/50 cursor-pointer">@fikzardiansyah</span>
          </div>

          <div className="flex flex-col">
            <span>LinkedIn</span>
            <span className="text-white hover:text-white/50 cursor-pointer">@fikzardiansyah</span>
          </div>

        </div>
      </div>
    </section>
  );
}
