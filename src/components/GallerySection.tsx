import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import latteImg from "@/assets/latte-art.jpg";
import baristaImg from "@/assets/barista-pour.jpg";
import beansImg from "@/assets/coffee-beans.jpg";
import dessertImg from "@/assets/dessert.jpg";
import cafeImg from "@/assets/cafe-interior.jpg";
import heroImg from "@/assets/hero-coffee.jpg";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: latteImg, alt: "Latte Art Mastery", span: "col-span-2 row-span-2" },
  { src: beansImg, alt: "Single Origin Beans", span: "" },
  { src: cafeImg, alt: "Our Space", span: "" },
  { src: baristaImg, alt: "Barista at Work", span: "" },
  { src: dessertImg, alt: "Artisan Desserts", span: "" },
  { src: heroImg, alt: "The Perfect Cup", span: "col-span-2" },
];

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const imgs = ref.current.querySelectorAll(".gallery-item");
    imgs.forEach((img, i) => {
      gsap.fromTo(
        img,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
          },
        }
      );
    });
  }, []);

  return (
    <section id="gallery" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
          The <span className="text-gold-gradient">Gallery</span>
        </h2>
        <p className="text-center text-muted-foreground font-body mb-16 max-w-md mx-auto">
          Moments captured in every cup
        </p>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`gallery-item ${img.span} relative overflow-hidden rounded-2xl group cursor-pointer`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover min-h-[200px] transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-foreground font-display text-lg font-semibold drop-shadow-lg">
                    {img.alt}
                  </span>
                  <div className="w-8 h-px bg-primary mx-auto mt-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
