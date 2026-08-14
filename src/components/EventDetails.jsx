import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  eventRevealDuration,
  eventRevealDistance,
  eventTilt,
  eventParallax,
  eventCornerDuration,
  eventLabelStagger,
} from "../constants/animationConfig";
import Countdown from "./Countdown";

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

const MAPS = "https://www.google.com/maps/search/?api=1&query=";
const CAL_BASE = "https://calendar.google.com/calendar/render?action=TEMPLATE";

function icsHref(title, loc) {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `UID:${stamp}@wedding`,
    `DTSTAMP:${stamp}`,
    "DTSTART:20260912T000000Z",
    "DTEND:20260912T070000Z",
    `SUMMARY:${title}`,
    `LOCATION:${loc}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

function Corner({ className }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-6 w-6 border-gold/60 ${className}`}
    />
  );
}

function EventCard({ data, side }) {
  const card = useRef(null);
  const icon = useRef(null);
  const label = useRef(null);
  const day = useRef(null);
  const time = useRef(null);
  const place = useRef(null);
  const buttons = useRef(null);
  const c1 = useRef(null);
  const c2 = useRef(null);
  const c3 = useRef(null);
  const c4 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fromX = side === "left" ? -eventRevealDistance : eventRevealDistance;
      const texts = [label.current, day.current, time.current, place.current];
      const corners = [c1.current, c2.current, c3.current, c4.current];

      gsap.set(card.current, { xPercent: fromX, opacity: 0 });
      gsap.set(texts, { y: 28, opacity: 0 });
      gsap.set(buttons.current.children, { y: 20, opacity: 0 });
      gsap.set(icon.current, { strokeDasharray: 200, strokeDashoffset: 200 });
      gsap.set(corners, { scaleX: 0, scaleY: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card.current,
          start: "top 85%",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true,
        },
      });

      tl.to(card.current, {
        xPercent: 0,
        opacity: 1,
        duration: eventRevealDuration,
        ease: "power3.out",
      })
        .to(icon.current, { strokeDashoffset: 0, duration: 1, ease: "power2.out" }, 0.1)
        .to(texts, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1 }, 0.2)
        .to(
          buttons.current.children,
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.08 },
          0.5
        )
        .to(
          corners,
          { scaleX: 1, scaleY: 1, duration: eventCornerDuration, ease: "power3.out", stagger: 0.07 },
          0.3
        );

      gsap.fromTo(
        card.current,
        { yPercent: -eventParallax / 2 },
        {
          yPercent: eventParallax / 2,
          ease: "none",
          scrollTrigger: {
            trigger: card.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      const node = card.current;
      const onMove = (e) => {
        const r = node.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(node, {
          rotateY: px * eventTilt,
          rotateX: -py * eventTilt,
          duration: 0.4,
          ease: "power2.out",
          transformPerspective: 800,
        });
      };
      const onEnter = () => gsap.to(node, { y: -8, duration: 0.4, ease: "power2.out" });
      const onLeave = () =>
        gsap.to(node, {
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      node.addEventListener("pointermove", onMove);
      node.addEventListener("pointerenter", onEnter);
      node.addEventListener("pointerleave", onLeave);

      return () => {
        node.removeEventListener("pointermove", onMove);
        node.removeEventListener("pointerenter", onEnter);
        node.removeEventListener("pointerleave", onLeave);
      };
    }, card);
    return () => ctx.revert();
  }, [side]);

  const gcal = `${CAL_BASE}&text=${encodeURIComponent(data.label)}&dates=20260912T000000Z/20260912T070000Z&location=${encodeURIComponent(data.place)}`;

  return (
    <article
      ref={card}
      className="group relative flex flex-col items-center rounded-sm border border-gold/30 bg-gradient-to-b from-ink/5 to-transparent px-8 py-12 text-center shadow-[0_20px_60px_-30px_rgba(43,39,35,0.4)] md:px-12"
      style={{ transformStyle: "preserve-3d" }}
    >
      <span ref={c1} className="absolute left-3 top-3 h-6 w-6">
        <Corner className="left-3 top-3 border-l border-t" />
      </span>
      <span ref={c2} className="absolute right-3 top-3 h-6 w-6">
        <Corner className="right-3 top-3 border-r border-t" />
      </span>
      <span ref={c3} className="absolute bottom-3 left-3 h-6 w-6">
        <Corner className="bottom-3 left-3 border-b border-l" />
      </span>
      <span ref={c4} className="absolute bottom-3 right-3 h-6 w-6">
        <Corner className="bottom-3 right-3 border-b border-r" />
      </span>
      <svg
        ref={icon}
        viewBox="0 0 24 24"
        className="h-12 w-12 fill-none stroke-gold"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={data.icon} />
      </svg>
      <p
        ref={label}
        className="mt-6 font-sans text-xs tracking-[0.4em] uppercase text-gold"
      >
        {data.label}
      </p>
      <h3 ref={day} className="mt-3 font-serif text-2xl text-ink">
        {data.day}
      </h3>
      <p ref={time} className="mt-2 font-sans text-sm text-ink-soft">
        {data.date} · {data.time}
      </p>
      <p ref={place} className="mt-2 font-sans text-sm text-ink-soft">
        {data.place}
      </p>
      <div ref={buttons} className="mt-8 flex flex-col gap-3">
        <a
          href={`${MAPS}${data.query}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-gold/50 px-6 py-2 font-sans text-xs tracking-[0.25em] uppercase text-ink transition-colors hover:bg-gold hover:text-cream"
        >
          Buka di Google Maps
        </a>
        <a
          href={gcal}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-gold/50 px-6 py-2 font-sans text-xs tracking-[0.25em] uppercase text-ink transition-colors hover:bg-gold hover:text-cream"
        >
          Add to Google Calendar
        </a>
        <a
          href={icsHref(data.label, data.place)}
          download={`${data.label}.ics`}
          className="rounded-full border border-gold/50 px-6 py-2 font-sans text-xs tracking-[0.25em] uppercase text-ink transition-colors hover:bg-gold hover:text-cream"
        >
          Add to Apple Calendar
        </a>
      </div>
    </article>
  );
}

export default function EventDetails() {
  const divider = useRef(null);
  const heading = useRef(null);
  const glow = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(divider.current, { scaleX: 0, opacity: 0 });
      gsap.set([...heading.current.children], { yPercent: 110, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: heading.current, start: "top 90%", once: true },
      });
      tl.to(divider.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      }).to(
        [...heading.current.children],
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: eventLabelStagger,
        },
        0.1
      );

      gsap.fromTo(
        glow.current,
        { yPercent: -eventParallax },
        {
          yPercent: eventParallax,
          ease: "none",
          scrollTrigger: {
            trigger: glow.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-cream px-6 py-28">
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-4xl">
        <p
          ref={heading}
          className="mb-6 flex justify-center gap-1.5 font-sans text-xs tracking-[0.45em] uppercase text-gold"
        >
          {[..."Detail Acara"].map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="inline-block">{ch === " " ? " " : ch}</span>
            </span>
          ))}
        </p>
        <Countdown />
        <div
          ref={divider}
          className="mx-auto mb-16 h-px w-40 origin-center bg-gold/60"
          style={{ transform: "scaleX(0)" }}
        />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <EventCard data={AKAD} side="left" />
          <EventCard data={RESEPSI} side="right" />
        </div>
      </div>
    </section>
  );
}
