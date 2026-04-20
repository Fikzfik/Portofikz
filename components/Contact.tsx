"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".contact-line", {
      opacity: 0,
      y: 100,
      rotateX: -45,
      duration: 1.5,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    gsap.from(".contact-info-el", {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="contact" className="section-padding bg-[#111111] text-white">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <div className="mb-12 flex items-center gap-3">
              <div className="h-[1px] w-8 bg-white/20" />
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/40">Connect</span>
            </div>
            
            <div className="overflow-hidden">
              <h2 ref={headingRef} className="text-[12vw] font-normal leading-[0.85] tracking-tighter md:text-[10vw] uppercase">
                <span className="contact-line block">Let's</span> 
                <span className="contact-line block italic text-white/20 hover:text-white transition-colors duration-700">Discuss.</span>
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-10 pb-4">
            <p className="contact-info-el max-w-xs text-xl font-light leading-relaxed text-white/40">
              Transforming visions into elegant realities. I am currently accepting select projects for 2025.
            </p>
            
            <div className="contact-info-el">
              <Magnetic>
                <a 
                  href="mailto:hello@portofikz.com" 
                  className="group relative text-3xl font-light italic inline-block p-4 -ml-4"
                  data-cursor="hover"
                >
                  hello@portofikz.com
                  <span className="absolute bottom-4 left-4 h-[1px] w-[calc(100%-32px)] bg-white/20 transition-all duration-500 group-hover:bg-white" />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="mt-48 flex flex-col gap-10 border-t border-white/5 pt-16 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            {["Instagram", "LinkedIn", "Twitter"].map((social) => (
              <Magnetic key={social}>
                <a 
                  href="#" 
                  className="contact-info-el px-6 py-2 text-[10px] font-medium uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors block"
                  data-cursor="hover"
                >
                  {social}
                </a>
              </Magnetic>
            ))}
          </div>
          <p className="contact-info-el text-[10px] uppercase tracking-[0.3em] text-white/10">
            © 2026 Portofikz — All Rights Reserved
          </p>
        </div>
      </div>
    </section>
  );
}
