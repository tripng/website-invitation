import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  guidelineRevealDuration,
  guidelineStagger,
  swatchPop,
} from "../constants/animationConfig";

const SWATCHES = [
  { name: "Sand", hex: "#D8C3A5" },
  { name: "Clay", hex: "#C8967C" },
  { name: "Sage", hex: "#A3B18A" },
  { name: "Blush", hex: "#E8C4C0" },
  { name: "Ochre", hex: "#C9A66B" },
  { name: "Mist", hex: "#BFD3D0" },
];

const GUIDELINES = [
  {
    title: "Sentuhan Earth Tone & Pastel",
    body: "Kenakan pakaian dengan nuansa hangat dan lembut. Hindari warna putih pekat agar mempelai tetap menjadi pusat perhatian.",
  },
  {
    title: "Datang 15 Menit Lebih Awal",
    body: "Akad dimulai tepat waktu. Mohon hadir lebih awal agar prosesi berjalan khidmat tanpa gangguan.",
  },
  {
    title: "Jaga Keintiman Acara",
    body: "Acara bersifat privat dan penuh doa. Mohon tidak merekam prosesi akad tanpa izin.",
  },
  {
    title: "Nyaman & Santai",
    body: "Resepsi bersifat casual elegan. Kenakan alas kaki yang nyaman untuk bersantai di taman.",
  },
];

function DresscodeSwatch({ data }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: swatchPop,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-2"
    >
      <span
        className="h-14 w-14 rounded-full shadow-[0_12px_30px_-12px_rgba(43,39,35,0.45)] md:h-16 md:w-16"
        style={{ backgroundColor: data.hex }}
      />
      <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-ink-soft">
        {data.name}
      </span>
    </div>
  );
}

function GuidelineItem({ data, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: guidelineRevealDuration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="flex gap-5 border-t border-gold/20 pt-6"
    >
      <span className="font-serif text-2xl text-gold">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="mb-2 font-serif text-xl text-ink md:text-2xl">
          {data.title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-ink-soft md:text-base">
          {data.body}
        </p>
      </div>
    </div>
  );
}

export default function EventGuidelines() {
  const section = useRef(null);
  const heading = useRef(null);
  const leaf = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([...heading.current.children], { yPercent: 120 });
      gsap.set(leaf.current, { strokeDasharray: 600, strokeDashoffset: 600 });

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
      })
        .to(
          leaf.current,
          { strokeDashoffset: 0, duration: 1.4, ease: "power2.out" },
          0.2
        );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-cream-deep px-6 py-32 md:py-28"
    >
      <div className="relative mx-auto w-full max-w-4xl">
        <p className="mb-4 flex justify-center gap-1.5 font-sans text-xs tracking-[0.45em] uppercase text-gold">
          {"Panduan Acara".split("").map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="inline-block">{ch === " " ? " " : ch}</span>
            </span>
          ))}
        </p>
        <h2
          ref={heading}
          className="mb-12 flex justify-center gap-1 font-serif text-4xl text-ink md:text-6xl"
        >
          {"Dresscode".split("").map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="inline-block">{ch === " " ? " " : ch}</span>
            </span>
          ))}
        </h2>

        <div className="mb-20 flex justify-center">
          <svg
            ref={leaf}
            viewBox="0 0 200 80"
            className="h-20 w-48 fill-none stroke-gold"
            strokeWidth="1.4"
            strokeLinecap="round"
          >
            <path d="M100 75 C100 50 70 45 55 30 C75 32 95 40 100 60 C105 40 125 32 145 30 C130 45 100 50 100 75 Z" />
            <path d="M100 60 L100 20" />
          </svg>
        </div>

        <div className="mb-16 flex flex-wrap justify-center gap-6 md:gap-10">
          {SWATCHES.map((s) => (
            <DresscodeSwatch key={s.name} data={s} />
          ))}
        </div>

        <p className="mb-8 text-center font-sans text-xs tracking-[0.4em] uppercase text-gold">
          Tata Tertib &amp; Doa
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-12">
          {GUIDELINES.map((g, i) => (
            <GuidelineItem key={g.title} data={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
