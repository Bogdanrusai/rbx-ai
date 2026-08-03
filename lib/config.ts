/**
 * SINGLE SOURCE OF TRUTH.
 *
 * Every CTA on the site points to `site.contactUrl`.
 * To switch the destination later (WhatsApp, Calendly, cal.com, a form, …)
 * change ONLY this one line. Nothing else in the codebase needs editing.
 */
export const site = {
  handle: "@bogdanrus.ai",
  instagramUrl: "https://instagram.com/bogdanrus.ai",

  // 👇 change this one value to reroute every CTA
  contactUrl: "https://ig.me/m/bogdanrus.ai", // Instagram DM

  ctaLabel: "Vreau o analiză gratuită",
} as const;

export type Post = {
  id: string;
  title: string;
  tag: string;
  dir: "vsl" | "poveste" | "rezultate";
  count: number;
};

/**
 * The three real Instagram posts, integrated as proof.
 * Ordered to complete the story: problem → proof → the person.
 */
export const posts: Post[] = [
  {
    id: "vsl",
    title: "De ce pierzi clienți fără să știi",
    tag: "Problema & soluția",
    dir: "vsl",
    count: 8,
  },
  {
    id: "rezultate",
    title: "Recepționerul AI, în acțiune",
    tag: "Demo real",
    dir: "rezultate",
    count: 8,
  },
  {
    id: "poveste",
    title: "Povestea, construită în public",
    tag: "Cine sunt",
    dir: "poveste",
    count: 7,
  },
];

export const slidesOf = (p: Post): string[] =>
  Array.from({ length: p.count }, (_, i) => `/instagram/${p.dir}/${i + 1}.jpg`);
