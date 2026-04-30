import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import SeniBudayaSection from "@/components/sections/seni-budaya-section";
import OlahragaSection from "@/components/sections/olahraga-section";
import CTASection from "@/components/sections/cta-section";
import ScrollToTop from "@/components/shared/scroll-to-top";

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
