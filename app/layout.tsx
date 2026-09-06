import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import Providers from "@/components/Providers";
import { WizardProvider } from "@/components/wizard/WizardContext";
import Wizard from "@/components/wizard/Wizard";
import ChatbotWidget from "@/components/ChatbotWidget";
import VoiceflowWidget from "@/components/VoiceflowWidget";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Chatbot provider switch. Voiceflow is the intended production assistant
// (see components/VoiceflowWidget.tsx) — set NEXT_PUBLIC_VOICEFLOW_PROJECT_ID
// in Vercel once the real agent is published and the site switches to it
// automatically. Until then, the rule-based interim assistant
// (components/ChatbotWidget.tsx) covers the same funnel so the site never
// ships without a chatbot. Only one ever renders — never both.
const VOICEFLOW_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_VOICEFLOW_PROJECT_ID);

// 👉 La lansare: setează NEXT_PUBLIC_SITE_URL în Vercel (Settings → Environment Variables)
// cu domeniul tău real. Până atunci, valoarea de mai jos e doar un fallback local.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rbxagency.com";

const TITLE = "RBX.AI — Sisteme AI pentru afaceri";
const DESCRIPTION =
  "Construiesc sisteme AI care răspund, programează și fac follow-up non-stop — ca să nu mai pierzi niciun client.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: "Clienții tăi primesc răspuns instant. Chiar și la 3 noaptea.",
    url: SITE_URL,
    siteName: "RBX.AI",
    type: "website",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Clienții tăi primesc răspuns instant. Chiar și la 3 noaptea.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
};

// Minimal, factual Organization schema — only publicly-stated facts (name,
// url, description, founder, Instagram). No claims, ratings or reviews.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RBX.AI",
  url: SITE_URL,
  description: DESCRIPTION,
  founder: {
    "@type": "Person",
    name: "Bogdan Rus",
  },
  sameAs: ["https://instagram.com/bogdanrus.ai"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={GeistSans.variable}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Providers>
          <WizardProvider>
            <div className="hairline-grid" aria-hidden />
            <div className="glow" aria-hidden />
            <div className="grain" aria-hidden />
            {children}
            <Wizard />
            {VOICEFLOW_CONFIGURED ? <VoiceflowWidget /> : <ChatbotWidget />}
          </WizardProvider>
          <Analytics />
          <SpeedInsights />
        </Providers>
        
      </body>
    </html>
  );
}
