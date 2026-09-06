"use client";

// ============================================================================
// RBX.AI — Demonstrație interactivă (simulare, 100% locală)
// ============================================================================
//
// Reguli stricte, respectate peste tot în acest fișier:
// - Totul rulează DOAR în React state, în browser-ul vizitatorului.
// - Niciun apel de rețea, niciodată — nu se atinge /api/*, nu se trimite
//   nimic către CRM-ul real, email sau orice serviciu extern.
// - Nimic din ce scrie vizitatorul aici nu e salvat (nu localStorage, nu
//   cookie, nu bază de date) — dispare la refresh, intenționat.
// - Fiecare acțiune "trimisă" e etichetată explicit ca simulare, ca nimeni
//   să nu creadă că s-a trimis un mesaj real sau că s-a creat un lead real.
//
// Trei secțiuni, un singur motor de stare simplu:
//   1. Testează sistemul — un scenariu de conversație pas cu pas.
//   2. CRM (demo) — un pipeline fictiv, separat de CRM-ul real, privat.
//   3. Mini-unealtă de descoperire — o singură întrebare, un rezultat scurt.

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MaskReveal from "./MaskReveal";
import { useWizard } from "./wizard/WizardContext";
import { trackEvent } from "@/lib/analytics";

const EASE = [0.16, 1, 0.3, 1] as const;

// ---------------------------------------------------------------------------
// 1. Testează sistemul
// ---------------------------------------------------------------------------

type Scenario = {
  id: string;
  label: string;
  customerMsg: string;
  infoNeeded: string;
  qualified: string;
  slot: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "clinica",
    label: "Clinică",
    customerMsg: "Bună, aș putea face o programare pentru un control?",
    infoNeeded: "tipul consultației și dacă e pacient nou",
    qualified: "consultație de control, pacient existent",
    slot: "mâine, 11:00",
  },
  {
    id: "salon",
    label: "Salon",
    customerMsg: "Salut, aveți loc azi după-amiază pentru o tunsoare?",
    infoNeeded: "serviciul dorit și intervalul preferat",
    qualified: "tunsoare, interval după-amiaza",
    slot: "azi, 17:30",
  },
  {
    id: "service",
    label: "Serviciu local",
    customerMsg: "Bună ziua, mi s-a stricat centrala, puteți veni azi?",
    infoNeeded: "adresa și tipul problemei",
    qualified: "urgență centrală, adresă confirmată",
    slot: "azi, în intervalul 14:00–16:00",
  },
  {
    id: "general",
    label: "Afacere generală",
    customerMsg: "Bună, aș vrea mai multe detalii despre serviciile voastre.",
    infoNeeded: "ce anume caută și de unde a aflat de afacere",
    qualified: "interesat de servicii, lead calificat",
    slot: "apel de 10 minute, mâine, 10:00",
  },
];

type FlowStep = {
  key: string;
  title: string;
  render: (s: Scenario) => string;
  value: string;
};

const FLOW: FlowStep[] = [
  {
    key: "mesaj",
    title: "Clientul scrie",
    render: (s) => s.customerMsg,
    value: "Mesajul ajunge instant la sistem, indiferent de oră.",
  },
  {
    key: "raspuns",
    title: "Sistemul răspunde",
    render: () => "Bună! Vă pot ajuta cu o programare chiar acum. Îmi spuneți puțin mai multe detalii?",
    value: "Niciun mesaj nu rămâne fără răspuns până dimineața.",
  },
  {
    key: "info",
    title: "Colectare informații",
    render: (s) => `Sistemul întreabă exact ce lipsește: ${s.infoNeeded}.`,
    value: "Informațiile nu mai rămân într-un mesaj uitat.",
  },
  {
    key: "calificare",
    title: "Calificare",
    render: (s) => `Cerere calificată: ${s.qualified}.`,
    value: "Se știe deja dacă cererea chiar are sens de urmărit.",
  },
  {
    key: "programare",
    title: "Programare",
    render: (s) => `Slot propus și confirmat: ${s.slot}.`,
    value: "Programarea se întâmplă fără un telefon dat de tine.",
  },
  {
    key: "crm",
    title: "Trimis în CRM",
    render: () => "Lead-ul e salvat automat, cu tot istoricul conversației.",
    value: "Știi unde se află fiecare oportunitate.",
  },
  {
    key: "followup",
    title: "Follow-up automat",
    render: () => "Dacă lead-ul nu confirmă, sistemul revine singur peste 24h.",
    value: "Următorul pas nu mai depinde doar de memorie.",
  },
];

function SystemDemo() {
  const wizard = useWizard();
  const [scenario, setScenario] = useState<Scenario>(SCENARIOS[0]);
  const [step, setStep] = useState(0);
  const tracked = useRef(false);

  function selectScenario(s: Scenario) {
    setScenario(s);
    setStep(0);
    trackEvent("system_demo_interacted", { action: "scenario_select", scenario: s.id });
  }

  function next() {
    if (step >= FLOW.length - 1) return;
    setStep((s) => s + 1);
    if (!tracked.current) {
      tracked.current = true;
      trackEvent("system_demo_interacted", { action: "started", scenario: scenario.id });
    }
  }

  function reset() {
    setStep(0);
    trackEvent("system_demo_interacted", { action: "reset", scenario: scenario.id });
  }

  const atEnd = step === FLOW.length - 1;

  return (
    <div className="card rounded-[24px] p-7 sm:p-9">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => selectScenario(s)}
            className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
              scenario.id === s.id
                ? "border-white/35 bg-white/[0.06] text-ink"
                : "border-line-strong text-faint hover:text-muted"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* conversation trace */}
        <div className="flex min-h-[220px] flex-col justify-end gap-2.5 rounded-[16px] border border-line bg-surface p-5">
          <AnimatePresence initial={false}>
            {FLOW.slice(0, step + 1).map((f, i) => (
              <motion.div
                key={f.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={i === 0 ? "self-start text-left" : "self-end text-right"}
              >
                <span
                  className={`inline-block max-w-[92%] rounded-2xl px-3.5 py-2 text-[13.5px] leading-[1.45] ${
                    i === 0 ? "bg-ink text-bg" : "bg-white/[0.06] text-ink"
                  }`}
                >
                  {f.render(scenario)}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* step tracker + value explanation */}
        <div>
          <div className="flex flex-col gap-2">
            {FLOW.map((f, i) => (
              <div key={f.key} className="flex items-center gap-3">
                <span
                  className={`h-1.5 w-1.5 flex-none rounded-full ${
                    i <= step ? "bg-ink" : "bg-line-strong"
                  }`}
                />
                <span className={`text-[13px] ${i <= step ? "text-ink" : "text-faint"}`}>{f.title}</span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-5 text-[13.5px] leading-[1.55] text-faint"
            >
              {FLOW[step].value}
            </motion.p>
          </AnimatePresence>

          <div className="mt-6 flex flex-wrap gap-3">
            {!atEnd ? (
              <button onClick={next} className="rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-bg">
                Pasul următor →
              </button>
            ) : (
              <button
                onClick={() => wizard.open()}
                className="rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-bg"
              >
                Vreau așa ceva pentru afacerea mea
              </button>
            )}
            {step > 0 && (
              <button onClick={reset} className="rounded-full border border-line-strong px-5 py-2.5 text-[13px] text-muted transition-colors hover:text-ink">
                Ia de la capăt
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. CRM (demo) — separat de CRM-ul real, privat
// ---------------------------------------------------------------------------

const STAGES = ["Lead nou", "Contactat", "Calificat", "Programat", "Client"] as const;
type Stage = (typeof STAGES)[number];

type DemoLead = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  interest: string;
  stage: Stage;
  lastInteraction: string;
  nextAction: string;
  notes: string;
};

let nextLeadId = 1;

function makeDemoLead(): DemoLead {
  const id = nextLeadId++;
  return {
    id,
    name: "Andrei Popescu",
    company: "Studio Example",
    email: "andrei@example.com",
    phone: "07XX XXX XXX",
    source: "Website",
    interest: "Website + Automatizare programări",
    stage: "Lead nou",
    lastInteraction: "Acum câteva secunde (simulare)",
    nextAction: "Primul mesaj de calificare",
    notes: "Lead demo — date fictive, doar pentru exemplu.",
  };
}

const STAGE_VALUE: Record<Stage, string> = {
  "Lead nou": "Informațiile nu mai rămân într-un mesaj uitat.",
  Contactat: "Știi deja cine a fost contactat și cine încă nu.",
  Calificat: "Știi unde se află fiecare oportunitate.",
  Programat: "Programarea e vizibilă, nu doar într-un calendar separat.",
  Client: "Nu fiecare lead ajunge aici — dar cei care ajung sunt vizibili clar.",
};

function CrmDemo() {
  const [leads, setLeads] = useState<DemoLead[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3200);
  }

  function addLead() {
    const lead = makeDemoLead();
    setLeads((l) => [...l, lead]);
    setExpanded(lead.id);
    trackEvent("crm_demo_interacted", { action: "add_lead" });
    showToast("Lead demo adăugat. " + STAGE_VALUE["Lead nou"]);
  }

  function advance(id: number) {
    setLeads((ls) =>
      ls.map((l) => {
        if (l.id !== id) return l;
        const idx = STAGES.indexOf(l.stage);
        const nextStage = STAGES[Math.min(idx + 1, STAGES.length - 1)];
        return { ...l, stage: nextStage, lastInteraction: "Acum câteva secunde (simulare)" };
      })
    );
    const lead = leads.find((l) => l.id === id);
    const idx = lead ? STAGES.indexOf(lead.stage) : 0;
    const nextStage = STAGES[Math.min(idx + 1, STAGES.length - 1)];
    trackEvent("crm_demo_interacted", { action: "advance_stage", stage: nextStage });
    showToast(STAGE_VALUE[nextStage]);
  }

  function followUp(id: number) {
    trackEvent("crm_demo_interacted", { action: "follow_up" });
    showToast("Simulare. Niciun mesaj real nu a fost trimis. Următorul pas nu mai depinde doar de memorie.");
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, lastInteraction: "Follow-up simulat, acum" } : l)));
  }

  return (
    <div className="card rounded-[24px] p-7 sm:p-9">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-[17px] font-semibold tracking-[-0.01em]">CRM — demonstrație</h3>
          <p className="mt-1.5 max-w-[52ch] text-[13px] leading-[1.5] text-faint">
            Complet separat de CRM-ul real și privat al RBX.AI. Datele de mai
            jos sunt fictive, nu se salvează nicăieri și nu ajung la niciun
            sistem real.
          </p>
        </div>
        <button
          onClick={addLead}
          className="shrink-0 rounded-full bg-ink px-4 py-2.5 text-[13px] font-medium text-bg"
        >
          + Adaugă un lead demo
        </button>
      </div>

      {leads.length === 0 ? (
        <p className="mt-8 text-[13.5px] text-faint">
          Niciun lead demo încă. Apasă butonul de mai sus ca să vezi cum arată un pipeline.
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {leads.map((lead) => (
            <div key={lead.id} className="rounded-[16px] border border-line bg-surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                  className="text-left"
                >
                  <span className="text-[14.5px] font-medium text-ink">{lead.name}</span>
                  <span className="ml-2 text-[12.5px] text-faint">{lead.company}</span>
                </button>
                <span className="rounded-full border border-line-strong px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-faint">
                  {lead.stage}
                </span>
              </div>

              {/* pipeline strip */}
              <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2">
                {STAGES.map((st, i) => {
                  const currentIdx = STAGES.indexOf(lead.stage);
                  return (
                    <div key={st} className="flex items-center gap-1.5">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                          i <= currentIdx ? "bg-white/[0.08] text-ink" : "text-faint"
                        }`}
                      >
                        {st}
                      </span>
                      {i < STAGES.length - 1 && <span className="text-faint">→</span>}
                    </div>
                  );
                })}
              </div>

              {expanded === lead.id && (
                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 border-t border-line pt-4 text-[12.5px] sm:grid-cols-2">
                  <div><span className="text-faint">Email: </span><span className="text-muted">{lead.email}</span></div>
                  <div><span className="text-faint">Telefon: </span><span className="text-muted">{lead.phone}</span></div>
                  <div><span className="text-faint">Sursă: </span><span className="text-muted">{lead.source}</span></div>
                  <div><span className="text-faint">Interes: </span><span className="text-muted">{lead.interest}</span></div>
                  <div><span className="text-faint">Ultima interacțiune: </span><span className="text-muted">{lead.lastInteraction}</span></div>
                  <div><span className="text-faint">Următorul pas: </span><span className="text-muted">{lead.nextAction}</span></div>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2.5">
                {lead.stage !== "Client" && (
                  <button
                    onClick={() => advance(lead.id)}
                    className="rounded-full border border-line-strong px-3.5 py-1.5 text-[12px] text-muted transition-colors hover:text-ink"
                  >
                    Avansează la {STAGES[STAGES.indexOf(lead.stage) + 1]}
                  </button>
                )}
                <button
                  onClick={() => followUp(lead.id)}
                  className="rounded-full border border-line-strong px-3.5 py-1.5 text-[12px] text-muted transition-colors hover:text-ink"
                >
                  Trimite follow-up demo
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 rounded-[12px] border border-line-strong bg-white/[0.04] px-4 py-3 text-[12.5px] leading-[1.5] text-muted"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. Mini-unealtă de descoperire
// ---------------------------------------------------------------------------

const DISCOVERY_CHOICES: { id: string; label: string; result: string }[] = [
  { id: "mesaje", label: "Mesaje", result: "De obicei, mesajele fără răspuns rapid sunt primul loc unde se pierd cereri." },
  { id: "programari", label: "Programări", result: "Programările făcute manual, prin telefon, consumă timp care ar putea fi automatizat." },
  { id: "leaduri", label: "Lead-uri", result: "Lead-urile care nu ajung într-un loc centralizat sunt greu de urmărit consecvent." },
  { id: "followup", label: "Follow-up", result: "Follow-up-ul lăsat pe memorie e primul lucru care dispare când ești ocupat." },
  { id: "ofertare", label: "Ofertare", result: "Ofertele scrise de la zero de fiecare dată consumă timp care s-ar putea reduce." },
  { id: "website", label: "Website", result: "Un website care nu convertește vizitatori în cereri e o oportunitate pierdută constant." },
  { id: "procese", label: "Procese interne", result: "Task-urile interne repetitive sunt adesea cele mai ușor de automatizat." },
  { id: "altceva", label: "Altceva", result: "Cel mai bun mod să identifici exact procesul respectiv e analiza gratuită." },
];

function DiscoveryTool({ onSeeDemo }: { onSeeDemo: () => void }) {
  const wizard = useWizard();
  const [choice, setChoice] = useState<string | null>(null);

  function select(id: string) {
    setChoice(id);
    trackEvent("discovery_selected", { choice: id });
  }

  const picked = DISCOVERY_CHOICES.find((c) => c.id === choice);

  return (
    <div className="card rounded-[24px] p-7 sm:p-9">
      <h3 className="text-[17px] font-semibold tracking-[-0.01em]">Ce îți consumă cel mai mult timp?</h3>
      <p className="mt-1.5 text-[13px] text-faint">O singură întrebare — nu e un diagnostic AI complet, doar un punct de plecare.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {DISCOVERY_CHOICES.map((c) => (
          <button
            key={c.id}
            onClick={() => select(c.id)}
            className={`rounded-full border px-3.5 py-2 text-[13px] transition-colors ${
              choice === c.id ? "border-white/35 bg-white/[0.06] text-ink" : "border-line-strong text-faint hover:text-muted"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {picked && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 border-t border-line pt-6"
          >
            <p className="max-w-[52ch] text-[14px] leading-[1.55] text-muted">{picked.result}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button onClick={onSeeDemo} className="rounded-full border border-line-strong px-4 py-2 text-[13px] text-muted transition-colors hover:text-ink">
                Vezi un exemplu
              </button>
              <button
                onClick={() => {
                  trackEvent("discovery_completed", { choice: picked.id });
                  wizard.open();
                }}
                className="rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-bg"
              >
                Vreau o analiză gratuită
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------

export default function InteractiveDemo() {
  const [tab, setTab] = useState<"sistem" | "crm" | "descoperire">("sistem");

  return (
    <section id="demo-interactiv" className="section">
      <div className="eyebrow mb-8">Testează sistemul</div>
      <h2 className="max-w-[18ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]">
        <MaskReveal>Nu-ți spun cum arată.</MaskReveal>
        <MaskReveal delay={0.1}>
          <span className="mark">Poți încerca chiar acum</span>.
        </MaskReveal>
      </h2>
      <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.6] text-muted">
        Ce urmează e o simulare, nu sistemul real. Niciun mesaj, email sau
        lead din secțiunea asta nu e trimis sau salvat undeva — totul rulează
        local, în pagina asta, și dispare la refresh.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {[
          { id: "sistem" as const, label: "Simulare conversație" },
          { id: "crm" as const, label: "CRM (demo)" },
          { id: "descoperire" as const, label: "Ce îmi consumă timpul?" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-4 py-2.5 text-[13.5px] font-medium transition-colors ${
              tab === t.id ? "border-white/35 bg-white/[0.06] text-ink" : "border-line-strong text-faint hover:text-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "sistem" && <SystemDemo />}
        {tab === "crm" && <CrmDemo />}
        {tab === "descoperire" && <DiscoveryTool onSeeDemo={() => setTab("sistem")} />}
      </div>
    </section>
  );
}
