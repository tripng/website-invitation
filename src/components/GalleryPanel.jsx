import { forwardRef } from "react";
import { panelWidth } from "../constants/galleryConfig";

const GalleryPanel = forwardRef(function GalleryPanel(
  { photo },
  ref
) {
  return (
    <article
      ref={ref}
      className="gallery-panel relative shrink-0 h-[70vh] mx-4 rounded-2xl overflow-hidden bg-ink"
      style={{ width: `${panelWidth}vw` }}
    >
      <img
        className="gallery-photo absolute inset-0 w-full h-[130%] -top-[15%] object-cover"
        src={photo.src}
        alt={photo.title}
      />
      <div className="gallery-caption absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-ink/80 to-transparent">
        <p className="font-serif text-cream text-3xl md:text-4xl">
          {photo.title}
        </p>
        <p className="font-sans text-gold-soft text-sm tracking-[0.3em] uppercase mt-2">
          {photo.location}
        </p>
      </div>
    </article>
  );
});

export default GalleryPanel;
