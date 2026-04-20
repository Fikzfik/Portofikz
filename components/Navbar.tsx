"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Magnetic from "./Magnetic";
import TransitionLink from "./TransitionLink";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        delay: 2.8,
      });
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed left-0 top-0 z-[100] w-full px-6 md:px-12 py-8 transition-all duration-500",
        scrolled
          ? "bg-white/80 py-4 backdrop-blur-md border-b border-black/5"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <Magnetic>
          <div className="inline-block">
            <TransitionLink
              href="/"
              className="text-xl font-medium tracking-tight text-serif block p-2"
            >
              Portofikz<span className="text-black/30">.</span>
            </TransitionLink>
          </div>
        </Magnetic>

        <div className="flex items-center gap-2">
          {navLinks.map((link) => (
            <Magnetic key={link.name}>
              <div className="inline-block">
                <Link
                  href={link.href}
                  className="group relative px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-black/50 transition-colors hover:text-black block"
                  data-cursor="hover"
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
