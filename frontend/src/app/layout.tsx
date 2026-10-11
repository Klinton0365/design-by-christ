import type { Metadata } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import "./globals.css";
import { THEME_INIT_SCRIPT } from "@/lib/theme-script";
import { InlineScript } from "@/components/InlineScript";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Design By Chris | Designing Spaces, Defining Stories",
  description:
    "Design By Chris is an interior design studio creating minimal, functional spaces for modern living.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorantGaramond.variable} ${lora.variable} h-full antialiased`}
    >
      <head>
        <InlineScript html={THEME_INIT_SCRIPT} />
      </head>
      <body className="min-h-full flex flex-col bg-base text-body font-body">
        {children}
      </body>
    </html>
  );
}
