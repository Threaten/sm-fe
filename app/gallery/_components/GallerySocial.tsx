import type { SiteSettings } from "@/lib/types";

export function GallerySocial({ copy, social }: { copy: string; social: SiteSettings["social"] }) {
  return (
    <section className="gallery-social">
      <p>{copy}</p>
      <a href={social.url} target="_blank" rel="noreferrer">
        {social.handle}
      </a>
    </section>
  );
}
