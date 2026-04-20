import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative bg-[#050505]">
      <CustomCursor />
      <Navbar />
      <Hero />
      
      {/* Light Split Theme Zone - Editorial Style */}
      <div className="relative z-10 bg-[#e6e6e6] text-[#111111] pt-8 pb-32">
        <About />
        <Projects />
        <Services />
      </div>
      
      {/* Dark Footer Zone */}
      <Contact />
    </main>
  );
}
