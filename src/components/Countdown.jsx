import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { eventCountdownPulse } from "../constants/animationConfig";

const TARGET = new Date("2026-09-12T08:00:00+08:00").getTime();

function Unit({ value, label }) {
  const ref = useRef(null);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      gsap.fromTo(
        ref.current,
        { scale: 1.18 },
        { scale: 1, duration: 0.35, ease: "back.out(3)" }
      );
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <span
        ref={ref}
        className="inline-block font-serif text-4xl text-ink tabular-nums md:text-5xl"
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 font-sans text-[0.6rem] tracking-[0.3em] uppercase text-gold">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [left, setLeft] = useState(Math.max(0, TARGET - Date.now()));
  const root = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setLeft(Math.max(0, TARGET - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        }
      );
      gsap.to(root.current, {
        scale: 1.02,
        duration: eventCountdownPulse,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const d = Math.floor(left / 86400000);
  const h = Math.floor((left % 86400000) / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const s = Math.floor((left % 60000) / 1000);

  return (
    <div
      ref={root}
      className="mx-auto mb-20 flex items-center justify-center gap-6 md:gap-10"
    >
      <Unit value={d} label="Hari" />
      <span className="font-serif text-3xl text-gold md:text-4xl">:</span>
      <Unit value={h} label="Jam" />
      <span className="font-serif text-3xl text-gold md:text-4xl">:</span>
      <Unit value={m} label="Menit" />
      <span className="font-serif text-3xl text-gold md:text-4xl">:</span>
      <Unit value={s} label="Detik" />
    </div>
  );
}
