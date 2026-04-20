"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransitionSnapshot } from "./TransitionSnapshotProvider";

gsap.registerPlugin(ScrollTrigger);

export default function ScreenTransition({ children }: { children: React.ReactNode }) {
  const { snapshotHTML, snapshotScrollY, clearSnapshot } = useTransitionSnapshot();
  const isAnimating = useRef(false);
  const newContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apabila kita memiliki snapshot, itu berarti navigasi baru saja terjadi!
    // Parameter `children` saat ini sepenuhnya merujuk ke halaman baru dari Next.js.
    if (snapshotHTML && !isAnimating.current) {
      isAnimating.current = true;
      const newLayerEl = document.getElementById("page-active-content");

      if (newLayerEl) {
        requestAnimationFrame(() => {
            window.scrollTo(0, 0); 
            document.body.style.overflow = "hidden"; 

            // Animasi GSAP mengontrol elemen halaman ini dengan paksa dari awal
            gsap.fromTo(newLayerEl, 
              { y: "250vh", x: "15vw", rotateZ: 20 },
              {
                y: "0vh",
                x: "0vw",
                rotateZ: 0,
                duration: 1.8,
                ease: "power4.inOut",
                onComplete: () => {
                  clearSnapshot(); // Hapus jejak halaman lama
                  isAnimating.current = false;
                  document.body.style.overflow = ""; 
                  
                  // REFRESH SCROLLTRIGGER : Sangat penting agar teks About muncul kembali
                  ScrollTrigger.refresh();
                }
              }
            );
        });
      }
    }
  }, [snapshotHTML, clearSnapshot]);

  return (
    <>
      {/* BAYANGAN HALAMAN LAMA: Beku secara statis di belakang */}
      {snapshotHTML && (
        <div
          className="fixed left-0 w-full overflow-hidden pointer-events-none z-0"
          style={{ top: -snapshotScrollY }}
          dangerouslySetInnerHTML={{ __html: snapshotHTML }}
        />
      )}

      {/* HALAMAN BARU: Kontainer yang stabil agar tidak unmount */}
      <div
        id="page-active-content"
        className={
          snapshotHTML
            ? "fixed z-[99998] bg-background shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
            : "relative z-10 bg-background w-full"
        }
        style={{
          width: snapshotHTML ? "200vw" : "100%",
          height: snapshotHTML ? "200vh" : "auto",
          left: snapshotHTML ? "-50vw" : "0",
          top: snapshotHTML ? "-50vh" : "0",
          willChange: snapshotHTML ? "transform" : "auto",
          transform: snapshotHTML ? "translate(15vw, 250vh) rotate(20deg)" : "none",
        }}
      >
        <div 
          ref={newContentRef}
          className={snapshotHTML ? "absolute left-[50vw] top-[50vh] w-[100vw] h-[100vh] overflow-hidden" : ""}
        >
          {children}
        </div>
      </div>
    </>
  );
}
