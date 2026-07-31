import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problema from "@/components/Problema";
import Sisteme from "@/components/Sisteme";
import Vsl from "@/components/Vsl";
import Demo from "@/components/Demo";
import Poveste from "@/components/Poveste";
import Showcase from "@/components/Showcase";
import Cta from "@/components/Cta";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problema />
      <Sisteme />
      <Vsl />
      <Demo />
      <Poveste />
      <Showcase />
      <Cta />
      <Faq />
      <Footer />
    </main>
  );
}
