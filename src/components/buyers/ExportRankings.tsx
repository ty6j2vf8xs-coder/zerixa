const rankings = [
  { metric: "Cement export volume (2024)", turkiye: "#4 globally", china: "#1 globally" },
  { metric: "Avg. lead time to MENA", turkiye: "12–18 days", china: "28–35 days" },
  { metric: "EU customs familiarity", turkiye: "Customs Union member", china: "Third-country tariffs" },
  { metric: "Steel rebar compliance", turkiye: "CE + TSE certified", china: "Mill-dependent" },
];

export default function ExportRankings() {
  return (
    <section id="export-rankings" className="border-t border-border bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          Export rankings
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Türkiye by the numbers — vs China
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Buyers comparing sourcing hubs use export rankings to weigh proximity,
          compliance, and delivery speed. Here is how Türkiye stacks up against China
          for construction materials procurement.
        </p>

        <div className="mt-12 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-elevated">
              <tr>
                <th className="px-6 py-4 font-semibold">Metric</th>
                <th className="px-6 py-4 font-semibold text-accent">Türkiye</th>
                <th className="px-6 py-4 font-semibold">China</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((row) => (
                <tr key={row.metric} className="border-t border-border">
                  <td className="px-6 py-4 text-muted">{row.metric}</td>
                  <td className="px-6 py-4 font-medium">{row.turkiye}</td>
                  <td className="px-6 py-4">{row.china}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
