import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="relative inline-flex items-center pl-11 font-heading text-[40px] leading-none"
      style={{ color: light ? "#fff" : "#292F36" }}
    >
      <span
        aria-hidden
        className="absolute left-0 top-1/2 h-[18px] w-[18px] -translate-y-1/2 bg-gold"
      />
      Interno
    </Link>
  );
}
