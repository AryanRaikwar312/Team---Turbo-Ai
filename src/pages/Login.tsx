import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    } else {
      toast.success("Successfully logged in!");
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-md space-y-8 glass-panel p-8 md:p-10 rounded-2xl relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-accent/10 blur-2xl pointer-events-none"></div>

        <div className="text-center relative z-10">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
              <span className="text-primary-foreground font-heading font-bold text-2xl">S</span>
            </div>
          </div>
          <h2 className="text-3xl font-heading font-bold text-foreground">Welcome back</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to access your Syraxo Learning dashboard
          </p>
        </div>
        
        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-address">Email address</Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-background/50 border-border focus:bg-background transition-colors"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="bg-background/50 border-border focus:bg-background transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full relative overflow-hidden group"
            size="lg"
            disabled={isLoading}
          >
            <span className="relative z-10">{isLoading ? "Signing in..." : "Sign in"}</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <a href="/enroll" className="font-medium text-primary hover:text-primary/80 transition-colors">
              Enroll now
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
