import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { closingRevealDuration } from "../constants/animationConfig";

export default function Closing() {
  const section = useRef(null);
  const mono = useRef(null);
  const heading = useRef(null);
  const message = useRef(null);
  const signature = useRef(null);
  const credit = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([...heading.current.children], { yPercent: 120 });
      gsap.set(mono.current, { strokeDasharray: 620, strokeDashoffset: 620 });
      gsap.set([message.current, signature.current], { y: 36, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.to([...heading.current.children], {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.04,
      });

      gsap.to(mono.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top 60%",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(message.current, {
        y: 0,
        opacity: 1,
        duration: closingRevealDuration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: message.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.to(signature.current, {
        y: 0,
        opacity: 1,
        duration: closingRevealDuration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: signature.current,
          start: "top 88%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.to(credit.current, {
        opacity: 1,
        duration: closingRevealDuration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: credit.current,
          start: "top 95%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 py-32 text-center md:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />

      <svg
        ref={mono}
        viewBox="0 0 240 120"
        className="mb-12 h-28 w-60 fill-none stroke-gold md:h-32 md:w-72"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M30 90 C30 50 55 40 60 70 C64 90 50 100 45 80" />
        <path d="M75 45 L95 95 L100 60 L105 95 L125 45" />
        <path d="M140 70 L160 70 M150 55 L150 85" />
        <path d="M175 45 L195 95 L215 45" />
        <path d="M200 70 L225 70" />
      </svg>

      <h2
        ref={heading}
        className="mb-8 flex justify-center gap-1 font-serif text-4xl text-cream md:text-6xl"
      >
        {"Terima Kasih".split("").map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span className="inline-block">{ch === " " ? " " : ch}</span>
          </span>
        ))}
      </h2>

      <p
        ref={message}
        className="mb-14 max-w-xl font-serif text-lg leading-relaxed text-cream/80 md:text-xl"
      >
        Atas kehadiran, doa, dan kasih yang kalian berikan, kami berdua
        menantikan hari bahagia kami bersama kalian. Sampai jumpa di hari
        istimewa kami.
      </p>

      <div ref={signature} className="mb-20">
        <p className="font-serif text-3xl text-gold md:text-4xl">Amelia &amp; Jonathan</p>
        <p className="mt-2 font-sans text-xs uppercase tracking-[0.4em] text-cream/50">
          Bali · 12 September 2026
        </p>
      </div>

      <p
        ref={credit}
        className="font-sans text-[0.7rem] uppercase tracking-[0.3em] text-cream/40"
      >
        Crafted with love · Wedding Invitation
      </p>
    </section>
  );
}
