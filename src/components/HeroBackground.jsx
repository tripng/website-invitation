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
          background: { color: { value: "#f3ead7" } },
          fpsLimit: 60,
          particles: {
            number: { value: 45, density: { enable: true, area: 900 } },
            color: { value: ["#c9a24b", "#d4af37", "#b8935a"] },
            shape: { type: "circle" },
            opacity: {
              value: { min: 0.2, max: 0.7 },
              animation: { enable: true, speed: 0.6, sync: false },
            },
            size: { value: { min: 1, max: 4 } },
            move: {
              enable: true,
              speed: 0.5,
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
      className="pointer-events-none absolute inset-0 -z-30"
    />
  );
}
