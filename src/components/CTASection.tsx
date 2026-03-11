import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cafeInterior from "@/assets/cafe-interior.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current.querySelectorAll(".cta-anim"),
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      }
    );

    // Parallax image
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        y: 80,
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        ref={imgRef}
        src={cafeInterior}
        alt="Café interior"
        className="absolute inset-0 w-full h-full object-cover scale-110"
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h2 className="cta-anim font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Your Table <span className="text-gold-gradient">Awaits</span>
        </h2>
        <p className="cta-anim text-foreground/60 font-body text-lg leading-relaxed mb-10">
          Whether it's a quiet morning ritual or an evening celebration, we've saved the perfect seat for you.
        </p>
        <div className="cta-anim flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="group relative px-10 py-4 rounded-full bg-primary text-primary-foreground font-body font-medium text-sm tracking-wider uppercase overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30"
          >
            <span className="relative z-10">Reserve Now</span>
            <div className="absolute inset-0 bg-gold-light scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
          </a>
          <a
            href="#menu"
            className="px-10 py-4 rounded-full border border-foreground/20 text-foreground/80 font-body font-medium text-sm tracking-wider uppercase transition-all duration-500 hover:border-primary hover:text-primary"
          >
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  );
}
