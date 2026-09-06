"use client";

import Link from "next/link";
import { site } from "@/lib/config";
import { useWizard } from "./wizard/WizardContext";
import SocialLinks from "./SocialLinks";
import { trackEvent } from "@/lib/analytics";

// Phone architecture, prepared but inert until real values are provided.
// Setting NEXT_PUBLIC_PHONE_NUMBER shows a real tap-to-call footer link —
// no number is ever invented here. NEXT_PUBLIC_VOICE_AGENT_NUMBER is a
// SEPARATE flag: only set it once the voice agent is actually live and
// tested, since this line renders as a direct claim ("sună și testează").
const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER;
const VOICE_AGENT_NUMBER = process.env.NEXT_PUBLIC_VOICE_AGENT_NUMBER;

const navCols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Site",
    links: [
      { label: "Cum funcționează", href: "#demo" },
      { label: "Sisteme", href: "#sisteme" },
      { label: "Proiecte", href: "#selected-work" },
      { label: "Despre RBX.AI", href: "#poveste" },
      { label: "Întrebări", href: "#faq" },
    ],
  },
];

export default function Footer() {
  const { open: openWizard } = useWizard();

  return (
    <footer className="relative z-[5] border-t border-line">
      <div className="mx-auto max-w-content px-[clamp(20px,5vw,64px)] py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <span className="text-[16px] font-semibold tracking-[0.14em]">RBX.AI</span>
            <p className="max-w-[36ch] text-[14px] leading-[1.6] text-faint">
              Înțeleg întâi cum lucrează afacerea ta, apoi construiesc sistemul care preia
              mesajele, lead-urile și munca repetitivă din spatele ei.
            </p>
            <button onClick={() => openWizard()} className="btn-ghost group mt-1 w-fit">
              <span className="h-[5px] w-[5px] rounded-full bg-faint" />
              Vreau o analiză gratuită
              <span className="transition-transform duration-300 ease-premium group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          {navCols.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <span className="text-[12px] uppercase tracking-[0.16em] text-faint">{col.title}</span>
              {col.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="w-fit text-[13.5px] text-muted transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <span className="text-[12px] uppercase tracking-[0.16em] text-faint">Contact</span>
            <a
              href={`mailto:${site.contactEmail}`}
              className="w-fit text-[13.5px] text-muted transition-colors hover:text-ink"
            >
              {site.contactEmail}
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-[13.5px] text-muted transition-colors hover:text-ink"
            >
              {site.handle}
            </a>
            {PHONE_NUMBER && (
              <a
                href={`tel:${PHONE_NUMBER}`}
                onClick={() => trackEvent("phone_click", { from: "footer" })}
                className="w-fit text-[13.5px] text-muted transition-colors hover:text-ink"
              >
                {PHONE_NUMBER}
              </a>
            )}
            {VOICE_AGENT_NUMBER && (
              <a
                href={`tel:${VOICE_AGENT_NUMBER}`}
                onClick={() => trackEvent("phone_click", { from: "footer_voice_agent" })}
                className="w-fit text-[13.5px] text-muted transition-colors hover:text-ink"
              >
                Sună și testează agentul vocal RBX.AI
              </a>
            )}
            <SocialLinks from="footer" className="mt-1" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[13px] text-faint">© {new Date().getFullYear()} RBX.AI · rbxagency.com</span>
          <div className="flex items-center gap-5 text-[13px] text-faint">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Confidențialitate
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Termeni
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
