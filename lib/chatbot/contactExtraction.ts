// Detectare simplă (regex) de date de contact într-un mesaj. Extragerea e
// folosită DOAR dacă vizitatorul a bifat consimțământul explicit în widget —
// verificarea se face la punctul de apel (reply.ts), nu aici.

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_RE = /(\+?4?0)[\s.-]?7\d{2}[\s.-]?\d{3}[\s.-]?\d{3}/;

export function extractContactFromText(text: string): { email?: string; phone?: string } | null {
  const email = text.match(EMAIL_RE)?.[0];
  const phone = text.match(PHONE_RE)?.[0];
  if (!email && !phone) return null;
  return { email, phone };
}
