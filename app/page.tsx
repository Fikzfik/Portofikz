import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative bg-[#050505] w-full overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      
      {/* Hero Section Container with specific Z-index boundary */}
      <div className="relative z-0">
        <Hero />
      </div>
      
      {/* Light Split Theme Zone - Editorial Style */}
      <div className="relative z-20 bg-[#e6e6e6] text-[#111111] pt-8 pb-32 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
        <About />
        <Projects />
        <Services />
      </div>
      
      {/* Dark Footer Zone */}
      <div className="relative z-30">
        <Contact />
      </div>
    </main>
  );
}
