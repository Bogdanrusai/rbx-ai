"use client";

import { motion } from "framer-motion";
import MaskReveal from "./MaskReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const stops = [
  {
    t: "Clientul scrie",
    d: "Pe WhatsApp, Instagram sau site — oricând.",
    icon: (
      <path d="M4 5h16v11H8l-4 4V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    t: "Sistemul răspunde",
    d: "Instant, ca un om — dar fără pauză.",
    icon: (
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    t: "Programarea se confirmă",
    d: "Fără telefon dat, fără „când sunteți liber?”.",
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M3.5 9.5h17M8 3v4m8-4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
];

export default function Demonstratie() {
  return (
    <section id="demo" className="section overflow-hidden">
      <div className="eyebrow mb-8">Demonstrație</div>
      <h2 className="max-w-[14ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]">
        <MaskReveal>Nu-ți spun că funcționează.</MaskReveal>
        <MaskReveal delay={0.1}>
          <span className="mark">Îți arăt.</span>
        </MaskReveal>
      </h2>

      <div className="relative mt-24">
        {/* connecting line */}
        <div className="absolute left-[26px] top-[26px] h-[calc(100%-52px)] w-px bg-line-strong md:left-0 md:top-[26px] md:h-px md:w-full">
          <motion.div
            initial={{ scaleY: 0, scaleX: 0 }}
            whileInView={{ scaleY: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 1.6, ease: EASE }}
            style={{ transformOrigin: "top left" }}
            className="h-full w-full origin-top bg-white/40 md:origin-left"
          />
          {/* traveling packet */}
          <motion.span
            className="absolute -left-[3px] top-[-3.5px] h-2 w-2 rounded-full bg-white md:left-[-3.5px] md:top-[-3px]"
            animate={{
              top: ["0%", "100%"],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
            style={{ willChange: "transform" }}
          />
        </div>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-8">
          {stops.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.18 }}
              className="relative pl-16 md:pl-0 md:text-center"
            >
              <div className="absolute left-0 top-0 grid h-[52px] w-[52px] place-items-center rounded-full border border-line-strong bg-bg text-ink md:relative md:mx-auto">
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  {s.icon}
                </svg>
              </div>
              <h3 className="mt-1 text-[19px] font-semibold tracking-[-0.015em] md:mt-6">{s.t}</h3>
              <p className="mt-2 max-w-[26ch] text-[14.5px] leading-[1.55] text-faint md:mx-auto">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mx-auto mt-20 max-w-[46ch] text-center text-[15px] leading-[1.6] text-muted"
      >
        Ăsta e fluxul complet, în orice sistem pe care ți-l construiesc — de
        la primul mesaj până la programarea confirmată.
      </motion.p>
    </section>
  );
}
