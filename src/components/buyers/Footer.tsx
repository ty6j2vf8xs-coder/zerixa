import Link from "next/link";

const resourceLinks = [
  { href: "/guides", label: "Guides" },
  { href: "/products", label: "Products" },
  { href: "/markets", label: "Markets" },
  { href: "/incoterms", label: "Incoterms" },
];

export default function BuyerFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-6">
        <nav className="mb-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted md:justify-start">
          {resourceLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-accent-light transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-bold text-background">
              Z
            </div>
            <span className="font-semibold">
              zerixa<span className="text-accent">.ai</span>
            </span>
          </div>

          <p className="text-sm text-muted text-center max-w-md">
            AI-powered construction materials procurement from Türkiye.
            One partner, full service.
          </p>
        </div>

        <div className="mt-8 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <span>© {new Date().getFullYear()} Zerixa.ai — All rights reserved.</span>
          <span>Türkiye · Serving buyers in 195+ countries worldwide</span>
        </div>
      </div>
    </footer>
  );
}
