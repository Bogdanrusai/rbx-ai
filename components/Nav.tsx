"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/config";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <a
        href={site.contactUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-line-strong px-[18px] py-[9px] text-[13.5px] font-medium transition-[background,border-color] duration-300 ease-premium hover:border-white/35 hover:bg-white/[0.04]"
      >
        {site.ctaLabel}
      </a>
    </nav>
  );
}
