import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";
import heroBg from "@/assets/hero-bg.jpg";
import heroStudents from "@/assets/hero-students.png";
import lanternBg from "@/assets/lantern-bg.jpg";
import { BookOpen, Monitor, Target, Sparkles, Palette, Code, Brain, Video, Wrench, TrendingUp, Star } from "lucide-react";

const testimonials = [
  { name: "Priya M.", text: "My daughter created her first AI art project in week 2. She's now teaching her friends!", rating: 5 },
  { name: "Rahul S.", text: "The career guidance component is invaluable. My son finally knows what he wants to pursue.", rating: 5 },
  { name: "Anita K.", text: "Best investment in my child's future. The small batch size means real attention.", rating: 5 },
];

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="section-hero">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Anime temple landscape" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-24 pb-12 flex flex-col items-center text-center">
          <FadeInSection>
            <h1 className="heading-hero max-w-4xl mx-auto mb-6">
              This Summer, Transform{" "}
              <span className="text-gradient-primary">Screen Time</span> into{" "}
              <span className="text-gradient-primary">Skill Time</span>
            </h1>
          </FadeInSection>

          <FadeInSection delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              AI Education + Career Guidance for Students Ages 7–17
            </p>
          </FadeInSection>

          <FadeInSection delay={400}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/enroll">Enroll Now</Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/programs">View Programs</Link>
              </Button>
            </div>
          </FadeInSection>

          <FadeInSection delay={600}>
            <img
              src={heroStudents}
              alt="Students learning AI"
              className="mt-12 max-w-lg md:max-w-2xl w-full animate-float"
            />
          </FadeInSection>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="section-padding bg-section-dark">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="heading-section text-center mb-4">
              The AI Literacy Gap is <span className="text-gradient-primary">Real</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              The world is changing fast, but education isn't keeping up.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, emoji: "📚", title: "Education System Failing", stat: "Only 18% schools teach AI", desc: "Most schools lack AI curriculum, leaving students unprepared for the future." },
              { icon: Monitor, emoji: "💻", title: "Wasted Screen Time", stat: "7+ hours daily, 95% consumption", desc: "Kids spend hours on screens but create almost nothing meaningful." },
              { icon: Target, emoji: "🎯", title: "Career Confusion", stat: "72% regret stream choice", desc: "Without guidance, students make uninformed career decisions." },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 150}>
                <div className="glass-panel p-8 hover:scale-105 transition-all duration-300 group cursor-default h-full">
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">{item.title}</h3>
                  <p className="text-primary font-semibold text-sm mb-3">{item.stat}</p>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="section-padding bg-section-mid">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="heading-section text-center mb-2">
              Introducing <span className="text-gradient-primary">Syraxo Learning</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12">
              8-Week Summer Program &nbsp;|&nbsp; 3 Age Groups &nbsp;|&nbsp; Expert Tutors
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Junior Innovators",
                age: "Age 7–10",
                color: "card-track-pink",
                textColor: "text-track-pink",
                icon: Palette,
                skills: ["AI Art & Creativity", "Scratch Coding", "Game Building", "Digital Storytelling"],
              },
              {
                title: "Digital Explorers",
                age: "Age 11–13",
                color: "card-track-teal",
                textColor: "text-track-teal",
                icon: Video,
                skills: ["Video Creation", "AI Design Tools", "Coding Basics", "Digital Marketing"],
              },
              {
                title: "Future Leaders",
                age: "Age 14–17",
                color: "card-track-indigo",
                textColor: "text-track-indigo",
                icon: Brain,
                skills: ["AI Tools Mastery", "Python Basics", "Career Guidance", "Portfolio Building"],
              },
            ].map((track, i) => (
              <FadeInSection key={i} delay={i * 150}>
                <div className={`glass-panel border-2 ${track.color} p-8 transition-all duration-500 h-full`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-muted`}>
                    <track.icon className={`w-6 h-6 ${track.textColor}`} />
                  </div>
                  <h3 className={`font-heading font-bold text-2xl ${track.textColor} mb-1`}>{track.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{track.age}</p>
                  <ul className="space-y-3">
                    {track.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2 text-sm text-foreground/80">
                        <Sparkles className={`w-4 h-4 ${track.textColor} shrink-0`} />
                        {skill}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" size="lg" className="w-full mt-8" asChild>
                    <Link to="/programs">Learn More</Link>
                  </Button>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="section-padding bg-section-dark">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="heading-section text-center mb-12">
              Student <span className="text-gradient-primary">Success Stories</span>
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {testimonials.map((t, i) => (
              <FadeInSection key={i} delay={i * 150}>
                <div className="glass-panel p-8 h-full">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground/90 text-sm mb-4 italic">"{t.text}"</p>
                  <p className="text-muted-foreground text-sm font-semibold">— {t.name}</p>
                </div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection>
            <h3 className="font-heading font-semibold text-xl text-center text-foreground mb-6">Student Projects</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {["AI Art", "Mini Games", "Websites", "Posters", "Videos", "Apps"].map((p, i) => (
                <div key={i} className="glass-panel p-4 text-center hover:scale-105 transition-transform">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mx-auto mb-2">
                    <Code className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">{p}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={lanternBg} alt="Lantern festival" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="heading-section mb-6">
              Limited Seats Available — <span className="text-gradient-primary">Enroll Now</span>
            </h2>
            <Button variant="hero" size="xl" asChild>
              <Link to="/enroll">Enroll Now</Link>
            </Button>
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              {[
                { icon: Sparkles, label: "Expert Tutors" },
                { icon: Target, label: "Small Batches" },
                { icon: TrendingUp, label: "Career Guidance" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-foreground/80">
                  <badge.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
