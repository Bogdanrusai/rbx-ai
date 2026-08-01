import Reveal from "./Reveal";

const pillars = [
  {
    t: "Recepție & mesagerie AI",
    d: "Chatbot-uri care preiau conversația pe WhatsApp, Instagram sau site — pentru orice tip de afacere, nu doar imobiliare.",
    tags: ["WhatsApp Chatbot", "Chatbots AI", "Recepționer pentru agenți imobiliari"],
    icon: (
      <path d="M4 5h16v11H8l-4 4V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    t: "Voce & programări",
    d: "Agenți vocali care sună, răspund și programează — cu o voce naturală, non-stop, fără operator uman.",
    tags: ["Agent vocal pentru programări", "Automatizare agent vocal", "Agent vocal premium"],
    icon: (
      <path
        d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2 2c-8 0-14-6-14-14a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    t: "Generare de lead-uri",
    d: "Sisteme care găsesc și contactează automat afaceri sau clienți-țintă, la scară, fără muncă manuală.",
    tags: ["Scraping Google Maps", "Outreach automat Google Maps", "YouTube Scraper"],
    icon: (
      <path
        d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    t: "Recrutare & organizare",
    d: "Sortare automată de CV-uri și remindere care nu lasă nimic să scape prin calendarul tău.",
    tags: ["Analiză CV-uri", "Calendar Reminders"],
    icon: (
      <path
        d="M9 3h6l1 3h3v4H5V6h3l1-3Z M5 10v11h14V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
];

export default function Capabilitati() {
  return (
    <section id="capabilitati" className="section">
      <Reveal className="eyebrow mb-[30px]">Dincolo de recepție</Reveal>
      <Reveal
        as="h2"
        className="max-w-[18ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]"
      >
        Recepția e sistemul-etalon. <span className="mark">Nu e singurul.</span>
      </Reveal>
      <Reveal
        as="p"
        delay={0.08}
        className="mt-[22px] max-w-[52ch] text-[clamp(16px,1.7vw,19px)] leading-[1.55] text-muted"
      >
        În funcție de afacerea ta, pot construi orice combinație din aceste sisteme —
        toate pe aceeași fundație: fac treaba în locul tău, non-stop.
      </Reveal>

      <div className="mt-[52px] grid grid-cols-1 gap-4 md:grid-cols-2">
        {pillars.map((p, i) => (
          <Reveal key={p.t} delay={i * 0.09} className="card rounded-[20px] p-[30px]">
            <div className="mb-6 grid h-10 w-10 place-items-center rounded-[11px] border border-line-strong text-ink opacity-90">
              <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true">
                {p.icon}
              </svg>
            </div>
            <h3 className="text-[19px] font-semibold tracking-[-0.015em]">{p.t}</h3>
            <p className="mt-2.5 text-[14.5px] leading-[1.55] text-faint">{p.d}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1.5 text-[11.5px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
