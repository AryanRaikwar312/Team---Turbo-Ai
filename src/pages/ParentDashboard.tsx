import { useState } from "react";
import FadeInSection from "@/components/FadeInSection";
import {
  BarChart3, Clock, Brain, Shield, Activity, BookOpen,
  TrendingUp, Eye, Lock, Bell, CheckCircle2
} from "lucide-react";

const skillData = [
  { skill: "Critical Thinking", progress: 78, color: "from-primary to-secondary" },
  { skill: "Creativity", progress: 85, color: "from-track-pink to-secondary" },
  { skill: "Problem Solving", progress: 62, color: "from-track-teal to-primary" },
  { skill: "Communication", progress: 70, color: "from-gold to-accent" },
  { skill: "Digital Literacy", progress: 90, color: "from-track-indigo to-primary" },
];

const activityLog = [
  { time: "Today, 4:30 PM", action: "Completed Mind Quest challenge", type: "quest", icon: "🧩" },
  { time: "Today, 3:15 PM", action: "Asked AI Sensei about photosynthesis", type: "chat", icon: "🥋" },
  { time: "Today, 2:00 PM", action: "Created a story in Creator Studio", type: "creative", icon: "📝" },
  { time: "Yesterday", action: "Earned 'Speed Learner' badge", type: "badge", icon: "⚡" },
  { time: "Yesterday", action: "Completed 2 Knowledge Forge sessions", type: "learn", icon: "🔥" },
  { time: "2 days ago", action: "Started new Skill Path module", type: "skill", icon: "📈" },
];

const safetyControls = [
  { label: "Content filtering enabled", active: true, icon: Shield },
  { label: "Chat monitoring active", active: true, icon: Eye },
  { label: "Screen time limits set", active: true, icon: Clock },
  { label: "Weekly reports enabled", active: true, icon: Bell },
  { label: "Safe search mode", active: true, icon: Lock },
];

const weeklyStudyData = [
  { day: "Mon", hours: 1.5 },
  { day: "Tue", hours: 2.0 },
  { day: "Wed", hours: 1.0 },
  { day: "Thu", hours: 2.5 },
  { day: "Fri", hours: 1.8 },
  { day: "Sat", hours: 3.0 },
  { day: "Sun", hours: 0.5 },
];

const ParentDashboardPage = () => {
  return (
    <div className="overflow-hidden">
      {/* Header */}
      <section className="pt-28 pb-8 bg-section-dark">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-track-teal to-primary flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                  Parent <span className="text-gradient-primary">Dashboard</span>
                </h1>
                <p className="text-muted-foreground text-sm">Zen overview of your child's learning journey</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="bg-section-dark pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Study Time", value: "12.3 hrs", sub: "This week", icon: Clock, color: "text-primary" },
              { label: "Quests Completed", value: "24", sub: "+5 this week", icon: CheckCircle2, color: "text-track-teal" },
              { label: "Current Streak", value: "7 days", sub: "Personal best!", icon: TrendingUp, color: "text-gold" },
              { label: "Badges Earned", value: "3 / 6", sub: "50% complete", icon: Activity, color: "text-track-pink" },
            ].map((stat, i) => (
              <FadeInSection key={i} delay={i * 80}>
                <div className="glass-panel p-5">
                  <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                  <p className="font-heading font-bold text-xl text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">{stat.sub}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Study Time + Skills */}
      <section className="section-padding bg-section-mid">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Study Time Tracking */}
            <FadeInSection>
              <div className="glass-panel p-8 h-full">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" /> Study Time This Week
                </h3>
                <div className="flex items-end justify-between gap-2 h-32">
                  {weeklyStudyData.map((s, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-muted-foreground">{s.hours}h</span>
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-primary to-secondary transition-all"
                        style={{ height: `${(s.hours / 3) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{s.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>

            {/* Skill Development */}
            <FadeInSection delay={150}>
              <div className="glass-panel p-8 h-full">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-6 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-secondary" /> Skill Development
                </h3>
                <div className="space-y-4">
                  {skillData.map((s, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground/80">{s.skill}</span>
                        <span className="text-muted-foreground">{s.progress}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${s.color} transition-all duration-1000`}
                          style={{ width: `${s.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Activity Log + Safety Controls */}
      <section className="section-padding bg-section-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Activity Log */}
            <FadeInSection>
              <div className="glass-panel p-8 h-full">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gold" /> AI Activity Log
                </h3>
                <div className="space-y-3">
                  {activityLog.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <span className="text-lg">{item.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm text-foreground/90">{item.action}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>

            {/* Safety Controls */}
            <FadeInSection delay={150}>
              <div className="glass-panel p-8 h-full">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-track-teal" /> Safety Controls
                </h3>
                <div className="space-y-3">
                  {safetyControls.map((ctrl, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                      <div className="flex items-center gap-3">
                        <ctrl.icon className="w-4 h-4 text-track-teal" />
                        <span className="text-sm text-foreground/90">{ctrl.label}</span>
                      </div>
                      <div className={`w-10 h-5 rounded-full relative transition-colors ${
                        ctrl.active ? "bg-track-teal" : "bg-muted"
                      }`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform ${
                          ctrl.active ? "left-[22px]" : "left-0.5"
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  All safety features are active and monitoring your child's learning environment.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParentDashboardPage;
