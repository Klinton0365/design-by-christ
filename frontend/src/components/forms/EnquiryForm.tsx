"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { ApiError, createLead } from "@/lib/api";

const PROJECT_TYPES = ["Full Home", "Single Room", "Commercial", "Just Exploring"];

export default function EnquiryForm({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("");
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
        project_type: projectType,
        source: "enquiry_modal",
        page_path: pathname ?? undefined,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof ApiError ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-5 py-6 text-center">
        <span className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-cream">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 id="enquiry-modal-title" className="font-heading text-[28px] text-ivory">
          Thank you, {name.split(" ")[0] || "there"}.
        </h3>
        <p className="max-w-[320px] font-body text-[17px] leading-relaxed text-body">
          We&apos;ve got your enquiry and will reach out within 24 hours to talk
          through your project.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 inline-flex items-center justify-center rounded-[18px] bg-dark px-9 py-4 font-body text-[16px] font-semibold text-white glow-gold transition-opacity hover:opacity-90"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 id="enquiry-modal-title" className="font-heading text-[28px] text-ivory">
          Let&apos;s Talk About Your Space
        </h3>
        <p className="font-body text-[16px] leading-relaxed text-body">
          A few details so we can tailor the conversation — takes less than a
          minute.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <label className="flex flex-col gap-1">
          <span className="sr-only">Name</span>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-0 border-b border-gold/40 bg-transparent pb-3 font-body text-[18px] text-body placeholder:text-body focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="sr-only">Email</span>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-0 border-b border-gold/40 bg-transparent pb-3 font-body text-[18px] text-body placeholder:text-body focus:outline-none"
          />
        </label>

        <label className="relative flex flex-col gap-1">
          <span className="sr-only">Project type</span>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            required
            className="appearance-none border-0 border-b border-gold/40 bg-transparent pb-3 font-body text-[18px] text-body focus:outline-none"
          >
            <option value="" disabled>
              What are you looking to do?
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t} className="bg-surface text-body">
                {t}
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="pointer-events-none absolute bottom-3 right-1 h-4 w-4 text-gold"
            fill="none"
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </label>

        <label className="flex flex-col gap-1">
          <span className="sr-only">Phone (optional)</span>
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-0 border-b border-gold/40 bg-transparent pb-3 font-body text-[18px] text-body placeholder:text-body focus:outline-none"
          />
        </label>

        <button
          type="submit"
          disabled={status === "pending"}
          className="mt-2 inline-flex w-full items-center justify-center gap-2.5 rounded-[18px] bg-gold px-9 py-5 font-body text-[18px] font-semibold tracking-wide text-white glow-gold transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "pending" ? "Sending…" : "Send My Enquiry"}
        </button>

        {status === "error" && (
          <p className="font-body text-[15px] text-red-400">{error}</p>
        )}

        <p className="text-center font-body text-[13px] text-body/70">
          No spam — just a real reply from our team.
        </p>
      </form>
    </div>
  );
}
