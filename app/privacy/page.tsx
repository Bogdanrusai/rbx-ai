import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Confidențialitate — RBX.AI",
  description: "Ce date colectează rbxagency.com, de ce și cum le poți cere ștearse.",
  // Without its own alternates/openGraph, this page silently inherited the
  // homepage's canonical URL and Open Graph title from app/layout.tsx —
  // search engines would have seen /privacy as a duplicate of "/", and any
  // social-media preview card would have shown the homepage's title instead
  // of this page's own.
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Confidențialitate — RBX.AI",
    description: "Ce date colectează rbxagency.com, de ce și cum le poți cere ștearse.",
    url: "/privacy",
  },
};

// Honest draft, written directly from what the site actually does today —
// not a generic template. Update this file the moment something changes
// (a new integration, a new form field). See the note at the bottom for
// what still needs Bogdan's real business/legal details before this can be
// called a legally complete policy.
export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="section max-w-[760px] pt-[calc(clamp(90px,14vh,160px)+40px)]">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-[13.5px] text-faint transition-colors hover:text-ink">
          <span aria-hidden="true">←</span> Înapoi la site
        </Link>
        <div className="eyebrow mb-6">Confidențialitate</div>
        <h1 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em]">
          Politica de confidențialitate
        </h1>
        <p className="mt-4 text-[14px] text-faint">Ultima actualizare: 2026.</p>

        <div className="mt-10 flex flex-col gap-8 text-[15px] leading-[1.7] text-muted">
          <section>
            <h2 className="mb-2 text-[17px] font-semibold text-ink">Ce date colectăm</h2>
            <p>
              Când completezi formularul „Programează o analiză gratuită”, colectăm exact informațiile pe
              care le scrii acolo: numele tău, adresa de email, numărul de telefon, numele
              companiei, website-ul sau contul de Instagram al afacerii, tipul de afacere,
              provocarea principală, volumul aproximativ de lead-uri și dacă folosești deja
              instrumente de automatizare. Nu colectăm nimic în plus, pe ascuns, prin formular.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[17px] font-semibold text-ink">De ce colectăm aceste date</h2>
            <p>
              Exclusiv ca să pot analiza personal situația afacerii tale și să revin cu un răspuns
              sau o soluție potrivită. Datele din formular ajung direct pe email, la mine — nu într-o
              bază de date publică, nu vândute sau partajate cu terți în scop de marketing.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[17px] font-semibold text-ink">Cum sunt trimise și păstrate</h2>
            <p>
              Formularul trimite datele prin serviciul de email Resend, direct către adresa mea de
              contact — nu ajung într-o bază de date sau un CRM public. După ce trimiți formularul,
              ecranul de confirmare îți oferă și opțiunea de a programa direct un apel, printr-un link
              Calendly. Dacă alegi această opțiune, orice informație introduci în Calendly (nume,
              email, ora aleasă) e guvernată de propria politică de confidențialitate a Calendly, nu
              de aceasta — Calendly se deschide separat, într-o filă nouă.
            </p>
            <p className="mt-3">
              Datele trimise prin formularul de calificare sunt păstrate doar atât timp cât este
              rezonabil necesar pentru a răspunde și gestiona cererea ta, și pot fi șterse la cerere,
              sub rezerva oricăror obligații legale reale aplicabile.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[17px] font-semibold text-ink">Asistentul conversațional</h2>
            <p>
              Asistentul de chat de pe site rulează în prezent integral pe server propriu (nu
              transmite conversația către un serviciu extern) — mesajele sunt procesate ca să
              genereze un răspuns și nu sunt salvate după ce închizi conversația. Dacă bifezi explicit
              căsuța de consimțământ din chat și scrii un email sau un telefon în discuție, acea
              informație e folosită doar în cadrul conversației respective, ca să știe asistentul că
              te poate contacta — nu e stocată separat și nu e trimisă prin email.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[17px] font-semibold text-ink">Analitice și cookie-uri</h2>
            <p>
              Site-ul folosește Vercel Analytics și Vercel Speed Insights pentru statistici generale
              de trafic și viteză (ex. câte persoane deschid o pagină, dacă un buton e apăsat).
              Ambele sunt fără cookie-uri de urmărire — nu construim un profil individual al tău și
              nu folosim cookie-uri de marketing sau de terți pe acest site. Detalii complete în{" "}
              <Link href="/cookies" className="text-ink underline underline-offset-4">
                Politica de cookies
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[17px] font-semibold text-ink">Drepturile tale</h2>
            <p>
              Poți cere oricând acces la datele pe care le am despre tine, corectarea sau ștergerea
              lor. Cel mai simplu, scrie-mi la{" "}
              <a href={`mailto:${site.contactEmail}`} className="text-ink underline underline-offset-4">
                {site.contactEmail}
              </a>.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[17px] font-semibold text-ink">Cine operează acest site</h2>
            <p>
              rbxagency.com este operat în prezent de Bogdan Rus, ca persoană fizică — nu printr-o
              firmă înregistrată (SRL/PFA). Nu există, la acest moment, un CUI sau o adresă de firmă
              de publicat, pentru că nu există o firmă înregistrată. Punctul de contact pentru orice
              solicitare legată de date este{" "}
              <a href={`mailto:${site.contactEmail}`} className="text-ink underline underline-offset-4">
                {site.contactEmail}
              </a>.
            </p>
          </section>

          <section className="rounded-2xl border border-dashed border-line-strong p-6 text-[13.5px] text-faint">
            <p className="font-medium text-muted">Notă de transparență</p>
            <p className="mt-2">
              Această pagină descrie onest ce face site-ul astăzi, la nivelul actual de operare
              (persoană fizică, fără firmă înregistrată). Dacă RBX.AI devine o firmă înregistrată
              (SRL/PFA), această secțiune și cea despre operator se actualizează imediat cu datele
              reale — CUI, denumire legală, adresă de firmă, dacă e cerută de lege.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
