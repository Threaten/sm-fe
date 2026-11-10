// Editors type plain text in the CMS: lines starting with "-", "•", "*" or "+"
// become a bulleted list; other lines stay as paragraphs, in the order written.
const BULLET = /^\s*[-•*+]\s*/;

type Block = { type: "p"; text: string } | { type: "ul"; items: string[] };

function toBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    if (BULLET.test(line)) {
      const item = line.replace(BULLET, "");
      if (!item) continue;
      const last = blocks[blocks.length - 1];
      if (last?.type === "ul") last.items.push(item);
      else blocks.push({ type: "ul", items: [item] });
    } else {
      blocks.push({ type: "p", text: line });
    }
  }
  return blocks;
}

/** Plain CMS text rendered as paragraphs and bullet lists. */
export function TextBlocks({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className ? `text-blocks ${className}` : "text-blocks"}>
      {toBlocks(text).map((block, i) =>
        block.type === "ul" ? (
          <ul key={i}>
            {block.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{block.text}</p>
        ),
      )}
    </div>
  );
}
