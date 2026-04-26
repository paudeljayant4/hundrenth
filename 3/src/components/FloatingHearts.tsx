import { useMemo } from "react";

export default function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 29 + 5) % 100}%`,
        delay: `${(i * 1.3) % 12}s`,
        duration: `${10 + (i % 5) * 3}s`,
        size: 10 + (i % 4) * 6,
        opacity: 0.12 + (i % 3) * 0.08,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart absolute text-rose-300"
          style={{
            left: heart.left,
            bottom: "-20px",
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
