import FadeInSection from "@/components/FadeInSection";
import classroomBg from "@/assets/classroom-bg.jpg";
import founderAryan from "@/assets/founder-aryan.png";
import founderSanskriti from "@/assets/founder-sanskriti.png";
import { Heart, Users, GraduationCap, Quote, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? "147,197,253" : "196,181,253",
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

const FounderCard = ({
  name,
  title,
  image,
  glowColor,
  delay,
}: {
  name: string;
  title: string;
  image: string;
  glowColor: string;
  delay: number;
}) => (
  <FadeInSection delay={delay}>
    <div
      className="group relative rounded-3xl border border-border/40 p-1 transition-all duration-500 hover:border-primary/50"
      style={{
        background: "linear-gradient(135deg, hsl(230 25% 12% / 0.8), hsl(250 30% 15% / 0.6))",
        backdropFilter: "blur(24px)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
        style={{ background: glowColor }}
      />

      <div className="relative p-6 md:p-8 text-center">
        {/* Character image with float animation */}
        <div className="relative mx-auto w-44 h-56 md:w-52 md:h-64 mb-6">
          <div
            className="absolute inset-0 rounded-2xl opacity-40 blur-2xl"
            style={{ background: glowColor }}
          />
          <img
            src={image}
            alt={name}
            className="relative w-full h-full object-contain animate-float drop-shadow-2xl"
          />
        </div>

        {/* Name & title */}
        <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-1">{name}</h3>
        <p className="text-sm text-primary leading-relaxed">{title}</p>
      </div>
    </div>
  </FadeInSection>
);

const AboutPage = () => (
  <div className="overflow-hidden">
    <section className="relative pt-32 pb-20">
      <div className="absolute inset-0">
        <img src={classroomBg} alt="Classroom" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <FadeInSection>
          <h1 className="heading-hero mb-4">
            About <span className="text-gradient-primary">Syraxo Learning</span>
          </h1>
        </FadeInSection>
      </div>
    </section>

    {/* Our Story */}
    <section className="section-padding bg-section-dark">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <FadeInSection>
            <h2 className="heading-section mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Syraxo Learning was born from a simple observation: millions of young students spend hours on screens every day, 
              but almost none of that time translates into real-world skills.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We set out to change that — to create a world where screen time becomes skill time, 
              where every young mind gets the chance to harness AI for creativity, problem-solving, and career readiness.
            </p>
          </FadeInSection>
          <FadeInSection delay={200}>
            <div className="glass-panel p-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "500+", label: "Students Taught" },
                  { num: "50+", label: "Projects Created" },
                  { num: "20+", label: "Expert Tutors" },
                  { num: "95%", label: "Parent Satisfaction" },
                ].map((s, i) => (
                  <div key={i} className="text-center p-4">
                    <p className="font-heading font-bold text-2xl text-gradient-primary">{s.num}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>

    {/* ===== OUR FOUNDERS — Premium Glassmorphism Section ===== */}
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Deep blue-purple gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(250 50% 18%) 0%, hsl(230 30% 6%) 70%, hsl(230 25% 4%) 100%)",
        }}
      />
      {/* Subtle torii gate silhouette */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 200 160" className="w-[600px] h-[480px]" fill="currentColor">
          <rect x="20" y="20" width="160" height="10" rx="2" />
          <rect x="10" y="10" width="180" height="8" rx="3" />
          <rect x="35" y="30" width="12" height="130" />
          <rect x="153" y="30" width="12" height="130" />
          <rect x="35" y="70" width="130" height="6" rx="2" />
        </svg>
      </div>

      <FloatingParticles />

      {/* Sakura petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={i % 2 === 0 ? "animate-sakura" : "animate-sakura-2"}
            style={{
              position: "absolute",
              left: `${10 + i * 12}%`,
              top: "-20px",
              width: "10px",
              height: "10px",
              borderRadius: "50% 0",
              background: `hsl(340 80% 76% / ${0.15 + Math.random() * 0.15})`,
              animationDuration: `${8 + Math.random() * 7}s`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Top glowing icon */}
        <FadeInSection>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-primary/20 blur-xl animate-pulse-glow" />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Heading */}
        <FadeInSection delay={100}>
          <h2 className="heading-section text-center mb-4">
            Our <span className="text-gradient-primary">Founders</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-lg mx-auto mb-14">
            The visionaries building the future of AI education for the next generation.
          </p>
        </FadeInSection>

        {/* Founder cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
          <FounderCard
            name="Aryan Raikwar"
            title="Co-founder, SYRAXO Learning · Co-founder, AUXRA Digital Marketing"
            image={founderAryan}
            glowColor="hsl(217 100% 50% / 0.25)"
            delay={200}
          />
          <FounderCard
            name="Sanskriti Jadhav"
            title="Co-founder, SYRAXO Learning · Co-founder, AUXRA Digital Marketing"
            image={founderSanskriti}
            glowColor="hsl(263 86% 66% / 0.25)"
            delay={350}
          />
        </div>

        {/* Quote glassmorphism card */}
        <FadeInSection delay={400}>
          <div className="max-w-2xl mx-auto">
            <div
              className="relative rounded-2xl border border-primary/20 p-8 md:p-10"
              style={{
                background: "hsl(230 30% 12% / 0.5)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                <Quote className="w-4 h-4 text-primary-foreground" />
              </div>
              <p className="text-muted-foreground italic leading-relaxed text-center text-sm md:text-base">
                "Every child deserves the chance to create with AI, not just consume content.
                Our mission is to equip the next generation with skills that matter —
                skills that will define their careers and shape their futures."
              </p>
              <p className="text-center text-primary text-xs mt-4 font-heading font-semibold tracking-wide">
                — ARYAN & SANSKRITI
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>

    {/* Tutors */}
    <section className="section-padding bg-section-dark">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="heading-section text-center mb-12">Our <span className="text-gradient-primary">Tutors</span></h2>
        </FadeInSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { name: "Arjun M.", role: "AI & Machine Learning", exp: "5+ years" },
            { name: "Neha R.", role: "Creative Design & Art", exp: "4+ years" },
            { name: "Vikram S.", role: "Python & Web Dev", exp: "6+ years" },
            { name: "Priya T.", role: "Career Counseling", exp: "8+ years" },
          ].map((tutor, i) => (
            <FadeInSection key={i} delay={i * 100}>
              <div className="glass-panel p-6 text-center hover:scale-105 transition-all">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-heading font-semibold text-foreground">{tutor.name}</h4>
                <p className="text-xs text-primary mt-0.5">{tutor.role}</p>
                <p className="text-xs text-muted-foreground mt-1">{tutor.exp} experience</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>

    {/* Social Impact */}
    <section className="section-padding bg-section-mid">
      <div className="container mx-auto px-4 max-w-2xl">
        <FadeInSection>
          <div className="glass-panel p-10 text-center border border-primary/20">
            <Heart className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="font-heading font-bold text-2xl text-foreground mb-3">Social Impact</h3>
            <p className="text-3xl font-heading font-bold text-gradient-primary mb-2">20%</p>
            <p className="text-muted-foreground">scholarship seats reserved for underprivileged students</p>
            <p className="text-sm text-muted-foreground mt-4">
              Our mission: Make AI education accessible to every child, regardless of background.
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  </div>
);

export default AboutPage;