import { useMemo } from "react";

export default function Sparkles() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: `${(i * 41 + 7) % 100}%`,
        y: `${(i * 29 + 11) % 100}%`,
        delay: `${(i * 0.8) % 6}s`,
        duration: `${1.5 + (i % 4) * 0.5}s`,
        size: 2 + (i % 3) * 2,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle absolute rounded-full"
          style={{
            left: s.x,
            top: s.y,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: `radial-gradient(circle, rgba(255,215,186,0.9) 0%, rgba(255,182,193,0.4) 50%, transparent 100%)`,
            animationDelay: s.delay,
            animationDuration: s.duration,
            animation: `star-twinkle ${s.duration} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
