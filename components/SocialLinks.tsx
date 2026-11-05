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

export function SocialLinks({ links, className }: { links: SocialLink[]; className?: string }) {
  if (!links.length) return null;
  return (
    <ul className={className ? `social-links ${className}` : "social-links"}>
      {links.map((link) => (
        <li key={link.url}>
          <a href={link.url} target="_blank" rel="noreferrer me">
            {socialLabel(link)}
          </a>
        </li>
      ))}
    </ul>
  );
}
