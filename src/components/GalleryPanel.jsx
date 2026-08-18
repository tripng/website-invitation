import { forwardRef } from "react";

const GalleryPanel = forwardRef(function GalleryPanel({ photo }, ref) {
  return (
    <article
      ref={ref}
      className="gallery-panel relative h-[58vh] w-[85vw] shrink-0 snap-center rounded-2xl overflow-hidden bg-ink md:h-[70vh] md:w-[80vw]"
    >
      <img
        className="gallery-photo absolute inset-0 -top-[15%] h-[130%] w-full object-cover"
        src={photo.src}
        alt={photo.title}
      />
      <div className="gallery-caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6 md:p-8">
        <p className="font-serif text-3xl text-cream md:text-4xl">{photo.title}</p>
        <p className="mt-2 font-sans text-sm uppercase tracking-[0.3em] text-gold-soft">
          {photo.location}
        </p>
      </div>
    </article>
  );
});

export default GalleryPanel;
