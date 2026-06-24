export default function ForBuyers() {
  return (
    <section id="alicilar" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl border border-border bg-surface p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-muted font-mono">
                  zerixa.ai/match
                </span>
              </div>

              <div className="space-y-4 font-mono text-sm">
                <div className="rounded-lg bg-background p-4">
                  <p className="text-accent text-xs mb-2">ALICI TALEBİ</p>
                  <p className="text-foreground">
                    &quot;500 ton çimento, CEM I 42.5R, FOB Mersin,
                    ödeme T/T banka havalesi&quot;
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    📍 Libya · Doğrulanmış · Skor: 94/100
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-2 text-accent text-xs">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    AI eşleştirme yapılıyor...
                  </div>
                </div>

                <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
                  <p className="text-accent text-xs mb-2">EŞLEŞME BULUNDU</p>
                  <p className="text-foreground font-semibold">
                    Anadolu Çimento A.Ş.
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Kapasite: 2M ton/yıl · ISO 9001 · %97 uyum
                  </p>
                  <button
                    type="button"
                    className="mt-3 w-full rounded-lg bg-accent py-2 text-xs font-semibold text-background"
                  >
                    İletişime Geç
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Alıcılar İçin
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Doğrulanmış Türk{" "}
              <span className="text-gradient">tedarikçiler</span>
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              İnşaat malzemesi tedarik ediyorsanız Zerixa&apos;ya talebinizi
              iletin. AI, binlerce Türk üretici arasından kapasite, sertifika ve
              ürün uyumuna göre en iyi eşleşmeyi bulur.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Ücretsiz talep yayınlama",
                "Doğrulanmış ihracatçı profilleri",
                "Teklif karşılaştırma",
                "Güvenli iletişim kanalı",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent text-xs">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
