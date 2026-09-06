import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Termeni de utilizare — RBX.AI",
  description: "Termenii de utilizare pentru rbxagency.com.",
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="section max-w-[760px] pt-[calc(clamp(90px,14vh,160px)+40px)]">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-[13.5px] text-faint transition-colors hover:text-ink">
          <span aria-hidden="true">←</span> Înapoi la site
        </Link>
        <div className="eyebrow mb-6">Termeni</div>
        <h1 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em]">
          Termeni de utilizare
        </h1>
        <p className="mt-4 text-[14px] text-faint">Ultima actualizare: 2026.</p>

        <div className="mt-10 flex flex-col gap-8 text-[15px] leading-[1.7] text-muted">
          <section>
            <h2 className="mb-2 text-[17px] font-semibold text-ink">Ce este acest site</h2>
            <p>
              rbxagency.com prezintă serviciile RBX.AI — sisteme AI construite pentru afaceri mici și
              mijlocii — și oferă un formular prin care poți solicita o analiză gratuită a afacerii
              tale. Site-ul nu vinde produse direct online; nu există un proces de plată sau
              checkout pe acest domeniu.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[17px] font-semibold text-ink">Conținut și informații</h2>
            <p>
              Conținutul de pe site (descrieri de servicii, proiecte, asistentul conversațional)
              reflectă starea reală a proiectelor la momentul publicării. Proiectele marcate drept
              „pilot” sau „intern” sunt descrise exact ca atare — nu ca rezultate finale sau
              garantate pentru orice altă afacere.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[17px] font-semibold text-ink">Fără garanții de rezultat</h2>
            <p>
              Nicio informație de pe site sau din asistentul conversațional nu constituie o
              garanție de preț, termen de livrare sau rezultat de business. Orice ofertă concretă se
              stabilește individual, după analiza gratuită, printr-o discuție directă.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[17px] font-semibold text-ink">Linkuri către terți</h2>
            <p>
              Site-ul poate conține linkuri către Instagram sau Calendly. Odată ce accesezi acele
              platforme, se aplică termenii și politicile lor, nu ale rbxagency.com.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[17px] font-semibold text-ink">Contact</h2>
            <p>
              Pentru orice întrebare legată de acești termeni, scrie la{" "}
              <a href={`mailto:${site.contactEmail}`} className="text-ink underline underline-offset-4">
                {site.contactEmail}
              </a>.
            </p>
          </section>

          <section className="rounded-2xl border border-dashed border-line-strong p-6 text-[13.5px] text-faint">
            <p className="font-medium text-muted">Notă de transparență</p>
            <p className="mt-2">
              Această pagină acoperă utilizarea site-ului, nu un contract de prestări servicii.
              Termenii comerciali specifici unui proiect (livrabile, plată, proprietate intelectuală)
              se stabilesc separat, în scris, pentru fiecare colaborare — nu sunt reprezentați aici.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
