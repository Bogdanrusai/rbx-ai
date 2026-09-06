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

import { RBX_KNOWLEDGE_BASE, knowledgeBaseAsPromptContext } from "./knowledgeBase";
import {
  validateChatInput,
  looksLikePromptInjection,
  looksLikeHandoffRequest,
  guardResponseText,
  checkRateLimit,
} from "./guard";
import { extractContactFromText } from "./contactExtraction";

export type ChatRole = "user" | "assistant";
export type ChatMessage = { role: ChatRole; text: string };

export type ChatReply = {
  text: string;
  handoff: boolean;
  suggestedAction?: { label: string; href: string };
  contactDetected?: { email?: string; phone?: string };
};

const WELCOME =
  "Bună! Sunt asistentul RBX.AI. Te pot ajuta cu întrebări despre servicii, cum funcționează procesul, proiectele actuale sau cum începi. Cu ce te pot ajuta?";

const FALLBACK =
  "Nu am un răspuns exact la asta. Cel mai sigur e să completezi formularul de analiză gratuită — Bogdan analizează personal fiecare situație și revine cu un răspuns potrivit. Vrei să-l deschid?";

const FORM_ACTION = { label: "Deschide formularul de analiză gratuită", href: "#top" } as const;
const VSL_ACTION = { label: "Vezi prezentarea (cadru cu cadru)", href: "#vsl" } as const;
const PROJECTS_ACTION = { label: "Vezi Selected Work", href: "#selected-work" } as const;

type Topic = {
  id: string;
  test: (lower: string) => boolean;
  answer: () => ChatReply;
};

const kb = RBX_KNOWLEDGE_BASE;

const topics: Topic[] = [
  {
    id: "ce-e-rbx",
    test: (l) => /(ce (e|este|face)(\s+rbx)?\??$|rbx\.?ai|cine (e[sș]ti|sunte[tț]i)|despre (rbx|tine|voi))/.test(l),
    answer: () => ({ text: `${kb.cePresupune} ${kb.filosofie}`, handoff: false }),
  },
  {
    id: "servicii-website",
    test: (l) => /website|site\b/.test(l),
    answer: () => ({
      text: `${kb.servicii.find((s) => s.nume === "Website-uri")?.descriere}`,
      handoff: false,
    }),
  },
  {
    id: "servicii-lead",
    test: (l) => /lead|captare|formular de calificare/.test(l),
    answer: () => ({
      text: `${kb.servicii.find((s) => s.nume.includes("captare"))?.descriere}`,
      handoff: false,
    }),
  },
  {
    id: "servicii-automatizari",
    test: (l) => /automati/.test(l),
    answer: () => ({
      text: `${kb.servicii.find((s) => s.nume === "Automatizări AI")?.descriere} ${kb.servicii.find((s) => s.nume === "Automatizări de proces")?.descriere}`,
      handoff: false,
    }),
  },
  {
    id: "servicii-mesagerie",
    test: (l) => /mesagerie|whatsapp|instagram.*(mesaj|raspuns|răspuns)|chat\b/.test(l),
    answer: () => ({
      text: `${kb.servicii.find((s) => s.nume.includes("mesagerie"))?.descriere}`,
      handoff: false,
    }),
  },
  {
    id: "servicii-integrari",
    test: (l) => /integr[aă]/.test(l),
    answer: () => ({
      text: `${kb.servicii.find((s) => s.nume.includes("Integr"))?.descriere}`,
      handoff: false,
    }),
  },
  {
    id: "servicii-general",
    test: (l) => /(serviciu|servicii|ce oferi|ce construie[sș]ti|ce faci)/.test(l),
    answer: () => ({
      text: `RBX.AI lucrează pe: ${kb.servicii.map((s) => s.nume).join(", ")}. Despre care vrei mai multe detalii?`,
      handoff: false,
    }),
  },
  {
    id: "proces",
    test: (l) => /(proces|cum lucrezi|cum funcționeaz[aă]|cum functioneaz[aă]|pa[sș]ii)/.test(l),
    answer: () => ({ text: kb.proces.join(" "), handoff: false }),
  },
  {
    id: "cum-incep",
    test: (l) => /(cum incep|cum încep|de unde incep|de unde încep|primul pas)/.test(l),
    answer: () => ({ text: kb.cumInceperea, handoff: false, suggestedAction: FORM_ACTION }),
  },
  {
    id: "dupa-formular",
    test: (l) => /(dup[aă] (ce )?(trimit|completez).*formular|ce se intampl[aă]|ce se întâmpl[aă])/.test(l),
    answer: () => ({ text: kb.dupaFormular, handoff: false }),
  },
  {
    id: "programare",
    test: (l) => /(programare|booking|apel|calendar|întâlnire|intalnire)/.test(l),
    answer: () => ({ text: kb.programare, handoff: false, suggestedAction: FORM_ACTION }),
  },
  {
    id: "vsl",
    test: (l) => /\bvsl\b|video|prezentare/.test(l),
    answer: () => ({ text: kb.vsl, handoff: false, suggestedAction: VSL_ACTION }),
  },
  {
    id: "proiecte",
    test: (l) => /(proiect|expert instal|studiu de caz|case study|portofoliu|exemple)/.test(l),
    answer: () => ({
      text: kb.proiecte.map((p) => `${p.nume}: ${p.status}`).join(" "),
      handoff: false,
      suggestedAction: PROJECTS_ACTION,
    }),
  },
  {
    id: "pret",
    test: (l) => /(pre[tț]|cost[aă]|cat cost|c[aâ]t cost|tarif)/.test(l),
    answer: () => ({
      text:
        "Prețul depinde de situația concretă a afacerii — nu am o listă fixă de dat aici. Completezi formularul de analiză gratuită și Bogdan revine cu o propunere potrivită.",
      handoff: false,
      suggestedAction: FORM_ACTION,
    }),
  },
  {
    id: "durata",
    test: (l) => /(cat dureaz[aă]|cât dureaz[aă]|termen de livrare|in cat timp|în cât timp)/.test(l),
    answer: () => ({
      text:
        "Durata depinde de complexitatea sistemului — nu dau un termen fix fără să înțeleg mai întâi afacerea. Cel mai bun pas e formularul de analiză gratuită.",
      handoff: false,
      suggestedAction: FORM_ACTION,
    }),
  },
  {
    id: "rezultate",
    test: (l) => /(rezultate|garan[tț]|testimonial|recenzii|clien[tț]i mul[tț]umi[tț])/.test(l),
    answer: () => ({
      text:
        "Nu public rezultate sau testimoniale inventate. Expert Instal Serv. e un proiect pilot real, aflat acum în testare — rezultatele confirmate se adaugă doar când există cu adevărat.",
      handoff: false,
      suggestedAction: PROJECTS_ACTION,
    }),
  },
];

function matchTopic(lower: string): Topic | undefined {
  return topics.find((t) => t.test(lower));
}

export function generateReply(
  message: string,
  history: ChatMessage[],
  opts: { rateLimitKey: string; contactConsent: boolean }
): ChatReply {
  validateChatInput(message, history);
  checkRateLimit(opts.rateLimitKey);

  const lower = message.trim().toLowerCase();

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

  if (/^(salut|buna|bună|hey|hei|neata|noroc)/.test(lower)) {
    return { text: WELCOME, handoff: false };
  }

  const topic = matchTopic(lower);
  if (topic) {
    const reply = topic.answer();
    const guarded = guardResponseText(reply.text);
    return { ...reply, text: guarded.text };
  }

  return { text: FALLBACK, handoff: false, suggestedAction: FORM_ACTION };
}

// Exportat pentru eventuala conectare ulterioară a unui furnizor LLM real —
// vezi comentariul din capul fișierului.
export { knowledgeBaseAsPromptContext };
