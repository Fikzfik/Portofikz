"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("data-cursor") === "hover"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: isHovered ? 4 : 1,
        backgroundColor: isHovered ? "rgba(0,0,0,0.05)" : "transparent",
        borderColor: isHovered ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.4)",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isHovered]);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-6 w-6 rounded-full border border-black/40 md:block"
      style={{
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
