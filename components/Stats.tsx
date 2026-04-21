"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { value: 15, suffix: "+", label: "Projects Shipped" },
  { value: 3, suffix: "+", label: "Years of Craft" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 8, suffix: "+", label: "Happy Clients" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    numberRefs.current.forEach((el, i) => {
      if (!el) return;

      const target = stats[i].value;
      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.floor(obj.val).toString();
        },
      });
    });

    // Fade in the whole section
    gsap.from(".stat-item", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 bg-[#e6e6e6] border-t border-black/[0.05]"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Label */}
        <div className="mb-16 flex items-center gap-3">
          <div className="h-[1px] w-6 bg-black/20" />
          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-black/40">
            By the numbers
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-item flex flex-col gap-4 group"
            >
              {/* Number */}
              <div className="flex items-end gap-1 leading-none">
                <span
                  ref={(el) => { numberRefs.current[i] = el; }}
                  className="text-[56px] md:text-[80px] font-bold tracking-tighter text-[#111111] leading-none tabular-nums"
                >
                  0
                </span>
                <span className="text-[40px] md:text-[60px] font-light text-[#951f26] leading-none mb-1">
                  {stat.suffix}
                </span>
              </div>

              {/* Divider */}
              <div className="relative h-[1px] bg-black/10 overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-0 bg-[#951f26] group-hover:w-full transition-all duration-700 ease-out" />
              </div>

              {/* Label */}
              <p className="text-[12px] md:text-[13px] uppercase tracking-[0.3em] text-black/40 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
