/** schema.org data for search engines; empty entries are left out. Built in lib/structuredData.ts. */
export function JsonLd({ items }: { items: (Record<string, unknown> | null)[] }) {
  const graph = items.filter(Boolean);
  if (!graph.length) return null;
  // "<" is escaped so CMS text can never close the script tag.
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
