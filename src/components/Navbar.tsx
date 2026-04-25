import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Programs", path: "/programs" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Why Us", path: "/why-syraxo" },
  {
    label: "Platform",
    requiresAuth: true,
    children: [
      { label: "🥷 Student Dashboard", path: "/dashboard" },
      { label: "🥋 AI Sensei", path: "/ai-sensei" },
      { label: "🎨 Creativity Lab", path: "/creativity-lab" },
      { label: "📆 Live Classes", path: "/live-classes" },
      { label: "👨‍👩‍👧 Parent Dashboard", path: "/parent-dashboard" },
    ],
  },
  { label: "Mentor Guidance", path: "/mentor-guidance", requiresAuth: false },
  { label: "About", path: "/about" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  
  const visibleLinks = navLinks.filter(link => !link.requiresAuth || isAuthenticated);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    setOpen(false);
    setPlatformOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "glass-nav-solid" : "glass-nav"}`}>
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-lg">S</span>
          </div>
          <span className="font-heading font-bold text-lg text-foreground">Syraxo Learning</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {visibleLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group">
                <button
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setPlatformOpen(!platformOpen)}
                >
                  {link.label}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="glass-panel border border-border rounded-xl p-2 min-w-[200px] shadow-xl">
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-muted ${
                          location.pathname === child.path ? "text-primary bg-muted" : "text-muted-foreground"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path!}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                  location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:block">
          {isAuthenticated ? (
            <Button variant="hero" size="lg" onClick={() => { logout(); navigate('/'); }}>
              Log Out
            </Button>
          ) : (
            <div className="flex gap-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button variant="hero" size="lg" asChild>
                <Link to="/enroll">Enroll Now</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-nav-solid border-t border-border">
          <div className="flex flex-col p-4 gap-1">
            {visibleLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    onClick={() => setPlatformOpen(!platformOpen)}
                    className="flex items-center justify-between w-full text-sm font-medium py-2 text-muted-foreground"
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${platformOpen ? "rotate-180" : ""}`} />
                  </button>
                  {platformOpen && (
                    <div className="pl-4 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block text-sm font-medium py-2 transition-colors ${
                            location.pathname === child.path ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path!}
                  className={`text-sm font-medium py-2 transition-colors ${
                    location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            {isAuthenticated ? (
              <Button variant="hero" size="lg" onClick={() => { logout(); navigate('/'); setOpen(false); }} className="mt-2">
                Log Out
              </Button>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/login" onClick={() => setOpen(false)}>Log In</Link>
                </Button>
                <Button variant="hero" size="lg" asChild>
                  <Link to="/enroll" onClick={() => setOpen(false)}>Enroll Now</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
