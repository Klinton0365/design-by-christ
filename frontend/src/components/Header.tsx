"use client";

import { usePathname } from "next/navigation";
import Logo from "./Logo";
import StaggeredMenu from "./StaggeredMenu";

const menuItems = [
  { label: "Home", ariaLabel: "Go to the home page", link: "/" },
  { label: "About Us", ariaLabel: "Learn about us", link: "/about" },
  { label: "Services", ariaLabel: "View our services", link: "/services" },
  { label: "Project", ariaLabel: "See our projects", link: "/project" },
  { label: "Blog", ariaLabel: "Read our blog", link: "/blog" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

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
