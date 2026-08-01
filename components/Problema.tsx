"use client";

import { motion } from "framer-motion";
import MaskReveal from "./MaskReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const pains = [
  { n: "01", t: "Mesaje fără răspuns", d: "Clientul scrie seara. Tu răspunzi dimineața. Prea târziu." },
  { n: "02", t: "Programări pe telefon", d: "Ore pierdute cu „când sunteți liber?”." },
  { n: "03", t: "Lead-uri uitate", d: "A întrebat acum o săptămână. Nimeni n-a revenit." },
];

export default function Problema() {
  return (
    <section id="problema" className="section">
      <div className="eyebrow mb-8">Problema</div>
      <h2 className="max-w-[18ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]">
        <MaskReveal>Fiecare afacere pierde bani</MaskReveal>
        <MaskReveal delay={0.1}>în același loc:</MaskReveal>
      </h2>

      <div className="mt-20 flex flex-col">
        {pains.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
            className="group grid grid-cols-[auto_1fr] items-baseline gap-6 border-t border-line py-8 last:border-b sm:grid-cols-[100px_1fr_1.2fr] sm:gap-10"
          >
            <span className="text-[15px] font-medium tracking-[0.1em] text-faint transition-colors duration-500 group-hover:text-muted">
              {p.n}
            </span>
            <h3 className="text-[clamp(22px,2.6vw,32px)] font-semibold leading-[1.1] tracking-[-0.015em]">
              {p.t}
            </h3>
            <p className="text-[15.5px] leading-[1.6] text-faint sm:text-right">{p.d}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="mt-16 max-w-[26ch] text-[clamp(19px,2.4vw,27px)] font-medium leading-[1.35] tracking-[-0.015em]"
      >
        Nu pierzi clienți pentru că ești slab.
        <br />
        <span className="text-faint">Îi pierzi pentru că nu poți fi peste tot, non-stop.</span>
      </motion.p>
    </section>
  );
}
