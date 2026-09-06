"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { useWizard } from "./wizard/WizardContext";
import { trackEvent } from "@/lib/analytics";

const EASE = [0.16, 1, 0.3, 1] as const;

const items = [
  {
    q: "Trebuie să știu ceva despre tehnologie?",
    a: "Nu. Îmi spui cum merge afacerea ta, iar construcția, conectarea și întreținerea rămân treaba mea. Tu folosești doar rezultatul.",
  },
  {
    q: "În cât timp văd rezultate?",
    a: "Depinde de sistemul construit și de cât de complex e procesul din spate, așa că nu promit un termen fix înainte să înțeleg afacerea ta. Odată ce sistemul e live, îl vezi lucrând din prima zi.",
  },
  {
    q: "Merge și pentru afacerea mea mică?",
    a: "Mai ales pentru ea. Când ești tu peste tot, un sistem care preia sarcinile repetitive în locul tău schimbă cel mai mult.",
  },
  {
    q: "Cât costă?",
    a: "Depinde de ce trebuie construit și de complexitatea proiectului. Analizăm întâi procesul și ce are nevoie afacerea ta, apoi discutăm soluția potrivită; primul pas e analiza gratuită.",
  },
  {
    q: "Pot construi doar un website, fără automatizări?",
    a: "Da, un website bun stă și singur. Restul (lead capture, automatizări, CRM) se adaugă doar dacă are sens pentru afacerea ta, nu pentru că există în meniu.",
  },
  {
    q: "Ce se întâmplă după ce trimit formularul?",
    a: "Analizez personal fiecare răspuns, fără nicio analiză automată, și revin cu o soluție construită special pentru afacerea ta, nu un pachet standard.",
  },
  {
    q: "Am deja un website. Are sens să vorbim?",
    a: "Da. Nu orice sistem înseamnă un website nou; de multe ori are mai mult sens să conectez ce ai deja (formulare, mesaje, programări) la un sistem care le preia automat.",
  },
  {
    q: "Ce se întâmplă cu datele clienților mei?",
    a: "Datele colectate prin formularul de analiză (nume, contact, informații despre afacere) sunt folosite doar pentru a pregăti analiza și soluția propusă. Detaliile complete sunt pe pagina de Confidențialitate.",
  },
  {
    q: "Ce se întâmplă dacă asistentul AI de pe site greșește ceva?",
    a: "Asistentul răspunde strict din informații reale despre RBX.AI și nu inventează prețuri, rezultate sau garanții. Dacă nu știe un răspuns, spune clar asta și te trimite spre formular, în loc să ghicească.",
  },
  {
    q: "Pot renunța sau opri sistemul dacă nu mai are sens pentru mine?",
    a: "Da. Nu există un abonament ascuns sau o obligație pe termen lung impusă tehnic; discutăm condițiile exacte când vorbim despre soluția potrivită.",
  },
  {
    q: "Nu am foarte mult trafic sau multe cereri. Are sens și pentru mine?",
    a: "Contează mai mult cât te costă fiecare cerere pierdută sau întârziată, nu volumul brut. Cel mai bun mod să afli e analiza gratuită, unde spun clar dacă chiar are sens sau nu.",
  },
];

export default function Faq() {
  const { open: openWizard } = useWizard();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section">
      <div className="eyebrow mb-8">
        <span className="tabular-nums text-muted">12</span>
        <span aria-hidden="true">·</span>
        Întrebări
      </div>
      <h2 className="max-w-[16ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]">
        Înainte să întrebi.
      </h2>

      <div className="mt-[52px] max-w-[760px]">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={it.q} delay={i * 0.06} className="border-b border-line">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-5 py-6 text-left text-[clamp(16px,1.9vw,19px)] font-medium tracking-[-0.01em] text-ink"
              >
                {it.q}
                <span className="relative h-5 w-5 flex-none">
                  <span className="absolute left-0 top-[9px] h-0.5 w-5 rounded bg-muted" />
                  <span
                    className={`absolute left-[9px] top-0 h-5 w-0.5 rounded bg-muted transition-opacity duration-300 ${
                      isOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[60ch] pb-6 text-[15.5px] leading-[1.6] text-muted">{it.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-8">
        <p className="text-[13.5px] text-faint">Nu ai găsit răspunsul?</p>
        <button
          onClick={() => {
            trackEvent("faq_chatbot_open");
            window.dispatchEvent(new CustomEvent("rbx:open-chatbot"));
          }}
          className="btn-ghost group"
        >
          <span className="h-[5px] w-[5px] rounded-full bg-faint" />
          Întreabă asistentul
        </button>
        <button onClick={() => openWizard()} className="btn-ghost group">
          <span className="h-[5px] w-[5px] rounded-full bg-faint" />
          Cere o analiză gratuită
          <span className="transition-transform duration-300 ease-premium group-hover:translate-x-1">→</span>
        </button>
      </Reveal>
    </section>
  );
}
