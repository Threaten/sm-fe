export function GalleryWall({
  items,
}: {
  items: { image: string; caption: string }[];
}) {
  return (
    <section className="gallery-wall">
      {items.map((item, index) => (
        <figure
          key={item.image}
          className={`gallery-item gallery-item-${index + 1}`}
        >
          <img src={item.image} alt={item.caption} />
          <figcaption>
            <span>0{index + 1}</span>
            {item.caption}
          </figcaption>
        </figure>
      ))}
      <p className="gallery-graffiti">
        proof of
        <br />
        practice
      </p>
    </section>
  );
}
