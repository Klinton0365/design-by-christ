"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { ApiError, createLead } from "@/lib/api";

function Field({
  label,
  type = "text",
  className = "",
  value,
  onChange,
  required = false,
}: {
  label: string;
  type?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className={`flex flex-col ${className}`}>
      <span className="sr-only">{label}</span>
      <input
        type={type}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
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
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("pending");
    setError(null);

    try {
      await createLead({
        name,
        email,
        phone: phone || undefined,
        subject: subject || undefined,
        message: message || undefined,
        source: variant === "full" ? "contact_full" : "contact_simple",
        page_path: pathname ?? undefined,
      });
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof ApiError ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <form className="flex w-full max-w-[800px] flex-col gap-10" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <Field label="Name" value={name} onChange={setName} required />
        <Field label="Email" type="email" value={email} onChange={setEmail} required />
      </div>
      {variant === "full" && (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <Field label="Subject" value={subject} onChange={setSubject} />
          <Field label="Phone" type="tel" value={phone} onChange={setPhone} />
        </div>
      )}
      <Field label="Hello, I am interested in.." value={message} onChange={setMessage} />
      <button
        type="submit"
        disabled={status === "pending"}
        className="inline-flex w-fit items-center justify-center gap-2.5 self-start rounded-[18px] bg-dark px-9 py-6 font-body text-[18px] font-semibold text-white glow-gold transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "pending" ? "Sending…" : "Send Now"}
        <span aria-hidden className="inline-flex h-[15px] w-[15px] shrink-0 text-gold">
          <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {status === "success" && (
        <p className="font-body text-[16px] text-gold">
          Thanks for reaching out! We&apos;ll be in touch within 24 hours.
        </p>
      )}
      {status === "error" && (
        <p className="font-body text-[16px] text-red-400">{error}</p>
      )}
    </form>
  );
}
