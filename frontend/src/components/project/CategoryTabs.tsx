import Link from "next/link";

export default function CategoryTabs({
  categories,
  active,
}: {
  categories: string[];
  active: string | null;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[880px] flex-wrap items-center justify-center gap-3 rounded-[18px] border border-gold px-4 py-4 sm:gap-8">
      <Link
        href="/project"
        className={`rounded-[18px] px-6 py-3 font-body text-[18px] font-semibold tracking-wide transition-colors ${
          !active ? "bg-gold text-white" : "text-ivory hover:text-gold"
        }`}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/project?category=${encodeURIComponent(cat)}`}
          className={`rounded-[18px] px-6 py-3 font-body text-[18px] font-semibold tracking-wide transition-colors ${
            active === cat ? "bg-gold text-white" : "text-ivory hover:text-gold"
          }`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}
