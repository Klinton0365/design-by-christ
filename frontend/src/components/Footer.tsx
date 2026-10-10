"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";
import ThemeToggle from "./ThemeToggle";
import { MAIN_NAV_ITEMS } from "@/lib/site-nav";
import type { Service } from "@/lib/api";

const pageLinks = MAIN_NAV_ITEMS.filter((item) => item.label !== "Home");

export default function Footer({ services }: { services: Service[] }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/walkthrough")) return null;

  return (
    <footer className="bg-surface pb-9 pt-24">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6">
        <div className="flex flex-col flex-wrap gap-16 sm:flex-row sm:justify-between">
          <div className="flex max-w-[393px] flex-col gap-[18px]">
            <Logo />
            <p className="font-body text-[18px] leading-relaxed text-body">
              Designing spaces, defining stories — timeless interiors crafted
              with intention.
            </p>
            <SocialIcons className="gap-[30px]" />
          </div>

          <div className="flex flex-col gap-[9px]">
            <h3 className="font-heading text-[25px] text-ivory">Quick Links</h3>
            <ul className="font-body text-[18px] leading-[2.6] text-body">
              {pageLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-[9px]">
            <h3 className="font-heading text-[25px] text-ivory">Services</h3>
            <ul className="font-body text-[18px] leading-[2.6] text-body">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href="/services" className="hover:text-gold">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-[26px]">
            <h3 className="font-heading text-[25px] text-ivory">Contact</h3>
            <p className="font-body text-[18px] leading-relaxed text-body">
              55 East Birchwood Ave.
              <br />
              Brooklyn, New York 11201
              <br />
              contact@designbychris.com
              <br />
              (123) 456 - 7890
            </p>
          </div>
        </div>

        <hr className="border-t border-divider" />

        <div className="flex flex-col-reverse items-center justify-center gap-6 sm:flex-row sm:justify-between">
          <p className="font-body text-[16px] text-body">
            Copyright &copy; Design By Chris {new Date().getFullYear()}
          </p>

          <div className="flex items-center gap-3">
            {/* <span className="font-body text-[13px] uppercase tracking-[0.25em] text-body">
              Dark
            </span> */}
            <ThemeToggle />
            {/* <span className="font-body text-[13px] uppercase tracking-[0.25em] text-body">
              Light
            </span> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
