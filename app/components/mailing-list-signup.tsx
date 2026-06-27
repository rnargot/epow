"use client";

import { FormEvent, ReactNode, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function MailingListSignup({
  overlay = false,
  middle,
}: {
  overlay?: boolean;
  middle?: ReactNode;
}) {
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
    ? "min-w-0 flex-1 bg-transparent border-none px-2 py-2.5 text-sm text-white placeholder:text-white/50 outline-none disabled:opacity-60 mt-12"
    : "min-w-0 flex-1 rounded-full border border-foreground/20 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/40 outline-none transition focus:border-foreground/50 disabled:opacity-60";

  const buttonClass = overlay
    ? "bg-transparent border-none px-2 py-2.5 text-sm uppercase tracking-widest text-white/80 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
    : "rounded-full border border-foreground/20 bg-foreground/5 px-5 py-2.5 text-sm uppercase tracking-widest text-foreground transition hover:bg-foreground/10 disabled:cursor-not-allowed disabled:opacity-60";

  const messageClass = `text-sm ${
    status === "error"
      ? overlay ? "text-red-200" : "text-red-500"
      : overlay ? "text-white/80" : "text-foreground/60"
  }`;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center gap-3"
    >
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
      {middle ?? null}
      <button
        type="submit"
        disabled={status === "loading"}
        className={buttonClass}
      >
        {status === "loading" ? "Signing up…" : "Join Mailing List"}
      </button>
      {message ? (
        <p className={messageClass} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
