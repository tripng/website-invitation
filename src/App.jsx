import { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenisScroll } from "./hooks/useLenisScroll";
import LoaderCurtain from "./components/LoaderCurtain";
import StickyNavigation from "./components/StickyNavigation";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import ScrollRevealSection from "./components/ScrollRevealSection";
import OpeningBlessing from "./components/OpeningBlessing";
import CoupleProfile from "./components/CoupleProfile";
import ParallaxSection from "./components/ParallaxSection";
import PreWeddingGallery from "./components/PreWeddingGallery";

export default function App() {
  const [ready, setReady] = useState(false);
  useLenisScroll();

  useEffect(() => {
    if (ready) ScrollTrigger.refresh();
  }, [ready]);

  return (
    <>
      <main>
        <LoaderCurtain onComplete={() => setReady(true)} />
        <StickyNavigation />
        <HeroSection start={ready} />
        <MarqueeSection />
        <OpeningBlessing />
        <CoupleProfile />
        <ScrollRevealSection />
        <ParallaxSection />
        <PreWeddingGallery />
      </main>
    </>
  );
}
