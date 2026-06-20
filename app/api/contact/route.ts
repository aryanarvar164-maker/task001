import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

export async function POST(request: Request) {
  const body: ContactPayload = await request.json().catch(() => ({}));

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Name, email, and message are all required." },
      { status: 400 }
    );
  }

  // This is a demo endpoint: it logs the submission and returns success.
  // Swap this out for a real email service (Resend, SendGrid, etc.) or
  // database write when you're ready to go to production.
  console.log("New contact form submission:", body);

  return NextResponse.json({ ok: true });
}
