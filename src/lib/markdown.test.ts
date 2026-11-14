import { describe, expect, it } from "vitest";
import { countWords, extractFaqs, parseInline, parseMarkdown } from "./markdown";

describe("markdown", () => {
  it("parses headings, lists, tables, callouts, and safe links", () => {
    const blocks = parseMarkdown(`
## Chemistry

A **range** and a [guide](/learn/cya-stabilizer).

- First item
- Second with [tools](/tools/chlorine)

1. Step one
2. Step two

| Test | Range |
| --- | --- |
| pH | 7.4-7.6 |

> Check the label.

### Detail

javascript:[nope](javascript:alert(1)) stays text.
`);

    expect(blocks.map((block) => block.type)).toEqual([
      "h2",
      "p",
      "ul",
      "ol",
      "table",
      "callout",
      "h3",
      "p",
    ]);
    const paragraph = blocks[1];
    if (paragraph.type !== "p") throw new Error("expected paragraph");
    expect(paragraph.inlines.some((part) => part.type === "strong")).toBe(true);
    expect(paragraph.inlines.some((part) => part.type === "link")).toBe(true);

    const unsafe = parseInline("[nope](javascript:alert(1))");
    expect(unsafe.every((part) => part.type !== "link")).toBe(true);
  });

  it("extracts FAQ pairs only from the FAQ section", () => {
    const blocks = parseMarkdown(`
## Before

### Not a question

This is body copy.

## Frequently asked questions

### How often do I test?
Two or three times a week in July.

### What about salt?
Monthly, and after a big rain.

## After

### Ignored
Not an FAQ.
`);
    const faqs = extractFaqs(blocks);
    expect(faqs).toHaveLength(2);
    expect(faqs[0].q).toBe("How often do I test?");
    expect(faqs[0].a).toContain("July");
    expect(faqs[1].a).toContain("rain");
  });

  it("counts words without markdown markers", () => {
    expect(countWords("One [two](/learn/x) **three**.")).toBe(3);
  });
});
