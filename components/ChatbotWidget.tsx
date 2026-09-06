"use client";

/**
 * INTERIM assistant — rule-based, zero-dependency, grounded strictly in
 * lib/chatbot/knowledgeBase.ts. Renders only while
 * NEXT_PUBLIC_VOICEFLOW_PROJECT_ID is unset (see app/layout.tsx) — once the
 * real Voiceflow agent from the mentorship template is published and that
 * env var is set, VoiceflowWidget.tsx takes over and this component stops
 * rendering. Kept (not deleted) so the site never ships without a chatbot,
 * and to preserve the UX/conversion rules (grounded answers only, no
 * fabricated prices/results, always route to the qualification form) as the
 * baseline the Voiceflow agent should also follow.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWizard } from "./wizard/WizardContext";
import { trackEvent } from "@/lib/analytics";
import type { ChatMessage } from "@/lib/chatbot/reply";

type UiMessage = ChatMessage & { suggestedAction?: { label: string; href: string } };

const EASE = [0.16, 1, 0.3, 1] as const;

const WELCOME: UiMessage = {
  role: "assistant",
  text: "Bună! Sunt asistentul RBX.AI. Te pot ajuta cu întrebări despre servicii, proces, proiecte sau cum începi. Cu ce te pot ajuta?",
};

// Shown only under the welcome message, to lower the barrier to the first
// message — clicking one sends that exact text, same as typing it.
const SUGGESTED_CHIPS = ["Cât costă?", "Cum funcționează?", "Vreau proiectele"];

type BusinessType = { id: string; label: string };

export default function ChatbotWidget() {
  const wizard = useWizard();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [handoff, setHandoff] = useState(false);
  const [consent, setConsent] = useState(false);
  const [dimmed, setDimmed] = useState(false);
  // Session-scoped only: kept in memory for this browser tab, sent back to
  // the API on each message so the assistant doesn't re-ask, and never
  // persisted anywhere (no localStorage, no CRM, no cookie).
  const [businessType, setBusinessType] = useState<BusinessType | null>(null);
  const startedRef = useRef(false);
  const firstMessageSentRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fade slightly during scroll so the bubble doesn't sit heavily over
  // moving content underneath it — still fully clickable throughout.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      setDimmed(true);
      if (t) clearTimeout(t);
      t = setTimeout(() => setDimmed(false), 220);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (t) clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  function openWidget() {
    setOpen(true);
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("chatbot_opened");
      setMessages([WELCOME]);
    }
  }

  // Escape path from other parts of the page (e.g. FAQ's "Nu ai găsit
  // răspunsul?") without lifting the whole widget into a shared context.
  useEffect(() => {
    const onExternalOpen = () => openWidget();
    window.addEventListener("rbx:open-chatbot", onExternalOpen);
    return () => window.removeEventListener("rbx:open-chatbot", onExternalOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goToForm() {
    trackEvent("chatbot_form_started");
    setOpen(false);
    wizard.open("chatbot");
  }

  async function sendText(text: string) {
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);

    if (!firstMessageSentRef.current) {
      firstMessageSentRef.current = true;
      trackEvent("chatbot_first_message");
    }

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map(({ role, text }) => ({ role, text })),
          contactConsent: consent,
          businessType,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setMessages((m) => [
          ...m,
          { role: "assistant", text: data.error || "A apărut o eroare temporară. Încearcă din nou." },
        ]);
        return;
      }
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", text: data.text, suggestedAction: data.suggestedAction }]);
      if (data.handoff) setHandoff(true);
      if (data.detectedBusinessType && !businessType) setBusinessType(data.detectedBusinessType);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "A apărut o eroare temporară. Poți încerca din nou sau completezi formularul direct." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function send() {
    return sendText(input.trim());
  }

  function onSuggestedAction(action: { label: string; href: string }) {
    trackEvent("chatbot_cta_click", { label: action.label });
    if (action.href === "#top") {
      goToForm();
      return;
    }
    setOpen(false);
    const el = document.querySelector(action.href);
    el?.scrollIntoView({ behavior: "smooth" });
  }

  // While the qualification wizard is open, hide the bubble entirely so it
  // never overlaps the wizard's own final "Trimite" button on mobile.
  if (wizard.isOpen) return null;

  return (
    <div
      className={`fixed z-40 transition-opacity duration-200 ${dimmed && !open ? "opacity-40" : "opacity-100"}`}
      style={{
        bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
        right: "calc(1rem + env(safe-area-inset-right, 0px))",
      }}
    >
      {!open && (
        <button
          onClick={openWidget}
          aria-label="Deschide asistentul RBX.AI"
          className="grid h-12 w-12 place-items-center rounded-full border border-line-strong bg-surface text-ink opacity-90 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all hover:opacity-100 hover:border-white/35 focus-visible:opacity-100 sm:h-14 sm:w-14"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 4.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-4.5 4V17H4a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="8.5" cy="10.5" r="1" fill="currentColor" />
            <circle cx="12" cy="10.5" r="1" fill="currentColor" />
            <circle cx="15.5" cy="10.5" r="1" fill="currentColor" />
          </svg>
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="flex h-[28rem] max-h-[70vh] w-[22rem] max-w-[88vw] flex-col overflow-hidden rounded-[20px] border border-line-strong bg-bg shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="text-[13.5px] font-medium tracking-[-0.01em] text-ink">Asistent RBX.AI</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Închide asistentul"
                className="grid h-7 w-7 place-items-center rounded-full text-faint transition-colors hover:text-ink"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto px-3 py-3 text-[13.5px]">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                  <span
                    className={`inline-block max-w-[86%] rounded-2xl px-3.5 py-2 leading-[1.45] ${
                      m.role === "user" ? "bg-ink text-bg" : "bg-surface text-ink"
                    }`}
                  >
                    {m.text}
                  </span>
                  {m.suggestedAction && (
                    <div>
                      <button
                        onClick={() => onSuggestedAction(m.suggestedAction!)}
                        className="mt-1.5 inline-block rounded-full border border-line-strong px-3 py-1.5 text-[12px] text-muted transition-colors hover:border-white/35 hover:text-ink"
                      >
                        {m.suggestedAction.label} →
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {SUGGESTED_CHIPS.map((c) => (
                    <button
                      key={c}
                      onClick={() => sendText(c)}
                      className="rounded-full border border-line-strong px-3 py-1.5 text-[12px] text-muted transition-colors hover:border-white/35 hover:text-ink"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
              {loading && <div className="text-left text-[12px] text-faint">Scrie…</div>}
              {handoff && (
                <div className="pt-1 text-center text-[11.5px] text-faint">
                  Pentru continuare directă cu Bogdan, folosește formularul de analiză gratuită.
                </div>
              )}
            </div>

            <div className="border-t border-line px-3 py-2 text-[11px] text-faint">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5"
                />
                Sunt de acord să fiu contactat dacă las un email/telefon în conversație.
              </label>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex gap-2 border-t border-line p-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Scrie un mesaj…"
                className="flex-1 rounded-full border border-line-strong bg-surface px-3.5 py-2 text-[13.5px] text-ink outline-none focus:border-white/35"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-full bg-ink px-4 text-[13px] font-medium text-bg transition-opacity disabled:opacity-40"
              >
                Trimite
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
