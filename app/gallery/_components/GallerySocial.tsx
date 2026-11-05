import { SocialLinks } from "@/components/SocialLinks";
import type { SocialLink } from "@/lib/types";

export function GallerySocial({ copy, links }: { copy: string; links: SocialLink[] }) {
  if (!links.length) return null;
  return (
    <section className="gallery-social">
      <p>{copy}</p>
      <SocialLinks links={links} />
    </section>
  );
}
