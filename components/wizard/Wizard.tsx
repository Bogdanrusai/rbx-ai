"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWizard } from "./WizardContext";
import { site } from "@/lib/config";

const EASE = [0.16, 1, 0.3, 1] as const;

type StepDef = {
  key: string;
  label: string;
  title: string;
  hint?: string;
  kind: "text" | "textarea" | "single" | "multi";
  placeholder?: string;
  options?: string[];
  optional?: boolean;
};

const steps: StepDef[] = [
  { key: "business", label: "Afacerea", title: "Cum se numește afacerea ta?", kind: "text", placeholder: "Ex: Clinica DentaCare" },
  {
    key: "domain",
    label: "Domeniul",
    title: "În ce domeniu activezi?",
    kind: "single",
    options: ["Clinică / cabinet", "Salon / beauty", "Servicii / local", "Imobiliare", "E-commerce", "Altceva"],
  },
  {
    key: "pain",
    label: "Provocarea",
    title: "Ce te costă cel mai mult timp sau bani acum?",
    hint: "Alege ce te doare cel mai tare.",
    kind: "single",
    options: [
      "Pierd clienți care nu primesc răspuns",
      "Prea mult timp pe sarcini repetitive",
      "Lead-uri care se pierd fără follow-up",
      "Programări și organizare haotice",
      "Nu am timp de marketing",
    ],
  },
  {
    key: "platforms",
    label: "Platforme",
    title: "Unde îți vin clienții acum?",
    hint: "Poți alege mai multe.",
    kind: "multi",
    options: ["Instagram", "WhatsApp", "Facebook", "Email", "Telefon", "Website", "CRM"],
  },
  {
    key: "goal",
    label: "Obiectivul",
    title: "Care e obiectivul tău în următoarele 90 de zile?",
    kind: "single",
    options: ["Mai mulți clienți", "Mai mult timp liber", "Procese automatizate", "Să scalez afacerea"],
  },
  {
    key: "detail",
    label: "Detalii",
    title: "Spune-mi pe scurt despre afacere și cu ce te-ai vrea ajutat.",
    kind: "textarea",
    placeholder: "Câteva rânduri sunt suficiente — vreau doar să înțeleg contextul.",
    optional: true,
  },
];

type Answers = Record<string, string | string[]>;

function buildMessage(a: Answers): string {
  const lines = [
    "Salut, Bogdan! Am completat pe site:",
    "",
    `• Afacere: ${a.business || "—"}`,
    `• Domeniu: ${a.domain || "—"}`,
    `• Provocare: ${a.pain || "—"}`,
    `• Platforme: ${Array.isArray(a.platforms) ? a.platforms.join(", ") : "—"}`,
    `• Obiectiv 90 zile: ${a.goal || "—"}`,
  ];
  if (a.detail) lines.push(`• Detalii: ${a.detail}`);
  return lines.join("\n");
}

export default function Wizard() {
  const { isOpen, close } = useWizard();
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});

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

  // reset shortly after closing
  useEffect(() => {
    if (isOpen) return;
    const t = setTimeout(() => {
      setI(0);
      setDone(false);
      setAnswers({});
    }, 400);
    return () => clearTimeout(t);
  }, [isOpen]);

  const step = steps[i];
  const value = answers[step?.key];

  const canNext = useMemo(() => {
    if (!step) return false;
    if (step.optional) return true;
    if (step.kind === "multi") return Array.isArray(value) && value.length > 0;
    return typeof value === "string" && value.trim().length > 0;
  }, [step, value]);

  const set = (v: string | string[]) => setAnswers((a) => ({ ...a, [step.key]: v }));
  const toggleMulti = (opt: string) => {
    const cur = Array.isArray(value) ? value : [];
    set(cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt]);
  };

  const next = () => {
    if (i < steps.length - 1) setI((n) => n + 1);
    else setDone(true);
  };
  const back = () => setI((n) => Math.max(0, n - 1));

  const dmHref = `${site.contactUrl}?text=${encodeURIComponent(buildMessage(answers))}`;
  const progress = done ? 100 : ((i) / steps.length) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Calificare RBX.AI"
        >
          <motion.div
            className="glass relative w-full max-w-[560px] overflow-hidden rounded-[28px] p-7 sm:p-10"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ambient orb */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/[0.06] blur-[70px]" aria-hidden />

            {/* header: progress + close */}
            <div className="relative mb-8 flex items-center gap-4">
              <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-ink"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </div>
              <span className="text-[12px] tabular-nums text-faint">
                {done ? "Gata" : `${i + 1} / ${steps.length}`}
              </span>
              <button
                onClick={close}
                aria-label="Închide"
                className="grid h-8 w-8 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-white/35 hover:text-ink"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <div className="mb-2 text-[12px] uppercase tracking-[0.2em] text-faint">{step.label}</div>
                  <h3 className="text-[clamp(21px,3.2vw,27px)] font-semibold leading-[1.2] tracking-[-0.015em]">
                    {step.title}
                  </h3>
                  {step.hint && <p className="mt-2 text-[13.5px] text-faint">{step.hint}</p>}

                  <div className="mt-7">
                    {step.kind === "text" && (
                      <input
                        autoFocus
                        value={(value as string) || ""}
                        onChange={(e) => set(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && canNext && next()}
                        placeholder={step.placeholder}
                        className="w-full rounded-2xl border border-line-strong bg-white/[0.03] px-5 py-4 text-[16px] text-ink outline-none transition-colors placeholder:text-faint focus:border-white/40"
                      />
                    )}
                    {step.kind === "textarea" && (
                      <textarea
                        autoFocus
                        rows={4}
                        value={(value as string) || ""}
                        onChange={(e) => set(e.target.value)}
                        placeholder={step.placeholder}
                        className="w-full resize-none rounded-2xl border border-line-strong bg-white/[0.03] px-5 py-4 text-[15.5px] leading-[1.55] text-ink outline-none transition-colors placeholder:text-faint focus:border-white/40"
                      />
                    )}
                    {(step.kind === "single" || step.kind === "multi") && (
                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {step.options!.map((opt) => {
                          const selected =
                            step.kind === "multi"
                              ? Array.isArray(value) && value.includes(opt)
                              : value === opt;
                          return (
                            <button
                              key={opt}
                              onClick={() => {
                                if (step.kind === "multi") toggleMulti(opt);
                                else {
                                  set(opt);
                                  setTimeout(next, 260);
                                }
                              }}
                              className={`group flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left text-[14.5px] transition-all duration-300 ${
                                selected
                                  ? "border-white/50 bg-white/[0.06] text-ink"
                                  : "border-line-strong bg-white/[0.02] text-muted hover:border-white/30 hover:text-ink"
                              }`}
                            >
                              {opt}
                              <span
                                className={`grid h-5 w-5 flex-none place-items-center rounded-full border transition-all ${
                                  selected ? "border-white bg-white text-bg" : "border-line-strong text-transparent"
                                }`}
                              >
                                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3 3 7-7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={back}
                      disabled={i === 0}
                      className={`text-[14px] font-medium transition-colors ${
                        i === 0 ? "cursor-not-allowed text-faint/40" : "text-faint hover:text-ink"
                      }`}
                    >
                      ← Înapoi
                    </button>
                    <button
                      onClick={next}
                      disabled={!canNext}
                      className={`btn-primary transition-opacity ${!canNext ? "pointer-events-none opacity-40" : ""}`}
                    >
                      {i === steps.length - 1 ? "Trimite" : "Continuă"}
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="py-4 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                    className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-white/[0.06]"
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </motion.div>

                  <h3 className="mt-7 text-[clamp(23px,3.4vw,30px)] font-semibold tracking-[-0.02em]">Perfect.</h3>
                  <p className="mx-auto mt-3 max-w-[42ch] text-[15px] leading-[1.6] text-muted">
                    Am pregătit informațiile despre afacerea ta. Le analizez înainte de discuția
                    noastră, ca să vin direct cu cele mai bune soluții pentru tine.
                  </p>

                  <div className="mt-8 flex flex-col items-center gap-3">
                    <a
                      href={dmHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setTimeout(close, 300)}
                      className="btn-primary !px-8 !py-[16px]"
                    >
                      Continuă conversația pe Instagram
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" /></svg>
                    </a>
                    <span className="text-[12.5px] text-faint">Îți deschid conversația cu răspunsurile deja completate.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
