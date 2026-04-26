import { useEffect, useRef, useCallback } from "react";

export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const throttleRef = useRef(0);

  const spawn = useCallback((x: number, y: number) => {
    if (!containerRef.current) return;
    const now = Date.now();
    if (now - throttleRef.current < 80) return;
    throttleRef.current = now;

    const el = document.createElement("span");
    el.textContent = "♥";
    el.className = "cursor-trail-heart";
    el.style.cssText = `position:fixed;left:${x}px;top:${y}px;pointer-events:none;font-size:${10 + Math.random() * 8}px;color:rgba(255,95,143,${0.3 + Math.random() * 0.3});z-index:109;transition:all 0.8s ease-out;`;
    containerRef.current.appendChild(el);

    requestAnimationFrame(() => {
      el.style.transform = `translateY(-${30 + Math.random() * 40}px) rotate(${Math.random() * 40 - 20}deg) scale(0)`;
      el.style.opacity = "0";
    });

    setTimeout(() => el.remove(), 900);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => spawn(e.clientX, e.clientY);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [spawn]);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[109] overflow-hidden" />;
}
