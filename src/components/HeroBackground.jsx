import { useEffect } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function HeroBackground() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let container;
    let cancelled = false;
    (async () => {
      await loadSlim(tsParticles);
      if (cancelled) return;
      container = await tsParticles.load({
        id: "hero-particles",
        options: {
          fullScreen: { enable: false },
          fpsLimit: 60,
          particles: {
            number: { value: 60, density: { enable: true, area: 900 } },
            color: { value: ["#e8c766", "#d4af37", "#c9a24b"] },
            shape: { type: "circle" },
            opacity: {
              value: { min: 0.5, max: 1 },
              animation: { enable: true, speed: 0.8, sync: false },
            },
            size: { value: { min: 2, max: 6 } },
            shadow: { enable: true, color: "#d4af37", blur: 4 },
            move: {
              enable: true,
              speed: 0.8,
              direction: "none",
              random: true,
              outModes: { default: "out" },
            },
            links: { enable: false },
          },
          detectRetina: true,
        },
      });
    })();
    return () => {
      cancelled = true;
      if (container) container.destroy();
    };
  }, []);

  return (
    <div
      id="hero-particles"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}
