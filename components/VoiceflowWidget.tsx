"use client";

import { useEffect } from "react";
import { useWizard } from "./wizard/WizardContext";
import { trackEvent } from "@/lib/analytics";

/**
 * Production chatbot integration point — Voiceflow.
 *
 * Bogdan's mentorship provides a Voiceflow AI Agent template (prompt +
 * knowledge base) for this exact funnel (understand → qualify → guide to
 * form → booking). This component is the website-side half of that
 * integration: it loads Voiceflow's official widget embed IF a real project
 * ID is configured, and stays inert otherwise. No project ID, embed URL or
 * credential is invented here — see README "Chatbot (Voiceflow)" for the
 * exact steps to go live once the agent is published.
 *
 * Until NEXT_PUBLIC_VOICEFLOW_PROJECT_ID is set, <ChatbotWidget /> (the
 * rule-based interim assistant) renders instead — see app/layout.tsx. Only
 * one of the two ever renders, so there is never a competing chatbot on the
 * page.
 */

const PROJECT_ID = process.env.NEXT_PUBLIC_VOICEFLOW_PROJECT_ID;

declare global {
  interface Window {
    voiceflow?: {
      chat?: {
        load: (config: Record<string, unknown>) => void;
        open?: () => void;
        on?: (event: string, cb: (...args: unknown[]) => void) => void;
      };
    };
    // Bridge for the Voiceflow flow to trigger the site's own qualification
    // wizard (a "Custom Code" or "Open URL"-style step in Voiceflow can call
    // window.rbxOpenQualificationForm() instead of linking off-site).
    rbxOpenQualificationForm?: () => void;
  }
}

export default function VoiceflowWidget() {
  const wizard = useWizard();

  // Always expose the bridge, even before Voiceflow is connected, so the
  // integration point is ready the moment the real embed is added.
  useEffect(() => {
    window.rbxOpenQualificationForm = () => {
      trackEvent("chatbot_form_started");
      wizard.open("chatbot");
    };
    return () => {
      delete window.rbxOpenQualificationForm;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!PROJECT_ID) return;
    if (document.getElementById("voiceflow-widget-script")) return;

    const script = document.createElement("script");
    script.id = "voiceflow-widget-script";
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.onload = () => {
      window.voiceflow?.chat?.load({
        verify: { projectID: PROJECT_ID },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
        render: {
          mode: "overlay",
        },
      });
      trackEvent("chatbot_opened", { provider: "voiceflow" });

      // Best-effort event hooks — wire once the real agent confirms which
      // SDK version/events it exposes; failures here must never break the
      // page, so every call is guarded.
      try {
        window.voiceflow?.chat?.on?.("message", () => trackEvent("chatbot_first_message"));
      } catch {
        // no-op: event API not available on this SDK version
      }
    };
    document.body.appendChild(script);
  }, []);

  // While the qualification wizard is open, Voiceflow's own widget should
  // stay out of the way too — same rule as the interim widget, so the two
  // never fight over the bottom-right corner on mobile.
  useEffect(() => {
    const el = document.getElementById("voiceflow-chat-frame") as HTMLElement | null;
    if (el) el.style.display = wizard.isOpen ? "none" : "";
  }, [wizard.isOpen]);

  return null;
}
