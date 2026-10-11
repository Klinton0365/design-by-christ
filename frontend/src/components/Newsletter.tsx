"use client";

import { useState, type FormEvent } from "react";
import { ApiError, subscribeNewsletter } from "@/lib/api";
import AnimatedText from "@/components/AnimatedText";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [successMessage, setSuccessMessage] = useState("Thanks for subscribing!");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("pending");
    setError(null);

    try {
      await subscribeNewsletter(email);
      setSuccessMessage("Thanks for subscribing!");
      setStatus("success");
    } catch (err) {
      if (err instanceof ApiError && err.errors?.email) {
        setSuccessMessage("You're already on the list — thank you!");
        setStatus("success");
        return;
      }
      setStatus("error");
      setError(
        err instanceof ApiError ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-20">
      <div className="glow-gold flex flex-col items-center gap-8 rounded-[70px] bg-dark px-8 py-20 text-center sm:px-24">
        <div className="flex flex-col items-center gap-3">
          <AnimatedText as="h2" className="font-heading text-[36px] text-white sm:text-[50px]">
            Stay in the Loop
          </AnimatedText>
          <AnimatedText as="p" className="max-w-[450px] font-body text-[18px] text-white sm:text-[22px]">
            New projects, design notes, and the occasional offer — straight to your inbox.
          </AnimatedText>
        </div>

        {status === "success" ? (
          <p className="font-body text-[18px] font-semibold text-gold">{successMessage}</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-[480px] flex-col gap-4 sm:flex-row"
          >
            <label className="flex-1">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-[18px] border border-white/20 bg-white/5 px-6 py-4 font-body text-[16px] text-white placeholder:text-white/50 focus:border-gold focus:outline-none"
              />
            </label>
            <button
              type="submit"
              disabled={status === "pending"}
              className="inline-flex items-center justify-center rounded-[18px] bg-gold px-8 py-4 font-body text-[16px] font-semibold text-white glow-gold transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "pending" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="font-body text-[15px] text-red-300">{error}</p>
        )}
      </div>
    </section>
  );
}
