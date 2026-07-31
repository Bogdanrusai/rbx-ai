"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/config";
import { Arrow } from "./Icons";

const EASE = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

export default function Hero() {
  return (
    <header
      id="top"
      className="relative z-[5] mx-auto flex min-h-[100svh] max-w-content flex-col justify-center px-[clamp(20px,5vw,64px)] pb-[90px] pt-[110px] sm:pb-0 sm:pt-[140px]"
    >
      <motion.div {...rise(0.05)} className="eyebrow mb-[34px]">
        Sisteme AI pentru afaceri
      </motion.div>

      <motion.h1
        {...rise(0.18)}
        className="max-w-[16ch] text-[clamp(38px,7vw,82px)] font-semibold leading-[1.02] tracking-[-0.03em]"
      >
        Clienții tăi primesc răspuns <span className="mark">instant</span>. Chiar
        și la 3 noaptea.
      </motion.h1>

      <motion.p
        {...rise(0.34)}
        className="mt-[30px] max-w-[46ch] text-[clamp(16px,1.7vw,19px)] leading-[1.55] text-muted"
      >
        Construiesc sisteme AI care răspund, programează și fac follow-up
        non-stop — ca să nu mai pierzi niciun client care scrie când tu nu ești
        acolo.
      </motion.p>

      <motion.div {...rise(0.5)} className="mt-[44px] flex flex-wrap items-center gap-[22px]">
        <a href={site.contactUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          {site.ctaLabel}
          <Arrow />
        </a>
        <a href="#demo" className="btn-ghost">
          <span className="h-[5px] w-[5px] rounded-full bg-faint" />
          Vorbește cu sistemul →
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1 }}
        className="static mt-16 flex items-center justify-between sm:absolute sm:inset-x-[clamp(20px,5vw,64px)] sm:bottom-[34px] sm:mt-0"
      >
        <div className="flex items-center gap-[10px] text-[11.5px] uppercase tracking-[0.24em] text-faint">
          <b className="font-medium text-muted">România</b>
          <b className="hidden font-medium text-muted sm:inline">Dubai</b>
          <b className="hidden font-medium text-muted sm:inline">Global</b>
        </div>
        <div className="flex items-center gap-[10px] text-[11.5px] uppercase tracking-[0.2em] text-faint">
          Scroll
          <span className="relative block h-[34px] w-px overflow-hidden bg-line-strong">
            <span className="absolute left-0 top-0 h-3 w-px animate-[drop_2.4s_var(--ease)_infinite] bg-ink" />
          </span>
        </div>
      </motion.div>
    </header>
  );
}
