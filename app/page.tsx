import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <main className="relative bg-[#050505] w-full">
      <CustomCursor />
      <Navbar />
      
      {/* 
        STICKY HERO ZONE: 
        Hero akan tetap diam di layar selama seksi selanjutnya meluncur naik.
      */}
      <div className="sticky top-0 h-screen z-0">
        <Hero />
      </div>
      
      {/* 
        BODY CONTENT (CURTAIN): 
        Seksi ini akan meluncur naik di atas Hero (z-20).
      */}
      <div className="relative z-20 bg-[#e6e6e6] text-[#111111] pt-0 pb-12 overflow-hidden">
        <About />
        <Stats />
        <Projects />
        
        {/* Transition Breaker: Tech Stack */}
        <Marquee text="TECH STACK / DIGITAL CRAFT / CORE EXPERTISE" speed={20} />
        <Skills />
        
        <Experience />
        
        {/* Transition Breaker: Services */}
        <Marquee text="SOLVING PROBLEMS / BUILDING VALUE / COLLABORATION" speed={25} direction="right" />
        <Services />
        
        <Testimonials />
      </div>
      
      {/* Dark Footer Zone */}
      <div className="relative z-30">
        <Contact />
      </div>
    </main>
  );
}
