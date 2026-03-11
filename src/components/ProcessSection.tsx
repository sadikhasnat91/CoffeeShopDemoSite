import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import latteArt from "@/assets/latte-art.jpg";
import baristaPour from "@/assets/barista-pour.jpg";
import coffeeBeans from "@/assets/coffee-beans.jpg";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Source",
    desc: "We travel to the finest single-origin farms in Ethiopia, Colombia, and Guatemala to hand-select our beans at peak ripeness.",
    image: coffeeBeans,
  },
  {
    num: "02",
    title: "Roast",
    desc: "Small-batch roasting in our copper drum roasters, developed over 12 years to unlock every note and nuance.",
    image: latteArt,
  },
  {
    num: "03",
    title: "Craft",
    desc: "Our baristas train for 6 months before their first pour. Each cup is a performance, a ritual, a work of art.",
    image: baristaPour,
  },
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(".process-item");
    items.forEach((item, i) => {
      const direction = i % 2 === 0 ? -80 : 80;
      gsap.fromTo(
        item,
        { x: direction, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 50%",
            scrub: false,
          },
        }
      );
    });
  }, []);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block" />

      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
          From Bean to <span className="text-gold-gradient">Cup</span>
        </h2>
        <p className="text-center text-muted-foreground font-body mb-20 max-w-md mx-auto">
          A journey of precision at every step
        </p>

        <div ref={ref} className="space-y-24 md:space-y-32">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`process-item flex flex-col ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-10 md:gap-16`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 relative group">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-[350px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Number overlay */}
                <span className="absolute -top-6 -left-4 md:-left-8 font-display text-8xl md:text-9xl font-bold text-primary/10 select-none">
                  {step.num}
                </span>
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2">
                <span className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3 block">
                  Step {step.num}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-foreground/60 font-body leading-relaxed text-lg">
                  {step.desc}
                </p>
                <div className="mt-6 w-16 h-px bg-primary/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
