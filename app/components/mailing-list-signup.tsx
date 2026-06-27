"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function MailingListSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/mailing-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setMessage("You're on the list.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col items-center gap-3 px-4"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-white/80">
        Sign up for updates
      </p>
      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === "loading"}
          className="min-w-0 flex-1 rounded-full border border-white/30 bg-black/30 px-4 py-2.5 text-sm text-white placeholder:text-white/50 backdrop-blur-sm outline-none transition focus:border-white/60 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Signing up…" : "Sign up"}
        </button>
      </div>
      {message ? (
        <p
          className={`text-sm ${
            status === "error" ? "text-red-200" : "text-white/80"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
