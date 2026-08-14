import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  eventRevealDistance,
  eventParallax,
  eventCornerDuration,
  eventLabelStagger,
  eventProgressWidth,
  eventTitleDuration,
  eventStaggerGap,
} from "../constants/animationConfig";
import Countdown from "./Countdown";
import EventCard from "./EventCard";

gsap.registerPlugin(ScrollTrigger);

const AKAD = {
  icon: "M12 2l2.5 5 5.5.8-4 3.9.9 5.5L12 21l-4.9 2.6.9-5.5-4-3.9 5.5-.8z",
  label: "Akad Nikah",
  day: "Sabtu",
  date: "12 September 2026",
  time: "08.00 – 10.00 WITA",
  place: "Taman Bhagawan, Mengwi, Bali",
  query: "Taman+Bhagawan+Mengwi+Bali",
};

const RESEPSI = {
  icon: "M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6",
  label: "Resepsi",
  day: "Sabtu",
  date: "12 September 2026",
  time: "11.00 – 15.00 WITA",
  place: "Taman Bhagawan, Mengwi, Bali",
  query: "Taman+Bhagawan+Mengwi+Bali",
};

export default function EventDetails() {
  const section = useRef(null);
  const heading = useRef(null);
  const divider = useRef(null);
  const progress = useRef(null);
  const glow = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(divider.current, { scaleX: 0, opacity: 0 });
      gsap.set(progress.current, { scaleY: 0, opacity: 0 });
      gsap.set([...heading.current.children], { yPercent: 110, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: heading.current, start: "top 90%", once: true },
      });
      tl.fromTo(
        heading.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: eventTitleDuration, ease: "power3.out" }
      )
        .to([...heading.current.children], {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: eventLabelStagger,
        }, 0.1)
        .to(divider.current, { scaleX: 1, opacity: 1, duration: 0.9, ease: "power3.out" }, 0.2);

      gsap.fromTo(
        progress.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
      gsap.fromTo(progress.current, { opacity: 0 }, { opacity: 1, duration: 0.4, scrollTrigger: { trigger: section.current, start: "top 70%", once: true } });

      gsap.fromTo(
        glow.current,
        { yPercent: -eventParallax },
        {
          yPercent: eventParallax,
          ease: "none",
          scrollTrigger: { trigger: glow.current, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative overflow-hidden bg-cream px-6 py-28">
      <div ref={glow} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-4xl">
        <p ref={heading} className="mb-6 flex justify-center gap-1.5 font-sans text-xs tracking-[0.45em] uppercase text-gold">
          {[..."Detail Acara"].map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="inline-block">{ch === " " ? " " : ch}</span>
            </span>
          ))}
        </p>
        <Countdown />
        <div ref={divider} className="mx-auto mb-16 h-px w-40 origin-center bg-gold/60" style={{ transform: "scaleX(0)" }} />
        <div className="relative">
          <span
            ref={progress}
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-full -translate-x-1/2 origin-top bg-gradient-to-b from-gold/70 to-gold/10"
            style={{ width: eventProgressWidth, transform: "scaleY(0)" }}
          />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <EventCard data={AKAD} side="left" order={0} />
            <EventCard data={RESEPSI} side="right" order={1} />
          </div>
        </div>
      </div>
    </section>
  );
}
