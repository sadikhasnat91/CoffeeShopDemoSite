import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dessertImg from "@/assets/dessert.jpg";
import latteImg from "@/assets/latte-art.jpg";
import baristaImg from "@/assets/barista-pour.jpg";
import beansImg from "@/assets/coffee-beans.jpg";

gsap.registerPlugin(ScrollTrigger);

const categories = ["Coffee", "Cold Drinks", "Chocolate", "Desserts", "Snacks"] as const;

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  image?: string;
  hot?: boolean;
}

const menuData: Record<string, MenuItem[]> = {
  Coffee: [
    { name: "Espresso Royale", desc: "Double shot with golden crema", price: "$4.50", hot: true, image: latteImg },
    { name: "Caramel Velvet Latte", desc: "Silky milk with house caramel", price: "$6.00", hot: true, image: baristaImg },
    { name: "Pour Over Single Origin", desc: "Ethiopian Yirgacheffe beans", price: "$5.50", hot: true, image: beansImg },
    { name: "Cappuccino Classico", desc: "Perfect foam, perfect balance", price: "$5.00", hot: true, image: latteImg },
  ],
  "Cold Drinks": [
    { name: "Iced Vanilla Cold Brew", desc: "24-hour cold brew, Madagascar vanilla", price: "$5.50", image: baristaImg },
    { name: "Matcha Coconut Frost", desc: "Ceremonial matcha, coconut cream", price: "$6.50", image: latteImg },
    { name: "Berry Hibiscus Cooler", desc: "Fresh berries, hibiscus tea", price: "$5.00", image: beansImg },
    { name: "Citrus Mint Refresher", desc: "Lime, orange, fresh mint", price: "$4.50", image: latteImg },
  ],
  Chocolate: [
    { name: "Belgian Hot Chocolate", desc: "Valrhona 70% dark chocolate", price: "$6.00", hot: true, image: dessertImg },
    { name: "Chocolate Hazelnut Shake", desc: "Gianduja blend, whipped cream", price: "$7.00", image: dessertImg },
    { name: "White Mocha Dream", desc: "White chocolate, espresso fusion", price: "$6.50", hot: true, image: latteImg },
    { name: "Dark Cocoa Affogato", desc: "Gelato drowned in espresso", price: "$7.50", image: dessertImg },
  ],
  Desserts: [
    { name: "Tiramisu", desc: "Classic Italian, mascarpone layers", price: "$8.00", image: dessertImg },
    { name: "Crème Brûlée", desc: "Vanilla bean, caramelized sugar", price: "$7.50", image: dessertImg },
    { name: "Chocolate Fondant", desc: "Molten center, berry compote", price: "$9.00", image: dessertImg },
    { name: "Pistachio Éclair", desc: "Choux pastry, pistachio cream", price: "$6.50", image: dessertImg },
  ],
  Snacks: [
    { name: "Artisan Croissant", desc: "French butter, 72-hour lamination", price: "$4.00", image: baristaImg },
    { name: "Avocado Toast", desc: "Sourdough, poached egg, chili", price: "$9.50", image: latteImg },
    { name: "Bruschetta Trio", desc: "Tomato, mushroom, goat cheese", price: "$8.50", image: beansImg },
    { name: "Cheese Board", desc: "Curated selection, fig jam", price: "$14.00", image: dessertImg },
  ],
};

export default function MenuSection() {
  const [active, setActive] = useState<string>("Coffee");
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll(".menu-header-anim");
    gsap.fromTo(
      els,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll(".menu-card");
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
    );
  }, [active]);

  return (
    <section id="menu" ref={sectionRef} className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="menu-header-anim font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
          Our <span className="text-gold-gradient">Menu</span>
        </h2>
        <p className="menu-header-anim text-center text-muted-foreground font-body mb-14 max-w-md mx-auto">
          Curated with passion, crafted with precision
        </p>

        {/* Category tabs */}
        <div className="menu-header-anim flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-body font-medium transition-all duration-400 ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                  : "bg-secondary/60 text-secondary-foreground hover:bg-secondary hover:scale-105"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {menuData[active]?.map((item) => (
            <div
              key={item.name}
              className="menu-card glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:glow-gold group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                {/* Price badge */}
                <span className="absolute bottom-3 right-3 bg-primary text-primary-foreground font-display font-bold text-sm px-3 py-1 rounded-full shadow-lg">
                  {item.price}
                </span>
                {/* Steam for hot */}
                {item.hot && (
                  <div className="absolute top-3 left-3 flex gap-1">
                    {[0, 1, 2].map((j) => (
                      <div
                        key={j}
                        className="w-[2px] h-5 bg-foreground/40 rounded-full animate-steam"
                        style={{ animationDelay: `${j * 0.3}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground font-body mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
