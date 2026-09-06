"use client";

import {
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
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
      "CRM-ul folosit intern pentru a gestiona lead-urile care intră prin formularul de analiză gratuită: de la primul mesaj, până la calificare și programare. Un sistem privat, nu un produs public, prezentat aici doar ca exemplu de ce poate fi construit.",
    points: [
      "Centralizează lead-urile venite din formular, într-un singur loc",
      "Urmărește statusul fiecărui lead, de la contact la programare",
      "Sistem privat: fără login public, fără demo public, fără date reale expuse",
    ],
  },
  {
    id: "expert-instal-serv",
    name: "Expert Instal Serv.",
    status: "Website · proiect pilot",
    summary:
      "Website realizat pentru Expert Instal Serv., o firmă reală din domeniul instalațiilor. Construit gratuit, în etapa pilot RBX.AI, pornind de la nevoile unei afaceri reale, nu de la un client de test.",
    points: [
      "Website live, folosit efectiv de firmă",
      "Gândit ca fundație care poate evolua odată cu afacerea, nu doar o prezență online statică",
      "Rezultate și cifre confirmate se adaugă aici doar când există cu adevărat",
    ],
  },
];

export default function SelectedWork() {
  const wizard = useWizard();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Drag-to-scroll for desktop mouse users (trackpad/touch already scroll
  // natively via overflow-x-auto). A small movement threshold keeps a plain
  // click on a card's button from being swallowed as a "drag".
  const dragRef = useRef<{ startX: number; startScroll: number; moved: boolean } | null>(null);

  // True root cause (found by isolating the DOM in Playwright, bypassing
  // React entirely): CSS `scroll-snap-type` on this track, combined with
  // only 3 cards, made the browser's OWN native snap resolution override
  // *any* scrollLeft — JS scrollTo(), a raw `scrollLeft =` assignment, even
  // a real mouse-wheel gesture — back to whichever of just two reachable
  // extremes (0 or max) was nearest. Cards 2 and 3's snap-aligned "start"
  // offsets (e.g. 444px, 888px) exceed the track's actual max scroll
  // distance (e.g. 236px), so the browser collapsed 3 intended stops into
  // 2 and silently fought every attempt to land in between — confirmed by
  // disabling `scroll-snap-type` in isolation and watching arbitrary
  // scrollLeft values (0, 60, 118, 236) start working immediately.
  //
  // Fix: drop CSS scroll-snap entirely (no `snap-x` / `snap-start` below)
  // and do 100% of the snapping in JS. The track scrolls freely — natively
  // for trackpad/touch, via the pointer-drag handlers for desktop mouse —
  // and a short scroll-end timer settles it onto the nearest of the
  // proportional stops. Arrow clicks, drag, and swipe all go through the
  // same math, so they can never disagree, and first/last are always
  // exactly reachable since they're the track's own 0/max.
  function maxScroll(track: HTMLDivElement) {
    return Math.max(0, track.scrollWidth - track.clientWidth);
  }

  function indexToScrollLeft(track: HTMLDivElement, i: number) {
    const max = maxScroll(track);
    return projects.length > 1 ? (max * i) / (projects.length - 1) : 0;
  }

  function scrollLeftToIndex(track: HTMLDivElement, scrollLeft: number) {
    const max = maxScroll(track);
    if (max <= 0) return 0;
    const idx = Math.round((scrollLeft / max) * (projects.length - 1));
    return Math.max(0, Math.min(projects.length - 1, idx));
  }

  // Guards the settle-timer below from fighting a scroll that JS itself
  // just started (arrow click, or the settle-snap firing) — without this,
  // the "smooth" scroll animation's own intermediate onScroll events would
  // restart the settle timer against a stale, mid-flight position.
  const programmatic = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function scrollToIndex(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(projects.length - 1, i));
    if (settleTimer.current) clearTimeout(settleTimer.current);
    programmatic.current = true;
    track.scrollTo({ left: indexToScrollLeft(track, clamped), behavior: "smooth" });
    setActive(clamped);
    // Smooth scrolls fire their own trailing onScroll events; release the
    // guard once they've had time to settle rather than on the first one.
    window.setTimeout(() => {
      programmatic.current = false;
    }, 500);
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    setActive(scrollLeftToIndex(track, track.scrollLeft));

    if (programmatic.current) return;
    // Debounced settle: once the user's own drag/swipe/wheel has stopped
    // moving the track for a moment, snap to the nearest proportional stop.
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const t = trackRef.current;
      if (!t) return;
      const nearest = scrollLeftToIndex(t, t.scrollLeft);
      t.scrollTo({ left: indexToScrollLeft(t, nearest), behavior: "smooth" });
      setActive(nearest);
    }, 120);
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    // Only the primary mouse button drags; touch/pen keep native scrolling.
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    if (settleTimer.current) clearTimeout(settleTimer.current);
    programmatic.current = false;
    dragRef.current = { startX: e.clientX, startScroll: track.scrollLeft, moved: false };
    track.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !track) return;
    const dx = e.clientX - drag.startX;
    if (Math.abs(dx) > 4) drag.moved = true;
    const max = maxScroll(track);
    track.scrollLeft = Math.max(0, Math.min(max, drag.startScroll - dx));
  }

  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (track && track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
    dragRef.current = null;
    // onScroll's own debounced settle already handles the snap-to-nearest;
    // nothing extra to do here beyond releasing the pointer capture.
  }

  function onKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToIndex(active - 1);
    }
  }

  return (
    <section id="selected-work" className="section">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="eyebrow mb-8">
            <span className="tabular-nums text-muted">08</span>
            <span aria-hidden="true">·</span>
            Proiecte
          </div>
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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Proiecte — derulează cu săgețile stânga/dreapta"
        // No CSS scroll-snap here on purpose: with only 3 cards, the
        // snap-aligned "start" offset of cards 2 and 3 exceeds the track's
        // actual max scroll distance, and Chromium's native snap
        // resolution collapsed EVERY scroll attempt (JS, drag, even a raw
        // wheel gesture) down to just two reachable stops (0 and max),
        // silently overriding anything in between — that was the real bug.
        // Snapping is now done entirely in JS (see onScroll's debounced
        // settle + scrollToIndex above), so nothing fights it.
        // touch-action stays at its default (auto) so a finger swipe can
        // scroll the track horizontally while a vertical swipe still
        // passes through to the page's own scroll — an explicit `pan-y`
        // here would have blocked native horizontal touch scrolling
        // entirely. overscroll-behavior-x: contain stops a fast swipe at
        // either end from bleeding into the page's own back-navigation
        // gesture on mobile.
        className="mt-16 flex gap-6 overflow-x-auto pb-4 [overscroll-behavior-x:contain] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden active:cursor-grabbing sm:cursor-grab"
      >
        {projects.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.08 }}
            onViewportEnter={() => trackEvent("project_viewed", { project: p.id })}
            className="card flex w-[85vw] max-w-[440px] flex-none flex-col overflow-hidden rounded-[24px] sm:w-[420px]"
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
