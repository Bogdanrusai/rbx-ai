"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/config";
import { Arrow } from "./Icons";
import MaskReveal from "./MaskReveal";
import Magnetic from "./Magnetic";
import GhostWord from "./GhostWord";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Cta() {
  return (
    <section id="contact" className="relative z-[5] overflow-hidden py-[clamp(140px,20vh,220px)]">
      <GhostWord word="RBX.AI" className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[130px]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[900px] px-[clamp(20px,5vw,64px)] text-center">
        <h2 className="mx-auto max-w-[18ch] text-[clamp(32px,6.2vw,74px)] font-semibold leading-[1.05] tracking-[-0.03em]">
          <MaskReveal className="mx-auto">Dacă și-a construit așa</MaskReveal>
          <MaskReveal delay={0.1} className="mx-auto">
            propriul sistem —
          </MaskReveal>
          <MaskReveal delay={0.2} className="mx-auto">
            ce poate construi <span className="mark">pentru al tău?</span>
          </MaskReveal>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
          className="mx-auto mt-8 max-w-[38ch] text-[clamp(16px,1.8vw,19px)] text-muted"
        >
          Lucrez cu un număr limitat de afaceri. Dacă ești serios, hai să
          vedem ce poate face RBX.AI pentru tine.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <Magnetic strength={22}>
            <a href={site.contactUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !px-9 !py-[18px] !text-[16px]">
              {site.ctaLabel}
              <Arrow />
            </a>
          </Magnetic>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-7 text-[13px] tracking-[0.03em] text-faint"
        >
          Fără presiune. Fără obligații.
        </motion.p>
      </div>
    </section>
  );
}
