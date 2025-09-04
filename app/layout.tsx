import type { Metadata } from "next";
import "./globals.css";

import { ErrorBoundary } from "./components/ErrorBoundary";
import ClientErrorHandler from "./components/ClientErrorHandler";
import NetworkErrorHandler from "./components/NetworkErrorHandler";

export const metadata: Metadata = {
  title: "Key Largo Scuba Diving | #1 Rated Tours & PADI Certification",
  description:
    "Premium scuba diving tours and PADI certification in Key Largo, Florida Keys. Experience the famous Christ of the Abyss statue, coral reefs, and crystal-clear waters. Book your underwater adventure today!",
  keywords:
    "scuba diving, Key Largo, Florida Keys, dive tours, PADI certification, snorkeling, Christ of the Abyss, coral reefs, diving lessons",
  authors: [{ name: "Key Largo Scuba Diving" }],
  creator: "Key Largo Scuba Diving",
  publisher: "Key Largo Scuba Diving",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Key Largo Scuba Diving | #1 Rated Tours & PADI Certification",
    description:
      "Experience world-famous diving sites in Key Largo, Florida Keys. PADI certified guides, crystal-clear waters, and unforgettable underwater adventures.",
    url: "https://livewsnklsdlaucnh.netlify.app",
    siteName: "Key Largo Scuba Diving",
    type: "website",
    locale: "en_US",
  },
  other: {
    "deployment-version": "1.0.0",
  },
  twitter: {
    card: "summary_large_image",
    title: "Key Largo Scuba Diving | #1 Rated Tours",
    description:
      "Experience world-famous diving sites in Key Largo, Florida Keys",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>{/* Error handling initialization */}</head>
      <body className="antialiased">
        <ErrorBoundary>
          <ClientErrorHandler />
          <NetworkErrorHandler />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
