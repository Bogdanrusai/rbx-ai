"use client";

import { motion } from "framer-motion";
import MaskReveal from "./MaskReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const stats = [
  { n: "0", t: "clienți ascunși", d: "Tot ce construiesc e vizibil, din prima zi." },
  { n: "100%", t: "public", d: "Fiecare sistem, documentat pas cu pas pe Instagram." },
  { n: "1", t: "promisiune", d: "Nimic nu ajunge pe site dacă nu funcționează cu adevărat." },
];

export default function DovadaSociala() {
  return (
    <section id="dovada" className="section">
      <div className="eyebrow mb-8">Dovada</div>
      <h2 className="max-w-[18ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]">
        <MaskReveal>Nu am clienți de arătat.</MaskReveal>
        <MaskReveal delay={0.1}>
          Am <span className="mark">procesul</span>.
        </MaskReveal>
      </h2>

      <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
          >
            <div className="text-[clamp(48px,6vw,68px)] font-semibold leading-none tracking-[-0.03em]">
              {s.n}
            </div>
            <div className="mt-3 text-[15px] font-medium text-muted">{s.t}</div>
            <p className="mt-2 max-w-[26ch] text-[13.5px] leading-[1.55] text-faint">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
