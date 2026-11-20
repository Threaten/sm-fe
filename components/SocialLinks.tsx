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

/** The platform name, else the editor's label, else the site's address. Tells links apart even when every label is the account name. */
const platformLabel = (link: SocialLink) =>
  PLATFORM_NAMES[link.platform] || link.label?.trim() || hostName(link.url);

/** Screen-reader name: "Facebook: Skill & Mix Academy", or just one of the two when they match or one is missing. */
const accessibleName = (link: SocialLink) => {
  const platform = platformLabel(link);
  const label = socialLabel(link);
  return platform === label ? label : `${platform}: ${label}`;
};

/**
 * `icons` shows each platform's mark in the current text colour, named for screen readers by
 * platform and label. Platforms without a mark (LinkedIn, Other) show their platform name.
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
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer me"
                aria-label={accessibleName(link)}
                title={accessibleName(link)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d={path} />
                </svg>
              </a>
            ) : icons ? (
              <a href={link.url} target="_blank" rel="noreferrer me" aria-label={accessibleName(link)}>
                {platformLabel(link)}
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
