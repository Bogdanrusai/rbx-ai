"use client";

import { motion } from "framer-motion";
import MaskReveal from "./MaskReveal";
import { trackEvent } from "@/lib/analytics";

const EASE = [0.16, 1, 0.3, 1] as const;

type Project = {
  id: string;
  name: string;
  status: string;
  summary: string;
  points: string[];
};

// Honest, real projects only — no invented clients, results or numbers.
// See lib/chatbot/knowledgeBase.ts for the same facts, kept in sync.
const projects: Project[] = [
  {
    id: "expert-instal-serv",
    name: "Expert Instal Serv.",
    status: "Proiect pilot · în testare",
    summary:
      "Firmă reală de instalații care pierdea cereri pe mesagerie în afara programului. Sistemul construit preia și califică automat mesajele primite, ca nimic să nu rămână fără răspuns.",
    points: [
      "Sistem construit și implementat, folosit efectiv de firmă",
      "Aflat acum în testare și feedback",
      "Rezultate/cifre confirmate se adaugă aici doar când există cu adevărat",
    ],
  },
  {
    id: "rbx-ai-website",
    name: "RBX.AI — Website / Sistem Digital",
    status: "Proiect intern · live",
    summary:
      "Acest website e el însuși un proiect RBX.AI: strategie de conversie, arhitectură a paginii, copywriting, formular de calificare a lead-urilor și asistentul cu care poți vorbi chiar acum.",
    points: [
      "Arhitectură homepage gândită pentru conversie, nu doar prezentare",
      "Formular de calificare în mai mulți pași, cu confirmare clară a pașilor următori",
      "Asistent AI grounded, fără informații inventate",
    ],
  },
];

export default function SelectedWork() {
  return (
    <section id="selected-work" className="section">
      <div className="eyebrow mb-8">Selected Work</div>
      <h2 className="max-w-[18ch] text-[clamp(30px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.022em]">
        <MaskReveal>Nu portofoliu.</MaskReveal>
        <MaskReveal delay={0.1}>
          <span className="mark">Sisteme construite</span>.
        </MaskReveal>
      </h2>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        className="mt-6 max-w-[52ch] text-[15.5px] leading-[1.65] text-muted"
      >
        Sunt la început — nu am zeci de proiecte de arătat. Am două reale, prezentate exact așa cum stau azi.
      </motion.p>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
            onViewportEnter={() => trackEvent("project_viewed", { project: p.id })}
            className="card flex flex-col rounded-[24px] p-8"
          >
            <span className="mb-5 inline-block w-fit rounded-full border border-line px-3 py-1.5 text-[10.5px] uppercase tracking-[0.16em] text-faint">
              {p.status}
            </span>
            <h3 className="text-[22px] font-semibold tracking-[-0.015em]">{p.name}</h3>
            <p className="mt-3 text-[14.5px] leading-[1.6] text-muted">{p.summary}</p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {p.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-faint">
                  <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-faint" />
                  {pt}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
