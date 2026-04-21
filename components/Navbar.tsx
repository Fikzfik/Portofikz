"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Magnetic from "./Magnetic";
import TransitionLink from "./TransitionLink";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Skills", href: "#skills" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        delay: 2.8,
      });
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed left-0 top-0 z-[100] w-full px-6 md:px-12 py-8 mix-blend-difference pointer-events-none"
    >
      <div className="mx-auto flex max-w-[1400px] items-start justify-between pointer-events-auto">
        <Magnetic>
          <div className="inline-block">
            <TransitionLink
              href="/"
              className="text-[14px] md:text-[18px] font-bold tracking-tighter text-white block"
            >
              Fikri <span className="opacity-50">.</span> Ardiansyah
            </TransitionLink>
          </div>
        </Magnetic>

        <div className="flex items-center gap-2 md:gap-6 mt-1">
          {navLinks.map((link) => (
            <Magnetic key={link.name}>
              <div className="inline-block">
                <Link
                  href={link.href}
                  className="px-2 py-1 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-60 block"
                >
                  {link.name}
                </Link>
              </div>
            </Magnetic>
          ))}
        </div>
      </div>
    </nav>
  );
}
