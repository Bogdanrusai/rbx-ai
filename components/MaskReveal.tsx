"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Wraps a heading in an overflow-hidden mask; the content rises up from
 * below the mask line into place. Reads as "premium reveal" rather than
 * a generic fade/slide — no other site in this niche does this on every
 * headline.
 *
 * IMPORTANT: the reveal is observed on the OUTER (untransformed) wrapper,
 * not on the animated span itself. Framer Motion's `whileInView` computes
 * intersection against the element's current geometry, and an
 * overflow-hidden ancestor clips that geometry per the IntersectionObserver
 * spec — so a span that starts translated below its own box (as this one
 * does, by design, for the mask effect) is clipped to ~0% visible before it
 * ever animates, and `whileInView` never fires. Observing the outer wrapper
 * (which is never transformed) and driving the child from that result
 * avoids the deadlock entirely while keeping the identical visual effect.
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
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <Tag ref={ref as never} className="block overflow-hidden">
      <motion.span
        className={className}
        style={{ display: "block" }}
        initial={{ y: "110%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : undefined}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
