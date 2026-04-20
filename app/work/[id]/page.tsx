"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import Magnetic from "@/components/Magnetic";
import { ArrowLeft } from "lucide-react";
import { use } from "react";

const projectsData: Record<string, { title: string; category: string; image: string; description: string[]; service: string; year: string; client: string; nextProject: { title: string; id: string } }> = {
  "01": {
    title: "Minimal Studio",
    category: "Architecture / Web",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1400",
    description: [
      "A comprehensive digital identity for a modern architecture studio. The project demanded a visual language that communicated precision and sophistication while maintaining warmth.",
      "Every element was meticulously crafted — from the fluid grid system to the custom typeface pairings — resulting in a digital experience that mirrors the studio's commitment to spatial excellence.",
    ],
    service: "Web Design & Dev",
    year: "2025",
    client: "Studio Mika",
    nextProject: { title: "The Editorial", id: "02" },
  },
  "02": {
    title: "The Editorial",
    category: "Design / Typography",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1400",
    description: [
      "A typographic exploration for an independent publishing house. The challenge was to create a digital reading experience that honored the tradition of print while embracing the possibilities of the web.",
      "Custom variable fonts, kinetic headlines, and a carefully balanced whitespace rhythm create an environment where content truly breathes.",
    ],
    service: "Typography / UX",
    year: "2024",
    client: "Verso Press",
    nextProject: { title: "Lunar Identity", id: "03" },
  },
  "03": {
    title: "Lunar Identity",
    category: "Branding / Motion",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1400",
    description: [
      "A complete brand identity system for a next-generation creative agency. The visual language draws from celestial geometry and light, creating a brand that feels both grounded and aspirational.",
      "The motion system was designed to be modular — every animation follows a consistent easing curve and timing structure, ensuring brand cohesion across all digital touchpoints.",
    ],
    service: "Branding / Motion",
    year: "2024",
    client: "Lunar Co.",
    nextProject: { title: "Zen Spaces", id: "04" },
  },
  "04": {
    title: "Zen Spaces",
    category: "Interior / Layout",
    image: "https://images.unsplash.com/photo-1614332284144-67252063d8d6?auto=format&fit=crop&q=80&w=1400",
    description: [
      "An immersive digital showroom for a minimalist interior design collective. The website needed to translate the tactile beauty of physical spaces into a screen-based experience.",
      "Through large-format imagery, deliberate pacing, and subtle parallax effects, we created a browsing experience that feels like walking through a curated gallery.",
    ],
    service: "Web Design",
    year: "2024",
    client: "Zen Collective",
    nextProject: { title: "Minimal Studio", id: "01" },
  },
};

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const project = projectsData[id] || projectsData["01"];

  useGSAP(() => {
    // Kurangi delay karena transisi overlay butuh 0.4s untuk mulai ke atas
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(titleRef.current, {
      y: 60, // Hanya gerakan kecil tanpa opacity 0 agar tidak kosong
      duration: 1.5,
      ease: "expo.out",
    })
      .from(
        ".detail-fade",
        {
          y: 20,
          duration: 1.2,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=1"
      )
      .from(
        ".detail-image",
        {
          scale: 1.05, // Hanya scale parallax kecil, tidak disembunyikan
          duration: 1.8,
          ease: "expo.inOut",
        },
        "-=1.5"
      );
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-background">
      {/* Back nav */}
      <nav className="fixed left-0 top-0 z-[100] w-full px-6 md:px-12 py-8 mix-blend-difference">
        <Magnetic>
          <div className="inline-block">
            <TransitionLink
              href="/"
              className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              Back
            </TransitionLink>
          </div>
        </Magnetic>
      </nav>

      {/* Hero */}
      <section className="flex min-h-[70vh] flex-col justify-end px-6 md:px-16 lg:px-24 pb-16 pt-32">
        <div className="mx-auto w-full max-w-[1400px]">
          <span className="detail-fade mb-6 block text-[10px] uppercase tracking-[0.5em] text-black/30">
            {project.category}
          </span>
          <h1
            ref={titleRef}
            className="text-[14vw] font-normal leading-[0.85] tracking-tighter md:text-[10vw]"
          >
            {project.title.split(" ").map((word, i) => (
              <span key={i} className={i === 1 ? "italic" : ""}>
                {word}{" "}
              </span>
            ))}
          </h1>
        </div>
      </section>

      {/* Full image */}
      <section className="px-6 md:px-16 lg:px-24 pb-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="detail-image relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Details grid */}
      <section className="px-6 md:px-16 lg:px-24 pb-32">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-8">
            {project.description.map((p, i) => (
              <p
                key={i}
                className="detail-fade text-xl font-light leading-relaxed text-black/60"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="detail-fade grid grid-cols-2 gap-12 content-start">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/25 mb-3">
                Service
              </p>
              <p className="text-xl font-light italic">{project.service}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/25 mb-3">
                Year
              </p>
              <p className="text-xl font-light italic">{project.year}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/25 mb-3">
                Client
              </p>
              <p className="text-xl font-light italic">{project.client}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next project */}
      <footer className="py-32 border-t border-black/5 bg-[#fafafa]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-black/20 mb-10">
            Next Project
          </p>
          <TransitionLink
            href={`/work/${project.nextProject.id}`}
            className="inline-block text-5xl md:text-8xl font-normal tracking-tighter hover:italic transition-all duration-700 group"
          >
            {project.nextProject.title}
            <span className="block h-[1px] w-0 bg-black mx-auto mt-4 group-hover:w-full transition-all duration-700" />
          </TransitionLink>
        </div>
      </footer>
    </main>
  );
}
