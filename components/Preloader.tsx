"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTransitionSnapshot } from "./TransitionSnapshotProvider";

export default function Preloader() {
  const { setHasPreloaded } = useTransitionSnapshot();
  const preloaderRef = useRef<HTMLDivElement>(null);
  const holeRef = useRef<SVGRectElement>(null);
  const fRef = useRef<HTMLSpanElement>(null);
  const aRef = useRef<HTMLSpanElement>(null);
  const symbolRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // 1. INITIAL SETTINGS
    const centerX = 500;
    const centerY = 480; // Diturunkan dari 420 ke 480 agar pas di wajah
    
    gsap.set(holeRef.current, { 
        attr: { x: centerX, y: centerY, width: 0, height: 0 }
    }); 
    
    // Inisialisasi Logo tepat di tengah
    gsap.set([fRef.current, aRef.current, symbolRef.current], { 
        left: "50%", 
        top: "50%", 
        xPercent: -50, 
        yPercent: -50, 
        x: 0,
        y: 0,
        opacity: 0 
    });
    
    // Posisi awal F dan A mengapit tengah
    gsap.set(fRef.current, { x: -100 }); 
    gsap.set(aRef.current, { x: 100 }); 

    const tl = gsap.timeline({
      onComplete: () => {
        setHasPreloaded(true);
        if (preloaderRef.current) {
          preloaderRef.current.style.display = "none";
        }
      },
    });

    // PHASE 1: LOGO ANIMATION IN CENTER (FADE IN)
    tl.to([fRef.current, aRef.current, symbolRef.current], {
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.inOut"
    })
    .to({}, { duration: 0.3 })

    // PHASE 2: SNAPPY MOVE TO CORNERS (Pojok Bawah)
    // Menggunakan x/y untuk memindahkan dari center (50,50) ke tepi
    tl.to(fRef.current, {
        x: () => -(window.innerWidth / 2) + 60, // Ke tepi kiri
        y: () => (window.innerHeight / 2) - 80, // Ke bawah
        scale: 0.5,
        duration: 0.6,
        ease: "expo.inOut"
    }, "move")
    .to(aRef.current, {
        x: () => (window.innerWidth / 2) - 60, // Ke tepi kanan
        y: () => (window.innerHeight / 2) - 80, // Ke bawah
        scale: 0.5,
        duration: 0.6,
        ease: "expo.inOut"
    }, "move")
    .to(symbolRef.current, {
        y: () => (window.innerHeight / 2) - 80, // Ke bawah (tetap di tengah x)
        scale: 0.8,
        duration: 0.6,
        ease: "expo.inOut"
    }, "move")
    
    // 1. KOTAK KECIL (1 Detik) - FADE IN EFFECT
    .set(holeRef.current, {
        attr: { x: centerX - 40, y: centerY - 40, width: 80, height: 80 },
        opacity: 0
    }, "move+=0.1")
    .to(holeRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
    }, "move+=0.2")

    // 2. KOTAK LUMAYAN BESAR (1 Detik)
    .to(holeRef.current, {
      attr: { x: centerX - 250, y: centerY - 200, width: 500, height: 400 },
      duration: 1,
      ease: "power2.inOut",
    })

    // PHASE 3: MASSSIVE RIPPING (Reveal) & LOGO DISAPPEAR
    .to(holeRef.current, {
      attr: { x: -500, y: -500, width: 2000, height: 2000 },
      duration: 1.5,
      ease: "expo.inOut",
    })
    .to([fRef.current, aRef.current, symbolRef.current], {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=1");

  }, { scope: preloaderRef });

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[99999] pointer-events-none bg-transparent overflow-hidden"
    >
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask id="preloader-mask">
            <rect width="1000" height="1000" fill="white" />
            <rect ref={holeRef} fill="black" />
          </mask>
        </defs>
        <rect width="1000" height="1000" fill="#050505" mask="url(#preloader-mask)" />
      </svg>

      {/* LOGO ELEMENTS - Style hanya untuk menyembunyikan awal (opacity 0) */}
      <span 
        ref={fRef} 
        style={{ opacity: 0 }}
        className="fixed z-10 text-7xl md:text-9xl font-bold tracking-tighter text-white select-none whitespace-nowrap will-change-transform"
      >
        F
      </span>
      
      <span 
        ref={symbolRef}
        style={{ opacity: 0 }}
        className="fixed z-10 text-3xl md:text-5xl text-white/40 select-none will-change-transform"
      >
        ◆
      </span>

      <span 
        ref={aRef} 
        style={{ opacity: 0 }}
        className="fixed z-10 text-7xl md:text-9xl font-bold tracking-tighter text-white select-none whitespace-nowrap will-change-transform"
      >
        A
      </span>

    </div>
  );
}
