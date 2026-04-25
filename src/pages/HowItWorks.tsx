import FadeInSection from "@/components/FadeInSection";
import academyBg from "@/assets/academy-path.jpg";
import { Sparkles, BookOpen, Wrench, Trophy, Rocket } from "lucide-react";

const phases = [
  { phase: "Phase 1", title: "Foundation", weeks: "Weeks 1–2", desc: "AI basics, tool exploration, creative warm-ups", icon: BookOpen, color: "text-track-pink border-track-pink/40" },
  { phase: "Phase 2", title: "Building", weeks: "Weeks 3–4", desc: "Hands-on creative projects, collaborative work", icon: Wrench, color: "text-track-teal border-track-teal/40" },
  { phase: "Phase 3", title: "Advanced", weeks: "Weeks 5–6", desc: "Complex builds, real-world applications", icon: Rocket, color: "text-track-indigo border-track-indigo/40" },
  { phase: "Phase 4", title: "Mastery", weeks: "Weeks 7–8", desc: "Capstone project, portfolio presentation", icon: Trophy, color: "text-primary border-primary/40" },
];

const classStructure = [
  { label: "Warm-up", time: "15 min", pct: 17 },
  { label: "Teaching", time: "30 min", pct: 33 },
  { label: "Hands-on", time: "30 min", pct: 33 },
  { label: "Q&A", time: "10 min", pct: 11 },
  { label: "Homework", time: "5 min", pct: 6 },
];

const HowItWorksPage = () => (
  <div className="overflow-hidden">
    {/* Header */}
    <section className="relative pt-32 pb-20">
      <div className="absolute inset-0">
        <img src={academyBg} alt="Academy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <FadeInSection>
          <h1 className="heading-hero mb-4">
            Your 8-Week <span className="text-gradient-primary">Transformation Journey</span>
          </h1>
        </FadeInSection>
      </div>
    </section>

    {/* Timeline */}
    <section className="section-padding bg-section-dark">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-track-pink via-track-teal to-primary" />

          <div className="space-y-12">
            {phases.map((p, i) => (
              <FadeInSection key={i} delay={i * 200}>
                <div className="relative pl-16">
                  <div className={`absolute left-0 top-0 w-12 h-12 rounded-xl border-2 ${p.color} glass-panel flex items-center justify-center`}>
                    <p.icon className="w-5 h-5" />
                  </div>
                  <div className="glass-panel p-6">
                    <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{p.phase} · {p.weeks}</span>
                    <h3 className="font-heading font-bold text-xl text-foreground mt-1 mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Class Structure */}
    <section className="section-padding bg-section-mid">
      <div className="container mx-auto px-4 max-w-2xl">
        <FadeInSection>
          <h2 className="heading-section text-center mb-12">
            Inside Every <span className="text-gradient-primary">90-Minute Class</span>
          </h2>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="glass-panel p-8">
            <div className="space-y-4">
              {classStructure.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground font-medium">{item.label}</span>
                    <span className="text-muted-foreground">{item.time}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
              <Sparkles className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="font-heading font-bold text-foreground">70% Hands-On Practice</p>
              <p className="text-xs text-muted-foreground mt-1">Learning by doing, not just watching</p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  </div>
);

export default HowItWorksPage;
