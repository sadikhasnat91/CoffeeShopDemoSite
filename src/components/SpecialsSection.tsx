import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const specials = [
  {
    name: "Golden Espresso Martini",
    desc: "Our signature espresso blended with vanilla liqueur and gold leaf garnish",
    price: "$14",
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&q=80",
  },
  {
    name: "Rose Petal Latte",
    desc: "Delicate rose-infused milk with a double espresso base",
    price: "$8",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80",
  },
  {
    name: "Smoked Maple Cold Brew",
    desc: "Cold brew infused with hickory smoke and organic maple syrup",
    price: "$9",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
  },
];

export default function SpecialsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll(".special-card");
    gsap.fromTo(
      cards,
      { x: -60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      }
    );
  }, []);

  return (
    <section id="specials" className="section-padding bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
          Signature <span className="text-gold-gradient">Specials</span>
        </h2>
        <p className="text-center text-muted-foreground font-body mb-12 max-w-md mx-auto">
          Limited edition creations by our master baristas
        </p>

        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {specials.map((item) => (
            <div
              key={item.name}
              className="special-card glass-card rounded-2xl overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground font-display font-bold text-lg px-3 py-1 rounded-full">
                  {item.price}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground font-body mt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
