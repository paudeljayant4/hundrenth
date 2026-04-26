import { useMemo } from "react";

const colors = [
  "#ff5f8f", "#ff9a9e", "#fecfef", "#fbc2eb",
  "#a18cd1", "#f6d5f7", "#ffdde1", "#ee9ca7",
  "#fcb69f", "#ffecd2", "#f8b500", "#ff6b81",
  "#ffd1ff", "#c9b1ff", "#ffb3c6", "#fff1e6",
];

export default function ConfettiBurst({ active }: { active: boolean }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        color: colors[i % colors.length],
        left: `${(i * 37 + 11) % 100}%`,
        delay: `${(i % 18) * 0.07}s`,
        duration: `${2.2 + (i % 6) * 0.4}s`,
        size: 4 + (i % 5) * 3,
        drift: ((i % 21) - 10) * 15,
        shape: i % 3,
      })),
    []
  );

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece absolute"
          style={{
            left: p.left,
            top: "-12px",
            animationDelay: p.delay,
            "--confetti-duration": p.duration,
            "--drift": `${p.drift}px`,
            width: `${p.size}px`,
            height: p.shape === 0 ? `${p.size}px` : `${p.size * 2.5}px`,
            backgroundColor: p.color,
            borderRadius: p.shape === 0 ? "50%" : p.shape === 1 ? "2px" : "0",
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
