import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "The moment you walk in, you know this isn't just coffee — it's an experience. The Golden Espresso Martini changed my life.",
    author: "Elena V.",
    role: "Food Critic, NYC Times",
    stars: 5,
  },
  {
    text: "I've traveled to 40+ countries for coffee. S&Z Cafe is the only café that made me stop searching. Their pour-over is transcendent.",
    author: "James K.",
    role: "Travel Journalist",
    stars: 5,
  },
  {
    text: "We held our anniversary here. The ambiance, the aroma, the desserts — every detail was beyond perfect. A masterpiece of a café.",
    author: "Sarah & Michael",
    role: "Regular Guests",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll(".testimonial-card");
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0, rotateY: 15 },
      {
        y: 0, opacity: 1, rotateY: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section className="section-padding bg-secondary/20 relative overflow-hidden">
      {/* Decorative quote marks */}
      <div className="absolute top-16 left-10 font-display text-[200px] leading-none text-primary/5 select-none hidden lg:block">
        "
      </div>

      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
          What They <span className="text-gold-gradient">Say</span>
        </h2>
        <p className="text-center text-muted-foreground font-body mb-16 max-w-md mx-auto">
          Words from those who've tasted the difference
        </p>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card glass-card rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:glow-gold group relative"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(t.stars)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground/70 font-body leading-relaxed text-[15px] italic mb-6">
                "{t.text}"
              </p>

              <div className="border-t border-border/30 pt-4">
                <p className="font-display font-semibold text-foreground">{t.author}</p>
                <p className="text-xs text-muted-foreground font-body mt-0.5">{t.role}</p>
              </div>

              {/* Hover accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-700 rounded-t-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
