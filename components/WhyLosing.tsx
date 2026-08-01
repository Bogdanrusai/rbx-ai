"use client";

import { motion } from "framer-motion";
import MaskReveal from "./MaskReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const stages = [
  { t: "Lead nou", w: 100 },
  { t: "Răspuns întârziat", w: 74 },
  { t: "Interes în scădere", w: 46 },
  { t: "Client pierdut", w: 18 },
];

export default function WhyLosing() {
  return (
    <section id="de-ce-pierd" className="section">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
        <div>
          <div className="eyebrow mb-8">De ce se întâmplă</div>
          <h2 className="max-w-[15ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]">
            <MaskReveal>Fiecare oră de tăcere</MaskReveal>
            <MaskReveal delay={0.1}>costă bani.</MaskReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mt-8 max-w-[46ch] text-[clamp(15.5px,1.6vw,18px)] leading-[1.65] text-muted"
          >
            Cu cât un mesaj stă mai mult fără răspuns, cu atât interesul
            clientului scade — și odată pierdut, rareori mai revine. Nu
            pentru că serviciul tău e slab. Pentru că altcineva a răspuns
            primul.
          </motion.p>
        </div>

        {/* illustrative funnel — directional, not a fabricated statistic */}
        <div className="flex flex-col gap-5">
          {stages.map((s, i) => (
            <div key={s.t}>
              <div className="mb-2 flex items-baseline justify-between text-[13px] text-faint">
                <span>{s.t}</span>
              </div>
              <div className="h-[10px] w-full overflow-hidden rounded-full bg-white/[0.05]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.w}%` }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 1.1, ease: EASE, delay: i * 0.12 }}
                  className={`h-full rounded-full ${i === 0 ? "bg-white/70" : i === 3 ? "bg-white/25" : "bg-white/45"}`}
                />
              </div>
            </div>
          ))}
          <p className="mt-2 text-[12.5px] leading-[1.5] text-faint">
            Ilustrativ — arată direcția, nu date dintr-un client anume.
          </p>
        </div>
      </div>
    </section>
  );
}
