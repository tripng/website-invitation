import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function StickyNavigation() {
  const nav = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const goingDown = self.direction === 1;
          gsap.to(nav.current, {
            yPercent: goingDown ? -120 : 0,
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={nav}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 mix-blend-difference"
    >
      <span className="font-serif text-cream text-lg tracking-wide">
        A&amp;J
      </span>
      <span className="font-sans text-cream text-xs tracking-[0.3em] uppercase">
        12 . 09 . 26
      </span>
    </nav>
  );
}
