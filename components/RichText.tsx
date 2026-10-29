import Link from "next/link";
import type { ReactNode } from "react";
import type { RichText as RichTextValue, RichTextNode } from "@/lib/types";

/* Lexical stores text styles as bit flags. */
const BOLD = 1;
const ITALIC = 2;
const STRIKETHROUGH = 4;
const UNDERLINE = 8;

/** Website paths for documents an editor links to inside the CMS. */
const DOCUMENT_PATHS: Record<string, string> = { news: "/news", courses: "/courses", staff: "/staffs" };

function linkHref(fields: RichTextNode["fields"]) {
  if (fields?.linkType !== "internal") return fields?.url ?? "#";
  const doc = fields.doc;
  const slug = doc?.value && typeof doc.value === "object" ? (doc.value as { slug?: string }).slug : undefined;
  const base = doc?.relationTo ? DOCUMENT_PATHS[doc.relationTo] : undefined;
  return base && slug ? `${base}/${slug}` : "#";
}

function renderText(node: RichTextNode, key: number) {
  const format = typeof node.format === "number" ? node.format : 0;
  let text: ReactNode = node.text ?? "";
  if (format & BOLD) text = <strong>{text}</strong>;
  if (format & ITALIC) text = <em>{text}</em>;
  if (format & STRIKETHROUGH) text = <s>{text}</s>;
  if (format & UNDERLINE) text = <u>{text}</u>;
  return <span key={key}>{text}</span>;
}

function renderNodes(nodes: RichTextNode[] = []): ReactNode[] {
  return nodes.map((node, key) => {
    const children = renderNodes(node.children);
    switch (node.type) {
      case "text":
        return renderText(node, key);
      case "linebreak":
        return <br key={key} />;
      case "tab":
        return " ";
      case "paragraph":
        return children.length ? <p key={key}>{children}</p> : null;
      case "heading": {
        // The page title is the only h1.
        const Tag = (node.tag === "h1" ? "h2" : node.tag ?? "h2") as "h2" | "h3" | "h4" | "h5" | "h6";
        return <Tag key={key}>{children}</Tag>;
      }
      case "list":
        return node.listType === "number" ? <ol key={key}>{children}</ol> : <ul key={key}>{children}</ul>;
      case "listitem":
        return <li key={key}>{children}</li>;
      case "quote":
        return <blockquote key={key}>{children}</blockquote>;
      case "horizontalrule":
        return <hr key={key} />;
      case "upload":
        return node.image ? (
          <figure key={key}>
            <img src={node.image.url} alt={node.image.alt} loading="lazy" />
          </figure>
        ) : null;
      case "link":
      case "autolink": {
        const href = linkHref(node.fields);
        return href.startsWith("/") ? (
          <Link key={key} href={href}>
            {children}
          </Link>
        ) : (
          <a key={key} href={href} {...(node.fields?.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {children}
          </a>
        );
      }
      default:
        return children.length ? <span key={key}>{children}</span> : null;
    }
  });
}

/** Renders a Payload Lexical field. Only the editor tools enabled in sm-be/src/collections/News.ts are handled. */
export function RichText({ content, className }: { content: RichTextValue | undefined; className?: string }) {
  if (!content?.root) return null;
  return <div className={className}>{renderNodes(content.root.children)}</div>;
}
