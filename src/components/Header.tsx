"use client";

import { useState } from "react";

const navLinks = [
  { href: "#nasil-calisir", label: "Nasıl Çalışır" },
  { href: "#ihracatcilar", label: "İhracatçılar" },
  { href: "#alicilar", label: "Alıcılar" },
  { href: "#komisyon", label: "Komisyon Modeli" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-bold text-background text-sm lowercase">
            z
          </div>
          <span className="text-lg font-semibold tracking-tight">
            zerixa<span className="text-accent">.ai</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#bekleme-listesi"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent-light"
          >
            Erken Erişim
          </a>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          <span
            className={`block h-0.5 w-6 bg-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#bekleme-listesi"
              className="rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-semibold text-background"
              onClick={() => setOpen(false)}
            >
              Erken Erişim
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
