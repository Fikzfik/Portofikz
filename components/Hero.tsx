"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!title1Ref.current || !title2Ref.current || !descRef.current) return;

    // Split text
    const text1 = new SplitType(title1Ref.current, { types: "chars" });
    const text2 = new SplitType(title2Ref.current, { types: "chars" });
    const tl = gsap.timeline({ delay: 2.8 }); // Wait for preloader curtain to finish
    
    tl.from(text1.chars, {
      y: 100,
      opacity: 0,
      rotateX: -90,
      duration: 1.5,
      stagger: 0.02,
      ease: "expo.out",
    })
    .from(text2.chars, {
      y: 80,
      opacity: 0,
      duration: 1.5,
      stagger: 0.02,
      ease: "expo.out",
    }, "-=1.2")
    .from(descRef.current, {
      y: 30,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    }, "-=1");

    return () => {
      text1.revert();
      text2.revert();
    };
  }, { scope: containerRef });

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center bg-background px-6 pt-24">
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-[1400px] text-center"
      >
        <div className="mb-12 flex items-center justify-center gap-4 overflow-hidden">
          <span className="h-[1px] w-8 bg-black/20" />
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-black/40">
            Creative Developer — Designer
          </p>
          <span className="h-[1px] w-8 bg-black/20" />
        </div>

        <div className="overflow-hidden mb-2">
          <h1 
            ref={title1Ref}
            className="text-[12vw] font-light leading-[0.9] tracking-tight sm:text-[9vw] italic"
          >
            Digital Artisan
          </h1>
        </div>
        <div className="overflow-hidden mb-16">
          <h1 
            ref={title2Ref}
            className="text-[12vw] font-medium leading-[0.9] tracking-tighter sm:text-[9vw] uppercase"
          >
            Making Impact
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center overflow-hidden">
          <p ref={descRef} className="max-w-lg text-lg text-black/60 leading-relaxed font-light">
            I craft visually distilled and technically precise digital interfaces that elevate brands through minimalist elegance.
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center gap-4">
        <div className="h-12 w-[1px] bg-black/10" />
        <span className="text-[9px] uppercase tracking-[0.3em] text-black/30">Scroll</span>
      </div>
    </section>
  );
}
