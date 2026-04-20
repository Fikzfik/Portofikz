"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(textRefs.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="pt-12 pb-32 overflow-hidden flex justify-center items-center">
      <div className="flex flex-col items-center gap-16 md:gap-24 w-full max-w-2xl px-6">
        
        {/* Statement 1 */}
        <div ref={(el) => { textRefs.current[0] = el; }} className="relative flex items-center justify-center w-full group">
          <span className="absolute left-0 text-[#111111]/30 text-[10px]">■</span>
          <p className="text-[20px] md:text-[28px] font-medium leading-[1.2] text-center tracking-tight text-[#111111] max-w-[400px]">
            Design shapes the world <br/>
            not as decoration, but as a <br/>
            force that leaves a mark.
          </p>
          <span className="absolute right-0 text-[#111111]/30 text-[10px]">■</span>
        </div>

        {/* Statement 2 */}
        <div ref={(el) => { textRefs.current[1] = el; }} className="relative flex items-center justify-center w-full group">
          <span className="absolute left-0 text-[#111111]/30 text-[10px]">■</span>
          <p className="text-[20px] md:text-[28px] font-medium leading-[1.2] text-center tracking-tight text-[#111111] max-w-[400px]">
            It defines how your <br/>
            brand is perceived and <br/>
            how it’s experienced.
          </p>
          <span className="absolute right-0 text-[#111111]/30 text-[10px]">■</span>
        </div>

        {/* Statement 3 */}
        <div ref={(el) => { textRefs.current[2] = el; }} className="relative flex items-center justify-center w-full group">
          <span className="absolute left-0 text-[#111111]/30 text-[10px]">■</span>
          <p className="text-[20px] md:text-[28px] font-medium leading-[1.2] text-center tracking-tight text-[#111111] max-w-[400px]">
            Leave yours.
          </p>
          <span className="absolute right-0 text-[#111111]/30 text-[10px]">■</span>
        </div>

        {/* Technical Expertise (Minimalist) */}
        <div ref={(el) => { textRefs.current[3] = el; }} className="mt-12 flex flex-col items-center gap-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#111111]/30">Expertise / Mastery</span>
          <p className="text-[12px] md:text-[14px] font-medium text-[#111111]/60 text-center max-w-sm leading-loose">
            Next.js — TypeScript — GSAP — WebGL — React — Node.js — UI Design — Interaction — Performance — Strategy
          </p>
        </div>

      </div>
    </section>
  );
}
