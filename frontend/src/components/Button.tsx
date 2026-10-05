import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "dark" | "gold";
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "dark",
  className = "",
}: ButtonProps) {
  const bg = variant === "dark" ? "bg-dark" : "bg-gold";
  const iconColor = variant === "dark" ? "text-gold" : "text-dark";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2.5 rounded-[18px] ${bg} px-9 py-6 font-body text-[18px] font-semibold tracking-wide text-white glow-gold transition-opacity hover:opacity-90 ${className}`}
    >
      {children}
      <span aria-hidden className={`inline-flex h-[15px] w-[15px] shrink-0 ${iconColor}`}>
        <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
