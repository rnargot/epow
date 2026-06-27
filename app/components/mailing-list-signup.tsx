"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function MailingListSignup({ overlay = false }: { overlay?: boolean }) {
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

  const labelClass = overlay
    ? "text-xs uppercase tracking-[0.3em] text-white/80"
    : "text-xs uppercase tracking-[0.3em] text-foreground/50";

  const inputClass = overlay
    ? "min-w-0 flex-1 rounded-full border border-white/30 bg-black/30 px-4 py-2.5 text-sm text-white placeholder:text-white/50 backdrop-blur-sm outline-none transition focus:border-white/60 disabled:opacity-60"
    : "min-w-0 flex-1 rounded-full border border-foreground/20 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/40 outline-none transition focus:border-foreground/50 disabled:opacity-60";

  const buttonClass = overlay
    ? "rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
    : "rounded-full border border-foreground/20 bg-foreground/5 px-5 py-2.5 text-sm uppercase tracking-widest text-foreground transition hover:bg-foreground/10 disabled:cursor-not-allowed disabled:opacity-60";

  const messageClass = `text-sm ${
    status === "error"
      ? overlay ? "text-red-200" : "text-red-500"
      : overlay ? "text-white/80" : "text-foreground/60"
  }`;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col items-center gap-3"
    >
      <p className={labelClass}>Sign up for updates</p>
      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === "loading"}
          className={inputClass}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={buttonClass}
        >
          {status === "loading" ? "Signing up…" : "Sign up"}
        </button>
      </div>
      {message ? (
        <p className={messageClass} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
