import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ScrollManager from "@/components/ScrollManager";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zerixa.ai"),
  title: "Tiles, sanitaryware and profiles from Turkish factories | Zerixa",
  description:
    "One container, one invoice, one shipment. Send your list or BOQ and get a fast CIF price — specifications and certificates included.",
  keywords: [
    "import building materials from Türkiye",
    "Turkish ceramic tiles export",
    "sanitaryware supplier Türkiye",
    "aluminium profiles Türkiye export",
    "construction materials Ghana Nigeria import",
    "consolidated container building materials",
  ],
  openGraph: {
    title: "Tiles, sanitaryware and profiles from Turkish factories",
    description:
      "One container. One invoice. One shipment. A fast CIF price, specifications and certificates included.",
    url: "https://zerixa.ai",
    siteName: "Zerixa",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiles, sanitaryware and profiles from Turkish factories",
    description:
      "One container. One invoice. One shipment. A fast CIF price from Turkish factories.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <ScrollManager />
        {children}
      </body>
    </html>
  );
}
