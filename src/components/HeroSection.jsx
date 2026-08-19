import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  entranceDuration,
  scrollEase,
  heroDrift,
  heroMetaDelay,
  metaRevealDuration,
  accentRevealDuration,
} from "../constants/animationConfig";
import HeroBackground from "./HeroBackground";

export default function HeroSection({ start }) {
  const root = useRef(null);
  const background = useRef(null);
  const titleLayer = useRef(null);
  const amelia = useRef(null);
  const jonathan = useRef(null);
  const meta = useRef(null);
  const accent = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([amelia.current, jonathan.current], { opacity: 0, yPercent: 0 });
      gsap.set(amelia.current, { yPercent: -58 });
      gsap.set(jonathan.current, { yPercent: 58 });
      gsap.set(meta.current, { opacity: 0, yPercent: 20 });
      gsap.set(accent.current, { scaleX: 0 });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!start) return;
    const ctx = gsap.context(() => {
      gsap.to([amelia.current, jonathan.current], {
        opacity: 1,
        duration: entranceDuration,
        ease: scrollEase,
        delay: 0.3,
      });

      gsap.to(meta.current, {
        opacity: 1,
        yPercent: 0,
        duration: metaRevealDuration,
        ease: scrollEase,
        delay: heroMetaDelay,
      });

      gsap.to(accent.current, {
        scaleX: 1,
        duration: accentRevealDuration,
        ease: scrollEase,
        delay: heroMetaDelay + 0.2,
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
        y: () => window.innerHeight * 0.4,
        scale: 0.4,
        opacity: 0.5,
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
      className="relative min-h-screen overflow-hidden"
    >
      <HeroBackground />
      <div
        ref={background}
        className="absolute inset-0 -z-20 scale-110 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80)",
        }}
      />
      <div className="hero-vignette -z-10" />
      <div className="hero-frame -z-10" />

      <div
        ref={titleLayer}
        className="pointer-events-none absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-ink mix-blend-difference md:fixed md:top-1/2 md:text-white"
      >
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
          <h1
            ref={amelia}
            className="whitespace-nowrap font-serif text-white text-5xl md:text-8xl tracking-wide"
          >
            Amelia
          </h1>
          <h1
            ref={jonathan}
            className="whitespace-nowrap font-serif text-white text-5xl md:text-8xl tracking-wide"
          >
            &amp; Jonathan
          </h1>
        </div>
      </div>

      <div
        ref={meta}
        className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 translate-y-[8rem] flex-col items-center gap-3 font-sans text-ink-soft md:translate-y-[11rem]"
      >
        <span className="text-xs tracking-[0.45em] uppercase">
          Bali &middot; 12 September 2026
        </span>
        <span
          ref={accent}
          className="block h-px w-24 origin-center bg-gold"
        />
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
