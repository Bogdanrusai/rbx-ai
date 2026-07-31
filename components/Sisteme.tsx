import Reveal from "./Reveal";
import { Bolt, Refresh, Calendar, Star, Layers } from "./Icons";

const rest = [
  { icon: Refresh, t: "Niciun lead pierdut.", m: "Follow-up automat, până primești răspuns." },
  { icon: Calendar, t: "Calendarul se umple singur.", m: "Programări fără un telefon dat." },
  { icon: Star, t: "Reputația crește fără tine.", m: "Recenzii cerute automat, la momentul potrivit." },
  { icon: Layers, t: "Prezent online, mereu.", m: "Un video → o săptămână de conținut." },
];

export default function Sisteme() {
  return (
    <section id="sisteme" className="section">
      <Reveal className="eyebrow mb-[30px]">Sisteme</Reveal>
      <Reveal
        as="h2"
        className="max-w-[15ch] text-[clamp(30px,5vw,56px)] font-semibold leading-[1.05] tracking-[-0.025em]"
      >
        <span className="text-faint">Nu vând ChatGPT. Nu vând automatizări.</span>
        <br />
        Construiesc <span className="mark">sisteme</span>.
      </Reveal>
      <Reveal
        as="p"
        delay={0.08}
        className="mt-[26px] max-w-[44ch] text-[clamp(16px,1.7vw,19px)] text-muted"
      >
        Un sistem complet, făcut pe măsura afacerii tale. Nu funcții — rezultate:
      </Reveal>

      <div className="mt-[54px] grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* flagship */}
        <Reveal className="card col-span-1 overflow-hidden rounded-[20px] p-[34px] md:col-span-2">
          <span className="mb-[22px] inline-block rounded-full border border-line px-3 py-[5px] text-[10.5px] uppercase tracking-[0.18em] text-faint">
            Inima sistemului
          </span>
          <div className="mb-7 grid h-10 w-10 place-items-center rounded-[11px] border border-line-strong text-ink opacity-90">
            <Bolt />
          </div>
          <h3 className="text-[clamp(26px,3.4vw,38px)] font-semibold leading-[1.12] tracking-[-0.02em]">
            Niciun client nu mai așteaptă.
          </h3>
          <p className="mt-3 text-sm tracking-[0.02em] text-faint">
            Răspuns în câteva secunde. La orice oră, în orice zi.
          </p>
        </Reveal>

        {rest.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.t} delay={i * 0.08} className="card overflow-hidden rounded-[20px] p-[32px]">
              <div className="mb-7 grid h-10 w-10 place-items-center rounded-[11px] border border-line-strong text-ink opacity-90">
                <Icon />
              </div>
              <h3 className="text-[clamp(21px,2.1vw,26px)] font-semibold leading-[1.12] tracking-[-0.02em]">
                {s.t}
              </h3>
              <p className="mt-3 text-sm tracking-[0.02em] text-faint">{s.m}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
