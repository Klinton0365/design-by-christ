import Link from "next/link";
import Logo from "./Logo";

const navItems: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  { label: "Home", href: "/" },
  {
    label: "Pages",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Team Single", href: "/team/1" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ's", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Services", href: "/services" },
      { label: "Service Single", href: "/services/1" },
    ],
  },
  {
    label: "Project",
    href: "/project",
    children: [
      { label: "Our Project", href: "/project" },
      { label: "Project Details", href: "/project/1" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Blog Details", href: "/blog/1" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 w-full bg-gradient-to-b from-black/55 via-black/20 to-transparent">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-11">
        <Logo />
        <nav className="flex items-center gap-8">
          <ul className="flex items-center gap-8 font-body text-[20px] text-ivory">
            {navItems.map((item) => (
              <li key={item.label} className="group relative">
                <Link href={item.href} className="py-2">
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="glow-gold-sm invisible absolute left-1/2 top-full z-40 min-w-[200px] -translate-x-1/2 rounded-xl bg-surface py-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block whitespace-nowrap px-5 py-2 text-[16px] hover:text-gold"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <button aria-label="Search" className="text-ivory opacity-80 hover:text-gold hover:opacity-100">
            <svg viewBox="0 0 21 21" className="h-5 w-5" fill="none">
              <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.5" />
              <path d="M14.5 14.5 19 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
