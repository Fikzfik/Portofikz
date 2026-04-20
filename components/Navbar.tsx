"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      delay: 1.2,
    });

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed left-0 top-0 z-[100] w-full px-6 md:px-16 py-6 transition-all duration-500 ${
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5" : ""
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter hover:text-accent transition-colors duration-300 font-display"
            data-cursor="hover"
          >
            FIKZ<span className="text-accent">.</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative text-sm font-medium uppercase tracking-widest text-[#888] hover:text-white transition-colors duration-300"
                data-cursor="hover"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <a
              href="#contact"
              className="px-6 py-3 border border-white/20 text-sm text-white uppercase tracking-widest hover:bg-accent hover:border-accent hover:text-black transition-all duration-300"
              data-cursor="hover"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Burger */}
          <button
            className="md:hidden text-white hover:text-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-cursor="hover"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[99] bg-background/98 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-5xl font-bold uppercase tracking-tight hover:text-accent transition-colors duration-300 font-display"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
