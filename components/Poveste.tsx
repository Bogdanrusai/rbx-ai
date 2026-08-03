"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MaskReveal from "./MaskReveal";
import { site } from "@/lib/config";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Poveste() {
  return (
    <section id="poveste" className="section">
      <div className="grid grid-cols-1 items-center gap-[clamp(30px,5vw,72px)] md:grid-cols-[0.85fr_1.15fr]">
        <motion.figure
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[22px] border border-line-strong bg-[#0E0E10]"
        >
          <Image
            src="/portrait.jpg"
            alt="Bogdan Rus, fondator RBX.AI"
            fill
            sizes="(max-width:768px) 90vw, 40vw"
            className="object-cover object-[center_20%] grayscale contrast-[1.05]"
          />
          <figcaption className="absolute bottom-4 left-[18px] text-[12px] uppercase tracking-[0.14em] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.7)]">
            <b className="font-semibold">Bogdan Rus</b> · RBX.AI
          </figcaption>
        </motion.figure>

        <div>
          <div className="eyebrow mb-8">Despre mine</div>
          <h2 className="max-w-[16ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]">
            <MaskReveal>Sunt la început.</MaskReveal>
            <MaskReveal delay={0.1}>
              Și arăt <span className="mark">tot</span>.
            </MaskReveal>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="mt-8 max-w-[52ch] text-[clamp(15.5px,1.6vw,18px)] leading-[1.65] text-muted"
          >
            Nu am moștenit o agenție. Am ales să construiesc una — în public,
            fără filtru, fără să pretind că sunt mai departe decât sunt.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.24 }}
            className="mt-5 max-w-[52ch] text-[clamp(15.5px,1.6vw,18px)] leading-[1.65] text-muted"
          >
            Sisteme AI pentru afaceri din România. Fiecare sistem e
            construit de la zero pentru afacerea respectivă — nu la
            fotocopiator.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.34 }}
            className="mt-8 text-[14px] tracking-[0.02em] text-faint"
          >
            <b className="font-medium text-muted">{site.handle}</b> · construit în public, pas cu pas
          </motion.p>
        </div>
      </div>
    </section>
  );
}
