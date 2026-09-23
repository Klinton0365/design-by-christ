import Link from "next/link";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";

const pageLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Projects", href: "/project" },
  { label: "Our Team", href: "/team" },
  { label: "Contact Us", href: "/contact" },
  { label: "Services", href: "/services" },
];

const serviceLinks = [
  "Kitchan",
  "Living Area",
  "Bathroom",
  "Dinning Hall",
  "Bedroom",
];

export default function Footer() {
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
            <h3 className="font-heading text-[25px] text-ivory">Pages</h3>
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
              {serviceLinks.map((s) => (
                <li key={s}>{s}</li>
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

        <p className="text-center font-body text-[16px] text-body">
          Copyright &copy; Design By Chris {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
