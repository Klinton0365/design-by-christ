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
      className={`inline-flex items-center justify-center gap-2.5 rounded-[18px] ${bg} px-9 py-6 font-body text-[18px] font-semibold tracking-wide text-white shadow-[0_0_0_1px_rgba(202,154,62,0.4),0_0_35px_-6px_rgba(233,200,120,0.65)] transition-opacity hover:opacity-90 ${className}`}
    >
      {children}
      <span
        aria-hidden
        className={`inline-block h-[13px] w-[15px] border-2 ${iconBorder}`}
      />
    </Link>
  );
}
