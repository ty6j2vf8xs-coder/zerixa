import Link from "next/link";

const trustPoints = [
  {
    title: "Escrow protection",
    description:
      "Payments held securely until delivery is confirmed. Both parties protected.",
    icon: "🔒",
  },
  {
    title: "Quality inspection",
    description:
      "Pre-shipment inspection available. Products checked before they leave Türkiye.",
    icon: "✅",
  },
  {
    title: "EN, CE & ISO certified",
    description:
      "Major Turkish manufacturers produce to European Standards (EN), CE marking, and ISO 9001 — verified before every order.",
    icon: "📜",
    link: "/guides/european-standards-en-ce-iso-turkiye",
  },
  {
    title: "Dispute resolution",
    description:
      "Dedicated support for any issues. Mediation and refund policies in place.",
    icon: "⚖️",
  },
];

export default function BuyerTrust() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Trust & Security
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Import with{" "}
            <span className="text-gradient">confidence</span>
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Importing from a new country carries risk. We reduce that risk with
            verified suppliers, secure payments, and full documentation.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <div className="text-3xl">{point.icon}</div>
              <h3 className="mt-4 font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {point.description}
              </p>
              {"link" in point && point.link && (
                <Link
                  href={point.link}
                  className="mt-3 inline-block text-xs font-medium text-accent hover:text-accent-light transition-colors"
                >
                  Learn more →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
