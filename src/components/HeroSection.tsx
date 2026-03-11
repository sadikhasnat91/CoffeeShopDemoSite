import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroBg from "@/assets/hero-coffee.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Image scale-in
    tl.fromTo(imgRef.current, { scale: 1.3 }, { scale: 1, duration: 2, ease: "power2.out" })
      .fromTo(
        overlayRef.current,
        { opacity: 1 },
        { opacity: 0.55, duration: 1.5, ease: "power2.out" },
        0
      )
      // Heading: split word reveal
      .fromTo(
        headingRef.current?.querySelectorAll(".hero-word") || [],
        { y: 80, opacity: 0, rotateX: 40 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.12, ease: "power3.out" },
        0.5
      )
      .fromTo(
        taglineRef.current,
        { y: 30, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        btnRef.current?.children || [],
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" },
        "-=0.3"
      );

    // Parallax on scroll
    gsap.to(imgRef.current, {
      y: 150,
      scale: 1.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  const headingWords = ["Experience", "the", "Art", "of", "Coffee"];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <img
        ref={imgRef}
        src={heroBg}
        alt="Premium coffee experience"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Cinematic overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background"
      />

      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)"
      }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary font-body text-xs tracking-[0.2em] uppercase">
            Est. 2014 · Artisan Coffee
          </span>
        </div>

        <h1
          ref={headingRef}
          className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] perspective-[1000px]"
        >
          {headingWords.map((word, i) => (
            <span
              key={i}
              className={`hero-word inline-block mr-[0.3em] opacity-0 ${
                i === 0 || i === 2 || i === 4 ? "text-gold-gradient" : "text-foreground"
              }`}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          ref={taglineRef}
          className="mt-8 text-lg md:text-xl text-foreground/50 font-body font-light max-w-lg mx-auto leading-relaxed opacity-0"
        >
          Handcrafted beverages, artisanal flavors, and an atmosphere that transcends the ordinary.
        </p>

        <div ref={btnRef} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="group relative px-10 py-4 rounded-full bg-primary text-primary-foreground font-body font-medium text-sm tracking-wider uppercase overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30"
          >
            <span className="relative z-10">Explore Menu</span>
            <div className="absolute inset-0 bg-gold-light scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
          </a>
          <a
            href="#contact"
            className="group px-10 py-4 rounded-full border border-foreground/20 text-foreground/80 font-body font-medium text-sm tracking-wider uppercase transition-all duration-500 hover:border-primary hover:text-primary hover:bg-primary/5"
          >
            Reserve a Table
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 font-body">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
