import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const el = useRef(null);
  const effect = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !el.current) return;

    let tries = 0;
    let raf;

    const init = () => {
      const THREE = window.THREE;
      const FOG = window.VANTA && window.VANTA.FOG;
      if (!THREE || !FOG) {
        if (tries++ < 60) {
          raf = requestAnimationFrame(init);
        }
        return;
      }
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
          blurFactor: 0.55,
          speed: 0.6,
          zoom: 0.9,
        });
      } catch {
        effect.current = null;
      }
    };

    init();

    return () => {
      cancelAnimationFrame(raf);
      if (effect.current && effect.current.destroy) effect.current.destroy();
    };
  }, []);

  return (
    <div
      ref={el}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-30"
    />
  );
}
