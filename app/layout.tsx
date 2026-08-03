import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import Providers from "@/components/Providers";
import { WizardProvider } from "@/components/wizard/WizardContext";
import Wizard from "@/components/wizard/Wizard";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// 👉 La lansare: setează NEXT_PUBLIC_SITE_URL în Vercel (Settings → Environment Variables)
// cu domeniul tău real. Până atunci, valoarea de mai jos e doar un fallback local.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rbx.ai";

export const metadata: Metadata = {
  title: "RBX.AI — Sisteme AI pentru afaceri",
  description:
    "Construiesc sisteme AI care răspund, programează și fac follow-up non-stop — ca să nu mai pierzi niciun client.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "RBX.AI — Sisteme AI pentru afaceri",
    description:
      "Clienții tăi primesc răspuns instant. Chiar și la 3 noaptea.",
    type: "website",
    locale: "ro_RO",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={GeistSans.variable}>
      <body>
        <Providers>
          <WizardProvider>
            <div className="hairline-grid" aria-hidden />
            <div className="glow" aria-hidden />
            <div className="grain" aria-hidden />
            {children}
            <Wizard />
          </WizardProvider>
        </Providers>
        <Analytics />
<SpeedInsights />
      </body>
    </html>
  );
}
