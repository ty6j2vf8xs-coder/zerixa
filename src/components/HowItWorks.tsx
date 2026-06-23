const steps = [
  {
    step: "01",
    title: "Firma bilgilerinizi girin",
    description:
      "Ürün kataloğu, fotoğraf veya broşür gerekmez. Sektörünüz, üretim kapasiteniz, hedef pazarlarınız ve iletişim bilgileriniz yeterli.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "AI profilinizi oluşturur",
    description:
      "Yapay zeka, firma verilerinizden akıllı bir ihracat profili üretir. Ürün gamınız, teknik özellikler ve rekabet avantajlarınız otomatik yapılandırılır.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Doğrulanmış alıcılarla eşleşin",
    description:
      "AI, inşaat malzemeleri taleplerini firma profilinizle karşılaştırır. Sadece yüksek uyumlu, doğrulanmış alıcılar size yönlendirilir.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Satış yapın, komisyon ödeyin",
    description:
      "Anlaşma sağlandığında Zerixa aracılık komisyonu devreye girer. Satış olmazsa hiçbir ücret ödemezsiniz. Risk sıfır.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 0v-.75A.75.75 0 003 13.5h-.375M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="nasil-calisir" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Nasıl Çalışır
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            5 dakikada kayıt,{" "}
            <span className="text-gradient">sıfır evrak yükü</span>
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Geleneksel B2B platformların aksine Zerixa&apos;da katalog hazırlamak,
            ürün fotoğrafı çekmek veya aylık üyelik ödemek zorunda değilsiniz.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {steps.map((item) => (
            <div
              key={item.step}
              className="group rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-accent/30"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  {item.icon}
                </div>
                <div>
                  <span className="text-xs font-mono text-accent/70">
                    ADIM {item.step}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
