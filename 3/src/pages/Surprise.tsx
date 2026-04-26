import { useEffect, useState, useCallback, useRef } from "react";
import StarField from "../components/StarField";
import FloatingHearts from "../components/FloatingHearts";
import ConfettiBurst from "../components/ConfettiBurst";
import TypewriterText from "../components/TypewriterText";
import ScrollReveal from "../components/ScrollReveal";
import Sparkles from "../components/Sparkles";
import ScrollProgress from "../components/ScrollProgress";
import CursorTrail from "../components/CursorTrail";
import BucketList from "../components/BucketList";

/* ─── data ─────────────────────────────────────────────── */
const timeline = [
  { icon: "💫", label: "Day 1", text: "Two strangers became something more." },
  { icon: "🌙", label: "Day 14", text: "Late nights talking felt like falling." },
  { icon: "☀️", label: "Day 30", text: "One month of butterflies that never settled." },
  { icon: "🌸", label: "Day 50", text: "Half a century of days, all better with you." },
  { icon: "⭐", label: "Day 75", text: "I stopped counting reasons and just loved you." },
  { icon: "💎", label: "Day 100", text: "Here — and more sure of us than ever." },
];

const reasons = [
  "Your laugh is my favorite sound",
  "You make silence comfortable",
  "You remember the little things",
  "The way you look at me",
  "You believe in me more than I do",
  "Your warmth on cold nights",
  "How you say my name",
  "Your courage when life is hard",
  "The way you hold my hand",
  "You make ordinary days magic",
  "Your kindness to strangers",
  "How you dance when you're happy",
  "The stories you tell",
  "Your patience with my flaws",
  "Waking up to your messages",
  "The way you care for everyone",
  "Your smile when you're sleepy",
  "How you make me want to be better",
  "The sound of your voice",
  "Every single moment with you",
];

/* ─── page ─────────────────────────────────────────────── */
export default function Surprise() {
  const [started, setStarted] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [likedReasons, setLikedReasons] = useState<Set<number>>(new Set());
  const [letterRevealed, setLetterRevealed] = useState(false);
  const scrollYRef = useRef(0);

  const handleStart = useCallback(() => {
    setStarted(true);
    setTimeout(() => setShowContent(true), 1200);
  }, []);

  const openLetter = useCallback(() => {
    scrollYRef.current = window.scrollY;
    document.body.classList.add("modal-open");
    document.body.style.top = `-${window.scrollY}px`;
    setLetterOpen(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 4500);
    setTimeout(() => setLetterRevealed(true), 600);
  }, []);

  const closeLetter = useCallback(() => {
    setLetterOpen(false);
    setLetterRevealed(false);
    document.body.classList.remove("modal-open");
    document.body.style.top = "";
    window.scrollTo(0, scrollYRef.current);
  }, []);

  const toggleLike = useCallback((index: number) => {
    setLikedReasons((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }, []);

  const [elapsed, setElapsed] = useState(() => getElapsed());
  useEffect(() => {
    const id = setInterval(() => setElapsed(getElapsed()), 1000);
    return () => clearInterval(id);
  }, []);

  const [toNext, setToNext] = useState(() => getCountdown(200));
  useEffect(() => {
    const id = setInterval(() => setToNext(getCountdown(200)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && letterOpen) closeLetter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [letterOpen, closeLetter]);

  return (
    <div className="relative">
      <ScrollProgress />
      <CursorTrail />

      {/* ─── WELCOME SCREEN ─────────────────────────────── */}
      <section
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0010] transition-all duration-[1200ms] ease-out ${
          started ? "pointer-events-none scale-110 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-hidden={started}
      >
        <StarField />
        <Sparkles />
        <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center sm:gap-8">
          <div className="relative pulse-ring">
            <span className="heartbeat-inline text-7xl sm:text-8xl md:text-9xl">💗</span>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.45em] text-rose-200/50 sm:text-sm">
            Something special is waiting for you
          </p>
          <button
            onClick={handleStart}
            className="group relative mt-2 overflow-hidden rounded-full border border-rose-300/25 bg-rose-500/8 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.3em] text-rose-100/90 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-rose-300/50 hover:bg-rose-500/15 hover:shadow-[0_0_60px_rgba(255,95,143,0.25)] sm:mt-4 sm:px-10 sm:py-4 sm:text-sm"
          >
            <span className="relative z-10">Tap to open</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-rose-400/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
        </div>
      </section>

      <ConfettiBurst active={confetti} />

      {/* ─── MAIN CONTENT ───────────────────────────────── */}
      <main
        className={`relative overflow-hidden bg-[#0a0010] text-white transition-opacity duration-1000 ${
          showContent ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,95,143,0.10),transparent_50%),radial-gradient(ellipse_at_80%_50%,rgba(168,85,247,0.07),transparent_40%),radial-gradient(ellipse_at_20%_80%,rgba(255,182,193,0.05),transparent_40%)]" />
        <StarField />

        {/* ═══ HERO ═══════════════════════════════════════ */}
        <section className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-5 py-10 sm:px-8 sm:py-16">
          <FloatingHearts />
          <ScrollReveal>
            <div className="relative mb-8 h-44 w-44 overflow-hidden rounded-full border border-rose-300/15 shadow-[0_0_80px_rgba(255,95,143,0.2),0_0_160px_rgba(255,95,143,0.08)] sm:mb-12 sm:h-60 sm:w-60 lg:h-72 lg:w-72">
              <img src="/images/us.jpg" alt="Us together" className="h-full w-full object-cover" loading="eager" draggable={false} />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#0a0010]/60 via-transparent to-[#0a0010]/20" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-rose-300/15 bg-rose-500/8 px-5 py-2 backdrop-blur-sm sm:mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-rose-200/80 sm:text-xs">100 Days Together</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <h1 className="max-w-4xl text-center text-5xl font-light leading-[1.05] tracking-tight text-white min-[390px]:text-6xl sm:text-7xl md:text-8xl lg:text-9xl" style={{ fontFamily: "var(--font-serif)" }}>
              For My{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-rose-200 via-pink-100 to-rose-300 bg-clip-text text-transparent">Favorite</span>
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-400/60 to-transparent sm:-bottom-2 sm:h-[3px]" />
              </span>{" "}
              Person
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={3}>
            <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-rose-100/50 sm:mt-8 sm:text-base lg:text-lg">
              I built this little universe just for you — because 100 days of loving you deserves so much more than a simple message.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={4}>
            <div className="mt-10 flex flex-col items-center gap-2 text-rose-200/30 sm:mt-16">
              <span className="text-[10px] uppercase tracking-[0.35em] sm:text-xs">Scroll down</span>
              <span className="scroll-bounce text-base sm:text-lg">↓</span>
            </div>
          </ScrollReveal>
        </section>

        <SectionDivider />

        {/* ═══ LOVE METER ═════════════════════════════════ */}
        <section className="relative z-10 px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.5em] text-rose-300/40 sm:text-xs">Our connection</p>
              <h2 className="text-4xl font-light text-white sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>How much do I love you?</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-rose-200/40">Let's measure it.</p>
            </ScrollReveal>
            <ScrollReveal delay={1}><LoveMeter /></ScrollReveal>
          </div>
        </section>

        <SectionDivider />

        {/* ═══ COUNTER ════════════════════════════════════ */}
        <section className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <ScrollReveal>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.5em] text-rose-300/40 sm:text-xs">Every second has been a gift</p>
              <h2 className="text-4xl font-light text-white sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: "var(--font-serif)" }}>Our love in numbers</h2>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 md:grid-cols-4">
                <CounterCard value={100} label="Days" icon="📅" />
                <CounterCard value={2400} label="Hours" icon="⏰" />
                <CounterCard value={144000} label="Minutes" icon="💕" />
                <CounterCard value={likedReasons.size || "∞"} label="Reasons" icon="💗" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <div className="mx-auto mt-8 grid max-w-md grid-cols-4 gap-2 rounded-2xl border border-white/8 bg-white/[0.03] p-4 backdrop-blur-sm sm:mt-12 sm:gap-3 sm:p-6">
                <TimeBlock value={elapsed.days} label="Days" />
                <TimeBlock value={elapsed.hours} label="Hours" />
                <TimeBlock value={elapsed.minutes} label="Min" />
                <TimeBlock value={elapsed.seconds} label="Sec" />
              </div>
              <p className="mt-4 text-[10px] tracking-[0.2em] text-rose-200/30 sm:text-xs">...and counting, every single second</p>
            </ScrollReveal>
          </div>
        </section>

        <SectionDivider />

        {/* ═══ TIMELINE ═══════════════════════════════════ */}
        <section className="relative z-10 px-5 py-16 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.5em] text-rose-300/40 sm:text-xs">How we got here</p>
              <h2 className="text-4xl font-light text-white sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>Our Timeline</h2>
            </ScrollReveal>
          </div>
          <div className="relative mx-auto mt-12 max-w-2xl sm:mt-20">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose-400/20 to-transparent sm:left-1/2 sm:-translate-x-px" />
            {timeline.map((item, i) => (
              <ScrollReveal key={item.label} delay={Math.min(i + 1, 5)}>
                <div className={`relative mb-8 flex items-start gap-5 last:mb-0 sm:mb-12 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  <div className="absolute left-6 top-4 z-10 -translate-x-1/2 sm:left-1/2 sm:top-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-rose-400/30 bg-[#0a0010] text-base shadow-[0_0_25px_rgba(255,95,143,0.15)] sm:h-12 sm:w-12 sm:text-lg">{item.icon}</div>
                  </div>
                  <div className={`ml-14 flex-1 sm:ml-0 sm:w-[calc(50%-40px)] ${i % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:pl-8 sm:text-left"}`}>
                    <div className="shimmer-line relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] p-4 backdrop-blur-sm transition-all duration-400 hover:border-rose-400/25 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(255,95,143,0.08)] sm:rounded-2xl sm:p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-300/80 sm:text-sm">{item.label}</p>
                      <p className="mt-2 text-sm leading-relaxed text-rose-100/60 sm:text-base lg:text-lg" style={{ fontFamily: "var(--font-serif)" }}>{item.text}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ═══ POEM ═══════════════════════════════════════ */}
        <section className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-xl text-center">
            <ScrollReveal>
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.5em] text-rose-300/40 sm:mb-10 sm:text-xs">A few words from my heart</p>
            </ScrollReveal>
            <div className="space-y-4 sm:space-y-6">
              {[
                "If I had a flower for every time",
                "you made me smile,",
                "I'd have an endless garden to walk through.",
                "But all I really need",
                "is the one who planted the seeds —",
                "that's you.",
              ].map((line, i) => (
                <ScrollReveal key={i} delay={Math.min(i + 1, 5)}>
                  <p className="text-xl font-light leading-snug text-rose-100/70 sm:text-2xl md:text-3xl" style={{ fontFamily: "var(--font-serif)" }}>{line}</p>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={4}>
              <div className="mx-auto mt-8 h-px w-20 bg-gradient-to-r from-transparent via-rose-400/30 to-transparent sm:mt-12" />
              <p className="mt-4 text-xs italic text-rose-200/30 sm:text-sm" style={{ fontFamily: "var(--font-serif)" }}>— written for you, always</p>
            </ScrollReveal>
          </div>
        </section>

        <SectionDivider />

        {/* ═══ REASONS ════════════════════════════════════ */}
        <section className="relative z-10 px-5 py-16 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-5xl text-center">
            <ScrollReveal>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.5em] text-rose-300/40 sm:text-xs">Tap the ones you love</p>
              <h2 className="text-4xl font-light text-white sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>20 Reasons I Love You</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-rose-200/40">There are a million more, but here are a few to start.</p>
            </ScrollReveal>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((reason, i) => (
                <ScrollReveal key={reason} delay={Math.min((i % 4) + 1, 5)}>
                  <button
                    onClick={() => toggleLike(i)}
                    className={`group relative w-full overflow-hidden rounded-xl border p-4 text-left transition-all duration-500 sm:rounded-2xl sm:p-5 ${
                      likedReasons.has(i) ? "border-rose-400/40 bg-rose-500/12 shadow-[0_0_40px_rgba(255,95,143,0.12)]" : "border-white/8 bg-white/[0.03] hover:border-rose-400/20 hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className={`mb-2 inline-block text-lg transition-all duration-300 sm:mb-3 sm:text-xl ${likedReasons.has(i) ? "scale-110" : "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"}`}>💕</span>
                    <p className={`text-xs leading-relaxed transition-colors duration-300 sm:text-sm ${likedReasons.has(i) ? "text-rose-100" : "text-rose-200/50"}`}>{reason}</p>
                    {likedReasons.has(i) && <span className="absolute right-3 top-3 text-[10px] font-bold text-rose-400">♥</span>}
                  </button>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={2}>
              <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-rose-400/15 bg-rose-500/8 px-5 py-2.5 backdrop-blur-sm sm:mt-12">
                <span className="text-base sm:text-lg">💗</span>
                <span className="text-xs text-rose-100/70 sm:text-sm">
                  You've liked <span className="font-bold text-white">{likedReasons.size}</span>{" "}
                  {likedReasons.size === 1 ? "reason" : "reasons"}
                </span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <SectionDivider />

        {/* ═══ BUCKET LIST ════════════════════════════════ */}
        <section className="relative z-10 px-5 py-16 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.5em] text-rose-300/40 sm:text-xs">Our future together</p>
              <h2 className="text-4xl font-light text-white sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>Things I Want To Do With You</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-rose-200/40">Check off the ones we've done — or the ones you want to do next.</p>
            </ScrollReveal>
            <ScrollReveal delay={1}><BucketList /></ScrollReveal>
          </div>
        </section>

        <SectionDivider />

        {/* ═══ NEXT MILESTONE ═════════════════════════════ */}
        <section className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.5em] text-rose-300/40 sm:text-xs">Looking ahead</p>
              <h2 className="text-4xl font-light text-white sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>Until Day 200</h2>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <div className="mx-auto mt-8 flex max-w-lg items-center justify-center gap-4 sm:mt-12 sm:gap-6">
                <MilestoneBlock value={toNext.days} label="Days" />
                <span className="text-2xl text-rose-400/30">:</span>
                <MilestoneBlock value={toNext.hours} label="Hours" />
                <span className="text-2xl text-rose-400/30">:</span>
                <MilestoneBlock value={toNext.minutes} label="Min" />
                <span className="text-2xl text-rose-400/30">:</span>
                <MilestoneBlock value={toNext.seconds} label="Sec" />
              </div>
              <p className="mt-6 text-sm text-rose-200/40" style={{ fontFamily: "var(--font-serif)" }}>Every second closer to more memories with you.</p>
            </ScrollReveal>
          </div>
        </section>

        <SectionDivider />

        {/* ═══ ENVELOPE ═══════════════════════════════════ */}
        <section className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <button type="button" className="gentle-float group relative mx-auto mb-8 block h-40 w-56 cursor-pointer overflow-hidden rounded-2xl border-0 p-0 sm:mb-12 sm:h-52 sm:w-72" onClick={openLetter} aria-label="Open your love letter">
                <img src="/images/envelope.jpg" alt="A sealed love letter" className="h-full w-full object-cover shadow-[0_20px_80px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105" loading="lazy" draggable={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0010]/80 via-[#0a0010]/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded-full bg-white/12 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/90 backdrop-blur-sm transition-all group-hover:bg-white/22 sm:px-6 sm:py-3 sm:text-xs">Tap to open</span>
                </div>
              </button>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <h2 className="text-4xl font-light text-white sm:text-5xl md:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>I wrote you something</h2>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-rose-200/40 sm:text-base">
                A letter I've been meaning to give you — sealed with 100 days of love, laughter, and everything in between.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══ FOOTER ═════════════════════════════════════ */}
        <footer className="relative z-10 border-t border-white/5 px-5 py-14 text-center sm:px-8 sm:py-20">
          <ScrollReveal>
            <p className="text-4xl sm:text-5xl">💗</p>
            <p className="mt-5 text-xl text-white/60 sm:mt-6 sm:text-2xl" style={{ fontFamily: "var(--font-serif)" }}>Happy 100th day, my love.</p>
            <p className="mt-2 text-xs text-rose-200/25 sm:text-sm">Here's to the next 100 — and every one after that.</p>
            <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-rose-400/20 to-transparent" />
            <p className="mt-4 text-[10px] text-rose-200/15 sm:text-xs">Made with all my heart, just for you</p>
          </ScrollReveal>
        </footer>
      </main>

      {/* ─── LETTER MODAL ───────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/75 px-3 py-4 backdrop-blur-2xl transition-all duration-700 sm:px-5 sm:py-8 ${letterOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={(e) => e.target === e.currentTarget && closeLetter()}
        role="dialog" aria-modal="true" aria-label="Love letter"
      >
        <div className={`relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-[#1a0a14] via-[#100610] to-[#0a0010] p-5 shadow-[0_40px_140px_rgba(255,95,143,0.12)] transition-all duration-700 sm:max-h-[calc(100dvh-4rem)] sm:rounded-[2rem] sm:p-10 ${letterOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-12 scale-90 opacity-0"}`}>
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-rose-500/8 blur-3xl sm:-right-16 sm:-top-16 sm:h-48 sm:w-48" />
          <div className="pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-purple-500/8 blur-3xl sm:-bottom-20 sm:-left-16 sm:h-56 sm:w-56" />

          <div className={`relative transition-all duration-1000 ${letterRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <button onClick={closeLetter} className="absolute -right-1 -top-1 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/8 bg-white/[0.04] text-white/40 transition-colors hover:bg-white/10 hover:text-white sm:right-0 sm:top-0 sm:h-10 sm:w-10" aria-label="Close letter">✕</button>
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-600 shadow-[0_0_40px_rgba(255,95,143,0.25)] sm:mb-8 sm:h-16 sm:w-16"><span className="text-xl sm:text-2xl">💌</span></div>
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-rose-400/70 sm:text-xs">A letter for you</p>
            <h2 className="mt-5 text-center text-3xl font-light leading-snug text-white min-[390px]:text-4xl sm:mt-6 sm:text-5xl" style={{ fontFamily: "var(--font-serif)" }}>
              {letterRevealed && <TypewriterText text="One hundred days, and I am still amazed by you." delay={500} speed={30} />}
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-rose-100/60 sm:mt-10 sm:space-y-5 sm:text-base sm:leading-8" style={{ fontFamily: "var(--font-serif)" }}>
              <p>If I could save one thing from these 100 days, it would be the way you make time feel less like a clock and more like a place I want to stay.</p>
              <p>You walked into my life and made everything softer — the hard days, the quiet days, and all the ordinary ones in between. With you, even silence feels full.</p>
              <p>Thank you for being unapologetically you. Thank you for choosing me. Thank you for making 100 days feel like the start of something that will last forever.</p>
              <p className="pt-2 text-lg text-rose-200/80 sm:text-xl" style={{ fontFamily: "var(--font-serif)" }}>I love you — today, tomorrow, and every day after.</p>
            </div>
            <div className="mt-8 flex flex-col gap-4 border-t border-white/8 pt-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-rose-400/40 sm:text-xs">Forever yours</p>
                <p className="mt-1 text-base text-white sm:text-lg" style={{ fontFamily: "var(--font-serif)" }}>Happy 100th Day 💗</p>
              </div>
              <button onClick={closeLetter} className="rounded-full border border-white/8 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 transition-all hover:border-rose-400/25 hover:bg-rose-500/10 hover:text-white sm:text-xs">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── sub-components ───────────────────────────────────── */
function SectionDivider() {
  return (
    <div className="relative z-10 mx-auto flex items-center justify-center gap-3 py-2">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-400/20" />
      <span className="text-[8px] text-rose-400/20">♥</span>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-rose-400/20" />
    </div>
  );
}

function CounterCard({ value, label, icon }: { value: number | string; label: string; icon: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4 backdrop-blur-sm transition-all duration-400 hover:border-rose-400/20 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(255,95,143,0.06)] sm:rounded-2xl sm:p-6">
      <span className="text-xl sm:text-2xl">{icon}</span>
      <p className="mt-2 text-3xl font-light text-white sm:mt-3 sm:text-4xl md:text-5xl" style={{ fontFamily: "var(--font-serif)" }}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-rose-200/30 sm:mt-1 sm:text-xs">{label}</p>
    </div>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <p className="font-mono text-2xl font-light tabular-nums text-white sm:text-3xl md:text-4xl">{String(value).padStart(2, "0")}</p>
      <p className="mt-0.5 text-[9px] uppercase tracking-[0.3em] text-rose-200/30 sm:mt-1 sm:text-[10px]">{label}</p>
    </div>
  );
}

function MilestoneBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/8 backdrop-blur-sm sm:h-20 sm:w-20">
        <span className="font-mono text-2xl font-light tabular-nums text-white sm:text-3xl">{String(value).padStart(2, "0")}</span>
      </div>
      <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-rose-200/30 sm:text-[10px]">{label}</p>
    </div>
  );
}

function LoveMeter() {
  const [fill, setFill] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start: number | null = null;
        const duration = 3000;
        const step = (ts: number) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          setFill(Math.round(100 * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="mx-auto mt-8 max-w-md sm:mt-12">
      <div className="relative h-6 overflow-hidden rounded-full border border-white/10 bg-white/5 sm:h-8">
        <div className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-400 to-rose-300 transition-all duration-100" style={{ width: `${fill}%` }}>
          <div className="absolute inset-0 overflow-hidden rounded-full"><div className="shimmer-line absolute inset-0" /></div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-rose-200/40 sm:text-sm">
        <span>Not enough words</span>
        <span className="font-bold text-rose-300">{fill}%</span>
        <span>∞ and beyond</span>
      </div>
      {fill >= 100 && <p className="mt-3 text-sm text-rose-300/80" style={{ fontFamily: "var(--font-serif)" }}>...and it still overflows. 💗</p>}
    </div>
  );
}

/* ─── utils ────────────────────────────────────────────── */
function getElapsed() {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - 100);
  start.setHours(0, 0, 0, 0);
  const diff = now.getTime() - start.getTime();
  const total = Math.floor(diff / 1000);
  return { days: Math.floor(total / 86400), hours: Math.floor((total % 86400) / 3600), minutes: Math.floor((total % 3600) / 60), seconds: total % 60 };
}

function getCountdown(targetDays: number) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - 100);
  start.setHours(0, 0, 0, 0);
  const target = new Date(start);
  target.setDate(target.getDate() + targetDays);
  const diff = Math.max(target.getTime() - now.getTime(), 0);
  const total = Math.floor(diff / 1000);
  return { days: Math.floor(total / 86400), hours: Math.floor((total % 86400) / 3600), minutes: Math.floor((total % 3600) / 60), seconds: total % 60 };
}
