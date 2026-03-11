import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80", alt: "Latte art", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80", alt: "Coffee beans", span: "" },
  { src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80", alt: "Café interior", span: "" },
  { src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&q=80", alt: "Espresso pour", span: "" },
  { src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=400&q=80", alt: "Pastries", span: "" },
  { src: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&q=80", alt: "Brewing", span: "col-span-2" },
];

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const imgs = ref.current.querySelectorAll(".gallery-item");
    gsap.fromTo(
      imgs,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section id="gallery" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
          The <span className="text-gold-gradient">Gallery</span>
        </h2>
        <p className="text-center text-muted-foreground font-body mb-12 max-w-md mx-auto">
          Moments captured in every cup
        </p>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`gallery-item ${img.span} relative overflow-hidden rounded-xl group cursor-pointer`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover min-h-[200px] transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-500 flex items-end p-4">
                <span className="text-foreground font-body text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
