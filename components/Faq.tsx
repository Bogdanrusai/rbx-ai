"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { site } from "@/lib/config";

const EASE = [0.16, 1, 0.3, 1] as const;

const items = [
  {
    q: "Trebuie să știu ceva despre tehnologie?",
    a: "Nu. Tu îmi spui cum merge afacerea ta. Restul — construcție, conectare, întreținere — le fac eu. Tu folosești doar rezultatul.",
  },
  {
    q: "În cât timp văd rezultate?",
    a: "De obicei în zile, nu luni. Primul lucru pe care îl simți e că lucruri care îți mâncau timp se întâmplă acum singure.",
  },
  {
    q: "Merge și pentru afacerea mea mică?",
    a: "Mai ales pentru ea. Când ești tu peste tot, un sistem care răspunde și programează în locul tău schimbă cel mai mult.",
  },
  {
    q: "Cât costă?",
    a: "Începe de la o discuție, nu de la o factură. Vedem întâi dacă are sens pentru afacerea ta — apoi vorbim de preț.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section">
      <div className="eyebrow mb-8">Întrebări</div>
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

      <Reveal delay={0.1} className="mt-10">
        <a href={site.contactUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost group">
          <span className="h-[5px] w-[5px] rounded-full bg-faint" />
          Altă întrebare? Scrie-mi direct
          <span className="transition-transform duration-300 ease-premium group-hover:translate-x-1">→</span>
        </a>
      </Reveal>
    </section>
  );
}
