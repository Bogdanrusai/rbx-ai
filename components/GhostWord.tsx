"use client";

import { motion } from "framer-motion";

export default function GhostWord({
  word,
  className = "",
  size = "clamp(90px,14vw,220px)",
}: {
  word: string;
  className?: string;
  size?: string;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={`ghost ${className}`}
      style={{ fontSize: size }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {word}
    </motion.span>
  );
}
