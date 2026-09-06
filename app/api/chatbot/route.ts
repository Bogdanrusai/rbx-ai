import { NextRequest, NextResponse } from "next/server";
import { generateReply, type ChatMessage } from "@/lib/chatbot/reply";
import { InvalidChatInputError, RateLimitExceededError } from "@/lib/chatbot/guard";

export const runtime = "nodejs";

function rateLimitKeyFor(req: NextRequest): string {
  // Best-effort per-visitor key. Behind Vercel this header is set by the edge
  // network; falls back to a shared key (still capped by the global window)
  // if it's ever missing, which just means slightly stricter shared limits.
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "anonymous";
}

type BusinessType = { id: string; label: string };

export async function POST(req: NextRequest) {
  let body: {
    message?: string;
    history?: ChatMessage[];
    contactConsent?: boolean;
    businessType?: BusinessType | null;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corp de cerere invalid." }, { status: 400 });
  }

  const message = body.message ?? "";
  const history = Array.isArray(body.history) ? body.history : [];
  const contactConsent = Boolean(body.contactConsent);
  const businessType =
    body.businessType && typeof body.businessType.id === "string" && typeof body.businessType.label === "string"
      ? body.businessType
      : null;

  try {
    const reply = generateReply(message, history, {
      rateLimitKey: rateLimitKeyFor(req),
      contactConsent,
      businessType,
    });
    return NextResponse.json(reply);
  } catch (err) {
    if (err instanceof InvalidChatInputError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    if (err instanceof RateLimitExceededError) {
      return NextResponse.json({ error: err.message }, { status: 429 });
    }
    return NextResponse.json(
      { error: "A apărut o eroare temporară. Încearcă din nou." },
      { status: 500 }
    );
  }
}
