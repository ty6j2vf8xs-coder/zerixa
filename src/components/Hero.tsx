export default function Hero() {
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
          İnşaat Malzemeleri Sektörü — Erken Erişim Açık
        </div>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl md:leading-[1.1]">
          Katalog yok.{" "}
          <span className="text-gradient">Üyelik yok.</span>
          <br />
          Sadece gerçek alıcılar.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl leading-relaxed">
          Zerixa AI, inşaat malzemeleri ihracatçınızı doğrulanmış alıcılarla
          otomatik eşleştirir. Ürün fotoğrafı yüklemeyin, katalog hazırlamayın —
          firma bilginizi girin, gerisini AI halleder.{" "}
          <strong className="text-foreground font-medium">
            Satış olunca komisyon ödersiniz.
          </strong>
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#bekleme-listesi"
            className="glow-amber inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-base font-semibold text-background transition-all hover:bg-accent-light"
          >
            Ücretsiz Erken Erişim Al
          </a>
          <a
            href="#nasil-calisir"
            className="inline-flex items-center justify-center rounded-xl border border-border px-8 py-4 text-base font-medium transition-colors hover:border-accent/40 hover:text-accent-light"
          >
            Nasıl Çalışır?
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-border pt-10 md:grid-cols-4">
          {[
            { value: "0 ₺", label: "Üyelik ücreti" },
            { value: "5 dk", label: "Kayıt süresi" },
            { value: "AI", label: "Otomatik eşleştirme" },
            { value: "%X", label: "Sadece satışta komisyon" },
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
