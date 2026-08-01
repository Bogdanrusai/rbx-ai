"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import MaskReveal from "./MaskReveal";
import { Instagram, Arrow } from "./Icons";
import { posts, slidesOf, site, type Post } from "@/lib/config";

const EASE = [0.16, 1, 0.3, 1] as const;
const offsets = ["md:mt-0", "md:mt-16", "md:mt-6"];

function TiltCard({ p, offset, onOpen }: { p: Post; offset: string; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const trx = useTransform(rx, [-0.5, 0.5], [8, -8]);
  const trY = useTransform(ry, [-0.5, 0.5], [-8, 8]);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onOpen}
      style={{ rotateX: trx, rotateY: trY, transformPerspective: 900 }}
      className={`group relative w-[280px] flex-none snap-center overflow-hidden rounded-[22px] border border-line-strong text-left will-change-transform sm:w-[320px] ${offset}`}
      aria-label={`Deschide postarea: ${p.title}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={`/instagram/${p.dir}/1.jpg`}
          alt={p.title}
          fill
          sizes="320px"
          className="object-cover grayscale transition-transform duration-700 ease-premium group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/40 text-ink backdrop-blur-sm">
          <Instagram />
        </span>
        <div className="absolute inset-x-5 bottom-5">
          <span className="text-[11px] uppercase tracking-[0.18em] text-white/60">{p.tag}</span>
          <h3 className="mt-1.5 text-[18px] font-semibold leading-[1.2] tracking-[-0.01em] text-white">
            {p.title}
          </h3>
          <span className="mt-3 inline-block text-[11px] text-white/50">
            {p.count} cadre · deschide caruselul
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export default function Showcase() {
  const [active, setActive] = useState<Post | null>(null);
  const [idx, setIdx] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const open = (p: Post) => {
    setActive(p);
    setIdx(0);
  };
  const close = useCallback(() => setActive(null), []);

  const slides = active ? slidesOf(active) : [];
  const next = useCallback(() => setIdx((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, next, prev]);

  const scrollBy = (dx: number) => scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section id="showcase" className="section overflow-hidden">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="eyebrow mb-8">De pe Instagram</div>
          <h2 className="max-w-[16ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]">
            <MaskReveal>Tot ce construiesc</MaskReveal>
            <MaskReveal delay={0.1}>
              e <span className="mark">public</span>.
            </MaskReveal>
          </h2>
        </div>
        <div className="hidden gap-3 sm:flex">
          <button
            onClick={() => scrollBy(-360)}
            aria-label="Derulează la stânga"
            className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-white/35 hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            onClick={() => scrollBy(360)}
            aria-label="Derulează la dreapta"
            className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-white/35 hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar mt-16 flex gap-6 overflow-x-auto pb-6 pl-1 pr-8 pt-4 snap-x [perspective:1200px]"
      >
        {posts.map((p, i) => (
          <TiltCard key={p.id} p={p} offset={offsets[i % offsets.length]} onOpen={() => open(p)} />
        ))}
      </div>

      <div className="mt-6">
        <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost group">
          <Instagram />
          Urmărește construcția zi de zi pe {site.handle}
          <span className="transition-transform duration-300 ease-premium group-hover:translate-x-1">→</span>
        </a>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Postare Instagram: ${active.title}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            onClick={close}
          >
            <motion.div
              className="relative w-full max-w-[440px]"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.32, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-faint">{active.tag}</span>
                  <h3 className="text-[15px] font-semibold text-ink">{active.title}</h3>
                </div>
                <button
                  onClick={close}
                  aria-label="Închide"
                  autoFocus
                  className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-white/35 hover:text-ink"
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                </button>
              </div>

              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px] border border-line-strong bg-[#0E0E10]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={idx}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22, ease: EASE }}
                  >
                    <Image src={slides[idx]} alt={`${active.title} — ${idx + 1}`} fill sizes="440px" className="object-cover" priority />
                  </motion.div>
                </AnimatePresence>
                <button onClick={prev} aria-label="Slide anterior" className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button onClick={next} aria-label="Slide următor" className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {slides.map((_, d) => (
                    <button key={d} aria-label={`Slide ${d + 1}`} onClick={() => setIdx(d)} className={`h-1.5 rounded-full transition-all ${d === idx ? "w-5 bg-ink" : "w-1.5 bg-white/25 hover:bg-white/50"}`} />
                  ))}
                </div>
                <span className="text-[12px] text-faint">{idx + 1} / {slides.length}</span>
              </div>

              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-line-strong py-3 text-[14px] font-medium text-ink transition-colors hover:border-white/35 hover:bg-white/[0.04]">
                <Instagram />
                Vezi tot pe {site.handle}
                <Arrow />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
