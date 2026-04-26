import ScrollReveal from "./ScrollReveal";

import { asset } from "../utils/asset";

const photos = [
  { src: asset("/images/us.jpg"), caption: "The moment I knew", rotate: -2 },
  { src: asset("/images/memory1.jpg"), caption: "Our quiet walks", rotate: 1 },
  { src: asset("/images/memory2.jpg"), caption: "Your favorite laugh", rotate: -1 },
  { src: asset("/images/memory3.jpg"), caption: "Under the same stars", rotate: 2 },
  { src: asset("/images/couple2.jpg"), caption: "Chasing sunsets", rotate: -1.5 },
  { src: asset("/images/couple-silhouette.jpg"), caption: "Just us, always", rotate: 1.5 },
];

export default function PhotoGallery() {
  return (
    <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5 lg:gap-6">
      {photos.map((photo, i) => (
        <ScrollReveal key={photo.src} delay={Math.min(i + 1, 5)}>
          <div
            className="group relative aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl"
            style={{ transform: `rotate(${photo.rotate}deg)` }}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p
                className="text-sm font-light text-white sm:text-base"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {photo.caption}
              </p>
            </div>
            {/* tape effect */}
            <div className="absolute -left-1 top-2 h-5 w-8 -rotate-6 bg-white/10 backdrop-blur-sm" />
            <div className="absolute -right-1 bottom-2 h-5 w-8 rotate-6 bg-white/10 backdrop-blur-sm" />
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
