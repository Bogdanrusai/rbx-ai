// Intent-normalization layer for the interim rule-based chatbot.
//
// Romanian visitors type fast, on phones, without diacritics, with typos —
// "Salut cat costa un site" is far more common than "Salut, cât costă un
// website?". Exact-string/regex matching on raw text is fragile against
// that. This module gives every topic matcher in reply.ts a shared,
// deterministic way to be tolerant of that variation WITHOUT turning the
// bot into a free-form LLM: it only ever decides "does this message belong
// to one of our known topics", never generates new text.

const DIACRITICS: Record<string, string> = {
  ă: "a", â: "a", î: "i", ș: "s", ş: "s", ț: "t", ţ: "t",
  Ă: "a", Â: "a", Î: "i", Ș: "s", Ş: "s", Ț: "t", Ţ: "t",
};

export function stripDiacritics(s: string): string {
  return s.replace(/[ăâîșşțţĂÂÎȘŞȚŢ]/g, (c) => DIACRITICS[c] ?? c);
}

// lowercase + strip diacritics + drop punctuation/noise + collapse
// whitespace. Deterministic and pure — same input always gives same output.
export function normalizeText(s: string): string {
  return stripDiacritics(s.toLowerCase())
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokens(s: string): string[] {
  const n = normalizeText(s);
  return n.length ? n.split(" ") : [];
}

// Optimal-string-alignment distance (Levenshtein + adjacent transpositions
// at cost 1). Plain Levenshtein charges 2 for a swapped pair of letters
// ("cotsa" vs "costa"), which is the single most common typo shape and was
// rejecting valid matches — this fixes that without the complexity of true
// Damerau-Levenshtein (which also handles non-adjacent transpositions, not
// needed here).
function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
      }
    }
  }
  return dp[m][n];
}

// Tolerance scales with word length — short words (≤3 chars) must match
// exactly (otherwise almost anything is "close"), medium words can absorb
// one typo, longer words two. This is what makes "costa"/"cst"/"coasta"
// all resolve to the same intent without "cat"/"e"/"un" false-triggering
// on unrelated short words.
function maxDistanceFor(word: string): number {
  if (word.length <= 3) return 0;
  if (word.length <= 6) return 1;
  return 2;
}

export function fuzzyHasWord(msgTokens: string[], target: string): boolean {
  const targetNorm = normalizeText(target);
  if (!targetNorm) return false;
  const maxDist = maxDistanceFor(targetNorm);
  return msgTokens.some((t) => {
    if (t === targetNorm) return true;
    // Romanian adds suffixes to almost every noun ("preț" → "prețul",
    // "tarif" → "tariful", "pachet" → "pachetele") — a stem/prefix match
    // against a target of at least 4 letters catches all of those (and
    // typo'd suffixes like "pretzul") without the length-difference check
    // below rejecting them.
    if (targetNorm.length >= 4 && t.length >= targetNorm.length && t.startsWith(targetNorm)) return true;
    if (maxDist === 0) return false;
    if (Math.abs(t.length - targetNorm.length) > maxDist + 2) return false;
    return editDistance(t, targetNorm) <= maxDist;
  });
}

// True if the (raw, possibly diacritic-free, possibly typo'd) text contains
// any of the given target words, tolerating small typos and missing
// diacritics. Word-order independent by design — each target is checked
// against every token, not against a fixed phrase position.
export function fuzzyHasAny(text: string, targets: string[]): boolean {
  const toks = tokens(text);
  if (!toks.length) return false;
  return targets.some((t) => fuzzyHasWord(toks, t));
}

// For fixed short phrases where word order/adjacency actually matters
// ("cat e", "in cat timp") — checked as a substring of the normalized text,
// so diacritics/case/punctuation differences still don't matter, but the
// words must appear next to each other.
export function includesPhrase(text: string, phrase: string): boolean {
  return normalizeText(text).includes(normalizeText(phrase));
}

export function includesAnyPhrase(text: string, phrases: string[]): boolean {
  const norm = normalizeText(text);
  return phrases.some((p) => norm.includes(normalizeText(p)));
}

// --- Lightweight, session-scoped business-type detection --------------------
// Purely a UX nicety: if a visitor already said "am o clinica" earlier in the
// conversation, the assistant shouldn't ask again or answer as if it knows
// nothing about them. This NEVER invents anything about the business beyond
// the literal category the visitor typed, and it's never persisted anywhere
// past the current browser session (see ChatbotWidget.tsx — kept in React
// state only, sent back on each request, never written to a database).
const BUSINESS_TYPES: { id: string; label: string; words: string[] }[] = [
  { id: "clinica", label: "o clinică", words: ["clinica", "cabinet medical", "dentist", "stomatologie"] },
  { id: "salon", label: "un salon", words: ["salon", "coafor", "frizerie", "barbershop"] },
  { id: "imobiliare", label: "o agenție imobiliară", words: ["imobiliare", "imobiliara", "agentie imobiliara"] },
  { id: "restaurant", label: "un restaurant", words: ["restaurant", "cafenea", "local"] },
  { id: "ecommerce", label: "un magazin online", words: ["ecommerce", "magazin online", "shop online"] },
  { id: "service-local", label: "o firmă de servicii", words: ["service", "instalatii", "constructii", "firma de servicii"] },
];

export function detectBusinessType(text: string): { id: string; label: string } | null {
  const norm = normalizeText(text);
  for (const bt of BUSINESS_TYPES) {
    if (includesAnyPhrase(norm, bt.words)) return { id: bt.id, label: bt.label };
  }
  return null;
}
