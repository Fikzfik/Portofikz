"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SplitType from "split-type";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!titleRef.current) return;
    const splitTitle = new SplitType(titleRef.current, { types: "lines" });
    
    // Wrap lines for masking
    splitTitle.lines?.forEach(line => {
      const wrap = document.createElement("div");
      wrap.className = "line-mask";
      line.parentNode?.insertBefore(wrap, line);
      wrap.appendChild(line);
      line.classList.add("line-inner");
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    tl.from(imageRef.current, {
      scale: 1.2,
      clipPath: "inset(100% 0 0 0)",
      duration: 1.8,
      ease: "expo.inOut",
    })
    .from(splitTitle.lines, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
    }, "-=1")
    .from(textRef.current, {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }, "-=0.8");

    return () => {
      splitTitle.revert();
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="section-padding bg-background overflow-hidden">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-32">
        <div ref={imageRef} className="relative aspect-[4/5] w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
          <Image
            src="/profile.png"
            alt="Fikz Portrait"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-black/20" />
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-black/40">
              Personal Note
            </span>
          </div>

          <h2 ref={titleRef} className="text-5xl font-normal leading-[1.1] tracking-tight md:text-7xl">
            Simplicity is the <span className="italic">ultimate</span> sophistication.
          </h2>

          <div ref={textRef} className="space-y-8 text-xl font-light leading-relaxed text-black/60">
            <p>
              I am Fikz, a creative developer based in Indonesia. I believe that digital experiences should be as beautiful as they are functional.
            </p>
            <p>
              My work focuses on the intersection of minimalist design and high-performance engineering. I help brands communicate their message with clarity and elegance.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6 pt-4">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-black/30">Experience</p>
              <p className="text-2xl font-light italic">5+ Years</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-black/30">Based In</p>
              <p className="text-2xl font-light italic">Indonesia</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-black/30">Focus</p>
              <p className="text-2xl font-light italic">Premium Web</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
