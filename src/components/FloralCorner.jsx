import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import FloralBloom from "./FloralBloom";
import { floralOpacity, floralEntranceDelay } from "../constants/animationConfig";

export default function FloralCorner({ start }) {
  const topLeft = useRef(null);
  const bottomRight = useRef(null);

  useEffect(() => {
    if (!start) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [topLeft.current, bottomRight.current],
        { opacity: 0, rotation: -25, scale: 0.85 },
        {
          opacity: floralOpacity,
          rotation: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.15,
          delay: floralEntranceDelay,
        }
      );
    });
    return () => ctx.revert();
  }, [start]);

  return (
    <>
      <div
        ref={topLeft}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-4 top-4 z-10 hidden text-white mix-blend-difference md:block"
      >
        <FloralBloom size={140} />
      </div>
      <div
        ref={bottomRight}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none fixed bottom-4 right-4 z-10 hidden -scale-x-100 -scale-y-100 text-white mix-blend-difference md:block"
      >
        <FloralBloom size={140} />
      </div>
    </>
  );
}
