"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GhostWord from "./GhostWord";
import MaskReveal from "./MaskReveal";
import { site } from "@/lib/config";

const EASE = [0.16, 1, 0.3, 1] as const;

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
    <section id="vsl" className="section relative overflow-hidden">
      <GhostWord word="VSL" className="right-[-2%] top-[6%]" />

      <div className="relative mx-auto max-w-[880px] text-center">
        <div className="eyebrow mx-auto mb-8 justify-center">Demonstrația completă</div>
        <h2 className="mx-auto max-w-[16ch] text-[clamp(30px,5vw,58px)] font-semibold leading-[1.05] tracking-[-0.025em]">
          <MaskReveal>
            Uite exact ce <span className="mark">primești</span>.
          </MaskReveal>
        </h2>

        <motion.button
          onClick={() => hasVideo && setOpen(true)}
          disabled={!hasVideo}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className={`group relative mt-16 block aspect-video w-full overflow-hidden rounded-[28px] border border-line-strong bg-[#0B0B0C] ${
            hasVideo ? "cursor-pointer" : "cursor-default"
          }`}
        >
          {/* viewfinder corners */}
          {[
            "left-5 top-5 border-l border-t",
            "right-5 top-5 border-r border-t",
            "left-5 bottom-5 border-l border-b",
            "right-5 bottom-5 border-r border-b",
          ].map((pos) => (
            <span
              key={pos}
              className={`pointer-events-none absolute h-6 w-6 border-white/25 ${pos}`}
            />
          ))}

          {/* animated scan sweep */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
            <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent [animation:sweep_5s_ease-in-out_infinite]" />
          </div>

          {/* rec + status */}
          <div className="absolute left-7 top-7 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.16em] text-white/60">
            <span className="h-2 w-2 rounded-full bg-[#ff5a5a] [animation:pulseDot_1.8s_ease-in-out_infinite]" />
            {hasVideo ? "Live" : "Se pregătește"}
          </div>
          <span className="absolute right-7 top-7 text-[11px] uppercase tracking-[0.16em] text-white/40">
            RBX.AI · VSL
          </span>

          {/* center */}
          <div className="absolute inset-0 grid place-items-center">
            {hasVideo ? (
              <span className="grid h-[84px] w-[84px] place-items-center rounded-full border border-white/25 bg-black/40 backdrop-blur-md transition-all duration-300 ease-premium group-hover:scale-110 group-hover:border-white/50">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="#fff" />
                </svg>
              </span>
            ) : (
              <div className="flex flex-col items-center gap-5">
                <div className="flex items-end gap-[3px]" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className="w-[3px] rounded-full bg-white/50"
                      style={{
                        height: 10 + (i % 3) * 8,
                        animation: `floatY ${1.2 + i * 0.15}s ease-in-out infinite`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
                <span className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-[12px] uppercase tracking-[0.2em] text-white/70">
                  Video în producție
                </span>
              </div>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden bg-white/10">
            <div className="h-full w-1/4 bg-white/50 [animation:sweep_3s_linear_infinite]" />
          </div>
        </motion.button>

        <p className="mx-auto mt-6 max-w-[50ch] text-[13.5px] leading-[1.6] text-faint">
          Videoclipul se activează aici imediat ce e gata — fără nicio altă
          modificare de design. Până atunci,{" "}
          <a href="#showcase" className="text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink">
            vezi povestea publicată pe Instagram
          </a>
          .
        </p>
      </div>

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
