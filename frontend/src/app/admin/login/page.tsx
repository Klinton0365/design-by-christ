"use client";

import { useActionState, useState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-base px-6">
      <div className="glow-gold-lg w-full max-w-[420px] rounded-[30px] border border-border bg-surface p-10">
        <h1 className="font-heading text-[32px] text-ivory">Admin Login</h1>
        <p className="mt-2 font-body text-[16px] text-body">
          Sign in to manage leads and content.
        </p>

        <form action={formAction} className="mt-8 flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="font-body text-[14px] text-body">Email</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              className="rounded-xl border border-border bg-base px-4 py-3 font-body text-[16px] text-ivory focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-body text-[14px] text-body">Password</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="rounded-xl border border-border bg-base px-4 py-3 font-body text-[16px] text-ivory focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </label>

          {state.error && (
            <p className="font-body text-[14px] text-red-400">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 inline-flex items-center justify-center rounded-[18px] bg-gold px-9 py-4 font-body text-[16px] font-semibold text-white glow-gold transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
