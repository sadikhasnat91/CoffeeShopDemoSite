import { useEffect, useRef } from "react";
import gsap from "gsap";
import CoffeeScene from "./CoffeeScene";

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(headingRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(taglineRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .fromTo(btnRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4");
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <CoffeeScene />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/60 via-background/30 to-background" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1
          ref={headingRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight opacity-0"
        >
          <span className="text-gold-gradient">Experience</span>
          <br />
          <span className="text-foreground">the Art of Coffee</span>
        </h1>

        <p
          ref={taglineRef}
          className="mt-6 text-lg md:text-xl text-foreground/60 font-body font-light max-w-xl mx-auto opacity-0"
        >
          Handcrafted beverages, artisanal flavors, and an atmosphere that transcends the ordinary.
        </p>

        <div ref={btnRef} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center opacity-0">
          <a
            href="#menu"
            className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
          >
            View Menu
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full border border-primary/40 text-primary font-body font-medium text-sm tracking-wide hover:bg-primary/10 transition-all duration-300 hover:scale-105"
          >
            Reserve a Table
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
}
