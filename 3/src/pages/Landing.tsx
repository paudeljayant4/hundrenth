import { useEffect, useState, useCallback } from "react";
import StarField from "../components/StarField";
import Sparkles from "../components/Sparkles";

const messages = [
  "Someone who loves you very much made this.",
  "It took 100 days to earn this page.",
  "There's a surprise waiting inside.",
  "Are you ready?",
];

export default function Landing() {
  const [phase, setPhase] = useState(0);
  const [fade, setFade] = useState(true);
  const [typed, setTyped] = useState("");
  const [showButton, setShowButton] = useState(false);

  const goToSurprise = useCallback(() => {
    window.location.hash = "#/100days";
  }, []);

  /* auto-advance messages */
  useEffect(() => {
    if (phase >= messages.length) {
      setShowButton(true);
      return;
    }
    const current = messages[phase];
    setTyped("");
    setFade(true);

    let charIndex = 0;
    let fadeTimeout: ReturnType<typeof setTimeout> | undefined;
    let phaseTimeout: ReturnType<typeof setTimeout> | undefined;

    const typeInterval = setInterval(() => {
      charIndex++;
      setTyped(current.slice(0, charIndex));
      if (charIndex >= current.length) {
        clearInterval(typeInterval);
        fadeTimeout = setTimeout(() => {
          setFade(false);
          phaseTimeout = setTimeout(() => setPhase((p) => p + 1), 600);
        }, 1800);
      }
    }, 45);

    return () => {
      clearInterval(typeInterval);
      if (fadeTimeout) clearTimeout(fadeTimeout);
      if (phaseTimeout) clearTimeout(phaseTimeout);
    };
  }, [phase]);

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[#0a0010] px-6">
      <StarField />
      <Sparkles />

      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,95,143,0.08),transparent_60%)]" />

      <div className="relative z-10 flex max-w-lg flex-col items-center gap-10 text-center">
        {/* small heart pulse */}
        <span className="heartbeat-inline text-5xl sm:text-6xl">💗</span>

        {/* message area */}
        <div className="min-h-[100px]">
          {!showButton && (
            <p
              className={`text-lg font-light leading-relaxed text-rose-100/70 transition-opacity duration-500 sm:text-xl ${
                fade ? "opacity-100" : "opacity-0"
              }`}
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {typed}
              {typed.length < messages[phase]?.length && (
                <span className="inline-block w-[2px] h-[1em] bg-current ml-0.5 animate-pulse align-middle" />
              )}
            </p>
          )}

          {showButton && (
            <div className="flex flex-col items-center gap-6 animate-[reveal-up_0.8s_ease-out_forwards]">
              <p
                className="text-3xl font-light text-white sm:text-4xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                This is for you.
              </p>
              <button
                onClick={goToSurprise}
                className="group relative overflow-hidden rounded-full border border-rose-300/25 bg-rose-500/10 px-10 py-4 text-sm font-medium uppercase tracking-[0.3em] text-rose-100 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-rose-300/50 hover:bg-rose-500/20 hover:shadow-[0_0_60px_rgba(255,95,143,0.3)]"
              >
                <span className="relative z-10">Open your surprise</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-rose-400/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
              <p className="text-[10px] uppercase tracking-[0.4em] text-rose-200/25 sm:text-xs">
                100 days & counting
              </p>
            </div>
          )}
        </div>

        {/* skip link */}
        {!showButton && (
          <button
            onClick={() => { setPhase(messages.length); setShowButton(true); }}
            className="text-[10px] uppercase tracking-[0.3em] text-rose-200/20 transition-colors hover:text-rose-200/40 sm:text-xs"
          >
            Skip intro →
          </button>
        )}
      </div>
    </section>
  );
}
