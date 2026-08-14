import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  giftRevealDuration,
  giftStagger,
  giftScrubDistance,
} from "../constants/animationConfig";

const BANK = {
  name: "Bank Central Asia",
  account: "1234567890",
  owner: "Amelia Putri",
};

const QR_MODULES = Array.from({ length: 11 }, (_, r) =>
  Array.from({ length: 11 }, (_, c) => (r * 7 + c * 3 + ((r * c) % 5)) % 2 === 0)
);

const ADDRESS = {
  line1: "Jl. Bunga Mawar No. 28",
  line2: "Perumahan Taman Sari, Blok C",
  line3: "Denpasar, Bali 80221",
};

function BankCard() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(BANK.account);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="group relative flex flex-col rounded-2xl border border-gold/25 bg-cream/40 p-7">
      <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-gold/40" />
      <span className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r border-t border-gold/40" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-gold/40" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-gold/40" />
      <svg viewBox="0 0 24 24" className="mb-5 h-9 w-9 fill-none stroke-gold" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h4" />
      </svg>
      <h3 className="mb-1 font-serif text-xl text-ink">{BANK.name}</h3>
      <p className="mb-4 font-sans text-sm text-ink-soft">a.n. {BANK.owner}</p>
      <div className="flex items-center justify-between gap-3 rounded-xl bg-ink/5 px-4 py-3">
        <span className="font-sans text-lg tracking-[0.2em] text-ink">{BANK.account}</span>
        <button
          onClick={copy}
          className="shrink-0 rounded-full border border-gold/50 px-4 py-1.5 font-sans text-xs uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-cream"
        >
          {copied ? "Tersalin" : "Salin"}
        </button>
      </div>
    </div>
  );
}

function QrisCard() {
  return (
    <div className="group relative flex flex-col items-center rounded-2xl border border-gold/25 bg-cream/40 p-7">
      <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-gold/40" />
      <span className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r border-t border-gold/40" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-gold/40" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-gold/40" />
      <div className="relative mb-4 overflow-hidden rounded-xl bg-white p-4">
        <svg viewBox="0 0 110 110" className="h-40 w-40 fill-ink">
          {QR_MODULES.map((row, r) =>
            row.map((on, c) =>
              on ? <rect key={`${r}-${c}`} x={c * 10} y={r * 10} width="10" height="10" /> : null
            )
          )}
          <rect x="0" y="0" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="6" />
          <rect x="80" y="0" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="6" />
          <rect x="0" y="80" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="6" />
        </svg>
        <span className="qris-scan absolute left-0 right-0 top-0 h-1 bg-gold/70 shadow-[0_0_12px_rgba(201,166,107,0.8)]" />
      </div>
      <h3 className="mb-1 font-serif text-xl text-ink">QRIS / E-Wallet</h3>
      <p className="text-center font-sans text-sm text-ink-soft">Pindai langsung dari kamera ponsel</p>
    </div>
  );
}

function AddressCard() {
  return (
    <div className="group relative flex flex-col rounded-2xl border border-gold/25 bg-cream/40 p-7">
      <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-gold/40" />
      <span className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r border-t border-gold/40" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-gold/40" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-gold/40" />
      <svg viewBox="0 0 24 24" className="mb-5 h-9 w-9 fill-none stroke-gold" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
      <h3 className="mb-3 font-serif text-xl text-ink">Kirim Kado</h3>
      <p className="font-sans text-sm leading-relaxed text-ink-soft">
        {ADDRESS.line1}
        <br />
        {ADDRESS.line2}
        <br />
        {ADDRESS.line3}
      </p>
    </div>
  );
}

export default function WeddingGift() {
  const section = useRef(null);
  const heading = useRef(null);
  const envelope = useRef(null);
  const flap = useRef(null);
  const letter = useRef(null);
  const scan = useRef(null);
  const cards = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([...heading.current.children], { yPercent: 120 });
      gsap.set(letter.current, { yPercent: 70, opacity: 0 });
      gsap.set(flap.current, { rotateX: 0, transformOrigin: "top center" });
      gsap.set(cards.current, { y: 50, opacity: 0 });

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

      gsap.to(flap.current, {
        rotateX: -180,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top 65%",
          end: () => `+=${giftScrubDistance}`,
          scrub: true,
        },
      });

      gsap.to(letter.current, {
        yPercent: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top 60%",
          end: () => `+=${giftScrubDistance}`,
          scrub: true,
        },
      });

      gsap.to(scan.current, {
        y: 156,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top 50%",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(cards.current, {
        y: 0,
        opacity: 1,
        duration: giftRevealDuration,
        ease: "power3.out",
        stagger: giftStagger,
        scrollTrigger: {
          trigger: cards.current[0],
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-cream px-6 py-32 md:py-28"
    >
      <div className="relative mx-auto w-full max-w-5xl">
        <p className="mb-4 flex justify-center gap-1.5 font-sans text-xs tracking-[0.45em] uppercase text-gold">
          {"Wedding Gift".split("").map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="inline-block">{ch === " " ? " " : ch}</span>
            </span>
          ))}
        </p>
        <h2
          ref={heading}
          className="mb-10 flex justify-center gap-1 font-serif text-4xl text-ink md:text-6xl"
        >
          {"Amplop Digital".split("").map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="inline-block">{ch === " " ? " " : ch}</span>
            </span>
          ))}
        </h2>

        <div className="mb-16 flex justify-center">
          <svg
            ref={envelope}
            viewBox="0 0 200 130"
            className="h-32 w-52 fill-none stroke-gold md:h-36 md:w-60"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="10" y="30" width="180" height="90" rx="6" />
            <path ref={flap} d="M10 30 L100 90 L190 30" style={{ transformOrigin: "top center" }} />
            <g ref={letter}>
              <rect x="35" y="10" width="130" height="70" rx="4" className="fill-cream" />
              <path d="M45 35h110M45 50h80" className="stroke-gold/60" strokeWidth="1.4" />
            </g>
          </svg>
        </div>

        <p className="mb-10 text-center font-sans text-sm leading-relaxed text-ink-soft md:text-base">
          Kemudahan memberikan hadiah tanpa uang tunai maupun kado fisik.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div ref={(el) => (cards.current[0] = el)}>
            <BankCard />
          </div>
          <div ref={(el) => (cards.current[1] = el)}>
            <QrisCard />
          </div>
          <div ref={(el) => (cards.current[2] = el)}>
            <AddressCard />
          </div>
        </div>
      </div>
    </section>
  );
}
