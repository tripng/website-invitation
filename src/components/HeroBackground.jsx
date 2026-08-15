import { useEffect, useRef } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";

export default function HeroBackground() {
  const el = useRef(null);
  const effect = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !el.current) return;

    effect.current = FOG({
      el: el.current,
      THREE,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      highlightColor: 0xc9a24b,
      midtoneColor: 0xe8dcc3,
      lowlightColor: 0xf3ead7,
      baseColor: 0xf3ead7,
      blurFactor: 0.7,
      speed: 1.1,
      zoom: 0.9,
    });

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
