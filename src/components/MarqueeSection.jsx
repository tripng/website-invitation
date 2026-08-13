import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { marqueeDuration } from "../constants/animationConfig";

const phrases = [
  "Amelia & Jonathan",
  "Save The Date",
  "12 September 2026",
  "Bali, Indonesia",
];

export default function MarqueeSection() {
  const track = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(track.current, {
        xPercent: -50,
        duration: marqueeDuration,
        ease: "none",
        repeat: -1,
      });
    }, track);
    return () => ctx.revert();
  }, []);

  const items = [...phrases, ...phrases];

  return (
    <section className="overflow-hidden border-y border-ink/10 bg-cream-deep py-6">
      <div ref={track} className="flex w-max gap-12 whitespace-nowrap">
        {items.map((text, i) => (
          <span
            key={i}
            className="font-serif text-ink text-4xl md:text-6xl tracking-wide"
          >
            {text}
            <span className="ml-12 text-gold">&bull;</span>
          </span>
        ))}
      </div>
    </section>
  );
}
