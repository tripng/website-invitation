import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  profileParallax,
  profileRevealDuration,
  profileRevealDistance,
  profileScale,
  profileClipDuration,
  profileDividerDuration,
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

function ProfileCard({ data, side }) {
  const card = useRef(null);
  const photo = useRef(null);
  const clip = useRef(null);
  const label = useRef(null);
  const name = useRef(null);
  const parent = useRef(null);
  const quote = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fromX = side === "left" ? -profileRevealDistance : profileRevealDistance;
      const texts = [label.current, name.current, parent.current, quote.current];

      gsap.set(card.current, { xPercent: fromX, opacity: 0, scale: 0.92 });
      gsap.set(clip.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(photo.current, { scale: profileScale });
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
        scale: 1,
        duration: profileRevealDuration,
        ease: "power3.out",
      })
        .to(clip.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: profileClipDuration,
          ease: "power4.out",
        }, 0)
        .to(photo.current, {
          scale: 1,
          duration: profileClipDuration,
          ease: "power3.out",
        }, 0)
        .to(texts, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
        }, 0.25);

      gsap.fromTo(
        photo.current,
        { yPercent: -profileParallax },
        {
          yPercent: profileParallax,
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
      const onEnter = () =>
        gsap.to(photo.current, { scale: 1.06, duration: 0.6, ease: "power2.out" });
      const onLeave = () =>
        gsap.to(photo.current, { scale: 1, duration: 0.6, ease: "power2.out" });
      node.addEventListener("pointerenter", onEnter);
      node.addEventListener("pointerleave", onLeave);

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      return () => {
        window.removeEventListener("load", onLoad);
        node.removeEventListener("pointerenter", onEnter);
        node.removeEventListener("pointerleave", onLeave);
      };
    }, card);
    return () => ctx.revert();
  }, [side]);

  return (
    <article ref={card} className="relative flex flex-col items-center text-center">
      <div
        ref={clip}
        className="relative h-80 w-64 overflow-hidden rounded-sm md:h-96 md:w-72"
        style={{ clipPath: "inset(0 100% 0 0)" }}
      >
        <img
          ref={photo}
          src={`https://picsum.photos/seed/${data.seed}/640/800`}
          alt={data.name}
          className="h-[120%] w-full object-cover"
        />
      </div>
      <p ref={label} className="mt-8 font-sans text-xs tracking-[0.4em] uppercase text-gold">
        {data.label}
      </p>
      <h3 ref={name} className="mt-3 font-serif text-4xl text-ink md:text-5xl">
        {data.name}
      </h3>
      <p ref={parent} className="mt-4 font-sans text-sm text-ink-soft">
        {data.parent}
      </p>
      <p ref={quote} className="mt-6 font-serif text-base italic text-ink-soft">
        “{data.quote}”
      </p>
    </article>
  );
}

export default function CoupleProfile() {
  const divider = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(divider.current, { scaleX: 0, opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: divider.current,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true,
        },
      });
      tl.to(divider.current, {
        scaleX: 1,
        opacity: 1,
        duration: profileDividerDuration,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-cream px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <p className="mb-16 text-center font-sans text-xs tracking-[0.45em] uppercase text-gold">
          Groom &amp; Bride
        </p>
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-12">
          <ProfileCard data={GROOM} side="left" />
          <ProfileCard data={BRIDE} side="right" />
        </div>
        <div
          ref={divider}
          className="mx-auto mt-24 h-px w-40 origin-center bg-gold/60"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  );
}
