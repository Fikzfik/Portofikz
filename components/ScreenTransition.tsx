"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTransitionSnapshot } from "./TransitionSnapshotProvider";

export default function ScreenTransition({ children }: { children: React.ReactNode }) {
  const { snapshotHTML, snapshotScrollY, clearSnapshot } = useTransitionSnapshot();
  const isAnimating = useRef(false);

  useEffect(() => {
    // Apabila kita memiliki snapshot, itu berarti navigasi baru saja terjadi!
    // Parameter `children` saat ini sepenuhnya merujuk ke halaman baru dari Next.js.
    if (snapshotHTML && !isAnimating.current) {
      isAnimating.current = true;
      const newLayerEl = document.getElementById("transition-new-layer");

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

      {/* HALAMAN BARU: Beraksi sebagai layer penutup yang meluncur */}
      <div
        id={snapshotHTML ? "transition-new-layer" : "page-active-content"}
        className={
          snapshotHTML
            ? "fixed -left-[50vw] -top-[50vh] w-[200vw] h-[200vh] origin-center shadow-[0_0_100px_rgba(0,0,0,0.5)] z-[99998] bg-[#fafafa]"
            : "relative z-10 bg-background w-full"
        }
        style={{
          willChange: snapshotHTML ? "transform" : "auto",
          transform: snapshotHTML ? "translate(15vw, 250vh) rotate(20deg)" : "none",
        }}
      >
        {snapshotHTML ? (
          <div className="absolute left-[50vw] top-[50vh] w-[100vw] h-[100vh] overflow-hidden">
             {/* ID tetap di-assign di dalam anak saat transisi agar Link di halaman baru kelak dpt mengambil HTMLnya */}
             <div className="min-h-screen" id="page-active-content">
               {children}
             </div>
          </div>
        ) : (
          children
        )}
      </div>
    </>
  );
}
