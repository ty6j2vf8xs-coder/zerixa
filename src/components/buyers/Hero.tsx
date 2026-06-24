export default function BuyerHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute top-1/4 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent-light">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Leading global export hub · Structural · Finishes · Raw materials
        </div>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl md:leading-[1.1]">
          Source construction materials{" "}
          <span className="text-gradient">from Türkiye.</span>
          <br />
          One quote. One contract. One delivery.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl leading-relaxed">
          Türkiye is among the world&apos;s leading exporters of construction
          materials — superior structural elements, fine finishes, and raw
          materials at competitive prices. Describe what you need; Zerixa sources
          from verified manufacturers and handles everything in one quote.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#request-quote"
            className="glow-amber inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-base font-semibold text-background transition-all hover:bg-accent-light"
          >
            Get a Free Quote
          </a>
          <a
            href="#ai"
            className="inline-flex items-center justify-center rounded-xl border border-border px-8 py-4 text-base font-medium transition-colors hover:border-accent/40 hover:text-accent-light"
          >
            See AI in Action
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-border pt-10 md:grid-cols-4">
          {[
            { value: "24h", label: "Quote turnaround" },
            { value: "1", label: "Point of contact" },
            { value: "EXW–DDP", label: "Delivery options" },
            { value: "T/T", label: "Secure bank transfer" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-accent-light md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
