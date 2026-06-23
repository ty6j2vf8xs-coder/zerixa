import Link from "next/link";
import {
  EXPORT_CATEGORY_LABELS,
  EXPORT_COMPARISON_FOOTNOTE,
  EXPORT_RANKING_AI_SUMMARY,
  EXPORT_RANKINGS,
} from "@/lib/export-rankings";

type Props = {
  compact?: boolean;
};

export default function ExportRankings({ compact = false }: Props) {
  return (
    <section
      id="export-rankings"
      className={
        compact
          ? "rounded-xl border border-border bg-surface p-6"
          : "border-t border-border bg-background py-24"
      }
    >
      <div className={compact ? "" : "mx-auto max-w-6xl px-6"}>
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          Export rankings
        </p>
        <h2
          className={`mt-3 font-bold tracking-tight ${compact ? "text-2xl" : "text-3xl md:text-4xl"}`}
        >
          Türkiye by the numbers — vs China
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          {EXPORT_RANKING_AI_SUMMARY}
        </p>

        <div className="mt-10 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-surface-elevated">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Global rank</th>
                <th className="px-4 py-3 font-semibold">Route example</th>
                <th className="px-4 py-3 font-semibold text-accent">Türkiye transit</th>
                <th className="px-4 py-3 font-semibold">China transit</th>
                <th className="px-4 py-3 font-semibold">Freight vs China</th>
              </tr>
            </thead>
            <tbody>
              {EXPORT_RANKINGS.map((row) => (
                <tr key={row.product} className="border-t border-border">
                  <td className="px-4 py-3">
                    {row.productSlug ? (
                      <Link
                        href={`/products/${row.productSlug}`}
                        className="font-medium hover:text-accent-light transition-colors"
                      >
                        {row.product}
                      </Link>
                    ) : (
                      <span className="font-medium">{row.product}</span>
                    )}
                    <span className="mt-1 block text-xs text-muted">
                      {EXPORT_CATEGORY_LABELS[row.category]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">{row.globalRank}</td>
                  <td className="px-4 py-3 text-muted">{row.vsChina.exampleRoute}</td>
                  <td className="px-4 py-3 font-medium">{row.vsChina.transitTurkiye}</td>
                  <td className="px-4 py-3">{row.vsChina.transitChina}</td>
                  <td className="px-4 py-3 text-accent-light">
                    {row.vsChina.freightAdvantage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-muted">{EXPORT_COMPARISON_FOOTNOTE}</p>

        {!compact && (
          <Link
            href="/guides/turkiye-leading-construction-materials-exporter"
            className="mt-8 inline-flex text-sm font-medium text-accent hover:text-accent-light transition-colors"
          >
            Read the full export guide →
          </Link>
        )}
      </div>
    </section>
  );
}
