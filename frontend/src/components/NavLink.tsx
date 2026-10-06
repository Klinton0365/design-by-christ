"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

export default function NavLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const [phase, setPhase] = useState<"idle" | "entering" | "leaving">("idle");

  return (
    <Link
      href={href}
      className={`inline-block ${className}`}
      onMouseEnter={() => setPhase("entering")}
      onMouseLeave={() => setPhase("leaving")}
    >
      <span className="relative inline-block whitespace-nowrap">
        <span className="text-ivory">{children}</span>
        <span
          aria-hidden="true"
          data-phase={phase === "idle" ? undefined : phase}
          onAnimationEnd={() => {
            if (phase === "leaving") setPhase("idle");
          }}
          className="nav-link-fill-gold"
        >
          {children}
        </span>
      </span>
    </Link>
  );
}
