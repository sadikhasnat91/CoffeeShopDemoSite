import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(".about-anim");
    gsap.fromTo(
      els,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      }
    );
  }, []);

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Floating beans background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-primary/10 animate-float"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>

      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="about-anim font-display text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-gold-gradient">Story</span>
          </h2>
          <p className="about-anim text-foreground/70 font-body leading-relaxed mb-4">
            Born from a love of craft and culture, Aurum Café began as a vision to create more than just a coffee shop — a sanctuary where every sip tells a story, and every visit becomes a memory.
          </p>
          <p className="about-anim text-foreground/70 font-body leading-relaxed mb-6">
            We source our beans from the finest single-origin farms, roast them in small batches, and serve each cup with the precision of artisans. Our pastry chefs create daily using organic, locally-sourced ingredients.
          </p>
          <div className="about-anim flex gap-8">
            {[
              { num: "12+", label: "Years" },
              { num: "50K", label: "Cups Daily" },
              { num: "25", label: "Origins" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-display font-bold text-primary">{stat.num}</p>
                <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-anim relative">
          <div className="rounded-2xl overflow-hidden glow-gold">
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80"
              alt="Coffee beans being roasted"
              className="w-full h-[400px] object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-4">
            <p className="font-display text-sm text-primary font-semibold">Est. 2014</p>
            <p className="text-xs text-muted-foreground font-body">Crafting excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
}
