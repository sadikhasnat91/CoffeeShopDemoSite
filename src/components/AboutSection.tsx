import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import beansImg from "@/assets/coffee-beans.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(".about-anim");
    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        }
      );
    });

    // Image parallax
    if (imgRef.current) {
      gsap.to(imgRef.current.querySelector("img"), {
        y: -40,
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/5 animate-float"
            style={{
              width: `${8 + i * 4}px`,
              height: `${8 + i * 4}px`,
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${5 + i}s`,
            }}
          />
        ))}
      </div>

      <div ref={ref} className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <span className="about-anim block text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            Our Heritage
          </span>
          <h2 className="about-anim font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            A Story Brewed <br/>
            <span className="text-gold-gradient">in Gold</span>
          </h2>
          <p className="about-anim text-foreground/60 font-body leading-relaxed mb-5 text-lg">
            Born from a love of craft and culture, Aurum Café began as a vision to create more than just a coffee shop — a sanctuary where every sip tells a story, and every visit becomes a memory.
          </p>
          <p className="about-anim text-foreground/60 font-body leading-relaxed mb-8">
            We source our beans from the finest single-origin farms, roast them in small batches, and serve each cup with the precision of artisans. Our pastry chefs create daily using organic, locally-sourced ingredients.
          </p>

          {/* Stats */}
          <div className="about-anim grid grid-cols-3 gap-6">
            {[
              { num: "12+", label: "Years of Craft" },
              { num: "50K", label: "Cups Daily" },
              { num: "25", label: "Bean Origins" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="text-3xl md:text-4xl font-display font-bold text-primary">{stat.num}</p>
                <p className="text-xs text-muted-foreground font-body mt-1 tracking-wider uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={imgRef} className="about-anim relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
            <img
              src={beansImg}
              alt="Coffee beans being roasted"
              className="w-full h-[500px] object-cover"
              loading="lazy"
            />
          </div>
          {/* Floating card */}
          <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-5 glow-gold">
            <p className="font-display text-lg text-primary font-bold">Est. 2014</p>
            <p className="text-xs text-muted-foreground font-body mt-0.5">Crafting excellence, one cup at a time</p>
          </div>
          {/* Decorative ring */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border-2 border-primary/10 hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
