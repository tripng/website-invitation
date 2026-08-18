import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  galleryPhotos,
  horizontalEase,
  captionRevealDuration,
  captionRevealEase,
  parallaxDepth,
} from "../constants/galleryConfig";
import GalleryPanel from "./GalleryPanel";

gsap.registerPlugin(ScrollTrigger);

export default function PreWeddingGallery() {
  const section = useRef(null);
  const track = useRef(null);
  const progress = useRef(null);
  const panels = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const horizontalTween = gsap.to(track.current, {
        x: () => -(track.current.scrollWidth - window.innerWidth),
        ease: horizontalEase,
        scrollTrigger: {
          trigger: section.current,
          pin: true,
          scrub: 1,
          end: () => `+=${track.current.scrollWidth - window.innerWidth}`,
          onUpdate: (self) =>
            gsap.set(progress.current, { scaleX: self.progress }),
        },
      });

      panels.current.forEach((panel) => {
        const photo = panel.querySelector(".gallery-photo");
        const caption = panel.querySelector(".gallery-caption");
        gsap.fromTo(
          photo,
          { yPercent: -parallaxDepth },
          {
            yPercent: parallaxDepth,
            ease: horizontalEase,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
        gsap.from(caption, {
          yPercent: 60,
          opacity: 0,
          duration: captionRevealDuration,
          ease: captionRevealEase,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalTween,
            start: "left center",
            toggleActions: "play reverse play reverse",
          },
        });
      });

      return () => horizontalTween.scrollTrigger.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-ink py-16 md:h-screen md:py-0"
    >
      <div
        ref={track}
        className="flex items-center gap-4 overflow-x-auto px-4 will-change-transform snap-x snap-mandatory md:gap-0 md:overflow-visible md:px-0 md:snap-none"
      >
        {galleryPhotos.map((photo, index) => (
          <GalleryPanel
            key={photo.src}
            photo={photo}
            index={index}
            ref={(el) => (panels.current[index] = el)}
          />
        ))}
      </div>
      <div className="absolute bottom-8 left-1/2 hidden w-1/2 -translate-x-1/2 md:block">
        <span className="block h-px w-full bg-cream/20">
          <span
            ref={progress}
            className="block h-full w-full origin-left bg-gold scale-x-0"
          />
        </span>
      </div>
    </section>
  );
}
