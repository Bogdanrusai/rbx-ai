import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pagina nu există — RBX.AI",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="section flex min-h-[70vh] max-w-[640px] flex-col items-start justify-center pt-[calc(clamp(90px,14vh,160px)+40px)]">
        <span className="eyebrow mb-6">404</span>
        <h1 className="text-[clamp(28px,4.4vw,44px)] font-semibold leading-[1.1] tracking-[-0.02em]">
          Pagina asta nu există.
        </h1>
        <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.6] text-muted">
          Fie linkul e greșit, fie pagina a fost mutată. Cel mai sigur e să
          te întorci pe pagina principală.
        </p>
        <Link href="/" className="btn-ghost group mt-8">
          <span className="h-[5px] w-[5px] rounded-full bg-faint" />
          Înapoi la RBX.AI
          <span className="transition-transform duration-300 ease-premium group-hover:translate-x-1">→</span>
        </Link>
      </main>
      <Footer />
    </>
  );
}
