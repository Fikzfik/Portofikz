"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";

const stats = [
  { number: "5+", label: "Years\nExperience" },
  { number: "50+", label: "Projects\nCompleted" },
  { number: "30+", label: "Happy\nClients" },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(".hero-char", {
      yPercent: 130,
      opacity: 0,
      duration: 1.1,
      stagger: 0.04,
      ease: "power4.out",
    })
      .from(".hero-badge", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.7")
      .from(".hero-line", { scaleX: 0, duration: 0.8, ease: "power3.inOut" }, "-=0.6")
      .from(".hero-tagline", { y: 30, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.6")
      .from(".hero-cta-btn", { y: 20, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power3.out" }, "-=0.6")
      .from(".hero-stat", { y: 20, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out" }, "-=0.5")
      .from(".hero-scroll-indicator", { opacity: 0, y: 10, duration: 0.8, ease: "power3.out" }, "-=0.4");
  }, []);

  const name = "FIKZ.";
  const tagline = ["Creative Developer", "&", "Designer"];

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-end bg-background overflow-hidden px-6 md:px-16 pb-24 pt-32"
    >
      {/* CSS Grid background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,242,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,242,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      {/* Radial gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(0,255,242,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Floating orb */}
      <div
        className="pointer-events-none absolute top-[15%] right-[10%] w-[600px] h-[600px] rounded-full blur-[160px] z-0 opacity-[0.07]"
        style={{ background: "#00fff2" }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        {/* Available badge */}
        <div className="hero-badge flex items-center gap-3 mb-10">
          <div
            className="flex items-center gap-2 border border-accent/30 bg-accent/5 px-4 py-2 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em]">
              Available for work
            </span>
          </div>
        </div>

        {/* Main name — character-by-character */}
        <div className="overflow-hidden mb-6">
          <h1
            className="font-display font-bold leading-[0.85] tracking-tighter"
            style={{ fontSize: "clamp(80px, 18vw, 280px)" }}
          >
            {name.split("").map((char, i) => (
              <span
                key={i}
                className="hero-char inline-block"
                style={char === "." ? { color: "#00fff2" } : {}}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Divider line */}
        <div className="hero-line h-[1px] w-full bg-white/10 mb-10 origin-left" />

        {/* Bottom row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
          <div className="max-w-xl">
            <p className="hero-tagline text-2xl md:text-3xl text-[#888] font-display tracking-tight mb-10 leading-snug">
              {tagline.map((word, i) => (
                <span key={i} className={word === "&" ? "text-accent" : ""}>{word} </span>
              ))}
              <br />
              <span className="text-base text-[#555] font-sans font-normal tracking-normal">
                Building premium digital experiences from Indonesia to the world.
              </span>
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#work"
                className="hero-cta-btn inline-flex items-center gap-3 bg-accent text-black font-bold text-sm uppercase tracking-widest px-8 py-5 hover:bg-white transition-colors duration-300"
                data-cursor="hover"
              >
                View My Work
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#contact"
                className="hero-cta-btn inline-flex items-center gap-3 border border-white/20 text-white font-medium text-sm uppercase tracking-widest px-8 py-5 hover:border-accent hover:text-accent transition-all duration-300"
                data-cursor="hover"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-row gap-10 lg:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="hero-stat text-right">
                <div className="text-4xl md:text-5xl font-bold text-accent font-display">{stat.number}</div>
                <div className="text-[10px] uppercase tracking-widest text-[#555] mt-2 whitespace-pre-line text-right leading-relaxed">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator absolute bottom-10 right-10 flex flex-col items-center gap-3 hidden md:flex">
        <ArrowDown size={14} className="text-accent animate-bounce" />
        <div className="h-16 w-[1px] bg-gradient-to-b from-accent/60 to-transparent" />
        <span
          className="text-[9px] uppercase tracking-[0.4em] text-[#444]"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll Down
        </span>
      </div>

      {/* Corner label */}
      <div className="absolute bottom-10 left-6 md:left-16 text-[10px] uppercase tracking-[0.4em] text-[#333]">
        Based in Indonesia 🇮🇩
      </div>
    </section>
  );
}
