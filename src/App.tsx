import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SakuraPetals from "@/components/SakuraPetals";
import Index from "./pages/Index.tsx";
import Programs from "./pages/Programs.tsx";
import HowItWorks from "./pages/HowItWorks.tsx";
import WhySyraxo from "./pages/WhyAuxra.tsx";
import Enroll from "./pages/Enroll.tsx";
import About from "./pages/About.tsx";
import StudentDashboard from "./pages/StudentDashboard.tsx";
import AISensei from "./pages/AISensei.tsx";
import CreativityLab from "./pages/CreativityLab.tsx";
import ParentDashboard from "./pages/ParentDashboard.tsx";
import LiveClasses from "./pages/LiveClasses.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import MentorGuidance from "./pages/MentorGuidance.tsx";

import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SakuraPetals />
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/why-syraxo" element={<WhySyraxo />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
            <Route path="/ai-sensei" element={<ProtectedRoute><AISensei /></ProtectedRoute>} />
            <Route path="/creativity-lab" element={<ProtectedRoute><CreativityLab /></ProtectedRoute>} />
            <Route path="/parent-dashboard" element={<ProtectedRoute><ParentDashboard /></ProtectedRoute>} />
            <Route path="/live-classes" element={<ProtectedRoute><LiveClasses /></ProtectedRoute>} />
            
            <Route path="/mentor-guidance" element={<MentorGuidance />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
            <Footer />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
