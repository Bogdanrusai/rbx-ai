"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/config";

const EASE = [0.22, 1, 0.36, 1] as const;

const links = [
  { label: "Problema", href: "#problema" },
  { label: "Sisteme", href: "#sisteme" },
  { label: "Capabilități", href: "#capabilitati" },
  { label: "VSL", href: "#vsl" },
  { label: "Demonstrație", href: "#demo" },
  { label: "Povestea", href: "#poveste" },
  { label: "Instagram", href: "#showcase" },
  { label: "Întrebări", href: "#faq" },
];

export default function Nav() {
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
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-[clamp(20px,5vw,64px)] py-[22px] transition-[background,border-color] duration-500 ease-premium ${
        scrolled
          ? "border-b border-line bg-bg/60 backdrop-blur-[14px] backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <a href="#top" className="text-[15px] font-semibold tracking-[0.14em]">
        RBX.AI
      </a>

      <div className="flex items-center gap-3">
        {/* category menu */}
        <div ref={ref} className="relative">
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

        <a
          href={site.contactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full border border-line-strong px-[18px] py-[9px] text-[13.5px] font-medium transition-[background,border-color] duration-300 ease-premium hover:border-white/35 hover:bg-white/[0.04] sm:inline-block"
        >
          {site.ctaLabel}
        </a>
      </div>
    </nav>
  );
}
