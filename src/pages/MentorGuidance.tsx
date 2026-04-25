import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, MessageSquare, Calendar, Video, Phone, Filter, ChevronLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Mentor Data
const MENTORS = [
  {
    id: "1",
    name: "Aryan Sharma",
    role: "Senior AI Engineer",
    experience: "5+ years",
    price: "$50",
    rating: 4.9,
    reviews: 120,
    tags: ["AI", "Career Guidance", "Job Switching"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Passionate about building AI products that scale. I've helped over 50+ students land their first tech jobs and guided professionals in switching to AI roles."
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Frontend Lead @ Amazon",
    experience: "8+ years",
    price: "$45",
    rating: 4.8,
    reviews: 95,
    tags: ["Frontend", "React", "Tech Interviews"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Frontend specialist with a focus on web performance. I mentor aspiring developers to pass top tech company interviews."
  },
  {
    id: "3",
    name: "Michael Ross",
    role: "Product Manager @ Microsoft",
    experience: "4+ years",
    price: "$40",
    rating: 4.7,
    reviews: 64,
    tags: ["Product", "Strategy", "College Advice"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Transitioned from engineering to product. I help students structure their career roadmap and land PM roles."
  },
  {
    id: "4",
    name: "Priya Patel",
    role: "Data Scientist @ Netflix",
    experience: "3+ years",
    price: "$35",
    rating: 4.9,
    reviews: 82,
    tags: ["Data Science", "Python", "Freelancing"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Data enthusiast who loves to teach. I guide students through data projects and starting a successful freelance career."
  },
  {
    id: "5",
    name: "David Kim",
    role: "Cybersecurity Analyst",
    experience: "6+ years",
    price: "$55",
    rating: 4.6,
    reviews: 40,
    tags: ["Security", "Tech", "Career Guidance"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Protecting systems is my day job, mentoring is my passion. Get certified and break into cybersecurity."
  },
  {
    id: "6",
    name: "Elena Rodriguez",
    role: "UX Researcher @ Apple",
    experience: "7+ years",
    price: "$60",
    rating: 5.0,
    reviews: 150,
    tags: ["Design", "UX", "Portfolio Review"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Design is about people. Let me review your portfolio and help you craft case studies that land jobs."
  }
];

const CATEGORIES = ["All", "Career Guidance", "AI / Tech", "College Advice", "Job Switching", "Freelancing", "Design"];

export default function MentorGuidance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMentor, setSelectedMentor] = useState<typeof MENTORS[0] | null>(null);
  
  // Booking State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [sessionType, setSessionType] = useState<"video" | "audio">("video");
  const [bookingStep, setBookingStep] = useState<"form" | "success">("form");

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isBookingModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isBookingModalOpen]);

  const filteredMentors = MENTORS.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mentor.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || mentor.tags.some(tag => tag.includes(selectedCategory) || selectedCategory.includes(tag));
    return matchesSearch && matchesCategory;
  });

  const handleOpenModal = (mentor: typeof MENTORS[0]) => {
    setSelectedMentor(mentor);
    setBookingStep("form");
    setBookingDate("");
    setBookingTime("");
    setSessionType("video");
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) return;
    setBookingStep("success");
  };

  return (
    <div className="min-h-screen pt-20 pb-12 overflow-hidden bg-[#0A0A10]">
      {/* 1. HERO SECTION */}
      <div className="relative py-24 px-4 flex items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-background to-background" />
        <div className="absolute top-[0%] left-[10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[0%] left-[30%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container relative z-10 mx-auto max-w-4xl text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold font-heading leading-tight"
          >
            Talk to a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-[0_0_15px_rgba(216,180,254,0.3)]">Mentor</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Get personalized guidance for your career, skills, and future from industry experts.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="pt-6"
          >
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-[0_0_20px_rgba(192,132,252,0.4)] px-8 py-6 text-lg rounded-full" onClick={() => document.getElementById('search-filter')?.scrollIntoView({ behavior: 'smooth' })}>
              <Search className="w-5 h-5 mr-2" /> Explore Mentors
            </Button>
          </motion.div>
        </div>
      </div>

      {/* 2. SEARCH + FILTER SECTION */}
      <div id="search-filter" className="container mx-auto max-w-7xl px-4 py-8 relative z-10">
        <div className="glass-panel p-4 md:p-6 mb-10 flex flex-col md:flex-row gap-4 border-purple-500/20 bg-background/40 backdrop-blur-xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search mentors by skill, career, or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-full py-3.5 pl-12 pr-4 text-foreground focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <Filter className="w-5 h-5 text-muted-foreground shrink-0 hidden lg:block mr-2" />
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category 
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_10px_rgba(192,132,252,0.3)] border-transparent" 
                  : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 3. MENTOR LIST (CORE SECTION) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMentors.map((mentor, idx) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-panel group relative overflow-hidden border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(192,132,252,0.15)] flex flex-col h-full bg-white/[0.02] hover:-translate-y-1 rounded-3xl"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-500/10 to-transparent" />
              
              <div className="p-6 flex-1 flex flex-col relative z-10">
                {/* Top: Profile */}
                <div className="flex items-start gap-4 mb-5">
                  <img 
                    src={mentor.image} 
                    alt={mentor.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30"
                  />
                  <div>
                    <h3 className="text-lg font-heading font-bold text-white">{mentor.name}</h3>
                    <p className="text-purple-300 text-sm">{mentor.role}</p>
                  </div>
                </div>
                
                {/* Middle: Details */}
                <div className="text-sm text-muted-foreground mb-4">
                  Experience: <span className="text-white font-medium">{mentor.experience}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {mentor.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom: Rating & Price */}
                <div className="flex items-center justify-between mb-6 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-white text-sm">{mentor.rating}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-white">{mentor.price}</span>
                    <span className="text-muted-foreground text-xs font-normal">/session</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-[1fr_auto] gap-3">
                  <Button onClick={() => handleOpenModal(mentor)} className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] rounded-xl py-5 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all">
                    <Calendar className="w-4 h-4 mr-2" /> Book Call
                  </Button>
                  <Button variant="outline" size="icon" className="w-12 h-full bg-white/5 border-white/10 hover:bg-white/10 hover:text-white rounded-xl">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredMentors.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6 border border-white/10">
              <Search className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No mentors found</h3>
            <p>Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>

      {/* 4. BOOKING MODAL */}
      <AnimatePresence>
        {isBookingModalOpen && selectedMentor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg glass-panel bg-[#11111A]/95 border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-start relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[40px] pointer-events-none" />
                <div className="flex items-center gap-4 relative z-10">
                  <img src={selectedMentor.image} alt={selectedMentor.name} className="w-14 h-14 rounded-full object-cover border-2 border-purple-500/30" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedMentor.name}</h3>
                    <p className="text-purple-300 text-sm">{selectedMentor.role}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsBookingModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors relative z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>

              {bookingStep === "form" ? (
                <div className="p-6">
                  <p className="text-sm text-gray-400 mb-6 line-clamp-2">{selectedMentor.bio}</p>
                  
                  <form onSubmit={handleConfirmBooking} className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-400" /> Select Date
                      </label>
                      <input 
                        type="date" 
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-400" /> Select Time
                      </label>
                      <input 
                        type="time" 
                        required
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 [color-scheme:dark]"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">Session Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setSessionType("video")}
                          className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                            sessionType === "video" 
                            ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
                            : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                          }`}
                        >
                          <Video className="w-4 h-4" /> Video Call
                        </button>
                        <button
                          type="button"
                          onClick={() => setSessionType("audio")}
                          className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                            sessionType === "audio" 
                            ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
                            : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                          }`}
                        >
                          <Phone className="w-4 h-4" /> Audio Call
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Total Price</p>
                        <p className="text-xl font-bold text-white">{selectedMentor.price}</p>
                      </div>
                      <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                        Confirm Booking
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                /* 5. POST-BOOKING UI */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Booked Successfully!</h2>
                    <p className="text-gray-400">Your session with {selectedMentor.name} is confirmed.</p>
                  </div>

                  <div className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-left space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar className="w-5 h-5 text-purple-400 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Date</p>
                        <p className="font-medium text-white">{new Date(bookingDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Clock className="w-5 h-5 text-purple-400 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Time</p>
                        <p className="font-medium text-white">{bookingTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      {sessionType === "video" ? <Video className="w-5 h-5 text-purple-400 shrink-0" /> : <Phone className="w-5 h-5 text-purple-400 shrink-0" />}
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Type</p>
                        <p className="font-medium text-white capitalize">{sessionType} Call</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full space-y-3 pt-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                      <Video className="w-4 h-4 mr-2" /> Join Call
                    </Button>
                    <Button variant="outline" className="w-full border-white/10 hover:bg-white/10 text-white py-6 rounded-xl" onClick={() => setIsBookingModalOpen(false)}>
                      Back to Mentors
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
