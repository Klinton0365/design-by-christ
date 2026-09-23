"use client";

import { useRef } from "react";

export default function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  function toggle() {
    const html = document.documentElement;
    const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
    html.setAttribute("data-theme", next);
    buttonRef.current?.setAttribute("aria-checked", String(next === "light"));
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private browsing / storage disabled — theme just won't persist */
    }
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      role="switch"
      aria-checked="false"
      aria-label="Toggle light and dark mode"
      onClick={toggle}
      className="theme-toggle group relative inline-flex h-11 w-[84px] shrink-0 items-center rounded-full border border-gold/40 bg-surface px-1.5"
    >
      {/* ambient glow across the whole track when lit */}
      <span
        aria-hidden
        className="theme-toggle-track pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500"
        style={{ boxShadow: "inset 0 0 18px rgba(233,200,120,0.4)" }}
      />

      {/* faint cord + ceiling cap, evokes the pendant lamp from the monogram */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 -translate-y-full bg-gold/40"
      />

      {/* sparkle rays, only visible when lit */}
      <span
        aria-hidden
        className="theme-toggle-sparkle pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300"
      >
        {[0, 45, 90, 135].map((deg) => (
          <span
            key={deg}
            className="absolute left-1/2 top-1/2 h-[14px] w-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-light"
            style={{ transform: `translate(-50%,-50%) rotate(${deg}deg) translateY(-13px)` }}
          />
        ))}
      </span>

      {/* the knob — a little bulb that switches on/off */}
      <span
        aria-hidden
        className="theme-toggle-knob glow-gold-sm relative z-10 flex h-8 w-8 translate-x-0 items-center justify-center rounded-full bg-dark text-gold/60 transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4">
          <path
            className="theme-toggle-bulb"
            d="M12 3a6 6 0 0 0-3.6 10.8c.5.4.8 1 .8 1.7v.7h5.6v-.7c0-.7.3-1.3.8-1.7A6 6 0 0 0 12 3Z"
            fill="none"
            fillOpacity="0"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M9.8 18.2h4.4M10.4 20.4h3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
    </button>
  );
}
