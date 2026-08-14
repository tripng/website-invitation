import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { eventRevealDuration, eventRevealDistance } from "../constants/animationConfig";

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

function icsHref(title, loc, start, end) {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `UID:${stamp}@wedding`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `LOCATION:${loc}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

function EventCard({ data, side }) {
  const card = useRef(null);
  const label = useRef(null);
  const day = useRef(null);
  const time = useRef(null);
  const place = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fromX = side === "left" ? -eventRevealDistance : eventRevealDistance;
      const texts = [label.current, day.current, time.current, place.current];

      gsap.set(card.current, { xPercent: fromX, opacity: 0 });
      gsap.set(texts, { y: 28, opacity: 0 });

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
      }).to(
        texts,
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1 },
        0.2
      );
    }, card);
    return () => ctx.revert();
  }, [side]);

  const gcal = `${CAL_BASE}&text=${encodeURIComponent(data.label)}&dates=20260912T000000Z/20260912T070000Z&location=${encodeURIComponent(data.place)}`;

  return (
    <article
      ref={card}
      className="flex flex-col items-center rounded-sm border border-gold/30 bg-ink/5 px-8 py-12 text-center md:px-12"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-10 w-10 fill-none stroke-gold"
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
      <div className="mt-8 flex flex-col gap-3">
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
          href={icsHref(data.label, data.place, "20260912T000000Z", "20260912T070000Z")}
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
  return (
    <section className="relative bg-cream px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <p className="mb-16 text-center font-sans text-xs tracking-[0.45em] uppercase text-gold">
          Detail Acara
        </p>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <EventCard data={AKAD} side="left" />
          <EventCard data={RESEPSI} side="right" />
        </div>
      </div>
    </section>
  );
}
