export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-pool-950">
        Frequently asked questions
      </h2>
      <div className="mt-6 space-y-6">
        {items.map((item) => (
          <article key={item.q} className="rounded-2xl border border-pool-100 p-5">
            <h3 className="text-lg font-semibold text-pool-950">{item.q}</h3>
            <p className="mt-2 text-sm leading-relaxed text-pool-900/80 md:text-base">{item.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
