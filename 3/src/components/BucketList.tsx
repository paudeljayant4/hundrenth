import { useState, useCallback } from "react";

const items = [
  { text: "Watch the sunrise together", icon: "🌅" },
  { text: "Cook a meal from scratch", icon: "🍝" },
  { text: "Dance in the rain", icon: "🌧️" },
  { text: "Travel somewhere neither of us has been", icon: "✈️" },
  { text: "Write each other letters by hand", icon: "💌" },
  { text: "Stargaze from a rooftop", icon: "🌟" },
  { text: "Build a blanket fort", icon: "🏰" },
  { text: "Take a spontaneous road trip", icon: "🚗" },
  { text: "Plant something together and watch it grow", icon: "🌱" },
  { text: "Slow dance to our favorite song", icon: "💃" },
  { text: "Watch every movie on our shared list", icon: "🎬" },
  { text: "Make a time capsule for our future selves", icon: "⏳" },
];

export default function BucketList() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = useCallback((i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }, []);

  return (
    <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2">
      {items.map((item, i) => (
        <button
          key={item.text}
          onClick={() => toggle(i)}
          className={`group flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-500 sm:rounded-2xl sm:p-5 ${
            checked.has(i)
              ? "border-rose-400/30 bg-rose-500/10"
              : "border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06]"
          }`}
        >
          <span
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border text-base transition-all duration-300 sm:h-9 sm:w-9 sm:text-lg ${
              checked.has(i)
                ? "border-rose-400/40 bg-rose-500/20 scale-110"
                : "border-white/10 bg-white/5 group-hover:border-white/20"
            }`}
          >
            {checked.has(i) ? "✓" : item.icon}
          </span>
          <span
            className={`text-sm transition-all duration-300 sm:text-base ${
              checked.has(i)
                ? "text-rose-200 line-through decoration-rose-400/40"
                : "text-rose-100/60 group-hover:text-rose-100/80"
            }`}
          >
            {item.text}
          </span>
        </button>
      ))}
      <div className="col-span-full mt-2 text-center">
        <p className="text-xs text-rose-200/30">
          {checked.size} of {items.length} dreams checked off — so many more to go
        </p>
      </div>
    </div>
  );
}
