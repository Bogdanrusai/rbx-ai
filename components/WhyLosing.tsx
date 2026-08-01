"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import MaskReveal from "./MaskReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

const costs = [
  { to: 10, prefix: "", suffix: " clienți/lună", label: "care scriu seara și nu primesc răspuns la timp" },
  { to: 8, prefix: "~", suffix: " ore/săptămână", label: "pierdute pe mesaje și „când sunteți liber?”" },
  { to: 0, prefix: "", suffix: " nopți libere", label: "cât timp afacerea depinde doar de tine" },
];

export default function WhyLosing() {
  return (
    <section id="cost" className="section">
      <div className="eyebrow mb-8">Costul real</div>
      <h2 className="max-w-[17ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]">
        <MaskReveal>Fără un sistem,</MaskReveal>
        <MaskReveal delay={0.1}>
          plătești în <span className="mark">bani și timp</span>.
        </MaskReveal>
      </h2>

      <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-3">
        {costs.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
            className="border-t border-line-strong pt-8"
          >
            <div className="text-[clamp(40px,5.4vw,64px)] font-semibold leading-none tracking-[-0.03em]">
              <Counter to={c.to} prefix={c.prefix} suffix="" />
              <span className="ml-1 text-[0.42em] font-medium text-muted">{c.suffix.trim()}</span>
            </div>
            <p className="mt-5 max-w-[28ch] text-[14.5px] leading-[1.6] text-faint">{c.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="mt-20 max-w-[30ch] text-[clamp(19px,2.4vw,27px)] font-medium leading-[1.35] tracking-[-0.015em]"
      >
        Fiecare client care nu primește răspuns
        <span className="text-faint"> merge la următorul care răspunde.</span>
      </motion.p>
    </section>
  );
}
