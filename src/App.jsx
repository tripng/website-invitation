import { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenisScroll } from "./hooks/useLenisScroll";
import LoaderCurtain from "./components/LoaderCurtain";
import StickyNavigation from "./components/StickyNavigation";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import OpeningBlessing from "./components/OpeningBlessing";
import CoupleProfile from "./components/CoupleProfile";
import EventDetails from "./components/EventDetails";
import LoveStory from "./components/LoveStory";
import PreWeddingGallery from "./components/PreWeddingGallery";
import EventGuidelines from "./components/EventGuidelines";
import WeddingGift from "./components/WeddingGift";

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
        <EventDetails />
        <LoveStory />
        <PreWeddingGallery />
        <EventGuidelines />
        <WeddingGift />
      </main>
    </>
  );
}
