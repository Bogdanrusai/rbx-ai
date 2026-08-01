"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import { posts, slidesOf } from "@/lib/config";

const vslPost = posts.find((p) => p.id === "vsl")!;
const slides = slidesOf(vslPost);

export default function Vsl() {
  const [idx, setIdx] = useState(0);

  const next = useCallback(() => setIdx((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setIdx((i) => (i - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <section id="vsl" className="section">
      <Reveal className="eyebrow mb-[30px]">VSL · pas cu pas</Reveal>
      <Reveal
        as="h2"
        className="max-w-[16ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]"
      >
        Vezi exact cum <span className="mark">funcționează</span>.
      </Reveal>
      <Reveal
        as="p"
        delay={0.08}
        className="mt-[22px] max-w-[46ch] text-[clamp(16px,1.7vw,19px)] leading-[1.55] text-muted"
      >
        Aceeași poveste pe care o spun pe Instagram, în 8 cadre — pas cu pas, fără
        jargon.
      </Reveal>

      <Reveal delay={0.12} className="mt-[52px]">
        <div className="mx-auto grid max-w-[880px] grid-cols-1 gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          {/* prev (desktop) */}
          <button
            onClick={prev}
            aria-label="Slide anterior"
            className="hidden h-11 w-11 place-self-end place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-white/35 hover:text-ink sm:grid"
          >
            <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* stage */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-[22px] border border-line-strong bg-[#0E0E10] shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
            <Image
              src={slides[idx]}
              alt={`${vslPost.title} — cadrul ${idx + 1}`}
              fill
              sizes="380px"
              className="object-cover transition-opacity duration-300 ease-premium"
              priority={idx === 0}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4">
              <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-white backdrop-blur-sm">
                RBX.AI
              </span>
              <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] text-white/80 backdrop-blur-sm">
                {idx + 1} / {slides.length}
              </span>
            </div>

            {/* mobile arrows overlay */}
            <button
              onClick={prev}
              aria-label="Slide anterior"
              className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-sm sm:hidden"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Slide următor"
              className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-sm sm:hidden"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* next (desktop) */}
          <button
            onClick={next}
            aria-label="Slide următor"
            className="hidden h-11 w-11 place-self-start place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-white/35 hover:text-ink sm:grid"
          >
            <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* dots */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {slides.map((_, d) => (
            <button
              key={d}
              onClick={() => setIdx(d)}
              aria-label={`Cadrul ${d + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                d === idx ? "w-6 bg-ink" : "w-1.5 bg-white/20 hover:bg-white/45"
              }`}
            />
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-[46ch] text-center text-[12.5px] leading-[1.5] text-faint">
          Postare originală · {vslPost.title} · vezi restul mai jos, la „De pe Instagram”.
        </p>
      </Reveal>
    </section>
  );
}
