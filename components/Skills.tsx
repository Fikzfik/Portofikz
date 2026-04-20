"use client";

const skills1 = [
  "Next.js", "React", "TypeScript", "Node.js", "GSAP", "Figma",
  "Tailwind CSS", "Supabase", "Flutter", "Three.js", "PostgreSQL",
  "Prisma", "GraphQL", "Vercel", "Docker",
];

const skills2 = [
  "UX Design", "Motion Design", "Three.js", "WebGL", "Firebase",
  "Dart", "Git", "REST APIs", "Framer", "Adobe XD",
  "Photoshop", "After Effects", "Lottie", "Web Animation", "CI/CD",
];

function SkillItem({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-8 text-xl md:text-2xl font-bold uppercase tracking-widest text-white/20 hover:text-accent transition-colors duration-300 cursor-default whitespace-nowrap font-display">
      {name}
      <span className="text-accent text-base">✦</span>
    </span>
  );
}

export default function Skills() {
  const doubled1 = [...skills1, ...skills1];
  const doubled2 = [...skills2, ...skills2];

  return (
    <section className="py-32 overflow-hidden bg-background border-y border-white/5">
      {/* Section header */}
      <div className="px-6 md:px-16 max-w-[1400px] mx-auto mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-accent" />
          <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em]">Tech Stack</span>
        </div>
        <h2
          className="font-display font-bold tracking-tighter leading-tight"
          style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
        >
          SKILLS &<br />EXPERTISE
        </h2>
      </div>

      {/* Marquee Row 1 — Left */}
      <div className="flex overflow-hidden mb-5">
        <div className="flex gap-12 pr-12 animate-marquee-left" style={{ willChange: "transform" }}>
          {doubled1.map((skill, i) => (
            <SkillItem key={`r1-${i}`} name={skill} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — Right */}
      <div className="flex overflow-hidden">
        <div className="flex gap-12 pr-12 animate-marquee-right" style={{ willChange: "transform" }}>
          {doubled2.map((skill, i) => (
            <SkillItem key={`r2-${i}`} name={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
