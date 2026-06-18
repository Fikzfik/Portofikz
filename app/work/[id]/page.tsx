"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import Magnetic from "@/components/Magnetic";
import { ArrowLeft } from "lucide-react";
import { use } from "react";

const projectsData: Record<string, { 
  title: string; 
  category: string; 
  image: string; 
  gif: string;
  description: string[]; 
  service: string; 
  year: string; 
  client: string; 
  link: string;
  nextProject: { title: string; id: string } 
}> = {
  "01": {
    title: "EventAir",
    category: "Tournament Management / UX Design",
    image: "/image/event-hub.png",
    gif: "/gif/event-hub.gif",
    description: [
      "EventAir is a high-performance Neo-Brutalist platform for managing competitive tournaments and campus events with real-time orchestration.",
      "Designed to streamline complex event logistics, it provides organizers with powerful tools to manage participants and track engagement effortlessly.",
    ],
    service: "Full-stack / UX Design",
    year: "2024",
    client: "Liaison Global",
    link: "https://event-air-tg6a.vercel.app/",
    nextProject: { title: "Urmoney", id: "02" },
  },
  "02": {
    title: "Urmoney",
    category: "Personal Finance / AI Mobile Assistant",
    image: "/image/urmoney.png",
    gif: "/image/urmoney.png",
    description: [
      "Urmoney is a smart personal finance assistant built with Flutter that leverages generative AI to automate expense logging.",
      "Featuring an AI-powered receipt scanner and a speech-to-text Indonesian voice entry assistant, it extracts transaction details dynamically and syncs them to Supabase in real-time.",
    ],
    service: "Mobile Dev / AI Integration",
    year: "2026",
    client: "Urmoney Team",
    link: "#",
    nextProject: { title: "RecipeMama", id: "03" },
  },
  "03": {
    title: "RecipeMama",
    category: "Food Discovery / Interactive Frontend",
    image: "/image/recipe-mama.png",
    gif: "/gif/recipe-mama.gif",
    description: [
      "RecipeMama is a premium food exploration platform designed with Next.js and Tailwind CSS for home chefs and food lovers.",
      "It integrates animated tooltip UI components, parallax scroll galleries, real-time recipe search with categories, and interactive detail views with checklist functionalities.",
    ],
    service: "Frontend / Motion UI",
    year: "2026",
    client: "Personal Project",
    link: "#",
    nextProject: { title: "CampQuest", id: "04" },
  },
  "04": {
    title: "CampQuest",
    category: "Equipment Rental / Full-stack Web",
    image: "/image/camping.png",
    gif: "/image/camping.png",
    description: [
      "CampQuest is a comprehensive camping equipment rental platform built with Laravel and PHP to streamline outdoor adventures.",
      "It integrates the Midtrans Snap API payment gateway, automatic return scheduling with late penalty (denda) calculations, and stock management.",
    ],
    service: "Full-stack Development",
    year: "2024",
    client: "Project Alat Camping",
    link: "https://projectalatcamping-production.up.railway.app/login",
    nextProject: { title: "Fisy ERM", id: "05" },
  },
  "05": {
    title: "Fisy ERM",
    category: "Multi-Tenant ERP / Go Backend",
    image: "/image/fisy.png",
    gif: "/gif/fisy.gif",
    description: [
      "Fisy is a high-performance multi-tenant Enterprise Resource Management (ERM) backend engine built with Go and MySQL.",
      "Featuring isolated company tables, JWT authentication with custom OTP validation, borrow request flows with stock allocation, and detailed activity log tracking.",
    ],
    service: "Backend / System Design",
    year: "2025",
    client: "Fisy Intern Team",
    link: "#",
    nextProject: { title: "EventAir", id: "01" },
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
              src={project.image}
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
                {project.link !== "#" && (
                  <div className="md:col-span-2 pt-8">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.4em] text-black"
                    >
                      <span className="relative overflow-hidden py-1">
                        Visit Live Site
                        <span className="absolute bottom-0 left-0 h-[1px] w-full bg-black translate-x-[-100%] group-hover/link:translate-x-0 transition-transform duration-500" />
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 group-hover/link:bg-black group-hover/link:text-white transition-all duration-500">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-[-45deg] group-hover/link:rotate-0 transition-transform duration-500">
                          <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </a>
                  </div>
                )}
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
