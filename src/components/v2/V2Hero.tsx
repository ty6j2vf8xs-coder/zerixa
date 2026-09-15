import QuoteForm from "@/components/v2/QuoteForm";
import { COMPANY, telHref, isPlaceholder } from "@/lib/v2-company";

export default function V2Hero() {
  const identityReady =
    !isPlaceholder(COMPANY.legalName) &&
    !isPlaceholder(COMPANY.city) &&
    !isPlaceholder(COMPANY.phone);

  return (
    <section id="request-quote" className="border-b border-border">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-14 lg:py-20">
        <div className="lg:pt-6">
          <h1 className="text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]">
            Tiles, sanitaryware and profiles
            <br className="hidden sm:block" /> from Turkish factories.
          </h1>
          <p className="mt-4 text-lg text-accent-light">
            One container. One invoice. One shipment.
          </p>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
            Send us your list or your BOQ. You get back a CIF price, the lead time,
            and the names of the factories we quoted — most requests are answered
            within one working day.
          </p>

          {identityReady && (
            <div className="mt-8 rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm">
              <p className="font-medium">{COMPANY.legalName}</p>
              <p className="mt-0.5 text-muted">
                {COMPANY.city}, Türkiye ·{" "}
                <a href={telHref()} className="hover:text-accent-light">
                  {COMPANY.phone}
                </a>
              </p>
            </div>
          )}
        </div>

        <div className="lg:pt-2">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
