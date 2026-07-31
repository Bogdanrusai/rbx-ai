"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { Instagram, Arrow } from "./Icons";
import { posts, slidesOf, site, type Post } from "@/lib/config";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Showcase() {
  const [active, setActive] = useState<Post | null>(null);
  const [idx, setIdx] = useState(0);

  const open = (p: Post) => {
    setActive(p);
    setIdx(0);
  };
  const close = useCallback(() => setActive(null), []);

  const slides = active ? slidesOf(active) : [];
  const next = useCallback(
    () => setIdx((i) => (i + 1) % slides.length),
    [slides.length]
  );
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + slides.length) % slides.length),
    [slides.length]
  );

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

  return (
    <section id="showcase" className="section">
      <Reveal className="eyebrow mb-[30px]">De pe Instagram</Reveal>
      <Reveal
        as="h2"
        className="max-w-[16ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]"
      >
        Dovada e <span className="mark">publică</span>.
      </Reveal>
      <Reveal
        as="p"
        delay={0.08}
        className="mt-[22px] max-w-[48ch] text-[clamp(16px,1.7vw,19px)] leading-[1.55] text-muted"
      >
        Nu-ți cer să mă crezi pe cuvânt. Tot ce construiesc apare public, pas cu
        pas. Deschide o postare — o citești aici, o continui pe profil.
      </Reveal>

      <div className="mt-[54px] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1}>
            <button
              onClick={() => open(p)}
              className="group card block w-full overflow-hidden rounded-[20px] text-left"
              aria-label={`Deschide postarea: ${p.title}`}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={`/instagram/${p.dir}/1.jpg`}
                  alt={p.title}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  className="object-cover grayscale transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/40 text-ink backdrop-blur-sm transition-colors group-hover:border-white/45">
                  <Instagram />
                </span>

                <div className="absolute inset-x-5 bottom-5">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                    {p.tag}
                  </span>
                  <h3 className="mt-1.5 text-[19px] font-semibold leading-[1.2] tracking-[-0.01em] text-white">
                    {p.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      {Array.from({ length: p.count }).map((_, d) => (
                        <span
                          key={d}
                          className={`h-1 rounded-full transition-all ${
                            d === 0 ? "w-4 bg-white" : "w-1 bg-white/35"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-white/50">1 / {p.count}</span>
                  </div>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-10">
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost group"
        >
          <Instagram />
          Urmărește construcția zi de zi pe {site.handle}
          <span className="transition-transform duration-300 ease-premium group-hover:translate-x-1">→</span>
        </a>
      </Reveal>

      {/* LIGHTBOX */}
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
              {/* header */}
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-faint">
                    {active.tag}
                  </span>
                  <h3 className="text-[15px] font-semibold text-ink">{active.title}</h3>
                </div>
                <button
                  onClick={close}
                  aria-label="Închide"
                  autoFocus
                  className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-white/35 hover:text-ink"
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* slide */}
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
                    <Image
                      src={slides[idx]}
                      alt={`${active.title} — ${idx + 1}`}
                      fill
                      sizes="440px"
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* arrows */}
                <button
                  onClick={prev}
                  aria-label="Slide anterior"
                  className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-white/40"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  aria-label="Slide următor"
                  className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-white/40"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* dots + counter */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {slides.map((_, d) => (
                    <button
                      key={d}
                      aria-label={`Slide ${d + 1}`}
                      onClick={() => setIdx(d)}
                      className={`h-1.5 rounded-full transition-all ${
                        d === idx ? "w-5 bg-ink" : "w-1.5 bg-white/25 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[12px] text-faint">
                  {idx + 1} / {slides.length}
                </span>
              </div>

              {/* CTA */}
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-line-strong py-3 text-[14px] font-medium text-ink transition-colors hover:border-white/35 hover:bg-white/[0.04]"
              >
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
