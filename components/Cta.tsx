import Reveal from "./Reveal";
import { site } from "@/lib/config";
import { Arrow } from "./Icons";

export default function Cta() {
  return (
    <section
      id="contact"
      className="relative z-[5] mx-auto max-w-[900px] px-[clamp(20px,5vw,64px)] pb-[clamp(110px,16vh,180px)] pt-[clamp(90px,14vh,150px)] text-center"
    >
      <Reveal
        as="h2"
        className="mx-auto max-w-[16ch] text-[clamp(34px,6vw,68px)] font-semibold leading-[1.04] tracking-[-0.03em]"
      >
        Dacă și-a construit așa propriul sistem —{" "}
        <span className="mark">ce poate construi pentru al tău?</span>
      </Reveal>
      <Reveal
        as="p"
        delay={0.08}
        className="mx-auto mt-[26px] max-w-[40ch] text-[clamp(16px,1.8vw,19px)] text-muted"
      >
        Lucrez cu un număr limitat de afaceri. Dacă ești serios, hai să vedem ce
        poate face RBX.AI pentru tine.
      </Reveal>
      <Reveal delay={0.14} className="mt-10 flex justify-center">
        <a href={site.contactUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          {site.ctaLabel}
          <Arrow />
        </a>
      </Reveal>
      <Reveal as="p" delay={0.2} className="mt-[26px] text-[13px] tracking-[0.03em] text-faint">
        Fără presiune. Fără obligații.
      </Reveal>
    </section>
  );
}
