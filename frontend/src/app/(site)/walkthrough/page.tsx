import type { Metadata } from "next";
import Link from "next/link";
import WalkthroughScroll from "@/components/walkthrough/WalkthroughScroll";

export const metadata: Metadata = {
  title: "The Walkthrough | Design By Chris",
  description:
    "A cinematic, scroll-driven walkthrough of a Design By Chris interior — from the entry staircase to a loft overlooking the living space.",
};

export default function WalkthroughPage() {
  return (
    <div className="font-sans">
      <WalkthroughScroll />

      <footer className="bg-[#F5F4F1] px-6 py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <span className="text-lg font-medium tracking-tight text-neutral-900/90">
            Design By Chris
          </span>
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-neutral-800/70">
            <Link href="/" className="hover:text-neutral-900">
              Home
            </Link>
            <Link href="/project" className="hover:text-neutral-900">
              Our Projects
            </Link>
            <Link href="/contact" className="hover:text-neutral-900">
              Contact
            </Link>
            <a href="mailto:contact@designbychris.com" className="hover:text-neutral-900">
              contact@designbychris.com
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
