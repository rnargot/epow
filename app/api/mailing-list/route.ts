import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof body.email === "string"
      ? body.email.trim().toLowerCase()
      : "";

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.MAILING_LIST_WEBHOOK_URL;
  const secret = process.env.MAILING_LIST_SECRET;

  if (!webhookUrl || !secret) {
    return NextResponse.json(
      { error: "Mailing list is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, secret }),
    });

    const data = (await response.json()) as { error?: string; success?: boolean };

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { error: data.error ?? "Unable to sign up right now." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to sign up right now. Please try again." },
      { status: 502 },
    );
  }
}
