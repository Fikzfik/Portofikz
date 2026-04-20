import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fikz — Creative Developer & Designer",
  description:
    "Personal portfolio of Fikz — a Creative Developer & Designer based in Indonesia, crafting premium digital experiences with Next.js, GSAP, and modern web technologies.",
  openGraph: {
    title: "Fikz — Creative Developer & Designer",
    description: "Crafting premium digital experiences that fuse art with technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
