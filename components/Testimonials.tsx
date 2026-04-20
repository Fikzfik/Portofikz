"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const testimonials = [
  {
    quote:
      "Fikz delivered an absolutely stunning portfolio website that exceeded all our expectations. The animations are buttery smooth and the attention to detail is on another level.",
    author: "Ahmad Rizki",
    role: "CEO, TechVenture ID",
    index: "01",
  },
  {
    quote:
      "Working with Fikz was an incredible experience. He understood our vision immediately and translated it into a digital product that truly represents who we are.",
    author: "Sarah Lim",
    role: "Creative Director, Studio KL",
    index: "02",
  },
  {
    quote:
      "The craftsmanship in Fikz's work is outstanding. Our app's UI/UX received overwhelming positive feedback. He's not just a developer — he's a strategist.",
    author: "Budi Santoso",
    role: "Product Manager, StartupX",
    index: "03",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".testimonial-card", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-40 px-6 md:px-16 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em]">
                Client Words
              </span>
            </div>
            <h2
              className="font-display font-bold tracking-tighter leading-tight"
              style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
            >
              WHAT CLIENTS<br />
              <span className="text-accent">SAY.</span>
            </h2>
          </div>
          <p className="text-[#555] max-w-xs text-sm leading-relaxed">
            Trusted by startups and agencies across Southeast Asia to deliver premium digital work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {testimonials.map((t) => (
            <div
              key={t.index}
              className="testimonial-card group bg-background p-10 hover:bg-surface transition-colors duration-500"
            >
              {/* Index */}
              <div className="text-[10px] text-[#333] uppercase tracking-widest mb-8">{t.index}</div>

              {/* Quote mark */}
              <div className="text-6xl text-accent/20 font-serif leading-none mb-6 font-display">"</div>

              <p className="text-[#888] leading-relaxed mb-10 italic text-sm md:text-base group-hover:text-[#aaa] transition-colors duration-300">
                {t.quote}
              </p>

              <div className="border-t border-white/5 pt-6 flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xs font-bold font-display">
                  {t.author.split(" ")[0][0]}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t.author}</div>
                  <div className="text-[10px] text-accent uppercase tracking-widest mt-0.5">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
