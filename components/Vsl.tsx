"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { site } from "@/lib/config";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Vsl() {
  const [open, setOpen] = useState(false);
  const hasVideo = site.vslUrl.length > 0;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="vsl" className="section">
      <Reveal className="eyebrow mb-[30px]">În 2 minute</Reveal>
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
        Fără jargon. Îți arăt, pas cu pas, cum un sistem RBX.AI preia
        conversațiile și programările afacerii tale.
      </Reveal>

      <Reveal delay={0.12} className="mt-[52px]">
        <button
          onClick={() => hasVideo && setOpen(true)}
          disabled={!hasVideo}
          className={`group relative block aspect-video w-full overflow-hidden rounded-[24px] border border-line-strong bg-[#0E0E10] ${
            hasVideo ? "cursor-pointer" : "cursor-default"
          }`}
          aria-label={hasVideo ? "Redă video-ul" : "Video în curând"}
        >
          <Image
            src="/vsl-poster.jpg"
            alt="RBX.AI — cum funcționează"
            fill
            sizes="(max-width:1024px) 100vw, 1100px"
            className={`object-cover opacity-[0.65] grayscale transition-transform duration-[900ms] ease-premium ${
              hasVideo ? "group-hover:scale-[1.03]" : ""
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

          {/* play / soon */}
          <div className="absolute inset-0 grid place-items-center">
            {hasVideo ? (
              <span className="grid h-[76px] w-[76px] place-items-center rounded-full border border-white/25 bg-black/40 backdrop-blur-md transition-all duration-300 ease-premium group-hover:scale-110 group-hover:border-white/50 group-hover:bg-black/55">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="#fff" />
                </svg>
              </span>
            ) : (
              <span className="rounded-full border border-white/20 bg-black/40 px-5 py-2.5 text-[12.5px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                Video în curând
              </span>
            )}
          </div>

          <span className="absolute bottom-5 left-6 text-[12px] uppercase tracking-[0.16em] text-white/60">
            RBX.AI · {site.handle}
          </span>
        </button>
      </Reveal>

      <AnimatePresence>
        {open && hasVideo && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Player video RBX.AI"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative aspect-video w-full max-w-[960px] overflow-hidden rounded-[18px] border border-line-strong bg-black"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.32, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Închide player-ul"
                autoFocus
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-white/45"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
              <iframe
                src={`${site.vslUrl}${site.vslUrl.includes("?") ? "&" : "?"}autoplay=1`}
                title="RBX.AI VSL"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
