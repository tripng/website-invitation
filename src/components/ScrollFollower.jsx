import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloralBloom from "./FloralBloom";
import { followerSpin, followerOpacity } from "../constants/animationConfig";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFollower() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.current,
        { yPercent: 0, rotation: 0, opacity: 0 },
        {
          yPercent: 86,
          rotation: followerSpin,
          opacity: followerOpacity,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed right-6 bottom-6 z-0 hidden md:block mix-blend-multiply"
      style={{ opacity: 0 }}
    >
      <FloralBloom size={120} />
    </div>
  );
}
