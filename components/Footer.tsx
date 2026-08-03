import { site } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="relative z-[5] mx-auto flex max-w-content flex-wrap items-center justify-between gap-6 border-t border-line px-[clamp(20px,5vw,64px)] py-11 max-sm:flex-col max-sm:items-start">
      <div className="flex flex-col gap-1.5">
        <span className="text-[15px] font-semibold tracking-[0.14em]">RBX.AI</span>
        <span className="text-[13px] text-faint">
          Sisteme AI pentru afaceri · România
        </span>
      </div>
      <div className="flex items-center gap-[22px] text-[13px] text-faint">
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted transition-colors hover:text-ink"
        >
          {site.handle}
        </a>
        <span>© {new Date().getFullYear()} RBX.AI</span>
      </div>
    </footer>
  );
}
