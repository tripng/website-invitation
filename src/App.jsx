import { useState } from "react";
import { useLenisScroll } from "./hooks/useLenisScroll";
import LoaderCurtain from "./components/LoaderCurtain";
import StickyNavigation from "./components/StickyNavigation";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import ScrollRevealSection from "./components/ScrollRevealSection";
import ParallaxSection from "./components/ParallaxSection";
import PreWeddingGallery from "./components/PreWeddingGallery";
import ScrollFollower from "./components/ScrollFollower";
import FloatingNames from "./components/FloatingNames";

export default function App() {
  const [ready, setReady] = useState(false);
  useLenisScroll();

  return (
    <>
      <ScrollFollower />
      <FloatingNames />
      <main>
        <LoaderCurtain onComplete={() => setReady(true)} />
        <StickyNavigation />
        <HeroSection start={ready} />
        <MarqueeSection />
        <ScrollRevealSection />
        <ParallaxSection />
        <PreWeddingGallery />
      </main>
    </>
  );
}
