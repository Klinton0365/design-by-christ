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
  const iconBorder = variant === "dark" ? "border-gold" : "border-dark";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2.5 rounded-[18px] ${bg} px-9 py-6 font-body text-[18px] font-semibold tracking-wide text-white glow-gold transition-opacity hover:opacity-90 ${className}`}
    >
      {children}
      <span
        aria-hidden
        className={`inline-block h-[13px] w-[15px] border-2 ${iconBorder}`}
      />
    </Link>
  );
}
