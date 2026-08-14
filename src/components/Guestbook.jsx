import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { guestRevealDuration, guestStagger } from "../constants/animationConfig";

const SEED_MESSAGES = [
  { name: "Dewi Sartika", body: "Selamat menempuh hidup baru, semoga selalu berkah dan bahagia selamanya.", time: "2 jam lalu" },
  { name: "Budi Santoso", body: "Semoga cinta kalian abadi seperti bunga yang tak pernah layu. Congrats!", time: "5 jam lalu" },
  { name: "Rina & Family", body: "Doa terbaik kami menyertai langkah kalian berdua. Sampai jumpa di hari bahagia.", time: "1 hari lalu" },
  { name: "Andra Pratama", body: "Pasangan serasi, semoga cepat dikaruniai momongan ya. Congratulations!", time: "1 hari lalu" },
];

function MessageItem({ data }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: guestRevealDuration,
          ease: "power3.out",
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
    <article
      ref={ref}
      className="relative rounded-2xl border border-gold/20 bg-cream/50 p-5"
    >
      <span className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-gold/40" />
      <span className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r border-t border-gold/40" />
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-lg text-ink">{data.name}</h3>
        <span className="shrink-0 font-sans text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft">
          {data.time}
        </span>
      </div>
      <p className="font-sans text-sm leading-relaxed text-ink-soft">{data.body}</p>
    </article>
  );
}

export default function Guestbook() {
  const section = useRef(null);
  const heading = useRef(null);
  const pen = useRef(null);
  const form = useRef(null);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [feed, setFeed] = useState(SEED_MESSAGES);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([...heading.current.children], { yPercent: 120 });
      gsap.set(pen.current, { strokeDasharray: 480, strokeDashoffset: 480 });
      gsap.set(form.current, { y: 40, opacity: 0 });

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

      gsap.to(pen.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top 65%",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(form.current, {
        y: 0,
        opacity: 1,
        duration: guestRevealDuration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: form.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !body.trim()) return;
    setFeed((f) => [
      { name: name.trim(), body: body.trim(), time: "Baru saja" },
      ...f,
    ]);
    setName("");
    setBody("");
  };

  return (
    <section
      ref={section}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-cream px-6 py-32 md:py-28"
    >
      <div className="relative mx-auto w-full max-w-xl">
        <p className="mb-4 flex justify-center gap-1.5 font-sans text-xs tracking-[0.45em] uppercase text-gold">
          {"Guestbook".split("").map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="inline-block">{ch === " " ? " " : ch}</span>
            </span>
          ))}
        </p>
        <h2
          ref={heading}
          className="mb-8 flex justify-center gap-1 font-serif text-4xl text-ink md:text-5xl"
        >
          {"Buku Tamu".split("").map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="inline-block">{ch === " " ? " " : ch}</span>
            </span>
          ))}
        </h2>

        <div className="mb-12 flex justify-center">
          <svg
            ref={pen}
            viewBox="0 0 200 90"
            className="h-20 w-44 fill-none stroke-gold"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M40 75 L150 20" />
            <path d="M150 20 L172 14 L166 36 Z" />
            <path d="M40 75 L30 82 L52 72 Z" />
            <path d="M70 62 Q100 50 130 40" />
          </svg>
        </div>

        <form
          ref={form}
          onSubmit={submit}
          className="relative mb-12 rounded-3xl border border-gold/25 bg-cream/50 p-7"
        >
          <span className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-gold/40" />
          <span className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r border-t border-gold/40" />
          <span className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b border-l border-gold/40" />
          <span className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b border-r border-gold/40" />

          <label className="mb-4 block">
            <span className="mb-2 block font-sans text-xs uppercase tracking-[0.3em] text-gold">
              Nama
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tulis nama Anda"
              className="w-full rounded-xl border border-gold/30 bg-cream/60 px-4 py-3 font-sans text-ink outline-none transition-colors focus:border-gold"
            />
          </label>
          <label className="mb-5 block">
            <span className="mb-2 block font-sans text-xs uppercase tracking-[0.3em] text-gold">
              Ucapan & Doa
            </span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
              placeholder="Tuliskan harapan terbaik untuk kami..."
              className="w-full resize-none rounded-xl border border-gold/30 bg-cream/60 px-4 py-3 font-sans text-ink outline-none transition-colors focus:border-gold"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-gold py-3.5 font-sans text-sm uppercase tracking-[0.3em] text-cream transition-opacity hover:opacity-90"
          >
            Kirim Doa
          </button>
        </form>

        <div className="flex flex-col gap-4">
          {feed.map((m, i) => (
            <MessageItem key={`${m.name}-${i}`} data={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
