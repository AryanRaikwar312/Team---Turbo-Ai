import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="relative bg-section-dark border-t border-border overflow-hidden">
    {/* Sakura corner decorations */}
    <div className="absolute top-0 left-0 w-32 h-32 opacity-10 bg-gradient-to-br from-track-pink to-transparent rounded-br-full" />
    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 bg-gradient-to-tl from-track-pink to-transparent rounded-tl-full" />

    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg">S</span>
            </div>
            <span className="font-heading font-bold text-lg text-foreground">Syraxo Learning</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Transforming screen time into skill time through AI education for students aged 7–17.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-foreground mb-4">Programs</h4>
          <ul className="space-y-2">
            <li><Link to="/programs" className="text-sm text-muted-foreground hover:text-primary transition-colors">Junior Innovators</Link></li>
            <li><Link to="/programs" className="text-sm text-muted-foreground hover:text-primary transition-colors">Digital Explorers</Link></li>
            <li><Link to="/programs" className="text-sm text-muted-foreground hover:text-primary transition-colors">Future Leaders</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-foreground mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</Link></li>
            <li><Link to="/why-syraxo" className="text-sm text-muted-foreground hover:text-primary transition-colors">Why Syraxo</Link></li>
            <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/enroll" className="text-sm text-muted-foreground hover:text-primary transition-colors">Enroll</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-foreground mb-4">Contact</h4>
          <ul className="space-y-2">
            <li className="text-sm text-muted-foreground">hello@syraxolearning.com</li>
            <li className="text-sm text-muted-foreground">+91 98765 43210</li>
          </ul>
          <div className="flex gap-3 mt-4">
            {["Instagram", "Twitter", "YouTube"].map((s) => (
              <span key={s} className="text-xs text-muted-foreground hover:text-primary cursor-pointer transition-colors">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-12 pt-8 text-center">
        <p className="text-sm text-muted-foreground">© 2025 Syraxo Learning. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
