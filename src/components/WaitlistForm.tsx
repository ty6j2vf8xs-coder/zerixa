"use client";

import { useState } from "react";

type FormType = "exporter" | "buyer";

export default function WaitlistForm() {
  const [formType, setFormType] = useState<FormType>("exporter");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section id="bekleme-listesi" className="border-t border-border bg-surface py-24">
        <div className="mx-auto max-w-xl px-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-3xl">
            ✓
          </div>
          <h2 className="mt-6 text-2xl font-bold">Listeye eklendiniz!</h2>
          <p className="mt-3 text-muted">
            Erken erişim açıldığında size e-posta ile haber vereceğiz.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="bekleme-listesi" className="border-t border-border bg-surface py-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Erken Erişim
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            İlk 100 firmaya{" "}
            <span className="text-gradient">özel avantaj</span>
          </h2>
          <p className="mt-4 text-muted">
            Platform lansmanından önce kayıt olun. İlk 100 ihracatçıya
            komisyonsuz ilk eşleşme garantisi.
          </p>
        </div>

        <div className="mt-8 flex rounded-xl border border-border bg-background p-1">
          {(["exporter", "buyer"] as FormType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormType(type)}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${
                formType === type
                  ? "bg-accent text-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {type === "exporter" ? "İhracatçıyım" : "Alıcıyım"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="company" className="mb-1.5 block text-sm font-medium">
                Firma Adı
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                placeholder="Örn: Anadolu Çimento A.Ş."
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent/50"
              />
            </div>
            <div>
              <label htmlFor="sector" className="mb-1.5 block text-sm font-medium">
                Alt Sektör
              </label>
              <select
                id="sector"
                name="sector"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent/50"
              >
                <option value="">Seçiniz</option>
                <option value="cimento">Çimento & Beton</option>
                <option value="demir">Demir & Çelik</option>
                <option value="seramik">Seramik & Fayans</option>
                <option value="yalitim">Yalıtım Malzemeleri</option>
                <option value="boru">Boru & Fittings</option>
                <option value="cam">Cam & Alüminyum</option>
                <option value="prefabrik">Prefabrik Yapılar</option>
                <option value="kimyasal">İnşaat Kimyasalları</option>
                <option value="diger">Diğer</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                Ad Soyad
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Adınız Soyadınız"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent/50"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                E-posta
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="ornek@sirket.com"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent/50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
              Telefon
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+90 5XX XXX XX XX"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="glow-amber w-full rounded-xl bg-accent py-4 text-base font-semibold text-background transition-all hover:bg-accent-light disabled:opacity-60"
          >
            {loading ? "Kaydediliyor..." : "Erken Erişim Listesine Katıl"}
          </button>

          <p className="text-center text-xs text-muted">
            Bilgileriniz yalnızca Zerixa lansmanı için kullanılır. Spam yok.
          </p>
        </form>
      </div>
    </section>
  );
}
