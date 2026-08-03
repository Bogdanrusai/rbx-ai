/**
 * SINGLE SOURCE OF TRUTH.
 *
 * Every CTA on the site opens the qualification wizard (see
 * components/wizard/). `contactUrl` is kept as the secondary, non-primary
 * contact channel (used for Instagram links/proof, not as a CTA anymore).
 */
export const site = {
  handle: "@bogdanrus.ai",
  instagramUrl: "https://instagram.com/bogdanrus.ai",
  contactUrl: "https://ig.me/m/bogdanrus.ai", // secondary contact only — not wired to any CTA

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
