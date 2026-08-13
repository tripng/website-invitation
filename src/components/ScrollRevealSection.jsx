import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  revealDuration,
  staggerReveal,
  scrollEase,
} from "../constants/animationConfig";

export default function ScrollRevealSection() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-word", {
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
        },
        yPercent: 100,
        opacity: 0,
        duration: revealDuration,
        ease: scrollEase,
        stagger: staggerReveal,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="min-h-screen flex items-center justify-center px-6 bg-cream-deep"
    >
      <p className="font-serif text-ink text-3xl md:text-5xl leading-snug max-w-3xl text-center">
        <span className="reveal-word inline-block">Two</span>{" "}
        <span className="reveal-word inline-block">hearts,</span>{" "}
        <span className="reveal-word inline-block">one</span>{" "}
        <span className="reveal-word inline-block">eternal</span>{" "}
        <span className="reveal-word inline-block">promise.</span>
      </p>
    </section>
  );
}
