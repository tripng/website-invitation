import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { loaderDuration, curtainDuration, scrollEase } from "../constants/animationConfig";

export default function LoaderCurtain({ onComplete }) {
  const root = useRef(null);
  const counter = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const count = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => onCompleteRef.current?.(),
      });

      tl.to(count, {
        value: 100,
        duration: loaderDuration,
        ease: "power1.inOut",
        onUpdate: () => {
          counter.current.textContent = `${Math.round(count.value)}`;
        },
      })
        .to(".loader-label", {
          yPercent: -120,
          opacity: 0,
          duration: 0.6,
          ease: scrollEase,
        })
        .to(root.current, {
          yPercent: -100,
          duration: curtainDuration,
          ease: scrollEase,
        });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink"
    >
      <span className="loader-label font-serif text-gold text-2xl tracking-[0.5em] uppercase">
        Amelia &amp; Jonathan
      </span>
      <span
        ref={counter}
        className="mt-6 font-sans text-cream text-7xl md:text-9xl tabular-nums"
      >
        0
      </span>
    </div>
  );
}
