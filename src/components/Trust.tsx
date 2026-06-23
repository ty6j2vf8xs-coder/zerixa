const trustPoints = [
  {
    title: "Firma doğrulama",
    description:
      "Vergi levhası, ticaret sicil ve üretim belgeleri kontrol edilir. Sahte profil riski minimize edilir.",
    icon: "🛡️",
  },
  {
    title: "AI sahte lead tespiti",
    description:
      "Bot hesaplar, kopyala-yapıştır mesajlar ve şüpheli talepler otomatik filtrelenir.",
    icon: "🤖",
  },
  {
    title: "Uyum skoru",
    description:
      "Her eşleşme 0–100 arası skorlanır. Düşük uyumlu talepler size gösterilmez.",
    icon: "📊",
  },
  {
    title: "Şeffaf işlem",
    description:
      "Teklif, anlaşma ve ödeme süreçleri kayıt altında. Komisyon yalnızca başarılı satışta.",
    icon: "📋",
  },
];

export default function Trust() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Güven
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Güvenilir sistem,{" "}
            <span className="text-gradient">şeffaf süreç</span>
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            B2B platformlardaki en büyük sorun güven eksikliği. Zerixa bunu
            mimarinin merkezine koyar — doğrulama, AI filtreleme ve escrow
            ile.
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
