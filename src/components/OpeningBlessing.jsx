import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  blessingColorStart,
  blessingColorEnd,
  blessingColorStagger,
} from "../constants/animationConfig";

gsap.registerPlugin(ScrollTrigger);

const ARABIC =
  "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً";
const TRANSLATION =
  "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri agar kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.";

function Chars({ text, className }) {
  return (
    <span className={className}>
      {[...text].map((ch, i) => (
        <span key={i} className="char inline-block" style={{ color: blessingColorStart }}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export default function OpeningBlessing() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".char", {
        color: blessingColorEnd,
        ease: "none",
        stagger: blessingColorStagger,
        scrollTrigger: {
          trigger: root.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-screen items-center justify-center bg-cream px-6 py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-10 font-sans text-xs tracking-[0.45em] uppercase text-gold">
          Salam Pembuka
        </p>
        <p
          dir="rtl"
          className="mb-10 font-serif text-3xl leading-loose md:text-4xl"
        >
          <Chars text={ARABIC} />
        </p>
        <p className="font-sans text-base leading-relaxed md:text-lg">
          <Chars text={TRANSLATION} />
        </p>
        <p className="mt-10 font-sans text-xs tracking-[0.3em] uppercase text-gold">
          QS. Ar-Rum · 30:21
        </p>
      </div>
    </section>
  );
}
