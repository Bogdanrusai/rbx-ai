import Image from "next/image";
import Reveal from "./Reveal";
import { site } from "@/lib/config";
import { Shield } from "./Icons";

export default function Poveste() {
  return (
    <section id="poveste" className="section">
      <div className="grid grid-cols-1 items-center gap-[clamp(30px,5vw,72px)] md:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <figure className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[22px] border border-line-strong bg-[#0E0E10]">
            <Image
              src="/portrait.jpg"
              alt="Bogdan Rus, fondator RBX.AI"
              fill
              sizes="(max-width:768px) 90vw, 40vw"
              className="object-cover object-[center_20%] grayscale contrast-[1.05]"
            />
            <figcaption className="absolute bottom-4 left-[18px] text-[12px] uppercase tracking-[0.14em] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.7)]">
              <b className="font-semibold">Bogdan Rus</b> · Fondator RBX.AI
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal className="eyebrow mb-[30px]">Povestea</Reveal>
          <Reveal
            as="h2"
            className="max-w-[16ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]"
          >
            Sunt la început. Și arăt <span className="mark">tot</span>.
          </Reveal>
          <Reveal
            as="p"
            delay={0.06}
            className="mt-[22px] max-w-[52ch] text-[clamp(15.5px,1.6vw,18px)] leading-[1.65] text-muted"
          >
            Nu am moștenit o agenție. <span className="text-ink">Am ales să construiesc una</span>{" "}
            — în public, fără filtru.
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-[18px] max-w-[52ch] text-[clamp(15.5px,1.6vw,18px)] leading-[1.65] text-muted"
          >
            Sisteme AI pentru afaceri din România și Dubai. Lucrez cu{" "}
            <span className="text-ink">puțini clienți</span>, aleși cu grijă — fiecare sistem e
            făcut pe măsură, nu la fotocopiator.
          </Reveal>

          <Reveal delay={0.18} className="mt-[30px]">
            <div className="inline-flex items-center gap-3 rounded-[14px] border border-line-strong bg-surface px-5 py-[14px] text-[14.5px] text-ink">
              <Shield />
              Intri acum → ești printre primii. Atenție și preț de fondator.
            </div>
          </Reveal>

          <Reveal as="p" delay={0.24} className="mt-[26px] text-[14px] tracking-[0.02em] text-faint">
            <b className="font-medium text-muted">{site.handle}</b> · construit în public
          </Reveal>
        </div>
      </div>
    </section>
  );
}
