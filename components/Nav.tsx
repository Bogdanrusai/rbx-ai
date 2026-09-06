"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/config";
import { useWizard } from "./wizard/WizardContext";
import SocialLinks from "./SocialLinks";

const EASE = [0.22, 1, 0.36, 1] as const;

const links = [
  { label: "Prezentare", href: "#vsl" },
  { label: "Problema", href: "#problema" },
  { label: "Costul real", href: "#cost" },
  { label: "Soluția", href: "#solutia" },
  { label: "Sistemele mele", href: "#sisteme" },
  { label: "Demonstrație", href: "#demo" },
  { label: "Selected Work", href: "#selected-work" },
  { label: "Instagram", href: "#showcase" },
  { label: "Despre mine", href: "#poveste" },
];

export default function Nav() {
  const wizard = useWizard();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 transition-[background,border-color] duration-500 ease-premium ${
        scrolled
          ? "border-b border-line bg-bg/60 backdrop-blur-[14px] backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      {/* Same max-w-content column as every section below — without this,
          the header's edges drift away from the page content's edges on
          wide viewports (the header used the full width, sections cap at
          1200px and center), reading as "not quite aligned". */}
      <div className="mx-auto flex max-w-content items-center justify-between px-[clamp(20px,5vw,64px)] py-[20px]">
        <a href="#top" className="text-[15px] font-semibold leading-none tracking-[0.14em]">
          RBX.AI
        </a>

        <div className="flex items-center gap-2.5">
          <SocialLinks
            from="header"
            className="hidden md:flex"
            iconClassName="h-8 w-8 border-transparent hover:border-line"
          />

          {/* category menu — desktop only; on mobile the CTA takes priority and scroll covers navigation */}
          <div ref={ref} className="relative hidden sm:block">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-haspopup="true"
            className="flex items-center gap-2 rounded-full border border-line-strong px-[16px] py-[9px] text-[13.5px] font-medium transition-[background,border-color] duration-300 ease-premium hover:border-white/35 hover:bg-white/[0.04]"
          >
            Sisteme &amp; categorii
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className={`transition-transform duration-300 ease-premium ${open ? "rotate-180" : ""}`}
            >
              <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                role="menu"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="absolute right-0 top-[calc(100%+10px)] w-[240px] overflow-hidden rounded-[16px] border border-line-strong bg-bg/95 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              >
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="block rounded-[10px] px-3.5 py-[10px] text-[14px] text-muted transition-colors hover:bg-white/[0.06] hover:text-ink"
                  >
                    {l.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

          <button
            onClick={() => wizard.open()}
            className="inline-block rounded-full border border-line-strong px-[14px] py-[8px] text-[12.5px] font-medium leading-none transition-[background,border-color] duration-300 ease-premium hover:border-white/35 hover:bg-white/[0.04] sm:px-[18px] sm:py-[9px] sm:text-[13.5px]"
          >
            <span className="sm:hidden">Analiză gratuită</span>
            <span className="hidden sm:inline">{site.ctaLabel}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
