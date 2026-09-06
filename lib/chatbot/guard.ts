// Reguli de siguranță aplicate TUTUROR mesajelor — indiferent dacă un
// furnizor LLM real e conectat vreodată sau nu. Ported/adaptat după același
// principiu folosit în proiectul de redesign RBX.AI-CRM: nicio cale de cod
// nu trebuie să poată ocoli aceste verificări.

export const MAX_MESSAGE_LENGTH = 1000;
export const MAX_HISTORY_MESSAGES = 30;

export class InvalidChatInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidChatInputError";
  }
}

export function validateChatInput(message: unknown, history: unknown[]): asserts message is string {
  if (typeof message !== "string") throw new InvalidChatInputError("Mesajul trebuie să fie text.");
  const trimmed = message.trim();
  if (trimmed.length === 0) throw new InvalidChatInputError("Mesajul e gol.");
  if (message.length > MAX_MESSAGE_LENGTH) {
    throw new InvalidChatInputError(`Mesajul depășește lungimea maximă permisă (${MAX_MESSAGE_LENGTH} caractere).`);
  }
  if (/^[\x00-\x1F\x7F]*$/.test(trimmed)) throw new InvalidChatInputError("Mesajul nu conține text valid.");
  if (Array.isArray(history) && history.length > MAX_HISTORY_MESSAGES) {
    throw new InvalidChatInputError("Istoricul conversației e prea lung.");
  }
}

// Tentative cunoscute de prompt injection / jailbreak — listă neexhaustivă
// intenționat, e doar o plasă suplimentară de siguranță.
const INJECTION_PATTERNS: RegExp[] = [
  /ignor[aă]\s*(tu\s*)?(toate\s*)?instruc[țt]iunile/i,
  /uit[aă]\s*(tu\s*)?(toate\s*)?instruc[țt]iunile/i,
  /e[șs]ti\s*acum/i,
  /system\s*prompt/i,
  /prefacete\s*c[aă]/i,
  /pretend\s*(you|to)\s*(are|be)/i,
  /ignore\s*(all\s*)?(previous|prior)\s*instructions/i,
  /you\s*are\s*now/i,
  /dezv[aă]luie\s*(promptul|regulile|instruc)/i,
  /reveal\s*(your\s*)?(system\s*)?prompt/i,
];

export function looksLikePromptInjection(message: string): boolean {
  return INJECTION_PATTERNS.some((p) => p.test(message));
}

const HANDOFF_KEYWORDS = [
  "vreau sa vorbesc cu cineva",
  "vreau să vorbesc cu cineva",
  "om real",
  "reprezentant uman",
  "nu esti de ajutor",
  "nu ești de ajutor",
  "vreau sa vorbesc cu bogdan",
  "vreau să vorbesc cu bogdan",
];

export function looksLikeHandoffRequest(message: string): boolean {
  const lower = message.toLowerCase();
  return HANDOFF_KEYWORDS.some((k) => lower.includes(k));
}

// Ultimă plasă de siguranță pe textul de răspuns — dacă (dintr-un motiv
// oarecare) un răspuns ajunge să conțină un preț concret sau un cuvânt de
// tip „garantat”/„garanție”, NU e trimis ca atare; se înlocuiește.
const PRICE_PATTERN = /\d[\d.,]*\s*(eur|€|lei|ron|\$|usd)/i;
const GUARANTEE_PATTERN = /garant([aă]m|ez|at|ie)|garantee|guaranteed/i;

export function guardResponseText(text: string): { text: string; wasBlocked: boolean } {
  if (PRICE_PATTERN.test(text) || GUARANTEE_PATTERN.test(text)) {
    return {
      text:
        "Nu pot da o cifră fixă aici — depinde de situația ta concretă. Cel mai bun pas e formularul de analiză gratuită de pe site; Bogdan revine personal cu o soluție potrivită.",
      wasBlocked: true,
    };
  }
  return { text, wasBlocked: false };
}

// Rate limiting simplu, în memorie, fereastră fixă — suficient pentru un
// widget de chat pe un singur website (nu un sistem distribuit).
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 15;
const hits = new Map<string, { count: number; windowStart: number }>();

export class RateLimitExceededError extends Error {
  constructor() {
    super("Prea multe mesaje într-un timp scurt — încearcă din nou în câteva secunde.");
    this.name = "RateLimitExceededError";
  }
}

export function checkRateLimit(key: string, now = Date.now()): void {
  const entry = hits.get(key);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(key, { count: 1, windowStart: now });
    return;
  }
  entry.count += 1;
  if (entry.count > MAX_PER_WINDOW) throw new RateLimitExceededError();
  // opportunistic cleanup so the map doesn't grow forever on a long-running instance
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (now - v.windowStart > WINDOW_MS) hits.delete(k);
    }
  }
}
