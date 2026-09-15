import Link from "next/link";
import { COMPANY, telHref, whatsappHref, WHATSAPP_PREFILL, isPlaceholder } from "@/lib/v2-company";

/**
 * No hamburger, no mega-nav. Five sections do not need a menu —
 * they need a phone number that is visible without scrolling.
 */
export default function V2Header() {
  const phoneReady = !isPlaceholder(COMPANY.phone);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-background">
            Z
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            zerixa<span className="text-accent">.ai</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {phoneReady && (
            <a
              href={telHref()}
              className="hidden text-sm text-muted transition-colors hover:text-foreground sm:block"
            >
              {COMPANY.phone}
            </a>
          )}
          {!isPlaceholder(COMPANY.whatsapp) && (
            <a
              href={whatsappHref(WHATSAPP_PREFILL)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent-light"
            >
              WhatsApp
            </a>
          )}
          <a
            href="#request-quote"
            className="rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Get a quote
          </a>
        </div>
      </div>
    </header>
  );
}
