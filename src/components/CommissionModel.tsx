const comparison = [
  {
    feature: "Aylık üyelik ücreti",
    traditional: "₺5.000 – ₺20.000/yıl",
    zerixa: "0 ₺",
  },
  {
    feature: "Katalog / fotoğraf zorunluluğu",
    traditional: "Evet, detaylı profil gerekli",
    zerixa: "Hayır, AI oluşturur",
  },
  {
    feature: "Ödeme zamanı",
    traditional: "Üyelik anında",
    zerixa: "Satış gerçekleşince",
  },
  {
    feature: "Sahte lead riski",
    traditional: "Yüksek",
    zerixa: "AI filtreleme + doğrulama",
  },
  {
    feature: "Satış olmazsa maliyet",
    traditional: "Üyelik ücreti kayıp",
    zerixa: "Sıfır maliyet",
  },
];

export default function CommissionModel() {
  return (
    <section id="komisyon" className="border-t border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Komisyon Modeli
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Başarıya dayalı{" "}
            <span className="text-gradient">ortaklık</span>
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Zerixa ancak siz kazandığınızda kazanır. Gizli ücret yok, yıllık
            paket yok, cayma hakkı derdi yok.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center lg:col-span-1">
            <div className="text-5xl font-bold text-gradient">%X</div>
            <p className="mt-2 text-sm text-muted">satış komisyonu</p>
            <p className="mt-6 text-sm text-muted leading-relaxed">
              Anlaşma tutarı üzerinden tek seferlik komisyon. Oran, işlem
              büyüklüğüne göre şeffaf şekilde belirlenir.
            </p>
          </div>

          <div className="lg:col-span-2 rounded-2xl border border-border bg-background overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-left font-medium text-muted">
                    Özellik
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-muted">
                    Geleneksel Platform
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-accent">
                    Zerixa
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i < comparison.length - 1 ? "border-b border-border/50" : ""}
                  >
                    <td className="px-6 py-4 font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-muted">{row.traditional}</td>
                    <td className="px-6 py-4 text-accent-light font-medium">
                      {row.zerixa}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Escrow güvencesi",
              description:
                "Ödeme, anlaşma tamamlanana kadar güvenli hesapta tutulur. Taraflar korunur.",
            },
            {
              title: "Şeffaf sözleşme",
              description:
                "Komisyon oranı ve koşulları kayıt öncesi açıkça paylaşılır. Sürpriz yok.",
            },
            {
              title: "İşlem takibi",
              description:
                "Tekliften teslimata tüm süreç platformda izlenir. Anlaşmazlık durumunda arabuluculuk.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border p-6 text-center"
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
