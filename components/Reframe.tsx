"use client";

import GhostWord from "./GhostWord";
import MaskReveal from "./MaskReveal";

export default function Reframe() {
  return (
    <section id="reframe" className="relative overflow-hidden py-[clamp(90px,16vh,180px)]">
      <GhostWord word="SISTEME" className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="relative z-[5] mx-auto max-w-[900px] px-[clamp(20px,5vw,64px)] text-center">
        <h2 className="text-[clamp(28px,5.4vw,60px)] font-semibold leading-[1.14] tracking-[-0.025em]">
          <MaskReveal className="mx-auto text-faint">Nu vând ChatGPT.</MaskReveal>
          <MaskReveal delay={0.1} className="mx-auto text-faint">
            Nu vând automatizări.
          </MaskReveal>
          <MaskReveal delay={0.22} className="mx-auto">
            Construiesc <span className="mark">sisteme</span>.
          </MaskReveal>
        </h2>
      </div>
    </section>
  );
}
