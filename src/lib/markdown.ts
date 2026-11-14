export type Inline =
  | { type: "text"; text: string }
  | { type: "strong"; text: string }
  | { type: "link"; href: string; text: string };

export type Block =
  | { type: "p"; inlines: Inline[] }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "ul"; items: Inline[][] }
  | { type: "ol"; items: Inline[][] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "callout"; inlines: Inline[] };

export type FaqItem = { q: string; a: string };

const LINK_OR_STRONG = /(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)\s]+\))/g;

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isSafeHref(href: string): boolean {
  return href.startsWith("/") || href.startsWith("https://");
}

export function parseInline(source: string): Inline[] {
  const inlines: Inline[] = [];
  let last = 0;
  for (const match of source.matchAll(LINK_OR_STRONG)) {
    const index = match.index ?? 0;
    if (index > last) {
      inlines.push({ type: "text", text: source.slice(last, index) });
    }
    const token = match[0];
    if (token.startsWith("**")) {
      inlines.push({ type: "strong", text: token.slice(2, -2) });
    } else {
      const parsed = token.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (parsed && isSafeHref(parsed[2])) {
        inlines.push({ type: "link", href: parsed[2], text: parsed[1] });
      } else {
        inlines.push({ type: "text", text: token });
      }
    }
    last = index + token.length;
  }
  if (last < source.length) {
    inlines.push({ type: "text", text: source.slice(last) });
  }
  return inlines.filter((part) => part.type !== "text" || part.text.length > 0);
}

export function inlineToText(inlines: Inline[]): string {
  return inlines
    .map((part) => (part.type === "link" ? part.text : part.text))
    .join("");
}

function isTableSeparator(line: string): boolean {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function splitTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

export function parseMarkdown(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;

  const pushParagraph = (text: string) => {
    const trimmed = text.trim();
    if (trimmed) blocks.push({ type: "p", inlines: parseInline(trimmed) });
  };

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      blocks.push({ type: "h2", id: slugifyHeading(text), text });
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      const text = line.slice(4).trim();
      blocks.push({ type: "h3", id: slugifyHeading(text), text });
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].startsWith("> ")) {
        quote.push(lines[index].slice(2).trim());
        index += 1;
      }
      blocks.push({ type: "callout", inlines: parseInline(quote.join(" ")) });
      continue;
    }

    if (/^\s*[-*] /.test(line)) {
      const items: Inline[][] = [];
      while (index < lines.length && /^\s*[-*] /.test(lines[index])) {
        items.push(parseInline(lines[index].replace(/^\s*[-*] /, "").trim()));
        index += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\s*\d+\. /.test(line)) {
      const items: Inline[][] = [];
      while (index < lines.length && /^\s*\d+\. /.test(lines[index])) {
        items.push(parseInline(lines[index].replace(/^\s*\d+\. /, "").trim()));
        index += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    if (line.includes("|") && index + 1 < lines.length && isTableSeparator(lines[index + 1])) {
      const headers = splitTableRow(line);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].startsWith("#") &&
      !lines[index].startsWith("> ") &&
      !/^\s*[-*] /.test(lines[index]) &&
      !/^\s*\d+\. /.test(lines[index])
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    pushParagraph(paragraph.join(" "));
  }

  return blocks;
}

export function extractFaqs(blocks: Block[]): FaqItem[] {
  const faqs: FaqItem[] = [];
  let inFaq = false;
  let current: { q: string; parts: string[] } | null = null;

  const flush = () => {
    if (!current) return;
    const answer = current.parts.join(" ").trim();
    if (current.q && answer) faqs.push({ q: current.q, a: answer });
    current = null;
  };

  for (const block of blocks) {
    if (block.type === "h2") {
      flush();
      inFaq = block.text.toLowerCase() === "frequently asked questions";
      continue;
    }
    if (!inFaq) continue;
    if (block.type === "h3") {
      flush();
      current = { q: block.text, parts: [] };
      continue;
    }
    if (!current) continue;
    if (block.type === "p" || block.type === "callout") {
      current.parts.push(inlineToText(block.inlines));
    } else if (block.type === "ul" || block.type === "ol") {
      current.parts.push(block.items.map((item) => inlineToText(item)).join("; "));
    }
  }
  flush();
  return faqs;
}

export function countWords(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, " $1 ")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[^A-Za-z0-9']+/g, " ")
    .trim();
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}
