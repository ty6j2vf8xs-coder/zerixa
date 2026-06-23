export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-bold text-background">
              Z
            </div>
            <span className="font-semibold">
              zerixa<span className="text-accent">.ai</span>
            </span>
          </div>

          <p className="text-sm text-muted text-center">
            İnşaat malzemeleri ihracatında AI destekli B2B eşleştirme platformu
          </p>

          <div className="flex items-center gap-6 text-sm text-muted">
            <a href="mailto:hello@zerixa.ai" className="hover:text-accent-light transition-colors">
              hello@zerixa.ai
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-xs text-muted">
          © {new Date().getFullYear()} Zerixa.ai — Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
