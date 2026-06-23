const products = [
  "Çimento & Beton",
  "Demir & Çelik",
  "Seramik & Fayans",
  "Yalıtım Malzemeleri",
  "Boru & Fittings",
  "Cam & Alüminyum",
  "Prefabrik Yapılar",
  "İnşaat Kimyasalları",
];

const benefits = [
  {
    title: "Katalog yüklemeyin",
    description:
      "Ürün fotoğrafı, PDF katalog veya teknik çizim gerekmez. Firma bilgileriniz AI tarafından yapılandırılır.",
  },
  {
    title: "Sahte lead yok",
    description:
      "Her alıcı doğrulanır. AI, şüpheli talepleri filtreler. Zamanınızı gerçek fırsatlara harcayın.",
  },
  {
    title: "Üyelik ücreti yok",
    description:
      "Aylık paket, T-Coin veya gizli ücret yok. Satış gerçekleşince komisyon ödersiniz — o kadar.",
  },
  {
    title: "AI yanıt asistanı",
    description:
      "Gelen taleplere otomatik özet ve yanıt taslağı. İngilizce, Arapça, Fransızca — dil bariyeri yok.",
  },
];

export default function ForExporters() {
  return (
    <section id="ihracatcilar" className="border-t border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              İhracatçılar İçin
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Siz üretin,{" "}
              <span className="text-gradient">AI satışı halleder</span>
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              İnşaat malzemeleri sektöründe ihracat yapıyorsanız Zerixa sizin
              için tasarlandı. Çimento, demir, seramik, yalıtım — hangi alt
              sektörde olursanız olun, AI sizi doğru alıcıyla buluşturur.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {products.map((product) => (
                <span
                  key={product}
                  className="rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs text-muted"
                >
                  {product}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-border bg-background p-6"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20">
                    <svg
                      className="h-3 w-3 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-muted leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
