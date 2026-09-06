"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import MaskReveal from "./MaskReveal";
import { trackEvent } from "@/lib/analytics";
import { useWizard } from "./wizard/WizardContext";

const EASE = [0.16, 1, 0.3, 1] as const;

type Testimonial = { quote: string; author: string };

type Project = {
  id: string;
  name: string;
  status: string;
  summary: string;
  points: string[];
  // Upgrade slots, all optional, all unset today. Fill in when the real
  // asset/result exists (a screenshot, the live client URL, a verified
  // quote) and the card upgrades automatically. No redesign needed, no
  // fabricated placeholder rendered in the meantime.
  image?: string;
  liveUrl?: string;
  testimonial?: Testimonial;
};

// Honest, real projects only. No invented clients, results or numbers.
// See lib/chatbot/knowledgeBase.ts for the same facts, kept in sync.
//
// RBX.AI CRM is deliberately text-only here: it's a private, internal
// system. No screenshot is published until one has been reviewed for
// anything sensitive (real lead names, emails, phone numbers, internal
// URLs), and there is never a login link, a public demo, or a route into
// the actual application from this site.
const projects: Project[] = [
  {
    id: "rbx-ai-website",
    name: "RBX.AI — Website / Sistem Digital",
    status: "Proiect intern · live",
    summary:
      "Acest website e el însuși un proiect RBX.AI: strategie de conversie, arhitectură a paginii, copywriting, formular de calificare a lead-urilor și asistentul cu care poți vorbi chiar acum.",
    points: [
      "Arhitectură homepage gândită pentru conversie, nu doar prezentare",
      "Formular de calificare în mai mulți pași, cu confirmare clară a pașilor următori",
      "Asistent AI grounded, fără informații inventate",
    ],
    liveUrl: "https://www.rbxagency.com",
  },
  {
    id: "rbx-ai-crm",
    name: "RBX.AI CRM",
    status: "Sistem intern · privat",
    summary:
      "CRM-ul folosit intern pentru a gestiona lead-urile care intră prin formularul de analiză gratuită: de la primul mesaj, până la calificare și programare. Un sistem privat, nu un produs public — prezentat aici doar ca exemplu de ce poate fi construit.",
    points: [
      "Centralizează lead-urile venite din formular, într-un singur loc",
      "Urmărește statusul fiecărui lead, de la contact la programare",
      "Sistem privat: fără login public, fără demo public, fără date reale expuse",
    ],
  },
  {
    id: "expert-instal-serv",
    name: "Expert Instal Serv.",
    status: "Proiect pilot · în testare",
    summary:
      "Firmă reală de instalații care pierdea cereri pe mesagerie în afara programului. Sistemul construit preia și califică automat mesajele primite, ca nimic să nu rămână fără răspuns.",
    points: [
      "Sistem construit și implementat, folosit efectiv de firmă",
      "Aflat acum în testare și feedback",
      "Rezultate și cifre confirmate se adaugă aici doar când există cu adevărat",
    ],
  },
];

export default function SelectedWork() {
  const wizard = useWizard();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollToIndex(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(projects.length - 1, i));
    const card = track.children[clamped] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActive(clamped);
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    // Nearest card to the track's left edge is the "active" one — drives
    // the dot indicator without extra IntersectionObserver bookkeeping.
    let closest = 0;
    let closestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft - track.scrollLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActive(closest);
  }

  return (
    <section id="selected-work" className="section">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="eyebrow mb-8">Selected Work</div>
          <h2 className="max-w-[18ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]">
            <MaskReveal>Nu portofoliu.</MaskReveal>
            <MaskReveal delay={0.1}>
              <span className="mark">Sisteme construite</span>.
            </MaskReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="mt-6 max-w-[52ch] text-[15.5px] leading-[1.65] text-muted"
          >
            Nu am zeci de proiecte de arătat. Am cele reale, prezentate exact așa cum stau azi.
          </motion.p>
        </div>

        {/* arrows — desktop; mobile relies on native swipe */}
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scrollToIndex(active - 1)}
            disabled={active === 0}
            aria-label="Proiectul anterior"
            className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-white/35 hover:text-ink disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scrollToIndex(active + 1)}
            disabled={active === projects.length - 1}
            aria-label="Proiectul următor"
            className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-white/35 hover:text-ink disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.08 }}
            onViewportEnter={() => trackEvent("project_viewed", { project: p.id })}
            className="card flex w-[85vw] max-w-[440px] flex-none snap-start flex-col overflow-hidden rounded-[24px] sm:w-[420px]"
          >
            {p.image && (
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line">
                <Image src={p.image} alt={`${p.name}, captură de ecran`} fill className="object-cover" />
              </div>
            )}

            <div className="flex flex-1 flex-col p-8">
              <span className="mb-5 inline-block w-fit rounded-full border border-line px-3 py-1.5 text-[10.5px] uppercase tracking-[0.16em] text-faint">
                {p.status}
              </span>
              <h3 className="text-[22px] font-semibold tracking-[-0.015em]">{p.name}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-muted">{p.summary}</p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-faint">
                    <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-faint" />
                    {pt}
                  </li>
                ))}
              </ul>

              {p.testimonial && (
                <blockquote className="mt-6 border-l-2 border-line-strong pl-4 text-[13.5px] italic leading-[1.6] text-muted">
                  &ldquo;{p.testimonial.quote}&rdquo;
                  <footer className="mt-2 not-italic text-[12px] text-faint">{p.testimonial.author}</footer>
                </blockquote>
              )}

              <div className="mt-7 flex flex-1 items-end justify-between gap-4">
                {p.liveUrl ? (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("project_viewed", { project: p.id, action: "live_link" })}
                    className="inline-flex w-fit items-center gap-2 text-[13.5px] font-medium text-ink transition-colors hover:text-muted"
                  >
                    Vezi live
                    <span aria-hidden>→</span>
                  </a>
                ) : (
                  <span className="text-[13px] text-faint">Sistem privat, fără acces public</span>
                )}
                <button
                  onClick={() => {
                    trackEvent("project_viewed", { project: p.id, action: "cta_analysis" });
                    wizard.open();
                  }}
                  className="text-[13px] text-faint underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  Vreau așa ceva →
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 sm:hidden">
        {projects.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-ink" : "w-1.5 bg-line-strong"}`}
          />
        ))}
      </div>
    </section>
  );
}
