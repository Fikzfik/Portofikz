"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    title: "Brand Strategy",
    description: "Defining the unique value and positioning of your personal brand to stand out in a crowded market.",
  },
  {
    title: "Digital Design",
    description: "Creating sophisticated interfaces that combine elegance with functionality across all devices.",
  },
  {
    title: "Development",
    description: "Building fast, secure, and scalable solutions with precision engineering and clean architecture.",
  },
  {
    title: "Motion & Interaction",
    description: "Adding life to digital products through subtle, meaningful animations that enhance user journey.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".service-item", {
      opacity: 0,
      y: 100,
      rotateX: -15,
      duration: 1.5,
      stagger: 0.15,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="services" className="section-padding bg-[#fafafa]">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-24 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-[1px] w-8 bg-black/20" />
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-black/40">Services</span>
            </div>
            <h2 className="text-5xl font-normal leading-tight tracking-tight md:text-7xl">
              Solutions for the <span className="italic underline decoration-1 underline-offset-8">modern</span> age.
            </h2>
          </div>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 gap-[1px] bg-black/5 md:grid-cols-2 overflow-hidden">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="service-item bg-[#fafafa] p-12 lg:p-20 hover:bg-white transition-all duration-700 group perspective-1000"
            >
              <span className="mb-12 block text-sm font-light text-black/20">
                / {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-8 text-4xl font-normal tracking-tight md:text-5xl group-hover:italic transition-all duration-500 origin-left">
                {service.title}
              </h3>
              <p className="max-w-sm text-lg font-light leading-relaxed text-black/50 group-hover:text-black/80 transition-colors duration-500">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
