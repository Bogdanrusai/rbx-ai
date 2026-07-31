"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { Check, Send } from "./Icons";

type Msg = { id: number; text: string; from: "in" | "out" };

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[ăâ]/g, "a")
    .replace(/î/g, "i")
    .replace(/ș/g, "s")
    .replace(/ț/g, "t");

function reply(t: string): string {
  const q = norm(t);
  if (/(2 camere|doua camere|apartament|garsonier|casa|vila)/.test(q))
    return "Da 👍 Avem 3 apartamente cu 2 camere disponibile acum, între 65.000 și 89.000 €. Vrei să-ți trimit pozele și fixăm o vizionare?";
  if (/(cat costa|pret|cost|buget|cati bani)/.test(q))
    return "Depinde de zonă și etaj — cele cu 2 camere pornesc de la 65.000 €. Îți pregătesc o listă fix pe bugetul tău. Care ar fi bugetul aproximativ?";
  if (/(vizionare|programare|vreau sa vad|sa vizitez|intalnire|cand)/.test(q))
    return "Perfect. Am liber mâine la 15:00 sau miercuri la 11:00. Care îți convine? Îți trimit adresa și un reminder cu o oră înainte.";
  if (/(buna|salut|hey|noroc|hello)/.test(q))
    return "Bună! Mă bucur că ai scris 🙂 Cauți să cumperi, să vinzi sau să închiriezi?";
  if (/(inchiri|chirie|rent)/.test(q))
    return "Avem și de închiriat — între 350 și 600 €/lună, în funcție de zonă. Îți trimit opțiunile și programăm o vizionare. Ce zonă preferi?";
  if (/(multumesc|mersi|ok|super|perfect)/.test(q))
    return "Cu drag! Îți trimit totul pe mail și rămân aici dacă mai ai întrebări. 👌";
  return "Bună întrebare — îți răspund imediat și, dacă vrei, fixăm o vizionare rapidă. Ce zonă te interesează?";
}

const chips = [
  { label: "Aveți apartamente cu 2 camere?", q: "Aveți apartamente cu 2 camere?" },
  { label: "Cât costă?", q: "Cât costă un apartament?" },
  { label: "Vreau o vizionare", q: "Vreau o vizionare" },
];

const points = [
  "Răspunde în sub 5 secunde, non-stop",
  "Programează singur vizionările",
  "Funcționează pe WhatsApp, Instagram și site",
];

export default function Demo() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 0,
      from: "in",
      text: "Bună! Sunt asistentul agenției. Cu ce te pot ajuta — cauți să cumperi, să vinzi sau să închiriezi? 🙂",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const ask = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { id: idRef.current++, text, from: "in" }]);
    setTyping(true);
    const answer = reply(text);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: idRef.current++, text: answer, from: "out" }]);
    }, 750 + Math.random() * 450);
  };

  return (
    <section id="demo" className="section">
      <div className="grid grid-cols-1 items-center gap-[clamp(28px,5vw,64px)] md:grid-cols-[1.05fr_0.95fr]">
        {/* copy */}
        <div>
          <Reveal className="eyebrow mb-[30px]">Demonstrație</Reveal>
          <Reveal
            as="h2"
            className="max-w-[14ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]"
          >
            Nu-ți spun că funcționează. <span className="mark">Îți arăt.</span>
          </Reveal>
          <Reveal
            as="p"
            delay={0.08}
            className="mt-[22px] max-w-[46ch] text-[clamp(16px,1.7vw,19px)] leading-[1.55] text-muted"
          >
            Scrie-i ca un client real — întreabă de un apartament, un preț, o
            vizionare. Vezi cum răspunde. Instant.
          </Reveal>
          <ul className="mt-[34px] flex flex-col gap-[14px]">
            {points.map((p, i) => (
              <Reveal as="li" key={p} delay={0.12 + i * 0.08} className="flex items-center gap-[13px] text-[15px] text-muted">
                <span className="grid h-[22px] w-[22px] flex-none place-items-center rounded-full border border-line-strong text-ink">
                  <Check />
                </span>
                {p}
              </Reveal>
            ))}
          </ul>
        </div>

        {/* phone */}
        <Reveal delay={0.1}>
          <div className="mx-auto w-full max-w-[400px] rounded-[34px] border border-line-strong bg-[#0E0E10] p-[14px] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
            <div className="flex h-[560px] flex-col overflow-hidden rounded-[24px] bg-[#131315]">
              {/* head */}
              <div className="flex items-center gap-3 border-b border-line px-[18px] py-4">
                <span className="grid h-[38px] w-[38px] place-items-center rounded-full border border-line-strong bg-black text-[11px] font-semibold tracking-[0.06em]">
                  RBX
                </span>
                <div>
                  <div className="text-[14.5px] font-semibold">Recepționer AI</div>
                  <div className="mt-[1px] flex items-center gap-1.5 text-[12px] text-ok">
                    <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                    online
                  </div>
                </div>
              </div>

              {/* body */}
              <div
                ref={bodyRef}
                role="log"
                aria-live="polite"
                aria-label="Conversație demo"
                className="thin-scroll flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-5"
              >
                {msgs.map((m) => (
                  <div
                    key={m.id}
                    className={
                      m.from === "in"
                        ? "max-w-[82%] self-start rounded-[18px] rounded-bl-[6px] bg-[#232326] px-[15px] py-[11px] text-[14.5px] leading-[1.45] text-ink [animation:bubblePop_.35s_var(--ease)]"
                        : "max-w-[82%] self-end rounded-[18px] rounded-br-[6px] bg-[#F4F4F5] px-[15px] py-[11px] text-[14.5px] leading-[1.45] text-[#0A0A0B] [animation:bubblePop_.35s_var(--ease)]"
                    }
                  >
                    {m.text}
                  </div>
                ))}
                {typing && (
                  <div className="flex gap-[5px] self-start rounded-[18px] rounded-bl-[6px] bg-[#232326] px-4 py-[14px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-faint [animation:typingBlink_1.2s_infinite]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-faint [animation:typingBlink_1.2s_infinite_.2s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-faint [animation:typingBlink_1.2s_infinite_.4s]" />
                  </div>
                )}
              </div>

              {/* foot */}
              <div className="border-t border-line px-[14px] pb-[14px] pt-3">
                <div className="no-scrollbar mb-2.5 flex gap-2 overflow-x-auto">
                  {chips.map((c) => (
                    <button
                      key={c.label}
                      onClick={() => ask(c.q)}
                      className="whitespace-nowrap rounded-full border border-line-strong px-[13px] py-2 text-[12.5px] text-muted transition-colors hover:border-white/30 hover:bg-white/[0.04] hover:text-ink"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 rounded-full border border-line bg-[#0E0E10] py-[5px] pl-4 pr-[5px]">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        ask(input);
                        setInput("");
                      }
                    }}
                    placeholder="Scrie un mesaj…"
                    aria-label="Scrie un mesaj"
                    className="flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-faint"
                  />
                  <button
                    aria-label="Trimite"
                    onClick={() => {
                      ask(input);
                      setInput("");
                    }}
                    className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full bg-ink text-bg transition-transform hover:scale-105"
                  >
                    <Send />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-5 text-center text-[12.5px] leading-[1.5] text-faint">
            Demo interactiv · simulare a unui sistem RBX.AI.
            <br />
            Sistemul real se conectează la conturile tale și răspunde clienților adevărați.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
