import { useEffect, useRef } from "react";
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

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed bottom-5 left-1/2 z-30 -translate-x-1/2 font-serif text-ink text-sm md:text-base tracking-[0.35em] uppercase"
      style={{ opacity: 0 }}
    >
      Amelia &amp; Jonathan
    </div>
  );
}
