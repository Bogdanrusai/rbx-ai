import { NextRequest, NextResponse } from "next/server";
import { generateReply, type ChatMessage } from "@/lib/chatbot/reply";
import {
  InvalidChatInputError,
  RateLimitExceededError,
  guardResponseText,
  looksLikeHandoffRequest,
  looksLikePromptInjection,
  looksLikeSecretRequest,
} from "@/lib/chatbot/guard";

export const runtime = "nodejs";

function rateLimitKeyFor(req: NextRequest): string {
  // Best-effort per-visitor key. Behind Vercel this header is set by the edge
  // network; falls back to a shared key (still capped by the global window)
  // if it's ever missing, which just means slightly stricter shared limits.
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "anonymous";
}

type BusinessType = { id: string; label: string };

// Răspunsuri generate de un LLM (workflow n8n cu baza de cunoștințe RBX.AI).
// Activ DOAR dacă ambele variabile de mediu sunt setate; altfel (sau la orice
// eroare/timeout) rămâne motorul pe reguli din reply.ts — site-ul nu rămâne
// niciodată fără asistent. Textul LLM trece mereu prin guardResponseText
// (fără prețuri, fără garanții).
async function llmText(
  message: string,
  history: ChatMessage[],
  businessType: BusinessType | null
): Promise<string | null> {
  const url = process.env.N8N_CHATBOT_URL;
  const key = process.env.N8N_CHATBOT_KEY;
  if (!url || !key) return null;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", "x-rbx-key": key },
      body: JSON.stringify({ message, history: history.slice(-8), businessType }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { text?: unknown };
    const text = typeof data.text === "string" ? data.text.trim() : "";
    if (!text || text.length > 1200) return null;
    return guardResponseText(text).text;
  } catch {
    return null;
  }
}

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
    // Cazurile de siguranță (cerere de chei/prompt, injecție, predare către om,
    // date de contact) rămân MEREU pe răspunsurile fixe din reply.ts.
    const safetyCase =
      looksLikeSecretRequest(message) ||
      looksLikePromptInjection(message) ||
      looksLikeHandoffRequest(message) ||
      Boolean(reply.contactDetected);
    if (!safetyCase) {
      const text = await llmText(message.trim(), history, businessType ?? reply.detectedBusinessType ?? null);
      if (text) return NextResponse.json({ ...reply, text });
    }
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
