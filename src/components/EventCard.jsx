import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { eventRevealDuration, eventRevealDistance, eventTilt } from "../constants/animationConfig";

gsap.registerPlugin(ScrollTrigger);

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
    <span aria-hidden="true" className={`pointer-events-none absolute h-6 w-6 border-gold/60 ${className}`} />
  );
}

export default function EventCard({ data, side, order }) {
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
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const texts = [label.current, day.current, time.current, place.current];
      const corners = [c1.current, c2.current, c3.current, c4.current];

      gsap.set(card.current, isMobile ? { y: 30, opacity: 0 } : { xPercent: fromX, opacity: 0 });
      gsap.set(texts, { y: 28, opacity: 0 });
      gsap.set(buttons.current.children, { y: 20, opacity: 0 });
      gsap.set(icon.current, { strokeDasharray: 200, strokeDashoffset: 200 });
      gsap.set(corners, { scaleX: 0, scaleY: 0 });

      const tl = gsap.timeline({
        delay: order * 0.15,
        scrollTrigger: {
          trigger: card.current,
          start: "top 85%",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true,
        },
      });

      tl.to(card.current, isMobile
        ? { y: 0, opacity: 1, duration: eventRevealDuration, ease: "power3.out" }
        : { xPercent: 0, opacity: 1, duration: eventRevealDuration, ease: "power3.out" })
        .to(icon.current, { strokeDashoffset: 0, duration: 1, ease: "power2.out" }, 0.1)
        .to(texts, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1 }, 0.2)
        .to(buttons.current.children, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.08 }, 0.5)
        .to(corners, { scaleX: 1, scaleY: 1, duration: 0.5, ease: "power3.out", stagger: 0.07 }, 0.3);

      gsap.fromTo(card.current, { yPercent: -15 }, {
        yPercent: 15, ease: "none",
        scrollTrigger: { trigger: card.current, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
      });

      const node = card.current;
      const onMove = (e) => {
        const r = node.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(node, { rotateY: px * eventTilt, rotateX: -py * eventTilt, duration: 0.4, ease: "power2.out", transformPerspective: 800 });
      };
      const onEnter = () => gsap.to(node, { y: -8, duration: 0.4, ease: "power2.out" });
      const onLeave = () => gsap.to(node, { y: 0, rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
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
  }, [side, order]);

  const gcal = `${CAL_BASE}&text=${encodeURIComponent(data.label)}&dates=20260912T000000Z/20260912T070000Z&location=${encodeURIComponent(data.place)}`;

  return (
    <article
      ref={card}
      className="group relative flex flex-col items-center rounded-sm border border-gold/30 bg-gradient-to-b from-ink/5 to-transparent px-8 py-12 text-center shadow-[0_20px_60px_-30px_rgba(43,39,35,0.4)] md:px-12"
      style={{ transformStyle: "preserve-3d" }}
    >
      <span ref={c1} className="absolute left-3 top-3 h-6 w-6"><Corner className="left-3 top-3 border-l border-t" /></span>
      <span ref={c2} className="absolute right-3 top-3 h-6 w-6"><Corner className="right-3 top-3 border-r border-t" /></span>
      <span ref={c3} className="absolute bottom-3 left-3 h-6 w-6"><Corner className="bottom-3 left-3 border-b border-l" /></span>
      <span ref={c4} className="absolute bottom-3 right-3 h-6 w-6"><Corner className="bottom-3 right-3 border-b border-r" /></span>
      <svg ref={icon} viewBox="0 0 24 24" className="h-12 w-12 fill-none stroke-gold" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d={data.icon} />
      </svg>
      <p ref={label} className="mt-6 font-sans text-xs tracking-[0.4em] uppercase text-gold">{data.label}</p>
      <h3 ref={day} className="mt-3 font-serif text-2xl text-ink">{data.day}</h3>
      <p ref={time} className="mt-2 font-sans text-sm text-ink-soft">{data.date} · {data.time}</p>
      <p ref={place} className="mt-2 font-sans text-sm text-ink-soft">{data.place}</p>
      <div ref={buttons} className="mt-8 flex flex-col gap-3">
        <a href={`${MAPS}${data.query}`} target="_blank" rel="noreferrer" className="rounded-full border border-gold/50 px-6 py-2 font-sans text-xs tracking-[0.25em] uppercase text-ink transition-colors hover:bg-gold hover:text-cream">Buka di Google Maps</a>
        <a href={gcal} target="_blank" rel="noreferrer" className="rounded-full border border-gold/50 px-6 py-2 font-sans text-xs tracking-[0.25em] uppercase text-ink transition-colors hover:bg-gold hover:text-cream">Add to Google Calendar</a>
        <a href={icsHref(data.label, data.place)} download={`${data.label}.ics`} className="rounded-full border border-gold/50 px-6 py-2 font-sans text-xs tracking-[0.25em] uppercase text-ink transition-colors hover:bg-gold hover:text-cream">Add to Apple Calendar</a>
      </div>
    </article>
  );
}
