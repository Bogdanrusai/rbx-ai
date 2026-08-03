"use client";

import { motion } from "framer-motion";
import MaskReveal from "./MaskReveal";
import ScrollParallax from "./ScrollParallax";
import GhostWord from "./GhostWord";

const EASE = [0.16, 1, 0.3, 1] as const;

const shifts = [
  { from: "Clientul așteaptă ore", to: "Răspuns și acțiune imediată" },
  { from: "Tu faci totul manual", to: "Sistemul face munca repetitivă" },
  { from: "Lucruri care scapă printre degete", to: "Fiecare lead și task, sub control" },
];

export default function Solutia() {
  return (
    <section id="solutia" className="section relative overflow-hidden">
      <GhostWord word="SISTEM" className="right-[-4%] bottom-[8%]" />

      <div className="relative max-w-[720px]">
        <div className="eyebrow mb-8">Soluția</div>
        <h2 className="text-[clamp(30px,5vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
          <MaskReveal>Un sistem care lucrează</MaskReveal>
          <MaskReveal delay={0.1}>
            <span className="mark">în locul tău</span>.
          </MaskReveal>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-8 max-w-[46ch] text-[clamp(15.5px,1.6vw,18px)] leading-[1.65] text-muted"
        >
          Nu îți vând un instrument. Îți construiesc infrastructura AI care
          preia munca — și pe care o simți în bani și timp liber din prima
          săptămână.
        </motion.p>
      </div>

      <ScrollParallax range={40} className="relative mt-20">
        <div className="flex flex-col divide-y divide-line">
          {shifts.map((s, i) => (
            <motion.div
              key={s.to}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              className="grid grid-cols-1 items-center gap-3 py-7 sm:grid-cols-[1fr_auto_1fr] sm:gap-8"
            >
              <span className="text-[clamp(16px,1.8vw,20px)] text-faint line-through decoration-white/20">
                {s.from}
              </span>
              <span className="hidden text-muted sm:block" aria-hidden>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span className="text-[clamp(18px,2.2vw,26px)] font-semibold tracking-[-0.015em] sm:text-right">
                {s.to}
              </span>
            </motion.div>
          ))}
        </div>
      </ScrollParallax>
    </section>
  );
}
