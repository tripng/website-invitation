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
    const ctx = gsap.context(() => {
      const horizontalTween = gsap.to(track.current, {
        xPercent: -100 * (galleryPhotos.length - 1),
        ease: horizontalEase,
        scrollTrigger: {
          trigger: section.current,
          pin: true,
          scrub: 1,
          end: () => `+=${track.current.scrollWidth}`,
          onUpdate: (self) =>
            gsap.set(progress.current, {
              scaleX: self.progress,
            }),
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
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative h-screen overflow-hidden bg-ink flex items-center"
    >
      <div
        ref={track}
        className="flex items-center will-change-transform"
        style={{ width: `${galleryPhotos.length * 90}vw` }}
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-1/2 h-px bg-cream/20">
        <span
          ref={progress}
          className="block h-full w-full origin-left bg-gold scale-x-0"
        />
      </div>
    </section>
  );
}
