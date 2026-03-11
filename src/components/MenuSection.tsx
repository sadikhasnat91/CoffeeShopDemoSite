import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = ["Coffee", "Cold Drinks", "Chocolate", "Desserts", "Snacks"] as const;

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  hot?: boolean;
}

const menuData: Record<string, MenuItem[]> = {
  Coffee: [
    { name: "Espresso Royale", desc: "Double shot with golden crema", price: "$4.50", hot: true },
    { name: "Caramel Velvet Latte", desc: "Silky milk with house caramel", price: "$6.00", hot: true },
    { name: "Pour Over Single Origin", desc: "Ethiopian Yirgacheffe beans", price: "$5.50", hot: true },
    { name: "Cappuccino Classico", desc: "Perfect foam, perfect balance", price: "$5.00", hot: true },
  ],
  "Cold Drinks": [
    { name: "Iced Vanilla Cold Brew", desc: "24-hour cold brew, Madagascar vanilla", price: "$5.50" },
    { name: "Matcha Coconut Frost", desc: "Ceremonial matcha, coconut cream", price: "$6.50" },
    { name: "Berry Hibiscus Cooler", desc: "Fresh berries, hibiscus tea", price: "$5.00" },
    { name: "Citrus Mint Refresher", desc: "Lime, orange, fresh mint", price: "$4.50" },
  ],
  Chocolate: [
    { name: "Belgian Hot Chocolate", desc: "Valrhona 70% dark chocolate", price: "$6.00", hot: true },
    { name: "Chocolate Hazelnut Shake", desc: "Gianduja blend, whipped cream", price: "$7.00" },
    { name: "White Mocha Dream", desc: "White chocolate, espresso fusion", price: "$6.50", hot: true },
    { name: "Dark Cocoa Affogato", desc: "Gelato drowned in espresso", price: "$7.50" },
  ],
  Desserts: [
    { name: "Tiramisu", desc: "Classic Italian, mascarpone layers", price: "$8.00" },
    { name: "Crème Brûlée", desc: "Vanilla bean, caramelized sugar", price: "$7.50" },
    { name: "Chocolate Fondant", desc: "Molten center, berry compote", price: "$9.00" },
    { name: "Pistachio Éclair", desc: "Choux pastry, pistachio cream", price: "$6.50" },
  ],
  Snacks: [
    { name: "Artisan Croissant", desc: "French butter, 72-hour lamination", price: "$4.00" },
    { name: "Avocado Toast", desc: "Sourdough, poached egg, chili", price: "$9.50" },
    { name: "Bruschetta Trio", desc: "Tomato, mushroom, goat cheese", price: "$8.50" },
    { name: "Cheese Board", desc: "Curated selection, fig jam", price: "$14.00" },
  ],
};

export default function MenuSection() {
  const [active, setActive] = useState<string>("Coffee");
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelector("h2"),
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll(".menu-card");
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, [active]);

  return (
    <section id="menu" ref={sectionRef} className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
          Our <span className="text-gold-gradient">Menu</span>
        </h2>
        <p className="text-center text-muted-foreground font-body mb-12 max-w-md mx-auto">
          Curated with passion, crafted with precision
        </p>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
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
              className="menu-card glass-card rounded-xl p-5 transition-all duration-300 hover:-translate-y-2 hover:glow-gold group cursor-pointer"
            >
              {/* Steam indicator for hot items */}
              {item.hot && (
                <div className="flex gap-1 mb-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-[2px] h-4 bg-primary/40 rounded-full animate-steam"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                  ))}
                </div>
              )}
              <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground font-body mt-1">{item.desc}</p>
              <p className="mt-3 text-primary font-display font-bold text-lg">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
