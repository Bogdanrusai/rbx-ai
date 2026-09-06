// ============================================================================
// RBX.AI — Baza de cunoștințe a asistentului (sursa unică de adevăr)
// ============================================================================
//
// REGULĂ ABSOLUTĂ: acest fișier conține DOAR fapte reale, deja publice pe
// website. Niciun preț, termen de livrare, client nou, testimonial, cifră de
// rezultat sau garanție nu apare aici — intenționat, niciodată.
//
// De ce arată așa fișierul:
// - Fiecare secțiune de mai jos corespunde unui subiect din reply.ts
//   (identitate, servicii, proces, proiecte etc.) — găsești rapid ce
//   actualizezi și nu trebuie să atingi logica de răspuns (reply.ts) pentru
//   a schimba o informație.
// - Adaugi o afirmație nouă DOAR dacă e deja adevărată și verificabilă pe
//   site chiar acum. Dacă nu există încă (un rezultat, un testimonial, un
//   preț), NU se inventează — se lasă în afara bazei, iar asistentul
//   folosește fallback-ul + îndrumarea spre formular.
// - `PRICING_POLICY` e citit direct de reply.ts pentru orice întrebare
//   despre cost — nu adăuga cifre nicăieri în acest fișier, sub nicio formă.
//
// Cum adaugi un nou proiect în Selected Work / chatbot:
//   1. Adaugă intrarea în `proiecte` mai jos (nume + status onest).
//   2. Adaugă cardul corespunzător în components/SelectedWork.tsx.
//   Cele două rămân sincronizate manual — nu există generare automată.

export const RBX_KNOWLEDGE_BASE = {
  // --- Identitate & filosofie ------------------------------------------
  identitate:
    "RBX.AI e construit de Bogdan Rus, care documentează procesul public pe Instagram (@bogdanrus.ai). Fiecare sistem pornește de la înțelegerea procesului real al afacerii, nu de la o soluție AI gata făcută.",

  cePresupune:
    "RBX.AI construiește sisteme AI practice pentru afaceri mici și mijlocii. Preiau mesajele clienților, califică lead-urile, programează, trimit follow-up și fac munca repetitivă, non-stop, nu doar în program. Nu e o promisiune că AI-ul înlocuiește angajații. E infrastructura care rezolvă un proces concret, prost pus la punct.",

  filosofie:
    "Nu se pune AI peste un proces prost. Se înțelege întâi cum lucrează afacerea, apoi se construiește sistemul potrivit, se testează și se îmbunătățește pe baza rezultatelor reale.",

  pentruCine:
    "RBX.AI e potrivit pentru afaceri mici și mijlocii din România care primesc cereri de la clienți (mesaje, telefoane, formulare) și simt că pierd lead-uri sau timp din cauza unui proces manual — clinici, saloane, imobiliare, restaurante, ecommerce sau servicii, indiferent de domeniu, atât timp cât există un flux real de clienți de gestionat.",

  // --- Servicii -----------------------------------------------------------
  servicii: [
    {
      nume: "Website-uri",
      descriere:
        "Website-uri gândite pentru conversie, nu doar prezentare — structură, copy și formular de calificare incluse.",
    },
    {
      nume: "Sisteme de captare a lead-urilor",
      descriere:
        "Formulare de calificare, capturare lead-uri din orice canal (site, Instagram, WhatsApp) și trimiterea lor organizată către persoana potrivită.",
    },
    {
      nume: "Automatizări AI",
      descriere:
        "Automatizarea proceselor repetitive — follow-up, notificări, sincronizare date între aplicații.",
    },
    {
      nume: "Sisteme de mesagerie / răspuns",
      descriere:
        "Preluarea și calificarea automată a conversațiilor de pe canale de mesagerie, ca niciun mesaj să nu rămână fără răspuns.",
    },
    {
      nume: "Automatizări de proces",
      descriere:
        "Automatizarea pașilor interni repetitivi dintr-o afacere (programări, rapoarte, task-uri) care consumă timp fără să aducă valoare directă.",
    },
    {
      nume: "Integrări între aplicații",
      descriere:
        "Conectarea instrumentelor deja folosite de afacere (CRM, calendar, formulare) ca să lucreze împreună, fără muncă manuală de copiere a datelor.",
    },
  ],

  // --- Cum funcționează procesul -------------------------------------------
  proces: [
    "1. Analiză gratuită — completezi formularul de pe site cu câteva informații despre afacerea ta.",
    "2. Bogdan analizează personal fiecare răspuns — nu e o analiză automată.",
    "3. Revine cu o soluție construită special pentru afacerea ta (nu un pachet standard).",
    "4. Dacă merge înainte, sistemul se construiește, se testează și se predă — cu documentație, nu o cutie neagră.",
  ],

  cumInceperea:
    "Se începe prin formularul „Vreau o analiză gratuită” de pe site (butonul principal). Nu presupune niciun cost sau obligație în acest pas.",

  ceEsteAnalizaGratuita:
    "Analiza gratuită e un formular scurt (câteva întrebări despre tipul afacerii, provocarea principală, volumul de lead-uri și dacă folosești deja AI). Pe baza răspunsurilor, Bogdan analizează personal situația și revine cu recomandările și soluția potrivite — nu e un raport generat automat.",

  dupaFormular:
    "După ce formularul e trimis, Bogdan analizează personal informațiile primite — nu e un proces automat — și revine cu soluția potrivită pentru afacerea respectivă.",

  // --- Programare / booking -------------------------------------------------
  // Când NEXT_PUBLIC_BOOKING_URL e setat (Calendly), ecranul final al
  // formularului arată butonul „Programează un apel”. Textul de mai jos
  // rămâne corect indiferent dacă acel buton e vizibil sau nu — programarea
  // se întâmplă mereu DUPĂ formular, niciodată înainte.
  programare:
    "Pasul de programare a unui apel apare abia după ce completezi formularul de analiză gratuită — pe ecranul de confirmare. Până atunci, cea mai sigură cale de a ajunge la Bogdan e tot formularul.",

  // --- VSL / prezentare -------------------------------------------------
  vsl:
    "Secțiunea „Cadru cu cadru, povestea completă” de pe homepage (ancora #vsl) prezintă, prin cadre reale — format carusel, nu video — problema pe care o rezolvă RBX.AI și cum funcționează soluția.",

  // --- Proiecte / Selected Work ------------------------------------------
  // Ține sincronizat manual cu components/SelectedWork.tsx.
  proiecte: [
    {
      nume: "RBX.AI — website-ul propriu",
      status:
        "Studiu de caz intern, live. Acest website e el însuși un proiect RBX.AI: strategie, arhitectură, copywriting, design, sistem de calificare a lead-urilor și asistentul cu care vorbești acum au fost construite și documentate ca sistem, nu doar ca site de prezentare.",
    },
    {
      nume: "RBX.AI CRM",
      status:
        "Sistem intern, privat. Gestionează lead-urile venite din formularul de analiză gratuită, de la primul mesaj până la programare. Nu are login public, demo public sau acces din exterior — prezentat pe site doar ca exemplu de ce se poate construi.",
    },
    {
      nume: "Expert Instal Serv.",
      status:
        "Proiect pilot real, aflat ACUM în testare/feedback. Sistemul a fost construit și e folosit efectiv, dar nu există încă rezultate/cifre/testimoniale confirmate de client — acelea se adaugă doar când sunt reale.",
    },
  ],

  // --- Politica de preț ---------------------------------------------------
  // NU adăuga niciodată o cifră, un interval sau un exemplu de preț aici sau
  // oriunde altundeva în baza de cunoștințe. reply.ts citește STRICT acest
  // text pentru orice întrebare despre cost.
  pricingPolicy:
    "Costul depinde de ce trebuie construit și de complexitatea proiectului. Înainte să discutăm o ofertă, analizăm procesul și ce are nevoie afacerea ta. Poți completa analiza gratuită, iar apoi discutăm soluția potrivită.",

  // --- Reguli stricte (documentare internă, nu se afișează direct) --------
  reguliStricte: [
    "Nu inventează niciodată clienți, testimoniale, cifre de rezultate, venituri sau creșteri de conversie.",
    "Nu promite niciodată timp exact de livrare, preț fix sau garanții de rezultat.",
    "Nu dă niciodată o cifră sau un interval de preț, sub nicio formă — vezi pricingPolicy.",
    "Dacă nu știe un răspuns, spune clar că nu știe și îndrumă spre formularul de analiză gratuită, în loc să inventeze.",
  ],
} as const;

export function knowledgeBaseAsPromptContext(): string {
  const kb = RBX_KNOWLEDGE_BASE;
  const servicii = kb.servicii.map((s) => `- ${s.nume}: ${s.descriere}`).join("\n");
  const proiecte = kb.proiecte.map((p) => `- ${p.nume}: ${p.status}`).join("\n");
  return [
    `Ce este RBX.AI: ${kb.cePresupune}`,
    `Filosofie: ${kb.filosofie}`,
    `Pentru cine: ${kb.pentruCine}`,
    `Identitate: ${kb.identitate}`,
    `Servicii:\n${servicii}`,
    `Proces:\n${kb.proces.join("\n")}`,
    `Cum se începe: ${kb.cumInceperea}`,
    `Ce este analiza gratuită: ${kb.ceEsteAnalizaGratuita}`,
    `Ce se întâmplă după formular: ${kb.dupaFormular}`,
    `Programare/apel: ${kb.programare}`,
    `VSL: ${kb.vsl}`,
    `Proiecte:\n${proiecte}`,
    `Politica de preț (folosește mereu exact acest răspuns pentru orice întrebare despre cost): ${kb.pricingPolicy}`,
  ].join("\n\n");
}
