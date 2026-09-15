import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Politica de cookies — RBX.AI",
  description: "Ce cookie-uri (sau ce nu) folosește rbxagency.com.",
  alternates: {
    canonical: "/cookies",
  },
  openGraph: {
    title: "Politica de cookies — RBX.AI",
    description: "Ce cookie-uri (sau ce nu) folosește rbxagency.com.",
    url: "/cookies",
  },
};

// Honest draft, scris direct din ce face site-ul astăzi — nu un șablon
// generic. Actualizează acest fișier în clipa în care se schimbă ceva (un
// cookie nou, un script nou). Vezi și app/privacy/page.tsx.
export default function CookiesPage() {
  return (
    <>
      <Nav />
      <main className="section max-w-[760px] pt-[calc(clamp(90px,14vh,160px)+40px)]">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-[13.5px] text-faint transition-colors hover:text-ink">
          <span aria-hidden="true">←</span> Înapoi la site
        </Link>
        <div className="eyebrow mb-6">Cookie-uri</div>
        <h1 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em]">
          Politica de cookies
        </h1>
        <p className="mt-4 text-[14px] text-faint">Ultima actualizare: 2026.</p>

        <div className="mt-10 flex flex-col gap-8 text-[15px] leading-[1.7] text-muted">
          <section>
            <h2 className="mb-2 text-[17px] font-semibold text-ink">Pe scurt</h2>
            <p>
              rbxagency.com nu folosește cookie-uri de urmărire, cookie-uri de marketing sau
              cookie-uri de la terți. Nu există un banner de consimțământ pentru cookie-uri pe acest
              site, pentru că nu instalăm nimic care ar necesita acel consimțământ.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[17px] font-semibold text-ink">Ce folosim în schimb</h2>
            <p>
              Pentru statistici generale de trafic și viteză (ex. câte persoane deschid o pagină,
              dacă un buton e apăsat, cât de rapid se încarcă site-ul), folosim Vercel Analytics și
              Vercel Speed Insights. Ambele funcționează fără cookie-uri și fără un identificator
              persistent — nu construim un profil individual al tău și nu te putem recunoaște de la o
              vizită la alta pe baza lor.
            </p>
            <p className="mt-3">
              Site-ul nu salvează nimic în localStorage sau sessionStorage pentru urmărire. Formularul
              de calificare și asistentul conversațional funcționează exclusiv în memoria paginii, cât
              timp fila e deschisă — nimic din ce scrii acolo nu rămâne stocat local în browser.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[17px] font-semibold text-ink">Linkuri către alte site-uri</h2>
            <p>
              Site-ul conține linkuri către Instagram, TikTok, YouTube și, după trimiterea
              formularului de calificare, către Calendly (pentru programarea unui apel). Niciunul
              dintre acestea nu este încărcat pe rbxagency.com — se deschid separat, într-o filă nouă.
              Odată ce ajungi pe platforma respectivă, aceasta poate folosi propriile cookie-uri, sub
              propria politică de confidențialitate, nu sub aceasta.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[17px] font-semibold text-ink">Întrebări</h2>
            <p>
              Pentru orice întrebare legată de cookie-uri sau date, scrie la{" "}
              <a href={`mailto:${site.contactEmail}`} className="text-ink underline underline-offset-4">
                {site.contactEmail}
              </a>
              . Vezi și{" "}
              <Link href="/privacy" className="text-ink underline underline-offset-4">
                Politica de confidențialitate
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
