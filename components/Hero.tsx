"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransitionSnapshot } from "./TransitionSnapshotProvider";
import SplitType from "split-type";
import HeroGlitchCanvas from "./HeroGlitchCanvas";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { hasPreloaded } = useTransitionSnapshot();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  
  // State untuk Shader Aura GLSL
  const [auraTheme, setAuraTheme] = useState<"blue" | "red">("red");

  // 1. Animasi Masuk (Intro)
  useGSAP(() => {
    if (!titleRef.current) return;

    // Split text gaya mesin tik
    const text1 = new SplitType(titleRef.current, { types: "chars" });
    const tl = gsap.timeline({ delay: hasPreloaded ? 0.3 : 3.0 }); 
    
    tl.from(text1.chars, {
      y: 20,
      opacity: 0,
      duration: 0.1,
      stagger: 0.05,
      ease: "power1.inOut",
    })
    .from(infoRef.current, {
      opacity: 0,
      duration: 2,
      ease: "power2.out",
    }, "-=0.5");

    return () => {
      text1.revert();
    };
  }, { scope: containerRef });

  // 2. Animasi Scroll-Out (Lift Only) - Teks tetap solid hingga tertutup fisik
  useGSAP(() => {
    if (!infoRef.current || !canvasWrapRef.current) return;

    // Teks naik secara perlahan (tanpa memudar)
    // Disinkronkan 1:1 dengan scroll agar gap dengan seksi di bawahnya tetap konstan
    gsap.to(infoRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: () => -window.innerHeight, // Sinkronisasi 1:1 dengan kecepatan scroll
      ease: "none",
    });

    // Kanvas/Portrait tetap di tempat atau naik sedikit (tanpa memudar)
    gsap.to(canvasWrapRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: -50, // Naik sedikit saja untuk efek parallax
      ease: "none",
    });
  }, { scope: containerRef });

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-background overflow-hidden">
      {/* 1. LAYER BAWAH: WebGL GLSL Glitch Canvas */}
      <div ref={canvasWrapRef} className="absolute inset-0 z-0">
        <HeroGlitchCanvas themeColor={auraTheme} />
      </div>

      {/* 2. OVERLAY GRAIN: Memberi tambahan kesan film sinematik */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-30 mix-blend-overlay bg-[url('/noise.svg')]" />

      {/* 3. KONTEN UI CYBERPUNK (Minimalist Typography) */}
      <div
        ref={containerRef}
        className="relative z-20 w-full h-full min-h-screen flex flex-col justify-between p-6 md:p-12 text-foreground"
      >
        {/* Sub Header & Decorative Elements */}
        <div className="flex justify-between items-start w-full pt-10 px-8 mix-blend-difference">
           <div className="hidden md:flex gap-16 text-[#f5f5f5]/50 text-[11px] uppercase tracking-widest font-medium">
             <div className="flex flex-col gap-1">
               <span className="text-[#f5f5f5]">◆ Narrative</span>
               <span>About</span>
               <span>Brand Story</span>
               <span>Connect</span>
             </div>
             <div className="flex flex-col gap-1">
               <span className="text-[#f5f5f5]">■ Liaison</span>
               <span>For Brands</span>
               <span>For Agencies</span>
             </div>
           </div>
        </div>

        {/* Center Bottom Typography - Overlapping chest */}
        <div 
           ref={infoRef}
           className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center mix-blend-difference w-full max-w-2xl px-6"
        >
             <h1 
               ref={titleRef}
               className="text-[28px] md:text-[42px] leading-[1.1] tracking-tight font-medium text-[#f5f5f5]"
             >
               Fikri Ardiansyah.
               <br />
               Design & Code for those 
               <br />
               who refuse to settle.
             </h1>
             
             <div className="mt-8 relative flex items-center justify-between w-[250px]">
                <span className="w-1.5 h-1.5 bg-[#f5f5f5] absolute -left-4"></span>
                <span className="text-[18px] md:text-[24px] tracking-wide text-[#f5f5f5]">2026—Future</span>
                <span className="w-1.5 h-1.5 bg-[#f5f5f5] absolute -right-4"></span>
             </div>
        </div>
      </div>
    </section>
  );
}
