"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWizard } from "./WizardContext";

const EASE = [0.16, 1, 0.3, 1] as const;

type Choice = { label: string; icon: ReactNode };

const businessIcon = (d: string) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const businesses: Choice[] = [
  { label: "Clinică", icon: businessIcon("M12 6v12M6 12h12") },
  { label: "Salon", icon: businessIcon("M8 4l8 16M16 4L8 20M5 12h14") },
  { label: "Imobiliare", icon: businessIcon("M4 11l8-6 8 6M6 10v9h12v-9") },
  { label: "Restaurant", icon: businessIcon("M6 3v8a2 2 0 0 0 4 0V3M8 11v10M18 3c-2 0-3 2-3 5s1 4 3 4v9") },
  { label: "Ecommerce", icon: businessIcon("M5 7h14l-1.2 9.5a2 2 0 0 1-2 1.5H8.2a2 2 0 0 1-2-1.5L5 7ZM9 7a3 3 0 0 1 6 0") },
  { label: "Servicii", icon: businessIcon("M12 3l2.4 5 5.6.6-4 4 1 5.6L12 20.6 7 18.2l1-5.6-4-4 5.6-.6L12 3Z") },
  { label: "Alta", icon: businessIcon("M12 5v14M5 12h14") },
];

const problems = [
  "Răspund greu la mesaje",
  "Pierd lead-uri",
  "Programările sunt haotice",
  "Follow-up inexistent",
  "Vreau mai multe automatizări",
  "Altceva",
];

const volumes = ["Sub 20", "20 – 50", "50 – 100", "Peste 100"];
const usesAI = ["Da", "Nu"];

type Answers = {
  business?: string;
  problem?: string;
  volume?: string;
  ai?: string;
  name?: string;
  email?: string;
  phone?: string;
  instagram?: string;
  company?: string;
};

const TOTAL = 5;

/**
 * Single integration point for the qualification wizard.
 * Called once, with the full answer set, right when the user submits
 * step 5 ("Trimite analiza") — before the confirmation screen shows.
 *
 * Not wired to anything yet. To connect later:
 *   - n8n: POST `a` to a webhook URL (e.g. via fetch)
 *   - Google Sheets: POST to a Sheets API endpoint or Apps Script webhook
 *   - Notion: POST to a Notion database via the Notion API
 *   - Any CRM: POST to its lead-capture endpoint
 * Keep this synchronous-looking from the UI's perspective — fire the
 * request but don't block the confirmation screen on its response.
 */
function submitAnswers(a: Answers) {
  // TODO: wire to n8n / Google Sheets / Notion / CRM.
  // Example: fetch("/api/lead", { method: "POST", body: JSON.stringify(a) });
  void a;
}

export default function Wizard() {
  const { isOpen, close } = useWizard();
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const [a, setA] = useState<Answers>({});

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) return;
    const t = setTimeout(() => {
      setI(0);
      setDone(false);
      setA({});
    }, 400);
    return () => clearTimeout(t);
  }, [isOpen]);

  const set = (patch: Partial<Answers>) => setA((prev) => ({ ...prev, ...patch }));

  const pick = (patch: Partial<Answers>) => {
    set(patch);
    setTimeout(() => setI((n) => Math.min(n + 1, TOTAL - 1)), 240);
  };

  const emailValid = !!a.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email);
  const detailsValid = !!a.name?.trim() && emailValid && !!a.phone?.trim() && !!a.company?.trim();

  const canContinue = useMemo(() => {
    switch (i) {
      case 0: return !!a.business;
      case 1: return !!a.problem;
      case 2: return !!a.volume;
      case 3: return !!a.ai;
      case 4: return detailsValid;
      default: return false;
    }
  }, [i, a, detailsValid]);

  const advance = () => {
    if (i < TOTAL - 1) {
      setI((n) => n + 1);
      return;
    }
    submitAnswers(a);
    setDone(true);
  };
  const back = () => setI((n) => Math.max(0, n - 1));

  const progress = done ? 100 : (i / TOTAL) * 100;

  const labels = ["Afacerea", "Provocarea", "Volum", "AI & automatizări", "Datele tale"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Analiză gratuită RBX.AI"
        >
          <motion.div
            className="glass relative w-full max-w-[580px] overflow-hidden rounded-[30px] p-7 sm:p-10"
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/[0.07] blur-[80px]" aria-hidden />

            {/* header */}
            <div className="relative mb-9 flex items-center gap-4">
              <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-ink"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.55, ease: EASE }}
                />
              </div>
              <span className="text-[12px] tabular-nums text-faint">
                {done ? "Trimis" : `${i + 1} / ${TOTAL}`}
              </span>
              <button
                onClick={close}
                aria-label="Închide"
                className="grid h-8 w-8 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-white/35 hover:text-ink"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {!done ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 26 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -26 }}
                  transition={{ duration: 0.38, ease: EASE }}
                >
                  <div className="mb-2 text-[12px] uppercase tracking-[0.2em] text-faint">{labels[i]}</div>

                  {/* STEP 1 — business */}
                  {i === 0 && (
                    <>
                      <h3 className="text-[clamp(21px,3.4vw,28px)] font-semibold leading-[1.2] tracking-[-0.015em]">
                        Cu ce tip de afacere lucrezi?
                      </h3>
                      <div className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                        {businesses.map((b) => {
                          const sel = a.business === b.label;
                          return (
                            <button
                              key={b.label}
                              onClick={() => pick({ business: b.label })}
                              className={`group flex flex-col items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                                sel ? "border-white/50 bg-white/[0.07]" : "border-line-strong bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]"
                              }`}
                            >
                              <span className={`transition-colors ${sel ? "text-ink" : "text-muted group-hover:text-ink"}`}>{b.icon}</span>
                              <span className={`text-[14px] font-medium ${sel ? "text-ink" : "text-muted"}`}>{b.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* STEP 2 — problem */}
                  {i === 1 && (
                    <>
                      <h3 className="text-[clamp(21px,3.4vw,28px)] font-semibold leading-[1.2] tracking-[-0.015em]">
                        Care e cea mai mare problemă acum?
                      </h3>
                      <div className="mt-7 flex flex-col gap-2.5">
                        {problems.map((p) => (
                          <OptionRow key={p} label={p} selected={a.problem === p} onClick={() => pick({ problem: p })} />
                        ))}
                      </div>
                    </>
                  )}

                  {/* STEP 3 — volume */}
                  {i === 2 && (
                    <>
                      <h3 className="text-[clamp(21px,3.4vw,28px)] font-semibold leading-[1.2] tracking-[-0.015em]">
                        Câte lead-uri primești lunar?
                      </h3>
                      <div className="mt-7 grid grid-cols-2 gap-2.5">
                        {volumes.map((v) => {
                          const sel = a.volume === v;
                          return (
                            <button
                              key={v}
                              onClick={() => pick({ volume: v })}
                              className={`rounded-2xl border p-6 text-center text-[17px] font-semibold tracking-[-0.01em] transition-all duration-300 ${
                                sel ? "border-white/50 bg-white/[0.07] text-ink" : "border-line-strong bg-white/[0.02] text-muted hover:border-white/30 hover:text-ink"
                              }`}
                            >
                              {v}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* STEP 4 — AI usage */}
                  {i === 3 && (
                    <>
                      <h3 className="text-[clamp(21px,3.4vw,28px)] font-semibold leading-[1.2] tracking-[-0.015em]">
                        Folosești deja AI sau automatizări?
                      </h3>
                      <div className="mt-7 grid grid-cols-2 gap-2.5">
                        {usesAI.map((v) => {
                          const sel = a.ai === v;
                          return (
                            <button
                              key={v}
                              onClick={() => pick({ ai: v })}
                              className={`rounded-2xl border p-7 text-center text-[18px] font-semibold transition-all duration-300 ${
                                sel ? "border-white/50 bg-white/[0.07] text-ink" : "border-line-strong bg-white/[0.02] text-muted hover:border-white/30 hover:text-ink"
                              }`}
                            >
                              {v}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* STEP 5 — details */}
                  {i === 4 && (
                    <>
                      <h3 className="text-[clamp(21px,3.4vw,28px)] font-semibold leading-[1.2] tracking-[-0.015em]">
                        Unde îți trimit analiza?
                      </h3>
                      <p className="mt-2 text-[13.5px] text-faint">Le analizez personal și revin cu soluția potrivită.</p>
                      <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        <Field label="Nume" value={a.name || ""} onChange={(v) => set({ name: v })} autoFocus />
                        <Field label="Companie" value={a.company || ""} onChange={(v) => set({ company: v })} />
                        <Field label="Email" type="email" value={a.email || ""} onChange={(v) => set({ email: v })} invalid={!!a.email && !emailValid} className="sm:col-span-2" />
                        <Field label="Telefon" value={a.phone || ""} onChange={(v) => set({ phone: v })} />
                        <Field label="Instagram (opțional)" value={a.instagram || ""} onChange={(v) => set({ instagram: v })} optional />
                      </div>
                    </>
                  )}

                  {/* footer */}
                  <div className="mt-9 flex items-center justify-between">
                    <button
                      onClick={back}
                      disabled={i === 0}
                      className={`text-[14px] font-medium transition-colors ${i === 0 ? "cursor-not-allowed text-faint/40" : "text-faint hover:text-ink"}`}
                    >
                      ← Înapoi
                    </button>
                    {i === 4 && (
                      <button
                        onClick={advance}
                        disabled={!canContinue}
                        className={`btn-primary ${!canContinue ? "pointer-events-none opacity-40" : ""}`}
                      >
                        Trimite analiza
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="py-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                    className="mx-auto grid h-[70px] w-[70px] place-items-center rounded-full border border-white/25 bg-white/[0.06]"
                  >
                    <motion.svg
                      width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                    >
                      <motion.path d="M5 12.5l4.2 4.2L19 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, ease: EASE, delay: 0.3 }} />
                    </motion.svg>
                  </motion.div>

                  <h3 className="mt-8 text-[clamp(24px,3.6vw,32px)] font-semibold tracking-[-0.02em]">Perfect.</h3>
                  <p className="mx-auto mt-4 max-w-[44ch] text-[15.5px] leading-[1.65] text-muted">
                    Am primit răspunsurile tale. Voi analiza personal afacerea și îți voi trimite un
                    mesaj în cel mai scurt timp cu soluția potrivită pentru tine.
                  </p>
                  <button
                    onClick={close}
                    className="mt-9 rounded-full border border-line-strong px-7 py-3 text-[14px] font-medium text-ink transition-colors hover:border-white/35 hover:bg-white/[0.04]"
                  >
                    Închide
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function OptionRow({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-[15px] transition-all duration-300 ${
        selected ? "border-white/50 bg-white/[0.07] text-ink" : "border-line-strong bg-white/[0.02] text-muted hover:border-white/30 hover:text-ink"
      }`}
    >
      {label}
      <span className={`grid h-5 w-5 flex-none place-items-center rounded-full border transition-all ${selected ? "border-white bg-white text-bg" : "border-line-strong text-transparent"}`}>
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3 3 7-7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </button>
  );
}

function Field({
  label, value, onChange, type = "text", autoFocus, optional, invalid, className = "",
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; autoFocus?: boolean; optional?: boolean; invalid?: boolean; className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[12px] uppercase tracking-[0.14em] text-faint">{label}</span>
      <input
        type={type}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-[15.5px] text-ink outline-none transition-colors placeholder:text-faint focus:border-white/40 ${
          invalid ? "border-red-400/50" : "border-line-strong"
        }`}
      />
    </label>
  );
}
