import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  ChevronLeft, 
  ChevronRight,
  User,
  Star,
  BellRing,
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  startOfWeek, endOfWeek, startOfMonth, endOfMonth, 
  eachDayOfInterval, format, isSameDay, addDays, 
  subDays, addMonths, subMonths, isToday, addWeeks, subWeeks 
} from "date-fns";

// Mock Data
type Level = "Beginner" | "Intermediate" | "Advanced";

interface LiveClass {
  id: string;
  title: string;
  teacher: string;
  date: Date;
  durationMin: number;
  level: Level;
  description: string;
  participants: number;
}

const getMockClasses = (): LiveClass[] => {
  const today = new Date();
  return [
    {
      id: "1",
      title: "AI Basics & Ethics",
      teacher: "Sensei Taro",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0), // 2:00 PM today
      durationMin: 60,
      level: "Beginner",
      description: "Learn the foundational principles of Artificial Intelligence and digital ethics.",
      participants: 12
    },
    {
      id: "2",
      title: "Neural Networks 101",
      teacher: "Sensei Akira",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 16, 30), // 4:30 PM tomorrow
      durationMin: 90,
      level: "Intermediate",
      description: "Dive deep into the structure and function of artificial neural networks.",
      participants: 8
    },
    {
      id: "3",
      title: "Advanced Prompt Engineering",
      teacher: "Sensei Yuki",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 10, 0),
      durationMin: 60,
      level: "Advanced",
      description: "Master the art of communicating with complex AI models.",
      participants: 5
    },
    {
      id: "4",
      title: "Robotics Fundamentals",
      teacher: "Sensei Hiro",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 0), // 5:00 PM today
      durationMin: 45,
      level: "Beginner",
      description: "Introduction to physical computing and robot behavior.",
      participants: 15
    }
  ];
};

const getLevelColor = (level: Level) => {
  switch (level) {
    case "Beginner": return "bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.3)]";
    case "Intermediate": return "bg-blue-500/20 border-blue-500/50 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]";
    case "Advanced": return "bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]";
  }
};

const getLevelGlow = (level: Level) => {
  switch (level) {
    case "Beginner": return "glow-indigo";
    case "Intermediate": return "glow-primary";
    case "Advanced": return "card-gold-glow"; // custom yellow glow
  }
};

export default function LiveClasses() {
  const [view, setView] = useState<"monthly" | "weekly">("weekly");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<LiveClass | null>(null);
  
  useEffect(() => {
    setClasses(getMockClasses());
  }, []);

  const nextClass = classes.filter(c => c.date > new Date()).sort((a, b) => a.date.getTime() - b.date.getTime())[0];

  const handlePrevious = () => {
    if (view === "monthly") {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(subWeeks(currentDate, 1));
    }
  };

  const handleNext = () => {
    if (view === "monthly") {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      setCurrentDate(addWeeks(currentDate, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const renderMonthlyView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="grid grid-cols-7 gap-2 md:gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-heading font-medium text-muted-foreground p-2">
            {day}
          </div>
        ))}
        {days.map((day, idx) => {
          const dayClasses = classes.filter(c => isSameDay(c.date, day));
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          
          return (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: idx * 0.01 }}
              key={day.toString()} 
              className={`min-h-[100px] md:min-h-[120px] p-2 rounded-xl border transition-all ${
                isCurrentMonth ? "glass-panel" : "bg-transparent border-transparent opacity-40"
              } ${isToday(day) ? "border-primary/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]" : ""}`}
            >
              <div className={`text-right text-sm mb-2 font-medium ${isToday(day) ? "text-primary" : "text-foreground"}`}>
                {format(day, 'd')}
              </div>
              <div className="flex flex-col gap-1">
                {dayClasses.map(c => (
                  <div 
                    key={c.id} 
                    onClick={() => setSelectedClass(c)}
                    className={`text-xs p-1.5 rounded-md cursor-pointer border truncate transition-transform hover:scale-105 ${getLevelColor(c.level)}`}
                  >
                    {format(c.date, 'h:mm a')} - {c.title}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderWeeklyView = () => {
    const weekStart = startOfWeek(currentDate);
    const weekEnd = endOfWeek(weekStart);
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
    const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM

    return (
      <div className="glass-panel overflow-hidden border border-border/50">
        <div className="grid grid-cols-8 border-b border-border/50 bg-background/30 backdrop-blur-md sticky top-0 z-10">
          <div className="p-4 border-r border-border/50"></div>
          {days.map((day, idx) => (
            <div key={idx} className={`p-4 text-center border-r border-border/50 last:border-r-0 ${isToday(day) ? 'bg-primary/10' : ''}`}>
              <div className="text-sm font-medium text-muted-foreground">{format(day, 'EEE')}</div>
              <div className={`text-2xl font-bold font-heading ${isToday(day) ? 'text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'text-foreground'}`}>
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>
        <div className="relative h-[800px] overflow-y-auto no-scrollbar">
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-8 border-b border-border/20 h-20">
              <div className="p-2 text-xs font-medium text-muted-foreground text-right border-r border-border/50 relative">
                <span className="absolute -top-3 right-2 bg-background px-1">{hour}:00 {hour >= 12 ? 'PM' : 'AM'}</span>
              </div>
              {days.map((day, idx) => (
                <div key={idx} className={`border-r border-border/20 last:border-r-0 relative ${isToday(day) ? 'bg-primary/5' : ''}`}>
                  {/* Render class block if it falls in this hour for this day */}
                  {classes.filter(c => isSameDay(c.date, day) && c.date.getHours() === hour).map((c, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      key={c.id}
                      onClick={() => setSelectedClass(c)}
                      className={`absolute left-1 right-1 top-1 p-2 rounded-lg border cursor-pointer transition-all hover:z-20 hover:scale-105 ${getLevelColor(c.level)}`}
                      style={{ height: `${(c.durationMin / 60) * 100}%`, minHeight: '60px' }}
                    >
                      <div className="font-bold text-xs truncate mb-1">{c.title}</div>
                      <div className="text-[10px] opacity-80 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {format(c.date, 'h:mm a')}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          ))}
          {/* Current Time Line (Mocked for demonstration, assuming today is in current week view) */}
          <div className="absolute left-[12.5%] right-0 border-t-2 border-primary z-10 pointer-events-none shadow-[0_0_10px_rgba(59,130,246,0.8)]" style={{ top: '350px' }}>
            <div className="w-3 h-3 rounded-full bg-primary absolute -top-[7px] -left-[6px] shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse-glow" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden bg-section-dark">
      {/* Background elements */}
      <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-2">
              <Video className="w-4 h-4" /> Live Interactive Learning
            </div>
            <h1 className="heading-section text-gradient-primary">Live Classes Schedule</h1>
            <p className="text-muted-foreground max-w-2xl text-lg">Manage and join your upcoming expert-led sessions.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Button variant="outline" className="hidden md:flex border-primary/30 hover:bg-primary/10 hover:text-primary">
              <Award className="w-4 h-4 mr-2" /> Admin: + Schedule Class
            </Button>
            <Button variant="hero" onClick={handleToday}>
              Today
            </Button>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Calendar Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Calendar Controls */}
            <div className="glass-panel p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-background/50 rounded-lg p-1 border border-border/50">
                  <Button 
                    variant={view === "monthly" ? "default" : "ghost"} 
                    size="sm" 
                    onClick={() => setView("monthly")}
                    className={view === "monthly" ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.4)]" : "text-muted-foreground"}
                  >
                    Monthly
                  </Button>
                  <Button 
                    variant={view === "weekly" ? "default" : "ghost"} 
                    size="sm" 
                    onClick={() => setView("weekly")}
                    className={view === "weekly" ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.4)]" : "text-muted-foreground"}
                  >
                    Weekly
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={handlePrevious} className="border-border/50 hover:bg-white/5">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-xl font-heading font-bold min-w-[180px] text-center">
                  {format(currentDate, view === "monthly" ? 'MMMM yyyy' : 'MMM d, yyyy')}
                </h2>
                <Button variant="outline" size="icon" onClick={handleNext} className="border-border/50 hover:bg-white/5">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Calendar View */}
            <AnimatePresence mode="wait">
              <motion.div
                key={view + currentDate.toString()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {view === "monthly" ? renderMonthlyView() : renderWeeklyView()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Smart Features Sidebar */}
          <div className="space-y-6">
            {/* Next Class Countdown */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-6 border-primary/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-2 mb-4">
                <BellRing className="w-5 h-5 text-primary animate-pulse-glow" />
                <h3 className="font-heading font-bold text-lg">Upcoming Class</h3>
              </div>
              {nextClass ? (
                <div className="space-y-4 relative z-10">
                  <div className="text-3xl font-bold text-foreground font-heading tracking-tight">
                    {/* Mock Countdown */}
                    <span className="text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">45</span><span className="text-lg text-muted-foreground ml-1">mins</span>
                  </div>
                  <div className={`p-4 rounded-xl border ${getLevelColor(nextClass.level)}`}>
                    <h4 className="font-bold mb-1">{nextClass.title}</h4>
                    <p className="text-sm opacity-80 mb-3">{format(nextClass.date, 'h:mm a')} with {nextClass.teacher}</p>
                    <Button 
                      className="w-full bg-primary/20 hover:bg-primary text-primary hover:text-white border border-primary/50 transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]" 
                      onClick={() => setSelectedClass(nextClass)}
                    >
                      <Video className="w-4 h-4 mr-2" /> View Details
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No upcoming classes today.</p>
              )}
            </motion.div>

            {/* AI Recommendation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-6 border-indigo-500/30 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 blur-3xl rounded-full" />
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h3 className="font-heading font-bold text-lg">AI Recommendation</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Based on your recent progress in Creativity Lab, we suggest this class:</p>
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                <div className="text-xs text-indigo-300 font-medium mb-1">Recommended for You</div>
                <h4 className="font-bold text-foreground mb-2">Neural Networks 101</h4>
                <Button size="sm" variant="outline" className="w-full border-indigo-500/50 hover:bg-indigo-500/20 text-indigo-300">
                  + Schedule Class
                </Button>
              </div>
            </motion.div>

            {/* Gamification Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-6 border-amber-500/20"
            >
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-amber-500" />
                <h3 className="font-heading font-bold text-lg">Class Rewards</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm">Attendance</span>
                  </div>
                  <span className="text-primary font-bold">+50 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Early Joiner</span>
                  </div>
                  <span className="text-green-400 font-bold">+10 XP</span>
                </div>
                <div className="w-full bg-background rounded-full h-2 mt-4 overflow-hidden border border-border/50">
                  <div className="bg-gradient-to-r from-amber-500 to-primary w-3/4 h-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                </div>
                <p className="text-xs text-center text-muted-foreground mt-2">120 XP to next level</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Class Details / Zoom Popup */}
      <AnimatePresence>
        {selectedClass && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedClass(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-lg glass-panel p-8 border ${getLevelColor(selectedClass.level).split(' ')[1]} shadow-2xl`}
            >
              <button 
                onClick={() => setSelectedClass(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="mb-6">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 border ${getLevelColor(selectedClass.level)}`}>
                  {selectedClass.level} Level
                </div>
                <h2 className="text-3xl font-heading font-bold text-foreground mb-2">{selectedClass.title}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1"><User className="w-4 h-4" /> {selectedClass.teacher}</div>
                  <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedClass.durationMin} mins</div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-foreground">Class Description</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed bg-background/50 p-4 rounded-xl border border-border/50">
                    {selectedClass.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Scheduled Time</div>
                    <div className="font-bold">{format(selectedClass.date, 'EEEE, MMM d • h:mm a')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">Participants</div>
                    <div className="font-bold flex items-center justify-end gap-1"><User className="w-4 h-4 text-primary" /> {selectedClass.participants}/20</div>
                  </div>
                </div>
                
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] py-6 text-lg group"
                    onClick={() => {
                      // Mock Join Zoom Action
                      alert(`Joining Zoom session for ${selectedClass.title}`);
                      setSelectedClass(null);
                    }}
                  >
                    <span className="relative flex items-center">
                      <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse" />
                      Join Live Class
                      <Video className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
