import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  profileParallax,
  profileRevealDuration,
  profileRevealDistance,
} from "../constants/animationConfig";

gsap.registerPlugin(ScrollTrigger);

const GROOM = {
  seed: "groom-portrait",
  label: "The Groom",
  name: "Jonathan",
  parent: "Putra dari Bpk. & Ibu Tanuwijaya",
  quote: "Senyummu adalah doa yang terjawab.",
};

const BRIDE = {
  seed: "bride-portrait",
  label: "The Bride",
  name: "Amelia",
  parent: "Putri dari Bpk. & Ibu Halim",
  quote: "Bersamamu, rumah adalah wherever.",
};

function Card({ data, side }) {
  const card = useRef(null);
  const photo = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fromX = side === "left" ? -profileRevealDistance : profileRevealDistance;
      gsap.fromTo(
        card.current,
        { xPercent: fromX, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: profileRevealDuration,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: card.current, start: "top 80%", once: true },
        }
      );
      gsap.from(photo.current, {
        yPercent: profileParallax,
        ease: "none",
        scrollTrigger: {
          trigger: card.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, card);
    return () => ctx.revert();
  }, [side]);

  return (
    <article ref={card} className="flex flex-col items-center text-center">
      <div className="relative h-80 w-64 overflow-hidden rounded-sm md:h-96 md:w-72">
        <img
          ref={photo}
          src={`https://picsum.photos/seed/${data.seed}/640/800`}
          alt={data.name}
          className="h-[115%] w-full object-cover"
        />
      </div>
      <p className="mt-8 font-sans text-xs tracking-[0.4em] uppercase text-gold">
        {data.label}
      </p>
      <h3 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
        {data.name}
      </h3>
      <p className="mt-4 font-sans text-sm text-ink-soft">{data.parent}</p>
      <p className="mt-6 font-serif text-base italic text-ink-soft">
        “{data.quote}”
      </p>
    </article>
  );
}

export default function CoupleProfile() {
  return (
    <section className="relative bg-cream px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <p className="mb-16 text-center font-sans text-xs tracking-[0.45em] uppercase text-gold">
          Groom &amp; Bride
        </p>
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-12">
          <Card data={GROOM} side="left" />
          <Card data={BRIDE} side="right" />
        </div>
      </div>
    </section>
  );
}
