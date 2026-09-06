"use client";

import { site } from "@/lib/config";
import { Instagram, TikTok, Facebook, YouTube } from "./Icons";
import { trackEvent } from "@/lib/analytics";

// Single place that turns lib/config.ts's `site.social` into rendered
// icons. A channel that's still `null` (TikTok/Facebook/YouTube, until
// Bogdan sends the real URLs) simply never renders — never a dead link,
// never a placeholder "#". Add a real URL in lib/config.ts and it appears
// everywhere this component is used (header, footer, founder section)
// with no other change needed.
const CHANNELS = [
  { key: "instagram", url: site.social.instagram, label: "Instagram", Icon: Instagram },
  { key: "tiktok", url: site.social.tiktok, label: "TikTok", Icon: TikTok },
  { key: "facebook", url: site.social.facebook, label: "Facebook", Icon: Facebook },
  { key: "youtube", url: site.social.youtube, label: "YouTube", Icon: YouTube },
] as const;

export default function SocialLinks({
  className = "",
  iconClassName = "",
  from,
}: {
  className?: string;
  iconClassName?: string;
  from: string;
}) {
  const channels = CHANNELS.filter((c) => !!c.url);
  if (!channels.length) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {channels.map(({ key, url, label, Icon }) => (
        <a
          key={key}
          href={url!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          onClick={() => trackEvent("social_outbound_click", { from, channel: key })}
          className={`grid h-9 w-9 place-items-center rounded-full border border-line text-faint transition-colors hover:border-white/35 hover:text-ink ${iconClassName}`}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
