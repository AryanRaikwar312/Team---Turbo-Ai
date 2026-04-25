import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FadeInSection from "@/components/FadeInSection";
import mountainsBg from "@/assets/mountains-bg.jpg";
import { Sparkles, Palette, Video, Brain, Code, Users, Clock, BookOpen, Award } from "lucide-react";

const tracks = [
  {
    title: "Junior Innovators",
    age: "Age 7–10",
    color: "card-track-pink",
    textColor: "text-track-pink",
    bgColor: "bg-track-pink/10",
    duration: "8 Weeks",
    schedule: "Sat & Sun, 10AM–11:30AM",
    topics: ["AI Art & Creativity", "Scratch Coding", "Game Design Basics", "Digital Storytelling", "Intro to Robotics Concepts"],
    projects: ["AI-Generated Artwork", "Scratch Game", "Digital Story Book", "Creative Poster"],
    outcomes: ["Creative thinking skills", "Basic coding concepts", "Digital literacy", "Portfolio of 4+ projects"],
  },
  {
    title: "Digital Explorers",
    age: "Age 11–13",
    color: "card-track-teal",
    textColor: "text-track-teal",
    bgColor: "bg-track-teal/10",
    duration: "8 Weeks",
    schedule: "Sat & Sun, 12PM–1:30PM",
    topics: ["Video Creation & Editing", "AI Design Tools (Canva, ChatGPT)", "Web Design Basics", "Social Media Content", "Coding with JavaScript"],
    projects: ["YouTube-style Video", "Brand Design Kit", "Personal Website", "AI-Powered App Prototype"],
    outcomes: ["Digital content creation skills", "AI tool proficiency", "Basic web development", "Portfolio of 5+ projects"],
  },
  {
    title: "Future Leaders",
    age: "Age 14–17",
    color: "card-track-indigo",
    textColor: "text-track-indigo",
    bgColor: "bg-track-indigo/10",
    duration: "8 Weeks",
    schedule: "Sat & Sun, 2PM–3:30PM",
    topics: ["AI Tools Mastery", "Python Programming", "Data Analysis Basics", "Career Exploration", "Presentation & Communication"],
    projects: ["AI Chatbot", "Data Dashboard", "Python Automation Script", "Career Roadmap Presentation"],
    outcomes: ["Industry-ready AI skills", "Python fundamentals", "Career clarity & roadmap", "Professional portfolio"],
  },
];

const ProgramsPage = () => {
  return (
    <div className="overflow-hidden">
      {/* Header */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0">
          <img src={mountainsBg} alt="Mountains" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <FadeInSection>
            <h1 className="heading-hero mb-4">
              Choose Your <span className="text-gradient-primary">Learning Journey</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Age-appropriate curriculum designed by industry experts.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Program Cards */}
      <section className="section-padding bg-section-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tracks.map((track, i) => (
              <FadeInSection key={i} delay={i * 150}>
                <div className={`glass-panel border-2 ${track.color} p-8 transition-all duration-500 h-full flex flex-col`}>
                  <h3 className={`font-heading font-bold text-2xl ${track.textColor} mb-1`}>{track.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{track.age}</p>

                  <div className="flex gap-4 mb-6">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" /> {track.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Users className="w-3.5 h-3.5" /> Max 20 students
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-4">{track.schedule}</p>

                  <h4 className="font-heading font-semibold text-sm text-foreground mb-3">What You'll Learn</h4>
                  <ul className="space-y-2 mb-6">
                    {track.topics.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-sm text-foreground/80">
                        <Sparkles className={`w-3.5 h-3.5 ${track.textColor} shrink-0`} /> {t}
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-heading font-semibold text-sm text-foreground mb-3">Projects You'll Create</h4>
                  <ul className="space-y-2 mb-6">
                    {track.projects.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-foreground/80">
                        <Code className={`w-3.5 h-3.5 ${track.textColor} shrink-0`} /> {p}
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-heading font-semibold text-sm text-foreground mb-3">Outcomes</h4>
                  <ul className="space-y-2 mb-8">
                    {track.outcomes.map((o) => (
                      <li key={o} className="flex items-center gap-2 text-sm text-foreground/80">
                        <Award className={`w-3.5 h-3.5 ${track.textColor} shrink-0`} /> {o}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Button variant="hero" size="lg" className="w-full" asChild>
                      <Link to="/enroll">Enroll Now</Link>
                    </Button>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus */}
      <section className="section-padding bg-section-mid">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="glass-panel border-2 border-primary/30 p-10 text-center max-w-2xl mx-auto">
              <BookOpen className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-bold text-2xl text-foreground mb-3">
                BONUS: Career Guidance Included
              </h3>
              <p className="text-muted-foreground">
                Every Future Leaders student gets personalized career counseling, industry exposure, and a custom career roadmap.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;
