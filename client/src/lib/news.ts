/* ==========================================================================
   News loader.
   Reads every markdown file in ../content/news at build time. No dependency:
   frontmatter and markdown are parsed here, and HTML is escaped before any
   inline formatting is applied.
   ========================================================================== */

export interface NewsPost {
  slug: string;
  title: string;
  /** ISO date string, e.g. "2026-01-15". */
  date: string;
  summary: string;
  /** Markdown body, already stripped of frontmatter. */
  body: string;
}

const files = import.meta.glob<string>("../content/news/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    // Strip surrounding quotes if the author used them.
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    if (key) meta[key] = value;
  }
  return { meta, body: raw.slice(match[0].length) };
}

export const NEWS_POSTS: NewsPost[] = Object.entries(files)
  .map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw);
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    return {
      slug,
      title: meta.title ?? slug,
      date: meta.date ?? "",
      summary: meta.summary ?? "",
      body: body.trim(),
    };
  })
  // Newest first.
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): NewsPost | undefined {
  return NEWS_POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/* ==========================================================================
   Minimal markdown → HTML.
   Escapes first, then applies formatting, so post content cannot inject HTML.
   Supports: h2/h3, bold, italics, inline code, links, unordered lists,
   paragraphs. That covers everything the placeholder post demonstrates.
   ========================================================================== */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inline(s: string): string {
  return escapeHtml(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g,
      '<a href="$2" rel="noopener noreferrer">$1</a>',
    );
}

export function renderMarkdown(md: string): string {
  const out: string[] = [];
  let listOpen = false;

  const closeList = () => {
    if (listOpen) {
      out.push("</ul>");
      listOpen = false;
    }
  };

  for (const block of md.split(/\r?\n\r?\n/)) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("### ")) {
      closeList();
      out.push(`<h3>${inline(trimmed.slice(4))}</h3>`);
    } else if (trimmed.startsWith("## ")) {
      closeList();
      out.push(`<h2>${inline(trimmed.slice(3))}</h2>`);
    } else if (/^[-*] /.test(trimmed)) {
      closeList();
      out.push("<ul>");
      listOpen = true;
      for (const line of trimmed.split(/\r?\n/)) {
        out.push(`<li>${inline(line.replace(/^[-*] /, ""))}</li>`);
      }
      closeList();
    } else {
      closeList();
      // Soft-wrap single newlines inside a paragraph.
      out.push(`<p>${inline(trimmed.replace(/\r?\n/g, " "))}</p>`);
    }
  }

  closeList();
  return out.join("\n");
}
