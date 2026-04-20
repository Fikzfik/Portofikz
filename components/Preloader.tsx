"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Persiapan awal elemen: Lubang 0x0 di tengah persis
    gsap.set(boxRef.current, { width: 0, height: 0, xPercent: -50, yPercent: -50 }); 
    gsap.set(textRef.current, { y: 20, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = "none";
        }
      },
    });

    // 1. Membuak lubang kecil di tengah layar, menampakkan isi (homepage) di baliknya
    tl.to(boxRef.current, {
      width: "45vw", // Anda bisa sesuaikan seberapa besar portal ini
      height: "25vh",
      duration: 1.8,
      ease: "power4.out",
    })
    // 2. Teks nama muncul bersamaan
    .to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    }, "-=1.4")
    // Jeda sejenak untuk menikmati portal tersebut
    .to({}, { duration: 0.6 })
    // 3. Merobek lubang (membesar ekstrem) untuk membuka halaman secara keseluruhan
    .to(boxRef.current, {
      width: "300vw", // Zoom ekstrem melebihi ukuran layar apapu
      height: "300vh",
      duration: 1.5,
      ease: "expo.inOut",
    })
    // Teks memudar saat portal merobek layar
    .to(textRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    }, "-=1.5");

  }, []);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[99999] pointer-events-none flex flex-col items-center justify-center bg-transparent will-change-transform"
    >
      {/* Trik Portal CSS: Menggunakan border raksasa hitam untuk menciptakan efek 'Bolong' di tengah */}
      <div 
        ref={boxRef}
        style={{
            border: "5000px solid #111111", // Hitam gelap menyelimuti seluruh sisi
            position: "absolute",
            left: "50%",
            top: "50%", // Box model sangat kritikal agar ukuran dihitung sebagai 'lubang' (bukan luarnya)
            boxSizing: "content-box"  
        }}
        className="will-change-[width,height]"
      />

      {/* Tulisan di bawah */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full text-center z-10">
        <p 
          ref={textRef} 
          className="text-[12px] font-medium uppercase tracking-[0.4em] text-white/50 mix-blend-difference"
        >
          Fikri Ardiansyah
        </p>
      </div>
    </div>
  );
}
