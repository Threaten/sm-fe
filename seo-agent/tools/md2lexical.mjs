#!/usr/bin/env node
// Converts simple Markdown into the Lexical JSON that Payload's rich text field stores.
// Supports: ## / ### headings, paragraphs, "- " and "1. " lists, **bold**, *italic*, [text](url), > quotes.
// Usage: node md2lexical.mjs article.md > content.json
import fs from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("usage: node md2lexical.mjs <file.md>");
  process.exit(2);
}
const md = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");

const base = { direction: "ltr", format: "", indent: 0, version: 1 };
const text = (value, format = 0) => ({ type: "text", text: value, format, detail: 0, mode: "normal", style: "", version: 1 });

/** Inline Markdown → Lexical text and link nodes. */
function inline(source) {
  const nodes = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  for (const match of source.matchAll(pattern)) {
    if (match.index > last) nodes.push(text(source.slice(last, match.index)));
    if (match[1]) {
      nodes.push({
        ...base,
        type: "link",
        version: 3,
        fields: { linkType: "custom", url: match[2], newTab: /^https?:\/\//.test(match[2]) && !match[2].includes("skillandmix.com") },
        children: [text(match[1])],
      });
    } else if (match[3]) nodes.push(text(match[3], 1));
    else if (match[4]) nodes.push(text(match[4], 2));
    last = match.index + match[0].length;
  }
  if (last < source.length) nodes.push(text(source.slice(last)));
  return nodes;
}

const children = [];
let list = null;
const flushList = () => {
  if (list) children.push(list);
  list = null;
};

for (const raw of md.split("\n")) {
  const line = raw.trim();
  if (!line) {
    flushList();
    continue;
  }
  const heading = line.match(/^(#{2,4})\s+(.*)$/);
  const bullet = line.match(/^[-*+]\s+(.*)$/);
  const numbered = line.match(/^\d+[.)]\s+(.*)$/);
  if (heading) {
    flushList();
    children.push({ ...base, type: "heading", tag: `h${heading[1].length}`, children: inline(heading[2]) });
  } else if (bullet || numbered) {
    const listType = bullet ? "bullet" : "number";
    if (!list || list.listType !== listType) {
      flushList();
      list = { ...base, type: "list", listType, tag: bullet ? "ul" : "ol", start: 1, children: [] };
    }
    list.children.push({ ...base, type: "listitem", value: list.children.length + 1, children: inline((bullet ?? numbered)[1]) });
  } else if (line.startsWith(">")) {
    flushList();
    children.push({ ...base, type: "quote", children: inline(line.replace(/^>\s*/, "")) });
  } else if (/^#\s/.test(line)) {
    // A single "#" is the post title, which Payload stores separately.
    flushList();
  } else {
    flushList();
    children.push({ ...base, type: "paragraph", textFormat: 0, children: inline(line) });
  }
}
flushList();

process.stdout.write(JSON.stringify({ root: { ...base, type: "root", children } }));
