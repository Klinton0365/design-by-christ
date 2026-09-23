import Image from "next/image";
import Link from "next/link";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <Image
        src="/logo-mark.png"
        alt="Design By Chris monogram"
        width={44}
        height={36}
        priority
        className="h-9 w-auto drop-shadow-[0_0_10px_rgba(233,200,120,0.45)] transition-transform duration-300 group-hover:scale-105"
      />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-[10px] uppercase tracking-[0.35em] text-gold">
            Design By
          </span>
          <span className="text-gold-shimmer font-heading text-[26px] font-bold uppercase tracking-wide">
            Chris
          </span>
        </span>
      )}
    </Link>
  );
}
