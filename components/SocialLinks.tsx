import { SOCIAL_ICON_PATHS } from "@/lib/socialIcons";
import type { SocialLink } from "@/lib/types";

/** Names for Site settings → Social links → Platform (sm-be/src/fields/socialPlatforms.ts). */
const PLATFORM_NAMES: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  zalo: "Zalo",
  threads: "Threads",
  x: "X",
  linkedin: "LinkedIn",
};

const hostName = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

/** The editor's label, else the platform name, else the site's address. */
export const socialLabel = (link: SocialLink) =>
  link.label?.trim() || PLATFORM_NAMES[link.platform] || hostName(link.url);

/**
 * `icons` shows each platform's mark in the current text colour, named for screen readers by its
 * label. Platforms without a mark (LinkedIn, Other) keep their text.
 */
export function SocialLinks({
  links,
  className,
  icons = false,
}: {
  links: SocialLink[];
  className?: string;
  icons?: boolean;
}) {
  if (!links.length) return null;
  return (
    <ul className={["social-links", icons && "social-links-icons", className].filter(Boolean).join(" ")}>
      {links.map((link) => {
        const label = socialLabel(link);
        const path = icons ? SOCIAL_ICON_PATHS[link.platform] : undefined;
        return (
          <li key={link.url}>
            {path ? (
              <a href={link.url} target="_blank" rel="noreferrer me" aria-label={label} title={label}>
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d={path} />
                </svg>
              </a>
            ) : (
              <a href={link.url} target="_blank" rel="noreferrer me">
                {label}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
