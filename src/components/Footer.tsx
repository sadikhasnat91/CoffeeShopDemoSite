import { Coffee, MapPin, Clock, Phone, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="section-padding bg-secondary/20 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="w-6 h-6 text-primary" />
              <span className="font-display text-xl font-bold text-gold-gradient">S&Z Cafe</span>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              Where every cup is a masterpiece and every moment feels golden.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Contact</h3>
            <div className="space-y-3 font-body text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 234-5678</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Golden Ave, NYC</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Hours</h3>
            <div className="space-y-2 font-body text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Mon–Fri: 7am – 10pm</span>
              </div>
              <p className="pl-6">Sat–Sun: 8am – 11pm</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2 font-body text-sm">
              {["Menu", "Specials", "Gallery", "About"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-6 text-center">
          <p className="text-xs text-muted-foreground font-body">
            © 2026 S&Z Cafe. All rights reserved. Crafted with passion.
          </p>
        </div>
      </div>
    </footer>
  );
}
