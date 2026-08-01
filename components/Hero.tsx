"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { site } from "@/lib/config";
import { Arrow } from "./Icons";
import MaskReveal from "./MaskReveal";
import Magnetic from "./Magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const orb1x = useTransform(sx, (v) => v * 0.6);
  const orb1y = useTransform(sy, (v) => v * 0.6);
  const orb2x = useTransform(sx, (v) => v * -0.4);
  const orb2y = useTransform(sy, (v) => v * -0.4);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left - r.width / 2) / 8);
    my.set((e.clientY - r.top - r.height / 2) / 8);
  };

  return (
    <header
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative z-[5] flex min-h-[100svh] items-center justify-center overflow-hidden px-[clamp(20px,5vw,64px)] pb-24 pt-[120px]"
    >
      {/* floating light orbs, mouse-parallax */}
      <motion.div
        style={{ x: orb1x, y: orb1y }}
        className="pointer-events-none absolute left-[8%] top-[18%] h-[280px] w-[280px] rounded-full bg-white/[0.05] blur-[90px] [animation:floatY_9s_ease-in-out_infinite]"
        aria-hidden
      />
      <motion.div
        style={{ x: orb2x, y: orb2y }}
        className="pointer-events-none absolute bottom-[12%] right-[10%] h-[340px] w-[340px] rounded-full bg-white/[0.04] blur-[110px] [animation:floatY_11s_ease-in-out_infinite_-3s]"
        aria-hidden
      />

      <div className="relative z-[2] mx-auto flex max-w-content flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="eyebrow mb-10 justify-center"
        >
          Sisteme AI pentru afaceri
        </motion.div>

        <h1 className="max-w-[19ch] text-[clamp(40px,7.4vw,92px)] font-semibold leading-[1.01] tracking-[-0.035em]">
          <MaskReveal delay={0.15}>Clienții tăi primesc</MaskReveal>
          <MaskReveal delay={0.28}>
            răspuns <span className="mark">instant</span>.
          </MaskReveal>
          <MaskReveal delay={0.41} className="text-muted">
            Chiar și la 3 noaptea.
          </MaskReveal>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          className="mt-10 max-w-[46ch] text-[clamp(16px,1.7vw,19px)] leading-[1.55] text-muted"
        >
          Construiesc sisteme AI care răspund, programează și fac follow-up
          non-stop — ca să nu mai pierzi niciun client care scrie când tu nu
          ești acolo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
        >
          <Magnetic>
            <a href={site.contactUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {site.ctaLabel}
              <Arrow />
            </a>
          </Magnetic>
          <a href="#vsl" className="btn-ghost">
            <span className="h-[5px] w-[5px] rounded-full bg-faint" />
            Vezi demonstrația
          </a>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.24em] text-faint"
      >
        <div className="flex flex-col items-center gap-3">
          Scroll
          <span className="relative block h-[36px] w-px overflow-hidden bg-line-strong">
            <span className="absolute left-0 top-0 h-3 w-px animate-[drop_2.4s_var(--ease)_infinite] bg-ink" />
          </span>
        </div>
      </motion.div>
    </header>
  );
}
