"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import GhostWord from "./GhostWord";
import MaskReveal from "./MaskReveal";
import { posts, slidesOf } from "@/lib/config";

const EASE = [0.16, 1, 0.3, 1] as const;
const vslPost = posts.find((p) => p.id === "vsl")!;
const slides = slidesOf(vslPost);
const AUTOPLAY = 4200;

const chapters = [
  "Problema pe care n-o vezi",
  "Câți bani pierzi, de fapt",
  "Cum arată soluția",
  "Sistemul, în acțiune",
];

export default function Vsl() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((n: number) => setIdx((n + slides.length) % slides.length), []);
  const next = useCallback(() => setIdx((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setIdx((i) => (i - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, AUTOPLAY);
    return () => clearTimeout(t);
  }, [idx, paused, next]);

  // subtle 3D tilt
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const trx = useTransform(rx, [-0.5, 0.5], [6, -6]);
  const trY = useTransform(ry, [-0.5, 0.5], [-6, 6]);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rx.set((e.clientY - r.top) / r.height - 0.5);
    ry.set((e.clientX - r.left) / r.width - 0.5);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <section id="vsl" className="section relative overflow-hidden">
      <GhostWord word="RBX.AI" className="left-[-3%] top-[4%]" />

      <div className="relative grid grid-cols-1 items-center gap-[clamp(32px,6vw,80px)] lg:grid-cols-[0.9fr_1.1fr]">
        {/* left — narrative */}
        <div>
          <div className="eyebrow mb-8">Prezentarea RBX.AI</div>
          <h2 className="max-w-[15ch] text-[clamp(30px,4.6vw,52px)] font-semibold leading-[1.06] tracking-[-0.025em]">
            <MaskReveal>Trei minute.</MaskReveal>
            <MaskReveal delay={0.1}>
              Și înțelegi <span className="mark">tot</span>.
            </MaskReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mt-8 max-w-[42ch] text-[clamp(15.5px,1.6vw,18px)] leading-[1.65] text-muted"
          >
            Fără termeni tehnici. Doar povestea reală: unde pierzi bani acum și
            cum îi recuperezi. Derulează cadrele — sau lasă-le să curgă singure.
          </motion.p>

          {/* chapter list, synced to carousel */}
          <div className="mt-10 flex flex-col gap-1">
            {chapters.map((c, i) => {
              const active = Math.floor(idx / 2) === i;
              return (
                <button
                  key={c}
                  onClick={() => go(i * 2)}
                  className="group flex items-center gap-4 py-2.5 text-left"
                >
                  <span
                    className={`text-[12px] tabular-nums transition-colors ${active ? "text-ink" : "text-faint"}`}
                  >
                    0{i + 1}
                  </span>
                  <span className="relative h-px flex-none overflow-hidden bg-line-strong" style={{ width: 28 }}>
                    <span
                      className={`absolute inset-0 origin-left bg-ink transition-transform duration-500 ${active ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </span>
                  <span
                    className={`text-[14.5px] transition-colors ${active ? "text-ink" : "text-faint group-hover:text-muted"}`}
                  >
                    {c}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* right — premium carousel frame */}
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            onLeave();
            setPaused(false);
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1, ease: EASE }}
          style={{ rotateX: trx, rotateY: trY, transformPerspective: 1000 }}
          className="relative mx-auto w-full max-w-[400px] will-change-transform"
        >
          {/* glow behind */}
          <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-white/[0.05] blur-[60px]" />

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[26px] border border-line-strong bg-[#0E0E10] shadow-[0_50px_140px_rgba(0,0,0,0.6)]">
            {slides.map((s, i) => (
              <motion.div
                key={s}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: i === idx ? 1 : 0, scale: i === idx ? 1 : 1.04 }}
                transition={{ duration: 0.7, ease: EASE }}
                style={{ pointerEvents: i === idx ? "auto" : "none" }}
              >
                <Image
                  src={s}
                  alt={`${vslPost.title} — cadrul ${i + 1}`}
                  fill
                  sizes="400px"
                  className="object-cover"
                  priority={i === 0}
                />
              </motion.div>
            ))}

            {/* top progress segments */}
            <div className="absolute inset-x-4 top-4 flex gap-1.5">
              {slides.map((_, i) => (
                <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/20">
                  {i < idx ? (
                    <div className="h-full w-full bg-white" />
                  ) : i === idx ? (
                    <div
                      key={idx}
                      className="h-full bg-white [animation:vslFill_linear_forwards]"
                      style={{
                        animationDuration: `${AUTOPLAY}ms`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  ) : (
                    <div className="h-full w-0 bg-white" />
                  )}
                </div>
              ))}
            </div>

            <span className="absolute bottom-4 left-5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-white backdrop-blur-sm">
              RBX.AI
            </span>
            <span className="absolute bottom-4 right-5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] text-white/80 backdrop-blur-sm">
              {idx + 1} / {slides.length}
            </span>
          </div>

          {/* controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Cadrul anterior"
              className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-white/35 hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Pornește" : "Pauză"}
              className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-white/35 hover:text-ink"
            >
              {paused ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" /></svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" /><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" /></svg>
              )}
            </button>
            <button
              onClick={next}
              aria-label="Cadrul următor"
              className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-white/35 hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
