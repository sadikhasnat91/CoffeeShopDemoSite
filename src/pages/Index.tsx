import { useState, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import MenuSection from "@/components/MenuSection";
import SpecialsSection from "@/components/SpecialsSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Index() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoaded} />}
      <Navbar />
      <main>
        <HeroSection />
        <ProcessSection />
        <MenuSection />
        <SpecialsSection />
        <GallerySection />
        <TestimonialsSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
