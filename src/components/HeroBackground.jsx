import { useEffect, useRef } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min.js";

export default function HeroBackground() {
  const el = useRef(null);
  const effect = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (reduce || isMobile || !el.current) return;

    try {
      effect.current = FOG({
        el: el.current,
        THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        highlightColor: 0xd4af37,
        midtoneColor: 0xc9a24b,
        lowlightColor: 0xb8935a,
        baseColor: 0xf3ead7,
        blurFactor: 0.6,
        speed: 0.7,
        zoom: 0.9,
      });
    } catch {
      effect.current = null;
    }

    return () => effect.current && effect.current.destroy();
  }, []);

  return (
    <div
      ref={el}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-30"
    />
  );
}
