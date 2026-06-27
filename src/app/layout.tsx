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
  title: "Zerixa — Source Construction Materials from Türkiye",
  description:
    "AI-powered procurement from verified Turkish manufacturers. One quote, one contract, one delivery. Cement, steel, ceramics, insulation — EXW to DDP.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  keywords: [
    "Türkiye construction materials",
    "import from Türkiye",
    "cement export Türkiye",
    "steel supplier Türkiye",
    "B2B procurement",
    "Turkish manufacturers",
  ],
  openGraph: {
    title: "Zerixa — Source Construction Materials from Türkiye",
    description:
      "Describe what you need. Get a verified quote from Türkiye within 24 hours. Full-service export — EXW, FOB, CIF, CFR, DDP.",
    url: "https://zerixa.ai",
    siteName: "Zerixa",
    locale: "en_US",
    type: "website",
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
