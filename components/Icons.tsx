import type { SVGProps } from "react";

const s = (props: SVGProps<SVGSVGElement>) => ({
  fill: "none",
  stroke: "currentColor",
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export const Arrow = (p: SVGProps<SVGSVGElement>) => (
  <svg width="15" height="15" viewBox="0 0 16 16" {...s(p)}>
    <path d="M3 8h9M9 4l4 4-4 4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Minus = (p: SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 16 16" {...s(p)}>
    <path d="M4 8h8" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const Check = (p: SVGProps<SVGSVGElement>) => (
  <svg width="12" height="12" viewBox="0 0 16 16" {...s(p)}>
    <path d="M3 8.5l3 3 7-7.5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Bolt = (p: SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...s(p)}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const Refresh = (p: SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...s(p)}>
    <path
      d="M4 8a8 8 0 0 1 14-3m2 3V4m0 4h-4M20 16a8 8 0 0 1-14 3m-2-3v4m0-4h4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Calendar = (p: SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...s(p)}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" strokeWidth="1.5" />
    <path d="M3.5 9.5h17M8 3v4m8-4v4" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Star = (p: SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...s(p)}>
    <path
      d="m12 3 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.2l1-5.9L3.5 9.2l5.9-.8L12 3Z"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const Layers = (p: SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...s(p)}>
    <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="m3 12 9 4.5L21 12M3 16.5 12 21l9-4.5" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const Shield = (p: SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...s(p)}>
    <path d="M12 2 3 7v6c0 5 3.8 8.3 9 9 5.2-.7 9-4 9-9V7l-9-5Z" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Send = (p: SVGProps<SVGSVGElement>) => (
  <svg width="15" height="15" viewBox="0 0 16 16" {...s(p)}>
    <path d="M2 8h10M8 3l5 5-5 5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Instagram = (p: SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 24 24" {...s(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="4" strokeWidth="1.6" />
    <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);
