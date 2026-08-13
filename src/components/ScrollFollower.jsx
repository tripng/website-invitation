import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" r="52" stroke="var(--color-gold)" strokeWidth="1" />
        <circle cx="60" cy="60" r="40" stroke="var(--color-gold)" strokeWidth="0.5" />
        <path
          d="M44 44 L44 76 M44 60 L56 60 M76 44 L76 76 M76 60 L64 60"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M44 44 Q60 30 76 44"
          stroke="var(--color-gold)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M44 76 Q60 90 76 76"
          stroke="var(--color-gold)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
