import { Lines } from "@/components/Lines";
import type { GalleryItem } from "@/lib/types";

export function GalleryWall({ items, graffiti }: { items: GalleryItem[]; graffiti: string }) {
  return (
    <section className="gallery">
      {items.map((item, index) => (
        <figure key={`${item.image.url}-${index}`} className="gallery-item">
          <img src={item.image.url} alt={item.image.alt} loading="lazy" />
          <figcaption>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.caption}
          </figcaption>
        </figure>
      ))}
      <p className="gallery-graffiti" aria-hidden="true">
        <Lines text={graffiti} />
      </p>
    </section>
  );
}
