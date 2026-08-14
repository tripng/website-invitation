import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { rsvpRevealDuration, rsvpStagger } from "../constants/animationConfig";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-sans text-xs uppercase tracking-[0.3em] text-gold">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-gold/30 bg-cream/50 px-4 py-3 font-sans text-ink outline-none transition-colors focus:border-gold";

export default function Rsvp() {
  const section = useRef(null);
  const heading = useRef(null);
  const scrollSvg = useRef(null);
  const fields = useRef([]);
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(true);
  const [count, setCount] = useState(1);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([...heading.current.children], { yPercent: 120 });
      gsap.set(scrollSvg.current, { strokeDasharray: 520, strokeDashoffset: 520 });
      gsap.set(fields.current, { y: 40, opacity: 0 });

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

      gsap.to(scrollSvg.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top 65%",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(fields.current, {
        y: 0,
        opacity: 1,
        duration: rsvpRevealDuration,
        ease: "power3.out",
        stagger: rsvpStagger,
        scrollTrigger: {
          trigger: fields.current[0],
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2600);
  };

  return (
    <section
      ref={section}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-cream-deep px-6 py-32 md:py-28"
    >
      <div className="relative mx-auto w-full max-w-xl">
        <p className="mb-4 flex justify-center gap-1.5 font-sans text-xs tracking-[0.45em] uppercase text-gold">
          {"RSVP".split("").map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="inline-block">{ch === " " ? " " : ch}</span>
            </span>
          ))}
        </p>
        <h2
          ref={heading}
          className="mb-8 flex justify-center gap-1 font-serif text-3xl text-ink md:text-5xl"
        >
          {"Konfirmasi Kehadiran".split("").map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="inline-block">{ch === " " ? " " : ch}</span>
            </span>
          ))}
        </h2>

        <div className="mb-12 flex justify-center">
          <svg
            ref={scrollSvg}
            viewBox="0 0 220 90"
            className="h-20 w-52 fill-none stroke-gold"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M30 20 Q110 5 190 20 Q200 50 190 78 Q110 93 30 78 Q20 50 30 20 Z" />
            <path d="M110 12 L110 86" />
            <path d="M60 35 Q110 26 160 35" />
            <path d="M60 55 Q110 46 160 55" />
          </svg>
        </div>

        <form
          onSubmit={submit}
          className="relative rounded-3xl border border-gold/25 bg-cream/50 p-7 md:p-9"
        >
          <span className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-gold/40" />
          <span className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r border-t border-gold/40" />
          <span className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b border-l border-gold/40" />
          <span className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b border-r border-gold/40" />

          <div ref={(el) => (fields.current[0] = el)} className="mb-6">
            <Field label="Nama Lengkap">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tulis nama Anda"
                className={inputClass}
              />
            </Field>
          </div>

          <div ref={(el) => (fields.current[1] = el)} className="mb-6">
            <Field label="Kehadiran">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`rounded-xl border px-4 py-3 font-sans text-sm uppercase tracking-[0.2em] transition-colors ${
                    attending
                      ? "border-gold bg-gold text-cream"
                      : "border-gold/30 text-ink"
                  }`}
                >
                  Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`rounded-xl border px-4 py-3 font-sans text-sm uppercase tracking-[0.2em] transition-colors ${
                    !attending
                      ? "border-gold bg-gold text-cream"
                      : "border-gold/30 text-ink"
                  }`}
                >
                  Tidak Hadir
                </button>
              </div>
            </Field>
          </div>

          <div ref={(el) => (fields.current[2] = el)} className="mb-8">
            <Field label="Jumlah Orang">
              <div className="flex items-center justify-between rounded-xl border border-gold/30 bg-cream/50 px-3 py-2">
                <button
                  type="button"
                  onClick={() => setCount((c) => Math.max(1, c - 1))}
                  className="h-9 w-9 rounded-full font-serif text-xl text-gold transition-colors hover:bg-gold/15"
                >
                  −
                </button>
                <span className="font-serif text-2xl text-ink">{count}</span>
                <button
                  type="button"
                  onClick={() => setCount((c) => Math.min(5, c + 1))}
                  className="h-9 w-9 rounded-full font-serif text-xl text-gold transition-colors hover:bg-gold/15"
                >
                  +
                </button>
              </div>
            </Field>
          </div>

          <div ref={(el) => (fields.current[3] = el)}>
            <button
              type="submit"
              className="w-full rounded-full bg-gold py-3.5 font-sans text-sm uppercase tracking-[0.3em] text-cream transition-opacity hover:opacity-90"
            >
              {sent ? "Terima Kasih" : "Kirim Konfirmasi"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
