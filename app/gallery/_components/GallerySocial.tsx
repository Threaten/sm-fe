type GallerySocialContent = { copy: string; handle: string; href: string };

export function GallerySocial({ content }: { content: GallerySocialContent }) {
  return (
    <section className="gallery-social">
      <p>{content.copy}</p>
      <a href={content.href} target="_blank" rel="noreferrer">
        {content.handle}
      </a>
    </section>
  );
}
