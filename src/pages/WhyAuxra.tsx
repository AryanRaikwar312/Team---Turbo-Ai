import FadeInSection from "@/components/FadeInSection";
import cityBg from "@/assets/city-bg.jpg";
import { Users, TrendingUp, Briefcase, BookOpen, Wrench, GraduationCap } from "lucide-react";

const features = [
  { icon: Users, title: "Industry Experts", desc: "Learn from professionals working at top tech companies with real-world experience." },
  { icon: TrendingUp, title: "AI + Career Guidance", desc: "Not just technical skills — get personalized career counseling and roadmaps." },
  { icon: Briefcase, title: "Portfolio Projects", desc: "Build 4-6 real projects you can showcase to schools and future employers." },
  { icon: BookOpen, title: "Small Batches", desc: "Maximum 20 students per batch ensures personalized attention for every learner." },
  { icon: Wrench, title: "Professional Tools", desc: "Work with industry-standard tools like ChatGPT, Canva, Python, and more." },
  { icon: GraduationCap, title: "Age-Specific Curriculum", desc: "Curriculum tailored for each age group ensures optimal learning outcomes." },
];

const WhySyraxoPage = () => (
  <div className="overflow-hidden">
    <section className="relative pt-32 pb-20">
      <div className="absolute inset-0">
        <img src={cityBg} alt="Futuristic city" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <FadeInSection>
          <h1 className="heading-hero mb-4">
            Why Syraxo Learning <span className="text-gradient-primary">Stands Out</span>
          </h1>
        </FadeInSection>
      </div>
    </section>

    <section className="section-padding bg-section-dark">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeInSection key={i} delay={i * 100}>
              <div className="glass-panel p-8 hover:scale-105 transition-all duration-300 h-full border border-primary/10 hover:border-primary/30">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default WhySyraxoPage;
