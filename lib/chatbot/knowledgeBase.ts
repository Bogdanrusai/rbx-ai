// Baza de cunoștințe a asistentului RBX.AI.
//
// REGULĂ ABSOLUTĂ: acest fișier conține DOAR fapte reale, deja publice pe
// website. Niciun preț, termen de livrare, client, testimonial, cifră de
// rezultat sau garanție nu apare aici — intenționat. Dacă vrei să adaugi o
// afirmație nouă, adaug-o DOAR dacă e deja verificată/publicată pe site.
// Asistentul răspunde exclusiv pe baza acestui context (vezi guard.ts).

export const RBX_KNOWLEDGE_BASE = {
  identitate:
    "RBX.AI e construit de Bogdan Rus, un antreprenor român care documentează procesul public, pe Instagram (@bogdanrus.ai). RBX.AI e la început de drum — nu pretinde ani de experiență sau un portofoliu mare de clienți.",

  cePresupune:
    "RBX.AI construiește sisteme AI practice pentru afaceri mici și mijlocii: preiau mesajele clienților, califică lead-urile, programează, trimit follow-up și fac munca repetitivă — non-stop, nu doar în program. Nu e „magie AI” și nu e o promisiune că AI-ul înlocuiește angajații — e infrastructură care rezolvă un proces concret, prost pus la punct.",

  filosofie:
    "Nu se pune AI peste un proces prost. Primul pas e mereu să se înțeleagă cum lucrează afacerea; abia apoi se construiește sistemul, se testează și se documentează.",

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

  proces: [
    "1. Analiză gratuită — completezi formularul de pe site cu câteva informații despre afacerea ta.",
    "2. Bogdan analizează personal fiecare răspuns — nu e o analiză automată.",
    "3. Revine cu o soluție construită special pentru afacerea ta (nu un pachet standard).",
    "4. Dacă merge înainte, sistemul se construiește, se testează și se predă — cu documentație, nu o cutie neagră.",
  ],

  cumInceperea:
    "Se începe prin formularul „Vreau o analiză gratuită” de pe site (butonul principal). Nu presupune niciun cost sau obligație în acest pas.",

  dupaFormular:
    "După ce formularul e trimis, Bogdan analizează personal informațiile primite — nu e un proces automat — și revine cu soluția potrivită pentru afacerea respectivă. Nu există momentan o programare automată de apel (nu e integrat un calendar) — următorul pas e stabilit direct, personal, în urma analizei.",

  programare:
    "În acest moment nu există o funcție de programare automată a unui apel pe site. Pasul următor, după formular, e stabilit direct de Bogdan, personal — de obicei printr-un mesaj sau un apel scurt de descoperire. Dacă vizitatorul vrea să vorbească direct cu el, cea mai sigură cale e tot formularul de analiză.",

  vsl:
    "Secțiunea „Cadru cu cadru, povestea completă” de pe homepage (ancora #vsl) prezintă, prin cadre reale — format carusel, nu video — problema pe care o rezolvă RBX.AI și cum funcționează soluția.",

  proiecte: [
    {
      nume: "Expert Instal Serv.",
      status:
        "Proiect pilot real, aflat ACUM în testare/feedback. Sistemul a fost construit și e folosit efectiv, dar nu există încă rezultate/cifre/testimoniale confirmate de client — acelea se adaugă doar când sunt reale.",
    },
    {
      nume: "RBX.AI — website-ul propriu",
      status:
        "Acest website e el însuși un proiect intern RBX.AI: strategie, arhitectură, copywriting, design, sistem de calificare a lead-urilor și asistentul cu care vorbești acum au fost construite și documentate ca sistem, nu doar ca site de prezentare.",
    },
  ],

  reguliStricte: [
    "Nu inventează niciodată clienți, testimoniale, cifre de rezultate, venituri sau creșteri de conversie.",
    "Nu promite niciodată timp exact de livrare, preț fix sau garanții de rezultat.",
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
    `Identitate: ${kb.identitate}`,
    `Servicii:\n${servicii}`,
    `Proces:\n${kb.proces.join("\n")}`,
    `Cum se începe: ${kb.cumInceperea}`,
    `Ce se întâmplă după formular: ${kb.dupaFormular}`,
    `Programare/apel: ${kb.programare}`,
    `VSL: ${kb.vsl}`,
    `Proiecte:\n${proiecte}`,
  ].join("\n\n");
}
