type Value = { number: string; title: string; copy: string };

export function AcademyValues({ values }: { values: Value[] }) {
  return (
    <section className="academy-values">
      <h2>House rules</h2>
      <div>
        {values.map((value) => (
          <article key={value.number}>
            <span>{value.number}</span>
            <h3>{value.title}</h3>
            <p>{value.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
