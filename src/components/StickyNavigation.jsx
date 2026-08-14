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
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 text-ink mix-blend-difference md:px-12 md:mix-blend-difference"
    >
      <span className="font-serif text-lg tracking-wide text-ink md:text-cream">
        A&amp;J
      </span>
      <span className="font-sans text-xs tracking-[0.3em] uppercase text-ink md:text-cream">
        12 . 09 . 26
      </span>
    </nav>
  );
}
