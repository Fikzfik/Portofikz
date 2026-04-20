"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const traits = [
  "Problem Solver",
  "Detail Oriented",
  "Team Player",
  "Fast Learner",
  "Creative Thinker",
  "Clean Code",
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
      },
    });

    tl.from(".about-img-wrap", {
      x: -60,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    })
      .from(".about-accent-line", { scaleY: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")
      .from(".about-label", { y: 20, opacity: 0, duration: 0.7 }, "-=0.6")
      .from(".about-title-line", { y: 60, opacity: 0, stagger: 0.1, duration: 1, ease: "power4.out" }, "-=0.6")
      .from(".about-bio", { y: 30, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .from(".about-tag", { y: 15, opacity: 0, stagger: 0.06, duration: 0.5, ease: "power3.out" }, "-=0.5");
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 md:py-40 px-6 md:px-16 bg-surface overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image Column */}
        <div className="about-img-wrap relative">
          {/* Accent vertical line */}
          <div className="about-accent-line absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-accent/30 to-transparent origin-top" />

          <div className="relative h-[580px] md:h-[680px] overflow-hidden bg-[#0d0d0d]">
            <Image
              src="/profile.png"
              alt="Fikz — Creative Developer & Designer"
              fill
              className="object-cover object-center"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

            {/* Corner brackets */}
            <div className="absolute top-5 left-5 w-12 h-12 border-t-2 border-l-2 border-accent/80" />
            <div className="absolute bottom-5 right-5 w-12 h-12 border-b-2 border-r-2 border-accent/80" />

            {/* Floating badge */}
            <div className="absolute bottom-8 -right-4 md:-right-6 bg-accent text-black px-5 py-4 z-10">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold">Based in</div>
              <div className="text-sm font-bold uppercase tracking-wider mt-1">Indonesia 🇮🇩</div>
            </div>
          </div>

          {/* Below image: experience indicator */}
          <div className="mt-6 flex items-center gap-6 pl-4">
            <div>
              <div className="text-4xl font-bold text-accent font-display">5+</div>
              <div className="text-xs text-[#555] uppercase tracking-widest mt-1">Years of Craft</div>
            </div>
            <div className="w-[1px] h-12 bg-white/10" />
            <div>
              <div className="text-4xl font-bold text-white font-display">50+</div>
              <div className="text-xs text-[#555] uppercase tracking-widest mt-1">Projects Shipped</div>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div>
          <div className="about-label flex items-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em]">About Me</span>
          </div>

          <div className="mb-10 overflow-hidden">
            {["BUILDING THE", "WEB WITH", "PASSION."].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <h2 className={`about-title-line font-display font-bold tracking-tighter leading-tight ${i === 2 ? "text-accent" : "text-white"}`}
                  style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}
                >
                  {line}
                </h2>
              </div>
            ))}
          </div>

          <div className="space-y-5 mb-12">
            <p className="about-bio text-[#888] leading-relaxed text-base md:text-lg">
              I'm <span className="text-white font-medium">Fikz</span>, a Creative Developer & Designer
              who turns ambitious ideas into stunning digital realities. I bridge the gap between design
              and engineering to create products that are not just functional — they're unforgettable.
            </p>
            <p className="about-bio text-[#888] leading-relaxed text-base md:text-lg">
              My approach is rooted in obsessive attention to detail, clean architecture, and a deep
              understanding of user experience. Every pixel is intentional. Every interaction tells
              a story.
            </p>
          </div>

          {/* Trait tags */}
          <div className="flex flex-wrap gap-3">
            {traits.map((trait) => (
              <span
                key={trait}
                className="about-tag px-4 py-2 border border-white/10 text-sm text-[#777] hover:border-accent hover:text-accent transition-all duration-300 cursor-default"
                data-cursor="hover"
              >
                {trait}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-3 text-sm font-medium text-white border-b border-white/30 pb-1 hover:border-accent hover:text-accent transition-all duration-300"
              data-cursor="hover"
            >
              Download Resume
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
