"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

const testimonials = [
  {
    quote: "A rare eye for detail and a master of minimalist aesthetics. The project was delivered with impeccable quality.",
    author: "Elena Rossi",
    role: "Editor, Vogue IT",
  },
  {
    quote: "Working with Portofikz was a seamless experience. They turned complex requirements into an elegant solution.",
    author: "Marc Jacobs",
    role: "Director, Creative Lab",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const quotes = sectionRef.current?.querySelectorAll('.testimonial-quote');
    quotes?.forEach((quote) => {
      const split = new SplitType(quote as HTMLElement, { types: "lines" });
      
      gsap.from(split.lines, {
        opacity: 0,
        y: 50,
        rotateX: -10,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quote,
          start: "top 85%",
        },
      });
    });

    gsap.from(".testimonial-info", {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="section-padding bg-background">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-32 lg:grid-cols-2">
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col gap-12">
              <span className="text-8xl text-black/[0.03] font-serif italic leading-none h-12">"</span>
              <p className="testimonial-quote text-3xl font-light italic leading-tight md:text-5xl text-black/80 tracking-tight">
                {t.quote}
              </p>
              <div className="testimonial-info flex flex-col gap-2">
                <p className="text-xl font-medium tracking-tight">{t.author}</p>
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-4 bg-black/20" />
                  <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
