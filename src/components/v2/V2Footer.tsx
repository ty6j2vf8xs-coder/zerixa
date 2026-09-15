import Link from "next/link";
import { COMPANY, COMPANY_DETAILS_READY, telHref, isPlaceholder } from "@/lib/v2-company";

const links = [
  { href: "/products", label: "Products" },
  { href: "/guides", label: "Guides" },
  { href: "/incoterms", label: "Incoterms" },
  { href: "/markets", label: "Markets" },
];

export default function V2Footer() {
  return (
    <footer className="border-t border-border">
      <div
        className="mx-auto max-w-5xl px-5 py-10"
        style={{ paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-bold text-background">
                Z
              </span>
              <span className="font-semibold">
                zerixa<span className="text-accent">.ai</span>
              </span>
            </div>
            {COMPANY_DETAILS_READY && (
              <address className="mt-3 text-sm not-italic leading-relaxed text-muted">
                {COMPANY.legalName}
                <br />
                {COMPANY.addressLines.join(", ")}
                <br />
                <a href={telHref()} className="hover:text-accent-light">
                  {COMPANY.phone}
                </a>
                {!isPlaceholder(COMPANY.email) && (
                  <>
                    {" · "}
                    <a href={`mailto:${COMPANY.email}`} className="hover:text-accent-light">
                      {COMPANY.email}
                    </a>
                  </>
                )}
              </address>
            )}
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-accent-light">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-8 border-t border-border pt-6 text-xs text-muted">
          © {new Date().getFullYear()} {COMPANY.displayName}. Construction materials
          export from Türkiye.
        </p>
      </div>
    </footer>
  );
}
