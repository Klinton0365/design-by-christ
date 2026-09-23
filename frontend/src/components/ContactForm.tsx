"use client";

import { useState } from "react";

function Field({
  label,
  type = "text",
  className = "",
}: {
  label: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col ${className}`}>
      <span className="sr-only">{label}</span>
      <input
        type={type}
        placeholder={label}
        className="border-0 border-b border-gold/40 bg-transparent pb-3 font-body text-[20px] text-body placeholder:text-body focus:outline-none sm:text-[22px]"
      />
    </label>
  );
}

export default function ContactForm({
  variant = "simple",
}: {
  variant?: "simple" | "full";
}) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="flex w-full max-w-[800px] flex-col gap-10"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <Field label="Name" />
        <Field label="Email" type="email" />
      </div>
      {variant === "full" && (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <Field label="Subject" />
          <Field label="Phone" type="tel" />
        </div>
      )}
      <Field label="Hello, I am interested in.." />
      <button
        type="submit"
        className="inline-flex w-fit items-center justify-center gap-2.5 self-start rounded-[18px] bg-dark px-9 py-6 font-body text-[18px] font-semibold text-white shadow-[0_0_0_1px_rgba(202,154,62,0.4),0_0_35px_-6px_rgba(233,200,120,0.65)] transition-opacity hover:opacity-90"
      >
        Send Now
        <span aria-hidden className="inline-block h-[13px] w-[15px] border-2 border-gold" />
      </button>
      {submitted && (
        <p className="font-body text-[16px] text-gold">
          Thanks! Your message has been noted (demo form, not yet connected
          to the backend).
        </p>
      )}
    </form>
  );
}
