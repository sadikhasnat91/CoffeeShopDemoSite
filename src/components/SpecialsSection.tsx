import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dessertImg from "@/assets/dessert.jpg";
import latteImg from "@/assets/latte-art.jpg";
import baristaImg from "@/assets/barista-pour.jpg";

gsap.registerPlugin(ScrollTrigger);

const specials = [
  {
    name: "Golden Espresso Martini",
    desc: "Our signature espresso blended with vanilla liqueur and gold leaf garnish",
    price: "$14",
    image: baristaImg,
    tag: "Signature",
  },
  {
    name: "Rose Petal Latte",
    desc: "Delicate rose-infused milk with a double espresso base",
    price: "$8",
    image: latteImg,
    tag: "Popular",
  },
  {
    name: "Dark Velvet Fondant",
    desc: "Molten chocolate cake with espresso ice cream and gold dust",
    price: "$12",
    image: dessertImg,
    tag: "Chef's Pick",
  },
];

export default function SpecialsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll(".special-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0, rotate: i % 2 === 0 ? -2 : 2 },
        {
          y: 0, opacity: 1, rotate: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        }
      );
    });
  }, []);

  return (
    <section id="specials" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
          Signature <span className="text-gold-gradient">Specials</span>
        </h2>
        <p className="text-center text-muted-foreground font-body mb-16 max-w-md mx-auto">
          Limited edition creations by our master artisans
        </p>

        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {specials.map((item) => (
            <div
              key={item.name}
              className="special-card group cursor-pointer"
            >
              <div className="glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:glow-gold">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                  {/* Tag */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-body font-medium tracking-wider uppercase">
                    {item.tag}
                  </span>

                  {/* Price */}
                  <span className="absolute bottom-4 right-4 font-display text-3xl font-bold text-primary drop-shadow-lg">
                    {item.price}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body mt-2 leading-relaxed">{item.desc}</p>
                  
                  {/* Order button */}
                  <button className="mt-4 text-primary font-body text-sm font-medium tracking-wider uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Order Now →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
