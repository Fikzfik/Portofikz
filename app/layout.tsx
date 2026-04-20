import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import ScreenTransition from "@/components/ScreenTransition";
import { TransitionSnapshotProvider } from "@/components/TransitionSnapshotProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Portofikz | Modern & Elegant Portfolio",
  description: "A clean, sophisticated personal portfolio built with Next.js, GSAP, and Lenis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased selection:bg-black selection:text-white grain`}
      >
        <Preloader />
        <TransitionSnapshotProvider>
          <SmoothScroll>
            <ScreenTransition>
              {children}
            </ScreenTransition>
          </SmoothScroll>
        </TransitionSnapshotProvider>
      </body>
    </html>
  );
}
