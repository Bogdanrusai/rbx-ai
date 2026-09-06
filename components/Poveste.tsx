"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MaskReveal from "./MaskReveal";
import { site } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

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
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />
          <Image
            src="/portrait.jpg"
            alt="Bogdan Rus, fondator RBX.AI"
            fill
            sizes="(max-width:768px) 90vw, 40vw"
            className="object-cover object-[center_20%] grayscale contrast-[1.1] brightness-[0.96]"
          />
          <figcaption className="absolute bottom-4 left-[18px] z-10 text-[12px] uppercase tracking-[0.14em] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.7)]">
            <b className="font-semibold">Bogdan Rus</b> · RBX.AI
          </figcaption>
        </motion.figure>

        <div>
          <div className="eyebrow mb-8">
            <span className="tabular-nums text-muted">11</span>
            <span aria-hidden="true">·</span>
            Despre mine
          </div>
          <h2 className="max-w-[18ch] text-[clamp(28px,4.4vw,50px)] font-semibold leading-[1.1] tracking-[-0.022em]">
            <MaskReveal>N-am construit RBX.AI ca să vând AI.</MaskReveal>
            <MaskReveal delay={0.1}>
              L-am construit ca să <span className="mark">rezolv procese</span>.
            </MaskReveal>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="mt-8 max-w-[52ch] text-[clamp(15.5px,1.6vw,18px)] leading-[1.65] text-muted"
          >
            Construiesc RBX.AI în jurul unei idei simple: înainte să automatizezi ceva, trebuie să
            înțelegi procesul. Procesele care consumă timp și pierd oportunități sunt ce rezolv,
            nu AI de dragul AI-ului.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.24 }}
            className="mt-5 max-w-[52ch] text-[clamp(15.5px,1.6vw,18px)] leading-[1.65] text-muted"
          >
            Apoi construiesc sistemul potrivit pentru procesul respectiv, îl testez, adun feedback
            real și îl îmbunătățesc. Documentez tot. Nu ador nimic ascuns într-o cutie neagră.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.34 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("social_outbound_click", { from: "poveste", channel: "instagram" })}
              className="btn-ghost group"
            >
              <span className="h-[5px] w-[5px] rounded-full bg-faint" />
              Urmărește procesul pas cu pas pe Instagram
              <span className="transition-transform duration-300 ease-premium group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
