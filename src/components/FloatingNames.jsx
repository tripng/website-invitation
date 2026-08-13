import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { floatingNamesDuration, floatingNamesEase } from "../constants/animationConfig";

gsap.registerPlugin(ScrollTrigger);

export default function FloatingNames() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    const hero = document.querySelector("#hero");
    gsap.set(el, { opacity: 0, yPercent: 40 });

    const st = ScrollTrigger.create({
      trigger: hero,
      start: "bottom top",
      onEnter: () =>
        gsap.to(el, {
          opacity: 1,
          yPercent: 0,
          duration: floatingNamesDuration,
          ease: floatingNamesEase,
        }),
      onLeaveBack: () =>
        gsap.to(el, {
          opacity: 0,
          yPercent: 40,
          duration: floatingNamesDuration,
          ease: floatingNamesEase,
        }),
    });

    return () => st.kill();
  }, []);

  return createPortal(
    <div
      ref={root}
      aria-hidden="true"
      style={{ opacity: 0, zIndex: 9999 }}
      className="pointer-events-none fixed bottom-5 left-1/2 -translate-x-1/2 font-serif text-gold text-sm md:text-base tracking-[0.35em] uppercase"
    >
      Amelia &amp; Jonathan
    </div>,
    document.body
  );
}
