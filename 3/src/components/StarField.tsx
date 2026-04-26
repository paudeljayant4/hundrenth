import { useMemo } from "react";

export default function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: `${(i * 47 + 13) % 100}%`,
        y: `${(i * 31 + 7) % 100}%`,
        size: 1 + (i % 3),
        delay: `${(i * 0.7) % 5}s`,
        duration: `${2 + (i % 4) * 0.8}s`,
        opacity: 0.3 + (i % 5) * 0.15,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star-twinkle absolute rounded-full bg-white"
          style={{
            left: star.x,
            top: star.y,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
            animationDuration: star.duration,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}
