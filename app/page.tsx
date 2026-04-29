import Navbar from "@/app/_components/layout/Navbar";
import Footer from "@/app/_components/layout/Footer";
import HeroSection from "@/app/_components/sections/HeroSection";
import AboutSection from "@/app/_components/sections/AboutSection";
import SeniBudayaSection from "@/app/_components/sections/SeniBudayaSection";
import OlahragaSection from "@/app/_components/sections/OlahragaSection";
import CTASection from "@/app/_components/sections/CTASection";
import ScrollToTop from "@/app/_components/shared/ScrollToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <SeniBudayaSection />
        <div className="section-divider" />
        <OlahragaSection />
        <div className="section-divider" />
        <CTASection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
