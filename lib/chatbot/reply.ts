// Motorul de răspuns al asistentului RBX.AI.
//
// Implicit (fără nicio cheie API) funcționează pe reguli/cuvinte-cheie —
// deterministic, fără risc de halucinație, suficient pentru întrebările
// reale despre RBX.AI. Dacă în viitor se adaugă OPENAI_API_KEY sau
// ANTHROPIC_API_KEY în variabilele de mediu, acest fișier e locul unde se
// conectează un furnizor LLM real — folosind ÎNTOTDEAUNA
// `knowledgeBaseAsPromptContext()` ca sistem de referință și
// `guardResponseText()` ca ultimă verificare, ca regulile să rămână identice
// indiferent de furnizor.
//
// Potrivirea intențiilor trece prin lib/chatbot/normalize.ts — diacritice
// lipsă, typo-uri mici și ordine diferită a cuvintelor nu mai schimbă
// răspunsul. Vezi comentariile de acolo pentru detalii.

import { RBX_KNOWLEDGE_BASE, knowledgeBaseAsPromptContext } from "./knowledgeBase";
import {
  validateChatInput,
  looksLikePromptInjection,
  looksLikeHandoffRequest,
  guardResponseText,
  checkRateLimit,
} from "./guard";
import { extractContactFromText } from "./contactExtraction";
import { normalizeText, fuzzyHasAny, includesAnyPhrase, detectBusinessType } from "./normalize";

export type ChatRole = "user" | "assistant";
export type ChatMessage = { role: ChatRole; text: string };

export type ChatReply = {
  text: string;
  handoff: boolean;
  suggestedAction?: { label: string; href: string };
  contactDetected?: { email?: string; phone?: string };
  detectedBusinessType?: { id: string; label: string };
};

const WELCOME =
  "Bună! Sunt asistentul RBX.AI. Te pot ajuta cu întrebări despre servicii, cum funcționează procesul, proiectele actuale sau cum începi. Cu ce te pot ajuta?";

const FALLBACK =
  "Nu am un răspuns exact la asta. Cel mai sigur e să completezi formularul de analiză gratuită — Bogdan analizează personal fiecare situație și revine cu un răspuns potrivit. Vrei să-l deschid?";

const FORM_ACTION = { label: "Deschide formularul de analiză gratuită", href: "#top" } as const;
const VSL_ACTION = { label: "Vezi prezentarea (cadru cu cadru)", href: "#vsl" } as const;
const PROJECTS_ACTION = { label: "Vezi Selected Work", href: "#selected-work" } as const;
const DEMO_ACTION = { label: "Testează sistemul", href: "#demo-interactiv" } as const;

// Doar un mesaj care e STRICT un salut (nimic altceva în el) primește
// răspunsul generic de bun venit — un salut urmat de o întrebare reală
// ("Salut, cat costa un site?") trebuie să primească răspunsul la
// întrebare, nu introducerea. Acesta a fost un bug real: orice mesaj care
// ÎNCEPEA cu un salut ocolea complet potrivirea de subiecte.
const PURE_GREETING = /^(salut|buna|buna ziua|hey|hei|neata|noroc|servus)[\s!.,?]*$/;

type Topic = {
  id: string;
  test: (norm: string, raw: string) => boolean;
  answer: (businessType?: { id: string; label: string }) => ChatReply;
};

const kb = RBX_KNOWLEDGE_BASE;

// --- Intenția de preț — cea mai importantă din tot fișierul -----------------
// Trebuie să prindă întrebarea indiferent de diacritice, typo-uri, ordinea
// cuvintelor sau alte cuvinte din jur ("Salut", "buna ziua", etc.).
const PRICE_PHRASES = [
  "cat e",
  "cat ma costa",
  "cat te costa",
  "cat ar costa",
  "cati bani",
  "ce pret",
  "ce preturi",
];
const PRICE_WORDS = ["pret", "cost", "costa", "tarif", "tarife", "pachet", "pachete", "oferta", "reducere", "reduceri"];

function isPriceIntent(raw: string): boolean {
  return includesAnyPhrase(raw, PRICE_PHRASES) || fuzzyHasAny(raw, PRICE_WORDS);
}

const topics: Topic[] = [
  {
    id: "pret",
    // Verificat PRIMUL, dinaintea oricărui alt subiect — o întrebare ca
    // „Salut, cat costa un site?” trebuie să primească mereu răspunsul de
    // preț, nu salutul generic și nici descrierea serviciului de website.
    // Vezi kb.pricingPolicy pentru singurul răspuns permis. NU adăuga
    // niciodată cifre aici, sub nicio formă.
    test: (_norm, raw) => isPriceIntent(raw),
    answer: () => ({
      text: kb.pricingPolicy,
      handoff: false,
      suggestedAction: FORM_ACTION,
    }),
  },
  {
    id: "durata",
    test: (_norm, raw) =>
      includesAnyPhrase(raw, ["in cat timp", "cat dureaza", "termen de livrare", "cat ia"]) ||
      fuzzyHasAny(raw, ["dureaza", "livrare"]),
    answer: () => ({
      text:
        "Durata depinde de complexitatea sistemului — nu dau un termen fix fără să înțeleg mai întâi afacerea. Cel mai bun pas e formularul de analiză gratuită.",
      handoff: false,
      suggestedAction: FORM_ACTION,
    }),
  },
  {
    id: "pentru-cine",
    test: (norm) =>
      /(pentru cine|se potriveste|afacerea mea mica|orice afacere|orice domeniu)/.test(norm),
    answer: (businessType) => ({
      text: businessType ? `Da, se potrivește și pentru ${businessType.label}. ${kb.pentruCine}` : kb.pentruCine,
      handoff: false,
      suggestedAction: FORM_ACTION,
    }),
  },
  {
    id: "ce-e-rbx",
    test: (norm) =>
      // normalizeText turns punctuation into spaces, so "rbx.ai" becomes
      // "rbx ai" — matching on the bare "rbx" token covers every spelling
      // (rbx.ai, rbx ai, rbxai, RBX AI...).
      /(ce (e|este|face)(\s+rbx)?\??$|\brbx\b|cine (esti|sunteti)|despre (rbx|tine|voi))/.test(norm),
    answer: () => ({
      text: `${kb.cePresupune} ${kb.filosofie}`,
      handoff: false,
      suggestedAction: FORM_ACTION,
    }),
  },
  {
    id: "servicii-website",
    // "site" e sinonimul cel mai des folosit pentru "website" în română
    // vorbită — trebuie recunoscut la fel de bine.
    test: (norm) => /\bwebsite\b|\bsite\b|\bsait\b/.test(norm),
    answer: () => ({
      text: `${kb.servicii.find((s) => s.nume === "Website-uri")?.descriere}`,
      handoff: false,
      suggestedAction: FORM_ACTION,
    }),
  },
  {
    id: "servicii-lead",
    test: (norm) => /lead|captare|formular de calificare/.test(norm),
    answer: () => ({
      text: `${kb.servicii.find((s) => s.nume.includes("captare"))?.descriere}`,
      handoff: false,
      suggestedAction: FORM_ACTION,
    }),
  },
  {
    id: "servicii-automatizari",
    test: (norm) => /automati/.test(norm),
    answer: () => ({
      text: `${kb.servicii.find((s) => s.nume === "Automatizări AI")?.descriere} ${kb.servicii.find((s) => s.nume === "Automatizări de proces")?.descriere}`,
      handoff: false,
      suggestedAction: FORM_ACTION,
    }),
  },
  {
    id: "servicii-mesagerie",
    test: (norm) => /mesagerie|whatsapp|instagram.*(mesaj|raspuns)|chat\b/.test(norm),
    answer: () => ({
      text: `${kb.servicii.find((s) => s.nume.includes("mesagerie"))?.descriere}`,
      handoff: false,
      suggestedAction: FORM_ACTION,
    }),
  },
  {
    id: "servicii-integrari",
    test: (norm) => /integr/.test(norm),
    answer: () => ({
      text: `${kb.servicii.find((s) => s.nume.includes("Integr"))?.descriere}`,
      handoff: false,
      suggestedAction: FORM_ACTION,
    }),
  },
  {
    id: "servicii-general",
    test: (norm) => /(serviciu|servicii|ce oferi|ce construiesti|ce fac(i|eti))/.test(norm),
    answer: () => ({
      text: `RBX.AI lucrează pe: ${kb.servicii.map((s) => s.nume).join(", ")}. Despre care vrei mai multe detalii?`,
      handoff: false,
      suggestedAction: FORM_ACTION,
    }),
  },
  {
    id: "proces",
    test: (norm) => /(proces|cum lucrezi|cum functioneaza|pasii)/.test(norm),
    answer: () => ({ text: kb.proces.join(" "), handoff: false, suggestedAction: DEMO_ACTION }),
  },
  {
    id: "cum-incep",
    test: (norm) => /(cum incep|de unde incep|primul pas)/.test(norm),
    answer: () => ({ text: kb.cumInceperea, handoff: false, suggestedAction: FORM_ACTION }),
  },
  {
    id: "analiza-gratuita",
    test: (norm) => /(ce (e|este|inseamna).*(analiza)|analiza gratuita)/.test(norm),
    answer: () => ({ text: kb.ceEsteAnalizaGratuita, handoff: false, suggestedAction: FORM_ACTION }),
  },
  {
    id: "dupa-formular",
    test: (norm) => /(dupa (ce )?(trimit|completez).*formular|ce se intampla)/.test(norm),
    answer: () => ({ text: kb.dupaFormular, handoff: false }),
  },
  {
    id: "programare",
    test: (norm) => /(programare|booking|apel|calendar|intalnire)/.test(norm),
    answer: () => ({ text: kb.programare, handoff: false, suggestedAction: FORM_ACTION }),
  },
  {
    id: "vsl",
    test: (norm) => /\bvsl\b|video|prezentare/.test(norm),
    answer: () => ({ text: kb.vsl, handoff: false, suggestedAction: VSL_ACTION }),
  },
  {
    id: "proiecte",
    test: (norm) => /(proiect|expert instal|studiu de caz|portofoliu|exemple)/.test(norm),
    answer: () => ({
      text: kb.proiecte.map((p) => `${p.nume}: ${p.status}`).join(" "),
      handoff: false,
      suggestedAction: PROJECTS_ACTION,
    }),
  },
  {
    id: "rezultate",
    test: (norm) => /(rezultate|garant|testimonial|recenzii|clienti multumit)/.test(norm),
    answer: () => ({
      text:
        "Nu public rezultate sau testimoniale inventate. Expert Instal Serv. e un proiect pilot real, aflat acum în testare — rezultatele confirmate se adaugă doar când există cu adevărat.",
      handoff: false,
      suggestedAction: PROJECTS_ACTION,
    }),
  },
];

function matchTopic(norm: string, raw: string): Topic | undefined {
  return topics.find((t) => t.test(norm, raw));
}

// Nu atașăm CTA-ul formularului la absolut fiecare mesaj — devine spam
// vizual și scade impactul lui la momentele care chiar contează (preț,
// proces, "cum încep"). Subiectele mici/laterale rămân fără buton propriu;
// vizitatorul tot vede formularul principal pe pagină.
const NO_CTA_TOPICS = new Set(["dupa-formular", "pentru-cine", "ce-e-rbx"]);

export function generateReply(
  message: string,
  history: ChatMessage[],
  opts: { rateLimitKey: string; contactConsent: boolean; businessType?: { id: string; label: string } | null }
): ChatReply {
  validateChatInput(message, history);
  checkRateLimit(opts.rateLimitKey);

  const trimmed = message.trim();
  const norm = normalizeText(trimmed);

  // Session-scoped only (see normalize.ts) — never persisted, never sent
  // anywhere but back to this same function on the next message.
  const newlyDetected = opts.businessType ? undefined : detectBusinessType(trimmed) || undefined;
  const knownBusinessType = opts.businessType || newlyDetected;

  if (looksLikePromptInjection(message)) {
    return {
      text:
        "Pot răspunde doar la întrebări despre RBX.AI. Pentru orice altceva, completează formularul și Bogdan te contactează direct.",
      handoff: true,
      suggestedAction: FORM_ACTION,
    };
  }

  if (looksLikeHandoffRequest(message)) {
    return {
      text: "Sigur — cel mai rapid e formularul de analiză gratuită; Bogdan te contactează direct pe baza lui.",
      handoff: true,
      suggestedAction: FORM_ACTION,
    };
  }

  if (opts.contactConsent) {
    const contact = extractContactFromText(message);
    if (contact) {
      return {
        text: "Mulțumesc! Am notat datele — dar cel mai sigur mod să ajungă direct la Bogdan e tot formularul de analiză gratuită, ca să aibă și contextul afacerii tale.",
        handoff: false,
        contactDetected: contact,
        suggestedAction: FORM_ACTION,
      };
    }
  }

  // Potrivirea de subiecte rulează ÎNAINTE de verificarea de salut — un
  // "Salut, cat costa?" trebuie să primească răspunsul la întrebare, nu
  // introducerea generică. Salutul "gol" (fără nimic altceva) rămâne un
  // caz separat, verificat după.
  const topic = matchTopic(norm, trimmed);
  if (topic) {
    const reply = topic.answer(knownBusinessType);
    const guarded = guardResponseText(reply.text);
    return {
      ...reply,
      text: guarded.text,
      suggestedAction: NO_CTA_TOPICS.has(topic.id) ? undefined : reply.suggestedAction,
      detectedBusinessType: newlyDetected,
    };
  }

  if (PURE_GREETING.test(norm)) {
    return { text: WELCOME, handoff: false, detectedBusinessType: newlyDetected };
  }

  return { text: FALLBACK, handoff: false, suggestedAction: FORM_ACTION, detectedBusinessType: newlyDetected };
}

// Exportat pentru eventuala conectare ulterioară a unui furnizor LLM real —
// vezi comentariul din capul fișierului.
export { knowledgeBaseAsPromptContext };
