"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Curve() {
  const pathname = usePathname();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (dimensions.width > 0) {
      animateIn();
    }
  }, [pathname, dimensions]);

  const animateIn = () => {
    const { width, height } = dimensions;
    
    // Starting path (curved at bottom)
    const initialPath = `
        M0 0 
        L${width} 0 
        L${width} ${height} 
        Q${width / 2} ${height + 300} 0 ${height} 
        L0 0
    `;
    
    // Ending path (flat)
    const targetPath = `
        M0 0 
        L${width} 0 
        L${width} ${height} 
        Q${width / 2} ${height} 0 ${height} 
        L0 0
    `;

    gsap.set(svgRef.current, { y: 0 });
    gsap.set(pathRef.current, { attr: { d: initialPath } });
    
    const tl = gsap.timeline();

    tl.to(pathRef.current, {
      attr: { d: targetPath },
      duration: 0.8,
      ease: "power3.inOut",
    })
    .to(svgRef.current, {
      y: -dimensions.height - 300,
      duration: 0.8,
      ease: "power3.inOut",
    });
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999]">
      <svg 
        ref={svgRef}
        className="h-[calc(100vh+600px)] w-full fill-[#111111]"
      >
        <path ref={pathRef} />
      </svg>
    </div>
  );
}
