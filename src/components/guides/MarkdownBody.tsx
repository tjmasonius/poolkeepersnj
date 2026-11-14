import Link from "next/link";
import type { Block, Inline } from "@/lib/markdown";

function InlineRun({ inlines }: { inlines: Inline[] }) {
  return (
    <>
      {inlines.map((part, index) => {
        if (part.type === "strong") {
          return (
            <strong key={index} className="font-semibold text-pool-950">
              {part.text}
            </strong>
          );
        }
        if (part.type === "link") {
          const className =
            "font-semibold text-pool-800 underline decoration-pool-300 underline-offset-2 hover:text-pool-600";
          if (part.href.startsWith("/")) {
            return (
              <Link key={index} href={part.href} className={className}>
                {part.text}
              </Link>
            );
          }
          return (
            <a
              key={index}
              href={part.href}
              className={className}
              rel="noopener noreferrer"
            >
              {part.text}
            </a>
          );
        }
        return <span key={index}>{part.text}</span>;
      })}
    </>
  );
}

export function MarkdownBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-3xl space-y-4 text-base leading-relaxed text-pool-900/85">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              id={block.id}
              className="scroll-mt-28 pt-6 text-2xl font-bold tracking-tight text-pool-950"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3
              key={index}
              id={block.id}
              className="scroll-mt-28 pt-2 text-lg font-semibold text-pool-950"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === "p") {
          return (
            <p key={index}>
              <InlineRun inlines={block.inlines} />
            </p>
          );
        }
        if (block.type === "ul" || block.type === "ol") {
          const List = block.type === "ul" ? "ul" : "ol";
          return (
            <List
              key={index}
              className={
                block.type === "ul"
                  ? "list-disc space-y-2 pl-5"
                  : "list-decimal space-y-2 pl-5"
              }
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <InlineRun inlines={item} />
                </li>
              ))}
            </List>
          );
        }
        if (block.type === "table") {
          return (
            <div key={index} className="overflow-x-auto rounded-2xl border border-pool-100">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead className="bg-pool-50 text-pool-950">
                  <tr>
                    {block.headers.map((header) => (
                      <th key={header} scope="col" className="px-4 py-3 font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-t border-pool-100">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-3 align-top">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return (
          <aside
            key={index}
            className="rounded-2xl border border-pool-200 bg-pool-50 px-4 py-3 text-sm text-pool-900"
          >
            <InlineRun inlines={block.inlines} />
          </aside>
        );
      })}
    </div>
  );
}
