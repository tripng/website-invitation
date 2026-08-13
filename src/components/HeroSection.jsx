import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { entranceDuration, scrollEase, heroDrift } from "../constants/animationConfig";

export default function HeroSection({ start }) {
  const root = useRef(null);
  const background = useRef(null);
  const titleLayer = useRef(null);
  const amelia = useRef(null);
  const jonathan = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-line", { yPercent: 120, opacity: 0 });
      gsap.set(amelia.current, { yPercent: -60 });
      gsap.set(jonathan.current, { yPercent: 60 });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!start) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-line", {
        yPercent: 0,
        opacity: 1,
        duration: entranceDuration,
        ease: scrollEase,
        stagger: 0.15,
        delay: 0.3,
      });

      gsap.to(background.current, {
        yPercent: heroDrift,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(titleLayer.current, {
        yPercent: 42,
        scale: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to([amelia.current, jonathan.current], {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-scroll", {
        opacity: 0,
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [start]);

  const handlePointer = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    gsap.to(background.current, {
      xPercent: x * 4,
      yPercent: y * 4,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="hero"
      ref={root}
      onPointerMove={handlePointer}
      className="relative min-h-screen overflow-hidden bg-cream"
    >
      <div
        ref={background}
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url(https://picsum.photos/seed/hero-wedding/1600/1200)",
        }}
      />
      <div
        ref={titleLayer}
        className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center"
      >
        <div className="flex items-center gap-3 md:gap-6">
          <div className="overflow-hidden">
            <h1
              ref={amelia}
              className="hero-line font-serif text-ink text-6xl md:text-8xl tracking-wide"
            >
              Amelia
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              ref={jonathan}
              className="hero-line font-serif text-ink text-6xl md:text-8xl tracking-wide"
            >
              &amp; Jonathan
            </h1>
          </div>
        </div>
      </div>
      <div className="hero-scroll absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-sans text-ink-soft text-xs tracking-[0.3em] uppercase">
          Scroll
        </span>
        <span className="h-10 w-px bg-ink-soft/50" />
      </div>
    </section>
  );
}
