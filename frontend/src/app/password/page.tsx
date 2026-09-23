import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Restricted Page | Design By Chris",
};

export default function PasswordPage() {
  return (
    <>
      <PageBanner title="Restricted Page" breadcrumb="Home / Restricted Page" />

      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-10 rounded-[70px] bg-cream px-10 py-24 text-center">
          <div className="flex flex-col items-center gap-4">
            <h1 className="font-heading text-[36px] text-ivory sm:text-[50px]">
              Password Protected
            </h1>
            <p className="font-body text-[18px] leading-relaxed text-body sm:text-[22px]">
              This page is password protected. If you are the website admin,
              or have access to this page, please type your password below.
            </p>
          </div>
          <form className="flex w-full max-w-[480px] flex-col items-center gap-10">
            <label className="flex w-full flex-col">
              <span className="sr-only">Enter Your Password</span>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-full border-0 border-b border-gold/40 bg-transparent pb-3 font-body text-[20px] text-body placeholder:text-body focus:outline-none sm:text-[22px]"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2.5 rounded-[18px] bg-dark px-9 py-6 font-body text-[18px] font-semibold text-white shadow-[0_0_0_1px_rgba(202,154,62,0.4),0_0_35px_-6px_rgba(233,200,120,0.65)] transition-opacity hover:opacity-90"
            >
              Submit Now
              <span aria-hidden className="inline-block h-[13px] w-[15px] border-2 border-gold" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
