import Link from "next/link";

const guides = [
  {
    title: "How to request a quote from Türkiye",
    summary: "Describe your materials, destination port, and Incoterm — Zerixa handles supplier matching.",
  },
  {
    title: "Türkiye vs China for cement & steel",
    summary: "Compare lead times, certifications, and landed cost when choosing an export hub.",
  },
  {
    title: "Understanding Incoterms (EXW, FOB, CIF)",
    summary: "Pick the right delivery terms for your procurement team and freight forwarder.",
  },
];

export default function GuidesPage() {
  return (
    <main className="flex-1 bg-background px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Back to Zerixa
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">Procurement guides</h1>
        <p className="mt-3 text-muted">
          Practical guides for buyers sourcing construction materials from Türkiye.
        </p>
        <ul className="mt-10 space-y-6">
          {guides.map((guide) => (
            <li
              key={guide.title}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <h2 className="text-lg font-semibold">{guide.title}</h2>
              <p className="mt-2 text-sm text-muted">{guide.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
