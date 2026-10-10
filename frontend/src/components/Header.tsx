"use client";

import { usePathname } from "next/navigation";
import Logo from "./Logo";
import StaggeredMenu from "./StaggeredMenu";
import { MAIN_NAV_ITEMS } from "@/lib/site-nav";

const menuItems = MAIN_NAV_ITEMS.map((item) => ({
  label: item.label,
  ariaLabel: item.label === "Home" ? "Go to the home page" : `Go to ${item.label}`,
  link: item.href,
}));

const socialItems = [
  { label: "Facebook", link: "#" },
  { label: "Twitter", link: "#" },
  { label: "Instagram", link: "#" },
  { label: "LinkedIn", link: "#" },
];

export default function Header() {
  const pathname = usePathname();
  if (pathname?.startsWith("/walkthrough")) return null;

  return (
    <StaggeredMenu
      isFixed
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering={false}
      logo={<Logo />}
      menuButtonColor="#15110a"
      openMenuButtonColor="#15110a"
      changeMenuColorOnOpen
      colors={["var(--color-gold-deep)", "var(--color-surface)"]}
      accentColor="var(--color-gold)"
    />
  );
}
