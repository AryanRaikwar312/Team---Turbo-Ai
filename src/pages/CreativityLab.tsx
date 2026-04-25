import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";
import {
  BookOpen, Layout, Network, Sparkles, Trophy, Clock, ChevronRight,
  Palette, PenTool, Star
} from "lucide-react";

const tools = [
  {
    icon: BookOpen,
    title: "Story Builder",
    desc: "Generate amazing stories with AI using character, location, and theme prompts. Build worlds and craft narratives.",
    color: "from-track-pink to-secondary",
    borderColor: "border-track-pink/30 hover:border-track-pink/60",
    glowClass: "hover:shadow-[0_0_25px_hsl(var(--glow-pink))]",
    features: ["Character Creator", "Plot Generator", "Scene Builder", "Illustration AI"],
  },
  {
    icon: Layout,
    title: "Project Architect",
    desc: "AI helps structure your school projects with outlines, research guides, and presentation templates.",
    color: "from-primary to-track-teal",
    borderColor: "border-primary/30 hover:border-primary/60",
    glowClass: "hover:shadow-[0_0_25px_hsl(var(--glow-primary))]",
    features: ["Project Outline", "Research Helper", "Slide Builder", "Report Writer"],
  },
  {
    icon: Network,
    title: "Mind Map Generator",
    desc: "AI creates visual diagrams, study charts, and concept maps to help you understand complex topics.",
    color: "from-track-teal to-primary",
    borderColor: "border-track-teal/30 hover:border-track-teal/60",
    glowClass: "hover:shadow-[0_0_25px_hsl(var(--glow-teal))]",
    features: ["Concept Maps", "Study Charts", "Flow Diagrams", "Revision Notes"],
  },
];

const challenges = [
  {
    title: "Dragon Tale Challenge",
    desc: "Write a short story about a tech-savvy dragon who teaches coding to villagers.",
    difficulty: "Easy",
    xp: 100,
    timeLeft: "3 days",
    icon: "🐉",
  },
  {
    title: "Future City Blueprint",
    desc: "Design a mind map of your dream futuristic city powered by AI technology.",
    difficulty: "Medium",
    xp: 200,
    timeLeft: "5 days",
    icon: "🏙️",
  },
  {
    title: "Science Poster Master",
    desc: "Create a visual poster explaining how AI learns, using diagrams and illustrations.",
    difficulty: "Hard",
    xp: 350,
    timeLeft: "7 days",
    icon: "🧪",
  },
];

const CreativityLabPage = () => (
  <div className="overflow-hidden wave-pattern">
    {/* Header */}
    <section className="pt-28 pb-12 bg-section-dark">
      <div className="container mx-auto px-4 text-center">
        <FadeInSection>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-track-pink to-secondary flex items-center justify-center text-2xl shadow-[0_0_25px_hsl(var(--glow-pink))]">
              🎨
            </div>
          </div>
          <h1 className="heading-hero mb-4">
            Creativity <span className="text-gradient-primary">Lab</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Unleash your imagination with AI-powered creative tools
          </p>
        </FadeInSection>
      </div>
    </section>

    {/* Creative Tools */}
    <section className="section-padding bg-section-mid">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="heading-section text-center mb-12">
            Creative <span className="text-gradient-primary">Tools</span>
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool, i) => (
            <FadeInSection key={i} delay={i * 150}>
              <div className={`glass-panel border-2 ${tool.borderColor} ${tool.glowClass} p-8 transition-all duration-500 hover:scale-[1.03] h-full group cursor-pointer`}>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <tool.icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground mb-5">{tool.desc}</p>
                <ul className="space-y-2">
                  {tool.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-1 text-primary text-sm font-semibold mt-6 group-hover:gap-2 transition-all">
                  Open Tool <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>

    {/* Creative Challenges */}
    <section className="section-padding bg-section-dark">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="heading-section text-center mb-3">
            Weekly <span className="text-gradient-primary">Creative Challenges</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12">Complete challenges to earn XP and unlock achievements!</p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {challenges.map((c, i) => (
            <FadeInSection key={i} delay={i * 120}>
              <div className="glass-panel p-6 hover:scale-[1.03] transition-all duration-300 card-gold-glow h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{c.icon}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    c.difficulty === "Easy" ? "bg-track-teal/20 text-track-teal" :
                    c.difficulty === "Medium" ? "bg-gold/20 text-gold" :
                    "bg-track-pink/20 text-track-pink"
                  }`}>
                    {c.difficulty}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{c.desc}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-gold" /> +{c.xp} XP</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {c.timeLeft} left</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Start Challenge
                </Button>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-section-mid">
      <div className="container mx-auto px-4 text-center">
        <FadeInSection>
          <div className="glass-panel p-10 max-w-xl mx-auto border border-gold/20">
            <Trophy className="w-10 h-10 text-gold mx-auto mb-4" />
            <h3 className="font-heading font-bold text-2xl text-foreground mb-3">Ready to Create?</h3>
            <p className="text-muted-foreground text-sm mb-6">Jump into any tool and start building something amazing today.</p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </FadeInSection>
      </div>
    </section>
  </div>
);

export default CreativityLabPage;
