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
    index: "01",
  },
  {
    quote: "Working with Fikri was a seamless experience. Complex requirements turned into an elegant, high-performance solution.",
    author: "Marc Jacobs",
    role: "Director, Creative Lab",
    index: "02",
  },
  {
    quote: "The motion work alone set this project apart. Every micro-interaction felt intentional and refined.",
    author: "Aria Santoso",
    role: "Head of Product, Liaison Global",
    index: "03",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate the section label
    gsap.from(".testimonial-label", {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    // Animate each quote with SplitType
    const quotes = sectionRef.current?.querySelectorAll(".testimonial-quote");
    quotes?.forEach((quote) => {
      const split = new SplitType(quote as HTMLElement, { types: "lines" });

      gsap.from(split.lines, {
        opacity: 0,
        y: 40,
        duration: 1.3,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quote,
          start: "top 88%",
        },
      });
    });

    // Info rows
    gsap.from(".testimonial-info", {
      opacity: 0,
      y: 16,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    // Divider lines
    gsap.from(".testimonial-divider", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.5,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 md:py-32 px-6 md:px-12 bg-[#e6e6e6] border-t border-black/[0.05]"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="testimonial-label mb-20">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-[1px] w-6 bg-[#951f26]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#951f26]">
              Social Proof
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-normal tracking-tight text-[#111111]">
            What they say
          </h2>
        </div>

        {/* Testimonials List */}
        <div className="space-y-0 divide-y divide-black/[0.06]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group py-12 md:py-16 grid grid-cols-12 gap-6 md:gap-12 items-start"
            >
              {/* Index number */}
              <div className="col-span-2 md:col-span-1 pt-2">
                <span className="text-[11px] text-black/20 font-medium tracking-widest group-hover:text-[#951f26] transition-colors duration-500">
                  {t.index}
                </span>
              </div>

              {/* Quote */}
              <div className="col-span-10 md:col-span-8">
                <p className="testimonial-quote text-[22px] md:text-[32px] lg:text-[38px] font-light italic leading-[1.3] tracking-tight text-[#111111]/80 group-hover:text-[#111111] transition-colors duration-700">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author info */}
              <div className="testimonial-info col-span-12 md:col-span-3 md:pt-2 flex flex-col gap-1 md:text-right">
                <p className="text-[15px] font-semibold tracking-tight text-[#111111]">
                  {t.author}
                </p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-black/35 font-medium">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="testimonial-divider mt-4 h-[1px] bg-black/10 w-full" />
      </div>
    </section>
  );
}
