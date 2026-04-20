"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import Magnetic from "@/components/Magnetic";
import { ArrowLeft } from "lucide-react";
import { use } from "react";

// DATA PROYEK ASLI - Sinkron dengan Beranda
const projectsData: Record<string, { 
  title: string; 
  category: string; 
  image: string; 
  gif: string;
  description: string[]; 
  service: string; 
  year: string; 
  client: string; 
  nextProject: { title: string; id: string } 
}> = {
  "01": {
    title: "Abinawa Heritage",
    category: "Digital Heritage / Culture",
    image: "/image/abinawa.webp",
    gif: "/gif/ceritain.gif",
    description: [
      "Abinawa Heritage is an ambitious digital initiative dedicated to the preservation and dissemination of cultural artifacts. Our mission is to bridge the gap between ancient traditions and modern audiences through immersive storytelling.",
      "The platform utilizes cutting-edge web technologies to create a virtual museum experience, ensuring that historical narratives are not just stored, but lived and felt by a global audience.",
    ],
    service: "Web Strategy / UI Design",
    year: "2025",
    client: "National Cultural Found.",
    nextProject: { title: "Event Hub", id: "02" },
  },
  "02": {
    title: "Event Hub",
    category: "Platform / Management",
    image: "/image/event-hub.png",
    gif: "/gif/event-hub.gif",
    description: [
      "A high-performance management ecosystem built for the modern event planner. Event Hub focuses on efficiency, scalability, and intuitive user experiences to handle complex logistics seamlessly.",
      "From real-time attendee tracking to integrated scheduling, every feature is designed to reduce friction and amplify the impact of every event, regardless of scale.",
    ],
    service: "Full-stack / UX Design",
    year: "2024",
    client: "Liaison Global",
    nextProject: { title: "Green Life", id: "03" },
  },
  "03": {
    title: "Green Life",
    category: "Ecommerce / Sustainability",
    image: "/image/green-life.png",
    gif: "/gif/green-life.gif",
    description: [
      "Green Life is a digital marketplace championing the sustainability movement. We created a shopping experience that feels as organic and refreshing as the products themselves.",
      "The project involved a deep dive into ethical consumer behavior, resulting in a minimalist interface that emphasizes product transparency and environmental consciousness.",
    ],
    service: "Branding / Ecommerce",
    year: "2024",
    client: "Gaia Organics",
    nextProject: { title: "Recipe Mama", id: "04" },
  },
  "04": {
    title: "Recipe Mama",
    category: "Food / Community",
    image: "/image/recipe-mama.png",
    gif: "/gif/recipe-mama.gif",
    description: [
      "A vibrant community platform where the love for home cooking thrives. Recipe Mama transforms traditional recipes into interactive, social culinary journeys.",
      "We focused on building a robust social graph and high-speed asset delivery, allowing a fast-growing community to share and discover flavors from around the world instantly.",
    ],
    service: "React Native / Backend",
    year: "2024",
    client: "Taste Collective",
    nextProject: { title: "HPC Japan", id: "05" },
  },
  "05": {
    title: "HPC Japan",
    category: "Consulting / Business",
    image: "/image/hpc-japan.webp",
    gif: "/gif/sakura-japan.gif",
    description: [
      "HPC Japan represents the pinnacle of business efficiency. The consulting agency required a digital presence that mirrored their surgical precision and strategic depth.",
      "The visual identity combines traditional Japanese aesthetics with modernist layout principles, conveying a brand that is both deeply rooted in heritage and aggressively forward-looking.",
    ],
    service: "Web Consulting",
    year: "2023",
    client: "HPC International",
    nextProject: { title: "Abinawa Heritage", id: "01" },
  },
};

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Ambil data berdasarkan ID, fallback ke ID 01 jika tidak ada
  const project = projectsData[id] || projectsData["01"];

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
    })
      .from(
        ".detail-fade",
        {
          y: 30,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=1"
      )
      .from(
        ".detail-image",
        {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.8,
          ease: "expo.inOut",
        },
        "-=1.5"
      );
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-[#f5f5f5] text-[#111111] overflow-hidden">
      {/* Back nav */}
      <nav className="fixed left-0 top-0 z-[100] w-full px-6 md:px-12 py-8 mix-blend-difference">
        <Magnetic>
          <div className="inline-block">
            <TransitionLink
              href="/"
              className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              Navigation / Back
            </TransitionLink>
          </div>
        </Magnetic>
      </nav>

      {/* Hero Section */}
      <section className="flex min-h-[85vh] flex-col justify-end px-6 md:px-16 lg:px-24 pb-16 pt-32 bg-[#050505] text-white">
        <div className="mx-auto w-full max-w-[1400px] mb-20">
          <span className="detail-fade mb-8 block text-[10px] md:text-[12px] uppercase tracking-[0.8em] text-white/40">
            {project.category}
          </span>
          <h1
            ref={titleRef}
            className="text-[12vw] font-normal leading-[0.85] tracking-tighter md:text-[10vw] uppercase"
          >
             {project.title.split(" ").map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "italic pr-4" : "pr-4"}>
                  {word}
                </span>
             ))}
          </h1>
        </div>
      </section>

      {/* Main Feature Image / GIF */}
      <section className="px-6 md:px-16 lg:px-24 -mt-20 relative z-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="detail-image shadow-2xl relative aspect-[16/9] w-full overflow-hidden bg-white">
            <Image
              src={project.gif || project.image}
              alt={project.title}
              fill
              unoptimized
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Narrative & Details Grid */}
      <section className="px-6 md:px-16 lg:px-24 py-32 bg-[#f5f5f5]">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          
          {/* Left: Narrative Description */}
          <div className="lg:col-span-7 space-y-12">
            <h2 className="detail-fade text-xs uppercase tracking-[0.4em] text-black/30 mb-8">The Project Narrative</h2>
            {project.description.map((p, i) => (
              <p
                key={i}
                className="detail-fade text-2xl md:text-3xl font-light leading-[1.4] tracking-tight text-[#111111]/80"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Right: Technical Stats */}
          <div className="lg:col-span-5 detail-fade">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-8 border-t border-black/10 pt-12 mt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-black/25 mb-4">Core Service</p>
                  <p className="text-xl font-medium italic">{project.service}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-black/25 mb-4">Project Year</p>
                  <p className="text-xl font-medium italic">{project.year}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-black/25 mb-4">Client Representative</p>
                  <p className="text-xl font-medium italic">{project.client}</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Huge Next Project Link */}
      <footer className="py-48 bg-[#050505] text-white overflow-hidden relative group">
        <div className="mx-auto max-w-[1400px] px-6 md:px-16 text-center z-10 relative">
          <p className="text-[11px] uppercase tracking-[0.6em] text-white/20 mb-12 group-hover:text-white/40 transition-colors">
            Keep Exploring / Next Up
          </p>
          <TransitionLink
            href={`/work/${project.nextProject.id}`}
            className="inline-block text-6xl md:text-[12vw] font-normal tracking-tighter leading-none hover:italic transition-all duration-1000"
          >
            {project.nextProject.title}
          </TransitionLink>
          <div className="mt-16 overflow-hidden">
             <div className="h-[1px] w-full bg-white/10 relative">
                <div className="absolute top-0 left-0 h-full w-0 bg-white group-hover:w-full transition-all duration-1000 ease-in-out" />
             </div>
          </div>
        </div>

        {/* Decorative background number */}
        <span className="absolute -bottom-16 -right-16 text-[30vw] font-bold text-white/[0.02] pointer-events-none select-none">
          {project.nextProject.id}
        </span>
      </footer>
    </main>
  );
}
