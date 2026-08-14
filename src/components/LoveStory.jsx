import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  loveLineWidth,
  loveNodeDistance,
  loveRevealDuration,
  loveYearPop,
  eventLabelStagger,
} from "../constants/animationConfig";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "2020",
    title: "Awal Bertemu",
    text: "Di sebuah kafe kecil di Jakarta, obrolan sore yang tak terasa jadi berjam-jam.",
    side: "left",
  },
  {
    year: "2021",
    title: "Jadian",
    text: "Setelah setahun berteman, kami sepakat menulis cerita yang sama.",
    side: "right",
  },
  {
    year: "2025",
    title: "Lamaran",
    text: "Di bawah langit Bali, satu pertanyaan kecil mengubah segalanya.",
    side: "left",
  },
  {
    year: "2026",
    title: "Hari Bahagia",
    text: "Dan kini kami mengundangmu untuk menjadi saksi janji kami.",
    side: "right",
  },
];

function StoryNode({ data }) {
  const node = useRef(null);
  const year = useRef(null);
  const title = useRef(null);
  const text = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const fromX = data.side === "left" ? -loveNodeDistance : loveNodeDistance;
      gsap.set(node.current, isMobile ? { yPercent: 40, opacity: 0 } : { xPercent: fromX, opacity: 0 });
      gsap.set([year.current, title.current, text.current], { y: 24, opacity: 0 });
      gsap.set(dot.current, { scale: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: node.current,
          start: "top 80%",
          end: "bottom 30%",
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true,
        },
      });

      tl.to(node.current, isMobile
        ? { yPercent: 0, opacity: 1, duration: loveRevealDuration, ease: "power3.out" }
        : { xPercent: 0, opacity: 1, duration: loveRevealDuration, ease: "power3.out" })
        .to(dot.current, { scale: 1, duration: 0.5, ease: "back.out(2)" }, 0)
        .to(year.current, { y: 0, opacity: 1, scale: 1, duration: loveYearPop, ease: "power3.out" }, 0.15)
        .to([title.current, text.current], { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1 }, 0.3);

      gsap.fromTo(
        node.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: node.current, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        }
      );
    }, node);
    return () => ctx.revert();
  }, [data.side]);

  const isLeft = data.side === "left";

  return (
    <div className="relative flex items-center md:gap-12">
      <div
        ref={node}
        className={`w-full md:w-[44%] ${isLeft ? "md:ml-0 md:mr-auto text-left" : "md:ml-auto md:mr-0 text-right"}`}
      >
        <p ref={year} className="font-serif text-5xl text-gold md:text-6xl">
          {data.year}
        </p>
        <h3 ref={title} className="mt-2 font-serif text-2xl text-ink">
          {data.title}
        </h3>
        <p ref={text} className="mt-3 font-sans text-sm leading-relaxed text-ink-soft">
          {data.text}
        </p>
      </div>
      <span
        ref={dot}
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-cream md:block"
      />
    </div>
  );
}

export default function LoveStory() {
  const section = useRef(null);
  const heading = useRef(null);
  const line = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([...heading.current.children], { yPercent: 110, opacity: 0 });
      gsap.set(line.current, { scaleY: 0, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: heading.current, start: "top 90%", once: true },
      });
      tl.to([...heading.current.children], {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: eventLabelStagger,
      });

      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "top 60%", end: "bottom 70%", scrub: true, invalidateOnRefresh: true },
        }
      );
      gsap.fromTo(line.current, { opacity: 0 }, { opacity: 1, duration: 0.4, scrollTrigger: { trigger: section.current, start: "top 60%", once: true } });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative overflow-hidden bg-cream px-6 py-28">
      <div className="relative mx-auto max-w-4xl">
        <p ref={heading} className="mb-20 flex justify-center gap-1.5 font-sans text-xs tracking-[0.45em] uppercase text-gold">
          {[..."Love Story"].map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="inline-block">{ch === " " ? " " : ch}</span>
            </span>
          ))}
        </p>
        <div className="relative flex flex-col gap-24">
          <span
            ref={line}
            aria-hidden="true"
            className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 origin-top bg-gradient-to-b from-gold/70 to-gold/10 md:block"
            style={{ width: loveLineWidth, transform: "scaleY(0)" }}
          />
          {MILESTONES.map((m, i) => (
            <StoryNode key={i} data={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
