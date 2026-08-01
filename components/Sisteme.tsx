"use client";

import { motion } from "framer-motion";
import MaskReveal from "./MaskReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const catalog = [
  { cat: "Mesagerie", items: ["WhatsApp Chatbot", "Chatbots AI", "Recepționer imobiliare"] },
  { cat: "Voce", items: ["Agent vocal programări", "Automatizare agent vocal", "Agent vocal premium"] },
  { cat: "Lead-uri", items: ["Scraping Google Maps", "Outreach Google Maps", "YouTube Scraper"] },
  { cat: "Organizare", items: ["Analiză CV-uri", "Calendar Reminders"] },
];

export default function Sisteme() {
  return (
    <section id="sisteme" className="section">
      <div className="eyebrow mb-8">Sistemele mele</div>
      <h2 className="max-w-[15ch] text-[clamp(30px,5vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
        <MaskReveal>Un sistem, făcut</MaskReveal>
        <MaskReveal delay={0.1}>
          pe măsura <span className="mark">afacerii tale</span>.
        </MaskReveal>
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-6">
        {/* 1 — hero card, full width, animated waveform */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="card relative col-span-1 overflow-hidden rounded-[24px] p-10 md:col-span-6"
        >
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <span className="mb-4 inline-block rounded-full border border-line px-3 py-1.5 text-[10.5px] uppercase tracking-[0.18em] text-faint">
                Inima sistemului
              </span>
              <h3 className="text-[clamp(26px,3.2vw,38px)] font-semibold leading-[1.1] tracking-[-0.02em]">
                Niciun client nu mai așteaptă.
              </h3>
              <p className="mt-3 max-w-[38ch] text-[14.5px] text-faint">
                Răspuns în câteva secunde. La orice oră, în orice zi.
              </p>
            </div>
            {/* animated waveform */}
            <div className="flex h-16 items-end gap-[5px]" aria-hidden="true">
              {[14, 28, 42, 30, 50, 24, 38, 20].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-[6px] rounded-full bg-white/60"
                  style={{ height: h }}
                  animate={{ scaleY: [1, 0.4, 1] }}
                  transition={{ duration: 1.4 + (i % 3) * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* 2 — follow-up, rotating loop icon */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          className="card group col-span-1 rounded-[24px] p-8 md:col-span-3"
        >
          <motion.svg
            width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true"
            className="mb-6 text-ink"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <path d="M4 8a8 8 0 0 1 14-3m2 3V4m0 4h-4M20 16a8 8 0 0 1-14 3m-2-3v4m0-4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
          <h3 className="text-[21px] font-semibold tracking-[-0.015em]">Niciun lead pierdut.</h3>
          <p className="mt-2.5 text-[14px] text-faint">Follow-up automat, până primești răspuns.</p>
        </motion.div>

        {/* 3 — programari, calendar check */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="card col-span-1 rounded-[24px] p-8 md:col-span-3"
        >
          <div className="relative mb-6 h-[34px] w-[34px]">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3.5 9.5h17M8 3v4m8-4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <motion.svg
              width="14" height="14" viewBox="0 0 16 16" fill="none" className="absolute -bottom-1 -right-1"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
            >
              <circle cx="8" cy="8" r="8" fill="#FAFAFA" />
              <path d="M4.5 8.2l2.2 2.2L11.5 5.5" stroke="#0A0A0B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </motion.svg>
          </div>
          <h3 className="text-[21px] font-semibold tracking-[-0.015em]">Calendarul se umple singur.</h3>
          <p className="mt-2.5 text-[14px] text-faint">Programări fără un telefon dat.</p>
        </motion.div>

        {/* 4 — reputatie, stars fill */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="card col-span-1 rounded-[24px] p-8 md:col-span-2"
        >
          <div className="mb-6 flex gap-1" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.svg
                key={i} width="16" height="16" viewBox="0 0 24 24"
                initial={{ opacity: 0.15 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
              >
                <path d="m12 3 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.2l1-5.9L3.5 9.2l5.9-.8L12 3Z" fill="#FAFAFA" />
              </motion.svg>
            ))}
          </div>
          <h3 className="text-[19px] font-semibold tracking-[-0.015em]">Reputația crește fără tine.</h3>
          <p className="mt-2.5 text-[13.5px] text-faint">Recenzii cerute automat, la momentul potrivit.</p>
        </motion.div>

        {/* 5 — content, stacked layers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="card group col-span-1 rounded-[24px] p-8 md:col-span-2"
        >
          <div className="relative mb-6 h-9 w-9" aria-hidden="true">
            <span className="absolute inset-0 rounded-[7px] border border-line-strong transition-transform duration-500 ease-premium group-hover:-translate-y-1.5 group-hover:-translate-x-1.5" />
            <span className="absolute inset-0 rounded-[7px] border border-line-strong bg-bg transition-transform duration-500 ease-premium" />
            <span className="absolute inset-0 grid place-items-center rounded-[7px] border border-line-strong bg-bg transition-transform duration-500 ease-premium group-hover:translate-y-1.5 group-hover:translate-x-1.5">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
            </span>
          </div>
          <h3 className="text-[19px] font-semibold tracking-[-0.015em]">Prezent online, mereu.</h3>
          <p className="mt-2.5 text-[13.5px] text-faint">Un video → o săptămână de conținut.</p>
        </motion.div>

        {/* 6 — extended catalog strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="col-span-1 rounded-[24px] border border-dashed border-line-strong p-8 md:col-span-6"
        >
          <p className="mb-6 text-[13px] uppercase tracking-[0.16em] text-faint">
            + alte sisteme pe care le pot construi
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {catalog.map((c) => (
              <div key={c.cat}>
                <div className="mb-3 text-[13px] font-medium text-muted">{c.cat}</div>
                <div className="flex flex-wrap gap-2">
                  {c.items.map((it) => (
                    <span key={it} className="rounded-full border border-line px-3 py-1.5 text-[11.5px] text-faint">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
