"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Wraps a heading in an overflow-hidden mask; the content rises up from
 * below the mask line into place. Reads as "premium reveal" rather than
 * a generic fade/slide — no other site in this niche does this on every
 * headline.
 */
export default function MaskReveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span";
}) {
  const Tag = as;
  return (
    <Tag className="block overflow-hidden">
      <motion.span
        className={className}
        style={{ display: "block" }}
        initial={{ y: "110%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
