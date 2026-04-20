"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, ExternalLink } from "lucide-react";

const socials = [
  { name: "GitHub", url: "#" },
  { name: "LinkedIn", url: "#" },
  { name: "Instagram", url: "#" },
  { name: "Twitter/X", url: "#" },
  { name: "Behance", url: "#" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
      },
    });

    tl.from(".contact-label", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" })
      .from(".contact-title-line", { y: 80, opacity: 0, stagger: 0.12, duration: 1.1, ease: "power4.out" }, "-=0.5")
      .from(".contact-info", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .from(".contact-form-el", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" }, "-=0.6")
      .from(".contact-social", { y: 15, opacity: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" }, "-=0.5");
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-32 md:py-40 px-6 md:px-16 bg-surface min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        {/* Label */}
        <div className="contact-label flex items-center gap-3 mb-16">
          <div className="w-8 h-[1px] bg-accent" />
          <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em]">Get In Touch</span>
        </div>

        {/* Huge heading */}
        <div className="mb-20">
          {["LET'S", "CREATE", "TOGETHER."].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <h2
                className={`contact-title-line font-display font-bold tracking-tighter leading-none ${
                  i === 2 ? "text-accent" : "text-white"
                }`}
                style={{ fontSize: "clamp(50px, 10vw, 150px)" }}
              >
                {line}
              </h2>
            </div>
          ))}
        </div>

        {/* Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left: Info */}
          <div className="contact-info flex flex-col justify-between gap-12">
            <div>
              <p className="text-[#666] text-lg leading-relaxed mb-10 max-w-md">
                Have a project, an idea, or just want to say hi? My inbox is always open. Let's make
                something extraordinary.
              </p>
              <a
                href="mailto:hello@fikzdev.com"
                className="text-2xl md:text-3xl font-bold text-white hover:text-accent transition-colors duration-300 block mb-3 border-b border-white/10 pb-3 hover:border-accent"
                data-cursor="hover"
              >
                hello@fikzdev.com
              </a>
              <a
                href="tel:+6281234567890"
                className="text-[#555] hover:text-accent transition-colors duration-300 text-sm"
                data-cursor="hover"
              >
                +62 812 3456 7890
              </a>
            </div>

            {/* Socials */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#444] mb-6">Find me on</p>
              <div className="flex gap-3 flex-wrap">
                {socials.map(({ name, url }) => (
                  <a
                    key={name}
                    href={url}
                    className="contact-social flex items-center gap-2 px-5 py-3 border border-white/10 text-sm text-[#666] hover:border-accent hover:text-accent transition-all duration-300"
                    data-cursor="hover"
                  >
                    <ExternalLink size={12} />
                    <span className="text-xs uppercase tracking-widest">{name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form className="flex flex-col gap-8">
            <div className="contact-form-el">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-[#444] mb-3">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-[#333] focus:outline-none focus:border-accent transition-colors duration-300 text-base"
              />
            </div>
            <div className="contact-form-el">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-[#444] mb-3">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-[#333] focus:outline-none focus:border-accent transition-colors duration-300 text-base"
              />
            </div>
            <div className="contact-form-el">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-[#444] mb-3">
                Project Type
              </label>
              <input
                type="text"
                placeholder="Web Design, Mobile App, Branding..."
                className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-[#333] focus:outline-none focus:border-accent transition-colors duration-300 text-base"
              />
            </div>
            <div className="contact-form-el">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-[#444] mb-3">
                Tell me about your project
              </label>
              <textarea
                placeholder="I have an idea for..."
                rows={4}
                className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder-[#333] focus:outline-none focus:border-accent transition-colors duration-300 text-base resize-none"
              />
            </div>
            <button
              type="submit"
              className="contact-form-el self-start flex items-center gap-3 bg-accent text-black font-bold text-sm uppercase tracking-widest px-10 py-5 hover:bg-white transition-colors duration-300 group mt-2"
              data-cursor="hover"
            >
              Send Message
              <Send
                size={14}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </button>
          </form>
        </div>

        {/* Footer Bar */}
        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[#222] text-[10px] uppercase tracking-[0.3em]">
            © 2026 Fikz — All rights reserved
          </p>
          <p className="text-[#222] text-[10px] uppercase tracking-[0.3em]">
            Designed & Developed by{" "}
            <span className="text-accent">Fikz</span>
          </p>
        </div>
      </div>
    </section>
  );
}
