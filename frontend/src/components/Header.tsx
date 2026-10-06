"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import NavLink from "./NavLink";

const navItems: { label: string; href: string }[] = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Project", href: "/project" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  if (pathname?.startsWith("/walkthrough")) return null;

  return (
    <header className="relative z-30 w-full bg-base">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-9">
        <Logo />
        <nav className="flex items-center gap-8">
          <ul className="flex items-center gap-8 font-body text-[20px] text-ivory">
            <li>
              <Link
                href="/"
                aria-label="Home"
                className="flex py-2 text-ivory transition-colors duration-300 hover:text-gold"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path
                    d="M3 9.5 12 2l9 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 8.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V8.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink href={item.href} className="py-2">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* <button aria-label="Search" className="text-ivory opacity-80 hover:text-gold hover:opacity-100">
            <svg viewBox="0 0 21 21" className="h-5 w-5" fill="none">
              <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.5" />
              <path d="M14.5 14.5 19 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button> */}
        </nav>
      </div>
    </header>
  );
}
