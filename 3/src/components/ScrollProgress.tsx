import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[110] h-[3px] bg-white/5">
      <div
        className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-rose-300 transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
      {progress > 2 && (
        <div
          className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent to-white/30 blur-sm"
          style={{ left: `calc(${progress}% - 32px)` }}
        />
      )}
    </div>
  );
}
