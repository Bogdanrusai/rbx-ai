import Reveal from "./Reveal";
import { Minus } from "./Icons";

const pains = [
  { t: "Mesaje fără răspuns", d: "Clientul scrie seara. Tu răspunzi dimineața. Prea târziu." },
  { t: "Programări pe telefon", d: "Ore pierdute cu „când sunteți liber?”." },
  { t: "Lead-uri uitate", d: "A întrebat acum o săptămână. Nimeni n-a revenit." },
];

export default function Problema() {
  return (
    <section id="problema" className="section">
      <Reveal className="eyebrow mb-[30px]">Problema</Reveal>
      <Reveal
        as="h2"
        className="max-w-[17ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]"
      >
        Fiecare afacere pierde bani în același loc:
      </Reveal>

      <div className="mt-[52px] flex max-w-[780px] flex-col gap-4">
        {pains.map((p, i) => (
          <Reveal
            key={p.t}
            delay={i * 0.11}
            className="card flex items-start gap-5 rounded-[18px] px-7 py-[26px]"
          >
            <span className="grid h-[42px] w-[42px] flex-none place-items-center rounded-full border border-line-strong text-muted">
              <Minus />
            </span>
            <div>
              <h3 className="text-[19px] font-semibold tracking-[-0.01em]">{p.t}</h3>
              <p className="mt-1.5 text-[15.5px] leading-[1.5] text-faint">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal
        as="p"
        delay={0.1}
        className="mt-[52px] max-w-[22ch] text-[clamp(19px,2.4vw,27px)] font-medium leading-[1.35] tracking-[-0.015em]"
      >
        Nu pierzi clienți pentru că ești slab.
        <br />
        <span className="text-faint">Îi pierzi pentru că nu poți fi peste tot, non-stop.</span>
      </Reveal>
    </section>
  );
}
