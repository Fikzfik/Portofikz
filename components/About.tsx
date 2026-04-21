"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Image reveal from bottom clip
    gsap.from(imageRef.current, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 1.8,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    // Text blocks stagger in
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
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-36 px-6 md:px-12 overflow-hidden bg-[#e6e6e6]"
    >
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        
        {/* Left: Photo */}
        <div className="relative">
          {/* Label badge */}
          <div
            ref={(el) => { textRefs.current[0] = el; }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="h-[1px] w-6 bg-[#951f26]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#951f26]">
              The Person
            </span>
          </div>

          <div
            ref={imageRef}
            className="relative aspect-[3/4] w-full max-w-sm overflow-hidden bg-[#d9d9d9] rounded-sm"
            style={{ clipPath: "inset(0% 0% 0% 0%)" }}
          >
            <Image
              src="/image/me.jpg"
              alt="Fikri Ardiansyah"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />

            {/* Overlay tag */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#951f26] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#951f26]" />
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-[#111111]">
                Available — Late May &apos;26
              </span>
            </div>
          </div>
        </div>

        {/* Right: Statements */}
        <div className="flex flex-col gap-16">
          <div
            ref={(el) => { textRefs.current[1] = el; }}
            className="relative flex items-center justify-start w-full group"
          >
            <span className="absolute -left-4 top-0 text-[#111111]/20 text-[10px]">■</span>
            <p className="text-[22px] md:text-[30px] font-medium leading-[1.2] tracking-tight text-[#111111] max-w-md">
              Design shapes the world{" "}
              <br />
              not as decoration, but as a{" "}
              <br />
              <em className="italic text-[#951f26]">force that leaves a mark.</em>
            </p>
          </div>

          <div
            ref={(el) => { textRefs.current[2] = el; }}
            className="relative flex items-center justify-start w-full group"
          >
            <span className="absolute -left-4 top-0 text-[#111111]/20 text-[10px]">■</span>
            <p className="text-[22px] md:text-[30px] font-medium leading-[1.2] tracking-tight text-[#111111] max-w-md">
              It defines how your{" "}
              <br />
              brand is perceived and{" "}
              <br />
              how it&apos;s experienced.
            </p>
          </div>

          <div
            ref={(el) => { textRefs.current[3] = el; }}
            className="relative flex items-center justify-start w-full group"
          >
            <span className="absolute -left-4 top-0 text-[#111111]/20 text-[10px]">■</span>
            <p className="text-[28px] md:text-[40px] font-semibold leading-[1.1] tracking-tight text-[#111111] max-w-md">
              Leave yours.
            </p>
          </div>

          {/* Bio snippet */}
          <div
            ref={(el) => { textRefs.current[4] = el; }}
            className="border-t border-black/10 pt-8"
          >
            <p className="text-[14px] leading-relaxed text-black/50 max-w-sm">
              Based in Indonesia. Full-stack developer & UI designer specialising in 
              high-end web experiences, motion design, and cross-platform mobile apps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
