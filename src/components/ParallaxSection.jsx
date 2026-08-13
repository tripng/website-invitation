import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { parallaxDistance } from "../constants/animationConfig";

export default function ParallaxSection() {
  const root = useRef(null);
  const layer = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        layer.current,
        { y: parallaxDistance },
        {
          y: -parallaxDistance,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink"
    >
      <div
        ref={layer}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h2 className="font-serif text-gold text-7xl md:text-9xl opacity-90 whitespace-nowrap">
          Save The Date
        </h2>
      </div>
    </section>
  );
}
