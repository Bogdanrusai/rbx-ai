"use client";

// Thin wrapper around @vercel/analytics custom events (already installed &
// mounted globally in app/layout.tsx via <Analytics />). Centralized here so
// every conversion touchpoint uses the same event names — check Vercel
// Analytics → Events in the dashboard once traffic starts.
import { track } from "@vercel/analytics";

export type AnalyticsEvent =
  | "cta_click"
  | "form_started"
  | "form_submitted"
  | "vsl_interacted"
  | "project_viewed"
  | "instagram_outbound_click"
  | "chatbot_opened"
  | "chatbot_first_message"
  | "chatbot_cta_click"
  | "chatbot_form_started"
  | "chatbot_booking_reached";

export function trackEvent(event: AnalyticsEvent, props?: Record<string, string | number | boolean>) {
  try {
    track(event, props);
  } catch {
    // analytics must never break the page
  }
}
