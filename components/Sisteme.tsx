"use client";

import { motion } from "framer-motion";
import MaskReveal from "./MaskReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const catalog = [
  { cat: "Automatizări", items: ["n8n", "App-uri conectate", "Email & follow-up", "Lead management"] },
  { cat: "AI Agents", items: ["Agenți AI dedicați", "Preluare cereri", "Calificare clienți"] },
  { cat: "CRM & date", items: ["CRM Automation", "Programări automate", "Rapoarte"] },
  { cat: "Sisteme interne", items: ["Procese interne", "WhatsApp & Instagram", "Construit la comandă"] },
];

export default function Sisteme() {
  return (
    <section id="sisteme" className="section">
      <div className="eyebrow mb-8">Sistemele RBX.AI</div>
      <h2 className="max-w-[16ch] text-[clamp(30px,5vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]">
        <MaskReveal>Sisteme complete,</MaskReveal>
        <MaskReveal delay={0.1}>
          construite pe <span className="mark">afacerea ta</span>.
        </MaskReveal>
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-6">
        {/* 1 — hero card */}
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
                Cel mai important
              </span>
              <h3 className="text-[clamp(26px,3.2vw,38px)] font-semibold leading-[1.1] tracking-[-0.02em]">
                Un sistem care lucrează non-stop.
              </h3>
              <p className="mt-3 max-w-[38ch] text-[14.5px] text-faint">
                Preia cereri, califică clienți, programează, trimite în CRM și
                pornește follow-up — automat, la orice oră. Tu vezi doar
                rezultatul.
              </p>
            </div>
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

        {/* 2 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          className="card col-span-1 rounded-[24px] p-8 md:col-span-3"
        >
          <motion.svg
            width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true"
            className="mb-6 text-ink"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <path d="M4 8a8 8 0 0 1 14-3m2 3V4m0 4h-4M20 16a8 8 0 0 1-14 3m-2-3v4m0-4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
          <h3 className="text-[21px] font-semibold tracking-[-0.015em]">Îți aduce clienții înapoi.</h3>
          <p className="mt-2.5 text-[14px] text-faint">Revine automat la cei care n-au răspuns — până cumpără.</p>
        </motion.div>

        {/* 3 */}
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
          <h3 className="text-[21px] font-semibold tracking-[-0.015em]">Îți umple calendarul.</h3>
          <p className="mt-2.5 text-[14px] text-faint">Programări confirmate, fără un telefon dat.</p>
        </motion.div>

        {/* 4 */}
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
          <h3 className="text-[19px] font-semibold tracking-[-0.015em]">Îți crește reputația.</h3>
          <p className="mt-2.5 text-[13.5px] text-faint">Cere recenzii automat, la momentul potrivit.</p>
        </motion.div>

        {/* 5 */}
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
          <h3 className="text-[19px] font-semibold tracking-[-0.015em]">Te ține prezent online.</h3>
          <p className="mt-2.5 text-[13.5px] text-faint">Dintr-un video → o săptămână de postări.</p>
        </motion.div>

        {/* 6 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="card col-span-1 rounded-[24px] p-8 md:col-span-2"
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mb-6"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
          <h3 className="text-[19px] font-semibold tracking-[-0.015em]">Totul, într-un sistem.</h3>
          <p className="mt-2.5 text-[13.5px] text-faint">Nu funcții separate — o singură mașinărie care lucrează.</p>
        </motion.div>

        {/* catalog */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="col-span-1 rounded-[24px] border border-dashed border-line-strong p-8 md:col-span-6"
        >
          <p className="mb-6 text-[13px] uppercase tracking-[0.16em] text-faint">
            Construiesc orice sistem de care are nevoie afacerea ta
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
